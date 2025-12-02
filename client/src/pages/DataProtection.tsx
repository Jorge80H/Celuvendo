import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function DataProtection() {
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
              Política de Tratamiento de Datos Personales
            </h1>
            <p className="text-muted-foreground text-sm">
              Conforme a la Ley 1581 de 2012 y Decreto 1377 de 2013
            </p>
            <p className="text-muted-foreground text-sm">
              Última actualización: Enero 2025
            </p>
          </div>

          <div className="prose prose-sm max-w-none space-y-6">
            {/* Introducción */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h2 className="text-xl font-semibold mb-3">Declaración de Compromiso</h2>
              <p className="text-muted-foreground leading-relaxed">
                Celuvendo, como responsable del tratamiento de datos personales, se compromete a proteger
                la privacidad de sus clientes, usuarios y cualquier persona cuyos datos sean tratados en
                el desarrollo de sus actividades comerciales. Esta política establece los lineamientos y
                procedimientos para la recolección, almacenamiento, uso, circulación y supresión de datos
                personales en cumplimiento de la Ley 1581 de 2012 (Ley de Habeas Data) y sus decretos
                reglamentarios.
              </p>
            </Card>

            {/* Identificación del Responsable */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">1. Identificación del Responsable del Tratamiento</h2>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Razón Social:</strong> Celuvendo</p>
                <p><strong>Domicilio Principal:</strong> Bogotá, Colombia</p>
                <p><strong>Correo electrónico para ejercicio de derechos:</strong> privacidad@celuvendo.com</p>
                <p><strong>Teléfono de contacto:</strong> +57 316 888 0808</p>
                <p><strong>Sitio web:</strong> www.celuvendo.com</p>
              </div>
            </Card>

            {/* Definiciones */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">2. Definiciones</h2>
              <p className="text-muted-foreground mb-3">
                Para efectos de esta política, se entiende por:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <strong>Titular:</strong> Persona natural cuyos datos personales sean objeto de tratamiento.
                </li>
                <li>
                  <strong>Dato Personal:</strong> Cualquier información vinculada o que pueda asociarse a una o varias
                  personas naturales determinadas o determinables.
                </li>
                <li>
                  <strong>Tratamiento:</strong> Cualquier operación o conjunto de operaciones sobre datos personales,
                  tales como recolección, almacenamiento, uso, circulación o supresión.
                </li>
                <li>
                  <strong>Base de Datos:</strong> Conjunto organizado de datos personales que sea objeto de tratamiento.
                </li>
                <li>
                  <strong>Responsable del Tratamiento:</strong> Persona natural o jurídica que decide sobre el tratamiento
                  de datos personales. En este caso, Celuvendo.
                </li>
                <li>
                  <strong>Encargado del Tratamiento:</strong> Persona natural o jurídica que realiza el tratamiento de
                  datos personales por cuenta del responsable.
                </li>
                <li>
                  <strong>Autorización:</strong> Consentimiento previo, expreso e informado del titular para llevar a
                  cabo el tratamiento de datos personales.
                </li>
              </ul>
            </Card>

            {/* Principios */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">3. Principios Rectores del Tratamiento de Datos</h2>
              <p className="text-muted-foreground mb-3">
                Celuvendo aplicará los siguientes principios en el tratamiento de datos personales:
              </p>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <strong>a) Legalidad:</strong> El tratamiento se realizará conforme a las disposiciones vigentes y aplicables.
                </div>
                <div>
                  <strong>b) Finalidad:</strong> El tratamiento obedecerá a una finalidad legítima, la cual será informada al titular.
                </div>
                <div>
                  <strong>c) Libertad:</strong> El tratamiento solo se ejercerá con el consentimiento previo, expreso e informado del titular.
                </div>
                <div>
                  <strong>d) Veracidad o Calidad:</strong> La información sujeta a tratamiento debe ser veraz, completa, exacta,
                  actualizada, comprobable y comprensible.
                </div>
                <div>
                  <strong>e) Transparencia:</strong> Se garantiza el derecho del titular a obtener información sobre el tratamiento
                  de sus datos personales.
                </div>
                <div>
                  <strong>f) Acceso y Circulación Restringida:</strong> Los datos personales no estarán disponibles en Internet
                  u otros medios de divulgación masiva, salvo que el acceso sea técnicamente controlable.
                </div>
                <div>
                  <strong>g) Seguridad:</strong> Se adoptarán medidas técnicas, humanas y administrativas necesarias para otorgar
                  seguridad a los datos personales.
                </div>
                <div>
                  <strong>h) Confidencialidad:</strong> Todas las personas que intervengan en el tratamiento están obligadas a
                  garantizar la reserva de la información.
                </div>
              </div>
            </Card>

            {/* Datos Recopilados */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">4. Tipo de Datos Personales Recopilados</h2>
              <p className="text-muted-foreground mb-3">
                Celuvendo puede recopilar y tratar las siguientes categorías de datos personales:
              </p>
              <h3 className="font-semibold mb-2 mt-4">4.1 Datos de Identificación</h3>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside ml-4">
                <li>Nombre completo</li>
                <li>Tipo y número de documento de identidad</li>
                <li>Fecha de nacimiento</li>
                <li>Género</li>
                <li>Fotografía (en caso de ser requerida)</li>
              </ul>

              <h3 className="font-semibold mb-2 mt-4">4.2 Datos de Contacto</h3>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside ml-4">
                <li>Dirección de residencia</li>
                <li>Dirección de entrega</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono fijo y/o móvil</li>
              </ul>

              <h3 className="font-semibold mb-2 mt-4">4.3 Datos Financieros y Transaccionales</h3>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside ml-4">
                <li>Información de tarjetas de crédito/débito (tokenizada y cifrada por procesadores de pago)</li>
                <li>Historial de compras</li>
                <li>Información de facturación</li>
                <li>Datos bancarios (en caso de reembolsos)</li>
              </ul>

              <h3 className="font-semibold mb-2 mt-4">4.4 Datos de Navegación y Uso</h3>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside ml-4">
                <li>Dirección IP</li>
                <li>Tipo de navegador y dispositivo</li>
                <li>Páginas visitadas</li>
                <li>Tiempo de navegación</li>
                <li>Cookies y tecnologías similares</li>
              </ul>
            </Card>

            {/* Finalidades */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">5. Finalidades del Tratamiento</h2>
              <p className="text-muted-foreground mb-3">
                Los datos personales recopilados serán utilizados para las siguientes finalidades:
              </p>
              <h3 className="font-semibold mb-2 mt-4">5.1 Finalidades Principales</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li>Procesar y gestionar pedidos y transacciones comerciales</li>
                <li>Realizar entregas de productos adquiridos</li>
                <li>Emitir facturas electrónicas y documentos equivalentes</li>
                <li>Gestionar garantías, devoluciones y servicio postventa</li>
                <li>Brindar servicio y atención al cliente</li>
                <li>Verificar identidad y prevenir fraude</li>
                <li>Cumplir obligaciones contractuales</li>
              </ul>

              <h3 className="font-semibold mb-2 mt-4">5.2 Finalidades Secundarias (requieren consentimiento adicional)</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li>Enviar comunicaciones comerciales, promocionales y publicitarias</li>
                <li>Realizar estudios de mercado y análisis estadísticos</li>
                <li>Informar sobre nuevos productos, servicios y ofertas especiales</li>
                <li>Realizar encuestas de satisfacción</li>
                <li>Personalizar la experiencia de compra</li>
                <li>Programa de fidelización y beneficios (si aplica)</li>
              </ul>

              <h3 className="font-semibold mb-2 mt-4">5.3 Finalidades Legales</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li>Cumplir con obligaciones tributarias ante la DIAN</li>
                <li>Atender requerimientos de autoridades competentes</li>
                <li>Cumplir con regulaciones de protección al consumidor</li>
                <li>Gestionar procesos judiciales o administrativos</li>
              </ul>
            </Card>

            {/* Derechos del Titular */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">6. Derechos de los Titulares</h2>
              <p className="text-muted-foreground mb-3">
                En virtud de la Ley 1581 de 2012, los titulares de datos personales tienen los siguientes derechos:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales frente a Celuvendo</li>
                <li><strong>Solicitar prueba de la autorización</strong> otorgada para el tratamiento de datos</li>
                <li><strong>Ser informado</strong> sobre el uso que se ha dado a sus datos personales</li>
                <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio por infracciones
                  a la ley de protección de datos</li>
                <li><strong>Revocar la autorización</strong> y/o solicitar la supresión de datos cuando no se respeten
                  los principios, derechos y garantías constitucionales y legales</li>
                <li><strong>Acceder gratuitamente</strong> a sus datos personales objeto de tratamiento</li>
              </ul>
            </Card>

            {/* Procedimiento para Ejercer Derechos */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">7. Procedimiento para Ejercer sus Derechos</h2>
              <p className="text-muted-foreground mb-4">
                Para ejercer cualquiera de los derechos mencionados, el titular o su representante legal debe seguir
                el siguiente procedimiento:
              </p>

              <h3 className="font-semibold mb-3">Paso 1: Presentar la Solicitud</h3>
              <p className="text-muted-foreground mb-2">
                Enviar una solicitud a través de los siguientes canales:
              </p>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside ml-4 mb-4">
                <li><strong>Correo electrónico:</strong> privacidad@celuvendo.com</li>
                <li><strong>WhatsApp:</strong> +57 316 888 0808</li>
                <li><strong>Correo postal:</strong> Atención: Área de Protección de Datos, Bogotá, Colombia</li>
              </ul>

              <h3 className="font-semibold mb-3">Paso 2: Requisitos de la Solicitud</h3>
              <p className="text-muted-foreground mb-2">
                La solicitud debe contener como mínimo:
              </p>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside ml-4 mb-4">
                <li>Nombre completo del titular</li>
                <li>Número de documento de identidad</li>
                <li>Descripción clara y precisa de los datos personales respecto de los cuales se ejerce el derecho</li>
                <li>Dirección física y/o electrónica para recibir la respuesta</li>
                <li>Documentos que acrediten la identidad o la representación (si aplica)</li>
              </ul>

              <h3 className="font-semibold mb-3">Paso 3: Plazos de Respuesta</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li><strong>Consultas:</strong> Celuvendo responderá en un término máximo de diez (10) días hábiles
                  contados desde la fecha de recibo de la solicitud</li>
                <li><strong>Reclamos:</strong> Celuvendo responderá en un término máximo de quince (15) días hábiles
                  contados desde la fecha de recibo del reclamo</li>
                <li>Si la solicitud es incompleta, se requerirá al titular dentro de los cinco (5) días siguientes
                  a su recepción para que subsane las fallas</li>
              </ul>
            </Card>

            {/* Seguridad */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">8. Medidas de Seguridad</h2>
              <p className="text-muted-foreground mb-3">
                Celuvendo implementa medidas técnicas, humanas y administrativas razonables para proteger
                los datos personales, incluyendo:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li><strong>Cifrado:</strong> Uso de protocolos SSL/TLS para transmisión segura de datos</li>
                <li><strong>Acceso restringido:</strong> Solo personal autorizado tiene acceso a datos personales</li>
                <li><strong>Capacitación:</strong> Formación regular del personal sobre protección de datos</li>
                <li><strong>Contraseñas seguras:</strong> Políticas de contraseñas robustas</li>
                <li><strong>Monitoreo:</strong> Sistemas de detección y prevención de accesos no autorizados</li>
                <li><strong>Copias de seguridad:</strong> Respaldos periódicos de las bases de datos</li>
                <li><strong>Contratos:</strong> Acuerdos de confidencialidad con empleados y terceros</li>
              </ul>
            </Card>

            {/* Transferencia y Transmisión */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">9. Transferencia y Transmisión de Datos</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Celuvendo podrá compartir datos personales con terceros en los siguientes casos:
              </p>
              <h3 className="font-semibold mb-2 mt-4">9.1 Transmisión de Datos (Terceros en Colombia)</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li>Empresas transportadoras para realizar entregas</li>
                <li>Procesadores de pago para transacciones financieras</li>
                <li>Proveedores de servicios tecnológicos (hosting, email, etc.)</li>
                <li>Entidades gubernamentales cuando sea requerido por ley</li>
              </ul>

              <h3 className="font-semibold mb-2 mt-4">9.2 Transferencia Internacional de Datos</h3>
              <p className="text-muted-foreground mb-3">
                Algunos proveedores de servicios pueden estar ubicados fuera de Colombia. En estos casos:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li>Se solicitará autorización expresa del titular cuando sea requerido</li>
                <li>Se verificará que el país receptor ofrezca niveles adecuados de protección</li>
                <li>Se suscribirán contratos con cláusulas de protección de datos</li>
                <li>Se garantizará el cumplimiento de estándares internacionales de seguridad</li>
              </ul>
            </Card>

            {/* Retención */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">10. Período de Retención de Datos</h2>
              <p className="text-muted-foreground mb-3">
                Los datos personales serán conservados durante el tiempo necesario para cumplir con las
                finalidades del tratamiento y las obligaciones legales:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li><strong>Datos transaccionales y fiscales:</strong> 5 años (obligación tributaria DIAN)</li>
                <li><strong>Datos de garantía:</strong> Hasta 1 año después del vencimiento de la garantía</li>
                <li><strong>Datos de marketing:</strong> Hasta que el titular revoque su autorización</li>
                <li><strong>Datos de cuenta activa:</strong> Mientras la cuenta esté en uso</li>
                <li><strong>Datos de cuenta inactiva:</strong> 2 años desde la última actividad</li>
              </ul>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                Una vez cumplida la finalidad o vencido el plazo, los datos serán eliminados de nuestras
                bases de datos activas, manteniendo únicamente aquellos requeridos por ley en archivos de
                respaldo seguros.
              </p>
            </Card>

            {/* Autorización */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">11. Autorización del Titular</h2>
              <p className="text-muted-foreground leading-relaxed">
                La autorización del titular se obtendrá de manera previa, expresa e informada a través de:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4 mt-3">
                <li>Aceptación de términos y condiciones al crear una cuenta</li>
                <li>Casillas de verificación (checkboxes) al momento de la compra</li>
                <li>Formularios físicos o digitales específicos</li>
                <li>Comunicaciones electrónicas confirmadas (opt-in)</li>
              </ul>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                El titular podrá revocar su autorización en cualquier momento, siempre que no lo impida
                una obligación legal o contractual.
              </p>
            </Card>

            {/* Modificaciones */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">12. Modificaciones a esta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Celuvendo se reserva el derecho de modificar esta Política de Tratamiento de Datos Personales
                en cualquier momento. Las modificaciones serán publicadas en el sitio web www.celuvendo.com
                con indicación de la fecha de última actualización.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Los cambios sustanciales serán comunicados a los titulares a través de correo electrónico
                o mediante aviso destacado en el sitio web.
              </p>
            </Card>

            {/* Vigencia */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">13. Vigencia</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esta Política de Tratamiento de Datos Personales rige a partir del 1 de enero de 2025 y
                estará vigente mientras Celuvendo realice actividades de tratamiento de datos personales.
              </p>
            </Card>

            {/* Consultas */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">14. Contacto y Consultas</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Para cualquier duda o consulta sobre esta Política de Tratamiento de Datos Personales,
                puede contactarnos:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Área de Protección de Datos Personales</strong></p>
                <p><strong>Email:</strong> privacidad@celuvendo.com</p>
                <p><strong>WhatsApp:</strong> +57 316 888 0808</p>
                <p><strong>Dirección:</strong> Bogotá, Colombia</p>
                <p><strong>Horario de atención:</strong> Lunes a Viernes 8:00 AM - 6:00 PM, Sábados 9:00 AM - 3:00 PM</p>
              </div>
            </Card>
          </div>

          <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
            <p className="text-center text-sm text-muted-foreground">
              Esta Política de Tratamiento de Datos Personales ha sido elaborada en cumplimiento de la
              Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas concordantes aplicables en Colombia.
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
