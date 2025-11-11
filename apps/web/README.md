# Where In Maginhawa

Your ultimate guide to discovering the best restaurants, cafés, and food spots on Maginhawa Street, Quezon City, Philippines.

## 🎯 Features

### Phase 1 (Current)
- ✅ **Beautiful Hero Section** with animated gradients and MagicUI-inspired components
- ✅ **Advanced Search Bar** with real-time autocomplete suggestions
- ✅ **Smart Search** powered by Fuse.js for fuzzy matching
- ✅ **Place Listings** with grid view and filtering
- ✅ **Detailed Place Pages** with complete information
- ✅ **Tag-Based Filtering** (cuisines, amenities, cravings)
- ✅ **SEO Category Pages** - 25 optimized landing pages for organic search
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
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create `.env.local` file with your MagicUI Pro API key:
```bash
NEXT_PUBLIC_MAGICUI_API_KEY=your_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with hero
│   ├── layout.tsx         # Root layout
│   ├── [category]/        # SEO category pages
│   │   └── page.tsx       # Dynamic category landing pages
│   └── places/            # Places routes
│       ├── page.tsx       # Places listing
│       └── [slug]/        # Individual place pages
├── components/            # React components
│   ├── hero/             # Hero section components
│   ├── place/            # Place-related components
│   ├── search/           # Search components
│   └── ui/               # shadcn/ui components
├── data/                 # JSON data files
│   ├── places.json       # Auto-generated index (lightweight)
│   ├── stats.json        # Auto-generated statistics
│   └── places/           # Individual place files
│       ├── rodics-diner.json
│       └── ...           # 225+ place files
├── lib/                  # Utility functions
│   ├── places.ts         # Place data operations
│   ├── categories.ts     # Category configuration
│   └── utils.ts          # General utilities
└── types/                # TypeScript type definitions
    ├── place.ts          # Place types & DB schema
    ├── category.ts       # Category types
    └── tags.ts           # Tag definitions
```

## 🔍 SEO Category Pages

25 statically-generated category pages optimized for organic search traffic. Each page includes:
- 🎯 **Targeted SEO metadata** (title, description, keywords, OpenGraph)
- 📊 **Pre-filtered results** using keyword-based search
- 🎨 **Emoji hero icons** for visual branding
- 📍 **Canonical URLs** and sitemap integration

### Category Pages Table

| Category | URL | Type | Priority |
|----------|-----|------|----------|
| 🍻 Bars in Maginhawa | `/bars-in-maginhawa` | Amenity | 0.85 |
| ☕ Coffee Shops | `/coffee-shops-in-maginhawa` | Cuisine | 0.90 |
| 🇵🇭 Filipino Restaurants | `/filipino-restaurants-in-maginhawa` | Cuisine | 0.85 |
| 🍱 Japanese Restaurants | `/japanese-restaurants-in-maginhawa` | Cuisine | 0.80 |
| 🇰🇷 Korean Restaurants | `/korean-restaurants-in-maginhawa` | Cuisine | 0.80 |
| 🍝 Italian Restaurants | `/italian-restaurants-in-maginhawa` | Cuisine | 0.75 |
| 🍕 Pizza Places | `/pizza-in-maginhawa` | Cuisine | 0.85 |
| 🥡 Chinese Restaurants | `/chinese-restaurants-in-maginhawa` | Cuisine | 0.80 |
| 🍔 Burger Joints | `/burger-joints-in-maginhawa` | Cuisine | 0.80 |
| 🥪 Breakfast & Brunch | `/breakfast-brunch-in-maginhawa` | Experience | 0.75 |
| 🍜 Vietnamese Restaurants | `/vietnamese-restaurants-in-maginhawa` | Cuisine | 0.70 |
| 🌮 Mexican Restaurants | `/mexican-restaurants-in-maginhawa` | Cuisine | 0.70 |
| 🍛 Thai Restaurants | `/thai-restaurants-in-maginhawa` | Cuisine | 0.70 |
| 🍦 Desserts & Ice Cream | `/desserts-ice-cream-in-maginhawa` | Cuisine | 0.75 |
| 🍗 Fried Chicken | `/fried-chicken-in-maginhawa` | Cuisine | 0.75 |
| 🐾 Pet-Friendly Places | `/pet-friendly-restaurants-in-maginhawa` | Amenity | 0.80 |
| 📶 Places with WiFi | `/wifi-cafes-in-maginhawa` | Amenity | 0.85 |
| 🌳 Outdoor Seating | `/outdoor-seating-in-maginhawa` | Amenity | 0.70 |
| 💰 Budget-Friendly Eats | `/budget-restaurants-in-maginhawa` | Price | 0.85 |
| 🌙 Late-Night Dining | `/late-night-dining-in-maginhawa` | Experience | 0.80 |
| 💑 Romantic Date Spots | `/romantic-date-spots-in-maginhawa` | Experience | 0.75 |
| 👨‍👩‍👧‍👦 Family-Friendly | `/family-friendly-restaurants-in-maginhawa` | Experience | 0.70 |
| 📸 Instagram-Worthy Spots | `/instagram-worthy-spots-in-maginhawa` | Experience | 0.75 |
| 🥗 Vegetarian & Vegan | `/vegetarian-vegan-in-maginhawa` | Cuisine | 0.70 |
| 🎉 Group Dining | `/group-dining-in-maginhawa` | Experience | 0.70 |

**Implementation**:
- Dynamic route: `app/[category]/page.tsx`
- Configuration: `lib/categories.ts`
- Keyword-based filtering across: tags, amenities, cuisineTypes, specialties
- Static generation at build time via `generateStaticParams()`

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
