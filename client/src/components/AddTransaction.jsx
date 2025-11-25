import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('Uncategorized');

    const { addTransaction } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        const newTransaction = {
            text,
            amount: +amount,
            category
        }

        addTransaction(newTransaction);
        setText('');
        setAmount(0);
        setCategory('Uncategorized');
    }

    return (
        <div className="card form-card">
            <h3>Add Transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Description</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount <br /><small>(negative - expense, positive - income)</small></label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <div className="form-control">
                    <label htmlFor="category">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Uncategorized">Select Category</option>
                        <option value="Food">Food & Dining</option>
                        <option value="Transport">Transportation</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Salary">Salary/Income</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button className="btn">Add Transaction</button>
            </form>
        </div>
    )
}
