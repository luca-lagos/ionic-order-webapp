export interface Product {
  id: string;
  title: string;
  type: string;
  price: number | null;
  offer_price: number | null;
  image: string;
  date: Date;
}
