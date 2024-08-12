import { addProduct, getProducts } from '../src/application/service/productService.js';
import Product from '../src/domain/models/product.js';

jest.mock('../src/domain/models/product.js');

describe('Product Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('addProduct - should create a product and return success message', async () => {
        const productData = { name: 'Product', price: 10, description: 'Description' };
        const product = { save: jest.fn() };

        Product.mockImplementation(() => product);
        product.save.mockResolvedValue();

        const result = await addProduct(productData);

        expect(Product).toHaveBeenCalledWith(productData);
        expect(product.save).toHaveBeenCalled();
        expect(result).toEqual({
            status: 201,
            data: { message: 'Produto adicionado com sucesso', product },
        });
    });

    test('getProducts - should return a list of products', async () => {
        const products = [{ name: 'Product', price: 10 }];
        
        Product.findAll.mockResolvedValue(products);

        const result = await getProducts();

        expect(Product.findAll).toHaveBeenCalled();
        expect(result).toEqual({ status: 200, data: products });
    });
});
