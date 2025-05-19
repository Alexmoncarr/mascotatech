import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PET_CATEGORIES_INFO, getPetCategoryInfo } from '@/data/petInfo';
import { getArticlesByCategory } from '@/data/articles';
import { PRODUCT_CATALOG } from '@/data/products';
import ArticleCard from '@/components/pets/ArticleCard';
import ProductCard from '@/components/pets/ProductCard';
import type { PetCategory } from '@/lib/types';

interface AnimalPageProps {
  params: { animalType: PetCategory };
}

export async function generateStaticParams() {
  return PET_CATEGORIES_INFO.map((pet) => ({
    animalType: pet.id,
  }));
}

export async function generateMetadata({ params }: AnimalPageProps): Promise<Metadata> {
  const petInfo = getPetCategoryInfo(params.animalType);
  if (!petInfo) {
    return { title: 'Categoría no encontrada' };
  }
  return {
    title: `Gadgets para ${petInfo.name} - MascotaTech`,
    description: `Descubre los mejores artículos y productos para ${petInfo.name}. ${petInfo.description}`,
  };
}

export default function AnimalPage({ params }: AnimalPageProps) {
  const { animalType } = params;
  const petInfo = getPetCategoryInfo(animalType);

  if (!petInfo) {
    notFound();
  }

  const articles = getArticlesByCategory(animalType);
  const products = PRODUCT_CATALOG.filter(p => p.category.includes(animalType));

  return (
    <div className="space-y-12">
      <section className="relative py-16 md:py-24 rounded-xl overflow-hidden bg-secondary/30">
        <Image 
          src={`https://placehold.co/1200x400.png`} 
          alt={`${petInfo.name}`} 
          layout="fill" 
          objectFit="cover" 
          className="absolute inset-0 z-0 opacity-20"
          data-ai-hint={petInfo.dataAiHint}
        />
        <div className="relative z-10 container mx-auto text-center">
          <petInfo.icon className="w-24 h-24 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {petInfo.name}
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            {petInfo.description} Explora nuestra selección de artículos y productos destacados.
          </p>
        </div>
      </section>

      {articles.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold mb-8 text-foreground">Artículos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold mb-8 text-foreground">Productos Recomendados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {articles.length === 0 && products.length === 0 && (
        <p className="text-center text-lg text-muted-foreground py-10">
          Próximamente encontrarás más contenido y productos para {petInfo.name}. ¡Vuelve pronto!
        </p>
      )}
    </div>
  );
}
