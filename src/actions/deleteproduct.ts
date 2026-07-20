"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/cookies";
import { revalidatePath } from "next/cache";

export async function DeleProductionAction(productId: string) {
  try {
    if (!productId) {
      throw new Error("ID do produto inválido");
    }

    const token = await getToken();

    await apiClient(`/product?id=${productId}`, {
      method: "DELETE",
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
