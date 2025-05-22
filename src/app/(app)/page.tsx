import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PET_CATEGORIES_INFO } from '@/data/petInfo';
import { getAllArticles } from '@/data/articles';
import ArticleCard from '@/components/pets/ArticleCard';

export default function HomePage() {
  const latestArticles = getAllArticles().slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-br from-primary/20 via-background to-background rounded-xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Bienvenido a MascotaTech
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
          Tu centro de innovación para el cuidado y la felicidad de tus mascotas. Descubre gadgets, artículos y consejos para mejorar su vida.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-8 text-foreground">Explora por Mascota</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PET_CATEGORIES_INFO.map((pet) => (
            <Link href={`/${pet.id}`} key={pet.id} className="group">
              <Card className="h-full hover:shadow-xl transition-shadow duration-300_ ease-in-out_ transform hover:-translate-y-1">
                <CardHeader className="items-center">
                  <pet.icon className="w-16 h-16 mb-3 text-primary group-hover:text-accent transition-colors" />
                  <CardTitle className="text-2xl text-center">{pet.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{pet.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="text-center py-10">
        <h2 className="text-3xl font-semibold mb-4 text-foreground">Últimos Artículos</h2>
        {latestArticles.length > 0 ? (
          <>
            <p className="text-lg text-foreground/80 mb-8">
              Mantente al día con nuestros consejos y análisis sobre el mundo de las mascotas y la tecnología.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-lg text-foreground/80 mb-8">
            Próximamente encontrarás nuestros últimos artículos aquí. ¡Vuelve pronto!
          </p>
        )}
      </section>
    </div>
  );
}
