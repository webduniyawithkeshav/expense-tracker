import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

    return (
        <div className="card balance-card">
            <h3>Total Balance</h3>
            <h1>${total}</h1>
            <IncomeExpenses />
        </div>
    )
}

import { IncomeExpenses } from './IncomeExpenses';
