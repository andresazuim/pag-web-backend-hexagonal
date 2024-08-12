import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
}, { timestamps: true });

productSchema.statics.findAll = function () {
    return this.find();
};

const Product = mongoose.model('Product', productSchema);
export default Product;