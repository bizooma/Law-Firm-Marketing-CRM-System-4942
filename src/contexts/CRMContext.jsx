import React, { createContext, useContext, useState, useEffect } from 'react';

const CRMContext = createContext();

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};

export const CRMProvider = ({ children }) => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Smith & Associates Law Firm',
      contactPerson: 'John Smith',
      email: 'john@smithlaw.com',
      phone: '(555) 123-4567',
      practiceAreas: ['Personal Injury', 'Criminal Defense'],
      status: 'Active',
      retainerValue: 15000,
      monthlySpend: 2500,
      joinDate: '2024-01-15',
      lastContact: '2024-12-10',
      address: '123 Main St, City, State 12345',
      barNumber: 'BAR123456',
      complianceStatus: 'Compliant',
      campaigns: [1, 2],
      leads: 24,
      conversions: 8,
      roi: 320,
    },
    {
      id: 2,
      name: 'Johnson Legal Group',
      contactPerson: 'Emily Johnson',
      email: 'emily@johnsonlegal.com',
      phone: '(555) 987-6543',
      practiceAreas: ['Family Law', 'Estate Planning'],
      status: 'Active',
      retainerValue: 12000,
      monthlySpend: 1800,
      joinDate: '2024-02-20',
      lastContact: '2024-12-08',
      address: '456 Oak Ave, City, State 12345',
      barNumber: 'BAR789012',
      complianceStatus: 'Compliant',
      campaigns: [3],
      leads: 18,
      conversions: 6,
      roi: 280,
    },
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Personal Injury Lead Generation',
      clientId: 1,
      type: 'Google Ads',
      status: 'Active',
      budget: 5000,
      spent: 3200,
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      leads: 45,
      conversions: 12,
      cpl: 71,
      roi: 340,
      complianceChecked: true,
    },
    {
      id: 2,
      name: 'Criminal Defense SEO',
      clientId: 1,
      type: 'SEO',
      status: 'Active',
      budget: 3000,
      spent: 2100,
      startDate: '2024-10-15',
      endDate: '2024-12-31',
      leads: 28,
      conversions: 8,
      cpl: 75,
      roi: 280,
      complianceChecked: true,
    },
    {
      id: 3,
      name: 'Family Law Content Marketing',
      clientId: 2,
      type: 'Content Marketing',
      status: 'Active',
      budget: 2500,
      spent: 1800,
      startDate: '2024-11-15',
      endDate: '2024-12-31',
      leads: 18,
      conversions: 6,
      cpl: 100,
      roi: 220,
      complianceChecked: true,
    },
  ]);

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'Michael Davis',
      email: 'michael@email.com',
      phone: '(555) 111-2222',
      source: 'Google Ads',
      campaignId: 1,
      clientId: 1,
      practiceArea: 'Personal Injury',
      status: 'New',
      priority: 'High',
      value: 5000,
      notes: 'Car accident case, potential high value',
      createdAt: '2024-12-10T10:30:00Z',
      lastContact: '2024-12-10T10:30:00Z',
      complianceFlags: [],
    },
    {
      id: 2,
      name: 'Lisa Thompson',
      email: 'lisa@email.com',
      phone: '(555) 333-4444',
      source: 'SEO',
      campaignId: 2,
      clientId: 1,
      practiceArea: 'Criminal Defense',
      status: 'Qualified',
      priority: 'Medium',
      value: 3000,
      notes: 'DUI case, needs consultation',
      createdAt: '2024-12-09T14:15:00Z',
      lastContact: '2024-12-09T16:20:00Z',
      complianceFlags: [],
    },
  ]);

  const [complianceRules, setComplianceRules] = useState([
    {
      id: 1,
      name: 'Attorney Advertising Compliance',
      description: 'All advertising must comply with state bar regulations',
      category: 'Advertising',
      status: 'Active',
      lastUpdated: '2024-12-01',
    },
    {
      id: 2,
      name: 'Client Confidentiality',
      description: 'Ensure all client communications are confidential',
      category: 'Privacy',
      status: 'Active',
      lastUpdated: '2024-12-01',
    },
    {
      id: 3,
      name: 'Solicitation Restrictions',
      description: 'No direct solicitation of accident victims',
      category: 'Solicitation',
      status: 'Active',
      lastUpdated: '2024-12-01',
    },
  ]);

  const addClient = (client) => {
    const newClient = {
      ...client,
      id: clients.length + 1,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      campaigns: [],
      leads: 0,
      conversions: 0,
      roi: 0,
    };
    setClients([...clients, newClient]);
  };

  const updateClient = (id, updates) => {
    setClients(clients.map(client => 
      client.id === id ? { ...client, ...updates } : client
    ));
  };

  const addCampaign = (campaign) => {
    const newCampaign = {
      ...campaign,
      id: campaigns.length + 1,
      leads: 0,
      conversions: 0,
      spent: 0,
      cpl: 0,
      roi: 0,
      complianceChecked: false,
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  const updateCampaign = (id, updates) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    ));
  };

  const addLead = (lead) => {
    const newLead = {
      ...lead,
      id: leads.length + 1,
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
      complianceFlags: [],
    };
    setLeads([...leads, newLead]);
  };

  const updateLead = (id, updates) => {
    setLeads(leads.map(lead => 
      lead.id === id ? { ...lead, ...updates } : lead
    ));
  };

  const value = {
    clients,
    campaigns,
    leads,
    complianceRules,
    addClient,
    updateClient,
    addCampaign,
    updateCampaign,
    addLead,
    updateLead,
  };

  return (
    <CRMContext.Provider value={value}>
      {children}
    </CRMContext.Provider>
  );
};