import { useMutation, useQueryClient } from "@tanstack/react-query";

import { finishOrder } from "@/action/finish-order";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getUseFinishOrderMutationKey = () => ["finish-order"];

export const useFinishOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: getUseFinishOrderMutationKey(),
        mutationFn: () => finishOrder(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
        },
    });
};
