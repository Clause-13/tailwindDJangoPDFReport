import React, { useState } from 'react';
import { Network, ArrowUpDown } from 'lucide-react';

const SwitchPortChanges = () => {
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
        <Network className="h-6 w-6 text-purple-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Switch Port Utilization</h2>
      </div>
      
      {/* Switch Port Changes Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Switch Port Changes Over Time</h3>
        
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
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Max 10</span>
          </div>
        </div>
        
        {/* Chart Placeholder - This would be replaced by your actual Chart.js implementation */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 mb-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">Switch Port Changes Chart</p>
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
                    selectedDevices.includes(device) ? 'bg-purple-100 border border-purple-300' : 'bg-white border border-gray-200'
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
      
      {/* Port Utilization Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Port Utilization Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Network className="h-5 w-5 text-purple-600 mr-2" />
              <h4 className="font-medium text-purple-800">Total Ports</h4>
            </div>
            <p className="text-3xl font-bold text-purple-700">4,800</p>
            <p className="text-sm text-purple-600">Across all switches</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <ArrowUpDown className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="font-medium text-green-800">Active Ports</h4>
            </div>
            <p className="text-3xl font-bold text-green-700">3,456</p>
            <p className="text-sm text-green-600">72% of total ports</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Network className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="font-medium text-blue-800">Available Ports</h4>
            </div>
            <p className="text-3xl font-bold text-blue-700">1,344</p>
            <p className="text-sm text-blue-600">28% of total ports</p>
          </div>
        </div>
      </div>
      
      {/* Port Change Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Port Change Activity</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Switch</th>
                <th className="py-3 px-4 text-left">Port</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Device</th>
                <th className="py-3 px-4 text-left">Changed At</th>
                <th className="py-3 px-4 text-left">Duration</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="py-3 px-4">Switch-042</td>
                <td className="py-3 px-4">Gi1/0/24</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Up</span></td>
                <td className="py-3 px-4">AP-Floor3-East</td>
                <td className="py-3 px-4">2025-04-15 09:23:45</td>
                <td className="py-3 px-4">3d 14h 27m</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Switch-018</td>
                <td className="py-3 px-4">Gi1/0/12</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Down</span></td>
                <td className="py-3 px-4">Printer-HR</td>
                <td className="py-3 px-4">2025-04-14 16:42:18</td>
                <td className="py-3 px-4">4d 7h 8m</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Switch-073</td>
                <td className="py-3 px-4">Gi1/0/8</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Up</span></td>
                <td className="py-3 px-4">Camera-Lobby</td>
                <td className="py-3 px-4">2025-04-14 11:05:32</td>
                <td className="py-3 px-4">4d 12h 45m</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Switch-056</td>
                <td className="py-3 px-4">Gi1/0/16</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Up</span></td>
                <td className="py-3 px-4">AP-Floor4-South</td>
                <td className="py-3 px-4">2025-04-13 08:17:54</td>
                <td className="py-3 px-4">5d 15h 33m</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Switch-029</td>
                <td className="py-3 px-4">Gi1/0/22</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Down</span></td>
                <td className="py-3 px-4">Unknown</td>
                <td className="py-3 px-4">2025-04-12 14:36:09</td>
                <td className="py-3 px-4">6d 9h 14m</td>
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

export default SwitchPortChanges;