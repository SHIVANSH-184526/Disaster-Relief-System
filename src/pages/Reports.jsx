import React, { useState } from 'react';
import { Download, FileText, Calendar, PieChart } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import styles from './Requests.module.css';

export default function Reports() {
  const [loadingMsg, setLoadingMsg] = useState("");

  const handleExport = (format) => {
    setLoadingMsg(`Generating ${format}...`);
    setTimeout(() => {
      setLoadingMsg("");
      alert(`${format} file successfully compiled and "downloaded"!`);
    }, 1500);
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1>System Reports</h1>
          <p>Generate, view, and export operational summaries.</p>
        </div>
      </div>

      {loadingMsg && (
        <div style={{
          backgroundColor: 'var(--accent-blue-transparent)', 
          color: 'var(--accent-blue)',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          fontWeight: 500,
          border: '1px solid var(--accent-blue)'
        }}>
          {loadingMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Daily Summary */}
        <Card title="Daily Operational Report" icon={<Calendar size={20} color="var(--accent-blue)" />}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Requests Today</span>
              <span style={{ fontWeight: 600 }}>142</span>
            </div>
            <div style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Deliveries Completed</span>
              <span style={{ fontWeight: 600 }}>89</span>
            </div>
            <div style={{ padding: '0.75rem 0', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Pending Critical</span>
              <span style={{ fontWeight: 600, color: 'var(--priority-high)' }}>12</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="primary" icon={<Download size={16} />} style={{ flex: 1 }} onClick={() => handleExport("Daily_Report.pdf")}>Export PDF</Button>
            <Button variant="secondary" icon={<FileText size={16} />} style={{ flex: 1 }} onClick={() => handleExport("Daily_Report.csv")}>Export CSV</Button>
          </div>
        </Card>

        {/* Monthly Summary */}
        <Card title="Monthly Efficiency Report" icon={<PieChart size={20} color="#a855f7" />}>
           <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Demand Fulfillment Rate</span>
              <span style={{ fontWeight: 600, color: 'var(--priority-low)' }}>94.2%</span>
            </div>
            <div style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Resource Depletion</span>
              <span style={{ fontWeight: 600 }}>-18%</span>
            </div>
            <div style={{ padding: '0.75rem 0', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Avg Response Time</span>
              <span style={{ fontWeight: 600 }}>2h 45m</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="primary" icon={<Download size={16} />} style={{ flex: 1 }} onClick={() => handleExport("Monthly_Efficiency.pdf")}>Export PDF</Button>
            <Button variant="secondary" icon={<FileText size={16} />} style={{ flex: 1 }} onClick={() => handleExport("Monthly_Efficiency.csv")}>Export CSV</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
