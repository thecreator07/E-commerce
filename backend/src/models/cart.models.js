import mongoose, { Schema } from "mongoose";


const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cartItems: [{
        // type: Schema.Types.ObjectId,
        // ref: "Product",
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            required: true
        }
    }
    ],
    totalPrice: {
        type: Number,
        default: 0,
    },
    totalItems: {
        type: Number,
        default: 0,
    },
});

// cartSchema.pre('findOneAndUpdate', async function (doc) {
//     const updatedDoc = await this.model.findOne(this.getQuery()).populate('cartItems');

//     const totalPrice = updatedDoc.cartItems.reduce((acc, item) => {
//         return acc + item.price;
//     }, 0);

//     const totalItems = updatedDoc.cartItems.reduce((acc, item) => {
//         return acc + item.quantity;
//     }, 0);

//     await updatedDoc.updateOne({ totalPrice, totalItems });
// });


export const Cart = mongoose.model("Cart", cartSchema)