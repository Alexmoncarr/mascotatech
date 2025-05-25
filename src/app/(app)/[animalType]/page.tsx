
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PET_CATEGORIES_INFO, getPetCategoryInfo } from '@/data/petInfo';
import { getArticlesByCategory } from '@/data/articles';
import { PRODUCT_CATALOG } from '@/data/products';
import ArticleCard from '@/components/pets/ArticleCard';
import ProductCard from '@/components/pets/ProductCard';
import type { PetCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';

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
    title: `Gadgets, Accesorios y Consejos para ${petInfo.name} - Compra Online en Gadgets para mascotas`,
    description: `Descubre los mejores artículos, productos y gadgets tecnológicos para ${petInfo.name}. ${petInfo.description} Encuentra *ofertas* y el mejor *precio* para *comprar online*.`,
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
    <div className="space-y-16">
      <section className="relative py-16 md:py-24 rounded-xl overflow-hidden bg-secondary/30 shadow-lg">
        <Image 
          src={`https://placehold.co/1200x400.png`} 
          alt={`${petInfo.name}`} 
          fill={true}
          style={{objectFit: "cover"}}
          className="absolute inset-0 z-0 opacity-20"
          data-ai-hint={petInfo.dataAiHint}
          priority
        />
        <div className="relative z-10 container mx-auto text-center">
          <petInfo.icon className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Todo sobre {petInfo.name} en Gadgets para mascotas: Accesorios, Juguetes y Más
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            {petInfo.description} Explora nuestra selección de artículos informativos, guías de cuidado y los productos tecnológicos más innovadores para tu {petInfo.name}. Aquí podrás *comprar* todo lo que necesitas, desde un *comedero* hasta una *cama* o *accesorios* específicos. ¡Las mejores *ofertas* en nuestra *tienda online*!
          </p>
        </div>
      </section>

      {articles.length > 0 && (
        <section>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center text-foreground">
            Artículos Destacados sobre {petInfo.name}: Consejos y Guías de Compra
          </h2>
           <p className="text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
            Sumérgete en nuestros artículos y guías especializadas para el cuidado y bienestar de tu {petInfo.name}. Información útil, consejos prácticos y ayuda para *adquirir* los mejores productos. Si buscas *dónde comprar pienso para perros adultos online* (si aplica a la categoría) o el *mejor precio de transportín para perros pequeños*, te damos pistas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      <section className="py-12 bg-primary/10 rounded-xl shadow-lg my-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            Tecnología Innovadora para tu {petInfo.name}: Calidad y Venta Online
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 mb-6 max-w-3xl mx-auto">
            En <strong>Gadgets para mascotas</strong>, tu *tienda online* de confianza, estamos comprometidos con encontrar y presentarte los avances tecnológicos más recientes y efectivos para el cuidado de tu {petInfo.name}. 
            Desde soluciones para su entretenimiento y ejercicio, hasta herramientas que facilitan su alimentación, seguridad y bienestar general. Si buscas *comprar online cama ortopédica para perro mayor* o un *rascador* para tu gato, aquí encontrarás información valiosa.
            Creemos que la tecnología de *calidad premium* puede ser una gran aliada para fortalecer el vínculo con tu {petInfo.name} y asegurar que viva una vida plena y feliz.
          </p>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10">
            Explora nuestra selección de artículos y productos destacados para {petInfo.name} y descubre cómo los <em>gadgets más innovadores</em> pueden transformar su día a día. 
            Ya sea que busques mejorar su actividad física, estimular su mente con *juguetes* interactivos, o simplemente encontrar nuevas formas de mimarlo con *golosinas* o *snacks* (que recomendamos en artículos), en Gadgets para mascotas encontrarás lo que necesitas para llevar el cuidado de tu {petInfo.name} al siguiente nivel. Aprovecha nuestro *envío* y *promociones*.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href={`/${animalType}#productos-recomendados`}>Descubre Gadgets y Accesorios para {petInfo.name}</Link>
          </Button>
        </div>
      </section>

      {products.length > 0 && (
        <section id="productos-recomendados">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center text-foreground">
            Productos Recomendados para {petInfo.name}: Catálogo y Ofertas
          </h2>
          <p className="text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
            Hemos seleccionado los mejores gadgets y *accesorios* tecnológicos para ayudarte a cuidar y disfrutar aún más de tu {petInfo.name}. Desde una *correa* resistente, un *collar* elegante, hasta *suplementos* o *vitaminas* recomendados en nuestros artículos. Aquí puedes iniciar tu *pedido* y encontrar productos *baratos* o *económicos* sin sacrificar la *calidad*.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {articles.length === 0 && products.length === 0 && (
        <div className="text-center py-16">
            <petInfo.icon className="w-24 h-24 mx-auto mb-6 text-primary/50" />
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contenido para {petInfo.name} en Camino</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Estamos trabajando para traerte los mejores artículos y productos para {petInfo.name}. ¡Vuelve pronto para descubrir todas las novedades y *ofertas*! Podrás *comprar* el mejor *alimento* y *accesorios*.
            </p>
        </div>
      )}
    </div>
  );
}
