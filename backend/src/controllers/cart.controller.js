import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Cart } from "../models/cart.models.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import mongoose from "mongoose";
import { Product } from "../models/product.models.js";


const AddCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    console.log("quantity", quantity)
    // Validate productId
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, "Invalid ObjectId");
    }

    // Convert productId to ObjectId
    const productid = new mongoose.Types.ObjectId(productId);

    // Find the product in the database
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Get the current user's cart
    let userCart = await Cart.findOne({ user: req.user._id });

    if (!userCart) {
        // If user doesn't have a cart, create a new one
        userCart = await Cart.create({
            user: req.user._id,
            cartItems: [],
            totalPrice: 0,
            totalItems: 0,
        });
    }

    // Check if the product already exists in the cart
    const existingCartItem = userCart.cartItems.find(item => item.product.equals(productid));

    if (existingCartItem) {
        // Update quantity and price if product already exists

        existingCartItem.quantity += parseInt(quantity || 0);
        existingCartItem.price += product.price * parseInt(quantity || 0);
    } else {
        // Add new item to cart if it doesn't exist
        const newCartItem = {
            product: productid,
            price: product.price,
        };

        if (quantity) {
            newCartItem.quantity = parseInt(quantity)
        }



        userCart.cartItems.push(newCartItem);
    }

    // Update totalItems and totalPrice in the cart
    userCart.totalItems = userCart.cartItems.reduce((total, item) => total + item.quantity, 0);
    userCart.totalPrice = userCart.cartItems.reduce((total, item) => total + item.price, 0);

    // Save the updated cart
    await userCart.save();

    return res.status(200).json(new ApiResponse(200, { userCart }, "Item(s) added to the cart successfully"));
});

const RemoveCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params

    if (!productId) {
        throw new ApiError(400, "invalid ObjectId")
    }
    const usercart = await Cart.findOne({ user: req.user?._id })

    if (!usercart) {
        throw new ApiError(401, "userCart Not Found")
    }

    const updatedItem = await Cart.findByIdAndUpdate(
        { _id: usercart._id },
        { $pull: { cartItems: { product: productId } } },
        { new: true, upsert: true }
    )

    if (!updatedItem) {
        throw new ApiError(400, "Something went wrong during item removal")
    }

    return res.status(200).json(new ApiResponse(200, { updatedItem }, "Successfully removed product from cart"))
})
const GetUsetCart = asyncHandler(async (req, res) => {
    // Find the user's cart and populate the product details for each cart item
    const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');

    if (!cart) {
        // Handle case where user's cart is not found
        return res.status(404).json(new ApiResponse(404, null, "User Cart Not Found"));
    }

    // Extract cartItems from the populated cart object
    const cartItems = cart.cartItems.map(item => ({
        id: item.product?._id,
        product: item.product,
        quantity: item.quantity,
        price: item.price,
        productName: item.product?.name,
        productDescription: item.product?.description,
        // Add more fields as needed
    }));

    // Return cartItems with ApiResponse indicating success
    return res.status(200).json(new ApiResponse(200, { cartItems, totalItems: cart.totalItems, totalPrice: cart.totalPrice }, "User Cart Fetched Successfully"));
});

export { AddCartItem, RemoveCartItem, GetUsetCart }