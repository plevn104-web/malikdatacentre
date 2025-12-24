import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, MessageCircle, CreditCard, Building2, Smartphone, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess: () => void;
}

const paymentMethods = [
  {
    id: "easypaisa",
    name: "EasyPaisa",
    icon: Smartphone,
    details: {
      number: "03363337895",
      name: "Malik Ameer Usman",
    },
    color: "from-green-500 to-green-600",
  },
  {
    id: "jazzcash",
    name: "JazzCash",
    icon: Smartphone,
    details: {
      number: "03075484104",
      name: "Malik Ghulam Hussain",
    },
    color: "from-red-500 to-red-600",
  },
  {
    id: "bank",
    name: "Meezan Bank",
    icon: Building2,
    details: {
      iban: "PK40MEZN0000300111059733",
      name: "Bank Transfer",
    },
    color: "from-blue-500 to-blue-600",
  },
];

export const AddBalanceModal = ({ isOpen, onClose, userId, onSuccess }: AddBalanceModalProps) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<"PKR" | "USD">("PKR");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setScreenshot(file);
    }
  };

  const handleSubmit = async () => {
    if (!amount || !selectedMethod) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      let screenshotUrl = null;

      // Upload screenshot if provided
      if (screenshot) {
        setIsUploading(true);
        const fileExt = screenshot.name.split('.').pop();
        const fileName = `${userId}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('payment-proofs')
          .upload(fileName, screenshot);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('payment-proofs')
          .getPublicUrl(fileName);
        
        screenshotUrl = fileName; // Store path for admin access
        setIsUploading(false);
      }

      // Create transaction
      const paymentMethod = selectedMethod === 'bank' ? 'bank_transfer' : selectedMethod;
      
      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: userId,
          type: 'deposit' as const,
          amount_pkr: currency === 'PKR' ? parseFloat(amount) : null,
          amount_usd: currency === 'USD' ? parseFloat(amount) : null,
          currency,
          payment_method: paymentMethod as 'bank_transfer' | 'easypaisa' | 'jazzcash',
          status: 'pending' as const,
          description: `Balance deposit via ${selectedMethod}`,
          screenshot_url: screenshotUrl,
        });

      if (error) throw error;

      toast.success("Balance request submitted! Waiting for admin approval.");
      onSuccess();
      onClose();
      resetForm();
    } catch (error: any) {
      console.error('Error submitting balance request:', error);
      toast.error(error.message || "Failed to submit request");
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setAmount("");
    setCurrency("PKR");
    setSelectedMethod(null);
    setScreenshot(null);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I've made a payment of ${currency} ${amount} via ${selectedMethod}. Please approve my balance.`
    );
    window.open(`https://wa.me/923489057646?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Add Balance</h2>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-background/50 transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="flex gap-2 mt-3">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    s <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <Label className="text-foreground">Amount</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-foreground">Currency</Label>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    {["PKR", "USD"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c as "PKR" | "USD")}
                        className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                          currency === c
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="w-full mt-4"
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="font-semibold text-foreground mb-3">Select Payment Method</h3>
                
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedMethod === method.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${method.color}`}>
                        <method.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{method.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {method.details.number || method.details.iban}
                        </p>
                        <p className="text-xs text-muted-foreground">{method.details.name}</p>
                      </div>
                      {selectedMethod === method.id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </button>
                ))}

                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!selectedMethod}
                    className="flex-1"
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-500">Manual Approval Required</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your balance will be added after admin verifies your payment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-2xl font-bold text-foreground">{currency} {amount}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Via {paymentMethods.find(m => m.id === selectedMethod)?.name}
                  </p>
                </div>

                <div>
                  <Label className="text-foreground">Upload Payment Screenshot (Optional)</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <label htmlFor="screenshot-upload" className="cursor-pointer">
                      {screenshot ? (
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <CheckCircle className="h-5 w-5" />
                          <span>{screenshot.name}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Upload className="h-8 w-8" />
                          <span>Click to upload screenshot</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      isUploading ? "Uploading..." : "Submitting..."
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={openWhatsApp}
                    className="w-full gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send Proof via WhatsApp
                  </Button>

                  <Button variant="ghost" onClick={() => setStep(2)}>
                    Back
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
