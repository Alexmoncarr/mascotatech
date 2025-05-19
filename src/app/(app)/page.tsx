import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PET_CATEGORIES_INFO } from '@/data/petInfo';
import { ArrowRight, Lightbulb } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-br from-primary/20 via-background to-background rounded-xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Bienvenido a MascotaTech
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
          Tu centro de innovación para el cuidado y la felicidad de tus mascotas. Descubre gadgets, artículos y consejos para mejorar su vida.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-transform hover:scale-105">
          <Link href="/recommendations">
            <Lightbulb className="mr-2 h-5 w-5" />
            Prueba Nuestro Recomendador IA
          </Link>
        </Button>
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

      <section className="py-10">
        <Card className="bg-secondary/50">
            <CardHeader>
                <CardTitle className="text-2xl md:text-3xl text-primary">¿Buscas el gadget perfecto?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-foreground/80">
                Nuestro recomendador inteligente utiliza IA para analizar las necesidades y personalidad de tu mascota, sugiriendo los productos más adecuados de nuestro catálogo. ¡Es como tener un experto en gadgets para mascotas a tu disposición!
                </p>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Link href="/recommendations">
                        Obtener Recomendaciones
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </section>

      <section className="text-center py-10">
        <h2 className="text-3xl font-semibold mb-4 text-foreground">Últimos Artículos</h2>
        <p className="text-lg text-foreground/80 mb-8">
          Mantente al día con nuestros consejos y análisis sobre el mundo de las mascotas y la tecnología.
        </p>
        {/* Placeholder for latest articles - could be fetched dynamically */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <Card key={i} className="text-left">
              <CardHeader>
                <Image src={`https://placehold.co/600x400.png`} alt="Artículo destacado" width={600} height={400} className="rounded-md mb-4" data-ai-hint="pet technology" />
                <CardTitle>Título del Artículo {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Un breve extracto del artículo sobre lo último en tecnología para mascotas...</CardDescription>
                <Button variant="link" asChild className="px-0 text-primary">
                  <Link href="#">Leer Más <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
