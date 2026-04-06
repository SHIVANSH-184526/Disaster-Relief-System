import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import Badge from '../components/Badge/Badge';
import Modal from '../components/Modal/Modal';
import { mockRequests } from '../data/mockData';
import styles from './Requests.module.css';

export default function Requests() {
  const [requests, setRequests] = useState(mockRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReq, setNewReq] = useState({
    location: '', type: 'Food', count: '', urgency: 'Medium'
  });
  
  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.location.toLowerCase().includes(searchTerm.toLowerCase()) || req.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || req.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddRequest = (e) => {
    e.preventDefault();
    if(!newReq.location || !newReq.count) return;
    
    // Generate simple ID
    const newId = `REQ-${String(requests.length + 1).padStart(3, '0')}`;
    
    const requestToAdd = {
      id: newId,
      location: newReq.location,
      type: newReq.type,
      count: parseInt(newReq.count) || 0,
      urgency: newReq.urgency,
      status: 'Pending',
      time: 'Just now'
    };
    
    setRequests([requestToAdd, ...requests]);
    setIsModalOpen(false);
    setNewReq({ location: '', type: 'Food', count: '', urgency: 'Medium' }); // reset
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1>Requests Management</h1>
          <p>View, filter, and prioritize incoming requests.</p>
        </div>
        <Button icon={<Plus size={18} />} onClick={() => setIsModalOpen(true)}>Add Request</Button>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <Search size={18} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search by ID or location..." 
            className={styles.searchInput} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select className={styles.select} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="All">All Needs</option>
          <option value="Food">Food</option>
          <option value="Water">Water</option>
          <option value="Medicine">Medicine</option>
        </select>
        
        <Button variant="secondary" icon={<Filter size={18} />}>Advanced Filters</Button>
      </div>

      <Card className={styles.tableCard}>
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Location</th>
              <th>Need Type</th>
              <th>People Count</th>
              <th>Urgency</th>
              <th>Status</th>
              <th>Time Logged</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(req => (
              <tr key={req.id}>
                <td style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{req.id}</td>
                <td>{req.location}</td>
                <td>{req.type}</td>
                <td>{req.count}</td>
                <td><Badge type={req.urgency} /></td>
                <td><Badge type={req.status} /></td>
                <td>{req.time}</td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No requests match your current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log New Request">
        <form onSubmit={handleAddRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Location *</label>
            <input 
              required
              className={styles.input} 
              type="text" 
              placeholder="e.g. Downtown Central"
              value={newReq.location}
              onChange={e => setNewReq({...newReq, location: e.target.value})}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Need Type</label>
              <select 
                className={styles.select}
                value={newReq.type}
                onChange={e => setNewReq({...newReq, type: e.target.value})}
              >
                <option value="Food">Food</option>
                <option value="Water">Water</option>
                <option value="Medicine">Medicine</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Urgency</label>
              <select 
                className={styles.select}
                value={newReq.urgency}
                onChange={e => setNewReq({...newReq, urgency: e.target.value})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>People Count *</label>
            <input 
              required
              className={styles.input} 
              type="number" 
              placeholder="e.g. 50"
              min="1"
              value={newReq.count}
              onChange={e => setNewReq({...newReq, count: e.target.value})}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
