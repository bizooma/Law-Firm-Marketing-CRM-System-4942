import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShield, FiCheckCircle, FiAlertTriangle, FiArrowRight } = FiIcons;

const ComplianceAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'success',
      title: 'All campaigns are compliant',
      description: 'Last compliance check completed successfully',
      time: '2 hours ago',
      icon: FiCheckCircle,
    },
    {
      id: 2,
      type: 'info',
      title: 'Monthly compliance report ready',
      description: 'December 2024 compliance report is available for review',
      time: '1 day ago',
      icon: FiShield,
    },
  ];

  const getAlertClasses = (type) => {
    const classes = {
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
    };
    return classes[type] || classes.info;
  };

  const getIconClasses = (type) => {
    const classes = {
      success: 'text-green-600',
      warning: 'text-yellow-600',
      info: 'text-blue-600',
    };
    return classes[type] || classes.info;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Compliance Status</h3>
        <Link
          to="/compliance"
          className="text-sm text-legal-600 hover:text-legal-700 flex items-center space-x-1"
        >
          <span>View compliance</span>
          <SafeIcon icon={FiArrowRight} className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${getAlertClasses(alert.type)}`}
          >
            <div className="flex items-start space-x-3">
              <SafeIcon 
                icon={alert.icon} 
                className={`h-5 w-5 mt-0.5 ${getIconClasses(alert.type)}`} 
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{alert.title}</p>
                <p className="text-sm opacity-75 mt-1">{alert.description}</p>
                <p className="text-xs opacity-60 mt-2">{alert.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceAlerts;