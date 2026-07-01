import React, { useState, useEffect } from 'react';
import { Plus, GripVertical } from 'lucide-react';

export default function LeadPipeline() {
  const [leads, setLeads] = useState(() => {
    const savedLeads = localStorage.getItem('wholesale_leads');
    if (savedLeads) {
      return JSON.parse(savedLeads);
    }
    return [
      { id: 1, address: '123 Main St', owner: 'Jane Doe', phone: '555-0101', status: 'new', ask: '$120k' },
      { id: 2, address: '456 Elm St', owner: 'John Smith', phone: '555-0102', status: 'contacted', ask: 'Unknown' },
      { id: 3, address: '789 Oak Ave', owner: 'Bob Johnson', phone: '555-0103', status: 'contract', ask: '$90k (MAO: $95k)' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('wholesale_leads', JSON.stringify(leads));
  }, [leads]);

  const [newLeadAddress, setNewLeadAddress] = useState('');

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!newLeadAddress) return;
    
    setLeads([...leads, {
      id: Date.now(),
      address: newLeadAddress,
      owner: 'TBD',
      phone: 'TBD',
      status: 'new',
      ask: 'TBD'
    }]);
    setNewLeadAddress('');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'new': return <span className="badge badge-new">New Lead</span>;
      case 'contacted': return <span className="badge badge-contacted">Contacted</span>;
      case 'contract': return <span className="badge badge-contract">Under Contract</span>;
      default: return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Lead Pipeline</h1>
          <p className="text-secondary">Track your distressed property leads.</p>
        </div>
      </div>

      <div className="card mb-6 border-dashed" style={{border: '2px dashed var(--border-color)', backgroundColor: 'transparent'}}>
        <form onSubmit={handleAddLead} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="form-label">Quick Add Property Address</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. 101 Birch Ln, Springfield" 
              value={newLeadAddress}
              onChange={(e) => setNewLeadAddress(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary h-full">
            <Plus size={20} /> Add Lead
          </button>
        </form>
      </div>

      <div className="kanban-board">
        {/* New Leads Column */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <span>New Leads (Driving for Dollars)</span>
            <span className="badge badge-new">{leads.filter(l => l.status === 'new').length}</span>
          </div>
          {leads.filter(l => l.status === 'new').map(lead => (
            <div key={lead.id} className="kanban-card">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold">{lead.address}</span>
                <GripVertical size={16} className="text-secondary" />
              </div>
              <div className="text-sm text-secondary mb-1">Owner: {lead.owner}</div>
              <div className="text-sm text-secondary mb-3">Phone: {lead.phone}</div>
              {getStatusBadge(lead.status)}
            </div>
          ))}
        </div>

        {/* Contacted Column */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <span>Contacted / Negotiating</span>
            <span className="badge badge-contacted">{leads.filter(l => l.status === 'contacted').length}</span>
          </div>
          {leads.filter(l => l.status === 'contacted').map(lead => (
            <div key={lead.id} className="kanban-card">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold">{lead.address}</span>
                <GripVertical size={16} className="text-secondary" />
              </div>
              <div className="text-sm text-secondary mb-1">Owner: {lead.owner}</div>
              <div className="text-sm text-secondary mb-1">Ask: {lead.ask}</div>
              <div className="mt-3">
                {getStatusBadge(lead.status)}
              </div>
            </div>
          ))}
        </div>

        {/* Under Contract Column */}
        <div className="kanban-column" style={{backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)'}}>
          <div className="kanban-column-header text-success">
            <span>Locked Up (Under Contract)</span>
            <span className="badge badge-contract">{leads.filter(l => l.status === 'contract').length}</span>
          </div>
          {leads.filter(l => l.status === 'contract').map(lead => (
            <div key={lead.id} className="kanban-card" style={{borderLeft: '4px solid var(--accent-success)'}}>
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold">{lead.address}</span>
                <GripVertical size={16} className="text-secondary" />
              </div>
              <div className="text-sm text-secondary mb-1">Owner: {lead.owner}</div>
              <div className="text-sm text-secondary mb-1">Details: {lead.ask}</div>
              <div className="mt-3">
                {getStatusBadge(lead.status)}
              </div>
              <button className="btn btn-success mt-4 w-full justify-center py-1 text-sm">
                Blast to Cash Buyers
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
