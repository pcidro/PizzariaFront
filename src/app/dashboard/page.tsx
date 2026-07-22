import { OrdersList } from "@/components/dashboard/orders";
import { getToken } from "@/lib/cookies";
import { requireAuth } from "@/lib/auth";
import { apiClient } from "@/lib/api";
import { ProductProps } from "@/types/ProductType";

export default async function Page() {
  await requireAuth();
  const token = await getToken();

  const products = await apiClient<ProductProps[]>("/products", {
    token: token!,
  });

  return <OrdersList token={token!} products={products} />;
}
