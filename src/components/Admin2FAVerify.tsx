import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Admin2FAVerifyProps {
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function Admin2FAVerify({ userId, onSuccess, onCancel }: Admin2FAVerifyProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockedUntil, setLockedUntil] = useState<Date | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [factorId, setFactorId] = useState<string | null>(null);

  useEffect(() => {
    checkLockoutStatus();
    getFactorId();
  }, [userId]);

  const checkLockoutStatus = async () => {
    try {
      const { data, error } = await supabase.rpc('check_admin_lockout', { p_user_id: userId });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const result = data[0];
        setIsLocked(result.is_locked);
        setLockedUntil(result.locked_until ? new Date(result.locked_until) : null);
        setFailedAttempts(result.failed_attempts || 0);
      }
    } catch (error) {
      console.error('Error checking lockout status:', error);
    }
  };

  const getFactorId = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) throw error;
      
      const totpFactor = data.totp.find(f => f.status === 'verified');
      if (totpFactor) {
        setFactorId(totpFactor.id);
      }
    } catch (error) {
      console.error('Error getting MFA factors:', error);
    }
  };

  const verifyCode = async () => {
    if (code.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    if (!factorId) {
      toast.error('2FA not properly configured');
      return;
    }

    setIsLoading(true);
    try {
      // Create challenge
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId
      });

      if (challengeError) throw challengeError;

      // Verify the code
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code
      });

      if (verifyError) {
        // Record failed attempt
        const { data: lockData } = await supabase.rpc('record_failed_2fa_attempt', { p_user_id: userId });
        
        if (lockData && lockData.length > 0) {
          const result = lockData[0];
          setFailedAttempts(result.failed_attempts);
          
          if (result.is_locked) {
            setIsLocked(true);
            setLockedUntil(new Date(result.locked_until));
            toast.error('Account locked due to too many failed attempts');
            return;
          }
        }
        
        throw verifyError;
      }

      // Reset failed attempts on success
      await supabase.rpc('reset_failed_2fa_attempts', { p_user_id: userId });
      
      toast.success('2FA verification successful!');
      onSuccess();
    } catch (error: any) {
      console.error('2FA verification error:', error);
      toast.error('Invalid verification code. Please try again.');
      setCode('');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimeRemaining = (date: Date) => {
    const diff = date.getTime() - Date.now();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Update lockout timer
  useEffect(() => {
    if (isLocked && lockedUntil) {
      const interval = setInterval(() => {
        if (lockedUntil.getTime() <= Date.now()) {
          setIsLocked(false);
          setLockedUntil(null);
          setFailedAttempts(0);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLocked, lockedUntil]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="bg-background border-border">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl font-bold">
              Admin 2FA Verification
            </CardTitle>
            <CardDescription>
              Enter the 6-digit code from your authenticator app
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {isLocked && lockedUntil ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
                  <Lock className="h-12 w-12 text-red-500 mx-auto mb-3" />
                  <h3 className="font-bold text-red-500 text-lg mb-2">Account Temporarily Locked</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Too many failed verification attempts. Please wait before trying again.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-2xl font-mono text-red-500">
                    <Clock className="h-6 w-6" />
                    <span>{formatTimeRemaining(lockedUntil)}</span>
                  </div>
                </div>

                <Button variant="outline" onClick={onCancel} className="w-full">
                  Return to Home
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {failedAttempts > 0 && failedAttempts < 5 && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <p className="text-sm text-amber-500">
                        {5 - failedAttempts} attempts remaining before lockout
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-3xl font-mono tracking-[0.5em] py-6"
                    maxLength={6}
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Open your authenticator app to view your code
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={onCancel} className="flex-1">
                    Cancel
                  </Button>
                  <Button 
                    onClick={verifyCode} 
                    disabled={isLoading || code.length !== 6}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      'Verify'
                    )}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Lost your device? Contact support with your backup codes.
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}