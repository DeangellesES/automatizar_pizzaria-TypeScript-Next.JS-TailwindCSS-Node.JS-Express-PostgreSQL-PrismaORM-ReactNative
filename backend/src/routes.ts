import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'
import { CreateUserController } from './controllers/user/CreateUserController'
import { validateSchema } from './middlewares/validateSchema'
import { createUserSchema, authUserSschema } from './schemas/userSchema'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { isAdmin } from './middlewares/isAdmin'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { createCategorySchema, deleteCategorySchema } from './schemas/categorySchema'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { DeleteCategoryController } from './controllers/category/DeleteCategoryController'
import { CreateProductController } from './controllers/product/CreateProductController'
import { createProductSchema, listProductByCategorySchema, listProductSchema } from './schemas/productSchema'
import { ListProductController } from './controllers/product/ListProductController'
import { DeleteProductController } from './controllers/product/DeleteProductController'
import { ListProductByCategoryController } from './controllers/product/ListProductByCategoryController'
import { createOrderSchema, addItemSchema, removeItemSchema, detailOrderSchema, sendOrderSchema, finishOrderSchema, deleteOrderSchema } from './schemas/orderSchema'
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { ListOrdersController } from './controllers/order/ListOrdersController'
import { AddItemController } from './controllers/order/AddItemControllers'
import { RemoveItemController } from './controllers/order/RemoveItemController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
import { SendOrderController } from './controllers/order/SendOrderController'
import { FinishOrderController } from './controllers/order/FinishOrderController'
import { DeleteOrderController } from './controllers/order/DeleteOrderController'

const router = Router()
const upload = multer(uploadConfig)

router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle)

router.post("/session", validateSchema(authUserSschema), new AuthUserController().handle)

router.get("/me", isAuthenticated, new DetailUserController().handle)

router.post("/category", isAuthenticated, isAdmin, validateSchema(createCategorySchema), new CreateCategoryController().handle)

router.get("/category", isAuthenticated, new ListCategoryController().handle)

router.delete("/category", isAuthenticated, isAdmin, validateSchema(deleteCategorySchema), new DeleteCategoryController().handle)

router.post("/product", isAuthenticated, isAdmin, upload.single('file'), validateSchema(createProductSchema), new CreateProductController().handle)

router.get(
  "/products",
  isAuthenticated,
  validateSchema(listProductSchema),
  new ListProductController().handle
)

router.delete("/product", isAuthenticated, isAdmin, new DeleteProductController().handle)

router.get(
  "/category/product",
  isAuthenticated,
  validateSchema(listProductByCategorySchema),
  new ListProductByCategoryController().handle
);

router.post(
  "/order",
  isAuthenticated,
  validateSchema(createOrderSchema),
  new CreateOrderController().handle
)

router.delete("/order", isAuthenticated, validateSchema(deleteOrderSchema), new DeleteOrderController().handle)

router.get("/orders", isAuthenticated, new ListOrdersController().handle)

// Buscar detalhes de uma order
router.get(
  "/order/detail",
  isAuthenticated,
  validateSchema(detailOrderSchema),
  new DetailOrderController().handle
);

router.post("/order/add", isAuthenticated, validateSchema(addItemSchema), new AddItemController().handle)

router.delete(
  "/order/remove",
  isAuthenticated,
  validateSchema(removeItemSchema),
  new RemoveItemController().handle
)

router.put("/order/send", isAuthenticated, validateSchema(sendOrderSchema), new SendOrderController().handle)

router.put("/order/finish", isAuthenticated, validateSchema(finishOrderSchema), new FinishOrderController().handle)


export { router }