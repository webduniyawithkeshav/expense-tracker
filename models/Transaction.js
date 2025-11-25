const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add some text']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
    type: {
        type: String,
        enum: ['expense', 'income'],
        required: true
    },
    category: {
        type: String,
        default: 'Uncategorized'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
