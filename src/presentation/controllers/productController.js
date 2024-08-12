import { addProduct, getProducts } from '../../application/service/productService.js';

export const createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const result = await addProduct({ name, price, description });
        res.status(result.status).json(result.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const listProducts = async (req, res) => {
    try {
        const result = await getProducts();
        res.status(result.status).json(result.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
