import prismaClient from "../../prisma/index";

class ListCategoryService {
    async execute(user_id: string) {
        try {
            const categories = await prismaClient.category.findMany({
                where: {
                    user_id: user_id
                },
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                }, 
                orderBy: {
                    createdAt: "desc"
                }
            })

            return categories
        } catch (err) {
            throw new Error("Falha ao buscar categorias")
        }
    }
}

export {ListCategoryService}