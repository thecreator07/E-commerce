import { Router } from "express";
import { AddProduct, DeleteProduct, GetAllProduct, GetPruductDetail, UpdateProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAdmin, verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/').get(GetAllProduct)
.post(verifyJwt, verifyAdmin, upload.single("image"), AddProduct)

router.route('/:productId').get(GetPruductDetail)
    .delete(verifyJwt, verifyAdmin, DeleteProduct)
    .patch(verifyJwt, verifyAdmin, upload.single("image"), UpdateProduct)


export default router