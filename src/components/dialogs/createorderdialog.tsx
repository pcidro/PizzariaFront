import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ProductProps } from "@/types/ProductType";
import { useState, useEffect } from "react";

interface createOrderDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  loading: boolean;
  error: string | null;
  addOrder: (e: React.FormEvent<HTMLFormElement>) => void;
  products: ProductProps[];
}

export default function CreateOrderDialog({
  open,
  setOpen,
  loading,
  addOrder,
  products = [],
  error,
}: createOrderDialogProps) {
  const [items, setItems] = useState([{ productId: "", amount: 1 }]);

  useEffect(() => {
    if (open) {
      setItems([{ productId: "", amount: 1 }]);
    }
  }, [open]);

  function handleItemChange(
    index: number,
    field: "productId" | "amount",
    value: any,
  ) {
    const updatedItems = [...items];
    if (field === "amount") {
      updatedItems[index].amount = Math.max(1, Number(value));
    } else {
      updatedItems[index].productId = value;
    }
    setItems(updatedItems);
  }

  function addNewItem() {
    setItems([...items, { productId: "", amount: 1 }]);
  }

  function removeItem(indexToRemove: number) {
    if (items.length > 1) {
      setItems(items.filter((_, index) => index !== indexToRemove));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 bg-app-card text-white max-w-xl">
        <DialogHeader>
          <DialogTitle>Novo pedido</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Adicione um novo pedido
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={addOrder} className="flex flex-col gap-4 py-6">
          {error && (
            <div className="bg-red-950 border border-red-800 text-red-200 px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="table">Número da mesa</Label>
              <Input
                id="table"
                type="text"
                placeholder="Exemplo: 1"
                name="table"
                required
                className="border-app-border bg-app-background text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do cliente</Label>
              <Input
                id="name"
                type="text"
                placeholder="Exemplo: André"
                name="name"
                required
                className="border-app-border bg-app-background text-white"
              />
            </div>

            <div className="border-t border-app-border pt-4">
              <h3 className="text-sm font-semibold mb-3 text-zinc-300">
                Produtos
              </h3>
              <div className="space-y-4 max-h-[250px] overflow-y-auto pr-1">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1 grid gap-1.5">
                      <Label htmlFor={`product-${index}`}>Produto</Label>
                      <select
                        id={`product-${index}`}
                        name="product_id"
                        value={item.productId}
                        onChange={(e) =>
                          handleItemChange(index, "productId", e.target.value)
                        }
                        required
                        className="flex h-10 w-full rounded-md border border-app-border bg-app-background px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option
                          value=""
                          disabled
                          className="bg-app-card text-zinc-500"
                        >
                          Selecione o produto
                        </option>
                        {products?.map((product) => (
                          <option
                            key={product.id}
                            value={product.id}
                            className="bg-app-card text-white"
                          >
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-24 grid gap-1.5">
                      <Label htmlFor={`amount-${index}`}>Qtd</Label>
                      <Input
                        id={`amount-${index}`}
                        name="amount"
                        type="number"
                        min={1}
                        value={item.amount}
                        onChange={(e) =>
                          handleItemChange(index, "amount", e.target.value)
                        }
                        required
                        className="border-app-border bg-app-background text-white"
                      />
                    </div>
                    {items.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="bg-red-950 border border-red-800 text-red-200 hover:bg-red-900 duration-300 h-10 px-3 cursor-pointer"
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={addNewItem}
                className="text-white cursor-pointer hover:bg-zinc-800 duration-300 bg-zinc-900 w-full mt-3"
              >
                + Adicionar outro produto
              </Button>
            </div>
          </div>
          <footer className="sm:justify-start bg-app-card pt-2">
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
