# Where In Maginhawa

A Turborepo monorepo for the Where In Maginhawa platform - your ultimate guide to discovering the best restaurants, cafés, and food spots on Maginhawa Street, Quezon City, Philippines.

## 📦 Monorepo Structure

This project uses [Turborepo](https://turbo.build/repo) with [pnpm](https://pnpm.io/) for efficient monorepo management.

### Workspaces

```
whereinmaginhawa/
├── apps/
│   └── web/              # Main user-facing website (Phase 1)
│   └── admin/            # Admin panel (Phase 2 - Coming Soon)
├── packages/
│   └── typescript-config/  # Shared TypeScript configurations
└── turbo.json            # Turborepo configuration
```

## 🎯 Features

### Phase 1 (Current)
- ✅ **Beautiful Hero Section** with animated gradients and MagicUI-inspired components
- ✅ **Advanced Search Bar** with real-time autocomplete suggestions
- ✅ **Smart Search** powered by Fuse.js for fuzzy matching
- ✅ **Place Listings** with grid view and filtering
- ✅ **Detailed Place Pages** with complete information
- ✅ **Tag-Based Filtering** (cuisines, amenities, cravings)
- ✅ **Responsive Design** optimized for all devices
- ✅ **Data Structure** ready for Supabase migration

### Phase 2 (Planned)
- 🔜 Supabase PostgreSQL integration
- 🔜 Image upload to Supabase Storage
- 🔜 Full-text search with PostgreSQL
- 🔜 User authentication
- 🔜 Admin panel for managing places
- 🔜 User reviews and ratings
- 🔜 Interactive map integration

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Search**: Fuse.js
- **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+ (recommended: `npm install -g pnpm`)

### Installation

1. Install dependencies (installs for all workspaces):
```bash
pnpm install
```

2. Set up environment variables:
Create `apps/web/.env.local` file with your MagicUI Pro API key:
```bash
NEXT_PUBLIC_MAGICUI_API_KEY=your_api_key_here
```

3. Run the development server:
```bash
pnpm dev
```

This will start all apps in development mode using Turborepo.

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Useful Commands

```bash
# Run dev servers for all apps
pnpm dev

# Build all apps and packages
pnpm build

# Run linting for all apps
pnpm lint

# Type check all TypeScript
pnpm type-check

# Clean all build artifacts and node_modules
pnpm clean

# Install a dependency in a specific workspace
pnpm add <package> --filter @whereinmaginhawa/web

# Install a dev dependency in root
pnpm add -Dw <package>
```

## 📁 Project Structure

```
whereinmaginhawa/
├── apps/
│   └── web/                    # Main website
│       ├── src/
│       │   ├── app/           # Next.js app directory
│       │   ├── components/    # React components
│       │   ├── data/          # JSON data (Phase 1)
│       │   ├── lib/           # Utility functions
│       │   └── types/         # TypeScript types
│       ├── public/            # Static assets
│       └── package.json
├── packages/
│   └── typescript-config/     # Shared TS configs
│       ├── base.json
│       └── nextjs.json
├── turbo.json                 # Turborepo config
└── package.json               # Root package.json
```

### Web App Structure (`apps/web/src/`)

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with hero
│   ├── layout.tsx         # Root layout
│   └── places/            # Places routes
├── components/            # React components
│   ├── hero/             # Hero section
│   ├── place/            # Place components
│   ├── search/           # Search components
│   └── ui/               # shadcn/ui components
├── data/                 # JSON data (Phase 1)
│   └── places.json
├── lib/                  # Utility functions
│   └── places.ts
└── types/                # TypeScript types
    ├── place.ts          # Place types & DB schema
    └── tags.ts
```

## 🗄️ Database Schema (Phase 2)

The complete Supabase PostgreSQL schema is documented in `src/types/place.ts`, including:
- `places` table with full-text search support
- `tags` table for normalized tag management
- `place_tags` junction table
- Indexes for optimal search performance

## 🎨 Customization

### Adding New Places

Edit `src/data/places.json`:

```json
{
  "id": "unique-id",
  "name": "Restaurant Name",
  "slug": "restaurant-name",
  "description": "Description...",
  "cuisineTypes": ["italian"],
  "amenities": ["wifi", "pet-friendly"]
}
```

### Customizing Tags

Edit `src/types/tags.ts` to add amenities, cuisines, or other tags.

## 🚀 Deployment

Deploy to Vercel:

```bash
npm run build
```

Then deploy via the [Vercel Platform](https://vercel.com).

---

Built with ❤️ for the Maginhawa community
