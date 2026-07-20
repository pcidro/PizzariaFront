"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/cookies";
import { revalidatePath } from "next/cache";

export async function ProductsAction(formData: FormData) {
  const token = await getToken();

  try {
    if (!token) {
      throw new Error("Token inválido");
    }

    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const category_id = formData.get("category_id") as string;
    const file = formData.get("file") as File;

    if (
      !name ||
      !price ||
      !description ||
      !category_id ||
      !file ||
      file.size === 0
    ) {
      throw new Error("Preencha todos os campos e selecione uma imagem");
    }

    // Converter preço para centavos
    const cleanPrice = price
      .replace("R$", "")
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();
    const numericPrice = parseFloat(cleanPrice);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      throw new Error("Preço inválido. Insira um valor numérico positivo");
    }
    const priceInCentavos = Math.round(numericPrice * 100).toString();

    // Atualizar o preço que será enviado para a API
    formData.set("price", priceInCentavos);

    await apiClient("/product", {
      method: "POST",
      body: formData,
      token,
    });

    revalidatePath("/dashboard/products");

    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Ocorreu um erro inesperado.",
    };
  }
}
