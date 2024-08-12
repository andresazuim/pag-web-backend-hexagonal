import { addToCart, getCart, checkout } from '../../application/service/cartService.js';

export const addProductToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        const result = await addToCart(userId, productId, quantity);
        res.status(result.status).json(result.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await getCart(userId);
        res.status(result.status).json(result.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const processCheckout = async (req, res) => {
    try {
        const { cart } = req.body;
        const userId = req.user.id;
        const result = await checkout(userId, cart);
        res.status(result.status).json(result.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
