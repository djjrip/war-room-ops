import React, { useState } from 'react';

export default function DealAnalyzer() {
  const [arv, setArv] = useState('');
  const [repairCost, setRepairCost] = useState('');
  const [wholesaleFee, setWholesaleFee] = useState('10000');

  // The 70% Rule Formula: (ARV * 0.70) - Repairs - Wholesale Fee = MAO
  const calculateMAO = () => {
    const numArv = parseFloat(arv) || 0;
    const numRepairs = parseFloat(repairCost) || 0;
    const numFee = parseFloat(wholesaleFee) || 0;
    
    const maxOffer = (numArv * 0.70) - numRepairs - numFee;
    return maxOffer > 0 ? maxOffer : 0;
  };

  const mao = calculateMAO();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Deal Analyzer</h1>
      <p className="text-secondary mb-6">Calculate your Maximum Allowable Offer (MAO) using the industry standard 70% rule.</p>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Input Numbers</h2>
          
          <div className="form-group">
            <label className="form-label">After Repair Value (ARV) $</label>
            <input 
              type="number" 
              className="form-input" 
              placeholder="e.g. 250000"
              value={arv}
              onChange={(e) => setArv(e.target.value)}
            />
            <p className="text-sm text-secondary mt-1">What the house will sell for fully fixed up.</p>
          </div>
          
          <div className="form-group">
            <label className="form-label">Estimated Repair Cost $</label>
            <input 
              type="number" 
              className="form-input" 
              placeholder="e.g. 30000"
              value={repairCost}
              onChange={(e) => setRepairCost(e.target.value)}
            />
            <p className="text-sm text-secondary mt-1">Rough estimate to get it in top shape.</p>
          </div>

          <div className="form-group">
            <label className="form-label">Your Desired Wholesale Fee $</label>
            <input 
              type="number" 
              className="form-input" 
              placeholder="e.g. 10000"
              value={wholesaleFee}
              onChange={(e) => setWholesaleFee(e.target.value)}
            />
            <p className="text-sm text-secondary mt-1">How much you want to make on the assignment.</p>
          </div>
        </div>

        <div>
          <div className="card" style={{borderColor: 'var(--accent-primary)', backgroundColor: 'rgba(59, 130, 246, 0.05)'}}>
            <h2 className="text-xl font-bold mb-2 text-center">Maximum Allowable Offer</h2>
            <div className="text-sm text-secondary text-center mb-4">Do not offer a penny more than this to the seller!</div>
            
            <div className="text-center">
              <span className="text-4xl font-bold text-success">
                ${mao.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
            
            <div className="mt-6 border-t border-color pt-4">
              <h3 className="font-semibold mb-2">The Math (70% Rule)</h3>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary">ARV:</span>
                <span>${(parseFloat(arv) || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary">Investor Target (70%):</span>
                <span>${((parseFloat(arv) || 0) * 0.70).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-1 text-accent-danger">
                <span>Minus Repairs:</span>
                <span>-${(parseFloat(repairCost) || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-1 text-accent-danger">
                <span>Minus Your Fee:</span>
                <span>-${(parseFloat(wholesaleFee) || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold mt-2 border-t border-color pt-2">
                <span>Equals MAO:</span>
                <span className="text-success">${mao.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
