import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        },
    ],
}, { timestamps: true });

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.addToCart = function (productId, quantity) {
    const productIndex = this.cart.findIndex(
        (item) => item.productId.toString() === productId
    );
    if (productIndex > -1) {
        this.cart[productIndex].quantity += quantity;
    } else {
        this.cart.push({ productId, quantity });
    }
};

userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email });
};

const User = mongoose.model('User', userSchema);
export default User;