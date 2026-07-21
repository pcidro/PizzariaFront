"use client";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { DeleProductionAction } from "@/actions/deleteproduct";
import { useState } from "react";
import DeleteProductDialog from "../dialogs/deletedialog";

export default function DeleteButton({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleDelete(id: string) {
    setLoading(true);
    setError(null);
    const result = await DeleProductionAction(id);
    setLoading(false);

    if (result.success) {
      setOpen(false);
    } else {
      setError(result.error || "Erro ao deletar produto");
    }
    return result;
  }

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
          setError(null);
        }}
        className="bg-app-card hover:bg-app-card/60 text-green-800 hover:text-red-600 cursor-pointer"
      >
        <Trash size={24} />
      </Button>
      <DeleteProductDialog
        open={open}
        setOpen={setOpen}
        productId={productId}
        deleteProduct={handleDelete}
        error={error}
        loading={loading}
      />
    </>
  );
}
