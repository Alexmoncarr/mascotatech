import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden_ shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Link href={`/${article.category}/articles/${article.slug}`} className="block">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={600}
            height={338} // Aspect ratio 16:9
            className="object-cover w-full h-48"
            data-ai-hint={article.dataAiHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-6 space-y-3">
        <CardTitle className="text-xl_ leading-tight">
          <Link href={`/${article.category}/articles/${article.slug}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          <span>{new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <CardDescription className="text-foreground/80_ line-clamp-3">{article.excerpt}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full_ text-primary border-primary hover:bg-primary/10">
          <Link href={`/${article.category}/articles/${article.slug}`}>
            Leer Artículo <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
