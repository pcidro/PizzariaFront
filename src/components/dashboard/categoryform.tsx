"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { CategoriesAction } from "@/actions/categories";
import { useRouter } from "next/navigation";

export default function CategoryForm() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  async function handlecreateCategory(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await CategoriesAction(formData);
    if (result.success) {
      setOpen(false);
      router.refresh();
      return;
    } else {
      console.log("erro ao cadastrar categoria");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="flex items-center gap-2 mt-4 sm:mt-0 cursor-pointer text-white hover:bg-green-950 duration-300">
            <Plus color="green" />
            Nova categoria
          </Button>
        }
      ></DialogTrigger>
      <DialogContent className="p-6 bg-app-card text-white">
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Adicione uma nova categoria para a Pizzaria
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handlecreateCategory}
          className="flex flex-col gap-4 py-6"
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Nome da Categoria</Label>
            <Input
              id="name"
              type="text"
              placeholder="Nome da categoria"
              name="name"
              className="border-app-border bg-app-background text-white"
            />
          </div>
          <footer className="sm:justify-start bg-app-card">
            <Button
              className="text-white cursor-pointer hover:bg-green-950 duration-300 bg-brand-primary w-full"
              type="submit"
            >
              Criar
            </Button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
}
