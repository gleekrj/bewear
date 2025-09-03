import { z } from "zod";

export const createShippingAddressSchema = z.object({
    email: z.email("E-mail inválido"),
    fullName: z.string().min(1, "Nome completo é obrigatório"),
    cpf: z
        .string()
        .min(11, "CPF é obrigatório")
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    phone: z.string().min(1, "Celular é obrigatório"),
    zipCode: z
        .string()
        .min(8, "CEP é obrigatório")
        .regex(/^\d{5}-\d{3}$/, "CEP inválido"),
    address: z.string().min(1, "Endereço é obrigatório"),
    number: z.string().min(1, "Número é obrigatório"),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().min(1, "Estado é obrigatório"),
});

export type CreateShippingAddressSchema = z.infer<typeof createShippingAddressSchema>;
