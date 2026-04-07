import prismaClient from "../../prisma/index";

interface CreateCategoryProps{
    name: string
    user_id: string
}

class CreateCategoryService {
    async execute({name, user_id}: CreateCategoryProps) {
        try {
            const category = await prismaClient.category.create({
                data: {
                    name: name,
                    user_id: user_id
                },
                select: {
                    id: true,
                    name: true,
                    createdAt: true
                }
            })

            return category
        }catch {
            throw new Error("Falha ao criar categoria")
        }
    }
}

export {CreateCategoryService}