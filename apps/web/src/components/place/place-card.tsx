'use client';

import { useState, useEffect, type ReactElement } from 'react';
import Link from 'next/link';
import { MapPin, Clock, DollarSign, Wifi, ParkingCircle, Heart, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceImage } from './place-image';
import type { PlaceIndex } from '@/types/place';

interface PlaceCardProps {
  place: PlaceIndex;
}

const FAVORITES_KEY = 'whereinmaginhawa_favorites';

export function PlaceCard({ place }: PlaceCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.includes(place.id));
  }, [place.id]);

  const getFavorites = (): string[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites = getFavorites();
    let newFavorites: string[];

    if (favorites.includes(place.id)) {
      newFavorites = favorites.filter((id) => id !== place.id);
      setIsFavorite(false);
    } else {
      newFavorites = [...favorites, place.id];
      setIsFavorite(true);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const getPriceIcon = (priceRange: string) => {
    return <span className="text-green-600 font-bold">{priceRange}</span>;
  };

  const getTopAmenities = (amenities: string[]) => {
    const iconMap: Record<string, ReactElement> = {
      wifi: <Wifi className="w-4 h-4" />,
      parking: <ParkingCircle className="w-4 h-4" />,
    };

    return amenities
      .filter((a) => ['wifi', 'parking', 'pet-friendly', 'lgbt-friendly'].includes(a))
      .slice(0, 3);
  };

  return (
    <div>
      <Link href={`/places/${place.slug}`}>
        <Card className="group transition-all duration-300 overflow-visible border border-gray-200 hover:border-primary h-full p-0">
          {/* Image */}
          <div className="relative aspect-4/3 md:aspect-video bg-orange-50 overflow-hidden rounded-t-xl">
            <PlaceImage
              src={place.coverImageUrl}
              alt={place.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              fallbackContent={
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 md:w-16 md:h-16 text-primary opacity-30" />
                </div>
              }
            />

            {/* Favorite button */}
            <button
              onClick={toggleFavorite}
              className="absolute top-2 right-2 md:top-3 md:right-3 p-1.5 md:p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors border border-gray-200"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                  isFavorite
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-600 hover:text-red-500'
                }`}
              />
            </button>

            {/* Price range badge */}
            <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3">
              <Badge className="bg-white/90 backdrop-blur-sm text-green-700 font-bold border border-gray-200 hover:bg-white text-xs">
                {place.priceRange}
              </Badge>
            </div>
          </div>

          <CardHeader className="pb-2 md:pb-3 pt-3 md:pt-4 relative">
            {/* Profile Photo / Logo */}
            <div className="-mt-10 md:-mt-16 mb-1.5 md:mb-2">
              {place.logoUrl ? (
                <PlaceImage
                  src={place.logoUrl}
                  alt={`${place.name} logo`}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-3 md:border-4 border-white shadow-sm"
                  fallbackContent={
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-3 md:border-4 border-white shadow-sm flex items-center justify-center">
                      <span className="text-lg md:text-2xl font-bold text-primary">
                        {place.name.charAt(0)}
                      </span>
                    </div>
                  }
                />
              ) : (
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-3 md:border-4 border-white shadow-sm flex items-center justify-center">
                  <span className="text-lg md:text-2xl font-bold text-primary">
                    {place.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <h3 className="text-base md:text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">
                {place.name}
              </h3>

              {/* Cuisine types */}
              <div className="flex gap-1.5 md:gap-2 flex-wrap">
                {place.cuisineTypes.slice(0, 2).map((cuisine) => (
                  <Badge key={cuisine} variant="secondary" className="capitalize text-xs">
                    {cuisine}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-2 md:space-y-3 pb-3 md:pb-4">
            {/* Description */}
            <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{place.description}</p>

            {/* Location */}
            <div className="flex items-start gap-2 text-xs md:text-sm text-gray-500">
              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{place.address}</span>
            </div>

            {/* Amenities - Hidden on mobile */}
            {getTopAmenities(place.amenities).length > 0 && (
              <div className="hidden md:flex gap-2 flex-wrap">
                {getTopAmenities(place.amenities).map((amenity) => (
                  <Badge key={amenity} variant="outline" className="text-xs capitalize">
                    {amenity.replace(/-/g, ' ')}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
