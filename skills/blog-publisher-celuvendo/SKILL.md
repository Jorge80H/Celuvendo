---
name: blog-publisher-celuvendo
description: Publishes SEO-optimized blog articles to the Celuvendo.com codebase with consistent design and structure. Converts markdown content from blog-seo-celuvendo skill output to React/TypeScript components ready for production.
---

# Blog Publisher Celuvendo

## Overview

This skill automates the publication of blog articles created with the **blog-seo-celuvendo** skill into the Celuvendo.com React codebase. It ensures consistent design, proper HTML structure, and seamless integration with the existing blog system.

## Prerequisites

Before using this skill, you must:
1. Have created an article using the **blog-seo-celuvendo** skill
2. Have generated images and placed them in `CeluvendoEcom/client/public/assets/blog/`
3. Have the markdown article file in `blog-content/[slug].md`

## Usage Workflow

### Step 1: Read the Markdown Article

Read the markdown file from `blog-content/[slug].md` to extract:
- **Frontmatter metadata** (title, slug, description, keywords, category, date, image)
- **Markdown content** (the actual article body)

### Step 2: Convert Markdown to HTML

Convert the markdown content to clean HTML following these rules:

#### Headers
- `## Heading` → `<h2 class="text-3xl font-bold mt-12 mb-6">Heading</h2>`
- `### Subheading` → `<h3 class="text-2xl font-semibold mt-8 mb-4">Subheading</h3>`

#### Text Formatting
- `**bold text**` → `<strong>bold text</strong>`
- `*italic text*` → `<em>italic text</em>`
- Regular paragraphs → `<p class="mb-6">content</p>`
- Lead paragraph (first after intro) → `<p class="text-lg leading-relaxed mb-6">content</p>`

#### Lists
- Unordered lists → `<ul class="list-disc pl-6 mb-6 space-y-2"><li>item</li></ul>`
- Ordered lists → `<ol class="list-decimal pl-6 mb-6 space-y-2"><li>item</li></ol>`
- Checkmark lists (✅) → `<ul class="list-none pl-0 mb-6 space-y-2"><li>✅ item</li></ul>`

#### Tables
```html
<div class="overflow-x-auto mb-8">
  <table class="min-w-full bg-white border border-gray-300 rounded-lg">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-4 py-3 text-left border-b">Header</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b hover:bg-gray-50">
        <td class="px-4 py-3">Cell</td>
      </tr>
    </tbody>
  </table>
</div>
```

#### Images
```html
<!-- Hero image (first in article) -->
<div class="blog-image mb-8">
  <img src="/assets/blog/[slug]-hero.jpg" alt="[Article Title]" class="w-full rounded-lg shadow-lg" />
</div>

<!-- Section images -->
<img src="/assets/blog/[slug]-section-X.jpg" alt="[Alt text]" class="blog-image w-full rounded-lg shadow-md my-8" />
```

#### Links
- `[text](url)` → `<a href="url">text</a>`
- Internal product links → `<a href="/productos">text</a>`
- External links → `<a href="url" target="_blank" rel="noopener noreferrer">text</a>`

#### CTAs (Call-to-Actions)
```html
<div class="cta-box bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg shadow-xl my-8">
  <h4 class="text-2xl font-bold mb-4">CTA Title</h4>
  <p class="mb-6 text-lg">CTA description</p>
  <a href="/productos" style="color: white !important;" class="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
    CTA Button Text
  </a>
</div>
```

### Step 3: Update Blog.tsx

Add the new article to the `blogArticles` array in `client/src/pages/Blog.tsx`:

```typescript
const blogArticles = [
  {
    slug: "[article-slug]",
    title: "[Article Title]",
    excerpt: "[Article Excerpt - first 150 chars]",
    category: "[Category: Geo-localizado | Uso-Necesidad | Producto]",
    city: "[City if geo-localized, otherwise omit]",
    date: "YYYY-MM-DD",
    readTime: "[X min]",
    image: "/assets/blog/[slug]-hero.jpg",
    keywords: ["keyword1", "keyword2", "keyword3"]
  },
  // ... existing articles
];
```

**Important:** Add new articles at the TOP of the array (most recent first).

### Step 4: Update BlogPost.tsx

Add the new article object to `blogArticles` in `client/src/pages/BlogPost.tsx`:

```typescript
const blogArticles = {
  "[article-slug]": {
    slug: "[article-slug]",
    title: "[Full Article Title]",
    metaDescription: "[Meta description from frontmatter]",
    excerpt: "[Article excerpt]",
    category: "[Category]",
    date: "YYYY-MM-DD",
    dateModified: "YYYY-MM-DD",
    readTime: "[X min]",
    image: "/assets/blog/[slug]-hero.jpg",
    keywords: ["keyword1", "keyword2", "keyword3"],
    content: `<div class="prose max-w-none">[FULL HTML CONTENT HERE]</div>`
  },
  // ... existing articles
};
```

**Content Wrapper:** Always wrap the HTML content in `<div class="prose max-w-none">...</div>`

### Step 5: Verify Images

Ensure all images referenced in the HTML exist in:
```
client/public/assets/blog/
├── [slug]-hero.jpg (1200x630px)
├── [slug]-section-1.jpg (800x600px)
├── [slug]-section-2.jpg (800x600px)
├── [slug]-section-3.jpg (800x600px)
└── [slug]-cta.jpg (800x600px) [optional]
```

## Article Structure Template

Every article must follow this 8-section structure:

```html
<div class="prose max-w-none">
  <!-- Hero Image -->
  <div class="blog-image mb-8">
    <img src="/assets/blog/[slug]-hero.jpg" alt="[Title]" class="w-full rounded-lg shadow-lg" />
  </div>

  <!-- 1. Introduction (300-400 words) -->
  <p class="text-lg leading-relaxed mb-6">[Hook paragraph]</p>
  <p class="mb-6">[Context paragraph]</p>
  <p class="mb-6">En este artículo descubrirás:</p>
  <ul class="list-disc pl-6 mb-6 space-y-2">
    <li>[Benefit 1]</li>
    <li>[Benefit 2]</li>
    <li>[Benefit 3]</li>
  </ul>

  <!-- 2. Context and Background -->
  <h2 class="text-3xl font-bold mt-12 mb-6">[H2 Title]</h2>
  <p class="mb-6">[Content]</p>

  <!-- 3. Main Content - Deep Dive -->
  <h2 class="text-3xl font-bold mt-12 mb-6">[H2 Title]</h2>
  <h3 class="text-2xl font-semibold mt-8 mb-4">[H3 Subtitle]</h3>
  <p class="mb-6">[Content]</p>
  <img src="/assets/blog/[slug]-section-1.jpg" alt="[Alt]" class="blog-image w-full rounded-lg shadow-md my-8" />

  <!-- 4. Comparisons (with table) -->
  <h2 class="text-3xl font-bold mt-12 mb-6">[H2 Title]</h2>
  <div class="overflow-x-auto mb-8">
    <table class="min-w-full bg-white border border-gray-300 rounded-lg">
      <!-- table content -->
    </table>
  </div>

  <!-- 5. Practical Guide -->
  <h2 class="text-3xl font-bold mt-12 mb-6">[H2 Title]</h2>
  <h3 class="text-2xl font-semibold mt-8 mb-4">[H3 Subtitle]</h3>
  <p class="mb-6">[Content]</p>

  <!-- 6. Why Celuvendo -->
  <h2 class="text-3xl font-bold mt-12 mb-6">Por qué Comprar en Celuvendo.com</h2>
  <p class="mb-6">[Benefits]</p>
  <img src="/assets/blog/[slug]-cta.jpg" alt="Celuvendo benefits" class="blog-image w-full rounded-lg shadow-md my-8" />

  <!-- 7. FAQ Section (NO H2 for individual questions) -->
  <h2 class="text-3xl font-bold mt-12 mb-6">Preguntas Frecuentes</h2>
  <h3 class="text-2xl font-semibold mt-8 mb-4">[Question 1]</h3>
  <p class="mb-6">[Answer 1]</p>
  <h3 class="text-2xl font-semibold mt-8 mb-4">[Question 2]</h3>
  <p class="mb-6">[Answer 2]</p>

  <!-- 8. Conclusion + CTAs -->
  <h2 class="text-3xl font-bold mt-12 mb-6">Conclusión: [Summary]</h2>
  <p class="mb-6">[Final thoughts]</p>
  <ul class="list-none pl-0 mb-8 space-y-2">
    <li>🥇 <strong>Recommendation 1</strong></li>
    <li>🥈 <strong>Recommendation 2</strong></li>
    <li>🥉 <strong>Recommendation 3</strong></li>
  </ul>

  <!-- CTA Box 1: Products -->
  <div class="cta-box bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg shadow-xl my-8">
    <h4 class="text-2xl font-bold mb-4">[CTA Title]</h4>
    <p class="mb-6 text-lg">[CTA Description]</p>
    <a href="/productos" style="color: white !important;" class="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
      Ver Productos
    </a>
  </div>

  <!-- CTA Box 2: WhatsApp -->
  <div class="cta-box bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-lg shadow-xl my-8">
    <h4 class="text-2xl font-bold mb-4">¿Necesitas Asesoría Personalizada?</h4>
    <p class="mb-6 text-lg">Nuestros expertos te ayudan a elegir el mejor celular.</p>
    <a href="https://wa.me/573001234567" style="color: white !important;" class="inline-block bg-white text-green-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
      Contactar por WhatsApp
    </a>
  </div>

  <!-- Final Trust Badge -->
  <div class="bg-gray-100 p-6 rounded-lg my-8">
    <p class="text-center text-lg font-semibold mb-2">🚚 Envío Gratis + Garantía Oficial + Mejor Precio del Mercado</p>
    <p class="text-center text-gray-700">Equipos 100% originales y nuevos. Entrega en 24-48 horas a toda Colombia.</p>
  </div>
</div>
```

## Quality Checklist

Before publishing, verify:

- [ ] Article is 1,800-2,500 words minimum
- [ ] All 8 sections are present and complete
- [ ] Hero image displays correctly (1200x630px)
- [ ] All section images exist and display correctly
- [ ] Tables are responsive with proper styling
- [ ] CTAs have proper gradient styling and white text links
- [ ] All internal links use relative paths (`/productos`, not full URLs)
- [ ] External links have `target="_blank" rel="noopener noreferrer"`
- [ ] Metadata is complete (title, description, keywords, date)
- [ ] Article appears in Blog.tsx list
- [ ] Article has full content in BlogPost.tsx
- [ ] FAQ uses H3 for questions, NOT H2
- [ ] Colombian tone and expressions preserved
- [ ] Only mentions products from available catalog
- [ ] Price range stays within $550k-$1,090k COP

## Common Mistakes to Avoid

❌ **DON'T:**
- Use H2 for FAQ questions (use H3 instead)
- Forget to escape HTML in template literals (use backticks correctly)
- Mix up image paths (must start with `/assets/blog/`)
- Create external links without `target="_blank"`
- Include markdown syntax in HTML output
- Forget `style="color: white !important;"` on CTA links
- Use absolute URLs for internal links

✅ **DO:**
- Wrap all content in `<div class="prose max-w-none">`
- Use proper Tailwind classes for spacing and typography
- Add `alt` attributes to all images
- Include hover states on tables (`hover:bg-gray-50`)
- Use semantic HTML (h2, h3, p, ul, table properly nested)
- Test that all image files exist before publishing

## File Paths Reference

```
Project Structure:
├── blog-content/
│   ├── [slug].md                          ← Markdown source
│   └── [slug]-images.md                   ← Image generation prompts
├── client/
│   ├── public/
│   │   └── assets/
│   │       └── blog/
│   │           ├── [slug]-hero.jpg        ← 1200x630px
│   │           ├── [slug]-section-1.jpg   ← 800x600px
│   │           ├── [slug]-section-2.jpg   ← 800x600px
│   │           └── [slug]-cta.jpg         ← 800x600px
│   └── src/
│       └── pages/
│           ├── Blog.tsx                   ← Update: Add to array
│           └── BlogPost.tsx               ← Update: Add article object
└── skills/
    ├── blog-seo-celuvendo/                ← Content creation
    └── blog-publisher-celuvendo/          ← This skill
```

## Example Execution

When user requests: "Publish the article 'mejor-celular-para-trabajar-colombia-2025'"

**Process:**

1. Read `blog-content/mejor-celular-para-trabajar-colombia-2025.md`
2. Extract frontmatter metadata
3. Convert markdown body to HTML with proper classes
4. Update `Blog.tsx` - add to blogArticles array
5. Update `BlogPost.tsx` - add article object with HTML content
6. Verify all images exist in `/assets/blog/`
7. Confirm publication success

**Expected result:**
- Article visible at `/blog/mejor-celular-para-trabajar-colombia-2025`
- Article card appears in blog list at `/blog`
- All images display correctly
- Responsive design works on mobile/desktop
- Schema.org metadata generated automatically

## Notes

- This skill focuses on **publication**, not content creation
- Content creation is handled by **blog-seo-celuvendo** skill
- Always preserve Colombian tone and expressions from original markdown
- HTML must be valid and properly escaped in TypeScript template literals
- Test locally before committing to production
- Keep markdown source files for future edits

## Integration with blog-seo-celuvendo

**Workflow:**
1. Use **blog-seo-celuvendo** to create article → Generates `.md` and `-images.md`
2. Generate images using AI tool → Place in `/assets/blog/`
3. Use **blog-publisher-celuvendo** to publish → Updates React components
4. Build and deploy → Article goes live

This ensures consistent design across all blog articles while maintaining SEO best practices.
