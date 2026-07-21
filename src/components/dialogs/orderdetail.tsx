import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { OrdersType } from "@/types/orderstype";
import { Loader2, Receipt, Check } from "lucide-react";

interface OrderDetailDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  order: OrdersType | null;
  loading: boolean;
  onFinishOrder: () => Promise<void>;
  finishLoading: boolean;
  error?: string | null;
}

export default function OrderDetailDialog({
  open,
  setOpen,
  order,
  loading,
  onFinishOrder,
  finishLoading,
  error,
}: OrderDetailDialogProps) {
  const total =
    order?.items?.reduce((acc, item) => {
      return acc + item.amount * item.product.price;
    }, 0) || 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 bg-app-card text-white max-w-lg overflow-y-auto max-h-[90vh] border border-app-border">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
            <p className="text-zinc-400 text-sm">
              Carregando detalhes do pedido...
            </p>
          </div>
        ) : !order ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <p className="text-zinc-400 text-sm">
              Nenhum detalhe do pedido encontrado.
            </p>
            <Button
              className="text-white hover:bg-green-950 duration-300 bg-brand-primary cursor-pointer w-full mt-4"
              onClick={() => setOpen(false)}
            >
              Fechar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="border-b border-app-border/40 pb-4">
              <div className="flex items-center gap-2">
                <Receipt className="w-6 h-6 text-brand-primary" />
                <DialogTitle className="text-xl font-bold">
                  Detalhes do Pedido
                </DialogTitle>
              </div>
              <DialogDescription className="text-zinc-400 mt-2 text-left">
                <span className="font-semibold text-white text-base block">
                  Mesa {order.table}
                </span>
                {order.name && (
                  <span className="text-sm block mt-1">
                    Cliente:{" "}
                    <strong className="text-zinc-200">{order.name}</strong>
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              <h3 className="font-semibold text-zinc-300 text-sm uppercase tracking-wider">
                Itens do Pedido
              </h3>
              <div className="space-y-3">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => {
                    const itemTotal = item.amount * item.product.price;
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col border-b border-app-border/40 pb-3 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1 flex-1">
                            <p className="font-semibold text-zinc-100 text-sm">
                              {item.amount}x {item.product.name}
                            </p>
                            {item.product.description && (
                              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                                {item.product.description}
                              </p>
                            )}
                          </div>
                          <span className="font-bold text-zinc-300 text-sm shrink-0">
                            {formatPrice(itemTotal)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-zinc-500 text-sm italic">
                    Nenhum item adicionado a este pedido.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-app-border/60">
              <span className="text-zinc-400 font-semibold">Valor Total</span>
              <span className="text-xl font-black text-brand-primary">
                {formatPrice(total)}
              </span>
            </div>

            {error && (
              <div className="bg-red-950 border border-red-800 text-red-200 px-4 py-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <footer className="flex flex-col gap-2 pt-2">
              {!order.status && (
                <Button
                  className="w-full text-white bg-brand-primary hover:bg-green-950 duration-300 font-bold py-5 cursor-pointer flex items-center justify-center gap-2"
                  onClick={onFinishOrder}
                  disabled={finishLoading}
                >
                  {finishLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Concluindo...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Concluir Pedido
                    </>
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                className="w-full text-zinc-400 hover:text-white hover:bg-zinc-800 duration-300 py-5 cursor-pointer"
                onClick={() => setOpen(false)}
                disabled={finishLoading}
              >
                Fechar
              </Button>
            </footer>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
