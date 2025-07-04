import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUser, FiPhone, FiMail, FiMapPin, FiTrendingUp, FiShield } = FiIcons;

const ClientCard = ({ client }) => {
  const getStatusColor = (status) => {
    const colors = {
      Active: 'bg-green-100 text-green-800',
      Inactive: 'bg-gray-100 text-gray-800',
      Pending: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || colors.Pending;
  };

  const getComplianceColor = (status) => {
    const colors = {
      Compliant: 'text-green-600',
      'Non-Compliant': 'text-red-600',
      'Under Review': 'text-yellow-600',
    };
    return colors[status] || colors['Under Review'];
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{client.name}</h3>
          <p className="text-sm text-gray-600">{client.practiceAreas.join(', ')}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
          {client.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <SafeIcon icon={FiUser} className="h-4 w-4" />
          <span>{client.contactPerson}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <SafeIcon icon={FiMail} className="h-4 w-4" />
          <span>{client.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <SafeIcon icon={FiPhone} className="h-4 w-4" />
          <span>{client.phone}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{client.leads}</p>
          <p className="text-xs text-gray-500">Total Leads</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-legal-600">{client.roi}%</p>
          <p className="text-xs text-gray-500">ROI</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <SafeIcon icon={FiShield} className={`h-4 w-4 ${getComplianceColor(client.complianceStatus)}`} />
          <span className={`text-sm ${getComplianceColor(client.complianceStatus)}`}>
            {client.complianceStatus}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          ${client.monthlySpend.toLocaleString()}/mo
        </div>
      </div>

      <Link
        to={`/clients/${client.id}`}
        className="block w-full text-center bg-legal-600 text-white py-2 px-4 rounded-md hover:bg-legal-700 transition-colors text-sm font-medium"
      >
        View Details
      </Link>
    </motion.div>
  );
};

export default ClientCard;