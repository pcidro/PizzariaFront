import { ItemsType } from "./itemsType";

export interface OrdersType {
  id: string;
  table: number;
  name: string;
  status: boolean;
  draft: boolean;
  createdAt: string;
  updatedAt: string;
  items?: ItemsType[];
}
