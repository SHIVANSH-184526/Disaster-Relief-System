import React, { useState } from 'react';
import { Network, Link, Check, Clock } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import Badge from '../components/Badge/Badge';
import Modal from '../components/Modal/Modal';
import { mockAllocations, mockRequests } from '../data/mockData';
import styles from './Requests.module.css'; 

export default function Allocation() {
  const [allocations, setAllocations] = useState(mockAllocations);
  const [pendingReqs, setPendingReqs] = useState(
    mockRequests.filter(req => req.status === 'Pending')
  );

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [assignForm, setAssignForm] = useState({ supplyId: 'SUP-001', assignedTo: '' });

  const handleOpenAssign = (req) => {
    setSelectedReq(req);
    setIsAssignModalOpen(true);
  };

  const submitAssign = (e) => {
    e.preventDefault();
    if (!assignForm.assignedTo) return;

    const newAllocation = {
      id: `ALC-${String(allocations.length + 3).padStart(3, '0')}`, // mock ID increment
      requestId: selectedReq.id,
      location: selectedReq.location,
      priority: selectedReq.urgency,
      assignedTo: assignForm.assignedTo,
      status: 'Assigned'
    };

    setAllocations([newAllocation, ...allocations]);
    setPendingReqs(pendingReqs.filter(r => r.id !== selectedReq.id));
    setIsAssignModalOpen(false);
    setAssignForm({ supplyId: 'SUP-001', assignedTo: '' });
  };

  const updateStatus = (id, newStatus) => {
    setAllocations(allocations.map(alc => 
      alc.id === id ? { ...alc, status: newStatus } : alc
    ));
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1>Resource Allocation</h1>
          <p>Match active demands with available supplies efficiently.</p>
        </div>
        <Button 
          icon={<Network size={18} />} 
          onClick={() => alert("Auto-match simulation triggered!")}
        >
          Auto-Match Priority
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Match Making Pane */}
        <Card title="Unassigned Priority Demands">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pendingReqs.map(req => (
              <div key={req.id} style={{
                padding: '1rem',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>{req.id} - {req.type}</span>
                  <Badge type={req.urgency} />
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  {req.location} • {req.count} People
                </div>
                <Button 
                  variant="secondary" 
                  icon={<Link size={16}/>} 
                  style={{ width: '100%', fontSize: '0.8rem', padding: '0.4rem' }}
                  onClick={() => handleOpenAssign(req)}
                >
                  Assign Resource
                </Button>
              </div>
            ))}
            {pendingReqs.length === 0 && (
              <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>
                All clear! No pending requests.
              </div>
            )}
          </div>
        </Card>

        {/* Current Allocations Table */}
        <Card title="Active Assignments">
          <table>
            <thead>
              <tr>
                <th>Alloc ID</th>
                <th>Request ID</th>
                <th>Priority</th>
                <th>Location</th>
                <th>Assigned NGO/Vol</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map(alc => (
                <tr key={alc.id}>
                  <td style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>{alc.id}</td>
                  <td>{alc.requestId}</td>
                  <td><Badge type={alc.priority} /></td>
                  <td>{alc.location}</td>
                  <td style={{ fontWeight: 500 }}>{alc.assignedTo}</td>
                  <td><Badge type={alc.status} /></td>
                  <td>
                    {alc.status === 'Assigned' ? (
                      <button 
                        style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }} 
                        title="Dispatch"
                        onClick={() => updateStatus(alc.id, 'In Transit')}
                      >
                         <Clock size={14}/> Dispatch
                      </button>
                    ) : alc.status === 'In Transit' ? (
                      <button 
                        style={{ background: 'none', border: 'none', color: 'var(--priority-low)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }} 
                        title="Mark Delivered"
                        onClick={() => updateStatus(alc.id, 'Delivered')}
                      >
                        <Check size={14}/> Verify
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Completed</span>
                    )}
                  </td>
                </tr>
              ))}
              {allocations.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No active assignments.</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Assignment Modal */}
      <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title={`Assign Resource to ${selectedReq?.id}`}>
        <form onSubmit={submitAssign} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '-0.5rem' }}>
            Fulfilling demand for <strong>{selectedReq?.type}</strong> at {selectedReq?.location}.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem' }}>Select Available Supply *</label>
            <select 
              className={styles.select}
              value={assignForm.supplyId}
              onChange={e => setAssignForm({...assignForm, supplyId: e.target.value})}
            >
              <option value="SUP-001">SUP-001 (Red Cross - 5000 units)</option>
              <option value="SUP-002">SUP-002 (FoodBank DB - 12000 units)</option>
              <option value="SUP-003">SUP-003 (WaterAid DB - 8000 units)</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem' }}>Assignee (NGO/Volunteer) *</label>
            <input 
              required
              className={styles.input} 
              type="text" 
              placeholder="e.g. Action Against Hunger Team"
              value={assignForm.assignedTo}
              onChange={e => setAssignForm({...assignForm, assignedTo: e.target.value})}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <Button variant="secondary" onClick={() => setIsAssignModalOpen(false)}>Cancel</Button>
            <Button type="submit">Confirm Assignment</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
