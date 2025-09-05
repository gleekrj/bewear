import { z } from "zod";

export const updateCartShippingAddressSchema = z.object({
    shippingAddressId: z.uuid(),
});

export type updateCartShippingAddressSchema = z.infer<typeof updateCartShippingAddressSchema>;
