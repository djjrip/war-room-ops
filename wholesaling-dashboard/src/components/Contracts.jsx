import React, { useState } from 'react';

export default function Contracts() {
  const [sellerName, setSellerName] = useState('John Doe');
  const [buyerName, setBuyerName] = useState('Your Name/Company and/or Assigns');
  const [propertyAddress, setPropertyAddress] = useState('123 Main St, Anytown, ST 12345');
  const [purchasePrice, setPurchasePrice] = useState('100000');
  const [deposit, setDeposit] = useState('100');
  
  const [assigneeName, setAssigneeName] = useState('Cash Buyer LLC');
  const [assignmentFee, setAssignmentFee] = useState('10000');

  const today = new Date().toLocaleDateString();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Automated Contract Generator</h1>
      <p className="text-secondary mb-6">Fill in the deal details below to instantly generate your boilerplate agreements.</p>
      
      <div className="grid grid-cols-1 md-grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">A. The Purchase Deal</h2>
          
          <div className="form-group">
            <label className="form-label">Seller's Name</label>
            <input type="text" className="form-input" value={sellerName} onChange={(e) => setSellerName(e.target.value)} />
          </div>
          
          <div className="form-group">
            <label className="form-label">Property Address</label>
            <input type="text" className="form-input" value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Purchase Price $</label>
              <input type="number" className="form-input" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Earnest Money Deposit $</label>
              <input type="number" className="form-input" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">B. The Assignment</h2>
          
          <div className="form-group">
            <label className="form-label">Cash Buyer's Name (Assignee)</label>
            <input type="text" className="form-input" value={assigneeName} onChange={(e) => setAssigneeName(e.target.value)} />
          </div>
          
          <div className="form-group">
            <label className="form-label">Assignment Fee $</label>
            <input type="number" className="form-input" value={assignmentFee} onChange={(e) => setAssignmentFee(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md-grid-cols-2 gap-6">
        {/* PSA Template */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 border-b border-color pb-2">Purchase & Sale Agreement</h2>
          <div className="bg-gray-900 p-4 rounded text-sm text-gray-300 h-96 overflow-y-auto whitespace-pre-wrap font-mono" style={{backgroundColor: 'rgba(15, 23, 42, 0.8)'}}>
            {`REAL ESTATE PURCHASE AND SALE AGREEMENT

DATE: ${today}

PARTIES:
Seller: ${sellerName} ("Seller")
Buyer: ${buyerName} ("Buyer")

1. PROPERTY: Seller agrees to sell and Buyer agrees to buy the property located at:
${propertyAddress}

2. PURCHASE PRICE: The total purchase price to be paid by Buyer is $${parseFloat(purchasePrice).toLocaleString()}.

3. EARNEST MONEY: Buyer will deposit $${parseFloat(deposit).toLocaleString()} as earnest money with the title company within 3 business days of acceptance.

4. INSPECTION PERIOD: Buyer shall have 14 days from the date of acceptance to inspect the property. Buyer may cancel this agreement for any reason during this period.

5. ASSIGNMENT: Buyer has the right to assign this agreement to any third party without prior approval of the Seller.

6. CLOSING: Closing shall occur on or before 30 days from the date of this agreement.

___________________________        ___________________________
Seller Signature                   Buyer Signature`}
          </div>
          <button className="btn btn-primary mt-4 w-full">Copy to Clipboard</button>
        </div>

        {/* Assignment Template */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 border-b border-color pb-2">Assignment of Contract</h2>
          <div className="bg-gray-900 p-4 rounded text-sm text-gray-300 h-96 overflow-y-auto whitespace-pre-wrap font-mono" style={{backgroundColor: 'rgba(15, 23, 42, 0.8)'}}>
            {`ASSIGNMENT OF REAL ESTATE PURCHASE AND SALE AGREEMENT

DATE: ${today}

PARTIES:
Assignor: ${buyerName} ("Assignor")
Assignee: ${assigneeName} ("Assignee")

1. ASSIGNMENT: Assignor hereby assigns, transfers, and sets over to Assignee all of Assignor's rights, title, and interest in and to that certain Real Estate Purchase and Sale Agreement dated _____________, between Assignor and ${sellerName} (Seller) regarding the property located at:
${propertyAddress}

2. ASSIGNMENT FEE: Assignee agrees to pay Assignor a non-refundable assignment fee of $${parseFloat(assignmentFee).toLocaleString()}. 

3. ASSUMPTION: Assignee hereby assumes all of Assignor's duties and obligations under said Purchase and Sale Agreement.

4. CLOSING: If Assignee fails to close on the property, the assignment fee shall be forfeited to Assignor.

___________________________        ___________________________
Assignor Signature                 Assignee Signature`}
          </div>
          <button className="btn btn-success mt-4 w-full">Copy to Clipboard</button>
        </div>
      </div>
    </div>
  );
}
