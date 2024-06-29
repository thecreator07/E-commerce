import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { AddCartItem, GetUsetCart, RemoveCartItem } from "../controllers/cart.controller.js";


const router = Router()

router.route('/').get(verifyJwt, GetUsetCart)
router.route('/:productId').post(verifyJwt, AddCartItem).patch(verifyJwt, RemoveCartItem)

export default router