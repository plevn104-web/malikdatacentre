import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Wallet, CreditCard, Plus, ArrowUpRight, ArrowDownLeft, 
  Clock, CheckCircle, XCircle, Crown, DollarSign, TrendingUp,
  Smartphone, Building2, Bitcoin, Globe, ArrowLeft, Upload, MessageCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useWallet, usePremiumPlan, useSubscription } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { AddBalanceModal } from '@/components/AddBalanceModal';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

const paymentDetails = [
  { 
    id: 'easypaisa', 
    name: 'EasyPaisa', 
    icon: <Smartphone className="h-5 w-5" />, 
    color: 'from-green-500 to-green-600',
    number: '03363337895',
    holder: 'Malik Ameer Usman'
  },
  { 
    id: 'jazzcash', 
    name: 'JazzCash', 
    icon: <Smartphone className="h-5 w-5" />, 
    color: 'from-red-500 to-red-600',
    number: '03075484104',
    holder: 'Malik Ghulam Hussain'
  },
  { 
    id: 'bank', 
    name: 'Meezan Bank', 
    icon: <Building2 className="h-5 w-5" />, 
    color: 'from-blue-500 to-blue-600',
    number: 'PK40MEZN0000300111059733',
    holder: 'IBAN'
  },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { wallet, transactions, loading, createTransaction, USD_TO_PKR_RATE } = useWallet();
  const { plan } = usePremiumPlan();
  const { isPremium, subscription } = useSubscription();
  const [searchParams] = useSearchParams();
  
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'PKR'>('USD');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  if (!user) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Please login to access your dashboard</h1>
          <Link to="/auth">
            <Button>Login / Signup</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddBalance = async () => {
    if (!amount || !selectedMethod) {
      toast({
        title: 'Missing Information',
        description: 'Please enter an amount and select a payment method',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createTransaction(
        'deposit',
        parseFloat(amount),
        currency,
        selectedMethod,
        `Add balance via ${selectedMethod}`
      );

      toast({
        title: 'Request Submitted!',
        description: 'Please complete the payment and send screenshot on WhatsApp for verification.',
      });

      setAmount('');
      setSelectedMethod(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create transaction. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      completed: 'bg-green-500/20 text-green-500',
      pending: 'bg-yellow-500/20 text-yellow-500',
      failed: 'bg-red-500/20 text-red-500',
      cancelled: 'bg-gray-500/20 text-gray-500',
    };
    return styles[status] || styles.pending;
  };

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <div className="border-b border-border bg-background/50 backdrop-blur-xl">
        <div className="container flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isPremium && (
              <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 px-3 py-1">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-foreground">Premium</span>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={signOut}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.email?.split('@')[0]}!
          </h1>
          <p className="text-muted-foreground">Manage your wallet, subscriptions, and purchases</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
              <Globe className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">USD Balance</p>
            <p className="text-2xl font-bold text-foreground">
              ${loading ? '...' : Number(wallet?.balance_usd || 0).toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">PKR</span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">PKR Balance</p>
            <p className="text-2xl font-bold text-foreground">
              {loading ? '...' : `PKR ${Number(wallet?.balance_pkr || 0).toLocaleString()}`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20">
                <Crown className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Membership</p>
            <p className="text-2xl font-bold text-foreground">
              {isPremium ? 'Premium' : 'Free'}
            </p>
            {subscription && (
              <p className="text-xs text-muted-foreground mt-1">
                Expires: {new Date(subscription.expires_at).toLocaleDateString()}
              </p>
            )}
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="wallet">Add Balance</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Premium Upgrade Card */}
              {!isPremium && plan && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-6 border-2 border-primary/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Crown className="h-6 w-6 text-yellow-500" />
                    <h3 className="font-display text-xl font-bold text-foreground">Upgrade to Premium</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Get all AI tools for just ${plan.price_usd}/year
                  </p>
                  <Button 
                    onClick={() => setActiveTab('wallet')} 
                    className="w-full bg-gradient-to-r from-primary to-secondary"
                  >
                    Get Premium
                  </Button>
                </motion.div>
              )}

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-6"
              >
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3"
                    onClick={() => setActiveTab('wallet')}
                  >
                    <Plus className="h-4 w-4" />
                    Add Balance
                  </Button>
                  <WhatsAppButton 
                    message="Hi, I need help with my account"
                    className="w-full justify-start"
                  >
                    Contact Support
                  </WhatsAppButton>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="wallet">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Payment Details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6"
              >
                <h3 className="font-display text-xl font-bold text-foreground mb-6">Payment Details</h3>
                
                <div className="space-y-4">
                  {paymentDetails.map((method) => (
                    <div 
                      key={method.id}
                      className="p-4 rounded-xl border border-border bg-muted/30"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${method.color}`}>
                          <div className="text-white">{method.icon}</div>
                        </div>
                        <span className="font-semibold text-foreground">{method.name}</span>
                      </div>
                      <div className="ml-11 space-y-1">
                        <p className="text-sm font-mono text-foreground">{method.number}</p>
                        <p className="text-xs text-muted-foreground">{method.holder}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <p className="text-sm text-amber-500 font-medium">Manual Approval Required</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Balance will be added after admin verifies your payment.
                  </p>
                </div>

                <Button 
                  onClick={() => setShowAddBalanceModal(true)}
                  className="w-full mt-6 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Balance Request
                </Button>
              </motion.div>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6"
              >
                <h3 className="font-display text-xl font-bold text-foreground mb-4">How it Works</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-sm">1</div>
                    <div>
                      <p className="font-medium text-foreground">Make Payment</p>
                      <p className="text-sm text-muted-foreground">Send payment to any of the accounts listed</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-sm">2</div>
                    <div>
                      <p className="font-medium text-foreground">Submit Request</p>
                      <p className="text-sm text-muted-foreground">Click "Add Balance" and upload your payment screenshot</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-sm">3</div>
                    <div>
                      <p className="font-medium text-foreground">Wait for Approval</p>
                      <p className="text-sm text-muted-foreground">Admin will verify and approve your balance</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-500 font-bold text-sm">✓</div>
                    <div>
                      <p className="font-medium text-foreground">Balance Added</p>
                      <p className="text-sm text-muted-foreground">Your wallet balance will be updated</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <WhatsAppButton 
                    message="Hi, I want to add balance to my wallet. Here is my payment screenshot."
                    className="w-full"
                  >
                    Send via WhatsApp Instead
                  </WhatsAppButton>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-6">Transaction History</h3>
              
              {transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div 
                      key={tx.id} 
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          tx.type === 'deposit' ? 'bg-green-500/20' : 
                          tx.type === 'refund' ? 'bg-blue-500/20' : 'bg-red-500/20'
                        }`}>
                          {tx.type === 'deposit' || tx.type === 'refund' ? (
                            <ArrowDownLeft className={`h-5 w-5 ${tx.type === 'deposit' ? 'text-green-500' : 'text-blue-500'}`} />
                          ) : (
                            <ArrowUpRight className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground capitalize">{tx.type}</p>
                          <p className="text-sm text-muted-foreground">{tx.description || 'Transaction'}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(tx.created_at).toLocaleDateString()} at {new Date(tx.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${tx.type === 'deposit' || tx.type === 'refund' ? 'text-green-500' : 'text-foreground'}`}>
                          {tx.type === 'deposit' || tx.type === 'refund' ? '+' : '-'}
                          {tx.currency === 'USD' ? `$${tx.amount_usd}` : `PKR ${tx.amount_pkr?.toLocaleString()}`}
                        </p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(tx.status)}`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No transactions yet</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setActiveTab('wallet')}
                  >
                    Add Your First Balance
                  </Button>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Balance Modal */}
      <AddBalanceModal
        isOpen={showAddBalanceModal}
        onClose={() => setShowAddBalanceModal(false)}
        userId={user.id}
        onSuccess={() => {
          // Refresh wallet data
          window.location.reload();
        }}
      />
    </div>
  );
}
