import React, { useState } from 'react';
import { Zap, Battery } from 'lucide-react';

const PoEUtilization = () => {
  const [selectedDevices, setSelectedDevices] = useState<string[]>(['Switch-001', 'Switch-002', 'Switch-003', 'Switch-004', 'Switch-005']);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // This would be populated by your Python script
  const allSwitches = Array.from({ length: 100 }, (_, i) => `Switch-${String(i + 1).padStart(3, '0')}`);
  
  const pageCount = Math.ceil(allSwitches.length / itemsPerPage);
  
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };
  
  const handleDeviceToggle = (device: string) => {
    if (selectedDevices.includes(device)) {
      setSelectedDevices(selectedDevices.filter(d => d !== device));
    } else {
      if (selectedDevices.length < 10) {
        setSelectedDevices([...selectedDevices, device]);
      }
    }
  };
  
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Zap className="h-6 w-6 text-yellow-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">PoE Utilization Analysis</h2>
      </div>
      
      {/* PoE Capacity Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">PoE Capacity Utilization Trend</h3>
        
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Switches per page:</span>
            <select 
              value={itemsPerPage} 
              onChange={handleItemsPerPageChange}
              className="border rounded-md px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Showing {selectedDevices.length} switches</span>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Max 10</span>
          </div>
        </div>
        
        {/* Chart Placeholder - This would be replaced by your actual Chart.js implementation */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 mb-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">PoE Capacity Utilization Chart</p>
            <p className="text-sm text-gray-400">This is where your Chart.js line chart will be rendered</p>
            <p className="text-sm text-gray-400">Python will inject the actual chart data here</p>
          </div>
        </div>
        
        {/* Legend with Pagination */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-700">Switches</h4>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="px-2 py-1 text-sm rounded bg-white border border-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-2 py-1 text-sm">
                  Page {currentPage + 1} of {pageCount}
                </span>
                <button 
                  onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 1))}
                  disabled={currentPage === pageCount - 1}
                  className="px-2 py-1 text-sm rounded bg-white border border-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-4">
            {allSwitches
              .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map((device, index) => (
                <div 
                  key={device}
                  className={`flex items-center p-2 rounded-md cursor-pointer ${
                    selectedDevices.includes(device) ? 'bg-yellow-100 border border-yellow-300' : 'bg-white border border-gray-200'
                  }`}
                  onClick={() => handleDeviceToggle(device)}
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: getColorForDevice(device) }}
                  ></div>
                  <span className="text-sm truncate">{device}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* PoE Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">PoE Power Consumption Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Battery className="h-5 w-5 text-yellow-600 mr-2" />
              <h4 className="font-medium text-yellow-800">Total PoE Capacity</h4>
            </div>
            <p className="text-3xl font-bold text-yellow-700">37.2 kW</p>
            <p className="text-sm text-yellow-600">Across all switches</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Zap className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="font-medium text-green-800">Current Consumption</h4>
            </div>
            <p className="text-3xl font-bold text-green-700">25.3 kW</p>
            <p className="text-sm text-green-600">68% of total capacity</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Battery className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="font-medium text-blue-800">Available Power</h4>
            </div>
            <p className="text-3xl font-bold text-blue-700">11.9 kW</p>
            <p className="text-sm text-blue-600">32% of total capacity</p>
          </div>
        </div>
      </div>
      
      {/* Top PoE Consumers */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Top PoE Consumers</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Switch</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Capacity</th>
                <th className="py-3 px-4 text-left">Usage</th>
                <th className="py-3 px-4 text-left">Utilization</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="py-3 px-4">Switch-042</td>
                <td className="py-3 px-4">Floor 3 East</td>
                <td className="py-3 px-4">740W</td>
                <td className="py-3 px-4">685W</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '93%' }}></div>
                  </div>
                  <span className="text-xs text-red-600">93%</span>
                </td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Critical</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Switch-018</td>
                <td className="py-3 px-4">Floor 1 West</td>
                <td className="py-3 px-4">740W</td>
                <td className="py-3 px-4">629W</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-xs text-orange-600">85%</span>
                </td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Warning</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Switch-073</td>
                <td className="py-3 px-4">Floor 5 North</td>
                <td className="py-3 px-4">370W</td>
                <td className="py-3 px-4">296W</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <span className="text-xs text-yellow-600">80%</span>
                </td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Monitor</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Switch-056</td>
                <td className="py-3 px-4">Floor 4 South</td>
                <td className="py-3 px-4">740W</td>
                <td className="py-3 px-4">555W</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-xs text-yellow-600">75%</span>
                </td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Monitor</span></td>
              </tr>
              <tr>
                <td className="py-3 px-4">Switch-029</td>
                <td className="py-3 px-4">Floor 2 East</td>
                <td className="py-3 px-4">370W</td>
                <td className="py-3 px-4">259W</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <span className="text-xs text-green-600">70%</span>
                </td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Good</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate consistent colors for devices
function getColorForDevice(deviceId: string): string {
  // This is a simple hash function to generate a color
  const hash = deviceId.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const h = hash % 360;
  return `hsl(${h}, 70%, 50%)`;
}

export default PoEUtilization;