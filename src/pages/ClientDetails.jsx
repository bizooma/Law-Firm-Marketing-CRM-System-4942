import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../contexts/CRMContext';

const { 
  FiArrowLeft, FiEdit, FiPhone, FiMail, FiMapPin, FiCalendar, 
  FiDollarSign, FiTrendingUp, FiUsers, FiTarget, FiCheckCircle 
} = FiIcons;

const ClientDetails = () => {
  const { id } = useParams();
  const { clients, campaigns, leads } = useCRM();
  const [activeTab, setActiveTab] = useState('overview');

  const client = clients.find(c => c.id === parseInt(id));
  const clientCampaigns = campaigns.filter(c => c.clientId === parseInt(id));
  const clientLeads = leads.filter(l => l.clientId === parseInt(id));

  if (!client) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Client not found</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'leads', label: 'Leads' },
    { id: 'compliance', label: 'Compliance' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/clients"
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-gray-600">{client.practiceAreas.join(', ')}</p>
          </div>
        </div>
        <button className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors flex items-center space-x-2">
          <SafeIcon icon={FiEdit} className="h-4 w-4" />
          <span>Edit Client</span>
        </button>
      </div>

      {/* Client Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{client.leads}</p>
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
              <p className="text-2xl font-bold text-gray-900">{client.conversions}</p>
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
              <p className="text-sm text-gray-600">ROI</p>
              <p className="text-2xl font-bold text-gray-900">{client.roi}%</p>
            </div>
            <div className="p-3 bg-legal-100 rounded-lg">
              <SafeIcon icon={FiTrendingUp} className="h-6 w-6 text-legal-600" />
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
              <p className="text-sm text-gray-600">Monthly Spend</p>
              <p className="text-2xl font-bold text-gray-900">${client.monthlySpend.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <SafeIcon icon={FiDollarSign} className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiUsers} className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Contact Person</p>
                    <p className="font-medium">{client.contactPerson}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMail} className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiPhone} className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{client.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMapPin} className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{client.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Join Date</span>
                  <span className="font-medium">{new Date(client.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {client.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Retainer Value</span>
                  <span className="font-medium">${client.retainerValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bar Number</span>
                  <span className="font-medium">{client.barNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Compliance Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.complianceStatus === 'Compliant' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {client.complianceStatus}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="text-sm font-medium">{campaign.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Budget</span>
                    <span className="text-sm font-medium">${campaign.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Leads</span>
                    <span className="text-sm font-medium">{campaign.leads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ROI</span>
                    <span className="text-sm font-medium">{campaign.roi}%</span>
                  </div>
                </div>
                <Link
                  to={`/campaigns/${campaign.id}`}
                  className="block w-full text-center bg-legal-600 text-white py-2 px-4 rounded-md hover:bg-legal-700 transition-colors text-sm font-medium mt-4"
                >
                  View Campaign
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h3>
              <div className="space-y-4">
                {clientLeads.map((lead, index) => (
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
                      <p className="font-medium text-gray-900">All advertising materials compliant</p>
                      <p className="text-sm text-gray-600">Last checked: December 10, 2024</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheckCircle} className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Bar registration current</p>
                      <p className="text-sm text-gray-600">Expires: December 31, 2025</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheckCircle} className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Client confidentiality protocols in place</p>
                      <p className="text-sm text-gray-600">Last audit: November 15, 2024</p>
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

export default ClientDetails;