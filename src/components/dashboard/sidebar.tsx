"use client";
import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  Package,
  Tags,
  LogOut,
  CheckCheckIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { logoutAction } from "@/actions/logout";

interface SidebarProps {
  name: string;
}
export default function Sidebar({ name }: SidebarProps) {
  const menuItems = [
    {
      title: "Pedidos",
      href: "/dashboard",
      icon: ShoppingCart,
    },
    {
      title: "Produtos",
      href: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Categorias",
      href: "/dashboard/categories",
      icon: Tags,
    },
    {
      title: "Pedidos Finalizados",
      href: "/dashboard/finalized",
      icon: CheckCheckIcon,
    },
  ];
  const pathname = usePathname();
  return (
    <aside className="h-screen w-64 border-r border-app-border bg-app-sidebar hidden md:flex flex-col">
      <header className="border-b border-app-border p-6">
        <h2 className="text-xl font-bold">
          <span className="text-white font-bold text-3xl text-center sm:text-4xl">
            Easy<span className="text-brand-primary">Pizza</span>
          </span>{" "}
        </h2>
        <p className="text-sm mt-2 text-zinc-500">Olá, {name}</p>
      </header>
      <nav className="flex-1 p-4 space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              className={cn(
                "flex items-center gap-3 px-3 py-2 duration-300",
                isActive ? "bg-brand-primary" : "hover:bg-gray-600",
              )}
              key={item.href}
              href={item.href}
            >
              <Icon />
              {item.title}
            </Link>
          );
        })}
      </nav>
      <footer className="border-t border-app-border p-4">
        <form action={logoutAction} className="flex items-center">
          <Button
            className="w-full justify-start text-white hover:text-red-500 duration-300 hover:bg-transparent cursor-pointer"
            type="submit"
            variant="ghost"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </Button>
        </form>
      </footer>
    </aside>
  );
}
