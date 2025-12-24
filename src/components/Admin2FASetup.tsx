import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Smartphone, Copy, Check, AlertTriangle, Key, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Admin2FASetupProps {
  userId: string;
  onComplete: () => void;
  onCancel?: () => void;
}

export default function Admin2FASetup({ userId, onComplete, onCancel }: Admin2FASetupProps) {
  const [step, setStep] = useState<'intro' | 'qr' | 'verify' | 'backup'>('intro');
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [factorId, setFactorId] = useState<string>('');
  const [verifyCode, setVerifyCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [backupCopied, setBackupCopied] = useState(false);

  const enrollMFA = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'MALIK DATA CENTRE Admin'
      });

      if (error) throw error;

      if (data.totp) {
        setQrCode(data.totp.qr_code);
        setSecret(data.totp.secret);
        setFactorId(data.id);
        setStep('qr');
      }
    } catch (error: any) {
      console.error('MFA enrollment error:', error);
      toast.error(error.message || 'Failed to start 2FA setup');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAndActivate = async () => {
    if (verifyCode.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId
      });

      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code: verifyCode
      });

      if (verifyError) throw verifyError;

      // Mark as enrolled in our tracking table
      await supabase.rpc('mark_admin_mfa_enrolled', { p_user_id: userId });

      // Generate backup codes
      const codes = Array.from({ length: 10 }, () => 
        Math.random().toString(36).substring(2, 8).toUpperCase()
      );
      setBackupCodes(codes);
      setStep('backup');

      toast.success('2FA enabled successfully!');
    } catch (error: any) {
      console.error('MFA verification error:', error);
      toast.error(error.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Secret copied to clipboard');
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    setBackupCopied(true);
    setTimeout(() => setBackupCopied(false), 2000);
    toast.success('Backup codes copied to clipboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <Card className="bg-background border-border">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl font-bold">
              {step === 'intro' && 'Set Up Two-Factor Authentication'}
              {step === 'qr' && 'Scan QR Code'}
              {step === 'verify' && 'Enter Verification Code'}
              {step === 'backup' && 'Save Backup Codes'}
            </CardTitle>
            <CardDescription>
              {step === 'intro' && 'Secure your admin account with 2FA'}
              {step === 'qr' && 'Use your authenticator app to scan'}
              {step === 'verify' && 'Enter the 6-digit code from your app'}
              {step === 'backup' && 'Store these codes safely - they can recover your account'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Introduction */}
              {step === 'intro' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-500">2FA is Required for Admin Access</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          To protect your admin account, you must set up two-factor authentication before accessing the admin panel.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Supported Authenticator Apps:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {['Google Authenticator', 'Microsoft Authenticator', 'Authy', '1Password', 'Any TOTP app'].map((app) => (
                        <div key={app} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Smartphone className="h-4 w-4 text-primary" />
                          <span>{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    {onCancel && (
                      <Button variant="outline" onClick={onCancel} className="flex-1">
                        Cancel
                      </Button>
                    )}
                    <Button onClick={enrollMFA} disabled={isLoading} className="flex-1">
                      {isLoading ? (
                        <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      ) : (
                        <>
                          <Key className="h-4 w-4 mr-2" />
                          Begin Setup
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: QR Code */}
              {step === 'qr' && (
                <motion.div
                  key="qr"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex justify-center">
                    <div className="bg-white p-4 rounded-xl">
                      <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Or enter this secret manually:</p>
                    <div className="flex items-center justify-center gap-2">
                      <code className="bg-muted px-3 py-2 rounded text-sm font-mono">
                        {secret}
                      </code>
                      <Button variant="ghost" size="icon" onClick={copySecret}>
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button onClick={() => setStep('verify')} className="w-full">
                    I've Scanned the QR Code
                  </Button>
                </motion.div>
              )}

              {/* Step 3: Verify */}
              {step === 'verify' && (
                <motion.div
                  key="verify"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <QrCode className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Enter the 6-digit code from your authenticator app
                    </p>
                  </div>

                  <Input
                    type="text"
                    placeholder="000000"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-2xl font-mono tracking-widest"
                    maxLength={6}
                  />

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep('qr')} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={verifyAndActivate} 
                      disabled={isLoading || verifyCode.length !== 6}
                      className="flex-1"
                    >
                      {isLoading ? (
                        <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      ) : (
                        'Verify & Activate'
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Backup Codes */}
              {step === 'backup' && (
                <motion.div
                  key="backup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                    <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="font-medium text-green-500">2FA Successfully Enabled!</p>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-500">Save These Backup Codes</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Store these codes in a safe place. You can use them to access your account if you lose your authenticator device.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-2">
                      {backupCodes.map((code, i) => (
                        <code key={i} className="text-sm font-mono text-center py-1 bg-background rounded">
                          {code}
                        </code>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" onClick={copyBackupCodes} className="w-full">
                    {backupCopied ? (
                      <>
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy All Codes
                      </>
                    )}
                  </Button>

                  <Button onClick={onComplete} className="w-full">
                    I've Saved My Codes - Continue
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}