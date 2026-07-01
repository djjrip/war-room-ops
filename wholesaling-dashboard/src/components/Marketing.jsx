import React from 'react';
import { Copy } from 'lucide-react';

export default function Marketing() {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // In a real app, we'd add a small toast notification here
  };

  const templates = [
    {
      id: 1,
      type: 'SMS',
      target: 'Distressed Seller',
      title: 'Initial Cold Text',
      content: 'Hi [Name], I know this is out of the blue, but I was driving through your neighborhood and saw your property at [Address]. I buy houses for cash in the area and was wondering if you\'d be open to a hassle-free cash offer?'
    },
    {
      id: 2,
      type: 'SMS',
      target: 'Distressed Seller',
      title: 'Follow Up (No Response)',
      content: 'Hey [Name], just following up on my text about [Address]. If you aren\'t interested in selling right now, no worries! Just let me know so I can take you off my list.'
    },
    {
      id: 3,
      type: 'Email',
      target: 'Cash Buyers',
      title: 'New Deal Blast',
      content: `Subject: OFF-MARKET DEAL: [City/Neighborhood] - Deep Discount

Hey Investors,

I just locked up a new off-market property in [Neighborhood].

Address: [Address]
Asking Price: $[Price]
Est. Repairs: $[Repairs]
Est. ARV: $[ARV]

Property Details:
- [Beds] Bed / [Baths] Bath
- [SqFt] SqFt
- [Year Built]

Needs [light/heavy] rehab. Roof is [age], HVAC is [age].

First come, first serve. Buyer pays all closing costs. 
Reply to this email or call/text me at [Your Phone] if you want to walk the property.

Best,
[Your Name]`
    },
    {
      id: 4,
      type: 'Email',
      target: 'Real Estate Agents',
      title: 'Networking for Pocket Listings',
      content: `Subject: Cash Buyer looking for pocket listings in [City]

Hi [Agent Name],

My name is [Your Name] and I'm a local cash buyer. I noticed you do a lot of business in [City/Neighborhood].

I'm currently looking to acquire 2-3 more properties this quarter. I buy as-is, pay cash, and can close in 14 days or less. 

If you come across any pocket listings, distressed properties, or sellers who need a quick, quiet sale without listing on the MLS, please keep me in mind. I'm happy to let you represent me on the buy side so you can double end the commission.

Do you have time for a quick 5-minute call next Tuesday?

Best,
[Your Name]
[Your Phone]`
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Marketing Hub</h1>
          <p className="text-secondary">Pre-written scripts and templates for your outreach.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md-grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="card flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={\`badge \${template.type === 'SMS' ? 'badge-new' : 'badge-contract'}\`}>
                    {template.type}
                  </span>
                  <span className="text-sm text-secondary">Target: {template.target}</span>
                </div>
                <h3 className="text-lg font-bold">{template.title}</h3>
              </div>
              <button 
                className="btn" 
                style={{backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', padding: '0.5rem'}}
                onClick={() => handleCopy(template.content)}
                title="Copy to clipboard"
              >
                <Copy size={16} />
              </button>
            </div>
            
            <div 
              className="bg-gray-900 p-4 rounded text-sm text-gray-300 flex-1 whitespace-pre-wrap font-mono" 
              style={{backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--border-color)'}}
            >
              {template.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
