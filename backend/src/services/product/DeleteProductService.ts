import prismaClient from "../../prisma/index";

interface DeleteProductServiceProps {
    product_id: string
    user_id: string
}

class DeleteProductService {
    async execute({ product_id, user_id }: DeleteProductServiceProps) {
        try {
            const updated = await prismaClient.product.updateMany({
                where: {
                    id: product_id,
                    user_id: user_id
                },
                data: {
                    disabled: true
                }
            })

            if (updated.count === 0) {
                throw new Error("Produto não encontrado")
            }

            return { message: "Produto deletado/arquivo com sucesso!"}
        }catch(err) {
            console.log(err);
            throw new Error("Falha ao deletar o produto")
        }
    }
}

export { DeleteProductService }