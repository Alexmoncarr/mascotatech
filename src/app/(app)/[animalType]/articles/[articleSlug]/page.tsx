import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getArticleBySlug, getAllArticles } from '@/data/articles';
import { PRODUCT_CATALOG } from '@/data/products';
import ProductCard from '@/components/pets/ProductCard';
import type { PetCategory } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';

interface ArticlePageProps {
  params: {
    animalType: PetCategory;
    articleSlug: string;
  };
}

export async function generateStaticParams() {
  const allArticles = getAllArticles();
  return allArticles.map(article => ({
    animalType: article.category,
    articleSlug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.animalType, params.articleSlug);
  if (!article) {
    return { title: 'Artículo no encontrado' };
  }
  return {
    title: `${article.title} - Gadgets para mascotas`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { animalType, articleSlug } = params;
  const article = getArticleBySlug(animalType, articleSlug);

  if (!article) {
    notFound();
  }

  const relatedProducts = PRODUCT_CATALOG.filter(p => article.relatedProducts?.includes(p.id));

  return (
    <article className="max-w-4xl mx-auto space-y-8 py-8">
      <header className="space-y-4">
        <Badge variant="outline" className="border-primary text-primary capitalize">{article.category}</Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center space-x-4 text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-5 w-5" />
            <span>Publicado el {new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </header>

      <Image
        src={article.imageUrl}
        alt={article.title}
        width={1200}
        height={675} // Aspect ratio 16:9
        className="rounded-xl shadow-lg object-cover w-full"
        data-ai-hint={article.dataAiHint}
        priority
      />

      <div
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">Productos Mencionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
