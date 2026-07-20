import { OrdersList } from "@/components/dashboard/orders";
import { getToken } from "@/lib/cookies";

export default async function Page() {
  const token = await getToken();

  return <OrdersList token={token!} />;
}
