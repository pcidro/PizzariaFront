"use client";
import { apiClient } from "@/lib/api";
import { OrdersType } from "@/types/orderstype";
import { useEffect, useState } from "react";
import OrderDetailDialog from "../dialogs/orderdetail";
import { finishOrderAction } from "../../actions/finishorder";
import { useRouter } from "next/navigation";

interface OrderModalProps {
  orderId: string | null;
  onClose: () => Promise<void>;
  token: string;
}

export default function OrderModal({
  orderId,
  onClose,
  token,
}: OrderModalProps) {
  const [order, setOrder] = useState<OrdersType | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [finishLoading, setFinishLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (orderId) {
      setOpen(true);
      setError(null);
      fetchOrder();
    }
  }, [orderId]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      onClose();
      setError(null);
    }
  };

  async function fetchOrder() {
    if (!orderId) return;

    setLoading(true);
    try {
      const res = await apiClient<OrdersType>(
        `/order/detail?order_id=${orderId}`,
        { method: "GET", token: token },
      );
      setOrder(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFinishOrder() {
    if (!orderId) return;
    setFinishLoading(true);
    setError(null);
    try {
      const result = await finishOrderAction(orderId);
      if (result.success) {
        handleOpenChange(false);
        router.refresh();
      } else {
        setError(result.error || "Erro ao finalizar pedido");
      }
    } catch (error) {
      console.log(error);
      setError("Erro inesperado ao finalizar pedido");
    } finally {
      setFinishLoading(false);
    }
  }

  return (
    <div>
      <OrderDetailDialog
        open={open}
        setOpen={handleOpenChange}
        order={order}
        loading={loading}
        onFinishOrder={handleFinishOrder}
        finishLoading={finishLoading}
        error={error}
      />
    </div>
  );
}
