import { OrdersList } from "@/components/dashboard/orders";
import { getToken } from "@/lib/cookies";
import { requireAuth } from "@/lib/auth";

export default async function Page() {
  await requireAuth();
  const token = await getToken();

  return <OrdersList token={token!} />;
}
