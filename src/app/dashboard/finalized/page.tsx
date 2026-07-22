import { getToken } from "@/lib/cookies";
import { requireAuth } from "@/lib/auth";
import FinalizedOrders from "@/components/dashboard/finalizedOrders";

export default async function Page() {
  await requireAuth();
  const token = await getToken();

  return <FinalizedOrders token={token!} />;
}
