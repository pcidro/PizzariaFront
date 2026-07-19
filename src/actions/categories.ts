"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/cookies";
import { User } from "@/types/userType";
import { revalidatePath } from "next/cache";

export async function CategoriesAction(formData: FormData) {
  const name = formData.get("name") as string;
  const token = await getToken();

  try {
    if (!token) {
      throw new Error("Token invalido");
    }

    if (!name) {
      throw new Error("Preencha os dados");
    }

    await apiClient<User>("/category", {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
      token,
    });

    revalidatePath("/dashboard/categories");

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
