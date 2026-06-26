export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  image: string;
  rating: number;
  reviewsCount: number;
  size: string;
  category: 'Highlighters' | 'Primers' | 'Makeup Melts' | 'Skin Tints' | 'Lip Gloss';
  skinTypes: ('Dry' | 'Oily' | 'Sensitive' | 'Combination' | 'Normal' | 'All')[];
  ingredients: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface SkinQuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
  }[];
}
