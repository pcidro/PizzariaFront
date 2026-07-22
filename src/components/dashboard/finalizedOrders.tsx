"use client";
import { OrdersType } from "@/types/orderstype";
import { Button } from "../ui/button";
import { Card, CardTitle, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatPrice } from "@/lib/formatPrice";
import { apiClient } from "@/lib/api";

import { RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";

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
      <section className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Pedidos Finalizados
          </h2>
          <p className="text-sm sm:text-base mt-1 text-zinc-400">
            Acompanhe os pedidos já finalizados
          </p>
        </div>
        <div className="flex gap-4 bg-app-bg p-4 rounded-lg">
          <div className="flex flex-col items-center">
            <p className="text-zinc-400 mb-2">Hoje</p>
            <Input
              type="radio"
              name="period"
              value="today"
              checked={period === "today"}
              onChange={() => setPeriod("today")}
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-zinc-400 mb-2">Semana</p>
            <Input
              type="radio"
              name="period"
              value="7days"
              checked={period === "7days"}
              onChange={(e) => setPeriod("7days")}
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-zinc-400 mb-2">Mês</p>
            <Input
              type="radio"
              name="period"
              value="30days"
              checked={period === "30days"}
              onChange={(e) => setPeriod("30days")}
            />
          </div>
          <Button
            className="text-white bg-app-main transition-shadow hover:shadow-lg hover:bg-app-main/80 cursor-pointer"
            onClick={() => fetchOrders(period)}
          >
            <RefreshCcw className="w-5 h-5 text-zinc-400" />
            <p className="text-zinc-400">Atualizar</p>
          </Button>
        </div>
      </section>

      {loading ? (
        <p className="text-center text-zinc-400">Carregando...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-zinc-400">Nenhum pedido finalizado</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="bg-app-card border-app-border text-white"
            >
              <div>
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg lg:text-xl font-bold">
                      Mesa: {order.table}
                    </CardTitle>
                    <Badge className="text-xs" variant="secondary">
                      Finalizado
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div>
                    {order.items && order.items.length > 0 && (
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item) => (
                          <li
                            className="text-xs sm:text-sm text-gray-300 truncate"
                            key={item.id}
                          >
                            - {item.amount} x {item.product.name}
                          </li>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-app-border">
                    <div>
                      <p className="text-sm md:text-base text-zinc-400">
                        Total
                      </p>
                      <p className="text-sm md:text-base font-bold text-brand-primary">
                        {formatPrice(orderTotal(order))}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
