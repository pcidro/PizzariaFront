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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Image from "next/image";
import { Plus, Upload, Trash } from "lucide-react";
import { CategoryProps } from "@/types/CategoryType";

interface ProductDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview?: string | null;
  setImagePreview: (imagePreview: string | null) => void;
  error: string | null;
  loading: boolean;
  handleRemoveImage: () => void;
  priceValue: string;
  setPriceValue: (priceValue: string) => void;
  handleCreateProduct: (e: React.FormEvent<HTMLFormElement>) => void;
  categories: CategoryProps[];
}

export default function ProductDialog({
  open,
  handleRemoveImage,
  handleFileChange,
  setOpen,
  error,
  loading,
  imagePreview,
  priceValue,
  setPriceValue,
  handleCreateProduct,
  categories,
}: ProductDialogProps) {
  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = formatToBrl(e.target.value);
    setPriceValue(value);
  }

  function formatToBrl(value: string) {
    let v = value.replace(/\D/g, "");
    const amount = parseInt(v) / 100;
    return amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function RemoveImage() {
    handleRemoveImage();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="flex items-center gap-2 mt-4 sm:mt-0 cursor-pointer text-white hover:bg-green-950 duration-300">
            <Plus color="green" />
            Novo produto
          </Button>
        }
      />
      <DialogContent className="p-6 bg-app-card text-white max-w-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Cadastre um novo produto com imagem, preço e descrição.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleCreateProduct}
          className="flex flex-col gap-4 py-4"
        >
          {error && (
            <div className="bg-red-950 border border-red-800 text-red-200 px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Upload de Imagem */}
          <div className="flex flex-col gap-2 items-center justify-center border-2 border-dashed border-app-border rounded-lg p-4 bg-app-background hover:bg-zinc-900 transition duration-300 relative cursor-pointer group">
            <input
              type="file"
              name="file"
              id="file"
              accept="image/png, image/jpeg, image/jpg"
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              onChange={handleFileChange}
            />
            {imagePreview ? (
              <div className="flex items-center gap-2 w-full">
                <div className="relative w-full h-56 rounded-md overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  onClick={RemoveImage}
                  className=" absolute top-3 right-3 z-20 bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                >
                  <Trash size={24} />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 text-zinc-400 group-hover:text-white transition">
                <Upload size={32} className="mb-2" />
                <span className="text-sm font-semibold">
                  Selecione uma imagem
                </span>
                <span className="text-xs text-zinc-500 mt-1">
                  PNG, JPG, JPEG (máx. 4MB)
                </span>
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              type="text"
              placeholder="Nome do produto"
              name="name"
              required
              className="border-app-border bg-app-background text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="text"
                placeholder="Ex: 35.00"
                name="price"
                value={priceValue}
                onChange={handlePriceChange}
                required
                className="border-app-border bg-app-background text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category_id">Categoria</Label>
              <select
                id="category_id"
                name="category_id"
                required
                defaultValue=""
                className="flex h-10 w-full rounded-md border border-app-border bg-app-background px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled className="bg-app-card text-zinc-500">
                  Selecione a categoria
                </option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    className="bg-app-card text-white"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o produto..."
              name="description"
              required
              className="border-app-border bg-app-background text-white min-h-[80px]"
            />
          </div>

          <footer className="mt-2 bg-app-card">
            <Button
              className="text-white cursor-pointer hover:bg-green-950 duration-300 bg-brand-primary w-full disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Criar Produto"}
            </Button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
}
