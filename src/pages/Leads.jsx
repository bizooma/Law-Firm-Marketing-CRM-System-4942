import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../contexts/CRMContext';
import LeadCard from '../components/leads/LeadCard';
import AddLeadModal from '../components/leads/AddLeadModal';
import LeadFilters from '../components/leads/LeadFilters';

const { FiPlus, FiSearch, FiUsers, FiCheck, FiX } = FiIcons;

const Leads = () => {
  const { leads, clients, campaigns } = useCRM();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    source: 'all',
    practiceArea: 'all',
  });
  const [showAddModal, setShowAddModal] = useState(false);

  // Handle URL parameters
  useEffect(() => {
    const action = searchParams.get('action');
    const filter = searchParams.get('filter');
    
    if (action === 'add') {
      setShowAddModal(true);
    }
    
    if (filter) {
      setFilters(prev => ({
        ...prev,
        status: filter === 'new' ? 'new' : filter === 'qualified' ? 'qualified' : 'all'
      }));
    }
  }, [searchParams]);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || lead.status.toLowerCase() === filters.status;
    const matchesPriority = filters.priority === 'all' || lead.priority.toLowerCase() === filters.priority;
    const matchesSource = filters.source === 'all' || lead.source === filters.source;
    const matchesPracticeArea = filters.practiceArea === 'all' || lead.practiceArea === filters.practiceArea;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesSource && matchesPracticeArea;
  });

  const leadsByStatus = {
    new: filteredLeads.filter(lead => lead.status === 'New').length,
    qualified: filteredLeads.filter(lead => lead.status === 'Qualified').length,
    converted: filteredLeads.filter(lead => lead.status === 'Converted').length,
    lost: filteredLeads.filter(lead => lead.status === 'Lost').length,
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-gray-600">Track and manage leads from your legal marketing campaigns</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="h-4 w-4" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Lead Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setFilters(prev => ({ ...prev, status: 'new' }))}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New Leads</p>
              <p className="text-2xl font-bold text-blue-600">{leadsByStatus.new}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <SafeIcon icon={FiPlus} className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setFilters(prev => ({ ...prev, status: 'qualified' }))}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Qualified</p>
              <p className="text-2xl font-bold text-yellow-600">{leadsByStatus.qualified}</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <SafeIcon icon={FiUsers} className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setFilters(prev => ({ ...prev, status: 'converted' }))}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Converted</p>
              <p className="text-2xl font-bold text-green-600">{leadsByStatus.converted}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <SafeIcon icon={FiCheck} className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setFilters(prev => ({ ...prev, status: 'lost' }))}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lost</p>
              <p className="text-2xl font-bold text-red-600">{leadsByStatus.lost}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <SafeIcon icon={FiX} className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500 focus:border-transparent"
          />
        </div>
        <LeadFilters filters={filters} setFilters={setFilters} />
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <LeadCard
              lead={lead}
              client={clients.find(c => c.id === lead.clientId)}
              campaign={campaigns.find(c => c.id === lead.campaignId)}
            />
          </motion.div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No leads found matching your criteria.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors"
          >
            Add Your First Lead
          </button>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddModal && (
        <AddLeadModal
          isOpen={showAddModal}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Leads;