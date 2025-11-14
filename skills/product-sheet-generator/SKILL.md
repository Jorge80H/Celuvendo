---
name: product-sheet-generator
description: This skill should be used when users need to create detailed, professional product specification sheets for e-commerce mobile phones/smartphones. It generates comprehensive markdown files with pricing, specifications, marketing copy, competitive analysis, and sales strategies in Spanish for the Colombian market.
license: MIT
---

# Product Sheet Generator

This skill provides a structured workflow for creating detailed product specification sheets for mobile phones and smartphones in an e-commerce context.

## Purpose

Generate comprehensive, well-structured product specification sheets in markdown format that include:
- Complete technical specifications
- Pricing and competitive analysis
- Marketing descriptions (short and long)
- Sales strategies and positioning
- Bundle opportunities and cross-selling suggestions
- FAQ and customer objections handling
- Visual assets requirements

These sheets serve as master reference documents for e-commerce platforms, sales teams, and marketing departments.

## When to Use This Skill

Use this skill when:
- Creating product specification sheets for mobile phones/smartphones
- Users request "crear ficha de producto" or "generar ficha detallada"
- Need to document a new product for e-commerce catalog
- Updating existing product information with competitive analysis
- Preparing sales team documentation for specific device models

## How to Use This Skill

### Step 1: Gather Product Information

Collect the following information about the product:
- Brand and model name
- RAM and storage variant
- Launch date and availability
- Official pricing (PVP)
- Competitor pricing (B2C retail)
- Available colors
- Technical specifications (from official sources)
- Box contents information

**Research sources to use:**
1. Official manufacturer websites (Samsung, Xiaomi, Motorola, TECNO, Oppo, etc.)
2. Colombian retail sites (Alkosto, Éxito, Falabella, MercadoLibre)
3. Carrier sites (Claro, Movistar, WOM)
4. Tech review sites for additional specs

### Step 2: Use the Template Structure

Follow the exact structure from `references/product-sheet-template.md`. The template includes all required sections:

1. **Header Section**
   - Product title with full specs
   - Internal SKU code

2. **General Information Table**
   - Brand, model, variant
   - Launch date and availability

3. **Pricing Table**
   - Suggested retail price (PVP)
   - Competitor pricing with sources
   - Competitiveness alerts if needed

4. **Colors Section**
   - List all available colors with emoji indicators
   - Official color names in Spanish and English

5. **Marketing Descriptions**
   - Short description (for catalog/listings) - 2-3 sentences
   - Long description (for product page) - 3-4 paragraphs with key features

6. **Complete Technical Specifications**
   - Display (size, type, resolution, refresh rate, protection)
   - Performance (processor, CPU, GPU, RAM, storage)
   - Cameras (rear and front with all specs)
   - Battery and charging
   - Connectivity (network, SIM, Wi-Fi, Bluetooth, NFC, etc.)
   - Security and sensors
   - Water/dust resistance
   - Audio specifications
   - Software (OS, updates)
   - Dimensions and weight

7. **Box Contents**
   - Items included (with checkmarks)
   - Items NOT included (with X marks)
   - Critical note if charger is not included

8. **Competitive Advantages**
   - Strengths (with checkmarks)
   - Weaknesses vs competition (with warnings)
   - Target audience

9. **Competitive Comparison**
   - Direct comparisons with 2-3 similar products
   - Feature-by-feature analysis
   - Price positioning

10. **Sales Strategy**
    - Recommended pricing
    - Key sales messages (numbered list)
    - Bundle opportunities
    - Cross-selling and upselling ideas
    - Common objections and responses

11. **E-commerce Notes**
    - Critical information to display
    - Required marketing assets
    - Suggested tags and categories

12. **FAQ Section**
    - 6-10 most common questions
    - Clear, concise answers

13. **References and Sources**
    - List all sources used

### Step 3: Apply Colombian Market Context

When creating sheets, always consider:

**Currency:**
- Use Colombian Pesos (COP)
- Format: $1.234.567 (period for thousands, no decimals)

**Language:**
- Write entirely in Spanish
- Use Colombian terminology and expressions
- Technical specs can use English terms when standard (e.g., "AMOLED", "IP68")

**Pricing Strategy:**
- Compare with major Colombian retailers (Alkosto, Éxito, etc.)
- Note price differences and competitiveness
- Suggest realistic pricing based on market research

**Important Market Factors:**
- Samsung vs Chinese brands perception
- Charger inclusion policy (Samsung doesn't include, others do)
- Warranty and support expectations
- 5G coverage availability in Colombia

### Step 4: Critical Information Emphasis

**Always highlight these critical factors:**

1. **Charger Inclusion:**
   - Samsung: Does NOT include charger (only cable)
   - Most Chinese brands: DO include charger
   - Mark this prominently with warning symbols

2. **Price Competitiveness:**
   - If suggested price is >20% higher than market: Add ALERT
   - Show exact price difference
   - Suggest pricing adjustments or value-add bundles

3. **Key Differentiators:**
   - 5G vs 4G clearly marked
   - Screen technology (AMOLED vs LCD)
   - Refresh rate (60Hz vs 90Hz vs 120Hz vs 144Hz)
   - Water resistance certification (IP rating)
   - Update policy (especially Samsung's long-term updates)

4. **Missing Features:**
   - No NFC (important for contactless payments)
   - No water resistance
   - No fast charging
   - No wireless charging

### Step 5: Generate Marketing Content

Create compelling marketing copy following these guidelines:

**Short Description (Catalog):**
- 2-3 sentences maximum
- Focus on 2-3 key features
- Include most impressive spec (camera, battery, or screen)
- Action-oriented language

**Long Description (Product Page):**
- 3-4 paragraphs
- Start with brand positioning and target user
- Second paragraph: Display and performance
- Third paragraph: Camera system details
- Fourth paragraph: Battery, charging, and additional features
- Use bold for key numbers and features
- Include parenthetical clarifications when correcting distributor errors

**Key Sales Messages:**
- 6-8 bullet points
- Start each with action verb or benefit
- Include specific numbers and specs
- Put most important features first
- Address common customer priorities

### Step 6: Competitive Analysis

For each product, compare with:
1. Direct competitor at similar price point
2. Higher-tier option (upsell opportunity)
3. Lower-tier option (price-conscious buyers)

Use this format:
```
### vs [Competitor Model] ($price)
- ✅ Better feature
- ❌ Worse feature
- ≈ Similar feature
```

### Step 7: Sales Strategy Development

Provide actionable sales guidance:

**Price Positioning:**
- Recommended retail price range
- Justification based on market research
- Margin analysis if cost information available

**Objection Handling:**
- List 3-5 common objections
- Provide specific responses for sales team
- Include alternative options when appropriate

**Bundle Strategies:**
- Basic bundle (entry-level accessories)
- Premium bundle (higher-margin accessories)
- Family/specialized bundles
- Calculate total value vs individual pricing

### Step 8: Quality Checks

Before finalizing, verify:
- [ ] All technical specs are accurate and from official sources
- [ ] Pricing is current and sourced
- [ ] Charger inclusion status is clearly marked
- [ ] Color names are official and complete
- [ ] Marketing copy is in Spanish (except standard tech terms)
- [ ] Competitive comparisons are fair and factual
- [ ] Sales strategies are practical and actionable
- [ ] FAQ addresses real customer concerns
- [ ] File naming follows convention: BRAND-Model-Name.md

### Step 9: File Organization

Save generated sheets in the designated directory:
- Path: `Fichas_Productos/`
- Naming: `BRAND-Model-Name.md`
- Examples: `SAMSUNG-Galaxy-A06.md`, `TECNO-Camon-40-Pro.md`

## Important Notes

**Accuracy is Critical:**
- Always verify specs with official manufacturer sources
- Double-check pricing with multiple retail sources
- Note when correcting distributor catalog errors
- Include source references for major claims

**Market Sensitivity:**
- Colombian market has specific preferences and price sensitivities
- Brand perception varies (Samsung premium vs Chinese value)
- Consider regional 5G coverage when recommending models
- Payment methods and installment plans are important

**Tone and Style:**
- Professional but accessible
- Use emojis sparingly (only for visual markers like ✅ ❌ ⚠️)
- Technical accuracy over marketing hyperbole
- Honest about limitations and weaknesses
- Focus on customer value and practical benefits

## Examples

Refer to existing completed product sheets:
- `TECNO-Camon-40.md` - Standard format example
- `TECNO-Camon-40-Pro.md` - Premium model with 4G/5G variants
- `SAMSUNG-Galaxy-A06.md` - Entry-level model with pricing competitiveness alerts

## Bundled Resources

### References
- `references/product-sheet-template.md` - Master template with all sections
- `references/colombian-retailers.md` - List of major retailers and carriers
- `references/spec-glossary.md` - Technical terminology in Spanish/English

### Assets
- `assets/sample-sheets/` - Example completed product sheets for reference

## Workflow Summary

1. Gather product information from official and retail sources
2. Use template structure from references
3. Apply Colombian market context (language, currency, pricing)
4. Emphasize critical factors (charger, pricing, differentiators)
5. Generate compelling marketing content in Spanish
6. Perform competitive analysis with specific models
7. Develop practical sales strategies and objection handling
8. Run quality checks
9. Save in proper directory with correct naming convention

This systematic approach ensures consistency, accuracy, and usefulness across all product specification sheets.
