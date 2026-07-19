"use client";

import { useState } from "react";
import { ProductsAction } from "@/actions/products";
import { useRouter } from "next/navigation";
import { CategoryProps } from "@/types/CategoryType";
import ProductDialog from "../dialogs/productdialog";

interface ProductFormProps {
  categories: CategoryProps[];
}

export default function ProductForm({ categories }: ProductFormProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  }

  async function handleCreateProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await ProductsAction(formData);

    setLoading(false);

    if (result.success) {
      setOpen(false);
      setImagePreview(null);
      router.refresh();
      return;
    } else {
      setError(result.error || "Erro ao cadastrar produto");
    }
  }

  return (
    <ProductDialog
      open={open}
      setOpen={setOpen}
      imagePreview={imagePreview}
      error={error}
      handleFileChange={handleFileChange}
      loading={loading}
      handleCreateProduct={handleCreateProduct}
      categories={categories}
    />
  );
}
