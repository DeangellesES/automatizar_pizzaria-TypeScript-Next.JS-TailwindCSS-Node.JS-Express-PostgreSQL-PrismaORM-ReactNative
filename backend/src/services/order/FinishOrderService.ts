import prismaClient from "../../prisma/index";

interface FinishOrderPops {
    order_id: string
    user_id: string
}

class FinishOrderService {
    async execute({ order_id, user_id }: FinishOrderPops) {
        try {
            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id,
                    user_id: user_id
                },
            })

            if (!order) {
                throw new Error("Falha ao finalizar pedido")
            }

            const updateOrder = await prismaClient.order.updateMany({
                where: {
                    id: order_id,
                    user_id: user_id
                },
                data: {
                    status: true,
                },
            })

            if (updateOrder.count === 0) {
                throw new Error("Falha ao finalizar pedido")
            }

            const orderUpdated = await prismaClient.order.findFirst({
                where: {
                    id: order_id,
                    user_id: user_id
                },
                select: {
                    id: true,
                    table: true,
                    name: true,
                    draft: true,
                    status: true,
                    createdAt: true
                }
            })

            return orderUpdated

        } catch (err) {
            console.log(err);
            throw new Error("Falha ao enviar pedido")
        }
    }
}

export { FinishOrderService }