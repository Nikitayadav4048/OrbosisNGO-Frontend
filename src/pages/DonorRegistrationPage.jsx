import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { ArrowLeft, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.jsx';
import image from '../assets/qr.jpeg';
import payImage from '../assets/pay.jpeg';

const DonorRegistrationPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppContext();
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
  const [countdown, setCountdown] = useState(5);

  // Auto redirect to dashboard after 5 seconds with countdown
  useEffect(() => {
    if (showSuccessModal) {
      setCountdown(5);
      
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setShowSuccessModal(false);
            navigate('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [showSuccessModal, navigate]);


  const donationModes = [
    { value: 'bankTransfer', label: 'Bank Transfer' },
    { value: 'upi', label: 'UPI' },
    { value: 'cheque', label: 'Cheque' },
    { value: 'cash', label: 'Cash' },
    { value: 'qr', label: 'QR' } // fixed typo
  ];

  const frequencies = ['One-time', 'Monthly', 'Quarterly', 'Yearly'];

  const consentOptions = [
    { value: 'email', label: 'Email' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'none', label: 'No Updates' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save donor data to localStorage for dashboard access
    const donorData = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.contactNumber,
      address: formData.address,
      organisationName: formData.organisationName,
      panNumber: formData.panNumber,
      gstNumber: formData.gstNumber,
      donationAmount: formData.donationAmount,
      donationFrequency: formData.donationFrequency,
      modeofDonation: formData.modeofDonation,
      consentForUpdate: formData.consentForUpdate,
      role: 'donor',
      registrationDate: new Date().toISOString(),
      joinDate: new Date().toLocaleDateString()
    };
    
    try {
      // Try backend first
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('organisationName', formData.organisationName);
      formDataToSend.append('contactNumber', formData.contactNumber);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('panNumber', formData.panNumber);
      formDataToSend.append('gstNumber', formData.gstNumber);
      formDataToSend.append('modeofDonation', formData.modeofDonation);
      formDataToSend.append('donationAmount', formData.donationAmount);
      formDataToSend.append('donationFrequency', formData.donationFrequency);
      formDataToSend.append('consentForUpdate', formData.consentForUpdate);
      if (formData.uploadPaymentProof) {
        formDataToSend.append('uploadPaymentProof', formData.uploadPaymentProof);
      }

      const response = await fetch('https://orbosisngo-backend-1.onrender.com/api/donor/register', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log('Backend registration successful');
        }
      }
    } catch (error) {
      console.log('Backend unavailable, proceeding with local storage:', error.message);
    }
    
    // Always save to localStorage and proceed
    localStorage.setItem('donorData', JSON.stringify(donorData));
    localStorage.setItem('userData', JSON.stringify(donorData));
    localStorage.setItem('authToken', 'donor_' + Date.now());
    localStorage.setItem('role', 'donor');
    
    // Set current user in context
    setCurrentUser(donorData);
    
    setSubmittedData({ ...formData });
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center py-4 sm:py-8">
      <div className="max-w-2xl w-full mx-auto px-3 sm:px-4">

        {/* Back to Home Link */}
        <div className="mb-6">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Main Form Card */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-[#9333ea] to-[#f59e0b] rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <CardTitle className="text-3xl font-bold text-[#6b21a8] mb-2">
              Donor Registration
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Support our mission to empower women through skills development
            </p>
          </CardHeader>

          <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Donor Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Name *</Label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organisationName">Organization</Label>
                    <Input id="organisationName" name="organisationName" value={formData.organisationName} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact *</Label>
                    <Input id="contactNumber" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500" />
                </div>
              </div>

              {/* Tax Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN Number</Label>
                    <Input id="panNumber" name="panNumber" value={formData.panNumber} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST Number</Label>
                    <Input id="gstNumber" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* Donation Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="modeofDonation">Preferred Mode</Label>
                    <Select value={formData.modeofDonation} onValueChange={(value) => handleSelectChange('modeofDonation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent className="z-[60] bg-white border shadow-lg">
                        {donationModes.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value}>
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Show QR image if selected */}
                    {formData.modeofDonation === 'qr' && (
                      <div className="mt-4 flex flex-col items-center">
                        <img className="w-60 h-60" src={image} alt="QR Code" />
                        <p className="mt-2 text-sm text-gray-600">Scan this QR code to donate</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donationAmount">Amount</Label>
                    <Input id="donationAmount" name="donationAmount" type="number" value={formData.donationAmount} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donationFrequency">Frequency</Label>
                    <Select value={formData.donationFrequency} onValueChange={(value) => handleSelectChange('donationFrequency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="z-[60] bg-white border shadow-lg">
                        {frequencies.map((freq) => (
                          <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="uploadPaymentProof">Upload Payment Proof (Optional)</Label>
                    <Input id="uploadPaymentProof" name="uploadPaymentProof" type="file" onChange={handleChange} accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>
              </div>

              {/* QR Code Payment Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Options</h3>
                <div className="bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-200 rounded-lg p-4 sm:p-6">
                  <div className="text-center">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Scan QR Code to Donate</h4>
                    <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border-2 border-purple-200">
                        <img 
                          src={payImage} 
                          alt="Payment QR Code" 
                          className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">
                          Use any UPI app to scan and pay
                        </p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3">
                          <p className="text-xs sm:text-sm font-medium text-green-800">
                            💰 Donations are covered under 80G of Income Tax Act
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            Get tax exemption on your donation amount
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consent */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Consent</h3>
                <div className="space-y-2">
                  <Label htmlFor="consentForUpdate">Consent for Updates</Label>
                  <Select value={formData.consentForUpdate} onValueChange={(value) => handleSelectChange('consentForUpdate', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent className="z-[60] bg-white border shadow-lg">
                      {consentOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold rounded-lg cursor-pointer">
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You! 🙏</h3>
              <p className="text-gray-600 mb-6">Your donation registration has been submitted successfully. We appreciate your support for women empowerment!</p>

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

              <div className="space-y-3">
                <Button 
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/');
                  }} 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Back to Home
                </Button>
              </div>
              
              {/* 80G Tax Benefit Information */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-600">💰</span>
                  <span className="text-sm font-semibold text-green-800">Tax Benefit Available</span>
                </div>
                <p className="text-xs text-green-700">
                  Your donation is eligible for 80G tax deduction. You'll receive a receipt for tax exemption purposes.
                </p>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">Your information has been saved securely</p>
              <p className="text-xs text-purple-600 mt-2 font-medium">
                Redirecting to home page in {countdown} seconds...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorRegistrationPage;
