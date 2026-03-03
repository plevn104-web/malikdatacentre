import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "+923489057646";
const WHATSAPP_BASE_URL = "https://wa.me";
const DEFAULT_MESSAGE = "Hello, I'm interested in your services. Please share more details.";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  floating?: boolean;
}

export const WhatsAppButton = ({
  message = DEFAULT_MESSAGE,
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
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)] animate-[wa-pulse_2.5s_ease-in-out_infinite]"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
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
