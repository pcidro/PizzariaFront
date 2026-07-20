import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { logoutAction } from "@/actions/logout";

export default async function AcessDenied() {
  return (
    <div className="bg-app-background min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="bg-app-card border border-app-border w-full max-w-md mx-auto shadow-2xl overflow-hidden relative">
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

        <CardHeader className="pt-8 pb-4 text-center flex flex-col items-center gap-3">
          <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-full text-red-500 animate-pulse">
            <ShieldAlert size={48} />
          </div>
          <CardTitle className="text-white font-bold text-2xl tracking-tight mt-2">
            Acesso Negado
          </CardTitle>
          <CardDescription className="text-zinc-400 text-sm max-w-[280px] mx-auto text-center">
            Você não tem permissão para acessar esta área do painel.
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-8 space-y-6">
          <p className="text-zinc-400 text-center text-sm leading-relaxed">
            Este painel é restrito a administradores. Se você acredita que isso
            é um erro, por favor, consulte o responsável pelo sistema.
          </p>

          <form action={logoutAction} className="pt-2">
            <button
              type="submit"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full text-white bg-brand-primary hover:bg-green-950 duration-300 font-bold py-5 flex items-center justify-center cursor-pointer text-center text-sm"
              )}
            >
              Voltar para o Login
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
