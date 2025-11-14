---
name: empleados-digitales-brand
description: Aplica las directrices de marca de Empleados Digitales a contenido visual. Usa este skill cuando necesites crear imágenes para blog, redes sociales, banners o cualquier contenido que deba seguir la identidad visual de Empleados Digitales (gradiente cyan-magenta, estilo futurista, fondo oscuro).
---

# Empleados Digitales - Brand Guidelines

## Resumen

Este skill aplica la identidad visual de **Empleados Digitales** a contenido gráfico. Incluye la paleta de colores característica (gradiente cyan-magenta), elementos visuales (efectos neón/glow), y layouts optimizados para diferentes formatos.

**Cuándo usar este skill:**
- Crear headers para posts de blog
- Generar imágenes para redes sociales (LinkedIn, Instagram, Facebook)
- Diseñar banners para perfiles o páginas
- Crear presentaciones con la marca
- Cualquier contenido visual que deba seguir la identidad de Empleados Digitales

## Directrices de Marca Rápidas

### Colores Principales

**Gradiente característico** (de izquierda a derecha):
- Cyan: `#00E5FF`
- Azul: `#0066FF`
- Púrpura: `#8000FF`
- Magenta: `#FF0080`

**Colores de soporte:**
- Fondo oscuro: `#0A0F23`
- Texto principal: `#FFFFFF`
- Texto secundario: `#96F0FF` (cyan claro)

### Estilo Visual

- **Tono**: Futurista, tecnológico, profesional
- **Efectos**: Sombras sutiles negras, evitar glow excesivo en texto
- **Formas**: Círculos, líneas de gradiente, geometría limpia
- **Composición**: Espacios negativos generosos, asimetría controlada
- **Legibilidad**: PRIORIDAD - texto blanco puro sobre fondo oscuro, contraste mínimo 7:1

## Uso del Script de Generación

El script `create_branded_image.py` genera imágenes con la marca en tres formatos principales:

### 1. Header de Blog (1200x630px)

```bash
python scripts/create_branded_image.py blog "Título Principal" "Subtítulo opcional" output.png
```

**Características:**
- Barra de gradiente superior
- Título en blanco con efecto glow
- Subtítulo en cyan claro
- Elementos decorativos circulares
- Ideal para encabezados de artículos

### 2. Post de Redes Sociales (1080x1080px)

```bash
python scripts/create_branded_image.py social "Texto del Post" output.png
```

**Características:**
- Formato cuadrado
- Borde con gradiente en los 4 lados
- Texto centrado con efecto neón
- Círculos concéntricos decorativos
- Optimizado para Instagram, Facebook, LinkedIn posts

### 3. Banner de LinkedIn (1584x396px)

```bash
python scripts/create_branded_image.py linkedin "Texto del Banner" output.png
```

**Características:**
- Formato horizontal alargado
- Gradiente superior
- Elementos decorativos laterales
- Texto alineado a la izquierda
- Perfecto para perfiles profesionales

## Recursos Incluidos

### Assets
- `logo.png` - Logo oficial de Empleados Digitales con gradiente
- `banner-ejemplo.png` - Ejemplo de banner con la marca aplicada

### Referencias
- `brand_guidelines.md` - Directrices completas de marca con detalles sobre colores, tipografía, elementos visuales, y aplicaciones por formato

**Cuándo leer las referencias:**
- Necesitas detalles completos sobre la paleta de colores
- Vas a crear contenido personalizado más allá de los scripts
- Necesitas entender el tono y estilo de comunicación visual
- Quieres ver ejemplos de uso correcto e incorrecto

## Ejemplos de Uso

**Ejemplo 1: Header de blog sobre automatización**
```bash
python scripts/create_branded_image.py blog "Automatización con IA" "Transforma tu negocio" blog_header.png
```

**Ejemplo 2: Post para LinkedIn sobre caso de éxito**
```bash
python scripts/create_branded_image.py social "30% más productividad con Empleados Digitales" linkedin_post.png
```

**Ejemplo 3: Banner de perfil**
```bash
python scripts/create_branded_image.py linkedin "Automatización Inteligente para PyMES Colombianas" linkedin_banner.png
```

## Personalización Adicional

Si necesitas crear contenido visual personalizado más allá de los scripts:

1. Lee `references/brand_guidelines.md` para las directrices completas
2. Usa los colores del gradiente especificados
3. Mantén el estilo futurista con efectos glow sutiles
4. Asegura buen contraste (texto blanco sobre fondo oscuro)
5. Incluye elementos decorativos geométricos con moderación

## Mensajes Clave de Marca

Al crear contenido, transmite estos conceptos:
- **Automatización inteligente** que libera tiempo
- **Accesibilidad** para empresas de todos los tamaños
- **Transformación digital** práctica y medible
- **Soluciones locales** diseñadas para Colombia
- **Resultados tangibles** con ROI claro
