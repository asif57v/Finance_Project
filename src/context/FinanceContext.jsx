import React, { createContext, useState, useEffect } from 'react';

export const FinanceContext = createContext();

const initialMockTransactions = [
  { id: '1', date: '2023-10-01', amount: 3000, category: 'Salary', type: 'income' },
  { id: '2', date: '2023-10-02', amount: 50, category: 'Food & Dining', type: 'expense' },
  { id: '3', date: '2023-10-05', amount: 120, category: 'Utilities', type: 'expense' },
  { id: '4', date: '2023-10-10', amount: 500, category: 'Rent', type: 'expense' },
  { id: '5', date: '2023-10-15', amount: 60, category: 'Entertainment', type: 'expense' },
  { id: '6', date: '2023-10-20', amount: 200, category: 'Freelance', type: 'income' },
  { id: '7', date: '2023-10-25', amount: 30, category: 'Food & Dining', type: 'expense' },
];

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialMockTransactions;
  });

  const [userRole, setUserRole] = useState('Viewer'); // Viewer | Admin

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTx = { ...transaction, id: Math.random().toString(36).substr(2, 9) };
    // Add to top of list
    setTransactions(prev => [newTx, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  return (
    <FinanceContext.Provider value={{ transactions, userRole, setUserRole, addTransaction }}>
      {children}
    </FinanceContext.Provider>
  );
};
