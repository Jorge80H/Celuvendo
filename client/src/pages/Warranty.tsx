import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, XCircle, AlertTriangle, FileText } from "lucide-react";

export default function Warranty() {
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
              Garantía
            </h1>
            <p className="text-muted-foreground text-lg">
              Protección completa para tu tranquilidad
            </p>
          </div>

          {/* Resumen de Garantía */}
          <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-semibold mb-4">Cobertura de Garantía</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold mb-1">12 Meses de Garantía Oficial</div>
                  <p className="text-sm text-muted-foreground">
                    Todos nuestros celulares tienen garantía del fabricante por un año completo
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold mb-1">5 Días de Retracto</div>
                  <p className="text-sm text-muted-foreground">
                    Devuelve tu compra sin justificación dentro de los primeros 5 días hábiles
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* ¿Qué cubre la garantía? */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold">¿Qué Cubre la Garantía?</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              La garantía oficial del fabricante cubre todos los defectos de fábrica y problemas
              de funcionamiento bajo uso normal del equipo:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Defectos de Hardware</div>
                    <p className="text-xs text-muted-foreground">
                      Pantalla con píxeles muertos, botones que no responden, puertos defectuosos
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Problemas de Software de Fábrica</div>
                    <p className="text-xs text-muted-foreground">
                      Sistema operativo que no inicia, errores críticos del sistema
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Batería Defectuosa</div>
                    <p className="text-xs text-muted-foreground">
                      Batería que se hincha, no carga correctamente o se descarga anormalmente rápido
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Problemas de Cámara</div>
                    <p className="text-xs text-muted-foreground">
                      Cámara que no enfoca, toma fotos borrosas o no abre la aplicación
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Sensores con Fallas</div>
                    <p className="text-xs text-muted-foreground">
                      Sensor de huella, proximidad, giroscopio o GPS que no funcionan
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Problemas de Conectividad</div>
                    <p className="text-xs text-muted-foreground">
                      WiFi, Bluetooth o señal celular que no funciona por defecto de fábrica
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Audio Defectuoso</div>
                    <p className="text-xs text-muted-foreground">
                      Altavoces, micrófono o jack de audífonos que no funcionan correctamente
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Sobrecalentamiento Anormal</div>
                    <p className="text-xs text-muted-foreground">
                      Equipo que se calienta excesivamente sin razón aparente durante uso normal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* ¿Qué NO cubre la garantía? */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-semibold">¿Qué NO Cubre la Garantía?</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              La garantía NO cubre daños causados por mal uso, accidentes o desgaste normal:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Daños Físicos</div>
                  <p className="text-xs text-muted-foreground">
                    Pantalla rota, abolladuras, golpes, grietas o cualquier daño por caídas o impactos
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Daños por Líquidos</div>
                  <p className="text-xs text-muted-foreground">
                    Exposición a agua, humedad o cualquier líquido (excepto si tiene certificación IP y el daño es por fallo del sellado de fábrica)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Modificaciones No Autorizadas</div>
                  <p className="text-xs text-muted-foreground">
                    Root, bootloader desbloqueado, ROMs personalizadas, o reparaciones en talleres no autorizados
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Desgaste Normal</div>
                  <p className="text-xs text-muted-foreground">
                    Ralladuras cosméticas, desgaste de la batería por ciclos de carga normales, decoloración por uso
                  </p>
                  </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Pérdida o Robo</div>
                  <p className="text-xs text-muted-foreground">
                    La garantía no cubre extravío, robo o pérdida del equipo
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Software de Terceros</div>
                  <p className="text-xs text-muted-foreground">
                    Problemas causados por aplicaciones descargadas, virus o malware
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Cómo hacer efectiva la garantía */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">¿Cómo Hacer Efectiva la Garantía?</h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Contáctanos</h3>
                  <p className="text-sm text-muted-foreground">
                    Comunícate con nosotros por WhatsApp (+57 300 123 4567) o correo (soporte@celuvendo.com).
                    Ten a mano tu número de pedido o factura de compra.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Describe el Problema</h3>
                  <p className="text-sm text-muted-foreground">
                    Explica detalladamente el problema que presenta tu celular. Si es posible, envía fotos o videos
                    que demuestren la falla. Esto nos ayuda a agilizar el proceso.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Envío del Equipo</h3>
                  <p className="text-sm text-muted-foreground">
                    Te enviaremos una guía prepagada para que despachos tu equipo a nuestro centro de servicio.
                    Asegúrate de respaldar tu información antes del envío y realizar un restablecimiento de fábrica.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Evaluación Técnica</h3>
                  <p className="text-sm text-muted-foreground">
                    Nuestro equipo técnico evaluará tu equipo en 2-3 días hábiles para determinar si el problema
                    está cubierto por la garantía.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    5
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Reparación o Reemplazo</h3>
                  <p className="text-sm text-muted-foreground">
                    Si la falla está cubierta, repararemos o reemplazaremos tu equipo sin costo. El proceso completo
                    toma entre 7-15 días hábiles. El envío de devolución es gratuito.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Requisitos importantes */}
          <Card className="p-6 mb-6 border-orange-200 bg-orange-50/50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Requisitos Importantes</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-0.5">•</span>
                    <span>
                      <strong>Respalda tu información:</strong> No nos hacemos responsables por pérdida de datos durante la reparación.
                      Realiza un backup completo antes de enviar el equipo.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-0.5">•</span>
                    <span>
                      <strong>Desactiva bloqueos de seguridad:</strong> Desactiva el bloqueo de cuenta Google (FRP) y cualquier
                      patrón, PIN o contraseña. Esto es necesario para realizar pruebas técnicas.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-0.5">•</span>
                    <span>
                      <strong>Conserva tu factura:</strong> La factura de compra es indispensable para hacer efectiva la garantía.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-0.5">•</span>
                    <span>
                      <strong>No incluyas accesorios:</strong> Envía únicamente el celular. No incluyas tarjetas SIM, memoria SD,
                      funda, mica o cargador, ya que no nos hacemos responsables por accesorios.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Tiempos de respuesta */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Tiempos de Respuesta</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-md">
                <div className="text-3xl font-bold text-primary mb-1">2-3</div>
                <div className="text-sm text-muted-foreground">días hábiles para evaluación</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-md">
                <div className="text-3xl font-bold text-primary mb-1">7-15</div>
                <div className="text-sm text-muted-foreground">días hábiles proceso completo</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-md">
                <div className="text-3xl font-bold text-primary mb-1">24h</div>
                <div className="text-sm text-muted-foreground">respuesta inicial a tu solicitud</div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
