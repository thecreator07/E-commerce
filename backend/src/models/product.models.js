import Mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter product name'],
        },
        description: {
            type: String,
            required: [true, 'Please enter product description'],
        },
        image: {
            type: String,
            // required: true
        },
        category: {
            type: String,
        },
        price: {
            type: Number,
            required: [true, 'Please enter product price'],
            maxLength: [8, 'maximum 8 length'],
            default: 200
        },
        stock: {
            type: Number,
            required: [true, 'please enter product stock.'],
            maxLength: [4, 'max 4 characters.'],
            default: 1,
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

productSchema.index({
    name: "text",
    description: "text"
})
productSchema.plugin(mongooseAggregatePaginate)


export const Product = Mongoose.model('Product', productSchema);
