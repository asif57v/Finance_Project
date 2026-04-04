import React, { useContext, useMemo } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const DashboardOverview = () => {
  const { transactions } = useContext(FinanceContext);

  const { totalIncome, totalExpense, balance, insights, pieData, lineData } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    const categoryTotals = {};
    const monthlyData = {};

    transactions.forEach(t => {
      const amt = Number(t.amount);
      if (t.type === 'income') {
        inc += amt;
      } else {
        exp += amt;
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amt;
      }

      // Format for line chart, simple grouping by Date
      const d = t.date.substring(0, 7); // YYYY-MM
      if (!monthlyData[d]) monthlyData[d] = { name: d, income: 0, expense: 0 };
      if (t.type === 'income') monthlyData[d].income += amt;
      else monthlyData[d].expense += amt;
    });

    const highestCat = Object.entries(categoryTotals).sort((a,b) => b[1] - a[1])[0] || ['None', 0];

    const pieArray = Object.keys(categoryTotals).map(key => ({
      name: key,
      value: categoryTotals[key]
    }));

    const lineArray = Object.values(monthlyData).sort((a,b) => a.name.localeCompare(b.name));

    return {
      totalIncome: inc,
      totalExpense: exp,
      balance: inc - exp,
      insights: `Your highest expense category is ${highestCat[0]} reaching $${highestCat[1]}.`,
      pieData: pieArray,
      lineData: lineArray
    };
  }, [transactions]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Summary Cards */}
      <div className="grid-cards">
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '12px' }}>
            <Wallet size={28} color="#3b82f6" />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Total Balance</p>
            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>${balance.toLocaleString()}</h2>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--success-bg)', padding: '1rem', borderRadius: '12px' }}>
            <TrendingUp size={28} color="var(--success)" />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Total Income</p>
            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>${totalIncome.toLocaleString()}</h2>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--danger-bg)', padding: '1rem', borderRadius: '12px' }}>
            <TrendingDown size={28} color="var(--danger)" />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Total Expenses</p>
            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>${totalExpense.toLocaleString()}</h2>
          </div>
        </div>
      </div>

      {/* Charts Box */}
      <div className="grid-main">
        {/* Line Chart */}
        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             Cash Flow Trend
          </h3>
          <div style={{ width: '100%', height: 300 }}>
            {lineData.length > 0 ? (
              <ResponsiveContainer>
                <AreaChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--success)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--danger)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--danger)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--bg-panel)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="income" stroke="var(--success)" fillOpacity={1} fill="url(#colorInc)" />
                  <Area type="monotone" dataKey="expense" stroke="var(--danger)" fillOpacity={1} fill="url(#colorExp)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
               <div style={{ display:'flex', height:'100%', alignItems:'center', justifyContent:'center', color:'var(--text-muted)' }}>No trend data</div>
            )}
          </div>
        </div>

        {/* Pie Chart & Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '1rem' }}>Expense Breakdown</h3>
            <div style={{ width: '100%', height: 200 }}>
              {pieData.length > 0 ? (
                <ResponsiveContainer>
                  <PieChart>
                    <Tooltip contentStyle={{ background: 'var(--bg-panel)', border: 'none', borderRadius: '8px' }} />
                    <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ display:'flex', height:'100%', alignItems:'center', justifyContent:'center', color:'var(--text-muted)' }}>No expense data</div>
              )}
            </div>
          </div>
          
          <div className="glass-panel" style={{ background: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
             <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', color: 'var(--accent-primary)' }}>GenAI Insight</h3>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{insights}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
