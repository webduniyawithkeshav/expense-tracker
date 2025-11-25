import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const IncomeExpenses = () => {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) *
        -1
    ).toFixed(2);

    return (
        <div className="stats-row">
            <div className="stat income">
                <span className="label">Income</span>
                <span className="value">+${income}</span>
            </div>
            <div className="stat expense">
                <span className="label">Expense</span>
                <span className="value">-${expense}</span>
            </div>
        </div>
    )
}
