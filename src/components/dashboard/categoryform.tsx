"use client";

import { useState } from "react";
import { CategoriesAction } from "@/actions/categories";
import { useRouter } from "next/navigation";
import CategoryDialog from "../dialogs/categorydialog";

export default function CategoryForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handlecreateCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await CategoriesAction(formData);

    setLoading(false);

    if (result.success) {
      setOpen(false);
      router.refresh();
      return;
    } else {
      setError(result.error || "Erro ao cadastrar categoria");
    }
  }

  return (
    <CategoryDialog
      open={open}
      setOpen={(val) => {
        setOpen(val);
        if (!val) {
          setError(null);
        }
      }}
      error={error}
      loading={loading}
      handleCreateCategory={handlecreateCategory}
    />
  );
}
