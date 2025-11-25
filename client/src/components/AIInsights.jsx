import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalState';

export const AIInsights = () => {
    const { transactions } = useContext(GlobalContext);
    const [insights, setInsights] = useState([]);
    const [predictedExpense, setPredictedExpense] = useState(null);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const res = await axios.get('/api/transactions/ai/insights');
                setInsights(res.data.data.insights);
                if (res.data.data.predictedExpense) {
                    setPredictedExpense(res.data.data.predictedExpense);
                }
            } catch (err) {
                console.error(err);
            }
        };

        if (transactions.length > 0) {
            fetchInsights();
        }
    }, [transactions]);

    return (
        <div className="ai-insights-container card">
            <h3><i className="fas fa-robot"></i> AI Insights</h3>

            {predictedExpense !== null && (
                <div className="predicted-expense-card" style={{ marginBottom: '1rem', padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#e2e8f0' }}>Predicted Next Month Expense:</h4>
                    <p className="predicted-amount" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#818cf8', margin: 0 }}>${predictedExpense.toFixed(2)}</p>
                </div>
            )}

            {insights.length > 0 ? (
                <ul className="insights-list">
                    {insights.map((insight, index) => (
                        <li key={index} className={`insight-item ${insight.type}`}>
                            {insight.message}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-insights">Add transactions to generate insights...</p>
            )}
        </div>
    );
};

export default AIInsights;
