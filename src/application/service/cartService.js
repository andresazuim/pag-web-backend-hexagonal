import User from '../../domain/models/user.js';
import Order from '../../domain/models/order.js';

export const addToCart = async (userId, productId, quantity) => {
    const user = await User.findById(userId);
    if (!user) {
        return { status: 404, data: { message: 'User not found' } };
    }

    user.addToCart(productId, quantity);
    await user.save();
    return { status: 200, data: { message: 'Product added to cart', cart: user.cart } };
};

export const getCart = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        return { status: 404, data: { message: 'User not found' } };
    }

    return { status: 200, data: { cart: user.cart } };
};

export const checkout = async (userId, cart) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = new Order({ userId, products: cart, total });
    await order.save();
    return { status: 201, data: { message: 'Compra finalizada com sucesso!' } };
};