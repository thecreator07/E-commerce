import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/Cloudinary.js";


const AddProduct = asyncHandler(async (req, res) => {
    const { name, description, price, stock, category } = req.body;

    // Check if any required fields are empty 
    if ([name, description, price, stock].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    let productImage;
    if (req.file && req.file.path) {
        // Upload image to Cloudinary 
        productImage = await uploadOnCloudinary(req.file.path);
    }

    // Create the product in the database
    const product = await Product.create({
        name,
        description,
        image: productImage?.url || "",
        price: parseInt(price),
        stock: parseInt(stock),
        seller: req.user._id,
        category
    });

    // Check if product creation was successful
    if (!product) {
        throw new ApiError(500, "Something went wrong during product creation");
    }

    // Return the created product in the response
    return res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});




const UpdateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        throw new ApiError(400, "Invalid productId");
    }

    const { stock, price, description } = req.body;

    let newImageLocalpath;
    if (req.file && req.file.path) {
        newImageLocalpath = req.file.path;
    }

    let uploadedImage;
    if (newImageLocalpath) {
        uploadedImage = await uploadOnCloudinary(newImageLocalpath);
    }

    const productToUpdate = await Product.findById(productId);
    if (!productToUpdate) {
        throw new ApiError(404, "Product not found");
    }

    // Prepare update fields based on what's provided in req.body
    const updateFields = {};
    if (stock) {
        updateFields.stock = parseInt(stock);
    }
    if (price) {
        updateFields.price = parseInt(price);
    }
    if (description) {
        updateFields.description = description;
    }
    if (uploadedImage?.url) {
        updateFields.image = uploadedImage.url || "";
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: updateFields },
        { new: true }
    );

    if (!updatedProduct) {
        throw new ApiError(500, "Failed to update product");
    }

    // Delete old image from Cloudinary if it has been updated
    if (newImageLocalpath && productToUpdate.image) {
        await deleteFromCloudinary(productToUpdate.image);
    }

    return res.status(200).json(new ApiResponse(200, { updatedProduct }, "Product updated successfully"));
});


const DeleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        throw new ApiError(400, "Invalid productId");
    }

    const productToDelete = await Product.findById(productId);
    if (!productToDelete) {
        throw new ApiError(404, "Product not found");
    }

    // Delete product image from Cloudinary
    if (productToDelete.image) {
        await deleteFromCloudinary(productToDelete.image);
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
        throw new ApiError(500, "Failed to delete product");
    }

    return res.status(200).json(new ApiResponse(200, "Product deleted successfully"));
});


const GetAllProduct = asyncHandler(async (req, res) => {
    try {
        const { query, category, price } = req.query;

        const pipeline = [];

        // Text search based on query parameter
        if (query) {
            pipeline.push({
                $search: {
                    index: "Product_Search",
                    text: {
                        query: query,
                        path: ["name", "description"], // Search only on title and description
                    },
                },
            });
        } else {
            pipeline.push({
                $match: {}
            })
        }

        // Filter by category
        if (category && category !== "") {
            pipeline.push({
                $match: {
                    category: category,
                },
            });
        }

        // Filter by price
        if (price && price !== "") {
            pipeline.push({
                $match: {
                    price: parseInt(price),
                },
            });
        }

        // Sort by price in ascending order
        pipeline.push({
            $sort: {
                price: 1,
            },
        });

        // Projecting fields to include in the result
        pipeline.push({
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                image: 1,
                price: 1,
                category: 1,
                stock: 1,
                createdAt: 1,
            },
        });

        // Perform aggregation query
        const productData = await Product.aggregate(pipeline);

        return res.status(200).json(new ApiResponse(200, { productData }, "Products fetched successfully"));

    } catch (error) {
        console.error("GetAllProduct Error:", error);
        throw new ApiError(500, "Failed to fetch products");
    }
});

const GetPruductDetail = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params
        // console.log(productId)

        if (!productId) {
            throw new ApiError(400, "invalid productId")
        }

        const product = await Product.findById(productId)

        return res.status(201).json(new ApiResponse(200, { product }, "Product retrieve Succesfully "))
    } catch (error) {
        console.log("GetPruductDetail Error", error)
        throw new ApiError(401, "Something went wrong during GetPruductDetail")
    }
})

export { AddProduct, UpdateProduct, DeleteProduct, GetAllProduct, GetPruductDetail }