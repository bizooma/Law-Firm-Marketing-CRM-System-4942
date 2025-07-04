import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCRM } from '../../contexts/CRMContext';

const CampaignPerformance = () => {
  const { campaigns } = useCRM();

  const chartData = campaigns.map(campaign => ({
    name: campaign.name.split(' ').slice(0, 2).join(' '),
    leads: campaign.leads,
    conversions: campaign.conversions,
    roi: campaign.roi,
  }));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
        <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last 6 months</option>
        </select>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="leads" fill="#3B82F6" name="Leads" />
            <Bar dataKey="conversions" fill="#D4AF37" name="Conversions" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CampaignPerformance;