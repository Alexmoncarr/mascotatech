import type { LucideIcon } from 'lucide-react';

export type PetCategory = 'perros' | 'gatos' | 'roedores' | 'aves';

export interface PetTypeInfo {
  id: PetCategory;
  name: string;
  icon: LucideIcon;
  description: string;
  dataAiHint: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  price?: string;
  dataAiHint: string; // For next/image placeholder
  category: PetCategory[]; // Can belong to multiple categories
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or HTML content
  imageUrl: string;
  dataAiHint: string; // For next/image placeholder
  category: PetCategory;
  relatedProducts?: string[]; // Array of product IDs
  date: string; // e.g., "2024-07-15"
}

export interface GadgetRecommendation {
  productName: string;
  reasoning: string;
}
