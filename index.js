const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

// Setup to read an env variable from a file
dotenv.config();

const app = express();

// Connect to DB
mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log('Connected to database!'))
    .catch(() => console.log('Connection failed!!!'));

app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server is running on port 3000!'));
