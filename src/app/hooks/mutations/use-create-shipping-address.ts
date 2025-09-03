import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createShippingAddress } from "@/action/create-shipping-address";
import { CreateShippingAddressSchema } from "@/action/create-shipping-address/schema";

import { getUseShippingAddressesQueryKey } from "../queries/use-shipping-addresses";

export const getCreateShippingAddressMutationKey = () =>
    ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: getCreateShippingAddressMutationKey(),
        mutationFn: (data: CreateShippingAddressSchema) => createShippingAddress(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getUseShippingAddressesQueryKey()
            });
        },
    });
};
