export interface Category {
  _id: string;
  name: string;
  userId: string;
}

export interface Dish {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  isBestSeller: boolean;
  image: string | Blob;
  userId?: string | null;
}
