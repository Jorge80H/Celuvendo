# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Celuvendo.com is an e-commerce platform for selling mobile phones in Colombia. It's built as a full-stack monorepo using React + Express with TypeScript, Drizzle ORM, and PostgreSQL.

## Development Commands

```bash
# Start development server (runs both frontend and backend)
npm run dev

# Build for production (builds frontend and bundles backend)
npm run build

# Start production server
npm start

# Type checking
npm run check

# Database operations
npm run db:push  # Push schema changes to database
```

## Architecture

### Monorepo Structure

- **`client/`**: React frontend (Vite-based SPA)
  - `src/pages/`: Route components (Home, Products, Cart, NotFound)
  - `src/components/`: Reusable React components (Header, Footer, ProductCard, FilterSidebar, etc.)
  - `src/components/ui/`: shadcn/ui components
  - `src/hooks/`: Custom React hooks
  - `src/lib/`: Client utilities (query client, etc.)

- **`server/`**: Express backend API
  - `index.ts`: Express server setup and middleware
  - `routes.ts`: API endpoint definitions
  - `storage.ts`: Database abstraction layer (DbStorage class)
  - `db.ts`: Drizzle database connection
  - `seed.ts`: Database seeding script
  - `vite.ts`: Vite integration for dev/prod

- **`shared/`**: Code shared between client and server
  - `schema.ts`: Drizzle schema definitions and Zod validation schemas

### Key Technologies

- **Frontend**: React 18, Wouter (routing), TanStack Query, Radix UI, Tailwind CSS, shadcn/ui
- **Backend**: Express, Passport (session-based auth), express-session
- **Database**: PostgreSQL via Drizzle ORM (@neondatabase/serverless)
- **Build**: Vite (frontend), esbuild (backend bundling)

### Path Aliases

- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

## Database Schema

Two main tables defined in `shared/schema.ts`:

1. **products**: Mobile phone catalog with JSON fields for specifications, images, and features
2. **cartItems**: Shopping cart items tied to session IDs

## API Structure

All API routes are in `server/routes.ts`:

- `GET /api/products` - List products with filtering (brand, price, RAM, storage, search)
- `GET /api/products/featured` - Featured products
- `GET /api/products/:id` - Single product by ID
- `GET /api/products/slug/:slug` - Single product by slug
- `GET /api/cart` - Current session's cart items
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove cart item
- `DELETE /api/cart` - Clear cart

Session management is handled via express-session with session IDs used to track carts.

## Storage Layer

`server/storage.ts` contains the `DbStorage` class implementing the `IStorage` interface. This is the data access layer for all database operations. When adding new features, extend this interface and implementation.

## Design Guidelines

The project follows specific design patterns documented in `design_guidelines.md`:

- **Colombian market localization**: COP currency formatting, Colombian payment methods (PSE, Nequi), Colombian shipping cities
- **Mobile-first approach**: Optimized for mobile shopping behavior
- **Typography**: Inter (UI/body) and Manrope (headings/CTAs)
- **Reference patterns**: Mercado Libre (familiarity), Apple Store (premium presentation), Amazon (efficient flows)

## Important Development Notes

### Environment Variables

- `DATABASE_URL`: PostgreSQL connection string (required)
- `SESSION_SECRET`: Session encryption key (change in production)
- `NODE_ENV`: Set to "production" for production builds
- `PORT`: Server port (default: 5000)

### Development Server

The dev server runs on `localhost:5000` and serves both the API and the Vite dev server. In production, the built frontend is served from `dist/public`.

### Adding New Features

1. If adding database tables: Update `shared/schema.ts` with Drizzle schema and Zod validators
2. If adding API endpoints: Add routes to `server/routes.ts` and methods to `server/storage.ts`
3. If adding UI components: Follow the shadcn/ui pattern in `client/src/components/ui/`
4. Frontend pages use Wouter for routing (configured in `client/src/App.tsx`)

### Product Data

Products contain JSON fields for complex data:
- `images`: Array of image URLs
- `specifications`: Nested object with screen, processor, RAM, storage, camera, battery, connectivity, OS
- `features`: Array of feature strings

When filtering by RAM/storage, filtering happens in-memory after database query (see `storage.ts:64-76`).
