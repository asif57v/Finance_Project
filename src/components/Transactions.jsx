import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { Search, Plus } from 'lucide-react';
import AddTransactionModal from './AddTransactionModal';

const Transactions = () => {
  const { transactions, userRole } = useContext(FinanceContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all | income | expense
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="glass-panel" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2>Transaction History</h2>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.2rem', width: '200px' }}
            />
          </div>
          
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {userRole === 'Admin' && (
            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} /> Add
            </button>
          )}
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '1rem 0' }}>Date</th>
              <th style={{ padding: '1rem 0' }}>Category</th>
              <th style={{ padding: '1rem 0' }}>Type</th>
              <th style={{ padding: '1rem 0', textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem 0' }}>{t.date}</td>
                  <td style={{ padding: '1rem 0', fontWeight: 500 }}>{t.category}</td>
                  <td style={{ padding: '1rem 0' }}>
                    <span style={{ 
                      background: t.type === 'income' ? 'var(--success-bg)' : 'var(--danger-bg)',
                      color: t.type === 'income' ? 'var(--success)' : 'var(--danger)',
                      padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', textTransform: 'capitalize'
                    }}>
                      {t.type}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: 600, color: t.type === 'income' ? 'var(--success)' : 'var(--text-main)' }}>
                    {t.type === 'income' ? '+' : '-'}${Number(t.amount).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  No transactions found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && <AddTransactionModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Transactions;
