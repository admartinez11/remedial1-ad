import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
    name: {
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

export default model('Category', CategorySchema);