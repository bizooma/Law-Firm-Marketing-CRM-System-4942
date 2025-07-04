import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../../contexts/CRMContext';

const { FiPhone, FiMail, FiMessageSquare, FiCalendar, FiArrowRight, FiUser, FiClock } = FiIcons;

const LeadInteractions = () => {
  const { leads, clients, campaigns } = useCRM();
  const [selectedLead, setSelectedLead] = useState(null);

  // Sample interaction data - in real app this would come from API
  const interactions = [
    {
      id: 1,
      leadId: 1,
      type: 'call',
      description: 'Initial consultation call',
      date: '2024-12-10T14:30:00Z',
      duration: '15 min',
      outcome: 'Interested, needs follow-up'
    },
    {
      id: 2,
      leadId: 1,
      type: 'email',
      description: 'Sent case information packet',
      date: '2024-12-10T16:00:00Z',
      status: 'opened'
    },
    {
      id: 3,
      leadId: 2,
      type: 'meeting',
      description: 'Scheduled consultation appointment',
      date: '2024-12-11T10:00:00Z',
      status: 'scheduled'
    }
  ];

  const getInteractionIcon = (type) => {
    const icons = {
      call: FiPhone,
      email: FiMail,
      meeting: FiCalendar,
      message: FiMessageSquare
    };
    return icons[type] || FiMessageSquare;
  };

  const getInteractionColor = (type) => {
    const colors = {
      call: 'bg-blue-100 text-blue-600',
      email: 'bg-green-100 text-green-600',
      meeting: 'bg-purple-100 text-purple-600',
      message: 'bg-yellow-100 text-yellow-600'
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  };

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Lead Interactions</h3>
        <Link
          to="/leads"
          className="text-sm text-legal-600 hover:text-legal-700 flex items-center space-x-1"
        >
          <span>View all leads</span>
          <SafeIcon icon={FiArrowRight} className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Recent Leads</h4>
          <div className="space-y-3">
            {recentLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedLead?.id === lead.id
                    ? 'border-legal-500 bg-legal-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedLead(lead)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiUser} className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{lead.name}</h5>
                      <p className="text-xs text-gray-600">{lead.practiceArea}</p>
                    </div>
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
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interaction History */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            {selectedLead ? `${selectedLead.name} - Interactions` : 'Recent Interactions'}
          </h4>
          <div className="space-y-3">
            {interactions.map((interaction, index) => {
              const lead = leads.find(l => l.id === interaction.leadId);
              return (
                <motion.div
                  key={interaction.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`p-2 rounded-lg ${getInteractionColor(interaction.type)}`}>
                    <SafeIcon icon={getInteractionIcon(interaction.type)} className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{interaction.description}</p>
                    <p className="text-xs text-gray-600">{lead?.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <SafeIcon icon={FiClock} className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(interaction.date), { addSuffix: true })}
                      </span>
                    </div>
                    {interaction.outcome && (
                      <p className="text-xs text-gray-700 mt-1 italic">"{interaction.outcome}"</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-3">
        <Link
          to="/leads?action=add"
          className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors text-sm font-medium"
        >
          Add New Lead
        </Link>
        <Link
          to="/leads?filter=new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Follow Up New Leads
        </Link>
        <Link
          to="/analytics"
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          View Analytics
        </Link>
      </div>
    </div>
  );
};

export default LeadInteractions;