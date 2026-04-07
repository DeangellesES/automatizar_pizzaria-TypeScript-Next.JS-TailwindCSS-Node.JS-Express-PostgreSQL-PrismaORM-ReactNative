import { z } from "zod"

export const createCategorySchema = z.object({
    body: z.object({
        name: z
            .string({message: "Categoria precisa ser um texto"})
            .min(2, {message: "Nome da categoria precisa ter 2 caracteres"})
    })
})

export const deleteCategorySchema = z.object({
    query: z.object({
        category_id: z.string({ message: "ID da categoria precisa ser uma string" }),
    })
})