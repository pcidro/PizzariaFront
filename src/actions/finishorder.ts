"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/cookies";

export async function finishOrderAction(orderId: string) {
  try {
    if (!orderId) {
      throw new Error("ID do pedido inválido");
    }

    const token = await getToken();

    await apiClient("/order/finish", {
      method: "PUT",
      token,
      body: JSON.stringify({ order_id: orderId }),
    });

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
