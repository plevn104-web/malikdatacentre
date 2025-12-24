import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MFAStatus {
  isEnrolled: boolean;
  isVerified: boolean;
  isLoading: boolean;
  needsSetup: boolean;
  needsVerification: boolean;
}

export function useAdminMFA(userId: string | undefined, isAdmin: boolean) {
  const [mfaStatus, setMfaStatus] = useState<MFAStatus>({
    isEnrolled: false,
    isVerified: false,
    isLoading: true,
    needsSetup: false,
    needsVerification: false
  });

  useEffect(() => {
    if (!userId || !isAdmin) {
      setMfaStatus({
        isEnrolled: false,
        isVerified: false,
        isLoading: false,
        needsSetup: false,
        needsVerification: false
      });
      return;
    }

    checkMFAStatus();
  }, [userId, isAdmin]);

  const checkMFAStatus = async () => {
    if (!userId) return;

    try {
      // Check if user has MFA factors enrolled in Supabase Auth
      const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
      
      if (factorsError) {
        console.error('Error checking MFA factors:', factorsError);
        setMfaStatus(prev => ({ ...prev, isLoading: false }));
        return;
      }

      const hasVerifiedTOTP = factors.totp.some(f => f.status === 'verified');
      
      // Check current AAL level
      const { data: aalData, error: aalError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      
      if (aalError) {
        console.error('Error checking AAL:', aalError);
      }

      const currentAAL = aalData?.currentLevel || 'aal1';
      const nextAAL = aalData?.nextLevel || 'aal1';

      // If no verified TOTP, admin needs to set up 2FA
      if (!hasVerifiedTOTP) {
        setMfaStatus({
          isEnrolled: false,
          isVerified: false,
          isLoading: false,
          needsSetup: true,
          needsVerification: false
        });
        return;
      }

      // If has TOTP but current AAL is aal1, needs to verify
      if (hasVerifiedTOTP && currentAAL === 'aal1' && nextAAL === 'aal2') {
        setMfaStatus({
          isEnrolled: true,
          isVerified: false,
          isLoading: false,
          needsSetup: false,
          needsVerification: true
        });
        return;
      }

      // Fully verified
      setMfaStatus({
        isEnrolled: true,
        isVerified: currentAAL === 'aal2',
        isLoading: false,
        needsSetup: false,
        needsVerification: currentAAL !== 'aal2'
      });
    } catch (error) {
      console.error('Error checking MFA status:', error);
      setMfaStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const refreshStatus = () => {
    setMfaStatus(prev => ({ ...prev, isLoading: true }));
    checkMFAStatus();
  };

  return { ...mfaStatus, refreshStatus };
}