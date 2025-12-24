import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  Wallet, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  ArrowLeft,
  RefreshCw,
  DollarSign,
  Image
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface PendingTransaction {
  id: string;
  user_id: string;
  amount_pkr: number | null;
  amount_usd: number | null;
  currency: string;
  payment_method: string | null;
  status: string;
  created_at: string;
  screenshot_url: string | null;
  description: string | null;
  profiles: {
    full_name: string | null;
    email: string | null;
  } | null;
}

interface AdminStats {
  totalBalancePkr: number;
  totalBalanceUsd: number;
  pendingRequests: number;
  totalUsers: number;
}

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [transactions, setTransactions] = useState<PendingTransaction[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalBalancePkr: 0,
    totalBalanceUsd: 0,
    pendingRequests: 0,
    totalUsers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Small delay to let auth state settle
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate('/auth');
      return;
    }

    if (user) {
      checkAdminRole();
    }
  }, [user, authLoading, navigate]);

  const checkAdminRole = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        toast.error("Access denied. Admin privileges required.");
        navigate('/');
        return;
      }

      setIsAdmin(true);
      fetchData();
    } catch (error) {
      console.error('Error checking admin role:', error);
      navigate('/');
    } finally {
      setIsCheckingRole(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch pending transactions
      const { data: txData, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .eq('type', 'deposit')
        .order('created_at', { ascending: false });

      if (txError) throw txError;
      
      // Fetch profiles for each transaction
      const userIds = [...new Set((txData || []).map(tx => tx.user_id))];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds);
      
      const profilesMap = (profilesData || []).reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {} as Record<string, { id: string; full_name: string | null; email: string | null }>);
      
      const transactionsWithProfiles = (txData || []).map(tx => ({
        ...tx,
        profiles: profilesMap[tx.user_id] || null,
      }));
      
      setTransactions(transactionsWithProfiles as PendingTransaction[]);

      // Fetch admin wallet stats
      const { data: walletData } = await supabase
        .from('admin_wallet')
        .select('*')
        .limit(1)
        .maybeSingle();

      // Count pending requests
      const pendingCount = (txData || []).filter(t => t.status === 'pending').length;

      // Count total users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalBalancePkr: walletData?.total_balance_pkr || 0,
        totalBalanceUsd: walletData?.total_balance_usd || 0,
        pendingRequests: pendingCount,
        totalUsers: userCount || 0,
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error("Failed to load admin data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (transactionId: string) => {
    setProcessingId(transactionId);
    try {
      const { error } = await supabase.rpc('approve_deposit', {
        p_transaction_id: transactionId,
        p_approved: true,
      });

      if (error) throw error;
      toast.success("Balance approved successfully!");
      fetchData();
    } catch (error: any) {
      console.error('Error approving transaction:', error);
      toast.error(error.message || "Failed to approve");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (transactionId: string) => {
    setProcessingId(transactionId);
    try {
      const { error } = await supabase.rpc('approve_deposit', {
        p_transaction_id: transactionId,
        p_approved: false,
      });

      if (error) throw error;
      toast.success("Request rejected");
      fetchData();
    } catch (error: any) {
      console.error('Error rejecting transaction:', error);
      toast.error(error.message || "Failed to reject");
    } finally {
      setProcessingId(null);
    }
  };

  const getScreenshotUrl = async (path: string) => {
    const { data } = await supabase.storage
      .from('payment-proofs')
      .createSignedUrl(path, 3600);
    return data?.signedUrl;
  };

  const viewScreenshot = async (path: string) => {
    const url = await getScreenshotUrl(path);
    if (url) {
      setSelectedImage(url);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (authLoading || isCheckingRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={fetchData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <Wallet className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total PKR</p>
                    <p className="text-2xl font-bold text-foreground">
                      Rs. {stats.totalBalancePkr.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <DollarSign className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total USD</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${stats.totalBalanceUsd.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/20">
                    <Clock className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.pendingRequests}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <Users className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.totalUsers}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Balance Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No balance requests found
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((tx, index) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-foreground truncate">
                            {tx.profiles?.full_name || tx.profiles?.email || 'Unknown User'}
                          </p>
                          {getStatusBadge(tx.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {tx.profiles?.email}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-foreground font-medium">
                            {tx.currency} {(tx.amount_pkr || tx.amount_usd || 0).toLocaleString()}
                          </span>
                          <span className="text-muted-foreground">
                            via {tx.payment_method?.replace('_', ' ')}
                          </span>
                          <span className="text-muted-foreground">
                            {new Date(tx.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {tx.screenshot_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewScreenshot(tx.screenshot_url!)}
                          >
                            <Image className="h-4 w-4 mr-1" />
                            View Proof
                          </Button>
                        )}
                        
                        {tx.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-500 hover:bg-green-500/10"
                              onClick={() => handleApprove(tx.id)}
                              disabled={processingId === tx.id}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:bg-red-500/10"
                              onClick={() => handleReject(tx.id)}
                              disabled={processingId === tx.id}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImage}
            alt="Payment proof"
            className="max-w-full max-h-[90vh] rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Admin;
