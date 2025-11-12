# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Celuvendo.com is an e-commerce platform for selling mobile phones in Colombia. It's built with React + Vite and InstantDB as a real-time database.

## Development Commands

```bash
# Start development server (Vite dev server)
npm run dev

# Build for production (frontend only)
npm run build

# Type checking
npm run check

# Seed InstantDB with products
npm run seed
```

## Architecture

### Project Structure

- **`client/`**: React frontend (Vite-based SPA)
  - `src/pages/`: Route components (Home, Products, Cart, NotFound)
  - `src/components/`: Reusable React components (Header, Footer, ProductCard, FilterSidebar, etc.)
  - `src/components/ui/`: shadcn/ui components
  - `src/hooks/`: Custom React hooks
  - `src/lib/`: Client utilities (InstantDB client, etc.)

- **`shared/`**: Code shared across the app
  - `instant-schema.ts`: InstantDB schema definitions and TypeScript types

- **`scripts/`**: Utility scripts
  - `seed-instant.ts`: Script to populate InstantDB with product data

### Key Technologies

- **Frontend**: React 18, Wouter (routing), InstantDB React hooks, Radix UI, Tailwind CSS, shadcn/ui
- **Database**: InstantDB (real-time database)
- **Build**: Vite
- **Deployment**: Netlify (static hosting)

### Path Aliases

- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

## Database (InstantDB)

This project uses InstantDB for real-time data synchronization. The schema is defined in `shared/instant-schema.ts`.

### Schema Structure

Two main entities:

1. **products**: Mobile phone catalog with JSON fields for specifications, images, and features
2. **cartItems**: Shopping cart items with relationship to products

### Working with InstantDB

- **Queries**: Use `db.useQuery()` hook in React components
- **Mutations**: Use `db.transact()` for creating/updating/deleting data
- **Schema**: Defined using `i.schema()` with entities and links (relationships)

Example query:
```typescript
const { data, isLoading } = db.useQuery({
  products: {
    $: {
      where: { isActive: true, isFeatured: true },
      limit: 8,
    },
  },
});
```

## Design Guidelines

The project follows specific design patterns documented in `design_guidelines.md`:

- **Colombian market localization**: COP currency formatting, Colombian payment methods (PSE, Nequi), Colombian shipping cities
- **Mobile-first approach**: Optimized for mobile shopping behavior
- **Typography**: Inter (UI/body) and Manrope (headings/CTAs)
- **Reference patterns**: Mercado Libre (familiarity), Apple Store (premium presentation), Amazon (efficient flows)

## Important Development Notes

### Environment Variables

- `VITE_INSTANT_APP_ID`: Your InstantDB app ID (required - get from https://instantdb.com/dash)

### Development Setup

1. Create an InstantDB app at https://instantdb.com/dash
2. Copy your APP_ID
3. Create a `.env` file: `VITE_INSTANT_APP_ID=your_app_id`
4. Run `npm run seed` to populate the database
5. Run `npm run dev` to start development

### Deployment (Netlify)

1. Set environment variable `VITE_INSTANT_APP_ID` in Netlify dashboard
2. Netlify will automatically build using `vite build`
3. After deployment, run `npm run seed` locally to populate the database

### Adding New Features

1. If adding database entities: Update `shared/instant-schema.ts` with schema definitions
2. UI components: Follow the shadcn/ui pattern in `client/src/components/ui/`
3. Frontend pages use Wouter for routing (configured in `client/src/App.tsx`)
4. Use InstantDB React hooks (`db.useQuery()`, `db.transact()`) for data operations

### Product Data

Products contain JSON fields for complex data:
- `images`: Array of image URLs
- `specifications`: Nested object with screen, processor, RAM, storage, camera, battery, connectivity, OS
- `features`: Array of feature strings

All product data is stored directly in InstantDB with real-time synchronization.
