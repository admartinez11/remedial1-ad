import { Schema, model } from 'mongoose';

const PromotionsSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    discount: {
        type: String
    },
    expiration_date: {
        type: Date
    },
    images: [{
        image: String,
        image_id: String
    }]
}, {
    timestamps: true,
    strict: false
});

export default model('Promotions', PromotionsSchema);