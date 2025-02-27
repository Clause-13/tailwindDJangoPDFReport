import React, { useState } from 'react';
import { LineChart, PieChart, BarChart3 } from 'lucide-react';

const NetworkPerformance = () => {
  const [selectedDevices, setSelectedDevices] = useState<string[]>(['Device-001', 'Device-002', 'Device-003', 'Device-004', 'Device-005']);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // This would be populated by your Python script
  const allDevices = Array.from({ length: 100 }, (_, i) => `Device-${String(i + 1).padStart(3, '0')}`);
  
  const pageCount = Math.ceil(allDevices.length / itemsPerPage);
  
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
        <LineChart className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Network Performance Metrics</h2>
      </div>
      
      {/* CPU Usage Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">CPU Utilization Trend</h3>
        
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Devices per page:</span>
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
            <span className="text-sm text-gray-600 mr-2">Showing {selectedDevices.length} devices</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Max 10</span>
          </div>
        </div>
        
        {/* Chart Placeholder - This would be replaced by your actual Chart.js implementation */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 mb-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">CPU Usage Chart</p>
            <p className="text-sm text-gray-400">This is where your Chart.js line chart will be rendered</p>
            <p className="text-sm text-gray-400">Python will inject the actual chart data here</p>
          </div>
        </div>
        
        {/* Legend with Pagination */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-700">Devices</h4>
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
            {allDevices
              .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map((device, index) => (
                <div 
                  key={device}
                  className={`flex items-center p-2 rounded-md cursor-pointer ${
                    selectedDevices.includes(device) ? 'bg-blue-100 border border-blue-300' : 'bg-white border border-gray-200'
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
      
      {/* Memory Usage Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Memory Utilization Trend</h3>
        
        {/* Chart Placeholder */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 mb-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">Memory Usage Chart</p>
            <p className="text-sm text-gray-400">This is where your Chart.js line chart will be rendered</p>
            <p className="text-sm text-gray-400">Python will inject the actual chart data here</p>
          </div>
        </div>
      </div>
      
      {/* Availability Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Network Availability</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart Placeholder */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Availability Pie Chart</p>
              <p className="text-sm text-gray-400">This is where your Chart.js pie chart will be rendered</p>
              <p className="text-sm text-gray-400">Python will inject the actual chart data here</p>
            </div>
          </div>
          
          {/* Summary Stats */}
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Online Devices</h4>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-green-700">96</span>
                <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded-full">96%</span>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2">Offline Devices</h4>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-red-700">4</span>
                <span className="text-sm bg-red-200 text-red-800 px-2 py-1 rounded-full">4%</span>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Average Uptime</h4>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-blue-700">99.8%</span>
                <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded-full">+0.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate consistent colors for devices
function getColorForDevice(deviceId: string): string {
  // This is a simple hash function to generate a color
  // In a real implementation, you might want to use a more sophisticated approach
  const hash = deviceId.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const h = hash % 360;
  return `hsl(${h}, 70%, 50%)`;
}

export default NetworkPerformance;