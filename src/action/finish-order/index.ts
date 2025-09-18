"use server";

import { eq, or } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable, orderItemTable, orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const finishOrder = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const cart = await db.query.cartTable.findFirst({
        where: eq(cartTable.userId, session.user.id),
        with: {
            shippingAddress: true,
            items: {
                with: {
                    productVariant: true,
                },
            },
        },
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    if (!cart.shippingAddress) {
        throw new Error("Shipping address not found");
    }

    const totalPriceInCents = cart.items.reduce((acc, item) => acc + item.productVariant.priceInCents * item.quantity, 0);

    await db.transaction(async (tx) => {

        const [order] = await tx.insert(orderTable).values({
            ...cart.shippingAddress!,
            userId: session.user.id,
            shippingAddressId: cart.shippingAddress!.id,
            totalPriceInCents: totalPriceInCents,
        }).returning();

        if (!order) {
            throw new Error("Order not found");
        }

        const orderItemsPayload: Array<typeof orderItemTable.$inferInsert> =
            cart.items.map((item) => ({
                orderId: order.id,
                productVariantId: item.productVariantId,
                quantity: item.quantity,
                priceInCents: item.productVariant.priceInCents,
            }));

        await tx.insert(orderItemTable).values(orderItemsPayload);

        await tx.delete(cartTable).where(eq(cartTable.id, cart.id));

    });
}