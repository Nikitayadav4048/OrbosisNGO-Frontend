import React, { createContext, useContext, useState, useEffect } from 'react';
// import { toast } from '@/components/ui/use-toast.jsx';

const AppContext = createContext(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [members, setMembers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);

  // Initialize user from localStorage only if exists
  useEffect(() => {
    const initializeUser = () => {
      // Check if user is on home page and clear auth data
      if (window.location.pathname === '/') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('role');
        setCurrentUser(null);
        return;
      }
      
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setCurrentUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    initializeUser();
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const generateId = () => {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}_${randomPart}`;
  };
  const generateQRCode = () => `QR_${generateId()}`;

  const addMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: generateId(),
    };
    setMembers(prev => [...prev, newMember]);
    console.log('Member added successfully');
  };

  const updateMember = (id, updates) => {
    setMembers(prev => prev.map(member => 
      member.id === id ? { ...member, ...updates } : member
    ));
    console.log('Member updated successfully');
  };

  const deleteMember = (id) => {
    setMembers(prev => prev.filter(member => member.id !== id));
    console.log('Member deleted successfully');
  };

  const addDonation = (donationData) => {
    const newDonation = {
      ...donationData,
      id: generateId(),
      receiptId: `RCP_${generateId()}`,
      qrCode: generateQRCode(),
    };
    setDonations(prev => [...prev, newDonation]);
    console.log('Donation recorded successfully');
  };

  const addCertificate = (certificateData) => {
    const newCertificate = {
      ...certificateData,
      id: generateId(),
      qrCode: generateQRCode(),
    };
    setCertificates(prev => [...prev, newCertificate]);
    console.log('Certificate issued successfully');
  };

  const sendMessage = (messageData) => {
    const newMessage = {
      ...messageData,
      id: generateId(),
      date: new Date().toISOString(),
      read: false,
    };
    setMessages(prev => [...prev, newMessage]);
    console.log('Message sent successfully');
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        currentUser,
        setCurrentUser,
        members,
        setMembers,
        donations,
        setDonations,
        certificates,
        setCertificates,
        messages,
        setMessages,
        addMember,
        updateMember,
        deleteMember,
        addDonation,
        addCertificate,
        sendMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
