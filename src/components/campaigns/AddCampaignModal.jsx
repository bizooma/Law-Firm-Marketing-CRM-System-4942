import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../../contexts/CRMContext';
import toast from 'react-hot-toast';

const { FiX } = FiIcons;

const AddCampaignModal = ({ isOpen, onClose }) => {
  const { clients, addCampaign } = useCRM();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const campaignTypes = ['Google Ads', 'SEO', 'Content Marketing', 'Social Media', 'Email Marketing'];

  const onSubmit = (data) => {
    const newCampaign = {
      ...data,
      clientId: parseInt(data.clientId),
      budget: parseFloat(data.budget),
      status: 'Active',
    };

    addCampaign(newCampaign);
    toast.success('Campaign created successfully!');
    reset();
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
              <h2 className="text-xl font-bold text-gray-900">Create New Campaign</h2>
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
                    Campaign Name *
                  </label>
                  <input
                    {...register('name', { required: 'Campaign name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                    placeholder="Personal Injury Lead Generation"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client *
                  </label>
                  <select
                    {...register('clientId', { required: 'Client is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                  >
                    <option value="">Select a client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                  {errors.clientId && <p className="text-red-500 text-sm mt-1">{errors.clientId.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Type *
                  </label>
                  <select
                    {...register('type', { required: 'Campaign type is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                  >
                    <option value="">Select campaign type</option>
                    {campaignTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget *
                  </label>
                  <input
                    {...register('budget', { 
                      required: 'Budget is required',
                      min: { value: 1, message: 'Budget must be at least $1' }
                    })}
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                    placeholder="5000"
                  />
                  {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    {...register('startDate', { required: 'Start date is required' })}
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                  />
                  {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    {...register('endDate', { required: 'End date is required' })}
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                  />
                  {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
                </div>
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
                  className="px-4 py-2 bg-legal-600 text-white rounded-md hover:bg-legal-700 transition-colors"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddCampaignModal;