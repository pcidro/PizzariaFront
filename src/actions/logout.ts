"use server";
import { removeToken } from "@/lib/cookies";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await removeToken();
  redirect("/login");
}
