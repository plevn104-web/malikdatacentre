import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "+923489057646";
const WHATSAPP_BASE_URL = "https://wa.me";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  floating?: boolean;
}

export const WhatsAppButton = ({
  message = "Hello, I have sent the payment. Here is the screenshot. Please process my order.",
  className = "",
  children,
  size = "default",
  floating = false,
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  if (floating) {
    return (
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_50px_rgba(37,211,102,0.7)]"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-8 w-8" />
      </button>
    );
  }

  return (
    <Button
      variant="whatsapp"
      size={size}
      onClick={handleClick}
      className={className}
    >
      <MessageCircle className="h-5 w-5" />
      {children || "Order on WhatsApp"}
    </Button>
  );
};
