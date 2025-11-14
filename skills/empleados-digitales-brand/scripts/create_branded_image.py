"""
Script para generar imágenes de marca de Empleados Digitales
Utiliza la paleta de colores y estilo visual de la marca
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import sys

# Paleta de colores de Empleados Digitales (gradiente característico)
CYAN = (0, 229, 255)  # #00E5FF - Inicio del gradiente
BLUE = (0, 102, 255)  # #0066FF - Azul medio
PURPLE = (128, 0, 255)  # #8000FF - Púrpura
MAGENTA = (255, 0, 128)  # #FF0080 - Rosa/magenta final
DARK_BG = (10, 15, 35)  # Fondo azul marino oscuro
WHITE = (255, 255, 255)
LIGHT_CYAN = (150, 240, 255)

def create_gradient_rect(draw, bounds, color_start, color_end):
    """Crea un rectángulo con gradiente horizontal"""
    x1, y1, x2, y2 = bounds
    width = x2 - x1
    
    for i in range(width):
        ratio = i / width
        r = int(color_start[0] * (1 - ratio) + color_end[0] * ratio)
        g = int(color_start[1] * (1 - ratio) + color_end[1] * ratio)
        b = int(color_start[2] * (1 - ratio) + color_end[2] * ratio)
        
        draw.line([(x1 + i, y1), (x1 + i, y2)], fill=(r, g, b), width=1)

def create_blog_header(title, subtitle="", width=1200, height=630):
    """
    Crea un header para blog con el estilo de Empleados Digitales
    
    Args:
        title: Título principal
        subtitle: Subtítulo opcional
        width: Ancho de la imagen
        height: Alto de la imagen
    """
    # Crear imagen con fondo oscuro
    img = Image.new('RGB', (width, height), DARK_BG)
    draw = ImageDraw.Draw(img)
    
    # Crear barra de gradiente superior
    gradient_height = 12
    create_gradient_rect(draw, (0, 0, width, gradient_height), CYAN, MAGENTA)
    
    # Crear barra de gradiente inferior
    create_gradient_rect(draw, (0, height - gradient_height, width, height), MAGENTA, CYAN)
    
    # Elementos decorativos con glow effect
    # Círculo grande con gradiente
    circle_x, circle_y = width - 200, height // 2
    circle_radius = 150
    
    # Crear efecto de glow
    for r in range(circle_radius, circle_radius - 40, -10):
        alpha = int(255 * (1 - (circle_radius - r) / 40))
        draw.ellipse(
            [(circle_x - r, circle_y - r), (circle_x + r, circle_y + r)],
            fill=None,
            outline=(*CYAN, alpha) if r % 20 == 0 else (*PURPLE, alpha),
            width=3
        )
    
    # Círculos decorativos pequeños
    decorative_circles = [
        (100, 150, 30, CYAN),
        (width - 300, 100, 25, PURPLE),
        (150, height - 120, 35, MAGENTA),
    ]
    
    for x, y, r, color in decorative_circles:
        draw.ellipse([(x - r, y - r), (x + r, y + r)], fill=color)
    
    # Intentar cargar fuentes
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 68)
        subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # Dibujar título con sombra sutil
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = 80
    title_y = height // 2 - 50
    
    # Sombra sutil para profundidad (solo abajo-derecha)
    draw.text((title_x + 3, title_y + 3), title, fill=(0, 0, 0), font=title_font)
    
    # Texto principal en blanco puro
    draw.text((title_x, title_y), title, fill=WHITE, font=title_font)
    
    # Dibujar subtítulo si existe
    if subtitle:
        subtitle_y = title_y + 90
        draw.text((title_x, subtitle_y), subtitle, fill=LIGHT_CYAN, font=subtitle_font)
    
    return img

def create_social_post(text, width=1080, height=1080):
    """
    Crea una imagen cuadrada para posts en redes sociales
    
    Args:
        text: Texto principal del post
        width: Ancho de la imagen
        height: Alto de la imagen
    """
    # Crear imagen con fondo oscuro
    img = Image.new('RGB', (width, height), DARK_BG)
    draw = ImageDraw.Draw(img)
    
    # Borde con gradiente en los 4 lados
    border_width = 20
    create_gradient_rect(draw, (0, 0, width, border_width), CYAN, PURPLE)
    create_gradient_rect(draw, (0, height - border_width, width, height), PURPLE, MAGENTA)
    create_gradient_rect(draw, (0, border_width, border_width, height - border_width), CYAN, MAGENTA)
    create_gradient_rect(draw, (width - border_width, border_width, width, height - border_width), PURPLE, CYAN)
    
    # Elementos decorativos
    center_x, center_y = width // 2, height // 2
    
    # Círculos concéntricos decorativos
    for i, (radius, color) in enumerate([(200, CYAN), (250, PURPLE), (300, MAGENTA)]):
        draw.ellipse(
            [(center_x - radius, center_y - radius), (center_x + radius, center_y + radius)],
            fill=None,
            outline=color,
            width=2
        )
    
    # Intentar cargar fuentes
    try:
        text_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
    except:
        text_font = ImageFont.load_default()
    
    # Dibujar texto centrado
    text_bbox = draw.textbbox((0, 0), text, font=text_font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    text_x = (width - text_width) // 2
    text_y = (height - text_height) // 2
    
    # Sombra sutil
    draw.text((text_x + 3, text_y + 3), text, fill=(0, 0, 0), font=text_font)
    
    # Texto principal en blanco puro
    draw.text((text_x, text_y), text, fill=WHITE, font=text_font)
    
    return img

def create_linkedin_banner(text, width=1584, height=396):
    """
    Crea un banner para LinkedIn con el estilo de Empleados Digitales
    
    Args:
        text: Texto principal del banner
        width: Ancho del banner
        height: Alto del banner
    """
    # Crear imagen con fondo oscuro
    img = Image.new('RGB', (width, height), DARK_BG)
    draw = ImageDraw.Draw(img)
    
    # Barra de gradiente superior
    gradient_height = 15
    create_gradient_rect(draw, (0, 0, width, gradient_height), CYAN, MAGENTA)
    
    # Elementos decorativos del lado derecho
    for i, (x_offset, y_pos, radius, color) in enumerate([
        (200, 100, 80, CYAN),
        (100, 250, 60, PURPLE),
        (50, 150, 40, MAGENTA)
    ]):
        x = width - x_offset
        y = y_pos
        # Círculo con glow
        for r in range(radius, radius - 20, -5):
            alpha = 255 - (radius - r) * 10
            draw.ellipse([(x - r, y - r), (x + r, y + r)], fill=None, outline=color, width=2)
    
    # Intentar cargar fuentes
    try:
        text_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 56)
    except:
        text_font = ImageFont.load_default()
    
    # Dibujar texto
    text_x = 80
    text_y = height // 2 - 30
    
    # Sombra sutil
    draw.text((text_x + 3, text_y + 3), text, fill=(0, 0, 0), font=text_font)
    
    # Texto principal en blanco puro
    draw.text((text_x, text_y), text, fill=WHITE, font=text_font)
    
    return img

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python create_branded_image.py <tipo> <titulo> [subtitulo] [output_path]")
        print("Tipos: blog, social, linkedin")
        sys.exit(1)
    
    image_type = sys.argv[1]
    title = sys.argv[2]
    subtitle = sys.argv[3] if len(sys.argv) > 3 and not sys.argv[3].endswith('.png') else ""
    output_path = sys.argv[-1] if sys.argv[-1].endswith('.png') else "/mnt/user-data/outputs/branded_image.png"
    
    if image_type == "blog":
        img = create_blog_header(title, subtitle)
    elif image_type == "social":
        img = create_social_post(title)
    elif image_type == "linkedin":
        img = create_linkedin_banner(title)
    else:
        print(f"Tipo desconocido: {image_type}. Use: blog, social, o linkedin")
        sys.exit(1)
    
    img.save(output_path)
    print(f"✅ Imagen creada: {output_path}")
