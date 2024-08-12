import { registerUser, loginUser, getUserById, deleteUser, updateUser  } from '../src/application/service/UserService.js';
import User from '../src/domain/models/user.js';
import jwt from 'jsonwebtoken';

jest.mock('../src/domain/models/user.js');
jest.mock('jsonwebtoken');

describe('User Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('registerUser - should create a user and return success message', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const user = { save: jest.fn() };
        const existingUser = null;

        User.findByEmail.mockResolvedValue(existingUser);
        User.mockImplementation(() => user);
        user.save.mockResolvedValue();

        const result = await registerUser(email, password);

        expect(User.findByEmail).toHaveBeenCalledWith(email);
        expect(User).toHaveBeenCalledWith({ email, password });
        expect(user.save).toHaveBeenCalled();
        expect(result).toEqual({
            status: 201,
            data: { message: 'Usuário criado com sucesso', user },
        });
    });

    test('loginUser - should return a token for valid credentials', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const user = { comparePassword: jest.fn() };
        const token = 'jwt-token';

        User.findByEmail.mockResolvedValue(user);
        user.comparePassword.mockResolvedValue(true);
        jwt.sign.mockReturnValue(token);

        const result = await loginUser(email, password);

        expect(User.findByEmail).toHaveBeenCalledWith(email);
        expect(user.comparePassword).toHaveBeenCalledWith(password);
        expect(jwt.sign).toHaveBeenCalledWith({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        expect(result).toEqual(token);
    });
    
    test('getUserById - should return a user for a valid userId', async () => {
        const userId = 'valid-user-id';
        const user = { email: 'test@example.com', _id: userId };
    
        User.findById.mockResolvedValue(user);
    
        const result = await getUserById(userId);
    
        expect(User.findById).toHaveBeenCalledWith(userId);
        expect(result).toEqual(user);
    });
    
    test('getUserById - should throw an error for an invalid userId', async () => {
        const userId = 'invalid-user-id';
        User.findById.mockRejectedValue(new Error('Erro ao buscar usuário'));
    
        await expect(getUserById(userId)).rejects.toThrow('Erro ao buscar usuário');
    });

    test('deleteUser - should delete a user and return success message', async () => {
        const userId = 'valid-user-id';
        const result = { _id: userId };
    
        User.findByIdAndDelete.mockResolvedValue(result);
    
        const response = await deleteUser(userId);
    
        expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
        expect(response).toEqual({
            success: true,
            message: 'Usuário excluído com sucesso'
        });
    });
    
    test('deleteUser - should return an error message if user is not found', async () => {
        const userId = 'nonexistent-user-id';
    
        User.findByIdAndDelete.mockResolvedValue(null);
    
        const response = await deleteUser(userId);
    
        expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
        expect(response).toEqual({
            success: false,
            message: 'Usuário não encontrado'
        });
    });
    
    test('deleteUser - should throw an error if there is a problem deleting user', async () => {
        const userId = 'valid-user-id';
        User.findByIdAndDelete.mockRejectedValue(new Error('Erro ao excluir usuário'));
    
        await expect(deleteUser(userId)).rejects.toThrow('Erro ao excluir usuário');
    });
    
    describe('updateUser', () => {
        test('should update a user and return updated user', async () => {
            const userId = 'valid-user-id';
            const updates = { email: 'updated@example.com' };
            const updatedUser = {
                email: 'updated@example.com',
                _id: userId,
                cart: [],
                createdAt: new Date(),
                updatedAt: new Date()
            };
    
            User.findByIdAndUpdate.mockResolvedValue(updatedUser);
    
            const result = await updateUser(userId, updates);
    
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, updates, { new: true });
            expect(result).toEqual({
                success: true,
                message: 'Usuário atualizado com sucesso',
                user: updatedUser
            });
        });
    
        test('should return an error message if user is not found', async () => {
            const userId = 'nonexistent-user-id';
            const updates = { email: 'updated@example.com' };
    
            User.findByIdAndUpdate.mockResolvedValue(null);
    
            const result = await updateUser(userId, updates);
    
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, updates, { new: true });
            expect(result).toEqual({
                success: false,
                message: 'Usuário não encontrado'
            });
        });
    
        test('should throw an error if there is a problem updating user', async () => {
            const userId = 'valid-user-id';
            const updates = { email: 'updated@example.com' };
    
            User.findByIdAndUpdate.mockRejectedValue(new Error('Erro ao atualizar usuário'));
    
            await expect(updateUser(userId, updates)).rejects.toThrow('Erro ao atualizar usuário');
        });
    });
    
});
