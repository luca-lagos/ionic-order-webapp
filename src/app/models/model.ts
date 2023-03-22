export interface Product {
  id: string;
  title: string;
  type: string;
  price: number | null;
  offer_price: number | null;
  image: string;
  date: Date;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  phone: number | null;
  type: string;
  location: string;
  des_location: string;
  img_profile: string;
}
