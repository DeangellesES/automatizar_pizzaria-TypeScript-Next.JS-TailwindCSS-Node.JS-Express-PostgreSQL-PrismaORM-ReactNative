import { Request, Response } from "express";
import { AddItemOrderService } from "../../services/order/AddItemOrderService";

class AddItemController {
    async handle(req: Request, res: Response) {
        const { order_id, product_id, amount } = req.body
        const user_id = req.user_id

        const addItem = new AddItemOrderService()

        const newItem = await addItem.execute({
            order_id: order_id,
            product_id: product_id,
            amount: amount,
            user_id: user_id
        })

        res.status(201).json(newItem)
    }

    
}

export { AddItemController }