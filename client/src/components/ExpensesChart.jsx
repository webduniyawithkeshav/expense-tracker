import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ExpensesChart = () => {
    const { transactions } = useContext(GlobalContext);

    const expenses = transactions.filter(t => t.amount < 0);

    // Group by category
    const categories = {};
    expenses.forEach(t => {
        categories[t.category] = (categories[t.category] || 0) + Math.abs(t.amount);
    });

    const data = {
        labels: Object.keys(categories),
        datasets: [
            {
                label: 'Expenses',
                data: Object.values(categories),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: '#94a3b8'
                }
            }
        }
    }

    return (
        <div className="card chart-card">
            <h3>Spending Overview</h3>
            <div style={{ maxHeight: '300px', display: 'flex', justifyContent: 'center' }}>
                {Object.keys(categories).length > 0 ? (
                    <Doughnut data={data} options={options} />
                ) : (
                    <p style={{ color: '#94a3b8', alignSelf: 'center' }}>No expenses to display</p>
                )}
            </div>
        </div>
    )
}
