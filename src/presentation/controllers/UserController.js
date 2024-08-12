import { registerUser, loginUser, getUserById, deleteUser, updateUser } from '../../application/service/UserService.js';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await registerUser(email, password);
        res.status(result.status).json(result.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await deleteUser(userId);
        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }
        res.status(200).json({ message: result.message });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body; // Os campos a serem atualizados devem ser passados no corpo da requisição
        const result = await updateUser(userId, updates);
        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }
        res.json(result);
    } catch (err) {
        console.error(err); // Adicione logging para ajudar a diagnosticar o problema
        res.status(500).json({ message: err.message });
    }
};
