require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const transactionRoutes = require('./routes/transactions');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const connectDB = async () => {
    try {
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected (In-Memory)');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
};

connectDB();

// Routes
app.use('/api/transactions', transactionRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
