"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "@base-ui/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { registerAction } from "@/actions/createuser";
import { useRouter } from "next/navigation";

export type RegisterState = {
  success: boolean;
  error: string | null;
  redirectTo: string | null;
};

const initialState: RegisterState = {
  success: false,
  error: null,
  redirectTo: null,
};

export default function RegisterForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );
  useEffect(() => {
    if (state.success && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);
  return (
    <Card className="bg-app-card border border-app-border w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-white font-bold text-3xl text-center sm:text-4xl">
          Easy<span className="text-brand-primary">Pizza</span>
        </CardTitle>
        <CardDescription className="text-center">
          Faça seu cadastro para continuar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white text-sm font-medium" htmlFor="name">
              Nome
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Digite seu nome"
              required
              minLength={3}
              className="w-full px-3 py-2 text-white bg-black/20 placeholder:text-zinc-500 border border-app-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white text-sm font-medium" htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email"
              required
              className="w-full px-3 py-2 text-white bg-black/20 placeholder:text-zinc-500 border border-app-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-white text-sm font-medium"
              htmlFor="password"
            >
              Senha
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              required
              className="w-full px-3 py-2 text-white bg-black/20 placeholder:text-zinc-500 border border-app-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
            />
          </div>
          <Button
            className="bg-brand-primary w-full hover:bg-green-950 duration-300 text-white cursor-pointer"
            type="submit"
          >
            Cadastrar
          </Button>
          <p className="text-zinc-500 text-center text-sm">
            Já tem uma conta?{" "}
            <Link
              className="font-bold text-brand-primary hover:underline"
              href="/login"
            >
              Faça o login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
