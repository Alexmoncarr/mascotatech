import type { Metadata } from 'next';
import RecommendationForm from '@/components/recommendations/RecommendationForm';

export const metadata: Metadata = {
  title: 'Recomendador de Gadgets IA - MascotaTech',
  description: 'Obtén recomendaciones personalizadas de gadgets para tu mascota utilizando nuestra herramienta de inteligencia artificial.',
};

export default function RecommendationsPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <RecommendationForm />
    </div>
  );
}
