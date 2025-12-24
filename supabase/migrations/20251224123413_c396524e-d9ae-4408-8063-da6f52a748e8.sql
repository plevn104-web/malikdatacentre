-- Add policy to block anonymous access to profiles table
-- This ensures only authenticated users can access the table

CREATE POLICY "Block anonymous access to profiles" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Note: The existing policies already restrict users to their own profiles,
-- and admins can view all profiles. This policy adds an explicit check
-- that blocks any unauthenticated/anonymous access attempts.