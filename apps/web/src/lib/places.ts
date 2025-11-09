import Fuse, { type IFuseOptions } from 'fuse.js';
import placesData from '@/data/places.json';
import type { Place, SearchFilters, SearchResult } from '@/types/place';

/**
 * Get all places
 */
export function getAllPlaces(): Place[] {
  return placesData as Place[];
}

/**
 * Get a single place by slug
 */
export function getPlaceBySlug(slug: string): Place | undefined {
  return placesData.find((place) => place.slug === slug) as Place | undefined;
}

/**
 * Get place by ID
 */
export function getPlaceById(id: string): Place | undefined {
  return placesData.find((place) => place.id === id) as Place | undefined;
}

/**
 * Fuse.js configuration for fuzzy search
 */
const fuseOptions: IFuseOptions<Place> = {
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
  if (filters.openNow) {
    const now = new Date();
    const dayOfWeek = now
      .toLocaleString('en-US', { weekday: 'long' })
      .toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

    results = results.filter((place) => {
      const hours = place.operatingHours[dayOfWeek];
      if (!hours || hours.closed) return false;

      return currentTime >= hours.open && currentTime <= hours.close;
    });
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
 */
export function getAutocompleteSuggestions(query: string): {
  places: Place[];
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
