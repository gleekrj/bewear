import { useQuery } from "@tanstack/react-query";

import { getUserAddresses } from "@/action/get-user-addresses";
import { shippingAddressTable } from "@/db/schema";

export const getUseUserAddressesQueryKey = () =>
    ["user-addresses"] as const;

export const useUserAddresses = (params?: {
    initialData?: (typeof shippingAddressTable.$inferSelect)[];
}) => {
    return useQuery({
        queryKey: getUseUserAddressesQueryKey(),
        queryFn: () => getUserAddresses(),
        initialData: params?.initialData,

    });
};
