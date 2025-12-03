import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "573332725157";
    const message = encodeURIComponent("Hola! Me gustaría obtener información sobre sus productos.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-24 right-6 h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center group animate-pulse hover:animate-none"
      style={{ zIndex: 9999 }}
      aria-label="Chatear con agente de IA en WhatsApp"
      data-testid="button-whatsapp-float"
    >
      <MessageCircle className="h-8 w-8 group-hover:scale-110 transition-transform" />
      <span className="sr-only">WhatsApp</span>
    </button>
  );
}
