# Blog Content Directory

This directory stores all blog article content and image generation prompts for Celuvendo.com.

## 📁 Directory Structure

```
blog-content/
├── README.md (this file)
├── [slug].md (article content)
├── [slug]-images.md (image generation prompts)
└── ...
```

## 📝 How to Generate a New Blog Article

### Step 1: Request Article Generation

Use the `blog-seo-celuvendo` skill to generate a new article. Examples:

```
"Generate article A1 from geo cluster"
"Create article B2 for Uber drivers"
"Write the article for Samsung Galaxy A16"
```

The skill will automatically:
1. Read the keyword strategy from `skills/blog-seo-celuvendo/references/estrategia-seo.md`
2. Check available products from `skills/blog-seo-celuvendo/references/productos-disponibles.md`
3. Generate a comprehensive 1,800-2,500 word article
4. Create a separate image prompts document

### Step 2: Review Generated Files

You'll receive TWO files:

**1. Article Content** - `[slug].md`
- Contains frontmatter (title, description, keywords, etc.)
- Full HTML content (1,800-2,500 words)
- Internal link suggestions
- 6-8 FAQ items with detailed answers

**2. Image Prompts** - `[slug]-images.md`
- Detailed prompts for 4-6 images
- Exact filenames and dimensions
- Where to place each image in the article
- Instructions for which H2 section each image belongs to

### Step 3: Generate Images

1. Open `[slug]-images.md`
2. For each image:
   - Copy the AI generation prompt
   - Use your preferred AI image tool (Midjourney, DALL-E, Stable Diffusion, etc.)
   - Generate the image with specified dimensions
   - Download and optimize for web (use TinyPNG or similar)
   - Rename to the exact filename specified
   - Save to `client/public/assets/blog/`

### Step 4: Add Article to React App

1. Open `client/src/pages/Blog.tsx`
2. Add the article metadata to the `blogArticles` array:

```typescript
{
  slug: "your-article-slug",
  title: "Your Article Title",
  excerpt: "Brief description...",
  category: "Geo-localizado", // or "Uso-Necesidad" or "Producto"
  city: "Bogotá", // if geo article
  date: "2025-01-15",
  readTime: "8 min",
  image: "/assets/blog/your-slug-hero.jpg",
  keywords: ["keyword1", "keyword2"]
}
```

3. Open `client/src/pages/BlogPost.tsx`
4. Add the full article object to the `blogArticles` dictionary:

```typescript
"your-article-slug": {
  slug: "your-article-slug",
  title: "Your Article Title",
  metaDescription: "Meta description...",
  excerpt: "Brief description...",
  category: "Geo-localizado",
  date: "2025-01-15",
  dateModified: "2025-01-15",
  readTime: "8 min",
  image: "/assets/blog/your-slug-hero.jpg",
  keywords: ["keyword1", "keyword2"],
  content: `[PASTE YOUR HTML CONTENT HERE]`
}
```

### Step 5: Test the Article

1. Navigate to `/blog` to see it in the listing
2. Click the article to view the full content
3. Verify all images are loading correctly
4. Check internal links work properly
5. Test social sharing (Open Graph image)

## 📊 Article Checklist

Before publishing, verify:

- [ ] Article is 1,800-2,500 words (counted)
- [ ] All 8 sections are complete (Intro, Context, Deep Dive, Comparison, Guide, Why Celuvendo, FAQ, Conclusion)
- [ ] 6-8 FAQ questions with detailed answers (50-80 words each)
- [ ] 3+ internal links to products or categories
- [ ] Meta description is 150-160 characters
- [ ] All images generated and placed in `client/public/assets/blog/`
- [ ] Hero image is 1200x630px
- [ ] Section images are 800x600px
- [ ] All image alt texts are descriptive
- [ ] Article added to Blog.tsx listing
- [ ] Article added to BlogPost.tsx content
- [ ] Tested on `/blog` and `/blog/[slug]` routes
- [ ] Social sharing preview looks good (Open Graph)

## 🎯 SEO Keyword Clusters

### Cluster 1: Geo-Localized (High Purchase Intent)
Target cities: Bogotá, Medellín, Cali, Barranquilla, Bucaramanga

**Keywords:** A1-A5 in `skills/blog-seo-celuvendo/references/estrategia-seo.md`

### Cluster 2: Use/Need-Based (Research Intent)
Target audiences: Uber/Rappi drivers, content creators, gamers, students, parents

**Keywords:** B1-B5 in `skills/blog-seo-celuvendo/references/estrategia-seo.md`

### Cluster 3: Product-Specific (Long Tail)
Individual models from catalog

**Keywords:** C1-C8 in `skills/blog-seo-celuvendo/references/estrategia-seo.md`

## 📝 Content Guidelines

### Word Count Targets
- **Minimum:** 1,800 words
- **Optimal:** 2,000-2,500 words
- **Maximum:** 3,000 words (avoid going over)

### Section Breakdown
1. **Introduction:** 300-400 words
2. **Context/Background:** 300-400 words
3. **Main Content (Deep Dive):** 600-800 words
4. **Comparisons:** 300-400 words
5. **Practical Guide:** 200-300 words
6. **Why Celuvendo:** 200-250 words
7. **FAQ:** 300-400 words (6-8 questions)
8. **Conclusion + CTA:** 150-200 words

### Colombian Tone
Use these expressions naturally (don't overuse):
- "un fierro" - a great device
- "para el camello" - for work
- "buen precio" - good price
- "bacano" - cool, nice

Avoid: "chimba", "parcero" (too casual for blog)

### Golden Rules (NEVER BREAK)
1. ✅ Only products between $550k-$1,090k COP
2. ✅ Only NEW devices (never refurbished/used)
3. ✅ Always Colombia context
4. ✅ Prices in COP format: "$850,000"
5. ✅ Only mention products from available catalog

## 🖼️ Image Guidelines

### Required Images per Article

**1. Hero Image (Featured)**
- **Size:** 1200x630px (16:9)
- **File:** `[slug]-hero.jpg`
- **Max:** 200KB after optimization

**2-4. Section Images**
- **Size:** 800x600px (4:3)
- **File:** `[slug]-section-1.jpg`, `[slug]-section-2.jpg`, etc.
- **Max:** 150KB each after optimization

**Optional: Comparison/Infographic**
- **Size:** 1000x800px (5:4)
- **File:** `[slug]-comparison.jpg`
- **Max:** 200KB after optimization

### Image Optimization Tools
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
- ImageOptim (Mac): https://imageoptim.com/

## 📈 Publishing Schedule

Recommended frequency:
- **Week 1-2:** 2-3 geo articles (Cluster 1)
- **Week 3-4:** 2-3 use/need articles (Cluster 2)
- **Week 5-6:** 2-3 product articles (Cluster 3)
- **Ongoing:** 2 articles per week to maintain momentum

## 🔗 Internal Linking Strategy

Always include:
1. **Product category links:** `/productos?brand=Xiaomi`
2. **Related blog articles:** `/blog/related-slug`
3. **Specific product pages:** `/producto/model-slug`

Minimum 3 internal links per article.

## 📊 Content Tracking

| Article | Slug | Category | Status | Published Date | Images |
|---------|------|----------|--------|----------------|--------|
| A1 | celulares-xiaomi-bogota-envio-rapido | Geo | Draft | - | 0/5 |
| - | - | - | - | - | - |

Update this table as you publish articles.

## 🆘 Need Help?

If the skill doesn't generate content correctly:
1. Check that all reference files are up to date
2. Verify the keyword exists in `estrategia-seo.md`
3. Ensure products mentioned exist in `productos-disponibles.md`
4. Regenerate the article with more specific instructions

---

**Last Updated:** December 2025
**Total Articles:** 0
**Total Published:** 0
