import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    // WhatsApp number for Celuvendo - Replace with actual number
    const phoneNumber = "573001234567"; // Update with real WhatsApp number
    const message = encodeURIComponent("Hola! Me gustaría obtener información sobre sus productos.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-green-500 hover:bg-green-600 text-white z-50 flex items-center justify-center group"
      aria-label="Chatear con agente de IA en WhatsApp"
      data-testid="button-whatsapp-float"
    >
      <MessageCircle className="h-8 w-8 group-hover:scale-110 transition-transform" />
      <span className="sr-only">WhatsApp</span>
    </Button>
  );
}
