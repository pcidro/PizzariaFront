export interface ItemsType {
  id: string;
  name: string;
  amount: number;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    banner: string;
  };
}
