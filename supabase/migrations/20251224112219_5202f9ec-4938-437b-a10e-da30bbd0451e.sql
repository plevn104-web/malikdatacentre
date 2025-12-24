-- Admin 2FA Security System
-- Track 2FA enrollment status and failed login attempts for admin accounts

-- Create table to track admin MFA enrollment
CREATE TABLE public.admin_mfa_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  is_enrolled BOOLEAN NOT NULL DEFAULT false,
  enrolled_at TIMESTAMP WITH TIME ZONE,
  backup_codes_generated BOOLEAN NOT NULL DEFAULT false,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TIMESTAMP WITH TIME ZONE,
  last_failed_attempt TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_mfa_settings ENABLE ROW LEVEL SECURITY;

-- Only the admin can view their own MFA settings
CREATE POLICY "Admins can view own MFA settings"
ON public.admin_mfa_settings
FOR SELECT
USING (auth.uid() = user_id AND has_role(auth.uid(), 'admin'::app_role));

-- Only the admin can update their own MFA settings (for enrollment)
CREATE POLICY "Admins can update own MFA settings"
ON public.admin_mfa_settings
FOR UPDATE
USING (auth.uid() = user_id AND has_role(auth.uid(), 'admin'::app_role));

-- System can insert MFA settings (triggered by admin creation)
CREATE POLICY "System can insert MFA settings"
ON public.admin_mfa_settings
FOR INSERT
WITH CHECK (auth.uid() = user_id AND has_role(auth.uid(), 'admin'::app_role));

-- Create function to check and update failed attempts
CREATE OR REPLACE FUNCTION public.check_admin_lockout(p_user_id UUID)
RETURNS TABLE (
  is_locked BOOLEAN,
  locked_until TIMESTAMP WITH TIME ZONE,
  failed_attempts INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_settings RECORD;
BEGIN
  SELECT * INTO v_settings 
  FROM admin_mfa_settings 
  WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::TIMESTAMP WITH TIME ZONE, 0;
    RETURN;
  END IF;
  
  -- Check if currently locked
  IF v_settings.locked_until IS NOT NULL AND v_settings.locked_until > now() THEN
    RETURN QUERY SELECT true, v_settings.locked_until, v_settings.failed_attempts;
    RETURN;
  END IF;
  
  -- Reset if lock expired
  IF v_settings.locked_until IS NOT NULL AND v_settings.locked_until <= now() THEN
    UPDATE admin_mfa_settings 
    SET failed_attempts = 0, locked_until = NULL, updated_at = now()
    WHERE user_id = p_user_id;
  END IF;
  
  RETURN QUERY SELECT false, NULL::TIMESTAMP WITH TIME ZONE, COALESCE(v_settings.failed_attempts, 0);
END;
$$;

-- Create function to record failed 2FA attempt
CREATE OR REPLACE FUNCTION public.record_failed_2fa_attempt(p_user_id UUID)
RETURNS TABLE (
  is_locked BOOLEAN,
  locked_until TIMESTAMP WITH TIME ZONE,
  failed_attempts INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_new_attempts INTEGER;
  v_lock_until TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Increment failed attempts
  UPDATE admin_mfa_settings 
  SET 
    failed_attempts = failed_attempts + 1,
    last_failed_attempt = now(),
    updated_at = now()
  WHERE user_id = p_user_id
  RETURNING failed_attempts INTO v_new_attempts;
  
  -- Lock account after 5 failed attempts (30 minute lockout)
  IF v_new_attempts >= 5 THEN
    v_lock_until := now() + INTERVAL '30 minutes';
    UPDATE admin_mfa_settings 
    SET locked_until = v_lock_until, updated_at = now()
    WHERE user_id = p_user_id;
    
    RETURN QUERY SELECT true, v_lock_until, v_new_attempts;
    RETURN;
  END IF;
  
  RETURN QUERY SELECT false, NULL::TIMESTAMP WITH TIME ZONE, v_new_attempts;
END;
$$;

-- Create function to reset failed attempts on successful login
CREATE OR REPLACE FUNCTION public.reset_failed_2fa_attempts(p_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE admin_mfa_settings 
  SET 
    failed_attempts = 0, 
    locked_until = NULL,
    last_failed_attempt = NULL,
    updated_at = now()
  WHERE user_id = p_user_id;
END;
$$;

-- Create function to mark admin as enrolled
CREATE OR REPLACE FUNCTION public.mark_admin_mfa_enrolled(p_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO admin_mfa_settings (user_id, is_enrolled, enrolled_at)
  VALUES (p_user_id, true, now())
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    is_enrolled = true, 
    enrolled_at = now(),
    updated_at = now();
END;
$$;

-- Create trigger for updated_at
CREATE TRIGGER update_admin_mfa_settings_updated_at
BEFORE UPDATE ON public.admin_mfa_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add comment for documentation
COMMENT ON TABLE public.admin_mfa_settings IS 'Tracks 2FA enrollment and failed attempt lockout for admin accounts';