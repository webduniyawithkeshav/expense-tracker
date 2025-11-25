import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { ExpensesChart } from './components/ExpensesChart';
import { AIInsights } from './components/AIInsights';
import { GlobalProvider } from './context/GlobalState';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <div className="app-container">
        <Header />
        <div className="dashboard-grid">
          <Balance />
          <AIInsights />
          <ExpensesChart />
          <AddTransaction />
          <TransactionList />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
