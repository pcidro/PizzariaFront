"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/cookies";
import { User } from "@/types/userType";
import { revalidatePath } from "next/cache";

export async function addOrderAction(formData: FormData) {
  const table = Number(formData.get("table"));
  const name = formData.get("name") as string;
  const productIds = formData.getAll("product_id") as string[];
  const amounts = formData.getAll("amount").map(Number);
  const token = await getToken();

  try {
    if (!token) {
      throw new Error("Token invalido");
    }

    if (Number.isNaN(table) || !name) {
      throw new Error("Preencha os dados");
    }

    const order = await apiClient<User>("/order", {
      method: "POST",
      body: JSON.stringify({
        table,
        name,
      }),
      token,
    });

    if (order && order.id) {
      for (let i = 0; i < productIds.length; i++) {
        const product_id = productIds[i];
        const amount = amounts[i];
        if (product_id) {
          await apiClient("/order/add", {
            method: "POST",
            body: JSON.stringify({
              order_id: order.id,
              product_id,
              amount: amount || 1,
            }),
            token,
          });
        }
      }
    }
    revalidatePath("/dashboard");
    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Preencha os dados") {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Ocorreu um erro inesperado.",
      redirectTo: null,
    };
  }
}
