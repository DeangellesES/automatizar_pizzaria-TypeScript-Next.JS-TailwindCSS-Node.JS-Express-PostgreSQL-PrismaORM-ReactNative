import { Request, Response } from 'express'
import { DeleteOrderService } from '../../services/order/DeleteOrderService'

class DeleteOrderController {
    async handle(req: Request, res: Response) {
        const order_id  = req.query?.order_id as string
        const user_id = req.user_id

        const deleteOrder = new DeleteOrderService()

        const order = await deleteOrder.execute({ order_id: order_id, user_id: user_id })

        res.json(order)
    }
}

export { DeleteOrderController }