import RegisterForm from "@/components/forms/registerform";
import { getUser } from "@/lib/auth";

import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Crie sua conta | Easy Pizza",
  description: "Crie sua conta no site Easy Pizza",
};

export default async function Register() {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-app-background min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full ">
        <RegisterForm />
      </div>
    </div>
  );
}
