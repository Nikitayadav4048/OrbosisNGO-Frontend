import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Users, Search, Eye, CheckCircle, Clock, X, UserCheck, Mail, Phone } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';

const MembershipApplicationsPage = () => {
  const [activeTab, setActiveTab] = useState('membership-applications');
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvedMember, setApprovedMember] = useState(null);

  useEffect(() => {
    const savedApplications = JSON.parse(localStorage.getItem('membershipApplications') || '[]');
    setApplications(savedApplications);
  }, []);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = (app.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (app.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
    localStorage.setItem('membershipApplications', JSON.stringify(updated));
    
    // If approved, add to members list
    if (newStatus === 'Approved') {
      const approvedApp = applications.find(app => app.id === id);
      if (approvedApp) {
        const existingMembers = JSON.parse(localStorage.getItem('members') || '[]');
        const newMember = {
          _id: Date.now().toString(),
          fullName: approvedApp.fullName,
          email: approvedApp.email,
          contactNumber: approvedApp.phoneNumber,
          address: `${approvedApp.address}, ${approvedApp.city}, ${approvedApp.state}`,
          city: approvedApp.city,
          state: approvedApp.state,
          pinCode: approvedApp.pincode,
          areaOfInterest: approvedApp.areaOfInterest,
          occupation: approvedApp.occupation,
          memberId: `MEM${String(existingMembers.length + 1).padStart(3, '0')}`,
          createdBy: { fullName: 'Admin User' },
          createdAt: new Date().toISOString(),
          role: 'member'
        };
        const updatedMembers = [newMember, ...existingMembers];
        localStorage.setItem('members', JSON.stringify(updatedMembers));
        
        // Trigger storage event to update other tabs
        window.dispatchEvent(new Event('storage'));
      }
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return <CheckCircle className="h-3 w-3" />;
      case 'Rejected': return <X className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Membership Applications</h1>
              <p className="text-sm sm:text-base text-gray-600">Review and manage membership applications</p>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Applications ({filteredApplications.length})
                  </CardTitle>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Pending: {applications.filter(a => a.status === 'Pending').length}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Approved: {applications.filter(a => a.status === 'Approved').length}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 sm:p-6">
                <div className="mb-4 flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Phone</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Interest</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.map((application) => (
                        <tr key={application.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900 text-sm">{application.fullName}</td>
                          <td className="py-3 px-4 text-gray-600 text-sm">{application.email}</td>
                          <td className="py-3 px-4 text-gray-600 text-sm">{application.phoneNumber}</td>
                          <td className="py-3 px-4 text-gray-600 text-sm">{application.areaOfInterest}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(application.status)}`}>
                              {getStatusIcon(application.status)}
                              {application.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {new Date(application.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedApp(application)}
                                className="h-8 px-2"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              {application.status === 'Pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      const memberId = `MEM${String(applications.filter(a => a.status === 'Approved').length + 1).padStart(3, '0')}`;
                                      updateStatus(application.id, 'Approved');
                                      setApprovedMember({ ...application, memberId });
                                      setShowApprovalModal(true);
                                    }}
                                    className="h-8 px-2 bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => updateStatus(application.id, 'Rejected')}
                                    className="h-8 px-2"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredApplications.length === 0 && (
                        <tr>
                          <td colSpan="7" className="py-8 text-center text-gray-500">
                            No applications found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
                <Button variant="ghost" onClick={() => setSelectedApp(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <p className="text-gray-900">{selectedApp.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(selectedApp.status)}`}>
                      {getStatusIcon(selectedApp.status)}
                      {selectedApp.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Mail className="h-3 w-3" /> Email
                    </label>
                    <p className="text-gray-900">{selectedApp.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Phone className="h-3 w-3" /> Phone
                    </label>
                    <p className="text-gray-900">{selectedApp.phoneNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Occupation</label>
                    <p className="text-gray-900">{selectedApp.occupation || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Area of Interest</label>
                    <p className="text-gray-900">{selectedApp.areaOfInterest}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <p className="text-gray-900">{selectedApp.address || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Motivation</label>
                  <p className="text-gray-900">{selectedApp.motivation || 'Not provided'}</p>
                </div>
                
                {selectedApp.status === 'Pending' && (
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      onClick={() => {
                        const memberId = `MEM${String(applications.filter(a => a.status === 'Approved').length + 1).padStart(3, '0')}`;
                        updateStatus(selectedApp.id, 'Approved');
                        setApprovedMember({ ...selectedApp, memberId });
                        setSelectedApp(null);
                        setShowApprovalModal(true);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Application
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        updateStatus(selectedApp.id, 'Rejected');
                        setSelectedApp(null);
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject Application
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approval Success Modal */}
      {showApprovalModal && approvedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 shadow-2xl">
            <div className="p-6 text-center">
              {/* Success Animation */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Application Approved! 🎉
              </h3>
              
              <p className="text-gray-600 mb-6">
                <strong>{approvedMember.fullName}</strong> has been successfully approved and added as a member.
              </p>
              
              {/* Member Details Card */}
              <div className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <UserCheck className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">New Member Created</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member ID:</span>
                    <span className="font-bold text-purple-700">{approvedMember.memberId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{approvedMember.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{approvedMember.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest:</span>
                    <span className="font-medium">{approvedMember.areaOfInterest}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setShowApprovalModal(false);
                    setApprovedMember(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Continue
                </Button>
                <Button
                  onClick={() => {
                    setShowApprovalModal(false);
                    setApprovedMember(null);
                    window.open('/member-management', '_blank');
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  View Members
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                ✅ Member added to Member Management
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipApplicationsPage;