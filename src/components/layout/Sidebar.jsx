import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiHome, FiUsers, FiTarget, FiUserCheck, FiBarChart3, 
  FiShield, FiSettings, FiX, FiScale 
} = FiIcons;

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/clients', label: 'Law Firms', icon: FiUsers },
    { path: '/campaigns', label: 'Campaigns', icon: FiTarget },
    { path: '/leads', label: 'Leads', icon: FiUserCheck },
    { path: '/analytics', label: 'Analytics', icon: FiBarChart3 },
    { path: '/compliance', label: 'Compliance', icon: FiShield },
    { path: '/settings', label: 'Settings', icon: FiSettings },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: 'tween', duration: 0.3 }
    },
    closed: {
      x: '-100%',
      transition: { type: 'tween', duration: 0.3 }
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:shadow-none border-r border-gray-200"
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiScale} className="h-8 w-8 text-legal-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">LegalCRM</h1>
              <p className="text-xs text-gray-500">Marketing Pro</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <SafeIcon icon={FiX} className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-legal-100 text-legal-900 border-r-2 border-legal-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-legal-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">SJ</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Sarah Johnson
              </p>
              <p className="text-xs text-gray-500 truncate">
                Account Manager
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;