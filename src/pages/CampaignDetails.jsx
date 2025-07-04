import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../contexts/CRMContext';

const { 
  FiArrowLeft, FiEdit, FiPlay, FiPause, FiDollarSign, FiUsers, 
  FiTrendingUp, FiTarget, FiCalendar, FiShield, FiCheckCircle 
} = FiIcons;

const CampaignDetails = () => {
  const { id } = useParams();
  const { campaigns, clients, leads } = useCRM();
  const [activeTab, setActiveTab] = useState('overview');

  const campaign = campaigns.find(c => c.id === parseInt(id));
  const client = clients.find(c => c.id === campaign?.clientId);
  const campaignLeads = leads.filter(l => l.campaignId === parseInt(id));

  if (!campaign) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Campaign not found</p>
      </div>
    );
  }

  // Sample performance data
  const performanceData = [
    { date: '2024-11-01', leads: 8, cost: 450, conversions: 2 },
    { date: '2024-11-08', leads: 12, cost: 680, conversions: 3 },
    { date: '2024-11-15', leads: 15, cost: 820, conversions: 4 },
    { date: '2024-11-22', leads: 10, cost: 590, conversions: 3 },
    { date: '2024-11-29', leads: 14, cost: 750, conversions: 5 },
    { date: '2024-12-06', leads: 18, cost: 920, conversions: 6 },
  ];

  const budgetUsed = (campaign.spent / campaign.budget) * 100;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'performance', label: 'Performance' },
    { id: 'leads', label: 'Leads' },
    { id: 'compliance', label: 'Compliance' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Active: 'bg-green-100 text-green-800',
      Paused: 'bg-yellow-100 text-yellow-800',
      Completed: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || colors.Active;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/campaigns"
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
            <p className="text-gray-600">{client?.name} • {campaign.type}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </span>
          <button className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors flex items-center space-x-2">
            <SafeIcon icon={FiEdit} className="h-4 w-4" />
            <span>Edit Campaign</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <SafeIcon icon={campaign.status === 'Active' ? FiPause : FiPlay} className="h-4 w-4" />
            <span>{campaign.status === 'Active' ? 'Pause' : 'Resume'}</span>
          </button>
        </div>
      </div>

      {/* Campaign Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{campaign.leads}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <SafeIcon icon={FiUsers} className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversions</p>
              <p className="text-2xl font-bold text-gray-900">{campaign.conversions}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <SafeIcon icon={FiTarget} className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cost per Lead</p>
              <p className="text-2xl font-bold text-gray-900">${campaign.cpl}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <SafeIcon icon={FiDollarSign} className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ROI</p>
              <p className="text-2xl font-bold text-gray-900">{campaign.roi}%</p>
            </div>
            <div className="p-3 bg-legal-100 rounded-lg">
              <SafeIcon icon={FiTrendingUp} className="h-6 w-6 text-legal-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Budget Progress */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Usage</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Spent / Budget</span>
            <span className="text-sm font-medium text-gray-900">
              ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-legal-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(budgetUsed, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{budgetUsed.toFixed(1)}% used</span>
            <span>${(campaign.budget - campaign.spent).toLocaleString()} remaining</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-legal-500 text-legal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Campaign Type</span>
                  <span className="font-medium">{campaign.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Start Date</span>
                  <span className="font-medium">{new Date(campaign.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">End Date</span>
                  <span className="font-medium">{new Date(campaign.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="font-medium">
                    {Math.ceil((new Date(campaign.endDate) - new Date(campaign.startDate)) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Law Firm</span>
                  <span className="font-medium">{client?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Contact Person</span>
                  <span className="font-medium">{client?.contactPerson}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Practice Areas</span>
                  <span className="font-medium">{client?.practiceAreas?.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Monthly Spend</span>
                  <span className="font-medium">${client?.monthlySpend?.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={2} name="Leads" />
                  <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} name="Conversions" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Leads</h3>
              <div className="space-y-4">
                {campaignLeads.map((lead, index) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{lead.name}</h4>
                      <p className="text-sm text-gray-600">{lead.practiceArea} • {lead.source}</p>
                      <p className="text-xs text-gray-500 mt-1">{lead.email} • {lead.phone}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'Qualified' ? 'bg-yellow-100 text-yellow-800' :
                        lead.status === 'Converted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {lead.status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">${lead.value.toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {campaignLeads.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No leads found for this campaign.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheckCircle} className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Campaign content approved</p>
                      <p className="text-sm text-gray-600">All advertising materials comply with bar regulations</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiShield} className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Legal disclaimers included</p>
                      <p className="text-sm text-gray-600">Required legal disclaimers are present in all ads</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheckCircle} className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Targeting restrictions compliant</p>
                      <p className="text-sm text-gray-600">Geographic and demographic targeting follows regulations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;