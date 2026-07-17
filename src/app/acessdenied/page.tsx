import Link from "next/link";

export default async function AcessDenied() {
  return (
    <div>
      <p>Você não tem permissão para acessar essa página</p>
      <Link href="/login">Login</Link>
    </div>
  );
}
