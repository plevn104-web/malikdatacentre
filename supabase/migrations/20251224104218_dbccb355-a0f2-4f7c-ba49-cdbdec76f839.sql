-- Create storage bucket for payment proofs
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-proofs', 'payment-proofs', false);

-- Storage policies for payment proofs
CREATE POLICY "Users can upload their own payment proofs"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'payment-proofs' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own payment proofs"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'payment-proofs' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins can view all payment proofs"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'payment-proofs' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Add screenshot_url column to transactions for payment proof
ALTER TABLE public.transactions 
ADD COLUMN IF NOT EXISTS screenshot_url text;

-- Update RLS to allow admins to update transaction status
CREATE POLICY "Admins can update transactions"
ON public.transactions FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Function to update user wallet balance when transaction is approved
CREATE OR REPLACE FUNCTION public.approve_deposit(
  p_transaction_id uuid,
  p_approved boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_transaction RECORD;
BEGIN
  -- Check if caller is admin
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Only admins can approve transactions';
  END IF;

  -- Get transaction details
  SELECT * INTO v_transaction 
  FROM transactions 
  WHERE id = p_transaction_id AND type = 'deposit' AND status = 'pending';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Transaction not found or already processed';
  END IF;

  IF p_approved THEN
    -- Update user wallet balance
    UPDATE user_wallets
    SET 
      balance_pkr = balance_pkr + COALESCE(v_transaction.amount_pkr, 0),
      balance_usd = balance_usd + COALESCE(v_transaction.amount_usd, 0),
      updated_at = now()
    WHERE user_id = v_transaction.user_id;

    -- Update transaction status
    UPDATE transactions
    SET status = 'completed', updated_at = now()
    WHERE id = p_transaction_id;

    -- Update admin wallet
    UPDATE admin_wallet
    SET 
      total_balance_pkr = total_balance_pkr + COALESCE(v_transaction.amount_pkr, 0),
      total_balance_usd = total_balance_usd + COALESCE(v_transaction.amount_usd, 0),
      updated_at = now();
  ELSE
    -- Reject transaction
    UPDATE transactions
    SET status = 'cancelled', updated_at = now()
    WHERE id = p_transaction_id;
  END IF;
END;
$$;