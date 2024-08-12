import express from 'express';
import { register, login, getUser, deleteUserController, updateUserController  } from '../../presentation/controllers/UserController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user/:userId', getUser);
router.delete('/user/:userId', deleteUserController);
router.patch('/user/:userId', updateUserController);

export default router;
