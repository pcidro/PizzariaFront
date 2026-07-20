"use client";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { DeleProductionAction } from "@/actions/deleteproduct";
import { useRouter } from "next/navigation";

export default function DeleteButton({ productId }: { productId: string }) {
  const router = useRouter();
  async function deleteProduct() {
    const result = await DeleProductionAction(productId);
    if (result?.success) {
      router.refresh();
    }
  }
  return (
    <Button
      onClick={deleteProduct}
      className="bg-app-card hover:bg-app-card/60 text-green-800 hover:text-red-600 cursor-pointer"
    >
      <Trash size={24} />
    </Button>
  );
}
