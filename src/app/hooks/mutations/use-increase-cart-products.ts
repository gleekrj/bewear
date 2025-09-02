import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/action/add-cart-product";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getIncreaseCartProductMutationKey = (prodcutVariantId: string) =>
    ["increase-cart-product-quantity", prodcutVariantId] as const;

export const useIncreaseCartProduct = (productVariantId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: getIncreaseCartProductMutationKey(productVariantId),
        mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
        },
    });
}