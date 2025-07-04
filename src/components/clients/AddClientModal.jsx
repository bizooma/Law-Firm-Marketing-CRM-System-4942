import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../../contexts/CRMContext';
import toast from 'react-hot-toast';

const { FiX } = FiIcons;

const AddClientModal = ({ isOpen, onClose }) => {
  const { addClient } = useCRM();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState([]);

  const practiceAreas = [
    'Personal Injury', 'Criminal Defense', 'Family Law', 'Estate Planning',
    'Business Law', 'Real Estate', 'Immigration', 'Bankruptcy',
    'Employment Law', 'Intellectual Property', 'Tax Law', 'Civil Litigation'
  ];

  const handlePracticeAreaToggle = (area) => {
    setSelectedPracticeAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const onSubmit = (data) => {
    const newClient = {
      ...data,
      practiceAreas: selectedPracticeAreas,
      monthlySpend: parseFloat(data.monthlySpend),
      retainerValue: parseFloat(data.retainerValue),
      complianceStatus: 'Compliant',
    };

    addClient(newClient);
    toast.success('Law firm added successfully!');
    reset();
    setSelectedPracticeAreas([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Law Firm</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                <SafeIcon icon={FiX} className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Firm Name *
                  </label>
                  <input
                    {...register('name', { required: 'Firm name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                    placeholder="Smith & Associates Law Firm"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person *
                  </label>
                  <input
                    {...register('contactPerson', { required: 'Contact person is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                    placeholder="John Smith"
                  />
                  {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                    placeholder="john@smithlaw.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    {...register('phone', { required: 'Phone is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bar Number
                  </label>
                  <input
                    {...register('barNumber')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                    placeholder="BAR123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Spend *
                  </label>
                  <input
                    {...register('monthlySpend', { 
                      required: 'Monthly spend is required',
                      min: { value: 0, message: 'Must be positive' }
                    })}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                    placeholder="2500"
                  />
                  {errors.monthlySpend && <p className="text-red-500 text-sm mt-1">{errors.monthlySpend.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retainer Value *
                  </label>
                  <input
                    {...register('retainerValue', { 
                      required: 'Retainer value is required',
                      min: { value: 0, message: 'Must be positive' }
                    })}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                    placeholder="15000"
                  />
                  {errors.retainerValue && <p className="text-red-500 text-sm mt-1">{errors.retainerValue.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  {...register('address')}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                  placeholder="123 Main St, City, State 12345"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Practice Areas *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {practiceAreas.map((area) => (
                    <label key={area} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedPracticeAreas.includes(area)}
                        onChange={() => handlePracticeAreaToggle(area)}
                        className="rounded border-gray-300 text-legal-600 focus:ring-legal-500"
                      />
                      <span className="text-sm text-gray-700">{area}</span>
                    </label>
                  ))}
                </div>
                {selectedPracticeAreas.length === 0 && (
                  <p className="text-red-500 text-sm mt-1">Select at least one practice area</p>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={selectedPracticeAreas.length === 0}
                  className="px-4 py-2 bg-legal-600 text-white rounded-md hover:bg-legal-700 disabled:bg-gray-400 transition-colors"
                >
                  Add Law Firm
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddClientModal;