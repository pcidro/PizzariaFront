"use client";

import { apiClient } from "@/lib/api";
import { OrdersType } from "@/types/orderstype";
import { Button } from "@base-ui/react";
import { RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardTitle, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatPrice } from "@/lib/formatPrice";
import { EyeIcon } from "lucide-react";

interface orderProps {
  token: string;
}

export function OrdersList({ token }: orderProps) {
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchOrders() {
    setLoading(true);
    try {
      const res = await apiClient<OrdersType[]>("/orders?draft=false", {
        method: "GET",
        cache: "no-store",
        token: token,
      });
      const pendindorders = res.filter((order) => order.status === false);
      setOrders(pendindorders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

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
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Pedidos</h2>
          <p className="text-sm sm:text-base mt-1 text-zinc-400">
            Gerencie os pedidos da cozinha
          </p>
        </div>
        <Button className="text-white bg-app-main transition-shadow hover:shadow-lg hover:bg-app-main/80 cursor-pointer">
          <RefreshCcw onClick={() => fetchOrders()} className="w-5 h-5" />
        </Button>
      </section>
      {loading ? (
        <p className="text-center text-zinc-400">Carregando...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-zinc-400">Nenhum pedido encontrado</p>
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
                      Mesa:{order.table}
                    </CardTitle>
                    <Badge className="text-xs select-none" variant="secondary">
                      Produção
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
                  <div className="flex flex-col xl:flex-row items0center justify-between pt-4 border-t border-app-border">
                    <div className="self-start">
                      <p className="text-sm md:text-base text-zinc-400">
                        Total
                      </p>
                      <p className="text-sm md:text-base font-bold text-brand-primary">
                        {formatPrice(orderTotal(order))}
                      </p>
                    </div>

                    <Button className="flex items-center gap-2 cursor-pointer bg-brand-primary hover:bg-brand-primary/80 transition-colors w-full xl:w-auto rounded-lg p-2 mt-2">
                      <EyeIcon />
                      Detalhes do pedido
                    </Button>
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
