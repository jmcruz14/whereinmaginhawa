# Places Data Directory

This directory contains individual JSON files for each place listed on Where In Maginhawa.

## File Structure

- Each place has its own JSON file named `[slug].json`
- The parent `places.json` file is **auto-generated** from these individual files
- Do not manually edit `places.json` - it will be overwritten

## Adding a New Place

See [CONTRIBUTING.md](../../../../../CONTRIBUTING.md) for detailed instructions.

Quick steps:
1. Create a new file: `[slug].json`
2. Use the template from CONTRIBUTING.md
3. Validate: `npm run validate:place apps/web/src/data/places/[slug].json`
4. Submit a pull request

## JSON Schema

### Complete Field Reference

```typescript
{
  // Required Basic Information
  "id": string,              // Unique UUID (e.g., "550e8400-e29b-41d4-a716-446655440000")
  "name": string,            // Official establishment name
  "slug": string,            // URL-friendly name (kebab-case)
  "description": string,     // Minimum 10 characters

  // Required Location
  "address": string,         // Full street address

  // Optional Contact
  "phone"?: string,          // Phone number
  "email"?: string,          // Valid email format
  "website"?: string,        // Valid URL

  // Optional Media
  "logoUrl"?: string,        // Valid URL
  "coverImageUrl"?: string,  // Valid URL
  "photosUrls": string[],    // Array of valid URLs

  // Required Business Details
  "operatingHours": {
    [day: string]: {
      "open": string,        // "HH:MM" format (24-hour)
      "close": string,       // "HH:MM" format (24-hour)
      "closed"?: boolean     // Set to true if closed this day
    }
  },
  "priceRange": "$" | "$$" | "$$$" | "$$$$",

  // Optional Business Details
  "paymentMethods": string[], // e.g., ["cash", "gcash", "credit-card"]

  // Required Categorization
  "cuisineTypes": string[],  // Minimum 1 required

  // Optional Categorization
  "tags": string[],          // Descriptive tags
  "amenities": string[],     // Available facilities
  "specialties": string[],   // Signature items

  // Optional Location Data
  "latitude"?: number,       // -90 to 90
  "longitude"?: number,      // -180 to 180

  // Required Metadata
  "createdAt": string,       // ISO 8601 timestamp
  "updatedAt": string,       // ISO 8601 timestamp

  // Optional Future Fields
  "rating"?: number,         // 0-5
  "reviewCount"?: number,    // Integer >= 0
  "verified"?: boolean
}
```

## Field Validation Rules

### UUID Format
- **Pattern**: Standard UUID v4 format
- **Valid**: `550e8400-e29b-41d4-a716-446655440000`, `a7b3c9d2-1234-5678-abcd-ef1234567890`
- **Invalid**: `123`, `my-id`, `not-a-uuid`
- **How to Generate**: See CONTRIBUTING.md for UUID generator tools

### Slug Format
- **Pattern**: `^[a-z0-9]+(?:-[a-z0-9]+)*$`
- **Valid**: `rodics-diner`, `the-toast-house`, `123-burger`
- **Invalid**: `Rodics Diner`, `the_toast`, `café-luna`

### Time Format
- **Pattern**: `HH:MM` (24-hour format)
- **Examples**: `"09:00"`, `"14:30"`, `"23:59"`

### URLs
- Must be valid HTTP/HTTPS URLs
- Empty string `""` is allowed for optional URL fields

### Email
- Must be valid email format
- Empty string `""` is allowed

### Price Range
- Must be exactly one of: `$`, `$$`, `$$$`, `$$$$`

## Operating Hours Examples

### Regular Hours
```json
{
  "monday": { "open": "10:00", "close": "22:00" },
  "tuesday": { "open": "10:00", "close": "22:00" }
}
```

### Closed Days
```json
{
  "sunday": { "closed": true }
}
```

### Extended Weekend Hours
```json
{
  "friday": { "open": "10:00", "close": "23:00" },
  "saturday": { "open": "09:00", "close": "00:00" }
}
```

## Common Values Reference

### Payment Methods
- `cash`
- `credit-card`
- `debit-card`
- `gcash`
- `paymaya`
- `bank-transfer`

### Common Cuisines
Filipino, Japanese, Korean, American, Italian, Chinese, Mexican, Thai, Vietnamese, French, Spanish, Indian, Mediterranean, etc.

See existing files for the complete list of cuisines, tags, and amenities in use.

## Validation

All place files are validated against a strict schema before being accepted.

### Run Validation

```bash
# Validate a single file
npm run validate:place apps/web/src/data/places/your-file.json

# Validate all place files
npm run validate:places
```

### Common Validation Errors

1. **Invalid UUID format**
   - Error: `ID must be a valid UUID`
   - Fix: Generate a new UUID using https://www.uuidgenerator.net/ or see CONTRIBUTING.md

2. **Invalid slug format**
   - Error: `Slug must be kebab-case`
   - Fix: Use only lowercase letters, numbers, and hyphens

3. **Missing required field**
   - Error: `[field] is required`
   - Fix: Add the required field

4. **Invalid time format**
   - Error: `Time must be in HH:MM format`
   - Fix: Use 24-hour format like `"14:30"`

5. **Invalid URL**
   - Error: `Invalid URL format`
   - Fix: Use complete URL with protocol: `https://example.com`

6. **Invalid price range**
   - Error: `Price range must be $, $$, $$$, or $$$$`
   - Fix: Use exactly one of the four valid values

## Automated Processes

### When You Submit a PR

1. **Validation**: GitHub Actions validates your JSON file
2. **Index Generation**: `places.json` is auto-generated from all individual files
3. **Stats Generation**: `stats.json` is auto-updated with new counts
4. **Deployment**: Vercel is triggered to deploy the updated data

### What Gets Auto-Generated

- ✅ `places.json` - Searchable index with essential fields only
- ✅ `stats.json` - Statistics and aggregated data
- ❌ Individual place files - **You create these manually**

## File Naming Convention

File names must match the `slug` field inside the JSON:

```json
// File: rodics-diner.json
{
  "slug": "rodics-diner",  // ✅ Matches filename
  ...
}
```

```json
// File: rodics.json
{
  "slug": "rodics-diner",  // ❌ Does not match filename
  ...
}
```

## Tips

1. **Copy an existing file** as a template instead of starting from scratch
2. **Use real data** - verify information from official sources
3. **Update timestamps** - set `updatedAt` to current time when editing
4. **Test locally** - run validation before submitting PR
5. **One place per PR** - easier to review and faster to merge

## Questions?

- See [CONTRIBUTING.md](../../../../../CONTRIBUTING.md) for more details
- Check existing place files for examples
- Open an issue if you need help
