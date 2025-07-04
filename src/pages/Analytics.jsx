import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../contexts/CRMContext';

const { FiTrendingUp, FiDollarSign, FiUsers, FiTarget, FiCalendar } = FiIcons;

const Analytics = () => {
  const { clients, campaigns, leads } = useCRM();
  const [timeRange, setTimeRange] = useState('30');

  // Sample data for charts
  const performanceData = [
    { month: 'Jan', leads: 45, conversions: 12, revenue: 25000 },
    { month: 'Feb', leads: 52, conversions: 15, revenue: 28000 },
    { month: 'Mar', leads: 48, conversions: 14, revenue: 26000 },
    { month: 'Apr', leads: 61, conversions: 18, revenue: 32000 },
    { month: 'May', leads: 58, conversions: 16, revenue: 30000 },
    { month: 'Jun', leads: 67, conversions: 20, revenue: 35000 },
  ];

  const campaignTypeData = [
    { name: 'Google Ads', value: 40, color: '#3B82F6' },
    { name: 'SEO', value: 30, color: '#8B5CF6' },
    { name: 'Content Marketing', value: 20, color: '#10B981' },
    { name: 'Social Media', value: 10, color: '#F59E0B' },
  ];

  const practiceAreaData = [
    { area: 'Personal Injury', leads: 35, conversions: 12 },
    { area: 'Criminal Defense', leads: 28, conversions: 8 },
    { area: 'Family Law', leads: 22, conversions: 7 },
    { area: 'Estate Planning', leads: 18, conversions: 5 },
    { area: 'Business Law', leads: 15, conversions: 4 },
  ];

  const totalLeads = leads.length;
  const totalConversions = leads.filter(lead => lead.status === 'Converted').length;
  const conversionRate = totalLeads > 0 ? (totalConversions / totalLeads * 100).toFixed(1) : 0;
  const totalRevenue = clients.reduce((sum, client) => sum + client.retainerValue, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reporting</h1>
          <p className="text-gray-600">Track performance metrics and campaign effectiveness</p>
        </div>
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiCalendar} className="h-4 w-4 text-gray-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-legal-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <SafeIcon icon={FiUsers} className="h-6 w-6 text-blue-600" />
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
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{conversionRate}%</p>
              <p className="text-sm text-green-600">+2.3% from last month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <SafeIcon icon={FiTrendingUp} className="h-6 w-6 text-green-600" />
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
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{campaigns.filter(c => c.status === 'Active').length}</p>
              <p className="text-sm text-green-600">+1 new this month</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <SafeIcon icon={FiTarget} className="h-6 w-6 text-purple-600" />
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
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">+8% from last month</p>
            </div>
            <div className="p-3 bg-legal-100 rounded-lg">
              <SafeIcon icon={FiDollarSign} className="h-6 w-6 text-legal-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Campaign Types */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Types Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={campaignTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {campaignTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Practice Areas Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Areas Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={practiceAreaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" fill="#3B82F6" />
                <Bar dataKey="conversions" fill="#D4AF37" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#D4AF37" 
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;