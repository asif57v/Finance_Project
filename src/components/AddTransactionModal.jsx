import React, { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { X } from 'lucide-react';

const AddTransactionModal = ({ onClose }) => {
  const { addTransaction } = useContext(FinanceContext);
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: '',
    type: 'expense'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) return;
    
    addTransaction(formData);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', background: 'var(--bg-dark)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>Add Transaction</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Type</label>
            <select 
              value={formData.type} 
              onChange={e => setFormData({...formData, type: e.target.value})}
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Date</label>
            <input 
              type="date" 
              value={formData.date} 
              onChange={e => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Category</label>
            <input 
              type="text" 
              placeholder="e.g. Groceries, Salary..." 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Amount</label>
            <input 
              type="number" 
              placeholder="0.00" 
              step="0.01" 
              min="0"
              value={formData.amount} 
              onChange={e => setFormData({...formData, amount: parseFloat(e.target.value) || ''})}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }}>
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
