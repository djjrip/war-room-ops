import React from 'react';
import { Home, DollarSign, Users, TrendingUp } from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome back, Boss</h1>
      
      <div className="grid grid-cols-1 md-grid-cols-4 gap-6 mb-6">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-secondary font-medium">Active Leads</span>
            <Home className="text-accent-primary" size={20} />
          </div>
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-success mt-2">+3 this week</div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-secondary font-medium">Under Contract</span>
            <DollarSign className="text-accent-warning" size={20} />
          </div>
          <div className="text-2xl font-bold">2</div>
          <div className="text-sm text-success mt-2">1 closing soon</div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-secondary font-medium">Cash Buyers</span>
            <Users className="text-accent-primary" size={20} />
          </div>
          <div className="text-2xl font-bold">45</div>
          <div className="text-sm text-success mt-2">+12 this month</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-secondary font-medium">Est. Assignment Fees</span>
            <TrendingUp className="text-accent-success" size={20} />
          </div>
          <div className="text-2xl font-bold text-success">$18,500</div>
          <div className="text-sm text-secondary mt-2">From current contracts</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-4">
            <button className="btn btn-primary justify-center" onClick={() => setActiveTab('analyzer')}>
              Analyze a New Deal
            </button>
            <button className="btn btn-primary justify-center" onClick={() => setActiveTab('pipeline')} style={{backgroundColor: 'var(--bg-dark)', color: 'var(--text-primary)', border: '1px solid var(--border-color)'}}>
              Add New Property Lead
            </button>
            <button className="btn btn-primary justify-center" onClick={() => setActiveTab('buyers')} style={{backgroundColor: 'var(--bg-dark)', color: 'var(--text-primary)', border: '1px solid var(--border-color)'}}>
              Add Cash Buyer
            </button>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-color pb-2">
              <div>
                <div className="font-semibold">123 Main St</div>
                <div className="text-sm text-secondary">Moved to Under Contract</div>
              </div>
              <span className="text-sm text-secondary">2h ago</span>
            </div>
            <div className="flex justify-between items-center border-b border-color pb-2">
              <div>
                <div className="font-semibold">John Doe (Buyer)</div>
                <div className="text-sm text-secondary">Added to list</div>
              </div>
              <span className="text-sm text-secondary">1d ago</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">456 Elm St</div>
                <div className="text-sm text-secondary">New Lead Added</div>
              </div>
              <span className="text-sm text-secondary">2d ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
