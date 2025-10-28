import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Badge } from './ui/badge.jsx';
import { Input } from './ui/input.jsx';
import { Search, Calendar, Heart, Download } from 'lucide-react';
import { donorApi } from '../services/donorApi.js';

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await donorApi.getDonations();
        setDonations(data);
      } catch (error) {
        console.error('Error fetching donations:', error);
        // Fallback to mock data
        setDonations([
          { id: 1, amount: 5000, date: '2024-01-15', cause: 'Education', method: 'UPI', receipt: 'RCP001', status: 'completed' },
          { id: 2, amount: 10000, date: '2024-01-10', cause: 'Healthcare', method: 'Bank Transfer', receipt: 'RCP002', status: 'completed' },
          { id: 3, amount: 2500, date: '2024-01-05', cause: 'Food Support', method: 'Credit Card', receipt: 'RCP003', status: 'completed' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDonations();
  }, []);

  const filteredDonations = donations.filter(donation =>
    (donation.cause || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (donation.receipt || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Donations...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Donation History</h1>
          <p className="text-gray-600">View and manage your donation records.</p>
        </div>

        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search donations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredDonations.map((donation) => (
            <Card key={donation.id} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-green-100">
                      <Heart className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">₹{donation.amount.toLocaleString()}</h3>
                      <p className="text-sm text-gray-600">{donation.cause}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {donation.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(donation.date).toLocaleDateString()}</span>
                  </div>
                  <div>Payment: {donation.method}</div>
                  <div>Receipt: {donation.receipt}</div>
                  <div className="flex gap-2">
                    <button className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      Receipt
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;