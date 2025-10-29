"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { createCheckoutSession } from "@/action/create-checkout-session";
import { useFinishOrder } from "@/app/hooks/mutations/use-finish-order";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const FinishOrderButton = () => {
  const finishOrderMutation = useFinishOrder();
  const { data: session } = authClient.useSession();
  const handleFinishOrderClick = async () => {
    try {
      if (!session?.user) {
        toast.error("É necessário estar logado para realizar a compra");
        return;
      }
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Stripe publishable key is not set");
      }

      const { orderId } = await finishOrderMutation.mutateAsync();
      const checkoutSession = await createCheckoutSession({ orderId });
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
      );
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }
      await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("logado")) {
          toast.error(error.message);
        } else {
          toast.error("Erro ao finalizar compra. Tente novamente.");
        }
      }
    }
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
    </>
  );
};

export default FinishOrderButton;
