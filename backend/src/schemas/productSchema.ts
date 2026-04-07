import { z } from "zod"

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, { message: "O nome do product é obrigatório" }),
        price: z.string().min(1, { message: "O valor do product é obrigatório" }),
        description: z
            .string()
            .min(1, { message: "A descrição do product é obrigatório" }),
        category_id: z
            .string({ message: "A categoria do product é obrigatório" }),
    })
})

export const listProductSchema = z.object({
    query: z.object({
        disabled: z.string().optional(),
    }),
});

export const listProductByCategorySchema = z.object({
    query: z.object({
        category_id: z
            .string({ message: "O ID da categoria é obrigatório" })
    })
})