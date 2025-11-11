# Design Guidelines for Celuvendo.com

## Design Approach

**Reference-Based E-Commerce Pattern** drawing from:
- **Mercado Libre**: Latin American e-commerce familiarity and trust patterns
- **Apple Store**: Premium product presentation and clean layouts
- **Amazon**: Efficient product discovery and checkout flows

**Design Principles:**
1. Trust and clarity over flashiness
2. Product-first presentation with high-quality imagery
3. Mobile-optimized for Colombian market (mobile-first shopping behavior)
4. Streamlined purchase flow minimizing friction

## Typography System

**Font Stack:** Google Fonts via CDN
- **Primary:** Inter (400, 500, 600, 700) - UI elements, body text, product descriptions
- **Accent:** Manrope (600, 700) - Headings, CTAs, price displays

**Hierarchy:**
- Hero Headlines: text-5xl/text-6xl, font-bold
- Section Headers: text-3xl/text-4xl, font-semibold
- Product Names: text-xl/text-2xl, font-semibold
- Body Text: text-base, font-normal
- Product Specs: text-sm, font-medium
- Price (Primary): text-2xl/text-3xl, font-bold
- Price (Compare/Strikethrough): text-lg, font-normal with line-through
- Metadata/Labels: text-xs/text-sm, font-medium uppercase tracking-wide

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6, p-8
- Section spacing: py-12, py-16
- Card gaps: gap-4, gap-6
- Button padding: px-6 py-3, px-8 py-4

**Grid Systems:**
- Product Grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
- Category Cards: grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3
- Checkout Layout: Two-column (lg:grid-cols-3) with 2/3 cart and 1/3 summary
- Container max-width: max-w-7xl mx-auto px-4

## Component Library

### Navigation
- Sticky header with search bar prominence, cart icon with badge, Colombian flag icon for language/region
- Categories horizontal scroll on mobile, dropdown mega-menu on desktop
- Breadcrumbs on product/category pages

### Product Cards
- Vertical card layout with aspect-ratio-square image container
- Wishlist heart icon (top-right overlay on image)
- Brand logo badge (top-left)
- Discount badge (bold, contrasting, top-right when applicable)
- Product name (2-line truncation)
- Price display with old price strikethrough
- Star rating + review count below price
- "Envío gratis" badge when applicable
- Hover: Subtle lift with shadow, "Vista rápida" button overlay

### Product Detail Page
- **Image Gallery:** Large primary image with thumbnail carousel below (4-6 images), zoom on click/hover, mobile swipe
- **Product Info:** Variant selectors (color swatches, storage buttons), stock indicator, price with financing calculation below, prominent "Agregar al Carrito" CTA (full-width on mobile)
- **Specifications:** Expandable accordion sections (Pantalla, Cámara, Rendimiento, Batería, Conectividad)
- **Trust Elements:** Guarantee badges, secure payment icons, shipping info card

### Shopping Cart
- Side drawer on desktop (slides from right), full page on mobile
- Line items with thumbnail, name, variant, quantity stepper, remove option
- Sticky summary footer with subtotal, "Continuar Comprando" and "Proceder al Pago"

### Filters Sidebar
- Collapsible filter groups
- Brand checkboxes with product counts
- Price range slider (dual handles)
- Specification chips (RAM, Storage, Battery)
- "Aplicar Filtros" sticky button on mobile
- Active filters displayed as removable chips above product grid

### CTAs and Buttons
- Primary: Bold, rounded-lg, px-8 py-4, font-semibold
- Secondary: Outlined variant with hover fill
- Icon buttons: rounded-full for wishlist, share, close actions
- Add to Cart: Prominent, full-width on mobile, icon + text

### Forms
- Input fields: border rounded-md, px-4 py-3, focus ring
- Checkout fields grouped logically (Datos Personales, Dirección, Pago)
- Payment method cards selectable with radio button + visual card selection
- Colombian-specific: Departamento/Ciudad dropdowns, Cédula field, phone with +57 prefix

### Data Display
- Specification tables: Two-column key-value pairs, alternating subtle background
- Review cards: Star rating, user name, verified purchase badge, helpful vote buttons
- Order summary: Line items with clear hierarchy, bolded total

### Trust & Social Proof
- Security badges: "100% Original", "Garantía Oficial", "Envío Seguro"
- Payment method logos footer strip
- Review aggregation with rating breakdown bars
- "X personas están viendo este producto" real-time indicator

## Images

**Hero Section:** Full-width banner (height: 60vh on desktop, 50vh mobile) showcasing latest flagship phones with promotional text overlay. Auto-rotating carousel (3-5 slides). Buttons with backdrop-blur-sm background for readability.

**Product Images:** Clean white or subtle gradient backgrounds, high-resolution (1200x1200px), consistent lighting, multiple angles including front, back, side profile, display closeup.

**Category Icons:** Brand logos and simplified phone silhouettes for quick visual recognition.

**Trust Badges:** Colombian flag, credit card logos (Visa, Mastercard), PSE logo, shipping courier logos, warranty seal graphics.

## Colombian Market Localization

- Currency always displayed as "$XXX.XXX COP" format with thousand separators
- "Financiación disponible en X cuotas" prominently displayed
- Shipping to major cities highlighted (Bogotá, Medellín, Cali, Barranquilla)
- WhatsApp support button (floating, bottom-right, with +57 number)
- Colombian payment methods visual priority (PSE, Nequi, Efecty before international cards)

## Animations

Minimal and purposeful:
- Product card hover: transform scale-105 transition-transform duration-200
- Cart badge: Bounce animation on item add
- Image gallery: Smooth fade transitions
- Filter collapse/expand: height transition
- No scroll-triggered animations or complex page transitions