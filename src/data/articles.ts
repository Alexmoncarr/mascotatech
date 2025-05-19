import type { Article, PetCategory } from '@/lib/types';

export const ARTICLES_DATA: Record<PetCategory, Article[]> = {
  perros: [
    {
      slug: 'mejores-gadgets-perros-activos',
      title: 'Los 5 Mejores Gadgets para Perros Activos en 2024',
      excerpt: 'Mantén a tu compañero canino en forma y entretenido con estos innovadores gadgets diseñados para la aventura.',
      content: '<p>Los perros activos necesitan estimulación constante, tanto física como mental. En este artículo, exploramos cinco gadgets que transformarán tus paseos y juegos...</p><h3>1. Lanzador Automático de Pelotas</h3><p>Perfecto para esos perros que nunca se cansan de buscar la pelota. Programable y seguro...</p><h3>2. GPS Tracker Avanzado</h3><p>Para las aventuras sin correa, un buen GPS te da tranquilidad. Modelos con geovallas y seguimiento de actividad...</p>',
      imageUrl: 'https://placehold.co/800x450.png',
      dataAiHint: 'dog running park',
      category: 'perros',
      relatedProducts: ['dog-ball-launcher', 'gps-pet-tracker'],
      date: '2024-07-01',
    },
    {
      slug: 'como-elegir-comedero-inteligente-perro',
      title: 'Guía para Elegir el Comedero Inteligente Perfecto para tu Perro',
      excerpt: 'La alimentación de tu perro es crucial. Descubre cómo los comederos inteligentes pueden ayudarte a gestionar su dieta.',
      content: '<p>Los comederos inteligentes ofrecen control de porciones, programación de horarios y, en algunos casos, hasta cámaras integradas. Te ayudamos a decidir cuál es el mejor para ti y tu peludo...</p>',
      imageUrl: 'https://placehold.co/800x450.png',
      dataAiHint: 'dog eating food',
      category: 'perros',
      relatedProducts: ['pet-camera-treat-dispenser'],
      date: '2024-06-15',
    },
  ],
  gatos: [
    {
      slug: 'juguetes-tecnologicos-gatos-interior',
      title: 'Juguetes Tecnológicos para Entretener a tu Gato de Interior',
      excerpt: 'Los gatos de interior también necesitan ejercicio y estimulación. ¡La tecnología puede ser tu gran aliada!',
      content: '<p>Desde láseres automáticos hasta ratones robóticos, el mercado de juguetes tecnológicos para gatos está en auge. Analizamos las opciones más populares y seguras...</p><h3>1. Láser Interactivo</h3><p>Un clásico que nunca falla. Los modelos actuales ofrecen patrones variados y apagado automático...</p>',
      imageUrl: 'https://placehold.co/800x450.png',
      dataAiHint: 'cat playing indoors',
      category: 'gatos',
      relatedProducts: ['cat-laser-toy', 'pet-camera-treat-dispenser'],
      date: '2024-07-05',
    },
    {
      slug: 'fuentes-agua-gatos-beneficios',
      title: '¿Por Qué tu Gato Necesita una Fuente de Agua? Beneficios y Modelos',
      excerpt: 'Muchos gatos no beben suficiente agua. Una fuente puede incentivarles y mejorar su salud renal.',
      content: '<p>Las fuentes de agua proporcionan agua fresca y en movimiento, lo que atrae a los gatos. Exploramos los beneficios para su salud y los diferentes tipos de fuentes disponibles...</p>',
      imageUrl: 'https://placehold.co/800x450.png',
      dataAiHint: 'cat drinking water',
      category: 'gatos',
      date: '2024-06-20',
    },
  ],
  roedores: [
    {
      slug: 'enriquecimiento-ambiental-roedores',
      title: 'Ideas de Enriquecimiento Ambiental para Pequeños Roedores',
      excerpt: 'Hámsters, jerbos y cobayas también necesitan un entorno estimulante. Descubre cómo mejorar su calidad de vida.',
      content: '<p>Un hábitat enriquecido previene el aburrimiento y problemas de comportamiento en roedores. Te damos ideas creativas y seguras, incluyendo algunos gadgets interesantes...</p><h3>1. Ruedas de Ejercicio Seguras</h3><p>No todas las ruedas son iguales. Busca modelos sólidos y del tamaño adecuado...</p>',
      imageUrl: 'https://placehold.co/800x450.png',
      dataAiHint: 'hamster habitat',
      category: 'roedores',
      relatedProducts: ['rodent-maze-house', 'silent-rodent-wheel'],
      date: '2024-07-10',
    },
  ],
  aves: [
    {
      slug: 'juguetes-inteligencia-loros-otras-aves',
      title: 'Juguetes de Inteligencia para Loros y Otras Aves Domésticas',
      excerpt: 'Las aves son increíblemente inteligentes. Mantén su mente activa con estos juguetes y puzzles.',
      content: '<p>Los juguetes de forrajeo y los puzzles son esenciales para el bienestar de las aves en cautividad. Revisamos los tipos de juguetes que desafían su inteligencia y previenen el picaje...</p>',
      imageUrl: 'https://placehold.co/800x450.png',
      dataAiHint: 'parrot playing toy',
      category: 'aves',
      relatedProducts: ['bird-smart-feeder', 'interactive-bird-puzzle-toy'],
      date: '2024-07-08',
    },
  ],
};

export const getArticlesByCategory = (category: PetCategory): Article[] => {
  return ARTICLES_DATA[category] || [];
};

export const getArticleBySlug = (category: PetCategory, slug: string): Article | undefined => {
  return ARTICLES_DATA[category]?.find(article => article.slug === slug);
};

export const getAllArticles = (): Article[] => {
  return Object.values(ARTICLES_DATA).flat();
};
