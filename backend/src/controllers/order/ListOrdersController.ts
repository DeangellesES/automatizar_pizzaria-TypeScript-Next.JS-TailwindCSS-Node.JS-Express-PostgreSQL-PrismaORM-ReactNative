import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrderService";

class ListOrdersController {
  async handle(req: Request, res: Response) {
    const draft = req.query?.draft as string | undefined;
    const user_id = req.user_id

    const listOrders = new ListOrdersService();

    const orders = await listOrders.execute({
      draft: draft,
      user_id: user_id,
    });

    res.json(orders);
  }
}

export { ListOrdersController };
