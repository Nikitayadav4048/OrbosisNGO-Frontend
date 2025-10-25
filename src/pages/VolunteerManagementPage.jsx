import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api.js';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Textarea } from '../components/ui/textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx';
import { UserPlus, Search, MoreVertical, X, Upload, Download } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { exportToExcel, exportToPDF } from '../utils/exportUtils.js';
import logo from "../assets/Foundation2.png"
const VolunteerManagementPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('volunteer-management');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volunteers, setVolunteers] = useState([]);

  const [isLoadingVolunteers, setIsLoadingVolunteers] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    contactNumber: '',
    email: '',
    password: '',
    address: '',
    area: '',
    state: '',
    profession: '',
    skills: [],
    preferredArea: '',
    availability: '',
    emergencyContact: '',
    idProof: null
  });
  const [newSkill, setNewSkill] = useState('');

  // Fetch volunteers on component mount
  useEffect(() => {
    fetchVolunteers();
  }, []);

  // Fetch volunteers from API
  const fetchVolunteers = async () => {
    try {
      setIsLoadingVolunteers(true);
      const response = await fetch('https://orbosisngo-backend-1.onrender.com/api/volunteer/all');
      const data = await response.json();
      if (data.success) {
        setVolunteers(data.volunteers);
      } else {
        // Fallback to demo data
        const demoVolunteers = [
          {
            _id: '1',
            fullName: 'Priya Sharma',
            email: 'priya@example.com',
            contactNumber: '+91 98765 43210',
            area: 'Mumbai',
            state: 'Maharashtra',
            skills: ['Teaching', 'Communication'],
            createdAt: '2024-01-15',
            createdBy: { fullName: 'Admin User' }
          }
        ];
        setVolunteers(demoVolunteers);
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      setVolunteers([]);
    } finally {
      setIsLoadingVolunteers(false);
    }
  };

  const filteredVolunteers = Array.isArray(volunteers) ? volunteers.filter(volunteer => {
    const matchesSearch = volunteer.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }) : [];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      idProof: file
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create new volunteer (offline mode)
      const newVolunteer = {
        _id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        createdBy: { fullName: 'Admin User' }
      };

      const updatedVolunteers = [newVolunteer, ...volunteers];
      setVolunteers(updatedVolunteers);
      localStorage.setItem('volunteers', JSON.stringify(updatedVolunteers));
      
      alert('Volunteer created successfully!');
    } catch (error) {
      alert('Failed to create volunteer. Please try again.');
    }

    // Reset form and close modal
    setFormData({
      fullName: '',
      gender: '',
      dateOfBirth: '',
      age: '',
      contactNumber: '',
      email: '',
      password: '',
      address: '',
      area: '',
      state: '',
      profession: '',
      skills: [],
      preferredArea: '',
      availability: '',
      emergencyContact: '',
      idProof: null
    });
    setNewSkill('');
    setIsModalOpen(false);
    setIsLoading(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleVolunteerClick = (volunteerId) => {
    navigate(`/volunteer-detail/${volunteerId}`);
  };

  return (
    <>
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Header */}
        <DashboardHeader />
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-900 mb-2">Volunteers Management</h1>
          </div>

          {/* Main Content Card */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-8">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Volunteer Applications</h2>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => exportToExcel(volunteers, 'volunteers')}
                    className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button
                    onClick={openModal}
                    className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  >
                    Add Volunteer
                  </Button>
                </div>
              </div>

              {/* Search Section */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search volunteers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Content Section */}
              {isLoadingVolunteers ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Volunteers...</h3>
                  <p className="text-gray-500">Please wait while we fetch the volunteer data.</p>
                </div>
              ) : filteredVolunteers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm
                      ? 'No volunteers match your current search criteria.'
                      : 'There are currently no volunteer applications.'
                    }
                  </p>
                  <Button
                    onClick={openModal}
                    className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  >
                    Add Volunteer
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVolunteers.map((volunteer) => (
                    <div
                      key={volunteer.id || volunteer._id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group cursor-pointer"
                      onClick={() => handleVolunteerClick(volunteer._id || volunteer.id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              {volunteer.profilePic ? (
                                <img
                                  src={volunteer.profilePic}
                                  alt={volunteer.fullName || "User"}
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <span className="text-blue-600 font-semibold text-sm">
                                  {(volunteer.fullName || volunteer.name || "M")
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{volunteer.fullName || volunteer.name || 'Unknown'}</h3>
                              <p className="text-sm text-gray-500">{volunteer.email || 'No email'}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                            <span>📞 {volunteer.contactNumber || volunteer.phone || 'No contact'}</span>
                            <span>📍 {volunteer.area && volunteer.state ? `${volunteer.area}, ${volunteer.state}` : volunteer.location || 'No location'}</span>
                            <span>📅 Joined: {volunteer.createdAt ? new Date(volunteer.createdAt).toLocaleDateString() : volunteer.joinDate ? new Date(volunteer.joinDate).toLocaleDateString() : 'Unknown'}</span>
                            <span>👤 Created : {volunteer?.createdBy?.fullName
                              || 'N/A'}</span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {volunteer.skills && volunteer.skills.length > 0 ? (
                              volunteer.skills.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  {skill}
                                </span>
                              ))
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                No skills listed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stats Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{volunteers.length}</div>
                  <div className="text-sm text-gray-500">Total Volunteers</div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>

    {/* Add Volunteer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full mx-auto max-h-[85vh] overflow-y-auto scrollbar-hide">


            {/* Main Form Card */}
            <Card className="bg-white shadow-lg border-0">
              {/* Close Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <CardHeader className="text-center pb-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="flex justify-center mb-4">
                      <img src={logo} alt="logo" className='w-40 h-20' />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <CardTitle className="text-3xl font-bold text-[#6b21a8] mb-2">
                  Volunteer Registration
                </CardTitle>

                {/* Subtitle */}
                <p className="text-gray-600 text-lg">
                  Join our mission to empower women through skills development
                </p>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                            Gender *
                          </Label>
                          <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                            <SelectTrigger className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent className="z-[60] bg-white border border-gray-200 rounded-md shadow-lg">
                              <SelectItem value="male" className="bg-white hover:bg-gray-50 cursor-pointer">Male</SelectItem>
                              <SelectItem value="female" className="bg-white hover:bg-gray-50 cursor-pointer">Female</SelectItem>
                              <SelectItem value="other" className="bg-white hover:bg-gray-50 cursor-pointer">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                            Date of Birth *
                          </Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                          Age *
                        </Label>
                        <Input
                          id="age"
                          type="number"
                          value={formData.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          placeholder="Enter your age"
                          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactNumber" className="text-sm font-medium text-gray-700">
                            Contact Number *
                          </Label>
                          <Input
                            id="contactNumber"
                            type="tel"
                            value={formData.contactNumber}
                            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email ID *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="volunteer@example.com"
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                          Password *
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          placeholder="Enter password"
                          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>


                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700">
                          Emergency Contact (Optional)
                        </Label>
                        <Input
                          id="emergencyContact"
                          type="tel"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                          Address *
                        </Label>
                        <textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          rows={3}
                          placeholder="Enter complete address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                            City *
                          </Label>
                          <Input
                            id="city"
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="Enter city"
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                            State *
                          </Label>
                          <Input
                            id="state"
                            type="text"
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            placeholder="Enter state"
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="profession" className="text-sm font-medium text-gray-700">
                          Profession *
                        </Label>
                        <Input
                          id="profession"
                          type="text"
                          value={formData.profession}
                          onChange={(e) => handleInputChange('profession', e.target.value)}
                          placeholder="e.g., Teacher, Engineer, Designer"
                          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Skills *
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill"
                            className="flex-1 h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                          />
                          <Button
                            type="button"
                            onClick={addSkill}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer"
                          >
                            Add
                          </Button>
                        </div>

                        {/* Skills Display */}
                        {formData.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  className="ml-1 hover:text-purple-600 cursor-pointer"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredArea" className="text-sm font-medium text-gray-700">
                        Preferred Area of Volunteering *
                      </Label>
                      <Select value={formData.preferredArea} onValueChange={(value) => handleInputChange('preferredArea', value)}>
                        <SelectTrigger className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                          <SelectValue placeholder="Select preferred area" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white border border-gray-200 rounded-md shadow-lg">
                          <SelectItem value="field-work" className="bg-white hover:bg-gray-50 cursor-pointer">Field Work</SelectItem>
                          <SelectItem value="online" className="bg-white hover:bg-gray-50 cursor-pointer">Online</SelectItem>
                          <SelectItem value="fundraising" className="bg-white hover:bg-gray-50 cursor-pointer">Fundraising</SelectItem>
                          <SelectItem value="training" className="bg-white hover:bg-gray-50 cursor-pointer">Training</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability" className="text-sm font-medium text-gray-700">
                        Availability *
                      </Label>
                      <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                        <SelectTrigger className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                          <SelectValue placeholder="Select your availability" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white border border-gray-200 rounded-md shadow-lg">
                          <SelectItem value="morning" className="bg-white hover:bg-gray-50 cursor-pointer">Morning</SelectItem>
                          <SelectItem value="afternoon" className="bg-white hover:bg-gray-50 cursor-pointer">Afternoon</SelectItem>
                          <SelectItem value="evening" className="bg-white hover:bg-gray-50 cursor-pointer">Evening</SelectItem>
                          <SelectItem value="weekend" className="bg-white hover:bg-gray-50 cursor-pointer">Weekend (Saturday & Sunday)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Upload (Optional)</h3>

                    <div className="space-y-2">
                      <Label htmlFor="idProof" className="text-sm font-medium text-gray-700">
                        Upload ID Proof
                      </Label>
                      <Input
                        id="idProof"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                      <p className="text-xs text-gray-500">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="pt-6 flex gap-3 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={closeModal}
                      className="px-6 py-2 cursor-pointer"
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Registering...</span>
                        </div>
                      ) : (
                        'Register as Volunteer'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default VolunteerManagementPage;
