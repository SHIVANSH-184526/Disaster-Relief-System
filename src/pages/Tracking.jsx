import React, { useState } from 'react';
import { MapPin, Truck, CheckCircle2, Clock, Search } from 'lucide-react';
import Card from '../components/Card/Card';
import Badge from '../components/Badge/Badge';
import { mockAllocations, mockRequests } from '../data/mockData';
import styles from './Requests.module.css'; 

export default function Tracking() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Track allocations along with initially pre-loaded mock requests
  const baseDeliveries = mockRequests.filter(req => req.status !== 'Pending');
  
  // Create a tracking item out of allocations for demonstration
  const allocationDeliveries = mockAllocations.map(alc => ({
    id: alc.id,
    location: alc.location,
    partner: alc.assignedTo,
    status: alc.status,
    time: 'Recent'
  }));

  const allDeliveries = [...baseDeliveries.map(r => ({
    id: r.id, location: r.location, partner: 'Generic Partner', status: r.status, time: r.time
  })), ...allocationDeliveries];

  const filtered = allDeliveries.filter(d => 
    d.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1>Delivery Tracking</h1>
          <p>Real-time updates on active disaster relief dispatches.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <Card title="In Transit" icon={<Truck size={20} color="#a855f7" />}>
           <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{allDeliveries.filter(d => d.status === 'In Transit').length}</div>
        </Card>
        <Card title="Recently Delivered" icon={<CheckCircle2 size={20} color="var(--priority-low)" />}>
           <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{allDeliveries.filter(d => d.status === 'Delivered').length}</div>
        </Card>
        <Card title="Awaiting Dispatch" icon={<Clock size={20} color="var(--accent-blue)" />}>
           <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{allDeliveries.filter(d => d.status === 'Assigned').length}</div>
        </Card>
      </div>

      <Card className={styles.tableCard} title="Active Supply Runs">
        <div className={styles.searchContainer} style={{ width: '300px', marginBottom: '1rem' }}>
          <Search size={18} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Track by ID or location..." 
            className={styles.searchInput} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Delivery Partner</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Last Update</th>
              <th>ETA</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((deliv, index) => (
              <tr key={deliv.id + index}>
                <td style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>{deliv.id}</td>
                <td style={{ fontWeight: 500 }}>{deliv.partner}</td>
                <td>{deliv.location}</td>
                <td><Badge type={deliv.status} /></td>
                <td>{deliv.time}</td>
                <td style={{ color: deliv.status === 'In Transit' ? '#a855f7' : 'inherit' }}>
                  {deliv.status === 'In Transit' ? 'ETA: 25 mins' : (deliv.status === 'Assigned' ? 'TBD' : '—')}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No deliveries match your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
