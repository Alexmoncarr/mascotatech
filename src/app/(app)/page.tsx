
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PET_CATEGORIES_INFO } from '@/data/petInfo';
import { getAllArticles } from '@/data/articles';
import ArticleCard from '@/components/pets/ArticleCard';
import ProductCard from '@/components/pets/ProductCard';
import { PRODUCT_CATALOG } from '@/data/products';
import type { Product } from '@/lib/types';

export default function HomePage() {
  const latestArticles = getAllArticles().slice(0, 4); 
  
  const featuredProductIds = ['gps-pet-tracker', 'pet-camera-treat-dispenser', 'cat-laser-toy', 'silent-rodent-wheel'];
  const featuredProducts = PRODUCT_CATALOG.filter(p => featuredProductIds.includes(p.id));

  return (
    <div className="space-y-16">
      <section className="text-center py-16 bg-gradient-to-br from-primary/20 via-background to-background rounded-xl shadow-xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
          Bienvenido a Gadgets para mascotas: Tu Guía Experta en Gadgets para Mascotas
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-3xl mx-auto mb-10">
          Tu centro de información e innovación para el cuidado y la felicidad de tus mascotas. Te ayudamos a descubrir y encontrar los mejores gadgets, accesorios y juguetes tecnológicos en tiendas online asociadas para mejorar su vida y fortalecer vuestro vínculo. Explora nuestro catálogo de recomendaciones y encuentra guías hacia ofertas y descuentos en productos de calidad premium.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#gadgets-estrella">Ver Gadgets Destacados</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#ultimos-articulos">Leer Nuestros Consejos</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10 text-foreground">Explora por Mascota: Guías de Accesorios y Más</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PET_CATEGORIES_INFO.map((pet) => (
            <Link href={`/${pet.id}`} key={pet.id} className="group">
              <Card className="h-full hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border-2 border-transparent hover:border-primary">
                <CardHeader className="items-center pt-8 pb-4">
                  <pet.icon className="w-20 h-20 mb-4 text-primary group-hover:text-accent transition-colors duration-300" />
                  <CardTitle className="text-2xl text-center">{pet.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-md">{pet.description} Encuentra aquí información sobre el pienso, alimento, cama o transportín ideal para adquirir.</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section id="gadgets-estrella" className="py-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6 text-foreground">Gadgets Estrella Recomendados por Gadgets para mascotas: ¡Opciones Imperdibles!</h2>
          <p className="text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
            Descubre nuestra selección de recomendaciones de productos innovadores diseñados para mejorar la vida de tus mascotas y facilitar su cuidado. Desde un collar moderno hasta un rascador divertido o una jaula espaciosa. Tecnología y cariño en cada gadget. Te guiamos hacia promociones y descuentos.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product as Product} />
            ))}
          </div>
        </section>
      )}

      <section className="py-16 bg-secondary/30 rounded-xl shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">Innovación Constante para el Bienestar Animal: Calidad, Precio e Información</h2>
          <p className="text-lg md:text-xl text-foreground/80 mb-6 max-w-3xl mx-auto">
            En <strong>Gadgets para mascotas</strong>, creemos que la tecnología es una gran aliada en el cuidado y la felicidad de nuestros compañeros animales. Desde <strong>comederos inteligentes</strong> que aseguran una nutrición precisa, hasta <strong>localizadores GPS</strong> que te dan tranquilidad, y <strong>juguetes interactivos</strong> que estimulan su mente y cuerpo. Si te preguntas dónde comprar arena aglomerante para gatos barata o buscas el mejor precio de transportín para perros pequeños, nuestro objetivo es guiarte hacia las mejores opciones de compra a través de nuestros partners y tiendas asociadas.
          </p>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            Explora nuestras guías expertas, artículos detallados y recomendaciones de gadgets para mascotas para descubrir cómo los últimos avances pueden ayudarte a ser un mejor dueño y a fortalecer el vínculo con tu <strong>perro, gato, roedor o ave</strong>. Nuestro objetivo es ofrecerte información de calidad y una cuidada selección de recomendaciones de <strong>accesorios tecnológicos para mascotas</strong> que realmente marcan la diferencia en su día a día. Considera adquirir un arnés antitirones para perro mediano o informarte para comprar online una cama ortopédica para perro mayor para mejorar su confort. Incluso si buscas un champú antiparasitario o suplementos y vitaminas, te orientamos.
          </p>
          <Button asChild size="lg">
            <Link href={`/${PET_CATEGORIES_INFO[0].id}`}>Explora Nuestras Guías de Gadgets y Accesorios</Link>
          </Button>
        </div>
      </section>

      <section id="ultimos-articulos" className="py-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6 text-foreground">Últimos Artículos de Nuestro Blog: Consejos y Guías de Compra</h2>
        {latestArticles.length > 0 ? (
          <>
            <p className="text-lg text-center text-foreground/80 max-w-3xl mx-auto mb-12">
              Mantente al día con nuestros consejos, guías y análisis sobre el mundo de las mascotas y la tecnología. Información útil para cuidar mejor a tu compañero y ayudarte a decidir qué comprar. Desde cómo elegir huesos y snacks hasta la importancia de un buen cepillo o peine.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {latestArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="link" className="text-lg">
                <Link href={`/${latestArticles[0].category}/articles/${latestArticles[0].slug}`}>Ver más artículos y recomendaciones de catálogo</Link>
              </Button>
            </div>
          </>
        ) : (
          <p className="text-lg text-center text-foreground/80 my-10">
            Próximamente encontrarás nuestros últimos artículos aquí. ¡Vuelve pronto para descubrir contenido fresco y útil para ti y tu mascota! Te ayudaremos a encontrar información para comprar los mejores accesorios y conocer ofertas.
          </p>
        )}
      </section>
    </div>
  );
}
