import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Users, Search, Download, Plus, Edit, Trash2 } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';

const BeneficiaryManagementPage = () => {
  const [activeTab, setActiveTab] = useState('beneficiary-management');
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sample data
  useEffect(() => {
    setBeneficiaries([
      { id: 1, name: 'Priya Sharma', age: 28, location: 'Mumbai', program: 'Skill Development', status: 'Active' },
      { id: 2, name: 'Anita Devi', age: 35, location: 'Delhi', program: 'Healthcare', status: 'Completed' },
      { id: 3, name: 'Sunita Kumari', age: 24, location: 'Kolkata', program: 'Education', status: 'Active' }
    ]);
  }, []);

  const filteredBeneficiaries = beneficiaries.filter(beneficiary =>
    (beneficiary.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (beneficiary.location || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Age,Location,Program,Status\n"
      + beneficiaries.map(b => `${b.name},${b.age},${b.location},${b.program},${b.status}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "beneficiaries.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Beneficiary Management</h1>
              <p className="text-gray-600">Manage program beneficiaries and track their progress</p>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Beneficiaries ({filteredBeneficiaries.length})
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={exportData} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Beneficiary
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search beneficiaries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Age</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Program</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBeneficiaries.map((beneficiary) => (
                        <tr key={beneficiary.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{beneficiary.name}</td>
                          <td className="py-3 px-4 text-gray-600">{beneficiary.age}</td>
                          <td className="py-3 px-4 text-gray-600">{beneficiary.location}</td>
                          <td className="py-3 px-4 text-gray-600">{beneficiary.program}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              beneficiary.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {beneficiary.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryManagementPage;