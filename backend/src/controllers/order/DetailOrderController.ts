import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.query;
    const user_id = req.user_id

    const detailOrder = new DetailOrderService();

    const order = await detailOrder.execute({
      order_id: order_id as string,
      user_id: user_id,
    });

    res.status(200).json(order);
  }
}

export { DetailOrderController };
