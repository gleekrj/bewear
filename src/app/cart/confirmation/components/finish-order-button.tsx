"use client";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useFinishOrder } from "@/app/hooks/mutations/use-finish-order";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

const FinishOrderButton = () => {
  const [sucessDialogIsOpen, setSucessDialogIsOpen] = useState(false);
  const finishOrderMutation = useFinishOrder();
  const handleFinishOrderClick = () => {
    finishOrderMutation.mutate();
    setSucessDialogIsOpen(true);
  };

  return (
    <>
      <Button
        className="w-full rounded-full"
        size="lg"
        onClick={handleFinishOrderClick}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        Finalizar Compra
      </Button>
      <Dialog open={sucessDialogIsOpen} onOpenChange={setSucessDialogIsOpen}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            alt="Sucesso"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-2xl">Pedido efetuado!</DialogTitle>
          <DialogDescription className="font-medium">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de “Meus Pedidos”.
          </DialogDescription>
          <DialogFooter>
            <Button className="w-full rounded-full" size="lg">
              Ver meus pedidos
            </Button>
            <Button className="w-full rounded-full" size="lg" variant="outline">
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinishOrderButton;
