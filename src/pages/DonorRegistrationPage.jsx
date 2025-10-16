import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { ArrowLeft, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import image from '../assets/qr.jpeg';

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
    try {
      const response = await fetch('https://orbosisngo-backend-1.onrender.com/api/donation/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(formData.donationAmount) || 1000,
          modeofDonation: formData.modeofDonation || "upi",
          donorName: formData.fullName || "",
          donorEmail: formData.email || "",
          donorPhone: formData.contactNumber || ""
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
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
      } else {
        alert('Registration failed: ' + (data.message || data.error));
      }
    } catch (error) {
      console.error('Donation registration error:', error);
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center py-8">
      <div className="max-w-2xl w-full mx-auto px-4">

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

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Donor Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="modeofDonation">Preferred Mode</Label>
                    <Select value={formData.modeofDonation} onValueChange={(value) => handleSelectChange('modeofDonation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-white border shadow-lg">
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
                      <SelectContent className="z-50 bg-white border shadow-lg">
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

              {/* Consent */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Consent</h3>
                <div className="space-y-2">
                  <Label htmlFor="consentForUpdate">Consent for Updates</Label>
                  <Select value={formData.consentForUpdate} onValueChange={(value) => handleSelectChange('consentForUpdate', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white border shadow-lg">
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

              <Button onClick={() => setShowSuccessModal(false)} className="w-full bg-purple-600 hover:bg-purple-700">
                Continue
              </Button>
              <p className="text-xs text-gray-500 mt-4">Your information has been saved securely</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorRegistrationPage;
