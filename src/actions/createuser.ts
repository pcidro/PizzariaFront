"use server";
import type { RegisterState } from "@/components/forms/registerform";

import { apiClient } from "@/lib/api";

export async function registerAction(
  prevState: RegisterState,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    if (!name || !password) {
      throw new Error("Preencha os dados");
    }

    await apiClient("/users", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    return { success: true, error: "", redirectTo: "/login" };
  } catch (error: unknown) {
    console.error(error);
    return {
      success: false,
      error: "Ocorreu um erro inesperado.",
      redirectTo: null,
    };
  }
}
