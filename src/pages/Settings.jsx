import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { FiUser, FiBell, FiShield, FiSettings, FiSave } = FiIcons;

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    compliance: true,
    campaigns: true,
    leads: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'general', label: 'General', icon: FiSettings },
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-legal-100 text-legal-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <SafeIcon icon={tab.icon} className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <button className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors">
                      Change Photo
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.role}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors flex items-center space-x-2">
                      <SafeIcon icon={FiSave} className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Delivery Methods</h4>
                    <div className="space-y-3">
                      {['email', 'push', 'sms'].map((method) => (
                        <label key={method} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={notifications[method]}
                            onChange={() => handleNotificationChange(method)}
                            className="rounded border-gray-300 text-legal-600 focus:ring-legal-500"
                          />
                          <span className="text-sm text-gray-700 capitalize">{method} notifications</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Notification Types</h4>
                    <div className="space-y-3">
                      {['compliance', 'campaigns', 'leads'].map((type) => (
                        <label key={type} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={notifications[type]}
                            onChange={() => handleNotificationChange(type)}
                            className="rounded border-gray-300 text-legal-600 focus:ring-legal-500"
                          />
                          <span className="text-sm text-gray-700 capitalize">{type} updates</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors flex items-center space-x-2">
                      <SafeIcon icon={FiSave} className="h-4 w-4" />
                      <span>Save Preferences</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Change Password</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Enable 2FA</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <button className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors">
                        Enable
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors flex items-center space-x-2">
                      <SafeIcon icon={FiSave} className="h-4 w-4" />
                      <span>Update Security</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time Zone
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500">
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date Format
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="bg-legal-600 text-white px-4 py-2 rounded-md hover:bg-legal-700 transition-colors flex items-center space-x-2">
                      <SafeIcon icon={FiSave} className="h-4 w-4" />
                      <span>Save Settings</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;