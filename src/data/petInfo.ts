import type { PetTypeInfo, PetCategory } from '@/lib/types';
import { Dog, Cat, Rat, Bird, Home } from 'lucide-react';

export const PET_CATEGORIES_INFO: PetTypeInfo[] = [
  { id: 'perros', name: 'Perros', icon: Dog, description: 'Todo para tu mejor amigo canino.', dataAiHint: 'happy dog' },
  { id: 'gatos', name: 'Gatos', icon: Cat, description: 'Los gadgets más ingeniosos para felinos.', dataAiHint: 'curious cat' },
  { id: 'roedores', name: 'Roedores', icon: Rat, description: 'Innovación para los pequeños de la casa.', dataAiHint: 'cute hamster' },
  { id: 'aves', name: 'Aves', icon: Bird, description: 'Tecnología que vuela alto para tus aves.', dataAiHint: 'colorful bird' },
];

export const getPetCategoryInfo = (id: PetCategory): PetTypeInfo | undefined => {
  return PET_CATEGORIES_INFO.find(p => p.id === id);
};

export const NAV_ITEMS = [
  { name: 'Inicio', href: '/', icon: Home },
  ...PET_CATEGORIES_INFO.map(pet => ({ name: pet.name, href: `/${pet.id}`, icon: pet.icon })),
];

// PET_TYPES_FOR_AI_SELECT was removed as it's no longer used.
