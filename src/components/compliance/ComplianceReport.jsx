import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDownload, FiFileText, FiCalendar, FiCheckCircle, FiAlertTriangle } = FiIcons;

const ComplianceReport = () => {
  const reports = [
    {
      id: 1,
      title: 'Monthly Compliance Report - December 2024',
      date: '2024-12-01',
      status: 'Completed',
      issues: 0,
      checks: 15,
    },
    {
      id: 2,
      title: 'Campaign Compliance Audit - Q4 2024',
      date: '2024-11-15',
      status: 'Completed',
      issues: 2,
      checks: 28,
    },
    {
      id: 3,
      title: 'Bar Association Compliance Review',
      date: '2024-11-01',
      status: 'Completed',
      issues: 0,
      checks: 12,
    },
  ];

  const getStatusColor = (status, issues) => {
    if (issues > 0) return 'text-yellow-600';
    return status === 'Completed' ? 'text-green-600' : 'text-blue-600';
  };

  const getStatusIcon = (status, issues) => {
    if (issues > 0) return FiAlertTriangle;
    return status === 'Completed' ? FiCheckCircle : FiFileText;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Compliance Reports</h3>
        <button className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors flex items-center space-x-2">
          <SafeIcon icon={FiFileText} className="h-4 w-4" />
          <span>Generate Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SafeIcon 
                  icon={getStatusIcon(report.status, report.issues)} 
                  className={`h-5 w-5 ${getStatusColor(report.status, report.issues)}`} 
                />
                <div>
                  <h4 className="font-medium text-gray-900">{report.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCalendar} className="h-4 w-4" />
                      <span>{new Date(report.date).toLocaleDateString()}</span>
                    </div>
                    <span>•</span>
                    <span>{report.checks} checks performed</span>
                    <span>•</span>
                    <span className={report.issues > 0 ? 'text-yellow-600' : 'text-green-600'}>
                      {report.issues} issues found
                    </span>
                  </div>
                </div>
              </div>
              <button className="flex items-center space-x-2 text-legal-600 hover:text-legal-700 transition-colors">
                <SafeIcon icon={FiDownload} className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Compliance Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-gray-600">Compliance Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">55</div>
            <div className="text-sm text-gray-600">Total Checks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-gray-600">Open Issues</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceReport;