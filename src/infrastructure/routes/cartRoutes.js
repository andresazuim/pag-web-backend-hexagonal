import express from 'express';
import { addProductToCart, getUserCart, processCheckout } from '../../presentation/controllers/cartController.js';
import { verifyToken } from '../security/authMiddleware.js';

const router = express.Router();

router.post('/add', verifyToken, addProductToCart);
router.get('/', verifyToken, getUserCart);
router.post('/checkout', verifyToken, processCheckout);

export default router;
