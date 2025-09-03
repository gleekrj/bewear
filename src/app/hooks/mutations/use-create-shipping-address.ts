import { useMutation } from "@tanstack/react-query";

import { createShippingAddress } from "@/action/create-shipping-address";
import { CreateShippingAddressSchema } from "@/action/create-shipping-address/schema";

export const getCreateShippingAddressMutationKey = () =>
    ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
    return useMutation({
        mutationKey: getCreateShippingAddressMutationKey(),
        mutationFn: (data: CreateShippingAddressSchema) => createShippingAddress(data),
    });
};
