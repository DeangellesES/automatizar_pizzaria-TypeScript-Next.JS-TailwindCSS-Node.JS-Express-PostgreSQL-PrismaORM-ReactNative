import prismaClient from "../../prisma/index";

interface DeleteCategoryServiceProps {
    category_id: string
    user_id: string
}

class DeleteCategoryService {
    async execute({ category_id, user_id }: DeleteCategoryServiceProps) {
        try {
            const category = await prismaClient.category.findFirst({
                where: { id: category_id, user_id: user_id },
            })

            if (!category) {
                throw new Error("Categoria não encontrada")
            }

            await prismaClient.category.deleteMany({
                where: { id: category_id, user_id: user_id },
            })

            return { message: "Categoria excluída com sucesso!" }
        } catch (err) {
            if (err instanceof Error && err.message === "Categoria não encontrada") {
                throw err
            }
            console.log(err)
            throw new Error("Falha ao excluir a categoria")
        }
    }
}

export { DeleteCategoryService }
