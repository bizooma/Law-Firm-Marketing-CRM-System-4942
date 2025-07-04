import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../contexts/CRMContext';
import CampaignCard from '../components/campaigns/CampaignCard';
import AddCampaignModal from '../components/campaigns/AddCampaignModal';

const { FiPlus, FiSearch, FiFilter } = FiIcons;

const Campaigns = () => {
  const { campaigns, clients } = useCRM();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Handle URL parameters
  useEffect(() => {
    const action = searchParams.get('action');
    
    if (action === 'add') {
      setShowAddModal(true);
    }
  }, [searchParams]);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status.toLowerCase() === filterStatus;
    const matchesType = filterType === 'all' || campaign.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const campaignTypes = ['Google Ads', 'SEO', 'Content Marketing', 'Social Media', 'Email Marketing'];

  const handleModalClose = () => {
    setShowAddModal(false);
    // Clear the action parameter from URL
    const params = new URLSearchParams(searchParams);
    params.delete('action');
    setSearchParams(params);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h1>
          <p className="text-gray-600">Manage your legal marketing campaigns and track performance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="h-4 w-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiFilter} className="h-4 w-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-legal-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-legal-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {campaignTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CampaignCard
              campaign={campaign}
              client={clients.find(c => c.id === campaign.clientId)}
            />
          </motion.div>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No campaigns found matching your criteria.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors"
          >
            Create Your First Campaign
          </button>
        </div>
      )}

      {/* Add Campaign Modal */}
      {showAddModal && (
        <AddCampaignModal
          isOpen={showAddModal}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Campaigns;