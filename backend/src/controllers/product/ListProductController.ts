import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController {
  async handle(req: Request, res: Response) {
    const disabled = req.query.disabled as string | undefined;
    const user_id = req.user_id

    const listProduct = new ListProductService();

    const products = await listProduct.execute({
      disabled: disabled,
      user_id: user_id,
    });

    res.status(200).json(products);
  }
}

export { ListProductController };
