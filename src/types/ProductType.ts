import { CategoryProps } from "./CategoryType";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  description: string;
  banner: string;
  disabled: boolean;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  category?: CategoryProps;
}
