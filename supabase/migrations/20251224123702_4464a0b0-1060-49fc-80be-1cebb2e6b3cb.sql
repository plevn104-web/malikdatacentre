-- Block anonymous access to user_wallets table
CREATE POLICY "Block anonymous wallet access" 
ON public.user_wallets 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Block anonymous access to transactions table
CREATE POLICY "Block anonymous transaction access" 
ON public.transactions 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Block anonymous access to course_enrollments table
CREATE POLICY "Block anonymous enrollment access" 
ON public.course_enrollments 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Block anonymous access to user_subscriptions table
CREATE POLICY "Block anonymous subscription access" 
ON public.user_subscriptions 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Block anonymous access to user_roles table
CREATE POLICY "Block anonymous role access" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Block anonymous access to admin_mfa_settings table
CREATE POLICY "Block anonymous MFA access" 
ON public.admin_mfa_settings 
FOR SELECT 
USING (auth.uid() IS NOT NULL);