import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

export default function WhatsAppFloat() {
  const { toast } = useToast();

  const handleWhatsAppClick = () => {
    // Track Contact event with Facebook Pixel
    ReactPixel.track('Contact', {
      content_name: 'WhatsApp Click'
    });

    const phoneNumber = "573168880808";
    const message = encodeURIComponent("Hola! Vengo de Celuvendo.com y me gustaría obtener información sobre celulares.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  useEffect(() => {
    // Show first notification after 30 seconds
    const firstTimer = setTimeout(() => {
      toast({
        title: "¿Tienes alguna duda?",
        description: "Escríbenos por WhatsApp y te ayudamos con gusto",
        action: (
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Chatear
          </button>
        ),
        duration: 8000,
      });
    }, 30000); // 30 seconds

    // Show subsequent notifications every 5 minutes
    const recurringTimer = setInterval(() => {
      toast({
        title: "¿Tienes alguna duda?",
        description: "Escríbenos por WhatsApp y te ayudamos con gusto",
        action: (
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Chatear
          </button>
        ),
        duration: 8000,
      });
    }, 300000); // 5 minutes

    return () => {
      clearTimeout(firstTimer);
      clearInterval(recurringTimer);
    };
  }, [toast]);

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center group"
      style={{ zIndex: 9999 }}
      aria-label="Chatear con agente de IA en WhatsApp"
      data-testid="button-whatsapp-float"
    >
      <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
      <span className="sr-only">WhatsApp</span>
    </button>
  );
}
