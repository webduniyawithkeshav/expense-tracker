const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { analyzeTransactions } = require('../services/aiService');

// @route   GET /api/transactions
// @desc    Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// @route   POST /api/transactions
// @desc    Add transaction
router.post('/', async (req, res) => {
    try {
        const { text, amount, category, date } = req.body;

        let type = req.body.type;
        // Use original amount to preserve sign
        // let finalAmount = Math.abs(amount); 

        if (!type) {
            type = amount >= 0 ? 'income' : 'expense';
        }

        const transaction = await Transaction.create({
            text,
            amount: amount,
            type,
            category,
            date // Allow custom date
        });

        res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            res.status(400).json({ success: false, error: messages });
        } else {
            res.status(500).json({ success: false, error: 'Server Error' });
        }
    }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete transaction
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ success: false, error: 'No transaction found' });
        }

        await transaction.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// @route   GET /api/transactions/ai/insights
// @desc    Get AI insights
router.get('/ai/insights', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        const analysis = analyzeTransactions(transactions);
        res.status(200).json({
            success: true,
            data: analysis
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

module.exports = router;
