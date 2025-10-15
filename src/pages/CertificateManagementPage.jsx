import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Award, Search, Download, Plus, Eye, FileText } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';

const CertificateManagementPage = () => {
  const [activeTab, setActiveTab] = useState('certificate-management');
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCertificates([
      { id: 1, recipient: 'Priya Sharma', course: 'Digital Marketing', issueDate: '2024-01-15', status: 'Issued' },
      { id: 2, recipient: 'Anita Devi', course: 'Healthcare Training', issueDate: '2024-01-10', status: 'Pending' },
      { id: 3, recipient: 'Sunita Kumari', course: 'Financial Literacy', issueDate: '2024-01-05', status: 'Issued' }
    ]);
  }, []);

  const filteredCertificates = certificates.filter(cert =>
    (cert.recipient || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cert.course || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePDF = (certificate) => {
    // PDF generation logic would go here
    alert(`Generating PDF for ${certificate.recipient}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Certificate Management</h1>
              <p className="text-gray-600">Issue and manage certificates for completed programs</p>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Certificates ({filteredCertificates.length})
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Certificate
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search certificates..."
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
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Recipient</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Course</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Issue Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCertificates.map((certificate) => (
                        <tr key={certificate.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{certificate.recipient}</td>
                          <td className="py-3 px-4 text-gray-600">{certificate.course}</td>
                          <td className="py-3 px-4 text-gray-600">{certificate.issueDate}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              certificate.status === 'Issued' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {certificate.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => generatePDF(certificate)}
                              >
                                <FileText className="h-4 w-4" />
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

export default CertificateManagementPage;