import React, { useState } from 'react';
import { Plus, Search, Edit3, Trash2 } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import Badge from '../components/Badge/Badge';
import Modal from '../components/Modal/Modal';
import { mockSupplies } from '../data/mockData';
import styles from './Requests.module.css'; // Reusing structural styles

export default function Supplies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [supplies, setSupplies] = useState(mockSupplies);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSup, setNewSup] = useState({
    source: '', type: 'Medicine', quantity: '', location: ''
  });

  const filteredSupplies = supplies.filter(sup => 
    sup.source.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sup.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sup.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSupply = (e) => {
    e.preventDefault();
    if(!newSup.source || !newSup.quantity || !newSup.location) return;

    const newId = `SUP-${String(supplies.length + 1).padStart(3, '0')}`;
    
    const supplyToAdd = {
      id: newId,
      source: newSup.source,
      type: newSup.type,
      quantity: parseInt(newSup.quantity) || 0,
      location: newSup.location,
      lastUpdated: 'Just now'
    };

    setSupplies([supplyToAdd, ...supplies]);
    setIsModalOpen(false);
    setNewSup({ source: '', type: 'Medicine', quantity: '', location: '' });
  };

  const handleDelete = (id) => {
    setSupplies(supplies.filter(sup => sup.id !== id));
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1>Supply Management</h1>
          <p>Monitor available inventory, sources, and stock levels.</p>
        </div>
        <Button icon={<Plus size={18} />} onClick={() => setIsModalOpen(true)}>Add New Supply</Button>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <Search size={18} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search resources, locations..." 
            className={styles.searchInput} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className={styles.tableCard}>
        <table>
          <thead>
            <tr>
              <th>Supply ID</th>
              <th>NGO/Warehouse</th>
              <th>Item Type</th>
              <th>Quantity Available</th>
              <th>Location</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSupplies.map(sup => (
              <tr key={sup.id}>
                <td style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{sup.id}</td>
                <td>{sup.source}</td>
                <td>{sup.type}</td>
                <td>
                  <Badge 
                    type={sup.quantity > 2000 ? 'Low' : 'High'} // Low urgency = Green 
                    text={(sup.quantity.toLocaleString()) + ' units'} 
                  />
                </td>
                <td>{sup.location}</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{sup.lastUpdated}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} title="Edit">
                      <Edit3 size={16} />
                    </button>
                    <button 
                      style={{ background: 'none', border: 'none', color: 'var(--priority-high)', cursor: 'pointer' }} 
                      title="Delete"
                      onClick={() => handleDelete(sup.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredSupplies.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No supplies found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Supply Base">
        <form onSubmit={handleAddSupply} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Source (NGO/Warehouse) *</label>
            <input 
              required
              className={styles.input} 
              type="text" 
              placeholder="e.g. Global Med Supply"
              value={newSup.source}
              onChange={e => setNewSup({...newSup, source: e.target.value})}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Item Type</label>
              <select 
                className={styles.select}
                value={newSup.type}
                onChange={e => setNewSup({...newSup, type: e.target.value})}
              >
                <option value="Food">Food</option>
                <option value="Water">Water</option>
                <option value="Medicine">Medicine</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Quantity Units *</label>
              <input 
                required
                className={styles.input} 
                type="number" 
                placeholder="e.g. 5000"
                min="1"
                value={newSup.quantity}
                onChange={e => setNewSup({...newSup, quantity: e.target.value})}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Location *</label>
            <input 
              required
              className={styles.input} 
              type="text" 
              placeholder="e.g. North Sector Warehouse"
              value={newSup.location}
              onChange={e => setNewSup({...newSup, location: e.target.value})}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Supply</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
