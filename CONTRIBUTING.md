# Contributing to Where In Maginhawa

Thank you for your interest in contributing to Where In Maginhawa! This guide will help you add new places or update existing information.

## Quick Start

### Adding a New Place

1. **Fork the repository** and create a new branch
2. **Create a new JSON file** in `apps/web/src/data/places/` named after the place slug (e.g., `my-restaurant.json`)
3. **Fill in the place data** using the template below
4. **Validate your file** by running `npm run validate:place apps/web/src/data/places/your-file.json`
5. **Submit a pull request** with your changes

### Updating Existing Place

1. **Fork the repository** and create a new branch
2. **Find the place file** in `apps/web/src/data/places/[slug].json`
3. **Update the information** and increment the `updatedAt` timestamp
4. **Validate your changes** by running `npm run validate:place apps/web/src/data/places/[slug].json`
5. **Submit a pull request** with your changes

## Place JSON Template

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Restaurant Name",
  "slug": "restaurant-name",
  "description": "A brief description of the place (at least 10 characters)",

  "address": "Full street address in Maginhawa area",
  "phone": "+63 123 456 7890",
  "email": "contact@restaurant.com",
  "website": "https://www.restaurant.com",

  "logoUrl": "",
  "coverImageUrl": "https://example.com/cover.jpg",
  "photosUrls": [],

  "operatingHours": {
    "monday": { "open": "10:00", "close": "22:00" },
    "tuesday": { "open": "10:00", "close": "22:00" },
    "wednesday": { "open": "10:00", "close": "22:00" },
    "thursday": { "open": "10:00", "close": "22:00" },
    "friday": { "open": "10:00", "close": "23:00" },
    "saturday": { "open": "10:00", "close": "23:00" },
    "sunday": { "closed": true }
  },

  "priceRange": "$$",
  "paymentMethods": ["cash", "gcash", "credit-card"],

  "tags": ["casual", "family-friendly", "popular"],
  "amenities": ["wifi", "air-conditioned", "parking"],
  "cuisineTypes": ["filipino", "asian"],
  "specialties": ["sisig", "kare-kare"],

  "latitude": 14.6410,
  "longitude": 121.0650,

  "createdAt": "2025-11-09T00:00:00.000Z",
  "updatedAt": "2025-11-09T00:00:00.000Z"
}
```

## Field Reference

### Required Fields

- **id** (string): Unique UUID identifier (see "Generating a UUID" below)
- **name** (string): Official name of the establishment
- **slug** (string): URL-friendly name (lowercase, hyphens only, e.g., `johns-diner`)
- **description** (string): Brief description (minimum 10 characters)
- **address** (string): Full street address
- **operatingHours** (object): Hours for each day of the week (see template)
- **priceRange** (string): One of `$`, `$$`, `$$$`, `$$$$`
- **cuisineTypes** (array): At least one cuisine type
- **createdAt** (string): ISO 8601 timestamp
- **updatedAt** (string): ISO 8601 timestamp

### Optional Fields

- **phone** (string): Contact phone number
- **email** (string): Contact email (must be valid email format)
- **website** (string): Official website or Facebook page URL
- **logoUrl** (string): URL to logo image
- **coverImageUrl** (string): URL to cover/hero image
- **photosUrls** (array): Array of photo URLs
- **paymentMethods** (array): Accepted payment methods
- **tags** (array): Descriptive tags
- **amenities** (array): Available amenities
- **specialties** (array): Signature dishes or offerings
- **latitude** (number): GPS latitude (-90 to 90)
- **longitude** (number): GPS longitude (-180 to 180)
- **rating** (number): Average rating (0-5)
- **reviewCount** (number): Number of reviews
- **verified** (boolean): Verification status

## Generating a UUID

Every place needs a unique UUID (Universally Unique Identifier). Use one of these free online tools to generate a random UUID:

### Recommended UUID Generators

1. **[UUID Generator](https://www.uuidgenerator.net/)** - Simple, fast, no signup required
2. **[UUID Tools](https://uuidtools.com/generate/v4)** - Generates UUID v4 (random)
3. **[Online UUID Generator](https://www.uuid-generator.com/)** - Clean interface

### Using Command Line

If you prefer using the command line:

```bash
# On Mac/Linux
uuidgen

# Or using Node.js
node -e "console.log(crypto.randomUUID())"

# Or using Python
python3 -c "import uuid; print(uuid.uuid4())"
```

### UUID Format

UUIDs must follow this format:
- ✅ `550e8400-e29b-41d4-a716-446655440000`
- ✅ `a7b3c9d2-1234-5678-abcd-ef1234567890`
- ❌ `123` (too short)
- ❌ `my-unique-id` (not a UUID)

**Important**: Generate a new random UUID for each new place. Don't reuse UUIDs from other places!

## Creating a Good Slug

Slugs must be **lowercase** with **hyphens only**:

✅ Good examples:
- `rodics-diner`
- `the-toast-house-cafe`
- `123-burger-joint`

❌ Bad examples:
- `Rodics Diner` (has spaces and capitals)
- `the_toast_house` (has underscores)
- `café-lúna` (has accents)

## Price Range Guide

- `$` - Budget-friendly (₱100-200 per person)
- `$$` - Moderate (₱200-500 per person)
- `$$$` - Upscale (₱500-1000 per person)
- `$$$$` - Fine dining (₱1000+ per person)

## Operating Hours Format

Use 24-hour format (HH:MM):

```json
{
  "monday": { "open": "09:00", "close": "21:00" },
  "tuesday": { "closed": true }
}
```

## Common Tags

**Atmosphere**: casual, cozy, trendy, nostalgic, aesthetic, instagram-worthy
**Dining Style**: family-friendly, date-spot, study-spot, group-friendly
**Service**: quick-service, casual-dining, fine-dining
**Features**: popular, budget-friendly, local-favorite, student-friendly

See existing place files for more tag examples.

## Common Amenities

- `wifi` - Free WiFi available
- `air-conditioned` - Indoor air conditioning
- `parking` - Parking available
- `outdoor-seating` - Outdoor dining area
- `pet-friendly` - Pets allowed
- `delivery` - Delivery service available
- `takeout` - Takeout available
- `power-outlets` - Charging outlets available

## Validation

Before submitting, validate your JSON file:

```bash
# Validate a specific file
npm run validate:place apps/web/src/data/places/your-file.json

# Validate all place files
npm run validate:places
```

The validator will check for:
- Valid JSON syntax
- Required fields present
- Correct data types
- Valid slug format (kebab-case)
- Valid email and URL formats
- Operating hours format
- Price range values

## Pull Request Guidelines

1. **One place per PR**: Submit separate PRs for each new place
2. **Clear title**: Use format "Add [Place Name]" or "Update [Place Name]"
3. **Description**: Include source of information and any notes
4. **Validation**: Ensure your file passes validation (see below)
5. **No index changes**: Do **NOT** modify `places.json` or `stats.json` (auto-generated)

## Automated Validation

When you submit a pull request, GitHub Actions will automatically:

1. **Detect changes** to place files
2. **Validate** your JSON files
3. **Comment on your PR** with results:
   - ✅ **Success**: All files are valid - ready for review!
   - ❌ **Failure**: Validation errors found - please fix them

### Example PR Comment (Success)

```
✅ Place File Validation Passed

All changed place files have been validated successfully!

### ✅ `apps/web/src/data/places/your-place.json`

Validation passed!

---
Next Steps:
- Wait for review from maintainers
- Once merged, your place will be live!
```

### Example PR Comment (Failure)

```
❌ Place File Validation Failed

### ❌ `apps/web/src/data/places/your-place.json`

• id: ID must be a valid UUID
• operatingHours.monday.open: Time must be in HH:MM format

---
How to Fix:
1. Fix the errors listed above
2. Push your changes
3. Validation will run again automatically
```

### What Gets Validated

- ✅ UUID format for `id`
- ✅ Kebab-case format for `slug`
- ✅ Required fields present
- ✅ Valid email and URL formats
- ✅ Correct time format (HH:MM)
- ✅ Valid price range values
- ✅ JSON syntax

**You don't need to run validation locally** - the automated check will catch any issues. But if you want to validate before pushing:

```bash
npm run validate:place apps/web/src/data/places/your-file.json
```

## Important Notes

### ⚠️ DO NOT Edit These Files

The following files are **auto-generated** and will be overwritten:

- ❌ `apps/web/src/data/places.json` (index file)
- ❌ `apps/web/src/data/stats.json` (statistics file)

These files are automatically generated from individual place files when your PR is merged.

### ✅ Only Edit Individual Place Files

You should **ONLY** create or edit files in:

- ✅ `apps/web/src/data/places/[slug].json`

### 🔍 SEO Category Pages

Your place will automatically appear on relevant category pages based on its metadata! We have 25 SEO-optimized category pages like:
- `/bars-in-maginhawa`
- `/coffee-shops-in-maginhawa`
- `/instagram-worthy-spots-in-maginhawa`
- And 22 more...

**How it works**: Category pages search across your place's `tags`, `amenities`, `cuisineTypes`, and `specialties` fields. For example:
- Add `"cuisineTypes": ["italian"]` → appears on `/italian-restaurants-in-maginhawa`
- Add `"amenities": ["wifi"]` → appears on `/wifi-cafes-in-maginhawa`
- Add `"tags": ["pet-friendly"]` → appears on `/pet-friendly-restaurants-in-maginhawa`

**You don't need to do anything special** - just fill in your place data accurately and it will automatically show up on the right category pages!

## Need Help?

- Check existing place files for examples
- Read the [schema documentation](apps/web/src/data/places/README.md)
- Open an issue if you have questions
- Join the discussion in pull requests

## Code of Conduct

- Be respectful and constructive
- Verify information accuracy before submitting
- Give credit to original sources
- Report outdated or incorrect information

Thank you for helping maintain the Where In Maginhawa directory! 🍴
