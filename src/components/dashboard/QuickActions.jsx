import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiUserPlus, FiTarget, FiPhone, FiMail, FiCalendar } = FiIcons;

const QuickActions = () => {
  const actions = [
    {
      title: 'Add New Lead',
      description: 'Manually add a new lead to the system',
      icon: FiUserPlus,
      color: 'bg-blue-500 hover:bg-blue-600',
      link: '/leads?action=add'
    },
    {
      title: 'Create Campaign',
      description: 'Launch a new marketing campaign',
      icon: FiTarget,
      color: 'bg-green-500 hover:bg-green-600',
      link: '/campaigns?action=add'
    },
    {
      title: 'Add Law Firm',
      description: 'Onboard a new law firm client',
      icon: FiPlus,
      color: 'bg-purple-500 hover:bg-purple-600',
      link: '/clients?action=add'
    },
    {
      title: 'Schedule Call',
      description: 'Schedule a follow-up call with a lead',
      icon: FiPhone,
      color: 'bg-yellow-500 hover:bg-yellow-600',
      link: '/leads?filter=new'
    },
    {
      title: 'Send Email',
      description: 'Send follow-up emails to leads',
      icon: FiMail,
      color: 'bg-red-500 hover:bg-red-600',
      link: '/leads?filter=qualified'
    },
    {
      title: 'View Calendar',
      description: 'Check scheduled appointments',
      icon: FiCalendar,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      link: '/analytics'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={action.link}
              className={`block p-4 rounded-lg text-white ${action.color} transition-colors group`}
            >
              <div className="flex items-center space-x-3">
                <SafeIcon icon={action.icon} className="h-6 w-6" />
                <div>
                  <h4 className="font-medium text-sm">{action.title}</h4>
                  <p className="text-xs opacity-90 mt-1">{action.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;