import { addToCart, getCart, checkout } from '../src/application/service/cartService.js';
import User from '../src/domain/models/user.js';
import Order from '../src/domain/models/order.js';

jest.mock('../src/domain/models/user.js');
jest.mock('../src/domain/models/order.js');

describe('Cart Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('addToCart - should add product to cart and return success message', async () => {
        const userId = 'userId';
        const productId = 'productId';
        const quantity = 2;
        const user = { cart: [], addToCart: jest.fn(), save: jest.fn() };

        User.findById.mockResolvedValue(user);

        const result = await addToCart(userId, productId, quantity);

        expect(User.findById).toHaveBeenCalledWith(userId);
        expect(user.addToCart).toHaveBeenCalledWith(productId, quantity);
        expect(user.save).toHaveBeenCalled();
        expect(result).toEqual({
            status: 200,
            data: { message: 'Product added to cart', cart: [] },
        });
    });

    test('getCart - should return user cart', async () => {
        const userId = 'userId';
        const cart = [{ productId: 'productId', quantity: 2 }];
        const user = { cart };

        User.findById.mockResolvedValue(user);

        const result = await getCart(userId);

        expect(User.findById).toHaveBeenCalledWith(userId);
        expect(result).toEqual({ status: 200, data: { cart } });
    });

    test('checkout - should create an order and return success message', async () => {
        const userId = 'userId';
        const cart = [{ price: 10, quantity: 2 }];
        const total = 20;
        const order = { save: jest.fn() };

        Order.mockImplementation(() => order);
        order.save.mockResolvedValue();

        const result = await checkout(userId, cart);

        expect(Order).toHaveBeenCalledWith({ userId, products: cart, total });
        expect(order.save).toHaveBeenCalled();
        expect(result).toEqual({ status: 201, data: { message: 'Compra finalizada com sucesso!' } });
    });
});
