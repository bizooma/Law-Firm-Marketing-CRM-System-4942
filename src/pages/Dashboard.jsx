import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../contexts/CRMContext';
import MetricCard from '../components/dashboard/MetricCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import CampaignPerformance from '../components/dashboard/CampaignPerformance';
import ComplianceAlerts from '../components/dashboard/ComplianceAlerts';
import QuickActions from '../components/dashboard/QuickActions';
import LeadInteractions from '../components/dashboard/LeadInteractions';
import ContactsOverview from '../components/dashboard/ContactsOverview';

const { FiUsers, FiTarget, FiUserCheck, FiDollarSign, FiTrendingUp, FiAlertTriangle } = FiIcons;

const Dashboard = () => {
  const { clients, campaigns, leads } = useCRM();

  const totalClients = clients.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const totalLeads = leads.length;
  const totalRevenue = clients.reduce((sum, client) => sum + client.retainerValue, 0);
  const avgROI = clients.reduce((sum, client) => sum + client.roi, 0) / clients.length;

  const metrics = [
    {
      title: 'Active Law Firms',
      value: totalClients,
      icon: FiUsers,
      color: 'blue',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Active Campaigns',
      value: activeCampaigns,
      icon: FiTarget,
      color: 'green',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Total Leads',
      value: totalLeads,
      icon: FiUserCheck,
      color: 'purple',
      change: '+23%',
      trend: 'up'
    },
    {
      title: 'Monthly Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'legal',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Average ROI',
      value: `${Math.round(avgROI)}%`,
      icon: FiTrendingUp,
      color: 'emerald',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Compliance Issues',
      value: '0',
      icon: FiAlertTriangle,
      color: 'red',
      change: '-100%',
      trend: 'down'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your legal marketing campaigns.</p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/leads?action=add"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Lead
          </Link>
          <Link
            to="/campaigns?action=add"
            className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors"
          >
            Create Campaign
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <QuickActions />
      </motion.div>

      {/* Contacts Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ContactsOverview />
      </motion.div>

      {/* Lead Interactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <LeadInteractions />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <CampaignPerformance />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <RecentActivity />
        </motion.div>
      </div>

      {/* Compliance Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <ComplianceAlerts />
      </motion.div>
    </div>
  );
};

export default Dashboard;