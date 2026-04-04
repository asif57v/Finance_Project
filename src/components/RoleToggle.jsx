import React, { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { Shield, User } from 'lucide-react';

const RoleToggle = () => {
  const { userRole, setUserRole } = useContext(FinanceContext);

  return (
    <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {userRole === 'Admin' ? <Shield size={24} color="var(--accent-primary)" /> : <User size={24} color="var(--text-muted)" />}
        <div>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Role Simulation</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            Currently viewing as: <strong style={{ color: userRole === 'Admin' ? 'var(--accent-primary)' : 'var(--text-main)' }}>{userRole}</strong>
          </p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: '10px' }}>
        <button 
          onClick={() => setUserRole('Viewer')}
          style={{
            background: userRole === 'Viewer' ? 'var(--bg-panel-hover)' : 'transparent',
            border: 'none',
            color: userRole === 'Viewer' ? 'var(--text-main)' : 'var(--text-muted)',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'var(--transition)'
          }}
        >
          Viewer
        </button>
        <button 
          onClick={() => setUserRole('Admin')}
          style={{
            background: userRole === 'Admin' ? 'var(--bg-panel-hover)' : 'transparent',
            border: 'none',
            color: userRole === 'Admin' ? 'var(--text-main)' : 'var(--text-muted)',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'var(--transition)'
          }}
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default RoleToggle;
