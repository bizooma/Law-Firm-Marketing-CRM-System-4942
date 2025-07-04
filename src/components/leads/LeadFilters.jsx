import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiFilter } = FiIcons;

const LeadFilters = ({ filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const practiceAreas = [
    'Personal Injury', 'Criminal Defense', 'Family Law', 'Estate Planning',
    'Business Law', 'Real Estate', 'Immigration', 'Bankruptcy'
  ];

  const sources = ['Google Ads', 'SEO', 'Content Marketing', 'Social Media', 'Referral', 'Direct'];

  return (
    <div className="flex items-center space-x-2">
      <SafeIcon icon={FiFilter} className="h-4 w-4 text-gray-400" />
      
      <select
        value={filters.status}
        onChange={(e) => handleFilterChange('status', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-legal-500 focus:border-transparent"
      >
        <option value="all">All Status</option>
        <option value="new">New</option>
        <option value="qualified">Qualified</option>
        <option value="converted">Converted</option>
        <option value="lost">Lost</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) => handleFilterChange('priority', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-legal-500 focus:border-transparent"
      >
        <option value="all">All Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select
        value={filters.source}
        onChange={(e) => handleFilterChange('source', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-legal-500 focus:border-transparent"
      >
        <option value="all">All Sources</option>
        {sources.map(source => (
          <option key={source} value={source}>{source}</option>
        ))}
      </select>

      <select
        value={filters.practiceArea}
        onChange={(e) => handleFilterChange('practiceArea', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-legal-500 focus:border-transparent"
      >
        <option value="all">All Practice Areas</option>
        {practiceAreas.map(area => (
          <option key={area} value={area}>{area}</option>
        ))}
      </select>
    </div>
  );
};

export default LeadFilters;