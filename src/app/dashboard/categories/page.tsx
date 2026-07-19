import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/cookies";

import { CategoryProps } from "@/types/CategoryType";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tags } from "lucide-react";
import CategoryForm from "@/components/dashboard/categoryform";

export default async function CategoriesPage() {
  const token = await getToken();
  const categories: CategoryProps[] = await apiClient("/category", {
    token,
  });
  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Categorias
          </h2>
          <p className="text-sm sm:text-base mt-1 text-zinc-400">
            Adicione, edite ou exclua categorias de produtos
          </p>
        </div>
        <CategoryForm />
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.length !== 0 &&
          categories.map((categorie) => (
            <Card
              className="bg-app-card border-app-border transition-shadow hover:shadow-md text-white"
              key={categorie.id}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Tags color="green" />
                  <span>{categorie.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-zinc-400">{categorie.id}</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
