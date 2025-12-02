import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">
              Política de Privacidad y Aviso de Privacidad
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
                Celuvendo, en cumplimiento de la Ley 1581 de 2012 (Ley de Protección de Datos Personales)
                y su Decreto Reglamentario 1377 de 2013, se compromete a proteger la privacidad y los datos
                personales de sus usuarios y clientes. Esta Política de Privacidad describe cómo recopilamos,
                usamos, almacenamos y protegemos su información personal.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Al utilizar nuestro sitio web y servicios, usted acepta las prácticas descritas en esta política.
                Si no está de acuerdo con estas prácticas, por favor no utilice nuestros servicios.
              </p>
            </Card>

            {/* Responsable del Tratamiento */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">2. Responsable del Tratamiento de Datos</h2>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Razón Social:</strong> Celuvendo</p>
                <p><strong>Domicilio:</strong> Bogotá, Colombia</p>
                <p><strong>Correo electrónico:</strong> privacidad@celuvendo.com</p>
                <p><strong>Teléfono:</strong> +57 316 888 0808</p>
              </div>
            </Card>

            {/* Información que Recopilamos */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">3. Información que Recopilamos</h2>
              <h3 className="font-semibold mb-2 mt-4">3.1 Información que usted nos proporciona</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li><strong>Datos de identificación:</strong> Nombre completo, número de documento de identidad, fecha de nacimiento</li>
                <li><strong>Datos de contacto:</strong> Dirección física, correo electrónico, número de teléfono</li>
                <li><strong>Información de pago:</strong> Datos de tarjeta de crédito/débito (procesados de forma segura por nuestros proveedores de pago)</li>
                <li><strong>Historial de compras:</strong> Pedidos realizados, productos adquiridos, preferencias de compra</li>
              </ul>

              <h3 className="font-semibold mb-2 mt-4">3.2 Información recopilada automáticamente</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li><strong>Datos de navegación:</strong> Dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia</li>
                <li><strong>Cookies:</strong> Utilizamos cookies para mejorar su experiencia de usuario (ver sección de cookies)</li>
                <li><strong>Datos del dispositivo:</strong> Tipo de dispositivo, sistema operativo, identificadores únicos</li>
              </ul>
            </Card>

            {/* Finalidades del Tratamiento */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">4. Finalidades del Tratamiento de Datos</h2>
              <p className="text-muted-foreground mb-3">
                Utilizamos sus datos personales para las siguientes finalidades:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li>Procesar y gestionar sus pedidos y compras</li>
                <li>Realizar entregas de productos adquiridos</li>
                <li>Emitir facturas electrónicas y comprobantes de compra</li>
                <li>Brindar servicio de atención al cliente y soporte técnico</li>
                <li>Gestionar garantías y devoluciones</li>
                <li>Enviar notificaciones sobre el estado de sus pedidos</li>
                <li>Mejorar nuestros productos y servicios</li>
                <li>Realizar análisis estadísticos y de mercado (datos anonimizados)</li>
                <li>Cumplir con obligaciones legales y fiscales (DIAN, SIC, etc.)</li>
                <li>Prevenir fraude y garantizar la seguridad de nuestros sistemas</li>
                <li>Enviar comunicaciones de marketing (solo con su consentimiento previo)</li>
              </ul>
            </Card>

            {/* Base Legal */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">5. Base Legal del Tratamiento</h2>
              <p className="text-muted-foreground leading-relaxed">
                El tratamiento de sus datos personales se basa en:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4 mt-3">
                <li><strong>Consentimiento:</strong> Usted nos ha dado su consentimiento explícito para el tratamiento de sus datos</li>
                <li><strong>Ejecución de contrato:</strong> El tratamiento es necesario para cumplir con nuestras obligaciones contractuales</li>
                <li><strong>Obligación legal:</strong> Debemos cumplir con obligaciones legales (facturación, impuestos, etc.)</li>
                <li><strong>Interés legítimo:</strong> Para mejorar nuestros servicios y prevenir fraude</li>
              </ul>
            </Card>

            {/* Compartir Información */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">6. ¿Con Quién Compartimos su Información?</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Podemos compartir sus datos personales con terceros únicamente en los siguientes casos:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li><strong>Transportadoras:</strong> Servientrega, Coordinadora, Interrapidísimo (para realizar entregas)</li>
                <li><strong>Procesadores de pago:</strong> Plataformas de pago seguras (Stripe, PSE, etc.)</li>
                <li><strong>Proveedores de servicios:</strong> Servicios de hosting, análisis web, email marketing</li>
                <li><strong>Autoridades:</strong> Cuando sea requerido por ley o para cumplir con obligaciones legales</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Todos nuestros proveedores están obligados contractualmente a proteger sus datos y solo pueden
                usarlos para los fines específicos que les hemos autorizado.
              </p>
            </Card>

            {/* Derechos del Titular */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">7. Sus Derechos (Derechos ARCO)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Como titular de datos personales, usted tiene los siguientes derechos:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li><strong>Acceso:</strong> Conocer qué datos personales tenemos sobre usted</li>
                <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos</li>
                <li><strong>Cancelación:</strong> Solicitar la eliminación de sus datos cuando ya no sean necesarios</li>
                <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos en ciertos casos</li>
                <li><strong>Revocación del consentimiento:</strong> Retirar su consentimiento en cualquier momento</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Para ejercer estos derechos, puede contactarnos a través de:
              </p>
              <div className="space-y-2 text-muted-foreground mt-3">
                <p>• <strong>Correo electrónico:</strong> privacidad@celuvendo.com</p>
                <p>• <strong>WhatsApp:</strong> +57 316 888 0808</p>
                <p>• <strong>Correo postal:</strong> Atención al titular de datos, Bogotá, Colombia</p>
              </div>
            </Card>

            {/* Seguridad */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">8. Seguridad de sus Datos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Implementamos medidas técnicas, administrativas y físicas apropiadas para proteger sus datos
                personales contra acceso no autorizado, pérdida, alteración o divulgación, incluyendo:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4 mt-3">
                <li>Cifrado SSL/TLS para todas las comunicaciones</li>
                <li>Servidores seguros y protegidos con firewall</li>
                <li>Acceso restringido a datos personales solo para personal autorizado</li>
                <li>Políticas de contraseñas seguras</li>
                <li>Monitoreo continuo de seguridad</li>
                <li>Copias de seguridad periódicas</li>
              </ul>
            </Card>

            {/* Retención de Datos */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">9. Retención de Datos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Conservamos sus datos personales solo durante el tiempo necesario para cumplir con las
                finalidades para las que fueron recopilados, incluyendo:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4 mt-3">
                <li>Datos de transacciones: 5 años (obligación fiscal DIAN)</li>
                <li>Datos de garantía: Hasta 1 año después del vencimiento de la garantía</li>
                <li>Datos de marketing: Hasta que retire su consentimiento</li>
                <li>Datos de cuenta de usuario: Mientras su cuenta esté activa</li>
              </ul>
            </Card>

            {/* Cookies */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">10. Uso de Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web.
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo.
              </p>
              <h3 className="font-semibold mb-2 mt-4">Tipos de cookies que utilizamos:</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio</li>
                <li><strong>Cookies de rendimiento:</strong> Para analizar cómo se usa el sitio</li>
                <li><strong>Cookies de funcionalidad:</strong> Para recordar sus preferencias</li>
                <li><strong>Cookies de marketing:</strong> Para mostrar publicidad relevante (solo con su consentimiento)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad
                del sitio web.
              </p>
            </Card>

            {/* Menores de Edad */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">11. Menores de Edad</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nuestros servicios están dirigidos a mayores de 18 años. No recopilamos intencionalmente
                datos personales de menores de edad sin el consentimiento de sus padres o tutores legales.
                Si descubrimos que hemos recopilado datos de un menor sin autorización, eliminaremos
                esa información de inmediato.
              </p>
            </Card>

            {/* Transferencias Internacionales */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">12. Transferencias Internacionales de Datos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de Colombia.
                En estos casos, nos aseguramos de que existan garantías adecuadas para proteger sus datos
                conforme a la legislación colombiana, mediante contratos de transferencia de datos y
                cláusulas de protección.
              </p>
            </Card>

            {/* Modificaciones */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">13. Modificaciones a esta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento.
                Cualquier cambio será publicado en esta página con una fecha de actualización. Le recomendamos
                revisar periódicamente esta política para estar informado sobre cómo protegemos sus datos.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Si realizamos cambios sustanciales, le notificaremos por correo electrónico o mediante
                un aviso destacado en nuestro sitio web.
              </p>
            </Card>

            {/* Autoridad de Control */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">14. Autoridad de Control</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si considera que el tratamiento de sus datos personales vulnera la normativa vigente,
                puede presentar una queja ante la Superintendencia de Industria y Comercio (SIC),
                entidad encargada de velar por la protección de datos personales en Colombia.
              </p>
              <div className="space-y-2 text-muted-foreground mt-3">
                <p><strong>Superintendencia de Industria y Comercio</strong></p>
                <p>Sitio web: www.sic.gov.co</p>
                <p>Línea gratuita nacional: 01 8000 910 165</p>
                <p>Correo: contactenos@sic.gov.co</p>
              </div>
            </Card>

            {/* Contacto */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">15. Contacto</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Si tiene preguntas, comentarios o inquietudes sobre esta Política de Privacidad o sobre
                el tratamiento de sus datos personales, puede contactarnos:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> privacidad@celuvendo.com</p>
                <p><strong>WhatsApp:</strong> +57 316 888 0808</p>
                <p><strong>Horario de atención:</strong> Lunes a Viernes 8:00 AM - 6:00 PM, Sábados 9:00 AM - 3:00 PM</p>
              </div>
            </Card>
          </div>

          <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
            <p className="text-center text-sm text-muted-foreground">
              Al utilizar nuestros servicios, confirmas que has leído y comprendido esta Política de Privacidad
              y aceptas el tratamiento de tus datos personales conforme a lo aquí establecido.
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
