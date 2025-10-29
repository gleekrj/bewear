"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable, orderItemTable, orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const finishOrder = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("É necessário estar logado para realizar a compra");
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

    let orderId: string | undefined;

    await db.transaction(async (tx) => {
        if (!cart.shippingAddress) {
            throw new Error("Shipping address not found");
        }
        const [order] = await tx.insert(orderTable).values({
            recipientName: cart.shippingAddress.recipientName,
            street: cart.shippingAddress.street,
            number: cart.shippingAddress.number,
            complement: cart.shippingAddress.complement,
            city: cart.shippingAddress.city,
            state: cart.shippingAddress.state,
            neighborhood: cart.shippingAddress.neighborhood,
            zipCode: cart.shippingAddress.zipCode,
            country: cart.shippingAddress.country,
            phone: cart.shippingAddress.phone,
            email: cart.shippingAddress.email,
            cpfOrCnpj: cart.shippingAddress.cpfOrCnpj,
            userId: session.user.id,
            shippingAddressId: cart.shippingAddress!.id,
            totalPriceInCents: totalPriceInCents,
        }).returning();

        if (!order) {
            throw new Error("Order not found");
        }

        orderId = order.id;

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
    if (!orderId) {
        throw new Error("Failed to createorder");
    }

    return { orderId };
}