export interface ProductItem {
  id: number ;
  title: string;
  price: number;
  description: string;
  category: { id: number; name: string; image: string };
  images: string;
}
export interface CreateProduct {
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
}
