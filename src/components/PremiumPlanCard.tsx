import { motion } from 'framer-motion';
import { Crown, Check, Sparkles, Zap, Shield, Clock } from 'lucide-react';
import { usePremiumPlan, useSubscription } from '@/hooks/useWallet';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const PremiumPlanCard = () => {
  const { plan, loading } = usePremiumPlan();
  const { isPremium } = useSubscription();
  const { user } = useAuth();

  if (loading || !plan) return null;

  const features = Array.isArray(plan.features) ? plan.features : [];

  return (
    <section className="cgi-section relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-2 text-sm font-medium">
            <Crown className="inline-block h-4 w-4 mr-2 text-yellow-500" />
            <span className="gradient-text">Premium Membership</span>
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            Unlock <span className="gradient-text">Everything</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Get access to all premium AI tools with one simple yearly subscription
          </p>
        </motion.div>

        {/* Premium Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-lg"
        >
          <div className="glass-card relative overflow-hidden p-8 border-2 border-primary/30">
            {/* Best Value Badge */}
            <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-primary to-secondary px-12 py-1">
              <span className="text-xs font-bold text-primary-foreground">BEST VALUE</span>
            </div>

            {/* Sparkle effects */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-4 left-4"
            >
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </motion.div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute top-12 right-16"
            >
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.div>

            {/* Plan Header */}
            <div className="text-center mb-6 pt-4">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4">
                <Crown className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
            </div>

            {/* Pricing */}
            <div className="text-center mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold gradient-text">${plan.price_usd}</span>
                <span className="text-muted-foreground">/year</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                ≈ PKR {plan.price_pkr.toLocaleString()}
              </p>
              <p className="text-xs text-primary mt-2">
                <Zap className="inline-block h-3 w-3 mr-1" />
                Save over 70% compared to individual purchases
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            {isPremium ? (
              <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <div className="flex items-center justify-center gap-2 text-green-500">
                  <Shield className="h-5 w-5" />
                  <span className="font-semibold">You're a Premium Member!</span>
                </div>
              </div>
            ) : (
              <Link to={user ? "/dashboard?tab=wallet&action=premium" : "/auth"}>
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-bold py-6 text-lg group"
                >
                  <Crown className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  {user ? 'Get Premium Now' : 'Login to Get Premium'}
                </Button>
              </Link>
            )}

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Secure Payment
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Instant Activation
              </div>
            </div>

            {/* Decorative glow */}
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
