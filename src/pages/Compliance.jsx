import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../contexts/CRMContext';
import ComplianceRuleCard from '../components/compliance/ComplianceRuleCard';
import ComplianceReport from '../components/compliance/ComplianceReport';
import AddComplianceRuleModal from '../components/compliance/AddComplianceRuleModal';

const { FiShield, FiPlus, FiCheckCircle, FiAlertTriangle, FiXCircle } = FiIcons;

const Compliance = () => {
  const { complianceRules, clients, campaigns } = useCRM();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);

  const complianceStats = {
    compliant: clients.filter(c => c.complianceStatus === 'Compliant').length,
    nonCompliant: clients.filter(c => c.complianceStatus === 'Non-Compliant').length,
    underReview: clients.filter(c => c.complianceStatus === 'Under Review').length,
    totalRules: complianceRules.length,
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiShield },
    { id: 'rules', label: 'Compliance Rules', icon: FiCheckCircle },
    { id: 'reports', label: 'Reports', icon: FiAlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Management</h1>
          <p className="text-gray-600">Ensure all marketing activities comply with legal advertising regulations</p>
        </div>
        <button
          onClick={() => setShowAddRuleModal(true)}
          className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="h-4 w-4" />
          <span>Add Rule</span>
        </button>
      </div>

      {/* Compliance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Compliant Clients</p>
              <p className="text-2xl font-bold text-green-600">{complianceStats.compliant}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <SafeIcon icon={FiCheckCircle} className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Non-Compliant</p>
              <p className="text-2xl font-bold text-red-600">{complianceStats.nonCompliant}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <SafeIcon icon={FiXCircle} className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-yellow-600">{complianceStats.underReview}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <SafeIcon icon={FiAlertTriangle} className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Rules</p>
              <p className="text-2xl font-bold text-legal-600">{complianceStats.totalRules}</p>
            </div>
            <div className="p-3 bg-legal-100 rounded-lg">
              <SafeIcon icon={FiShield} className="h-6 w-6 text-legal-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-legal-500 text-legal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <SafeIcon icon={tab.icon} className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recent Compliance Checks</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm text-gray-700">Smith & Associates - Google Ads</span>
                      <SafeIcon icon={FiCheckCircle} className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm text-gray-700">Johnson Legal - SEO Content</span>
                      <SafeIcon icon={FiCheckCircle} className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Upcoming Reviews</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm text-gray-700">Monthly Bar Compliance Check</span>
                      <span className="text-xs text-yellow-600">Due in 3 days</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm text-gray-700">Advertising Content Review</span>
                      <span className="text-xs text-yellow-600">Due in 1 week</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceRules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ComplianceRuleCard rule={rule} />
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'reports' && (
          <ComplianceReport />
        )}
      </div>

      {/* Add Rule Modal */}
      {showAddRuleModal && (
        <AddComplianceRuleModal
          isOpen={showAddRuleModal}
          onClose={() => setShowAddRuleModal(false)}
        />
      )}
    </div>
  );
};

export default Compliance;