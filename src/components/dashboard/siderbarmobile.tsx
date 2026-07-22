"use client";
import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  Package,
  Tags,
  LogOut,
  Menu,
  CheckCheckIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { logoutAction } from "@/actions/logout";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";

export default function SidebarMobile() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
  return (
    <div className="md:hidden">
      <header className="sticky top-0 z-50 border-b border-app-border bg-app-card">
        <div className="flex h-16 items-center justify-between px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button size={"icon"}>
                  <Menu className="w-5 h-5" />
                </Button>
              }
            ></SheetTrigger>
            <SheetContent
              className="w-72 bg-app-sidebar border-app-border text-white"
              side="left"
            >
              <SheetHeader className="border-b border-app-border p-6">
                <SheetTitle className="text-white text-xl font-bold">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-4 space-y-4">
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
              <footer className="absolute bottom-0 border-t border-app-border p-4 w-full">
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
            </SheetContent>
          </Sheet>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold text-white">
            Easy<span className="text-brand-primary">Pizza</span>
          </h1>
        </div>
      </header>
    </div>
  );
}
