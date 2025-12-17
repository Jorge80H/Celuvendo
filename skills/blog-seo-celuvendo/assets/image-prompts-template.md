# Image Prompts Template for Blog Articles

This template shows the format for generating image prompt documents for each blog article.

---

# Image Prompts for [Article Title]

**Article Slug:** [slug]
**Total Images Required:** [4-6]
**Image Location:** `client/public/assets/blog/`

---

## 📸 Featured Image (Hero)

**Required for all articles**

- **Filename:** `[slug]-hero.jpg`
- **Dimensions:** 1200x630px (16:9 aspect ratio)
- **Format:** JPG, optimized for web
- **Location:** `client/public/assets/blog/[slug]-hero.jpg`
- **Usage:** Open Graph image, article header, social media sharing
- **Alt Text:** [Descriptive alt text with main keyword]

**AI Generation Prompt:**
```
[Detailed prompt describing the main visual concept. Should include:
- Main subject (product, scene, concept)
- Colombian context if applicable
- Style (professional product photography, modern, clean)
- Colors and mood (bright, trustworthy, professional)
- Quality keywords (high quality, realistic, detailed, 4K)
- What NOT to include]

Example:
"Professional product photography of Xiaomi smartphones displayed on a modern desk in a Colombian office setting, bright natural lighting, clean white background, multiple phone models showing screens with Colombian landmarks, high quality, realistic, 4K, professional e-commerce style. No people in frame, focus on products."
```

**Additional Notes:**
[Any specific requirements, brand guidelines, or variations needed]

---

## 🖼️ Section Image 1

- **Filename:** `[slug]-section-1.jpg`
- **Dimensions:** 800x600px (4:3 aspect ratio)
- **Location:** `client/public/assets/blog/[slug]-section-1.jpg`
- **Insert After:** Section [X] - H2: "[Heading Title]"
- **Alt Text:** [Descriptive alt text]

**AI Generation Prompt:**
```
[Detailed prompt for this specific section image]

Example:
"Close-up of a smartphone camera lens capturing a Colombian cityscape, bokeh effect, professional photography, golden hour lighting, showing camera quality and detail, realistic, high resolution."
```

**Placement in Article:**
```html
<!-- Insert after this heading: -->
<h2>Características de la Cámara</h2>

<!-- Add image here: -->
<img src="/assets/blog/[slug]-section-1.jpg" alt="[alt text]" class="blog-image" />
```

---

## 🖼️ Section Image 2

- **Filename:** `[slug]-section-2.jpg`
- **Dimensions:** 800x600px (4:3 aspect ratio)
- **Location:** `client/public/assets/blog/[slug]-section-2.jpg`
- **Insert After:** Section [X] - H2: "[Heading Title]"
- **Alt Text:** [Descriptive alt text]

**AI Generation Prompt:**
```
[Detailed prompt for this specific section image]

Example:
"Smartphone showing battery statistics and charging indicator at 100%, fast charging cable connected, modern minimalist desk, soft lighting, Colombian electrical outlet visible, professional product photography, clean composition."
```

---

## 🖼️ Section Image 3

- **Filename:** `[slug]-section-3.jpg`
- **Dimensions:** 800x600px (4:3 aspect ratio)
- **Location:** `client/public/assets/blog/[slug]-section-3.jpg`
- **Insert After:** Section [X] - H2: "[Heading Title]"
- **Alt Text:** [Descriptive alt text]

**AI Generation Prompt:**
```
[Detailed prompt for this specific section image]
```

---

## 📊 Comparison Image/Infographic (Optional but Recommended)

- **Filename:** `[slug]-comparison.jpg`
- **Dimensions:** 1000x800px (5:4 aspect ratio)
- **Location:** `client/public/assets/blog/[slug]-comparison.jpg`
- **Insert In:** Comparison section or specifications table
- **Alt Text:** "Comparación de [models] - especificaciones y precios"

**AI Generation Prompt:**
```
"Professional comparison infographic showing 3-4 smartphone models side by side, clean table layout with specifications (camera, battery, processor, price), modern corporate style, Celuvendo brand colors (use blues and whites), clear typography, professional design, suitable for blog article."
```

**Alternative Option:**
Instead of AI generation, this could be created manually in Canva/Figma using the article's comparison table data.

---

## 🎨 Brand Style Guidelines for All Images

**Color Palette:**
- Primary: Blues (#0066CC, similar to Celuvendo branding)
- Secondary: Clean whites, light grays
- Accent: Trust signals (green for checks, orange for deals)

**Style Requirements:**
- Professional and trustworthy
- Clean and modern
- No overly promotional/salesy look
- Realistic product photography preferred over illustrations
- Colombian context when relevant (but not forced)

**What to AVOID:**
- Stock photo watermarks
- Overly generic stock imagery
- Cluttered compositions
- Text overlays (unless it's an infographic)
- Low quality or pixelated images
- Stereotypical representations

---

## 📋 Image Checklist

Before finalizing images:

- [ ] All filenames follow the naming convention `[slug]-[type].jpg`
- [ ] Images are placed in `client/public/assets/blog/`
- [ ] Featured image is 1200x630px for optimal Open Graph sharing
- [ ] Section images are 800x600px for consistent article layout
- [ ] All images are optimized for web (compressed but high quality)
- [ ] Alt text is descriptive and includes relevant keywords
- [ ] Images are relevant to their section content
- [ ] No copyright or watermark issues
- [ ] Images match Celuvendo brand style

---

## 🚀 After Generating Images

1. **Generate images** using your preferred AI tool (Midjourney, DALL-E, Stable Diffusion, etc.)
2. **Optimize images** for web using TinyPNG or similar tools
3. **Save images** to `client/public/assets/blog/` with exact filenames specified
4. **Update article** to reference the image paths
5. **Test images** appear correctly in blog post preview
6. **Verify alt text** is present for accessibility and SEO

---

**Notes:**
- Image generation typically takes 5-15 minutes per article depending on AI tool used
- Budget approximately $2-10 per article if using paid AI image tools
- Free alternatives: Bing Image Creator, Leonardo.ai (limited free tier)
- For comparison tables, consider creating them as styled HTML/CSS instead of images for better SEO
