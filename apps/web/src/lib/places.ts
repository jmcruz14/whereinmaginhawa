import Fuse, { type IFuseOptions } from 'fuse.js';
import placesIndex from '@/data/places.json';
import type { Place, PlaceIndex, SearchFilters, SearchResult } from '@/types/place';

/**
 * Get all places (index data only)
 * Returns lightweight PlaceIndex objects for listing and search
 */
export function getAllPlaces(): PlaceIndex[] {
  return placesIndex as PlaceIndex[];
}

/**
 * Get a single place by slug (full data)
 * Dynamically imports the individual place file
 */
export async function getPlaceBySlug(slug: string): Promise<Place | undefined> {
  try {
    // Dynamically import the individual place file
    const placeData = await import(`@/data/places/${slug}.json`);
    return placeData.default as Place;
  } catch (error) {
    // File not found or import failed
    console.error(`Failed to load place: ${slug}`, error);
    return undefined;
  }
}

/**
 * Get place by ID (searches index, returns full data)
 */
export async function getPlaceById(id: string): Promise<Place | undefined> {
  const placeIndex = placesIndex.find((place) => place.id === id) as PlaceIndex | undefined;
  if (!placeIndex) return undefined;
  return getPlaceBySlug(placeIndex.slug);
}

/**
 * Fuse.js configuration for fuzzy search
 * Uses PlaceIndex for lightweight searching
 */
const fuseOptions: IFuseOptions<PlaceIndex> = {
  keys: [
    { name: 'name', weight: 2 },
    { name: 'description', weight: 1 },
    { name: 'cuisineTypes', weight: 1.5 },
    { name: 'specialties', weight: 1.5 },
    { name: 'tags', weight: 1.2 },
    { name: 'amenities', weight: 1 },
  ],
  threshold: 0.4,
  includeScore: true,
  useExtendedSearch: true,
};

/**
 * Search places with advanced filtering
 */
export function searchPlaces(filters: SearchFilters): SearchResult {
  let results = getAllPlaces();

  // Text search using Fuse.js
  if (filters.query && filters.query.trim() !== '') {
    const fuse = new Fuse(results, fuseOptions);
    const searchResults = fuse.search(filters.query);
    results = searchResults.map((result) => result.item);
  }

  // Filter by keywords (searches across tags, amenities, cuisineTypes, and specialties)
  if (filters.keywords && filters.keywords.length > 0) {
    results = results.filter((place) =>
      filters.keywords!.some((keyword) =>
        place.tags.includes(keyword) ||
        place.amenities.includes(keyword) ||
        place.cuisineTypes.includes(keyword) ||
        place.specialties.includes(keyword)
      )
    );
  }

  // Filter by tags
  if (filters.tags && filters.tags.length > 0) {
    results = results.filter((place) =>
      filters.tags!.some((tag) => place.tags.includes(tag))
    );
  }

  // Filter by amenities
  if (filters.amenities && filters.amenities.length > 0) {
    results = results.filter((place) =>
      filters.amenities!.every((amenity) => place.amenities.includes(amenity))
    );
  }

  // Filter by cuisine types
  if (filters.cuisineTypes && filters.cuisineTypes.length > 0) {
    results = results.filter((place) =>
      filters.cuisineTypes!.some((cuisine) =>
        place.cuisineTypes.includes(cuisine)
      )
    );
  }

  // Filter by price range
  if (filters.priceRanges && filters.priceRanges.length > 0) {
    results = results.filter((place) =>
      filters.priceRanges!.includes(place.priceRange)
    );
  }

  // Filter by open now
  // Note: This feature is disabled in the lightweight index mode
  // To re-enable, operating hours would need to be added to PlaceIndex
  // or we'd need to async load each place's full data (expensive)
  if (filters.openNow) {
    console.warn('openNow filter is not supported with PlaceIndex. Add operatingHours to index or load full place data.');
    // Could be implemented by adding a minimal hours field to PlaceIndex
    // or by making this function async and loading full data
  }

  // Filter by favorites
  if (filters.favoritesOnly) {
    const FAVORITES_KEY = 'whereinmaginhawa_favorites';
    const stored = typeof window !== 'undefined' ? localStorage.getItem(FAVORITES_KEY) : null;
    const favorites: string[] = stored ? JSON.parse(stored) : [];

    results = results.filter((place) => favorites.includes(place.id));
  }

  return {
    places: results,
    total: results.length,
    filters,
  };
}

/**
 * Get all unique tags from all places
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPlaces().forEach((place) => {
    place.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get all unique amenities from all places
 */
export function getAllAmenities(): string[] {
  const amenities = new Set<string>();
  getAllPlaces().forEach((place) => {
    place.amenities.forEach((amenity) => amenities.add(amenity));
  });
  return Array.from(amenities).sort();
}

/**
 * Get all unique cuisine types from all places
 */
export function getAllCuisineTypes(): string[] {
  const cuisines = new Set<string>();
  getAllPlaces().forEach((place) => {
    place.cuisineTypes.forEach((cuisine) => cuisines.add(cuisine));
  });
  return Array.from(cuisines).sort();
}

/**
 * Get autocomplete suggestions based on query
 * Returns PlaceIndex for lightweight results
 */
export function getAutocompleteSuggestions(query: string): {
  places: PlaceIndex[];
  tags: string[];
  amenities: string[];
  cuisines: string[];
} {
  if (!query || query.trim() === '') {
    return {
      places: [],
      tags: [],
      amenities: [],
      cuisines: [],
    };
  }

  const lowerQuery = query.toLowerCase();

  // Search places
  const fuse = new Fuse(getAllPlaces(), fuseOptions);
  const placeResults = fuse.search(query).slice(0, 5);

  // Filter tags
  const matchingTags = getAllTags()
    .filter((tag) => tag.toLowerCase().includes(lowerQuery))
    .slice(0, 5);

  // Filter amenities
  const matchingAmenities = getAllAmenities()
    .filter((amenity) => amenity.toLowerCase().includes(lowerQuery))
    .slice(0, 5);

  // Filter cuisines
  const matchingCuisines = getAllCuisineTypes()
    .filter((cuisine) => cuisine.toLowerCase().includes(lowerQuery))
    .slice(0, 5);

  return {
    places: placeResults.map((r) => r.item),
    tags: matchingTags,
    amenities: matchingAmenities,
    cuisines: matchingCuisines,
  };
}
