import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { ArrowLeft, Heart, Check, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonorRegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    organisationName: '',
    contactNumber: '',
    email: '',
    address: '',
    panNumber: '',
    gstNumber: '',
    modeofDonation: '',
    donationAmount: '',
    donationFrequency: '',
    consentForUpdate: '',
    uploadPaymentProof: null
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('donorName', formData.fullName);
      formDataToSend.append('organisationName', formData.organisationName);
      formDataToSend.append('contactNumber', formData.contactNumber);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('panNumber', formData.panNumber);
      formDataToSend.append('gstNumber', formData.gstNumber);
      formDataToSend.append('modeofDonation', formData.modeofDonation);
      formDataToSend.append('amount', formData.donationAmount);
      formDataToSend.append('donationFrequency', formData.donationFrequency);
      formDataToSend.append('consentForUpdate', formData.consentForUpdate);
      if (formData.uploadPaymentProof) {
        formDataToSend.append('uploadPaymentProof', formData.uploadPaymentProof);
      }

      const response = await fetch('http://localhost:5000/api/donation/createOrder', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          donorName: formData.fullName,
          organisationName: formData.organisationName,
          contactNumber: formData.contactNumber,
          email: formData.email,
          address: formData.address,
          panNumber: formData.panNumber,
          gstNumber: formData.gstNumber,
          modeofDonation: formData.modeofDonation,
          amount: parseFloat(formData.donationAmount) || 0,
          donationFrequency: formData.donationFrequency,
          consentForUpdate: formData.consentForUpdate
        })
      });
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Backend server is not running. Please start the server and try again.');
      }

      const data = await response.json();
      
      if (data.success) {
        // Store submitted data for modal
        setSubmittedData({ ...formData });
        
        // Show success modal
        setShowSuccessModal(true);
        
        // Clear form
        setFormData({
          fullName: '',
          organisationName: '',
          contactNumber: '',
          email: '',
          address: '',
          panNumber: '',
          gstNumber: '',
          modeofDonation: '',
          donationAmount: '',
          donationFrequency: '',
          consentForUpdate: '',
          uploadPaymentProof: null
        });
      } else {
        alert('Registration failed: ' + (data.message || data.error));
      }
    } catch (error) {
      console.error('Donation registration error:', error);
      if (error.message.includes('Backend server')) {
        alert('Backend server is not running. Please start the server first.');
      } else if (error.name === 'SyntaxError') {
        alert('Backend server is not responding. Please check if the server is running.');
      } else {
        alert('Registration failed: ' + error.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const donationModes = ['bankTransfer', 'upi', 'cheque', 'cash'];
  const frequencies = ['One-time', 'Monthly', 'Quarterly', 'Yearly'];
  const consentOptions = ['email', 'whatsapp', 'none'];
  useEffect(() => {
  window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center py-8">
      <div className="max-w-2xl w-full mx-auto px-4">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Main Form Card */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="text-center pb-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-[#9333ea] to-[#f59e0b] rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <CardTitle className="text-3xl font-bold text-[#6b21a8] mb-2">
              Donor Registration
            </CardTitle>
            
            {/* Subtitle */}
            <p className="text-gray-600 text-lg">
              Support our mission to empower women through skills development
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organisationName">Organization</Label>
                    <Input
                      id="organisationName"
                      name="organisationName"
                      value={formData.organisationName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact *</Label>
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
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN Number</Label>
                    <Input
                      id="panNumber"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST Number</Label>
                    <Input
                      id="gstNumber"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="modeofDonation">Preferred Mode</Label>
                    <Select value={formData.modeofDonation} onValueChange={(value) => handleSelectChange('modeofDonation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {donationModes.map((mode) => (
                          <SelectItem key={mode} value={mode}>
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donationAmount">Amount</Label>
                    <Input
                      id="donationAmount"
                      name="donationAmount"
                      type="number"
                      value={formData.donationAmount}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donationFrequency">Frequency</Label>
                    <Select value={formData.donationFrequency} onValueChange={(value) => handleSelectChange('donationFrequency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencies.map((freq) => (
                          <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="uploadPaymentProof">Upload Payment Proof (Optional)</Label>
                    <Input
                      id="uploadPaymentProof"
                      name="uploadPaymentProof"
                      type="file"
                      onChange={handleChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Consent</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="consentForUpdate">Consent for Updates</Label>
                  <Select value={formData.consentForUpdate} onValueChange={(value) => handleSelectChange('consentForUpdate', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {consentOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold rounded-lg cursor-pointer"
                >
                  Register as Donor
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 shadow-2xl">
            <div className="p-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Heart className="h-10 w-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Thank You! 🙏
              </h3>
              
              <p className="text-gray-600 mb-6">
                Your donation registration has been submitted successfully. We appreciate your support for women empowerment!
              </p>
              
              <div className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Donation Registered</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-green-700">₹{submittedData?.donationAmount || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-medium">{submittedData?.donationFrequency || 'One-time'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mode:</span>
                    <span className="font-medium">{submittedData?.modeofDonation ? submittedData.modeofDonation.charAt(0).toUpperCase() + submittedData.modeofDonation.slice(1) : 'Not specified'}</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Continue
              </Button>
              
              <p className="text-xs text-gray-500 mt-4">
                ✅ Your information has been saved securely
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorRegistrationPage;
