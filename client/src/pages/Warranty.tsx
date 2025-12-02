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
            <h2 className="text-2xl font-semibold mb-4">Garantía del Fabricante</h2>
            <div className="mb-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold mb-1">12 Meses de Garantía Oficial del Fabricante</div>
                  <p className="text-sm text-muted-foreground">
                    Todos nuestros celulares cuentan con garantía oficial del fabricante por un año completo.
                    La garantía se hace efectiva directamente con el fabricante a través de sus centros de servicio autorizados en Colombia.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mt-4">
              <p className="text-sm text-muted-foreground">
                <strong>Importante:</strong> Para hacer efectiva tu garantía, debes acudir directamente a un centro de servicio autorizado
                de la marca de tu celular con tu factura de compra. Más abajo encontrarás los enlaces a los centros de servicio de cada fabricante.
              </p>
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

          {/* Enlaces de Soporte Fabricantes */}
          <Card className="p-6 mb-6 bg-green-50 border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold">Centros de Servicio Autorizados en Colombia</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Para hacer efectiva tu garantía, contacta directamente al centro de servicio oficial de tu marca:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://www.samsung.com/co/support/service-center/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-gray-300 rounded-md hover:bg-white hover:shadow-md transition-all"
              >
                <div className="font-semibold mb-1">Samsung Colombia</div>
                <p className="text-sm text-muted-foreground mb-2">Centros de servicio y soporte técnico oficial</p>
                <p className="text-xs text-primary">samsung.com/co/support →</p>
              </a>
              <a
                href="https://www.motorola.com.co/servicio-al-cliente"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-gray-300 rounded-md hover:bg-white hover:shadow-md transition-all"
              >
                <div className="font-semibold mb-1">Motorola Colombia</div>
                <p className="text-sm text-muted-foreground mb-2">Servicio técnico y garantía oficial</p>
                <p className="text-xs text-primary">motorola.com.co/servicio →</p>
              </a>
              <a
                href="https://www.mi.com/co/service/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-gray-300 rounded-md hover:bg-white hover:shadow-md transition-all"
              >
                <div className="font-semibold mb-1">Xiaomi Colombia</div>
                <p className="text-sm text-muted-foreground mb-2">Servicio postventa y centros autorizados</p>
                <p className="text-xs text-primary">mi.com/co/service →</p>
              </a>
              <a
                href="https://www.oppo.com/co/support/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-gray-300 rounded-md hover:bg-white hover:shadow-md transition-all"
              >
                <div className="font-semibold mb-1">OPPO Colombia</div>
                <p className="text-sm text-muted-foreground mb-2">Soporte técnico y servicio de garantía</p>
                <p className="text-xs text-primary">oppo.com/co/support →</p>
              </a>
              <a
                href="https://www.tecno-mobile.com/co/support"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-gray-300 rounded-md hover:bg-white hover:shadow-md transition-all"
              >
                <div className="font-semibold mb-1">TECNO Colombia</div>
                <p className="text-sm text-muted-foreground mb-2">Centros de servicio y soporte oficial</p>
                <p className="text-xs text-primary">tecno-mobile.com/co/support →</p>
              </a>
              <a
                href="https://www.infinixmobility.com/co/support"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-gray-300 rounded-md hover:bg-white hover:shadow-md transition-all"
              >
                <div className="font-semibold mb-1">INFINIX Colombia</div>
                <p className="text-sm text-muted-foreground mb-2">Servicio técnico y garantía oficial</p>
                <p className="text-xs text-primary">infinixmobility.com/co/support →</p>
              </a>
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
                  <h3 className="font-semibold mb-1">Verifica tu Factura</h3>
                  <p className="text-sm text-muted-foreground">
                    La factura de compra es indispensable para hacer efectiva la garantía. Asegúrate de tenerla disponible
                    en formato digital o impreso.
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
                  <h3 className="font-semibold mb-1">Contacta al Fabricante</h3>
                  <p className="text-sm text-muted-foreground">
                    Utiliza los enlaces de soporte oficial que aparecen arriba para contactar al centro de servicio autorizado
                    de tu marca (Samsung, Motorola, Xiaomi, OPPO, TECNO o INFINIX).
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
                  <h3 className="font-semibold mb-1">Respalda tu Información</h3>
                  <p className="text-sm text-muted-foreground">
                    Antes de enviar tu equipo al centro de servicio, realiza un backup completo de tus datos y
                    desactiva bloqueos de seguridad (patrón, PIN, cuenta Google).
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
                  <h3 className="font-semibold mb-1">Acude al Centro de Servicio</h3>
                  <p className="text-sm text-muted-foreground">
                    Dirígete al centro de servicio autorizado del fabricante con tu equipo y factura. El fabricante
                    evaluará si el problema está cubierto por la garantía y procederá con la reparación o reemplazo.
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

          {/* Información adicional */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Información Adicional</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                • Los tiempos de reparación varían según el fabricante y la complejidad del problema. Consulta directamente
                con el centro de servicio autorizado para conocer los tiempos estimados.
              </p>
              <p>
                • Conserva siempre tu factura de compra original, ya que es el documento que acredita la garantía del fabricante.
              </p>
              <p>
                • Si tienes dudas sobre el proceso de garantía, puedes contactarnos y te orientaremos sobre cómo proceder
                con el fabricante de tu equipo.
              </p>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
