import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../contexts/CRMContext';
import ClientCard from '../components/clients/ClientCard';
import AddClientModal from '../components/clients/AddClientModal';

const { FiPlus, FiSearch, FiFilter } = FiIcons;

const Clients = () => {
  const { clients } = useCRM();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Handle URL parameters
  useEffect(() => {
    const action = searchParams.get('action');
    
    if (action === 'add') {
      setShowAddModal(true);
    }
  }, [searchParams]);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-2xl font-bold text-gray-900">Law Firm Clients</h1>
          <p className="text-gray-600">Manage your law firm clients and their marketing campaigns</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="h-4 w-4" />
          <span>Add Law Firm</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search law firms..."
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
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ClientCard client={client} />
          </motion.div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No law firms found matching your criteria.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors"
          >
            Add Your First Law Firm
          </button>
        </div>
      )}

      {/* Add Client Modal */}
      {showAddModal && (
        <AddClientModal
          isOpen={showAddModal}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Clients;