import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Badge } from './ui/badge.jsx';
import { Heart, TrendingUp, Users, Award, Calendar, DollarSign } from 'lucide-react';
import useRealTimeData from '../hooks/useRealTimeData.js';
import RealTimeNotification from './RealTimeNotification.jsx';

const DonorDashboard = () => {
  const [user, setUser] = useState(null);
  const [donorData, setDonorData] = useState(null);
  
  useEffect(() => {
    // Try to get user data from different localStorage keys
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const donorData = JSON.parse(localStorage.getItem('donorData') || '{}');
    
    if (Object.keys(userData).length > 0) {
      setUser(userData);
      setDonorData(userData);
    } else if (Object.keys(donorData).length > 0) {
      setUser(donorData);
      setDonorData(donorData);
    } else {
      // Fallback data - create demo donor data if none exists
      const fallbackUser = {
        name: 'Demo Donor',
        email: 'demo@donor.com',
        totalDonated: 5000,
        donationsCount: 1,
        beneficiariesHelped: 5,
        impactScore: 50,
        donationAmount: 5000,
        donationFrequency: 'One-time',
        donationMode: 'Bank Transfer',
        registrationDate: new Date().toISOString(),
        role: 'donor'
      };
      setUser(fallbackUser);
      setDonorData(fallbackUser);
    }
  }, []);

  // Use local data instead of API calls for now
  const stats = {
    totalDonated: donorData?.donationAmount || 0,
    donationsCount: 1,
    beneficiariesHelped: Math.floor((donorData?.donationAmount || 0) / 1000),
    impactScore: Math.floor((donorData?.donationAmount || 0) / 100),
    lastUpdated: new Date().toISOString()
  };
  
  const recentDonations = donorData ? [{
    id: donorData.id || '1',
    amount: donorData.donationAmount || 0,
    cause: 'Women Empowerment',
    status: 'Completed',
    date: donorData.registrationDate || new Date().toISOString()
  }] : [];
  
  const isLoading = false; // No longer loading from API

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Dashboard...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <RealTimeNotification userId={user?._id} />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || user?.fullName || 'Donor'}!</h1>
          <p className="text-gray-600">Track your donations and see the impact you're making in real-time.</p>
          {stats.lastUpdated && (
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {new Date(stats.lastUpdated).toLocaleTimeString()}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-green-100">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">₹{stats.totalDonated?.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Donated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-blue-100">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stats.donationsCount}</p>
                  <p className="text-sm text-gray-600">Donations Made</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stats.beneficiariesHelped}</p>
                  <p className="text-sm text-gray-600">Lives Impacted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-orange-100">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stats.impactScore}</p>
                  <p className="text-sm text-gray-600">Impact Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Recent Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDonations.map((donation) => (
                  <div key={donation.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">₹{donation.amount.toLocaleString()}</h3>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {donation.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{donation.cause}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(donation.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                Impact Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your contributions have helped educate 50 women, provide healthcare to 80 families, and support 110 children with nutrition.</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Education Programs</span>
                    <span className="font-semibold">50 women</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Healthcare Support</span>
                    <span className="font-semibold">80 families</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Nutrition Programs</span>
                    <span className="font-semibold">110 children</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;