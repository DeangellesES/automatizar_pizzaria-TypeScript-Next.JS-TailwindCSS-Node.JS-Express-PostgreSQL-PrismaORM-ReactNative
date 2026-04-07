import prismaClient from "../../prisma/index";

interface DeleteOrderPops {
    order_id: string
    user_id: string
}

class DeleteOrderService {
    async execute({ order_id, user_id }: DeleteOrderPops) {
        try {
            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id,
                    user_id: user_id
                },
            })

            if (!order) {
                throw new Error("Falha ao deletar pedido")
            }

            await prismaClient.order.deleteMany({
                where: {
                    id: order_id,
                    user_id: user_id
                }
            })

            return {message: "pedido deletado com sucesso!"}

        } catch (err) {
            console.log(err);
            throw new Error("Falha ao deletar pedido")
        }
    }
}

export { DeleteOrderService }