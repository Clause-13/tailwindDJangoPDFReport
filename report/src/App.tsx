import React, { useState } from 'react';
import { Download, Printer, ChevronLeft, ChevronRight, BarChart3, PieChart, LineChart, Network, Ticket, AlertTriangle, Clock, Calendar } from 'lucide-react';
import NetworkPerformance from './components/NetworkPerformance';
import TicketAnalysis from './components/TicketAnalysis';
import PoEUtilization from './components/PoEUtilization';
import SwitchPortChanges from './components/SwitchPortChanges';
import FlaggedTickets from './components/FlaggedTickets';
import html2pdf from 'html2pdf.js';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  
  const companyName = "MySky Networks";
  const reportDate = new Date().toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const reportPeriod = "February 2025";
  const clientName = "MUKURU";

  const generatePDF = () => {
    const element = document.getElementById('report-container');
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${clientName}_Network_Report_${reportPeriod}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const renderPageContent = () => {
    switch(currentPage) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Executive Summary</h2>
              <p className="text-gray-700 mb-4">
                This report provides a comprehensive analysis of network performance, power utilization, and support ticket metrics for {clientName} during {reportPeriod}. The data presented here reflects the operational status of all managed network devices and services.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-2">
                    <Network className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-800">Network Availability</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-700">99.8%</p>
                  <p className="text-sm text-blue-600">+0.2% from previous period</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-2">
                    <Ticket className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800">Tickets Resolved</h3>
                  </div>
                  <p className="text-3xl font-bold text-green-700">94%</p>
                  <p className="text-sm text-green-600">Within SLA timeframe</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-purple-600 mr-2" />
                    <h3 className="font-semibold text-purple-800">Critical Incidents</h3>
                  </div>
                  <p className="text-3xl font-bold text-purple-700">3</p>
                  <p className="text-sm text-purple-600">-40% from previous period</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-gray-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Key Performance Indicators</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="py-3 px-4 text-left">Metric</th>
                      <th className="py-3 px-4 text-left">Current</th>
                      <th className="py-3 px-4 text-left">Previous</th>
                      <th className="py-3 px-4 text-left">Change</th>
                      <th className="py-3 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b">
                      <td className="py-3 px-4">Average CPU Usage</td>
                      <td className="py-3 px-4">42%</td>
                      <td className="py-3 px-4">48%</td>
                      <td className="py-3 px-4 text-green-600">-6%</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Good</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Average Memory Usage</td>
                      <td className="py-3 px-4">56%</td>
                      <td className="py-3 px-4">61%</td>
                      <td className="py-3 px-4 text-green-600">-5%</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Good</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">PoE Capacity Utilization</td>
                      <td className="py-3 px-4">68%</td>
                      <td className="py-3 px-4">65%</td>
                      <td className="py-3 px-4 text-yellow-600">+3%</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Monitor</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Switch Port Utilization</td>
                      <td className="py-3 px-4">72%</td>
                      <td className="py-3 px-4">68%</td>
                      <td className="py-3 px-4 text-yellow-600">+4%</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Monitor</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Ticket Resolution Time</td>
                      <td className="py-3 px-4">4.2 hrs</td>
                      <td className="py-3 px-4">5.8 hrs</td>
                      <td className="py-3 px-4 text-green-600">-1.6 hrs</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Good</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 2:
        return <NetworkPerformance />;
      case 3:
        return <PoEUtilization />;
      case 4:
        return <SwitchPortChanges />;
      case 5:
        return (
          <div className="space-y-6">
            <TicketAnalysis />
            <FlaggedTickets />
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div id="report-container" className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-700 text-white p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="mr-4">
                  {/* Replace with your company logo */}
                  <div className="bg-white rounded-full p-2 h-12 w-12 flex items-center justify-center">
                    <Network className="h-8 w-8 text-blue-700" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{companyName}</h1>
                  <p className="text-sm opacity-80">Network Performance Report</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">Report Date</p>
                <p className="font-semibold">{reportDate}</p>
              </div>
            </div>
          </div>
          
          {/* Client Info Bar */}
          <div className="bg-gray-100 p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-500 text-sm">Client:</span>
                <span className="ml-2 font-semibold text-gray-800">{clientName}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Reporting Period:</span>
                <span className="ml-2 font-semibold text-gray-800">{reportPeriod}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Page:</span>
                <span className="ml-2 font-semibold text-gray-800">{currentPage} of {totalPages}</span>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-6">
            {renderPageContent()}
          </div>
          
          {/* Footer */}
          <div className="bg-gray-100 p-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
              </div>
              <div className="text-sm text-gray-500">
                Confidential - For {clientName} use only
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation and Controls */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => window.print()}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
            <button 
              onClick={generatePDF}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;