import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
    const { transactions, getTransactions, deleteTransaction } = useContext(GlobalContext);

    useEffect(() => {
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="card history-card">
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                    <li key={transaction._id} className={transaction.amount < 0 ? 'minus' : 'plus'}>
                        <div className="transaction-info">
                            <span>{transaction.text}</span>
                            <span className="transaction-category">{transaction.category}</span>
                        </div>
                        <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>
                        <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">x</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
