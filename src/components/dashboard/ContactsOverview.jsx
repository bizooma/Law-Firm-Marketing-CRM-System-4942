import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../../contexts/CRMContext';

const { FiUsers, FiPhone, FiMail, FiMapPin, FiArrowRight, FiTrendingUp } = FiIcons;

const ContactsOverview = () => {
  const { clients, leads } = useCRM();

  // Get top performing clients
  const topClients = clients
    .sort((a, b) => b.leads - a.leads)
    .slice(0, 3);

  // Get recent contacts that need follow-up
  const needsFollowUp = leads.filter(lead => 
    lead.status === 'New' || lead.status === 'Qualified'
  ).slice(0, 4);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Contacts Overview</h3>
        <Link
          to="/clients"
          className="text-sm text-legal-600 hover:text-legal-700 flex items-center space-x-1"
        >
          <span>View all contacts</span>
          <SafeIcon icon={FiArrowRight} className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Clients */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Top Performing Law Firms</h4>
          <div className="space-y-3">
            {topClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-legal-100 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiUsers} className="h-5 w-5 text-legal-600" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{client.name}</h5>
                      <p className="text-sm text-gray-600">{client.practiceAreas[0]}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiPhone} className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{client.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiMail} className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{client.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiTrendingUp} className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-bold text-green-600">{client.leads}</span>
                    </div>
                    <p className="text-xs text-gray-500">leads</p>
                  </div>
                </div>
                <Link
                  to={`/clients/${client.id}`}
                  className="block mt-2 text-xs text-legal-600 hover:text-legal-700"
                >
                  View Details →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contacts Needing Follow-up */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Needs Follow-up</h4>
          <div className="space-y-3">
            {needsFollowUp.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">{lead.name}</h5>
                    <p className="text-sm text-gray-600">{lead.practiceArea}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiPhone} className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{lead.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiMail} className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{lead.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {lead.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">${lead.value.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button className="flex-1 bg-blue-600 text-white py-1 px-3 rounded text-xs hover:bg-blue-700 transition-colors">
                    Call Now
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-1 px-3 rounded text-xs hover:bg-green-700 transition-colors">
                    Send Email
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsOverview;