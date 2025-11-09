/**
 * Predefined Tags and Amenities
 */

export const AMENITIES = [
  'wifi',
  'parking',
  'pet-friendly',
  'lgbt-friendly',
  'wheelchair-accessible',
  'outdoor-seating',
  'air-conditioned',
  'smoking-area',
  'delivery',
  'takeout',
  'dine-in',
  'reservations',
  'kids-friendly',
  'live-music',
  'late-night',
  '24-hours',
] as const;

export const CUISINE_TYPES = [
  'filipino',
  'japanese',
  'korean',
  'chinese',
  'italian',
  'american',
  'thai',
  'vietnamese',
  'mexican',
  'mediterranean',
  'indian',
  'french',
  'fusion',
  'cafe',
  'bakery',
  'dessert',
  'bar',
  'fast-food',
] as const;

export const DIETARY_OPTIONS = [
  'vegetarian',
  'vegan',
  'halal',
  'gluten-free',
  'keto-friendly',
  'organic',
] as const;

export const ATMOSPHERE_TAGS = [
  'casual',
  'fine-dining',
  'cozy',
  'romantic',
  'family-friendly',
  'quiet',
  'lively',
  'trendy',
  'artsy',
  'minimalist',
  'rustic',
  'modern',
] as const;

export const CRAVINGS_TAGS = [
  'coffee',
  'breakfast',
  'brunch',
  'lunch',
  'dinner',
  'late-night',
  'dessert',
  'drinks',
  'buffet',
  'samgyupsal',
  'ramen',
  'pizza',
  'burgers',
  'pasta',
  'sushi',
  'bbq',
  'seafood',
  'steak',
  'comfort-food',
  'street-food',
] as const;

export type Amenity = typeof AMENITIES[number];
export type CuisineType = typeof CUISINE_TYPES[number];
export type DietaryOption = typeof DIETARY_OPTIONS[number];
export type AtmosphereTag = typeof ATMOSPHERE_TAGS[number];
export type CravingTag = typeof CRAVINGS_TAGS[number];

// Display names for better UX
export const AMENITY_LABELS: Record<Amenity, string> = {
  'wifi': 'WiFi Available',
  'parking': 'Parking Available',
  'pet-friendly': 'Pet Friendly',
  'lgbt-friendly': 'LGBT Friendly',
  'wheelchair-accessible': 'Wheelchair Accessible',
  'outdoor-seating': 'Outdoor Seating',
  'air-conditioned': 'Air Conditioned',
  'smoking-area': 'Smoking Area',
  'delivery': 'Delivery Available',
  'takeout': 'Takeout Available',
  'dine-in': 'Dine-in Available',
  'reservations': 'Reservations Accepted',
  'kids-friendly': 'Kids Friendly',
  'live-music': 'Live Music',
  'late-night': 'Late Night',
  '24-hours': 'Open 24 Hours',
};

export const CUISINE_LABELS: Record<CuisineType, string> = {
  'filipino': 'Filipino',
  'japanese': 'Japanese',
  'korean': 'Korean',
  'chinese': 'Chinese',
  'italian': 'Italian',
  'american': 'American',
  'thai': 'Thai',
  'vietnamese': 'Vietnamese',
  'mexican': 'Mexican',
  'mediterranean': 'Mediterranean',
  'indian': 'Indian',
  'french': 'French',
  'fusion': 'Fusion',
  'cafe': 'Café',
  'bakery': 'Bakery',
  'dessert': 'Dessert',
  'bar': 'Bar',
  'fast-food': 'Fast Food',
};
