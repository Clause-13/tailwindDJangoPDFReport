import React from 'react';
import { Ticket, Clock, AlertTriangle } from 'lucide-react';

const TicketAnalysis = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Ticket className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Support Ticket Analysis</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ticket Type Distribution */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Ticket Type Distribution</h3>
          
          {/* Chart Placeholder */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 mb-4 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Ticket Type Pie Chart</p>
              <p className="text-sm text-gray-400">This is where your Chart.js pie chart will be rendered</p>
              <p className="text-sm text-gray-400">Python will inject the actual chart data here</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-700">Network Issues</span>
              </div>
              <span className="text-sm font-medium">42%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-700">User Access</span>
              </div>
              <span className="text-sm font-medium">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-700">Hardware Failure</span>
              </div>
              <span className="text-sm font-medium">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-gray-700">Configuration</span>
              </div>
              <span className="text-sm font-medium">10%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                <span className="text-sm text-gray-700">Other</span>
              </div>
              <span className="text-sm font-medium">5%</span>
            </div>
          </div>
        </div>
        
        {/* Ticket Priority Distribution */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Ticket Priority Distribution</h3>
          
          {/* Chart Placeholder */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 mb-4 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Ticket Priority Bar Chart</p>
              <p className="text-sm text-gray-400">This is where your Chart.js bar chart will be rendered</p>
              <p className="text-sm text-gray-400">Python will inject the actual chart data here</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-700">High</span>
                </div>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Medium</span>
                </div>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Low</span>
                </div>
                <span className="text-sm font-medium">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resolution Time Analysis */}
      <div className="mt-6">
        <div className="flex items-center mb-4">
          <Clock className="h-5 w-5 text-gray-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-800">Resolution Time Analysis</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Priority</th>
                <th className="py-3 px-4 text-left">Average Resolution Time</th>
                <th className="py-3 px-4 text-left">SLA Target</th>
                <th className="py-3 px-4 text-left">Within SLA</th>
                <th className="py-3 px-4 text-left">Tickets Count</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High</span>
                </td>
                <td className="py-3 px-4">2.4 hours</td>
                <td className="py-3 px-4">4 hours</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                  <span className="text-xs text-green-600">98%</span>
                </td>
                <td className="py-3 px-4">24</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Medium</span>
                </td>
                <td className="py-3 px-4">6.8 hours</td>
                <td className="py-3 px-4">8 hours</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-xs text-green-600">92%</span>
                </td>
                <td className="py-3 px-4">72</td>
              </tr>
              <tr>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Low</span>
                </td>
                <td className="py-3 px-4">18.5 hours</td>
                <td className="py-3 px-4">24 hours</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <span className="text-xs text-green-600">95%</span>
                </td>
                <td className="py-3 px-4">64</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Ticket Trend */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Ticket Volume Trend</h3>
        
        {/* Chart Placeholder */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">Ticket Volume Line Chart</p>
            <p className="text-sm text-gray-400">This is where your Chart.js line chart will be rendered</p>
            <p className="text-sm text-gray-400">Python will inject the actual chart data here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketAnalysis;