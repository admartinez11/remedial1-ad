import {Schema, model} from "mongoose";
 
const productSchema = new Schema({
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    public_id: {
        type: String,
    },
}, {
    timestamps: true,
    strict: false
})
 
export default model("Products", productSchema)