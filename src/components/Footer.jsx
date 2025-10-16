import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send, Heart, Users, Award } from 'lucide-react';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit =async (e) => {
    
    await axios.post('http://localhost:5000/api/auth/contactUs',{fullName :formData.name, email :formData.email , contactNumber: formData.phone, message: formData.message} )
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Newsletter Section */}
        <div className="text-center mb-12 pb-8 border-b border-gray-700">
          <h2 className="text-3xl font-bold mb-4 text-purple-300">Stay Connected</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and get updates about our latest programs, events, and impact stories.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Subscribe
            </button>
          </form>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-purple-600 p-4 rounded-full mb-3">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-purple-300">10,000+</h3>
            <p className="text-gray-300">Lives Impacted</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-600 p-4 rounded-full mb-3">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-purple-300">500+</h3>
            <p className="text-gray-300">Active Volunteers</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-600 p-4 rounded-full mb-3">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-purple-300">50+</h3>
            <p className="text-gray-300">Projects Completed</p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-purple-300">Orbosis Foundation</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Dedicated to creating positive change in communities through education, healthcare, and sustainable development. Join us in making a difference in the lives of those who need it most.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-blue-500 hover:bg-gray-700 transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-pink-500 hover:bg-gray-700 transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-blue-600 hover:bg-gray-700 transition-all">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Registered NGO</p>
              <p className="text-purple-300 font-semibold">Registration No: 12345/2020</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-300">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2">→ Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2">→ About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2">→ Contact</Link></li>
              <li><Link to="/membership" className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2">→ Membership</Link></li>
              <li><Link to="/donor-registration" className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2">→ Donate</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2">→ Login</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-300">Our Programs</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2">📚 Education</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2">🏥 Healthcare</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2">🌱 Environment</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2">👩 Women Empowerment</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2">👶 Child Welfare</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-300">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-gray-300 text-sm font-medium">Address</p>
                  <p className="text-gray-400 text-sm">123 NGO Street, Delhi, India 110001</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-gray-300 text-sm font-medium">Phone</p>
                  <p className="text-gray-400 text-sm">+91 8770702092</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-gray-300 text-sm font-medium">Email</p>
                  <p className="text-gray-400 text-sm">Orbosisfoundation@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 Orbosis Foundation. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Made with ❤️ for a better tomorrow
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-gray-400 hover:text-purple-300 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-purple-300 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-purple-300 text-sm transition-colors">Cookie Policy</a>
              <a href="#" className="text-gray-400 hover:text-purple-300 text-sm transition-colors">Transparency</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;