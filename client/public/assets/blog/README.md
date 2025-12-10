# Blog Images Directory

This directory contains all images used in blog articles.

## Naming Convention

All blog images must follow this naming pattern:

```
[article-slug]-[type].jpg
```

**Types:**
- `hero` - Featured image (1200x630px)
- `section-1`, `section-2`, etc. - Section images (800x600px)
- `comparison` - Comparison tables/infographics (1000x800px)

## Examples

For article with slug `celulares-xiaomi-bogota-envio-rapido`:

```
celulares-xiaomi-bogota-envio-rapido-hero.jpg
celulares-xiaomi-bogota-envio-rapido-section-1.jpg
celulares-xiaomi-bogota-envio-rapido-section-2.jpg
celulares-xiaomi-bogota-envio-rapido-section-3.jpg
celulares-xiaomi-bogota-envio-rapido-comparison.jpg
```

## Image Specifications

### Featured Image (Hero)
- **Dimensions:** 1200x630px (16:9)
- **Format:** JPG
- **Max Size:** 200KB (optimized)
- **Purpose:** Open Graph, social sharing, article header

### Section Images
- **Dimensions:** 800x600px (4:3)
- **Format:** JPG
- **Max Size:** 150KB each (optimized)
- **Purpose:** Visual breaks throughout article content

### Comparison/Infographic
- **Dimensions:** 1000x800px (5:4)
- **Format:** JPG or PNG (if transparency needed)
- **Max Size:** 200KB (optimized)
- **Purpose:** Visual data representation

## How to Add Images

1. Generate images using prompts from `blog-content/[slug]-images.md`
2. Optimize images using TinyPNG or similar tool
3. Rename following the naming convention above
4. Place in this directory: `client/public/assets/blog/`
5. Reference in article using: `/assets/blog/[filename].jpg`

## Image Optimization Tools

- **TinyPNG** - https://tinypng.com/
- **Squoosh** - https://squoosh.app/
- **ImageOptim** (Mac) - https://imageoptim.com/

## Current Articles

<!-- Update this list when adding new articles -->

### Published
- *(No articles yet)*

### In Progress
- *(No articles yet)*

---

**Last Updated:** January 2025
