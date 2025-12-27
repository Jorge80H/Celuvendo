import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    category: "Compras y Pagos",
    questions: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos múltiples métodos de pago para tu comodidad: tarjetas de crédito y débito (Visa, Mastercard, American Express), PSE (Pagos Seguros en Línea), transferencias bancarias, y pago contra entrega en ciudades principales. Todos nuestros pagos en línea son procesados de forma segura."
      },
      {
        question: "¿Los precios incluyen IVA?",
        answer: "De acuerdo con la legislación colombiana vigente, los productos con precio inferior a $1.095.000 COP están exentos de IVA. Para productos con precio igual o superior a este monto, el IVA del 19% ya está incluido en el precio publicado. El precio que ves es el precio final que pagarás."
      },
      {
        question: "¿Puedo comprar sin registrarme?",
        answer: "Sí, puedes realizar compras como invitado. Sin embargo, te recomendamos crear una cuenta para que puedas hacer seguimiento de tus pedidos, guardar tus direcciones de envío y recibir ofertas exclusivas."
      },
      {
        question: "¿Emiten factura electrónica?",
        answer: "Sí, emitimos factura electrónica para todas las compras. La recibirás en tu correo electrónico una vez se procese tu pedido. Si necesitas que la factura tenga datos específicos de tu empresa, por favor indícalo al momento de la compra."
      }
    ]
  },
  {
    category: "Envíos",
    questions: [
      {
        question: "¿Cuánto tiempo tarda el envío?",
        answer: "Los tiempos de entrega varían según tu ubicación: Bogotá, Medellín, Cali y Barranquilla: 1-3 días hábiles. Otras ciudades principales: 3-5 días hábiles. Municipios y zonas rurales: 5-8 días hábiles. Ten en cuenta que estos son tiempos estimados y pueden variar según disponibilidad de inventario y situaciones de fuerza mayor."
      },
      {
        question: "¿Cuál es el costo del envío?",
        answer: "El envío es GRATIS en todas las compras superiores a $100,000 COP. Para compras menores, el costo de envío se calcula según tu ubicación y el peso del paquete, generalmente entre $10,000 y $20,000 COP."
      },
      {
        question: "¿Hacen envíos a todo Colombia?",
        answer: "Sí, hacemos envíos a todo el territorio nacional colombiano, incluyendo zonas rurales. Trabajamos con transportadoras confiables como Servientrega, Coordinadora e Interrapidísimo para garantizar que tu pedido llegue en perfectas condiciones."
      },
      {
        question: "¿Puedo recoger mi pedido en una tienda física?",
        answer: "Sí, contamos con tiendas físicas en Bogotá donde puedes recoger tu pedido o realizar devoluciones: Tienda Alcalá (Calle 137 # 45-21), Tienda Ensueño (Av. Gaitán Cortés con Calle 59 Sur, CC Ensueño Local 114), y Tienda Tunal (Calle 48C Sur # 24-80, CC Tunal Local 1036)."
      }
    ]
  },
  {
    category: "Productos y Disponibilidad",
    questions: [
      {
        question: "¿Los celulares son nuevos y originales?",
        answer: "Absolutamente. Todos nuestros celulares son 100% nuevos, sellados de fábrica y originales. Trabajamos directamente con distribuidores autorizados en Colombia y cada equipo cuenta con garantía oficial del fabricante."
      },
      {
        question: "¿Los celulares son liberados?",
        answer: "Sí, todos los celulares que vendemos son liberados de fábrica, lo que significa que puedes usarlos con cualquier operador móvil en Colombia (Claro, Movistar, Tigo, Wom, etc.) y en el extranjero."
      },
      {
        question: "¿Qué incluye la caja del celular?",
        answer: "El contenido varía según el fabricante y modelo, pero generalmente incluye: el celular, cable USB-C, herramienta para extraer la bandeja SIM, manual de usuario y documentación de garantía. Nota: Muchos fabricantes ya no incluyen cargador de pared ni audífonos en la caja (se indican en las especificaciones del producto)."
      },
      {
        question: "¿Tienen stock disponible de todos los productos?",
        answer: "Nuestro inventario se actualiza en tiempo real. Si un producto aparece como 'Disponible' en nuestra web, significa que tenemos stock físico. En caso de que un producto se agote después de tu compra, te contactaremos de inmediato para ofrecerte alternativas o reembolso completo."
      }
    ]
  },
  {
    category: "Garantía y Soporte",
    questions: [
      {
        question: "¿Cuál es el tiempo de garantía?",
        answer: "Todos los celulares tienen garantía oficial del fabricante por 12 meses contra defectos de fábrica. La garantía se hace efectiva directamente con el fabricante a través de sus centros de servicio autorizados en Colombia."
      },
      {
        question: "¿Qué cubre la garantía?",
        answer: "La garantía del fabricante cubre defectos de fabricación y mal funcionamiento del equipo bajo uso normal, incluyendo: problemas de hardware (pantalla, botones, puertos), problemas de software de fábrica, batería defectuosa, y problemas con las cámaras o sensores. No cubre daños físicos por caídas, golpes, contacto con líquidos (excepto si tiene certificación IP y falla), ni desgaste normal por uso."
      },
      {
        question: "¿Cómo hago efectiva la garantía?",
        answer: "La garantía se hace efectiva directamente con el fabricante. Debes dirigirte a un centro de servicio autorizado de la marca de tu celular con tu factura de compra. En nuestra página de Garantía encontrarás los enlaces directos al soporte oficial de cada marca en Colombia (Samsung, Motorola, Xiaomi, OPPO, TECNO, INFINIX)."
      }
    ]
  },
  {
    category: "Devoluciones y Cambios",
    questions: [
      {
        question: "¿Puedo devolver un producto?",
        answer: "Sí, puedes devolver tu compra según la ley colombiana de retracto, siempre que el producto esté sin usar, con todos sus accesorios, manuales y en su empaque original. Puedes realizar la devolución en nuestras tiendas físicas en Bogotá o solicitando recolección a domicilio. Consulta nuestra página de Envíos y Devoluciones para más detalles."
      },
      {
        question: "¿Puedo cambiar un producto por otro modelo?",
        answer: "Sí, puedes solicitar un cambio siempre que el producto esté en las mismas condiciones que cuando lo recibiste. Puedes hacerlo en nuestras tiendas físicas en Bogotá o contactándonos. Si el nuevo modelo tiene un precio diferente, se hará el ajuste correspondiente (reembolso o pago adicional)."
      },
      {
        question: "¿Cuánto tiempo tarda el reembolso?",
        answer: "Una vez recibamos y verifiquemos que el producto cumple las condiciones de devolución, procesamos el reembolso en 5-10 días hábiles. El tiempo que tarde en reflejarse en tu cuenta depende de tu entidad financiera: tarjetas de crédito (1-2 ciclos de facturación), cuentas bancarias (3-5 días hábiles), PSE (5-7 días hábiles)."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">
              Preguntas Frecuentes
            </h1>
            <p className="text-muted-foreground text-lg">
              Encuentra respuestas a las preguntas más comunes sobre compras, envíos y garantías
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((category, idx) => (
              <Card key={idx} className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-primary">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, qIdx) => (
                    <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            ))}
          </div>

          <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
            <h3 className="text-lg font-semibold mb-2">¿No encuentras lo que buscas?</h3>
            <p className="text-muted-foreground mb-4">
              Nuestro equipo de soporte está listo para ayudarte con cualquier duda adicional.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/573214029724"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                WhatsApp: +57 321 402 9724
              </a>
              <a
                href="mailto:soporte@celuvendo.com"
                className="inline-flex items-center justify-center px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                soporte@celuvendo.com
              </a>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
