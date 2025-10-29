"use server";

import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/db";
import { auth } from "@/lib/auth";

import { CreateCheckoutSessionSchema, createCheckoutSessionSchema } from "./schema";

export const createCheckoutSession = async (data: CreateCheckoutSessionSchema) => {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is not set");
    }

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        throw new Error("É necessário estar logado para realizar a compra");
    }

    const { orderId } = createCheckoutSessionSchema.parse(data);
    const order = await db.query.orderTable.findFirst({
        where: (order, { eq }) => eq(order.id, orderId),
    });

    if (!order) {
        throw new Error("Order not found");
    };

    if (order.userId !== session.user.id) {
        throw new Error("Unauthorized");
    }

    const orderItems = await db.query.orderItemTable.findMany({
        where: (orderItem, { eq }) => eq(orderItem.orderId, order.id),
        with: {
            productVariant: {
                with: {
                    product: true,
                },
            },
        },
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
        metadata: {
            orderId: order.id,
        },
        line_items: orderItems.map((orderItem) => ({
            price_data: {
                currency: "brl",
                product_data: {
                    name: `${orderItem.productVariant.product.name} - ${orderItem.productVariant.name}`,
                    description: orderItem.productVariant.product.description,
                    images: [orderItem.productVariant.imageUrl],
                },
                unit_amount: orderItem.productVariant.priceInCents,
            },
            quantity: orderItem.quantity,
        })),
    });

    return checkoutSession;
}