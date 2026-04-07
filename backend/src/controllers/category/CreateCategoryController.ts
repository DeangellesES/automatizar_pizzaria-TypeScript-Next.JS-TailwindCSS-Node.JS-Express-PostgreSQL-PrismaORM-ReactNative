import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const {name} = req.body
        const user_id = req.user_id

        const createCategory = new CreateCategoryService()

        const category = await createCategory.execute({name: name, user_id: user_id})

        res.status(201).json(category)
    }
}

export {CreateCategoryController}