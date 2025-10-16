import React, { useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { ArrowLeft, Users, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const VolunteerRegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    contactNumber: '',
    email: '',
    address: '',
    skills: '',
    profession: '',
    areaOfVolunteering: '',
    availability: '',
    emergencyContactNumber: '',
    uploadIdProof: null,
    termsAccepted: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('dob', formData.dob);
      formDataToSend.append('contactNumber', formData.contactNumber);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('skills', formData.skills);
      formDataToSend.append('profession', formData.profession);
      formDataToSend.append('areaOfVolunteering', formData.areaOfVolunteering);
      formDataToSend.append('availability', formData.availability);
      formDataToSend.append('emergencyContactNumber', formData.emergencyContactNumber);
      if (formData.uploadIdProof) {
        formDataToSend.append('uploadIdProof', formData.uploadIdProof);
      }

      const response = await fetch('https://orbosisngo-backend-1.onrender.com/api/volunteer/register', {
        method: 'POST',
        body: formDataToSend
      });
      const data = await response.json();
      if (data.success) {
        alert('Registration successful! Check your email for confirmation.');
        setFormData({
          fullName: '', gender: '', dob: '', contactNumber: '', email: '',
          address: '', skills: '', profession: '', areaOfVolunteering: '',
          availability: '', emergencyContactNumber: '', uploadIdProof: null, termsAccepted: false
        });
      } else {
        alert('Registration failed: ' + (data.message || data.error));
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#9333ea] to-[#f59e0b] rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-[#6b21a8] mb-2">
              Volunteer Registration
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Join our mission to empower women through volunteering
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number *</Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profession">Profession</Label>
                    <Input
                      id="profession"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g., Teaching, IT, Marketing, etc."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Volunteering Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="areaOfVolunteering">Preferred Area *</Label>
                    <Select value={formData.areaOfVolunteering} onValueChange={(value) => handleSelectChange('areaOfVolunteering', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fieldWork">Field Work</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="fundraising">Fundraising</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability *</Label>
                    <Select value={formData.availability} onValueChange={(value) => handleSelectChange('availability', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                        <SelectItem value="weekend">Weekend</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactNumber">Emergency Contact Number *</Label>
                  <Input
                    id="emergencyContactNumber"
                    name="emergencyContactNumber"
                    type="tel"
                    value={formData.emergencyContactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uploadIdProof">Upload ID Proof</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="uploadIdProof"
                      name="uploadIdProof"
                      type="file"
                      onChange={handleChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="flex-1"
                    />
                    <Upload className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the terms and conditions and commit to volunteering responsibly
                  </span>
                </label>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
                >
                  Register as Volunteer
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerRegistrationPage;