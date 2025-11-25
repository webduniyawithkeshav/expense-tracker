const ss = require('simple-statistics');

const analyzeTransactions = (transactions) => {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // Group expenses by category
    const expensesByCategory = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

    // Find top spending category
    let topCategory = null;
    let maxExpense = 0;
    for (const [category, amount] of Object.entries(expensesByCategory)) {
        if (amount > maxExpense) {
            maxExpense = amount;
            topCategory = category;
        }
    }

    // --- AI Prediction (Linear Regression) ---
    // Group expenses by month (YYYY-MM)
    const expensesByMonth = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            const date = new Date(t.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            acc[monthKey] = (acc[monthKey] || 0) + t.amount;
            return acc;
        }, {});

    const monthlyData = Object.entries(expensesByMonth)
        .sort((a, b) => a[0].localeCompare(b[0])) // Sort by date
        .map(([month, amount], index) => [index, amount]); // [x, y] -> [monthIndex, amount]

    let predictedExpense = null;
    let predictionMessage = 'Not enough data to predict future expenses.';

    if (monthlyData.length >= 2) {
        const regressionLine = ss.linearRegression(monthlyData);
        const linearRegressionLine = ss.linearRegressionLine(regressionLine);

        // Predict next month (index = length)
        const nextMonthIndex = monthlyData.length;
        predictedExpense = linearRegressionLine(nextMonthIndex);

        // Ensure prediction is not negative
        predictedExpense = Math.max(0, predictedExpense);

        predictionMessage = `Based on your spending trend, your predicted expense for next month is $${predictedExpense.toFixed(2)}.`;
    } else if (monthlyData.length === 1) {
        predictionMessage = `Not enough history. Based on this month, expect around $${monthlyData[0][1].toFixed(2)} next month.`;
        predictedExpense = monthlyData[0][1];
    }

    // Generate Insights
    const insights = [];

    if (predictedExpense !== null) {
        insights.push({ type: 'info', message: predictionMessage });
    }

    if (balance < 0) {
        insights.push({ type: 'warning', message: 'You are spending more than you earn. Review your expenses.' });
    } else if (balance > totalIncome * 0.2) {
        insights.push({ type: 'success', message: 'Great job! You are saving more than 20% of your income.' });
    }

    if (topCategory) {
        insights.push({ type: 'info', message: `Your highest spending category is ${topCategory} ($${maxExpense}). Can you cut back here?` });
    }

    if (totalExpense === 0 && totalIncome === 0) {
        insights.push({ type: 'info', message: 'Start adding transactions to get AI-powered insights!' });
    }

    return {
        totalIncome,
        totalExpense,
        balance,
        topCategory,
        predictedExpense,
        insights
    };
};

module.exports = { analyzeTransactions };
