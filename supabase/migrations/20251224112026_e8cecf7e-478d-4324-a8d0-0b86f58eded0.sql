-- TRANSACTION INTEGRITY: Remove user's ability to update their own wallet balance
-- Only the approve_deposit RPC (with admin checks) should modify wallet balances
-- This prevents users from manipulating their own balance

-- Drop the existing user update policy that allows balance manipulation
DROP POLICY IF EXISTS "Users can update their own wallet" ON public.user_wallets;

-- Create a new restrictive policy: Only admins can update wallets
-- This ensures all balance changes go through admin-approved processes
CREATE POLICY "Only admins can update wallets"
ON public.user_wallets
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Also ensure users cannot delete their transactions (immutable logs)
-- First check if delete policy exists
DROP POLICY IF EXISTS "Users can delete transactions" ON public.transactions;

-- Create explicit deny for user transaction deletion
CREATE POLICY "Users cannot delete transactions"
ON public.transactions
FOR DELETE
USING (false);

-- Add comment for documentation
COMMENT ON TABLE public.transactions IS 'Immutable transaction log - users can only view and create, never modify or delete. All updates require admin approval.';
COMMENT ON TABLE public.user_wallets IS 'User wallet balances - users can only view, balance changes require admin approval via approve_deposit RPC.';