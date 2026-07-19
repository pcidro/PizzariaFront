import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface CategoryDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  error: string | null;
  loading: boolean;
  handleCreateCategory: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function CategoryDialog({
  open,
  setOpen,
  error,
  loading,
  handleCreateCategory,
}: CategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="flex items-center gap-2 mt-4 sm:mt-0 cursor-pointer text-white hover:bg-green-950 duration-300">
            <Plus color="green" />
            Nova categoria
          </Button>
        }
      />
      <DialogContent className="p-6 bg-app-card text-white">
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Adicione uma nova categoria para a Pizzaria
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateCategory} className="flex flex-col gap-4 py-6">
          {error && (
            <div className="bg-red-950 border border-red-800 text-red-200 px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="name">Nome da Categoria</Label>
            <Input
              id="name"
              type="text"
              placeholder="Nome da categoria"
              name="name"
              required
              className="border-app-border bg-app-background text-white"
            />
          </div>
          <footer className="sm:justify-start bg-app-card">
            <Button
              className="text-white cursor-pointer hover:bg-green-950 duration-300 bg-brand-primary w-full disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar"}
            </Button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
}
