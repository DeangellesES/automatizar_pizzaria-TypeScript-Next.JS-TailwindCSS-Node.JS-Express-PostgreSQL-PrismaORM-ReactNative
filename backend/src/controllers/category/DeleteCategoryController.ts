import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/category/DeleteCategoryService";

class DeleteCategoryController {
    async handle(req: Request, res: Response) {
        const category_id = req.query?.category_id as string
        const user_id = req.user_id

        const deleteCategory = new DeleteCategoryService()

        const result = await deleteCategory.execute({ category_id, user_id })

        res.status(200).json(result)
    }
}

export { DeleteCategoryController }
