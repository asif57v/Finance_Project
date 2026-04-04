import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import RoleToggle from './components/RoleToggle';
import DashboardOverview from './components/DashboardOverview';
import Transactions from './components/Transactions';

function App() {
  return (
    <FinanceProvider>
      <div className="app-container">
        <header style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
          <h1 style={{ color: 'var(--text-main)' }}>Finance Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track, analyze, and manage your financial activity.</p>
        </header>

        <main>
          <RoleToggle />
          <DashboardOverview />
          <Transactions />
        </main>
      </div>
    </FinanceProvider>
  );
}

export default App;
