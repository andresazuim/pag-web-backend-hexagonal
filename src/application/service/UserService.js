import User from "../../domain/models/user.js";
import jwt from "jsonwebtoken";

export const registerUser = async (email, password) => {
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return { status: 400, data: { message: "Usuário já existe" } };
  }

  const user = new User({ email, password });
  await user.save();
  return { status: 201, data: { message: "Usuário criado com sucesso", user } };
};

export const loginUser = async (email, password) => {
  const user = await User.findByEmail(email);
  if (!user) {
    return { status: 400, data: { message: "Usuário não encontrado" } };
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return { status: 400, data: { message: "Senha incorreta" } };
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const getUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (err) {
    throw new Error("Erro ao buscar usuário");
  }
};

export const deleteUser = async (userId) => {
  try {
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      return {
        success: false,
        message: "Usuário não encontrado",
      };
    }
    return {
      success: true,
      message: "Usuário excluído com sucesso",
    };
  } catch (err) {
    throw new Error("Erro ao excluir usuário");
  }
};
export const updateUser = async (userId, updates) => {
    try {
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return {
                success: false,
                message: 'Usuário não encontrado'
            };
        }
        return {
            success: true,
            message: 'Usuário atualizado com sucesso',
            user
        };
    } catch (err) {
        throw new Error('Erro ao atualizar usuário');
    }
};

