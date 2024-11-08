require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');
const foodCatagoryRoutes = require('./routes/foodCatagoryRoutes');
const menuRoutes = require('./routes/menuRoutes');
const getMenuRoutes = require('./routes/userMenuRoutes');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors());

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/food-category', foodCatagoryRoutes);
app.use('/api/menu', menuRoutes);
app.use("/api/get-menu", getMenuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));