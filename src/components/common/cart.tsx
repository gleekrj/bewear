"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";

import { getCart } from "@/action/get-cart";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        <div>
          {cartIsLoading && <div>Carregando...</div>}
          {cart?.items.map((item) => (
            <>
              <Image
                key={item.id}
                src={item.productVariant.imageUrl}
                alt={item.productVariant.product.name}
                width={100}
                height={100}
              />
              <p>{item.productVariant.product.name}</p>
            </>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
