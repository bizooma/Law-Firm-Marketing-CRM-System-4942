import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShield, FiEdit, FiTrash2, FiCheckCircle } = FiIcons;

const ComplianceRuleCard = ({ rule }) => {
  const getCategoryColor = (category) => {
    const colors = {
      Advertising: 'bg-blue-100 text-blue-800',
      Privacy: 'bg-purple-100 text-purple-800',
      Solicitation: 'bg-red-100 text-red-800',
      Ethics: 'bg-green-100 text-green-800',
    };
    return colors[category] || colors.Advertising;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiShield} className="h-5 w-5 text-legal-600" />
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(rule.category)}`}>
            {rule.category}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <SafeIcon icon={FiCheckCircle} className="h-4 w-4 text-green-600" />
          <span className="text-xs text-green-600">Active</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{rule.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{rule.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Last updated: {format(new Date(rule.lastUpdated), 'MMM d, yyyy')}</span>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 bg-legal-600 text-white py-2 px-4 rounded-md hover:bg-legal-700 transition-colors text-sm font-medium">
          View Details
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <SafeIcon icon={FiEdit} className="h-4 w-4" />
        </button>
        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
          <SafeIcon icon={FiTrash2} className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default ComplianceRuleCard;