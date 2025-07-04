import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../../contexts/CRMContext';

const { FiUser, FiMail, FiPhone, FiDollarSign, FiClock, FiTag } = FiIcons;

const LeadCard = ({ lead, client, campaign }) => {
  const { updateLead } = useCRM();

  const getStatusColor = (status) => {
    const colors = {
      New: 'bg-blue-100 text-blue-800',
      Qualified: 'bg-yellow-100 text-yellow-800',
      Converted: 'bg-green-100 text-green-800',
      Lost: 'bg-red-100 text-red-800',
    };
    return colors[status] || colors.New;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      High: 'bg-red-100 text-red-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Low: 'bg-green-100 text-green-800',
    };
    return colors[priority] || colors.Medium;
  };

  const handleStatusChange = (newStatus) => {
    updateLead(lead.id, { status: newStatus });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{lead.name}</h3>
          <p className="text-sm text-gray-600">{lead.practiceArea}</p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <select
            value={lead.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-legal-500 ${getStatusColor(lead.status)}`}
          >
            <option value="New">New</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(lead.priority)}`}>
            {lead.priority}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <SafeIcon icon={FiMail} className="h-4 w-4" />
          <span>{lead.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <SafeIcon icon={FiPhone} className="h-4 w-4" />
          <span>{lead.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <SafeIcon icon={FiTag} className="h-4 w-4" />
          <span>{lead.source}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <SafeIcon icon={FiDollarSign} className="h-4 w-4 text-gray-400" />
            <span className="text-lg font-bold text-gray-900">${lead.value.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-500">Potential Value</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <SafeIcon icon={FiClock} className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">
              {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="text-xs text-gray-500">Created</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Client:</p>
        <p className="text-sm font-medium text-gray-900">{client?.name}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Campaign:</p>
        <p className="text-sm font-medium text-gray-900">{campaign?.name}</p>
      </div>

      {lead.notes && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Notes:</p>
          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{lead.notes}</p>
        </div>
      )}

      <div className="flex space-x-2">
        <button className="flex-1 bg-legal-600 text-white py-2 px-4 rounded-md hover:bg-legal-700 transition-colors text-sm font-medium">
          Contact
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium">
          Edit
        </button>
      </div>
    </motion.div>
  );
};

export default LeadCard;