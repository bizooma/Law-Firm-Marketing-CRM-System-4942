import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import ClientDetails from './pages/ClientDetails';
import Campaigns from './pages/Campaigns';
import CampaignDetails from './pages/CampaignDetails';
import Leads from './pages/Leads';
import Analytics from './pages/Analytics';
import Compliance from './pages/Compliance';
import Settings from './pages/Settings';
import { AuthProvider } from './contexts/AuthContext';
import { CRMProvider } from './contexts/CRMContext';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <CRMProvider>
        <Router>
          <div className="flex h-screen bg-gray-50">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header onMenuClick={() => setSidebarOpen(true)} />
              
              <main className="flex-1 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/clients/:id" element={<ClientDetails />} />
                    <Route path="/campaigns" element={<Campaigns />} />
                    <Route path="/campaigns/:id" element={<CampaignDetails />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/compliance" element={<Compliance />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </motion.div>
              </main>
            </div>
          </div>
          
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </Router>
      </CRMProvider>
    </AuthProvider>
  );
}

export default App;