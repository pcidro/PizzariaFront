"use server";
import { apiClient } from "@/lib/api";
import type { LoginState } from "@/components/forms/loginform";
import { AuthResponse } from "@/types/authResponse";
import { setToken } from "@/lib/cookies";

export async function loginAction(prevState: LoginState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  console.log(email, password);

  try {
    if (!email || !password) {
      throw new Error("Preencha os dados");
    }

    const response = await apiClient<AuthResponse>("/session", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    console.log(response);

    await setToken(response.token);

    return {
      success: true,
      error: "",
      redirectTo: "/dashboard",
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Preencha os dados") {
        return {
          success: false,
          error: error.message,
          redirectTo: null,
        };
      }

      return {
        success: false,
        error: "Login ou senha incorretos",
        redirectTo: null,
      };
    }

    return {
      success: false,
      error: "Ocorreu um erro inesperado.",
      redirectTo: null,
    };
  }
}
