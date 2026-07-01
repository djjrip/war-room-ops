import React, { useState, useEffect } from 'react';
import { Plus, Mail, Phone } from 'lucide-react';

export default function CashBuyers() {
  const [buyers, setBuyers] = useState(() => {
    const savedBuyers = localStorage.getItem('wholesale_buyers');
    if (savedBuyers) {
      return JSON.parse(savedBuyers);
    }
    return [
      { id: 1, name: 'Shark Investments LLC', contact: 'Mike Shark', email: 'mike@sharkinv.com', phone: '555-9999', criteria: 'SFH, $150k max, Zip 12345' },
      { id: 2, name: 'Sarah Flippers', contact: 'Sarah Jenkins', email: 'sarah.flips@email.com', phone: '555-8888', criteria: 'Multi-family, Heavy Rehab OK' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('wholesale_buyers', JSON.stringify(buyers));
  }, [buyers]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Cash Buyers Database</h1>
          <p className="text-secondary">Your VIP list of investors ready to buy your contracts.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={20} /> Add Buyer
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Entity/Company Name</th>
                <th>Main Contact</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Buying Criteria</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map(buyer => (
                <tr key={buyer.id}>
                  <td className="font-semibold">{buyer.name}</td>
                  <td>{buyer.contact}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-secondary" />
                      {buyer.phone}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-secondary" />
                      {buyer.email}
                    </div>
                  </td>
                  <td>
                    <span className="text-sm bg-slate-800 px-2 py-1 rounded" style={{backgroundColor: 'rgba(15, 23, 42, 0.5)'}}>
                      {buyer.criteria}
                    </span>
                  </td>
                  <td>
                    <button className="text-accent-primary hover:underline text-sm font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
