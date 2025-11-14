# Product Sheet Generator Skill

Skill profesional para generar fichas de producto detalladas de smartphones para e-commerce en el mercado colombiano.

## 📋 Descripción

Este skill permite crear especificaciones de producto completas, profesionales y optimizadas para e-commerce de telefonía móvil. Genera documentos markdown estructurados que incluyen:

- ✅ Especificaciones técnicas completas y verificadas
- ✅ Análisis de precios y competitividad en Colombia
- ✅ Descripciones de marketing en español
- ✅ Estrategias de venta y posicionamiento
- ✅ Comparativas con competencia
- ✅ Oportunidades de bundles y cross-selling
- ✅ FAQ y manejo de objeciones
- ✅ Notas críticas para e-commerce

## 🎯 Uso

El skill se activa automáticamente cuando:
- Necesitas crear una ficha de producto para un smartphone
- El usuario solicita "crear ficha de producto" o "generar ficha detallada"
- Requieres documentación completa para catálogo e-commerce

## 📁 Estructura

```
product-sheet-generator/
├── SKILL.md                  # Instrucciones principales del skill
├── README.md                 # Este archivo
├── references/               # Documentación de referencia
│   ├── product-sheet-template.md     # Template maestro
│   ├── colombian-retailers.md        # Retailers y carriers
│   └── spec-glossary.md             # Glosario técnico ES/EN
└── assets/
    └── sample-sheets/        # Fichas de ejemplo
        └── README.md         # Guía de muestras
```

## 🔧 Componentes

### SKILL.md
Contiene el flujo de trabajo completo en 9 pasos:
1. Recopilación de información del producto
2. Uso de estructura de template
3. Aplicación de contexto colombiano
4. Énfasis en información crítica
5. Generación de contenido marketing
6. Análisis competitivo
7. Desarrollo de estrategia de ventas
8. Controles de calidad
9. Organización de archivos

### References

**product-sheet-template.md**
- Template completo con todas las secciones requeridas
- Estructura markdown profesional
- Placeholders claramente marcados
- Secciones opcionales identificadas

**colombian-retailers.md**
- Lista de retailers principales (Alkosto, Éxito, Falabella)
- Carriers (Claro, Movistar, WOM, Tigo)
- Marketplaces (MercadoLibre, Linio)
- Tiendas especializadas
- Estrategia de investigación de precios

**spec-glossary.md**
- Terminología técnica español-inglés
- Abreviaciones estándar
- Guías de uso contextual
- Preferencias colombianas

### Assets

**sample-sheets/**
- Referencia a fichas completadas en `../../Fichas_Productos/`
- Ejemplos de diferentes niveles (entrada, medio, premium)
- Demostración de características especiales

## 💡 Características Clave

### Contexto Colombiano
- Precios en pesos colombianos (COP)
- Formato de moneda local ($1.234.567)
- Terminología y expresiones colombianas
- Retailers y carriers locales

### Información Crítica Destacada
- 🔴 Inclusión/exclusión de cargador
- ⚠️ Alertas de competitividad de precios
- 📱 Diferenciadores clave (5G, AMOLED, OIS)
- 🚫 Características faltantes (NFC, resistencia agua)

### Análisis Competitivo
- Comparaciones directas con 2-3 competidores
- Ventajas y desventajas honestas
- Posicionamiento de precio justificado
- Alternativas de upsell/downsell

### Estrategia de Ventas
- Mensajes clave de venta
- Manejo de objeciones comunes
- Estrategias de bundles (básico, premium, especializado)
- Oportunidades de cross-selling

## 📊 Ejemplos de Output

### Productos Documentados
- TECNO Camon 40 (estándar, 4G, cargador incluido)
- TECNO Camon 40 Pro (premium, 4G/5G variantes)
- Samsung Galaxy A06 (entrada, sin cargador, alerta precio)

Ver fichas completas en: `../../Fichas_Productos/`

## 🎨 Formato y Estilo

### Estructura Markdown
- Headers jerárquicos claros (# ## ###)
- Tablas para información estructurada
- Emojis para marcadores visuales (✅ ❌ ⚠️ 📱 💰)
- Listas con bullets para specs y features

### Idioma
- Marketing y descripciones: Español
- Términos técnicos estándar: Inglés (AMOLED, NFC, OIS)
- Especificaciones: Mix (español + valores inglés)
- Nombres de marca: Original (One UI, ColorOS, HiOS)

### Tono
- Profesional pero accesible
- Técnicamente preciso
- Honesto sobre limitaciones
- Orientado al valor del cliente

## ⚙️ Configuración

No requiere configuración adicional. El skill funciona de manera autónoma con acceso a:
- Web search para investigación de precios y specs
- Firecrawl para scraping de retailers
- Referencias incluidas en el directorio

## 📝 Workflow Típico

1. Usuario solicita crear ficha para modelo específico
2. Skill recopila información de fuentes oficiales y retailers
3. Aplica template estructurado
4. Genera contenido marketing en español
5. Realiza análisis competitivo
6. Desarrolla estrategia de ventas
7. Ejecuta controles de calidad
8. Guarda archivo en `Fichas_Productos/` con nombre correcto

## ✅ Controles de Calidad

Antes de finalizar, el skill verifica:
- [ ] Specs técnicas de fuentes oficiales
- [ ] Precios actuales con fuentes
- [ ] Estado de inclusión de cargador marcado
- [ ] Colores oficiales completos
- [ ] Marketing en español (excepto términos técnicos)
- [ ] Comparativas justas y factuales
- [ ] Estrategias de venta accionables
- [ ] FAQ con preocupaciones reales
- [ ] Nombre de archivo correcto

## 🔄 Actualizaciones

**Última actualización:** Noviembre 2025

**Próximas mejoras:**
- Script automatizado de scraping de precios
- Integración con API de retailers
- Base de datos de specs técnicas
- Generator de comparativas automáticas

## 📞 Soporte

Para mejoras o reportar problemas:
- Revisar fichas de ejemplo existentes
- Consultar references para casos específicos
- Actualizar SKILL.md con mejores prácticas aprendidas

## 📄 Licencia

MIT License - Uso libre para generación de fichas de producto

---

**Versión:** 1.0.0
**Fecha:** Noviembre 2025
**Autor:** Claude Code con skill-creator
**Mercado:** Colombia
