import prismaClient from "../../prisma/index";

interface SendOrderProps {
    name: string
    order_id: string
    user_id: string
}

class SendOrderService {
    async execute({ name, order_id, user_id}: SendOrderProps) {
        try {
            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id,
                    user_id: user_id
                }
            })

            if(!order) {
                throw new Error("Falha ao enviar pedido")
            }

            const updateOrder = await prismaClient.order.updateMany({
                where: {
                    id: order_id,
                    user_id: user_id
                },
                data: {
                    draft: false,
                    name: name
                },
            })

            if (updateOrder.count === 0) {
                throw new Error("Falha ao enviar pedido")
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

        }catch(err) {
            console.log();
            throw new Error("Falha ao enviar pedido para cozinhar")
        }
    }
}

export { SendOrderService }