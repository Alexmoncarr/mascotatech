'use server';

import { gadgetRecommendation, type GadgetInput, type GadgetOutput } from '@/ai/flows/gadget-recommendation';
import { PRODUCT_CATALOG } from '@/data/products';
import type { PetCategory } from '@/lib/types';

export interface RecommendationFormState {
  recommendations?: GadgetOutput['gadgetRecommendations'];
  error?: string;
  isLoading: boolean;
}

export async function handleGadgetRecommendation(
  prevState: RecommendationFormState,
  formData: FormData
): Promise<RecommendationFormState> {
  const petType = formData.get('petType') as GadgetInput['petType'] | null; // AI expects specific enum
  const petPersonality = formData.get('petPersonality') as string | null;
  const selectedPetCategory = formData.get('selectedPetCategory') as PetCategory | null; // For filtering product catalog

  if (!petType || !petPersonality || !selectedPetCategory) {
    return { error: 'Por favor, completa todos los campos.', isLoading: false };
  }
  
  // Filter product catalog based on selectedPetCategory to narrow down choices for AI
  // This makes the productCatalog string shorter and more relevant.
  const relevantProducts = PRODUCT_CATALOG.filter(p => p.category.includes(selectedPetCategory));
  
  const productCatalogString = relevantProducts
    .map(p => `${p.name}: ${p.description}`)
    .join('. ');

  if (!productCatalogString) {
     return { error: `No hay productos en nuestro catálogo para ${selectedPetCategory} en este momento.`, isLoading: false };
  }
  
  const input: GadgetInput = {
    petType,
    petPersonality,
    productCatalog: productCatalogString,
  };

  try {
    const result = await gadgetRecommendation(input);
    // Map AI result product names to actual products from our catalog for linking etc.
    // This is an enhancement, for now, just return what AI gives.
    return { recommendations: result.gadgetRecommendations, isLoading: false };
  } catch (e) {
    console.error('Error en la recomendación IA:', e);
    return { error: 'Hubo un error al generar las recomendaciones. Inténtalo de nuevo.', isLoading: false };
  }
}
