import { getToken } from "./cookies";
import { User } from "@/types/userType";
import { apiClient } from "./api";
import { redirect } from "next/navigation";

export async function getUser() {
  try {
    const token = await getToken();

    if (!token) {
      return null;
    }

    const user = await apiClient<User>("/me", {
      token,
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function requiredAdmin() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/acessdenied");
  }

  return user;
}
