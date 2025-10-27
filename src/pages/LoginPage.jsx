import React, { useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { X, User, Lock, RotateCcw, User2Icon, ArrowLeft, MessageCircle, Mail, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.jsx';
import api from '../config/api.js';

const LoginPage = () => {
  const { setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call for login using axios
      const response = await api.post('api/auth/login', {
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      const data = response.data;

      // Store token if provided
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      if(data.role){
        localStorage.setItem('role', data.role);
      }

      // Create user object
      const userData = {
        name: data.user?.name || formData.email.split('@')[0],
        email: data.user?.email || formData.email,
        role: data.user?.role || formData.role,
        id: data.user?.id
      };

      // If logging in as donor, try to get existing donor data
      if (formData.role === 'donor') {
        const existingDonorData = JSON.parse(localStorage.getItem('donorData') || '{}');
        if (Object.keys(existingDonorData).length > 0) {
          // Merge existing donor data with user data
          const mergedUserData = { ...userData, ...existingDonorData };
          localStorage.setItem('userData', JSON.stringify(mergedUserData));
          localStorage.setItem('donorData', JSON.stringify(mergedUserData));
        } else {
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      } else if (formData.role === 'beneficiary') {
        const existingBeneficiaryData = JSON.parse(localStorage.getItem('beneficiaryData') || '{}');
        if (Object.keys(existingBeneficiaryData).length > 0) {
          // Merge existing beneficiary data with user data
          const mergedUserData = { ...userData, ...existingBeneficiaryData };
          localStorage.setItem('userData', JSON.stringify(mergedUserData));
          localStorage.setItem('beneficiaryData', JSON.stringify(mergedUserData));
        } else {
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      } else {
        localStorage.setItem('userData', JSON.stringify(userData));
      }
      
      // Set user data and navigate to dashboard
      setCurrentUser(userData);
      
      // Navigate based on role
      if (formData.role === 'admin') {
        navigate('/dashboard');
      } else if (formData.role === 'donor') {
        navigate('/dashboard');
      } else if (formData.role === 'volunteer') {
        navigate('/dashboard');
      } else if (formData.role === 'beneficiary') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // For demo purposes, still allow login with demo credentials
      const userData = {
        name: formData.email.split('@')[0],
        email: formData.email,
        role: formData.role
      };
      
      // If logging in as donor, try to get existing donor data
      if (formData.role === 'donor') {
        const existingDonorData = JSON.parse(localStorage.getItem('donorData') || '{}');
        if (Object.keys(existingDonorData).length > 0) {
          // Merge existing donor data with user data
          const mergedUserData = { ...userData, ...existingDonorData };
          localStorage.setItem('userData', JSON.stringify(mergedUserData));
          localStorage.setItem('donorData', JSON.stringify(mergedUserData));
        } else {
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      } else if (formData.role === 'beneficiary') {
        const existingBeneficiaryData = JSON.parse(localStorage.getItem('beneficiaryData') || '{}');
        if (Object.keys(existingBeneficiaryData).length > 0) {
          // Merge existing beneficiary data with user data
          const mergedUserData = { ...userData, ...existingBeneficiaryData };
          localStorage.setItem('userData', JSON.stringify(mergedUserData));
          localStorage.setItem('beneficiaryData', JSON.stringify(mergedUserData));
        } else {
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      } else {
        localStorage.setItem('userData', JSON.stringify(userData));
      }
      
      setCurrentUser(userData);
      
      // Navigate based on role
      if (formData.role === 'admin') {
        navigate('/dashboard');
      } else if (formData.role === 'donor') {
        navigate('/dashboard');
      } else if (formData.role === 'volunteer') {
        navigate('/dashboard');
      } else if (formData.role === 'beneficiary') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
  };

//   const demoCredentials = [
//     { role: 'Admin', email: 'example@orbosis.org', password: 'example123' },
//     { role: 'Volunteer', email: 'example@orbosis.org', password: 'example123' },
//     { role: 'Donor', email: 'example@orbosis.org', password: 'example123' }
//   ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center py-4 sm:py-8">
      <div className="max-w-sm sm:max-w-md w-full mx-auto px-4">
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

        <Card className="w-full relative overflow-visible border-0 shadow-lg bg-white">
        <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
          {/* Icon */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#9333ea] to-[#f59e0b] rounded-full flex items-center justify-center">
                <User2Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#6b21a8] mb-2">
            ORBOSIS login
          </CardTitle>
          
          {/* Subtitle */}
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            Access your account to continue
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6 relative px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Role Dropdown */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="role" className="text-xs sm:text-sm font-medium text-gray-700">
                Role
              </Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-full h-9 sm:h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="z-[60] bg-white border border-gray-200 rounded-md shadow-lg">
                  <SelectItem value="admin" className="bg-white hover:bg-gray-50 text-sm">Admin</SelectItem>
                  <SelectItem value="volunteer" className="bg-white hover:bg-gray-50 text-sm">Volunteer</SelectItem>
                  <SelectItem value="donor" className="bg-white hover:bg-gray-50 text-sm">Donor</SelectItem>
                  <SelectItem value="beneficiary" className="bg-white hover:bg-gray-50 text-sm">Beneficiary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email Field */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">
                Email
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="password" className="text-xs sm:text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none z-10" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="pl-9 sm:pl-12 w-full h-9 sm:h-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  required
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 hover:underline"
                onClick={() => console.log('Forgot password clicked')}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <div className="">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold rounded-lg cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </Button>
            </div>
          </form>

          {/* Signup Link */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-purple-600 hover:text-purple-700 hover:underline font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>

          {/* Contact Options */}
          <div className="pt-4 sm:pt-6 border-t border-gray-200">
            <p className="text-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Need help? Contact us:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
              <a href="https://wa.me/918770702092" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 text-green-600 hover:text-green-700 transition-colors">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">WhatsApp</span>
              </a>
              <a href="mailto:Orbosisfoundation@gmail.com" className="flex items-center justify-center sm:justify-start gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Email</span>
              </a>
              <a href="tel:+918770702092" className="flex items-center justify-center sm:justify-start gap-2 text-purple-600 hover:text-purple-700 transition-colors">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Call</span>
              </a>
            </div>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
