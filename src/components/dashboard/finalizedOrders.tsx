"use client";
import { OrdersType } from "@/types/orderstype";
import { Button } from "../ui/button";
import { Card, CardTitle, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatPrice } from "@/lib/formatPrice";
import { apiClient } from "@/lib/api";

import { RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";

type Period = "today" | "7days" | "30days";

interface OrderProps {
  token: string;
}

export default function FinalizedOrders({ token }: OrderProps) {
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<Period>("today");

  async function fetchOrders(period: Period) {
    setLoading(true);
    try {
      const res = await apiClient<OrdersType[]>(
        `/order/finishedorders?status=true&period=${period}`,
        {
          method: "GET",
          cache: "no-store",
          token: token,
        },
      );
      const finalizedOrders = res;
      setOrders(finalizedOrders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders(period);
  }, [period]);

  function orderTotal(order: OrdersType) {
    if (!order.items) return 0;
    return order.items.reduce((total, item) => {
      const itemTotal = item.amount * item.product.price;
      return total + itemTotal;
    }, 0);
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Pedidos Finalizados
          </h2>

          <p className="mt-1 text-sm text-zinc-400 sm:text-base">
            Acompanhe os pedidos já finalizados
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex w-full rounded-xl border border-app-border bg-app-bg p-1 sm:w-auto">
            <button
              type="button"
              onClick={() => setPeriod("today")}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 sm:flex-none ${
                period === "today"
                  ? "bg-brand-primary text-black shadow-sm"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Hoje
            </button>

            <button
              type="button"
              onClick={() => setPeriod("7days")}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 sm:flex-none ${
                period === "7days"
                  ? "bg-brand-primary text-black shadow-sm"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Semana
            </button>

            <button
              type="button"
              onClick={() => setPeriod("30days")}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 sm:flex-none ${
                period === "30days"
                  ? "bg-brand-primary text-black shadow-sm"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Mês
            </button>
          </div>

          <Button
            type="button"
            disabled={loading}
            onClick={() => fetchOrders(period)}
            className="w-full gap-2 border border-app-border bg-app-card text-zinc-300 transition-all hover:bg-white/5 hover:text-white sm:w-auto"
          >
            <RefreshCcw
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />

            {loading ? "Atualizando..." : "Atualizar"}
          </Button>
        </div>
      </section>

      {loading ? (
        <p className="py-10 text-center text-zinc-400">Carregando...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-app-border bg-app-card/40 px-4 py-12 text-center">
          <p className="text-sm text-zinc-400 sm:text-base">
            Nenhum pedido finalizado
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="border-app-border bg-app-card text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg font-bold lg:text-xl">
                    Mesa {order.table}
                  </CardTitle>

                  <Badge
                    variant="secondary"
                    className="bg-brand-primary/10 text-xs text-brand-primary"
                  >
                    Finalizado
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="min-h-10">
                  {order.items && order.items.length > 0 && (
                    <ul className="space-y-1">
                      {order.items.slice(0, 2).map((item) => (
                        <li
                          className="truncate text-xs text-zinc-300 sm:text-sm"
                          key={item.id}
                        >
                          {item.amount}x {item.product.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-app-border pt-4">
                  <div>
                    <p className="text-sm text-zinc-400">Total</p>

                    <p className="text-base font-bold text-brand-primary">
                      {formatPrice(orderTotal(order))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
