import LoginForm from "@/components/forms/loginform";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faça login | Easy Pizza",
  description: "Faça login no site Easy Pizza",
};

export default function Login() {
  return (
    <div className="bg-app-background min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full ">
        <LoginForm />
      </div>
    </div>
  );
}
