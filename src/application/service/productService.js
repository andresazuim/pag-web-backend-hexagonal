import Product from '../../domain/models/product.js';


export const addProduct = async ({ name, price, description }) => {
    const product = new Product({ name, price, description });
    await product.save();
    return { status: 201, data: { message: 'Produto adicionado com sucesso', product } };
};

export const getProducts = async () => {
    const products = await Product.findAll();
    return { status: 200, data: products };
};