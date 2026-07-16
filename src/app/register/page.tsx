import RegisterForm from "@/components/forms/registerform";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crie sua conta | Easy Pizza",
  description: "Crie sua conta no site Easy Pizza",
};

export default function Register() {
  return (
    <div className="bg-app-background min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full ">
        <RegisterForm />
      </div>
    </div>
  );
}
