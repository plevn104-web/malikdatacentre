import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ChevronDown, DollarSign, TrendingUp, Plus, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const WalletDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { wallet, transactions, loading, USD_TO_PKR_RATE } = useWallet();

  if (loading || !wallet) return null;

  const recentTransactions = transactions.slice(0, 3);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'pending':
        return <Clock className="h-3 w-3 text-yellow-500" />;
      case 'failed':
      case 'cancelled':
        return <XCircle className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="h-3 w-3 text-green-500" />;
      case 'purchase':
        return <ArrowUpRight className="h-3 w-3 text-red-500" />;
      case 'refund':
        return <ArrowDownLeft className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-1.5 transition-all hover:from-primary/20 hover:to-secondary/20"
      >
        <Wallet className="h-4 w-4 text-primary" />
        <div className="flex flex-col items-start">
          <span className="text-xs font-bold text-foreground">
            ${Number(wallet.balance_usd).toFixed(2)}
          </span>
          <span className="text-[10px] text-muted-foreground">
            PKR {Number(wallet.balance_pkr).toLocaleString()}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-border bg-card shadow-xl"
            >
              {/* Balance Section */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
                <p className="text-xs text-muted-foreground mb-1">Total Balance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    ${Number(wallet.balance_usd).toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">USD</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm text-muted-foreground">
                    ≈ PKR {Number(wallet.balance_pkr).toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground/60">
                    (1 USD = {USD_TO_PKR_RATE} PKR)
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-3 border-b border-border">
                <Link to="/dashboard?tab=wallet" onClick={() => setIsOpen(false)}>
                  <Button size="sm" className="w-full gap-2 bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                    Add Balance
                  </Button>
                </Link>
              </div>

              {/* Recent Transactions */}
              <div className="p-3">
                <p className="text-xs font-medium text-muted-foreground mb-2">Recent Activity</p>
                {recentTransactions.length > 0 ? (
                  <div className="space-y-2">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(tx.type)}
                          <div>
                            <p className="text-xs font-medium text-foreground capitalize">{tx.type}</p>
                            <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                              {tx.description || 'Transaction'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`text-xs font-medium ${tx.type === 'deposit' || tx.type === 'refund' ? 'text-green-500' : 'text-foreground'}`}>
                            {tx.type === 'deposit' || tx.type === 'refund' ? '+' : '-'}
                            {tx.currency === 'USD' ? `$${tx.amount_usd}` : `PKR ${tx.amount_pkr}`}
                          </span>
                          {getStatusIcon(tx.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-2">No transactions yet</p>
                )}
              </div>

              {/* View All */}
              <div className="border-t border-border p-2">
                <Link 
                  to="/dashboard?tab=wallet" 
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-xs text-primary hover:underline"
                >
                  View All Transactions →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
