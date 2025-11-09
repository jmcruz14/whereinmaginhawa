import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-8xl">🍽️</div>
        <h1 className="text-4xl font-bold text-gray-900">Place Not Found</h1>
        <p className="text-lg text-gray-600">
          Sorry, we couldn't find the place you're looking for. It may have been removed or the link might be incorrect.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/">
            <Button className="gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/places">
            <Button variant="outline" className="gap-2">
              <Search className="w-4 h-4" />
              Browse Places
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
