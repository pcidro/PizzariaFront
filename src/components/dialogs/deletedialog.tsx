import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
interface DeleteProductI {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: string;
  error: string | null;
  loading: boolean;
  deleteProduct: (id: string) => Promise<{
    success: boolean;
    error: string;
  }>;
}

export default function DeleteProductDialog({
  open,
  setOpen,
  productId,
  error,
  deleteProduct,
  loading,
}: DeleteProductI) {
  async function handleDelete(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    await deleteProduct(productId);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 bg-app-card text-white">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja deletar o produto?</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleDelete} className="flex flex-col gap-4 py-6">
          {error && (
            <div className="bg-red-950 border border-red-800 text-red-200 px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          <footer className="sm:justify-start bg-app-card">
            <Button
              className="text-white cursor-pointer hover:bg-red-800 duration-300 bg-red-600 w-full disabled:opacity-50 mb-5 flex items-center"
              type="submit"
              disabled={loading}
            >
              <Trash size={18} />
              {loading ? "Excluindo..." : "DELETAR"}
            </Button>
            <Button
              className="text-white cursor-pointer hover:bg-green-950 duration-300 bg-brand-primary w-full disabled:opacity-50"
              disabled={loading}
              onClick={() => setOpen(false)}
            >
              {loading ? "Cancelando..." : "Cancelar"}
            </Button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
}
