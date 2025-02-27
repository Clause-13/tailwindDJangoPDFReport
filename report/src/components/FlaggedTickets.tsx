import React from 'react';
import { AlertTriangle } from 'lucide-react';

const FlaggedTickets = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <AlertTriangle className="h-6 w-6 text-amber-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Flagged Tickets for Discussion</h2>
      </div>
      
      <div className="space-y-4">
        <div className="border border-amber-200 rounded-lg bg-amber-50 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800">Recurring Network Outages - Floor 3 East Wing</h3>
              <p className="text-sm text-gray-600 mt-1">Ticket #T-2025-0428</p>
            </div>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High Priority</span>
          </div>
          <p className="mt-2 text-gray-700">
            Users in the East Wing of Floor 3 have reported intermittent network connectivity issues over the past two weeks. Initial troubleshooting suggests potential issues with the Switch-042 hardware. Recommend discussing replacement options.
          </p>
          <div className="mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xs text-gray-500">Opened: 2025-04-10</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-xs text-gray-500">Last Updated: 2025-04-15</span>
            </div>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Requires Executive Decision</span>
          </div>
        </div>
        
        <div className="border border-amber-200 rounded-lg bg-amber-50 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800">PoE Capacity Upgrade Required</h3>
              <p className="text-sm text-gray-600 mt-1">Ticket #T-2025-0415</p>
            </div>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Medium Priority</span>
          </div>
          <p className="mt-2 text-gray-700">
            Several switches are approaching 90% PoE capacity utilization. With the planned deployment of additional IP phones and wireless access points in Q3, we recommend discussing a capacity upgrade plan to avoid potential power-related issues.
          </p>
          <div className="mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xs text-gray-500">Opened: 2025-04-05</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-xs text-gray-500">Last Updated: 2025-04-12</span>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Budget Approval Needed</span>
          </div>
        </div>
        
        <div className="border border-amber-200 rounded-lg bg-amber-50 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800">Security Vulnerability in Network Equipment</h3>
              <p className="text-sm text-gray-600 mt-1">Ticket #T-2025-0402</p>
            </div>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High Priority</span>
          </div>
          <p className="mt-2 text-gray-700">
            A critical security vulnerability has been identified in the firmware of 15 network switches. Vendor has released a patch, but deployment requires a maintenance window. Recommend discussing timing and communication plan for the required downtime.
          </p>
          <div className="mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xs text-gray-500">Opened: 2025-04-02</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-xs text-gray-500">Last Updated: 2025-04-14</span>
            </div>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Maintenance Planning Required</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlaggedTickets;