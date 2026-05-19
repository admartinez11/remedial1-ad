import { Schema, model } from 'mongoose';

const BrandsSchema = new Schema({
    name: {
        type: String
    },
    country: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    image_id: {
        type: String
    }
}, {
    timestamps: true,
    strict: false
});

export default model('Brands', BrandsSchema);