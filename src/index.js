import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './infrastructure/routes/userRoutes.js';
import productRoutes from './infrastructure/routes/productRoutes.js';
import cartRoutes from './infrastructure/routes/cartRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://127.0.0.1:5500', // URL do frontend
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization' // Cabeçalhos permitidos
};

app.use(cors(corsOptions)); // Permite requisições de diferentes origens

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;





mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));
