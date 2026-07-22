import { getToken } from "@/lib/cookies";
import { requireAuth } from "@/lib/auth";
import FinalizedOrders from "@/components/dashboard/finalizedOrders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedidos Finalizados",
  description: "Visualize o histórico de pedidos concluídos e finalizados.",
};

export default async function Page() {
  await requireAuth();
  const token = await getToken();

  return <FinalizedOrders token={token!} />;
}
