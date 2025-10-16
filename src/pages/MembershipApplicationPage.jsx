import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { ArrowLeft, UserPlus, Plus, CheckCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const MembershipApplicationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    occupation: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    areaOfInterest: '',
    motivation: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const memberData = {
        fullName: formData.fullName,
        email: formData.email,
        contactNumber: formData.phoneNumber,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        area: formData.areaOfInterest,
        state: formData.state,
        pinCode: formData.pincode,
        specialRequirement: formData.motivation,
        age: 25, // Default age
        gender: 'female' // Default gender
      };
      
      const response = await fetch('https://orbosisngo-backend-1.onrender.com/api/member/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
      });
      const data = await response.json();
      if (data.success) {
        setShowSuccessModal(true);
        setFormData({
          fullName: '', email: '', phoneNumber: '', occupation: '',
          address: '', city: '', state: '', pincode: '', areaOfInterest: '', motivation: ''
        });
      } else {
        alert('Application failed: ' + data.error);
      }
    } catch (error) {
      alert('Application failed: ' + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      areaOfInterest: value
    }));
  };

  const areasOfInterest = [
    'Digital Skills Training',
    'Entrepreneurship Development',
    'Health & Wellness',
    'Education & Literacy',
    'Community Development',
    'Leadership Training',
    'Financial Literacy',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 py-4 sm:py-8 lg:py-15">
      <div className="max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto px-4">
        {/* Back to Home Link */}
        <div className="mb-4 sm:mb-6">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Main Form Card */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
            {/* Icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#9333ea] to-[#f59e0b] rounded-full flex items-center justify-center">
                  <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#6b21a8] mb-2">
              Apply for Membership
            </CardTitle>
            
            {/* Subtitle */}
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-2">
              Join Orbosis Foundation and be part of women empowerment
            </p>
          </CardHeader>

          <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Personal Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="fullName" className="text-xs sm:text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full h-9 sm:h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                      Phone Number *
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation" className="text-sm font-medium text-gray-700">
                      Occupation
                    </Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      type="text"
                      value={formData.occupation}
                      onChange={handleChange}
                      className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Details</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                      Address
                    </Label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                        City
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                        State
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode" className="text-sm font-medium text-gray-700">
                        Pincode
                      </Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        type="text"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Interests and Motivation Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests and Motivation</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="areaOfInterest" className="text-sm font-medium text-gray-700">
                      Areas of Interest
                    </Label>
                    <Select value={formData.areaOfInterest} onValueChange={handleSelectChange}>
                      <SelectTrigger className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                        <SelectValue placeholder="Select your area of interest" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-white border border-gray-200 rounded-md shadow-lg">
                        {areasOfInterest.map((area) => (
                          <SelectItem key={area} value={area} className="bg-white hover:bg-gray-50">
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="text-sm font-medium text-gray-700">
                      Why do you want to join Orbosis Foundation?
                    </Label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your motivation to join our mission..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold rounded-lg cursor-pointer"
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full mx-4 relative shadow-lg">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
              
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Application Submitted Successfully!
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in joining Orbosis Foundation. We will review your application and contact you soon.
                </p>
                
                <Button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipApplicationPage;
