import { useState } from 'react'
import { LayoutDashboard, Users, Calculator, ListTodo, FileText, MessageSquare } from 'lucide-react'
import Dashboard from './components/Dashboard'
import LeadPipeline from './components/LeadPipeline'
import DealAnalyzer from './components/DealAnalyzer'
import CashBuyers from './components/CashBuyers'
import Contracts from './components/Contracts'
import Marketing from './components/Marketing'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />
      case 'pipeline':
        return <LeadPipeline />
      case 'analyzer':
        return <DealAnalyzer />
      case 'buyers':
        return <CashBuyers />
      case 'contracts':
        return <Contracts />
      case 'marketing':
        return <Marketing />
      default:
        return <Dashboard setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <LayoutDashboard className="icon" />
          WholesaleOS
        </div>
        
        <nav>
          <ul className="nav-links">
            <li>
              <a 
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <LayoutDashboard size={20} />
                Dashboard
              </a>
            </li>
            <li>
              <a 
                className={`nav-item ${activeTab === 'pipeline' ? 'active' : ''}`}
                onClick={() => setActiveTab('pipeline')}
              >
                <ListTodo size={20} />
                Lead Pipeline
              </a>
            </li>
            <li>
              <a 
                className={`nav-item ${activeTab === 'analyzer' ? 'active' : ''}`}
                onClick={() => setActiveTab('analyzer')}
              >
                <Calculator size={20} />
                Deal Analyzer
              </a>
            </li>
            <li>
              <a 
                className={`nav-item ${activeTab === 'buyers' ? 'active' : ''}`}
                onClick={() => setActiveTab('buyers')}
              >
                <Users size={20} />
                Cash Buyers
              </a>
            <li>
              <a 
                className={`nav-item ${activeTab === 'contracts' ? 'active' : ''}`}
                onClick={() => setActiveTab('contracts')}
              >
                <FileText size={20} />
                Contracts
              </a>
            </li>
            <li>
              <a 
                className={`nav-item ${activeTab === 'marketing' ? 'active' : ''}`}
                onClick={() => setActiveTab('marketing')}
              >
                <MessageSquare size={20} />
                Marketing
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
