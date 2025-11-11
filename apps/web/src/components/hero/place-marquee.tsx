'use client';

import Link from 'next/link';
import { Image as ImageIcon } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';
import { PlaceImage } from '@/components/place/place-image';
import type { PlaceIndex } from '@/types/place';

interface PlaceMarqueeProps {
  places: PlaceIndex[];
  reverse?: boolean;
  pauseOnHover?: boolean;
}

function PlaceMarqueeCard({ place }: { place: PlaceIndex }) {
  return (
    <Link
      href={`/places/${place.slug}`}
      className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-lg w-[280px] shrink-0"
    >
      {/* Cover Image */}
      <div className="relative aspect-video bg-orange-50 overflow-hidden">
        <PlaceImage
          src={place.coverImageUrl}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          fallbackContent={
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-primary opacity-30" />
            </div>
          }
        />

        {/* Price badge */}
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs font-bold bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 text-green-700">
            {place.priceRange}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Logo/Initial and Name */}
        <div className="flex items-center gap-3">
          {place.logoUrl ? (
            <PlaceImage
              src={place.logoUrl}
              alt={`${place.name} logo`}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
              fallbackContent={
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-primary">
                    {place.name.charAt(0)}
                  </span>
                </div>
              }
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-lg font-bold text-primary">
                {place.name.charAt(0)}
              </span>
            </div>
          )}
          <h3 className="text-base font-bold group-hover:text-primary transition-colors line-clamp-1 flex-1">
            {place.name}
          </h3>
        </div>

        {/* Cuisine Types */}
        <div className="flex gap-1.5 flex-wrap">
          {place.cuisineTypes.slice(0, 2).map((cuisine) => (
            <span
              key={cuisine}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 capitalize"
            >
              {cuisine}
            </span>
          ))}
          {place.cuisineTypes.length > 2 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500">
              +{place.cuisineTypes.length - 2}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2">{place.description}</p>
      </div>
    </Link>
  );
}

export function PlaceMarquee({ places, reverse = false, pauseOnHover = true }: PlaceMarqueeProps) {
  return (
    <div className="relative">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50/50 to-transparent z-10 pointer-events-none" />

      <Marquee reverse={reverse} pauseOnHover={pauseOnHover} className="py-4">
        {places.map((place) => (
          <PlaceMarqueeCard key={place.id} place={place} />
        ))}
      </Marquee>
    </div>
  );
}
