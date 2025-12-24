import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Wallet {
  id: string;
  user_id: string;
  balance_usd: number;
  balance_pkr: number;
  created_at: string;
  updated_at: string;
}

interface Transaction {
  id: string;
  user_id: string;
  type: 'deposit' | 'purchase' | 'refund' | 'withdrawal';
  amount_usd: number | null;
  amount_pkr: number | null;
  currency: string;
  payment_method: string | null;
  description: string | null;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  reference_id: string | null;
  metadata: unknown;
  created_at: string;
}

type PaymentMethodType = 'bank_transfer' | 'easypaisa' | 'jazzcash' | 'crypto' | 'card' | 'wallet';

interface PremiumPlan {
  id: string;
  name: string;
  description: string;
  price_usd: number;
  price_pkr: number;
  duration_months: number;
  features: string[];
  is_active: boolean;
}

interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  starts_at: string;
  expires_at: string;
}

// USD to PKR exchange rate (can be updated dynamically)
const USD_TO_PKR_RATE = 280;

export const useWallet = () => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWallet = useCallback(async () => {
    if (!user) {
      setWallet(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!data) {
        // Create wallet if doesn't exist
        const { data: newWallet, error: createError } = await supabase
          .from('user_wallets')
          .insert({ user_id: user.id })
          .select()
          .single();

        if (createError) throw createError;
        setWallet(newWallet);
      } else {
        setWallet(data);
      }
    } catch (err) {
      console.error('Error fetching wallet:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch wallet');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchTransactions = useCallback(async () => {
    if (!user) {
      setTransactions([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setTransactions(data || []);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  }, [user]);

  useEffect(() => {
    fetchWallet();
    fetchTransactions();
  }, [fetchWallet, fetchTransactions]);

  const createTransaction = async (
    type: Transaction['type'],
    amount: number,
    currency: 'USD' | 'PKR',
    paymentMethod: string,
    description: string
  ) => {
    if (!user) throw new Error('Not authenticated');

    const transaction: {
      user_id: string;
      type: 'deposit' | 'purchase' | 'refund' | 'withdrawal';
      amount_usd: number;
      amount_pkr: number;
      currency: string;
      payment_method: 'bank_transfer' | 'easypaisa' | 'jazzcash' | 'crypto' | 'card' | 'wallet';
      description: string;
      status: 'pending' | 'completed' | 'failed' | 'cancelled';
    } = {
      user_id: user.id,
      type,
      amount_usd: currency === 'USD' ? amount : amount / USD_TO_PKR_RATE,
      amount_pkr: currency === 'PKR' ? amount : amount * USD_TO_PKR_RATE,
      currency,
      payment_method: paymentMethod as PaymentMethodType,
      description,
      status: 'pending',
    };

    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single();

    if (error) throw error;
    await fetchTransactions();
    return data;
  };

  const convertCurrency = (amount: number, from: 'USD' | 'PKR', to: 'USD' | 'PKR') => {
    if (from === to) return amount;
    if (from === 'USD') return amount * USD_TO_PKR_RATE;
    return amount / USD_TO_PKR_RATE;
  };

  return {
    wallet,
    transactions,
    loading,
    error,
    createTransaction,
    convertCurrency,
    refreshWallet: fetchWallet,
    refreshTransactions: fetchTransactions,
    USD_TO_PKR_RATE,
  };
};

export const usePremiumPlan = () => {
  const [plan, setPlan] = useState<PremiumPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const { data, error } = await supabase
          .from('premium_plans')
          .select('*')
          .eq('is_active', true)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        
        if (data) {
          setPlan({
            ...data,
            features: Array.isArray(data.features) ? data.features : JSON.parse(data.features as string || '[]'),
          });
        }
      } catch (err) {
        console.error('Error fetching premium plan:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  return { plan, loading };
};

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setSubscription(null);
        setIsPremium(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .gte('expires_at', new Date().toISOString())
          .order('expires_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        
        setSubscription(data);
        setIsPremium(!!data);
      } catch (err) {
        console.error('Error fetching subscription:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  return { subscription, isPremium, loading };
};
