export interface Car {
  id: number;
  name: string;
  image: string;
  price: number;
  specifications: string;
  rating: number;
  description: string;
  zones: string[];
  options: string[];
  isFavorite?: boolean;
  category?: string;
  marques?: string;
}

export interface CarOption {
  name: string;
  icon?: string;
}
