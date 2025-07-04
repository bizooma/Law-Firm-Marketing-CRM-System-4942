import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTarget, FiDollarSign, FiUsers, FiTrendingUp, FiCalendar, FiShield } = FiIcons;

const CampaignCard = ({ campaign, client }) => {
  const getStatusColor = (status) => {
    const colors = {
      Active: 'bg-green-100 text-green-800',
      Paused: 'bg-yellow-100 text-yellow-800',
      Completed: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || colors.Active;
  };

  const getTypeColor = (type) => {
    const colors = {
      'Google Ads': 'bg-blue-100 text-blue-800',
      'SEO': 'bg-purple-100 text-purple-800',
      'Content Marketing': 'bg-green-100 text-green-800',
      'Social Media': 'bg-pink-100 text-pink-800',
      'Email Marketing': 'bg-orange-100 text-orange-800',
    };
    return colors[type] || colors['Google Ads'];
  };

  const budgetUsed = (campaign.spent / campaign.budget) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{campaign.name}</h3>
          <p className="text-sm text-gray-600">{client?.name}</p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(campaign.type)}`}>
            {campaign.type}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Budget Usage</span>
          <span className="text-sm font-medium text-gray-900">
            ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-legal-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(budgetUsed, 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <SafeIcon icon={FiUsers} className="h-4 w-4 text-gray-400" />
            <span className="text-lg font-bold text-gray-900">{campaign.leads}</span>
          </div>
          <p className="text-xs text-gray-500">Leads</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <SafeIcon icon={FiTrendingUp} className="h-4 w-4 text-gray-400" />
            <span className="text-lg font-bold text-legal-600">{campaign.roi}%</span>
          </div>
          <p className="text-xs text-gray-500">ROI</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500">Cost per Lead</p>
          <p className="font-medium">${campaign.cpl}</p>
        </div>
        <div>
          <p className="text-gray-500">Conversions</p>
          <p className="font-medium">{campaign.conversions}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="flex items-center space-x-1">
          <SafeIcon icon={FiCalendar} className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">
            {format(new Date(campaign.startDate), 'MMM d')} - {format(new Date(campaign.endDate), 'MMM d')}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <SafeIcon 
            icon={FiShield} 
            className={`h-4 w-4 ${campaign.complianceChecked ? 'text-green-600' : 'text-yellow-600'}`} 
          />
          <span className={`text-xs ${campaign.complianceChecked ? 'text-green-600' : 'text-yellow-600'}`}>
            {campaign.complianceChecked ? 'Compliant' : 'Pending'}
          </span>
        </div>
      </div>

      <Link
        to={`/campaigns/${campaign.id}`}
        className="block w-full text-center bg-legal-600 text-white py-2 px-4 rounded-md hover:bg-legal-700 transition-colors text-sm font-medium"
      >
        View Details
      </Link>
    </motion.div>
  );
};

export default CampaignCard;