import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Label } from './ui/label.jsx';
import { User, Mail, Phone, MapPin, Edit, Save, X, Heart } from 'lucide-react';
import { donorApi } from '../services/donorApi.js';

const DonorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({});
  const [editedProfile, setEditedProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await donorApi.getProfile();
        setProfile(data);
        setEditedProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Fallback to localStorage
        const donorData = localStorage.getItem('donorData');
        if (donorData) {
          const parsedData = JSON.parse(donorData);
          const profileData = {
            fullName: parsedData.name || 'Donor',
            email: parsedData.email || '',
            phone: parsedData.phone || '',
            address: parsedData.address || '',
            organization: parsedData.organization || '',
            joinDate: new Date(parsedData.registrationDate).toLocaleDateString(),
            totalDonated: parsedData.donationAmount || 0,
            donationsCount: 1,
            donationFrequency: parsedData.donationFrequency || 'One-time',
            donationMode: parsedData.donationMode || 'Bank Transfer',
            panNumber: parsedData.panNumber || '',
            gstNumber: parsedData.gstNumber || '',
            preferredCauses: ['Women Empowerment']
          };
          setProfile(profileData);
          setEditedProfile(profileData);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await donorApi.updateProfile(editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Profile...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your donor profile information.</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {profile.fullName?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profile.fullName}</h2>
                    <p className="text-gray-600">Valued Donor</p>
                    <p className="text-sm text-gray-500">Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{profile.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{profile.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      {isEditing ? (
                        <Input
                          id="address"
                          value={editedProfile.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{profile.address}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      {isEditing ? (
                        <Input
                          id="city"
                          value={editedProfile.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">
                          <span>{profile.city}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      {isEditing ? (
                        <Input
                          id="state"
                          value={editedProfile.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">
                          <span>{profile.state}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donation Details Section */}
            <Card className="border-0 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-purple-600" />
                  Donation Registration Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Organization</Label>
                    <div className="p-2 bg-gray-50 rounded-md">
                      <span>{profile.organization || 'Not specified'}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Donation Amount</Label>
                    <div className="p-2 bg-gray-50 rounded-md">
                      <span className="font-semibold text-green-600">₹{profile.totalDonated?.toLocaleString() || '0'}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Donation Frequency</Label>
                    <div className="p-2 bg-gray-50 rounded-md">
                      <span>{profile.donationFrequency}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Mode</Label>
                    <div className="p-2 bg-gray-50 rounded-md">
                      <span>{profile.donationMode}</span>
                    </div>
                  </div>

                  {profile.panNumber && (
                    <div className="space-y-2">
                      <Label>PAN Number</Label>
                      <div className="p-2 bg-gray-50 rounded-md">
                        <span>{profile.panNumber}</span>
                      </div>
                    </div>
                  )}

                  {profile.gstNumber && (
                    <div className="space-y-2">
                      <Label>GST Number</Label>
                      <div className="p-2 bg-gray-50 rounded-md">
                        <span>{profile.gstNumber}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Registration Date</span>
                    <span className="font-semibold">{profile.joinDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Donation Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600 mb-1">₹{profile.totalDonated?.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Contributed</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Donations</span>
                    <span className="font-semibold">{profile.donationsCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Donation</span>
                    <span className="font-semibold">₹{Math.round(profile.totalDonated / profile.donationsCount).toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preferred Causes</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.preferredCauses?.map((cause, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {cause}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;