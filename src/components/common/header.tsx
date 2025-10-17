"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogInIcon, LogOutIcon, MenuIcon, PackageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Cart from "./cart";

export const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-5">
        {/* Logo centralizada no desktop */}
        <div className="flex-1 md:flex md:justify-center">
          <Link href="/">
            <Image
              src="/logo2.svg"
              alt="BEWEAR"
              width={100}
              height={26}
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </Link>
        </div>

        {/* Navegação centralizada no desktop */}
        <nav className="hidden items-center gap-6 md:flex md:flex-1 md:justify-center">
          {session?.user && (
            <Link
              href="/my-orders"
              className="hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <PackageIcon className="h-4 w-4" />
              Meus Pedidos
            </Link>
          )}
        </nav>

        {/* Botões da direita */}
        <div className="flex flex-1 items-center justify-end gap-3">
          {/* Botão de entrar/logout - visível apenas no desktop */}
          <div className="hidden md:flex md:items-center md:gap-3">
            {session?.user ? (
              <>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                    <AvatarImage
                      src={session?.user?.image as string | undefined}
                      className="h-full w-full object-cover"
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs">
                      {session?.user?.name?.split(" ")?.[0]?.[0]}
                      {session?.user?.name?.split(" ")?.[1]?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                      {session?.user?.name}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => authClient.signOut()}
                >
                  <LogOutIcon className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button asChild variant="outline">
                <Link
                  href="/authentication"
                  className="flex items-center gap-2"
                >
                  <LogInIcon className="h-4 w-4" />
                  Entrar
                </Link>
              </Button>
            )}
          </div>

          {/* Carrinho - sempre visível */}
          <Cart />

          {/* Menu mobile */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="px-5">
                {session?.user ? (
                  <>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 overflow-hidden rounded-full">
                          <AvatarImage
                            src={session?.user?.image as string | undefined}
                            className="h-full w-full object-cover"
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full">
                            {session?.user?.name?.split(" ")?.[0]?.[0]}
                            {session?.user?.name?.split(" ")?.[1]?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">
                            {session?.user?.name}{" "}
                          </h3>
                          <span className="text-muted-foreground block text-xs">
                            {session?.user?.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => authClient.signOut()}
                      >
                        <LogOutIcon />
                      </Button>
                    </div>
                    <div className="mt-6 space-y-4">
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        <Link
                          href="/my-orders"
                          className="flex items-center gap-2"
                        >
                          <PackageIcon className="h-4 w-4" />
                          Meus Pedidos
                        </Link>
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="item-center flex justify-between">
                    <h2 className="font-semibold">Olá. Faça seu login!</h2>
                    <Button size="icon" asChild variant="outline">
                      <Link href="/authentication">
                        <LogInIcon />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
