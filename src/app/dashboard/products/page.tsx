import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/cookies";
import { CategoryProps } from "@/types/CategoryType";
import { ProductProps } from "@/types/ProductType";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pizza, Trash } from "lucide-react";
import ProductForm from "@/components/dashboard/productform";
import DeleteButton from "@/components/dashboard/deleteButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Gerencie os produtos e o cardápio da sua pizzaria.",
};

export default async function ProductsPage() {
  const token = await getToken();

  const [categories, products] = await Promise.all([
    apiClient<CategoryProps[]>("/category", { token }).catch(() => []),
    apiClient<ProductProps[]>("/products", { token }).catch(() => []),
  ]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Produtos
          </h2>
          <p className="text-sm sm:text-base mt-1 text-zinc-400">
            Gerencie o cardápio da sua pizzaria
          </p>
        </div>
        <ProductForm categories={categories} />
      </section>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-app-border rounded-lg bg-app-card text-zinc-400">
          <Pizza className="size-12 text-zinc-500 mb-3" />
          <p className="text-lg font-medium">Nenhum produto cadastrado</p>
          <p className="text-sm text-zinc-500">
            Clique em "Novo produto" para começar.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const formattedPrice = (product.price / 100).toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL",
              },
            );

            return (
              <Card
                className="bg-app-card border-app-border overflow-hidden transition-shadow hover:shadow-md text-white flex flex-col"
                key={product.id}
              >
                <div className="relative w-full h-48 bg-zinc-950 flex items-center justify-center border-b border-app-border">
                  <img
                    src={product.banner}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  <span className="absolute top-3 right-3 bg-brand-primary text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow">
                    {formattedPrice}
                  </span>
                </div>
                <CardHeader className="p-4 flex-1">
                  <CardTitle className="text-base sm:text-lg font-semibold line-clamp-1 flex items-center ">
                    <div className="flex items-center gap-2 justify-between w-full">
                      <span>{product.name}</span>
                      <DeleteButton productId={product.id} />
                    </div>
                  </CardTitle>
                  {product.category?.name && (
                    <span className="inline-block bg-zinc-800 text-zinc-400 text-xs px-2 py-0.5 rounded w-fit font-medium mt-1">
                      {product.category.name}
                    </span>
                  )}
                  <p className="text-sm text-zinc-400 line-clamp-2 mt-3 flex-1">
                    {product.description}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-0 border-t border-app-border/40 bg-zinc-900/20">
                  <p className="text-[10px] text-zinc-500 font-mono select-all truncate">
                    ID: {product.id}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
