'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { handleGadgetRecommendation, type RecommendationFormState } from '@/actions/recommendationActions';
import { PET_TYPES_FOR_AI_SELECT } from '@/data/petInfo';
import type { GadgetRecommendation } from '@/lib/types';
import ProductCard from '@/components/pets/ProductCard';
import { PRODUCT_CATALOG } from '@/data/products';
import { Loader2, AlertCircle, Sparkles } from 'lucide-react';

const recommendationFormSchema = z.object({
  petType: z.enum(['dog', 'cat', 'rodent', 'bird'], {
    required_error: 'Por favor, selecciona el tipo de mascota.',
  }),
  petPersonality: z.string().min(20, {
    message: 'Describe la personalidad de tu mascota con al menos 20 caracteres.',
  }).max(500, {
    message: 'La descripción no puede exceder los 500 caracteres.'
  }),
});

type RecommendationFormValues = z.infer<typeof recommendationFormSchema>;

const initialState: RecommendationFormState = {
  isLoading: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Obteniendo Recomendaciones...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Obtener Recomendaciones
        </>
      )}
    </Button>
  );
}

export default function RecommendationForm() {
  const [state, formAction] = useFormState(handleGadgetRecommendation, initialState);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      petType: undefined,
      petPersonality: '',
    },
  });
  
  // This maps the AI's petType (e.g., "dog") to our PetCategory type (e.g., "perros")
  const mapAiPetTypeToCategory = (aiPetType: string | undefined) => {
    switch(aiPetType) {
        case 'dog': return 'perros';
        case 'cat': return 'gatos';
        case 'rodent': return 'roedores';
        case 'bird': return 'aves';
        default: return undefined;
    }
  }
  
  const selectedPetTypeForAI = form.watch('petType');
  const selectedPetCategoryForFiltering = mapAiPetTypeToCategory(selectedPetTypeForAI);

  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Recomendador de Gadgets con IA</CardTitle>
          <CardDescription>
            Cuéntanos sobre tu mascota y nuestra IA te sugerirá los gadgets perfectos de nuestro catálogo.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form action={(formData) => {
            // Append selectedPetCategory for filtering in server action
            if (selectedPetCategoryForFiltering) {
                 formData.append('selectedPetCategory', selectedPetCategoryForFiltering);
            }
            formAction(formData);
          }} className="space-y-0">
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="petType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Mascota</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo de tu mascota" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PET_TYPES_FOR_AI_SELECT.map(pet => (
                            <SelectItem key={pet.value} value={pet.value}>{pet.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="petPersonality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personalidad y Hábitos de tu Mascota</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: Mi perro es muy juguetón, le encanta correr y morder cosas. Pasa mucho tiempo solo en casa..."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Form>
      </Card>

      {state.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.recommendations && state.recommendations.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-primary">¡Aquí tienes tus recomendaciones!</h2>
          {state.recommendations.map((rec, index) => {
            const product = PRODUCT_CATALOG.find(p => p.name === rec.productName);
            return (
              <Card key={index} className="overflow-hidden_ shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">{rec.productName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 italic">"{rec.reasoning}"</p>
                  {product ? (
                    <ProductCard product={product} />
                  ) : (
                    <p className="text-sm text-destructive">Producto no encontrado en el catálogo local.</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      {state.recommendations && state.recommendations.length === 0 && (
         <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Sin coincidencias exactas</AlertTitle>
            <AlertDescription>
              No hemos encontrado gadgets específicos basados en tu descripción. Prueba a ser más detallado o explora nuestras categorías.
            </AlertDescription>
          </Alert>
      )}
    </div>
  );
}
