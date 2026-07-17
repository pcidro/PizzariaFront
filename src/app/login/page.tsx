import LoginForm from "@/components/forms/loginform";
import { getUser } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Faça login | Easy Pizza",
  description: "Faça login no site Easy Pizza",
};

export default async function Login() {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="bg-app-background min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full ">
        <LoginForm />
      </div>
    </div>
  );
}
