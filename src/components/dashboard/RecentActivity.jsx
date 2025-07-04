import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../../contexts/CRMContext';

const { FiUser, FiTarget, FiUserCheck, FiArrowRight } = FiIcons;

const RecentActivity = () => {
  const { clients, campaigns, leads } = useCRM();

  const activities = [
    {
      id: 1,
      type: 'lead',
      title: 'New lead from Google Ads',
      description: 'Michael Davis - Personal Injury case',
      time: '2 hours ago',
      icon: FiUserCheck,
      color: 'green',
    },
    {
      id: 2,
      type: 'campaign',
      title: 'Campaign budget updated',
      description: 'Criminal Defense SEO - Budget increased to $3,500',
      time: '4 hours ago',
      icon: FiTarget,
      color: 'blue',
    },
    {
      id: 3,
      type: 'client',
      title: 'New client onboarded',
      description: 'Wilson & Partners Law Firm joined',
      time: '1 day ago',
      icon: FiUser,
      color: 'purple',
    },
    {
      id: 4,
      type: 'lead',
      title: 'Lead converted to client',
      description: 'Lisa Thompson - Criminal Defense case',
      time: '2 days ago',
      icon: FiUserCheck,
      color: 'green',
    },
  ];

  const getColorClasses = (color) => {
    const classes = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
    };
    return classes[color] || classes.blue;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Link
          to="/analytics"
          className="text-sm text-legal-600 hover:text-legal-700 flex items-center space-x-1"
        >
          <span>View all</span>
          <SafeIcon icon={FiArrowRight} className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
              <SafeIcon icon={activity.icon} className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500 truncate">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;