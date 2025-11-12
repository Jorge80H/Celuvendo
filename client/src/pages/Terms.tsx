import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">
              Términos y Condiciones
            </h1>
            <p className="text-muted-foreground text-sm">
              Última actualización: Enero 2025
            </p>
          </div>

          <div className="prose prose-sm max-w-none space-y-6">
            {/* Introducción */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">1. Introducción</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bienvenido a Celuvendo. Estos Términos y Condiciones regulan el uso de nuestro sitio web
                y los servicios que ofrecemos. Al acceder y realizar una compra en nuestro sitio,
                aceptas estar sujeto a estos términos. Si no estás de acuerdo con alguna parte de estos
                términos, por favor no utilices nuestro sitio web.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                <strong>Celuvendo</strong> es una marca comercial registrada que opera bajo las leyes
                de la República de Colombia. Nuestro objetivo es ofrecer celulares originales, nuevos
                y de alta calidad a precios competitivos en todo el territorio nacional.
              </p>
            </Card>

            {/* Definiciones */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">2. Definiciones</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>"Nosotros"</strong> o <strong>"Celuvendo"</strong> se refiere a la empresa propietaria y operadora del sitio web.</li>
                <li><strong>"Usuario"</strong> o <strong>"Cliente"</strong> se refiere a cualquier persona que accede y utiliza nuestro sitio web.</li>
                <li><strong>"Producto"</strong> se refiere a cualquier celular, accesorio o servicio ofrecido en nuestro sitio web.</li>
                <li><strong>"Pedido"</strong> se refiere a la solicitud de compra realizada por el usuario a través de nuestro sitio.</li>
                <li><strong>"Sitio"</strong> se refiere a www.celuvendo.com y todas sus subdominios.</li>
              </ul>
            </Card>

            {/* Uso del sitio */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">3. Uso del Sitio Web</h2>
              <h3 className="font-semibold mb-2 mt-4">3.1 Elegibilidad</h3>
              <p className="text-muted-foreground leading-relaxed">
                Debes tener al menos 18 años de edad o contar con autorización de un tutor legal para
                realizar compras en nuestro sitio. Al realizar un pedido, declaras que cumples con este
                requisito.
              </p>
              <h3 className="font-semibold mb-2 mt-4">3.2 Cuenta de Usuario</h3>
              <p className="text-muted-foreground leading-relaxed">
                Puedes crear una cuenta para facilitar tus compras futuras. Eres responsable de mantener
                la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta.
                Debes notificarnos inmediatamente si sospechas de un uso no autorizado de tu cuenta.
              </p>
              <h3 className="font-semibold mb-2 mt-4">3.3 Uso Prohibido</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Te comprometes a NO utilizar nuestro sitio para:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Realizar actividades fraudulentas o ilegales</li>
                <li>Violar derechos de propiedad intelectual</li>
                <li>Transmitir virus, malware o cualquier código malicioso</li>
                <li>Realizar ingeniería inversa o intentar acceder a áreas no autorizadas</li>
                <li>Revender productos sin autorización previa por escrito</li>
                <li>Hacer scraping automatizado de precios o inventario</li>
              </ul>
            </Card>

            {/* Productos y Precios */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">4. Productos y Precios</h2>
              <h3 className="font-semibold mb-2 mt-4">4.1 Información de Productos</h3>
              <p className="text-muted-foreground leading-relaxed">
                Hacemos todo lo posible para que la información de productos (especificaciones, imágenes,
                descripciones) sea precisa. Sin embargo, no garantizamos que toda la información sea
                completamente precisa, completa o actualizada. Las imágenes son referenciales y pueden
                variar ligeramente del producto real.
              </p>
              <h3 className="font-semibold mb-2 mt-4">4.2 Precios</h3>
              <p className="text-muted-foreground leading-relaxed">
                Todos los precios están expresados en Pesos Colombianos (COP) e incluyen IVA del 19%.
                Nos reservamos el derecho de modificar precios en cualquier momento sin previo aviso.
                El precio aplicable será el vigente al momento de realizar el pedido.
              </p>
              <h3 className="font-semibold mb-2 mt-4">4.3 Disponibilidad</h3>
              <p className="text-muted-foreground leading-relaxed">
                La disponibilidad de productos se actualiza en tiempo real, pero no podemos garantizar
                que un producto esté disponible hasta que tu pedido sea confirmado. Si un producto se
                agota después de tu compra, te contactaremos para ofrecerte alternativas o reembolso.
              </p>
            </Card>

            {/* Proceso de Compra */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">5. Proceso de Compra y Pago</h2>
              <h3 className="font-semibold mb-2 mt-4">5.1 Pedidos</h3>
              <p className="text-muted-foreground leading-relaxed">
                Al realizar un pedido, estás haciendo una oferta de compra. Todos los pedidos están
                sujetos a confirmación y aceptación por nuestra parte. Nos reservamos el derecho de
                rechazar cualquier pedido por cualquier motivo, incluyendo pero no limitado a:
                disponibilidad de producto, errores en el precio, sospecha de fraude.
              </p>
              <h3 className="font-semibold mb-2 mt-4">5.2 Métodos de Pago</h3>
              <p className="text-muted-foreground leading-relaxed">
                Aceptamos tarjetas de crédito, débito, PSE, transferencias bancarias y pago contra entrega
                (en ciudades seleccionadas). Todos los pagos en línea son procesados a través de pasarelas
                de pago seguras certificadas. No almacenamos información completa de tarjetas de crédito
                en nuestros servidores.
              </p>
              <h3 className="font-semibold mb-2 mt-4">5.3 Confirmación</h3>
              <p className="text-muted-foreground leading-relaxed">
                Recibirás un correo electrónico de confirmación una vez que tu pedido sea procesado.
                Este correo no constituye la aceptación final del pedido, sino una confirmación de que
                lo hemos recibido.
              </p>
              <h3 className="font-semibold mb-2 mt-4">5.4 Facturación</h3>
              <p className="text-muted-foreground leading-relaxed">
                Emitimos factura electrónica para todas las compras conforme a la normativa DIAN. La
                factura será enviada a tu correo electrónico registrado y no puede ser modificada una
                vez emitida.
              </p>
            </Card>

            {/* Envío y Entrega */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">6. Envío y Entrega</h2>
              <p className="text-muted-foreground leading-relaxed">
                Los tiempos de entrega son estimados y pueden variar según tu ubicación geográfica.
                No nos hacemos responsables por retrasos causados por la transportadora, condiciones
                climáticas, paros, huelgas u otras situaciones de fuerza mayor.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Es tu responsabilidad proporcionar una dirección de entrega correcta y completa. No nos
                hacemos responsables por entregas fallidas debido a información incorrecta o incompleta.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Al recibir tu pedido, te recomendamos revisar el paquete en presencia del transportador.
                Si el paquete presenta daños visibles, tienes derecho a rechazar la entrega.
              </p>
            </Card>

            {/* Derecho de Retracto */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">7. Derecho de Retracto y Devoluciones</h2>
              <p className="text-muted-foreground leading-relaxed">
                De conformidad con el Estatuto del Consumidor (Ley 1480 de 2011), tienes derecho a
                retractarte de tu compra dentro de los cinco (5) días hábiles siguientes a la recepción
                del producto, sin necesidad de justificación.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Para ejercer este derecho, el producto debe estar sin usar, en su empaque original,
                con todos sus accesorios y documentación. El costo del retorno es asumido por Celuvendo.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                El reembolso se realizará utilizando el mismo método de pago original y se procesará
                dentro de los 5-10 días hábiles posteriores a la recepción y verificación del producto.
              </p>
            </Card>

            {/* Garantía */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">8. Garantía</h2>
              <p className="text-muted-foreground leading-relaxed">
                Todos los productos vendidos por Celuvendo cuentan con garantía oficial del fabricante
                por 12 meses contra defectos de fábrica. La garantía no cubre daños por mal uso,
                accidentes, caídas, exposición a líquidos (salvo dispositivos con certificación IP),
                modificaciones no autorizadas o desgaste normal.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Para mayor información sobre garantía, consulta nuestra página dedicada de Garantía.
              </p>
            </Card>

            {/* Propiedad Intelectual */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">9. Propiedad Intelectual</h2>
              <p className="text-muted-foreground leading-relaxed">
                Todo el contenido de este sitio web, incluyendo pero no limitado a texto, gráficos,
                logos, imágenes, videos, código fuente y software, es propiedad de Celuvendo o sus
                proveedores de contenido y está protegido por las leyes colombianas e internacionales
                de propiedad intelectual.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                No está permitido reproducir, distribuir, modificar, crear trabajos derivados,
                exhibir públicamente o explotar comercialmente ningún contenido de este sitio sin
                autorización previa por escrito de Celuvendo.
              </p>
            </Card>

            {/* Privacidad */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">10. Privacidad y Protección de Datos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cumplimos con la Ley 1581 de 2012 sobre Protección de Datos Personales en Colombia.
                Al utilizar nuestro sitio, aceptas nuestra recopilación y uso de información personal
                según lo descrito en nuestra Política de Privacidad.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Tus datos personales serán utilizados únicamente para procesar pedidos, mejorar tu
                experiencia de compra y enviarte información sobre productos y ofertas (si has dado
                tu consentimiento). Nunca compartiremos tu información con terceros sin tu autorización,
                excepto cuando sea necesario para procesar tu pedido (transportadoras, procesadores de pago).
              </p>
            </Card>

            {/* Limitación de Responsabilidad */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">11. Limitación de Responsabilidad</h2>
              <p className="text-muted-foreground leading-relaxed">
                En la máxima medida permitida por la ley, Celuvendo no será responsable por daños
                indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo pero no
                limitado a pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Nuestra responsabilidad total por cualquier reclamo relacionado con nuestros servicios
                no excederá el monto pagado por el producto en cuestión.
              </p>
            </Card>

            {/* Ley Aplicable */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">12. Ley Aplicable y Jurisdicción</h2>
              <p className="text-muted-foreground leading-relaxed">
                Estos Términos y Condiciones se rigen por las leyes de la República de Colombia.
                Cualquier disputa relacionada con estos términos será resuelta por los tribunales
                competentes de Bogotá, Colombia.
              </p>
            </Card>

            {/* Modificaciones */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">13. Modificaciones de los Términos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento.
                Los cambios serán efectivos inmediatamente después de su publicación en el sitio web.
                Es tu responsabilidad revisar periódicamente estos términos. El uso continuado del sitio
                después de modificaciones constituye tu aceptación de los nuevos términos.
              </p>
            </Card>

            {/* Contacto */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">14. Información de Contacto</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos a través de:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> legal@celuvendo.com</p>
                <p><strong>WhatsApp:</strong> +57 300 123 4567</p>
                <p><strong>Horario de atención:</strong> Lunes a Viernes 8:00 AM - 6:00 PM, Sábados 9:00 AM - 3:00 PM</p>
              </div>
            </Card>

            {/* Separabilidad */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">15. Separabilidad</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si alguna disposición de estos Términos y Condiciones es considerada inválida o
                inaplicable por un tribunal competente, las demás disposiciones continuarán en pleno
                vigor y efecto.
              </p>
            </Card>

            {/* Acuerdo Completo */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">16. Acuerdo Completo</h2>
              <p className="text-muted-foreground leading-relaxed">
                Estos Términos y Condiciones, junto con nuestra Política de Privacidad y cualquier
                otro documento legal referenciado, constituyen el acuerdo completo entre tú y Celuvendo
                con respecto al uso de nuestro sitio web y servicios.
              </p>
            </Card>
          </div>

          <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
            <p className="text-center text-sm text-muted-foreground">
              Al realizar una compra en Celuvendo, confirmas que has leído, entendido y aceptado
              estos Términos y Condiciones en su totalidad.
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
