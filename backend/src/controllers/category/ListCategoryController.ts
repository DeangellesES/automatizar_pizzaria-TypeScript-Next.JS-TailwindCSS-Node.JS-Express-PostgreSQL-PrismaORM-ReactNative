import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id
        const listCategory = new ListCategoryService()

        const categories = await listCategory.execute(user_id)

        res.status(200).json(categories)
    }
}

export { ListCategoryController }