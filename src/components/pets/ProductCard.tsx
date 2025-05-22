import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden_ shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={600}
          height={400}
          className="object-cover w-full h-56"
          data-ai-hint={product.dataAiHint}
        />
      </CardHeader>
      <CardContent className="flex-grow p-6 space-y-2">
        <CardTitle className="text-lg_ leading-tight">{product.name}</CardTitle>
        {/* Price display removed */}
        <CardDescription className="text-foreground/80_ line-clamp-3">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Comprar Ahora
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
