import express from 'express';
import { createProduct, listProducts } from '../../presentation/controllers/productController.js';
import { verifyToken } from '../security/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createProduct);
router.get('/', listProducts);

export default router;
