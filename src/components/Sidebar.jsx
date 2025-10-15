import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils.js';
import { Button } from './ui/button.jsx';
import { ScrollArea } from './ui/scroll-area.jsx';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Heart,
    Award,
    MessageSquare,
    Settings,
    Globe,
    FileText,
    Calendar,
    UserCheck,
    TrendingUp,
    LogOut,
    ChevronDown,
    User
} from 'lucide-react';
import foundation2 from '../assets/Foundation2.png';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const { currentUser, setCurrentUser, sidebarOpen, setSidebarOpen } = useAppContext();


    const { language } = useLanguage();
    const navigate = useNavigate();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Data comes from AppContext which fetches from database
    useEffect(() => {
        setLoading(!currentUser);
    }, [currentUser]);

    const menuItems = [
        // Admin Menu Items
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard,
            roles: ['admin', 'volunteer', 'donor']
        },
        {
            id: 'volunteer-management',
            label: 'Volunteer',
            icon: UserCheck,
            roles: ['admin']
        },
        {
            id: 'member-management',
            label: 'Member',
            icon: Users,
            roles: ['admin']
        },
        {
            id: 'membership-applications',
            label: 'Applications',
            icon: FileText,
            roles: ['admin']
        },
        {
            id: 'beneficiary-management',
            label: 'Beneficiary',
            icon: Heart,
            roles: ['admin']
        },
        {
            id: 'gallery-management',
            label: 'Gallery',
            icon: Settings,
            roles: ['admin']
        },
        {
            id: 'certificate-management',
            label: 'Certificate',
            icon: Award,
            roles: ['admin']
        },

        // Volunteer Menu Items
        {
            id: 'my-tasks',
            label: 'My Tasks',
            icon: FileText,
            roles: ['volunteer']
        },
        {
            id: 'volunteer-profile',
            label: 'My Profile',
            icon: UserCheck,
            roles: ['volunteer']
        },
        {
            id: 'volunteer-events',
            label: 'Events',
            icon: Calendar,
            roles: ['volunteer']
        },

        // Donor Menu Items
        {
            id: 'donation-history',
            label: 'Donation History',
            icon: Heart,
            roles: ['donor']
        },
        {
            id: 'donor-profile',
            label: 'My Profile',
            icon: Users,
            roles: ['donor']
        },
        {
            id: 'donor-impact',
            label: 'Impact Report',
            icon: TrendingUp,
            roles: ['donor']
        },

        // Beneficiary Menu Items
        {
            id: 'my-programs',
            label: 'My Programs',
            icon: Users,
            roles: ['beneficiary']
        },
        {
            id: 'my-certificates',
            label: 'My Certificates',
            icon: Award,
            roles: ['beneficiary']
        },
        {
            id: 'available-events',
            label: 'Events',
            icon: Calendar,
            roles: ['beneficiary']
        }
    ];

    const handleLogout = () => {
        // Clear all data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('role');
        setCurrentUser(null);
        setIsUserMenuOpen(false);
        setSidebarOpen(false);
        navigate('/', { replace: true });
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleMenuClick = (itemId) => {
        // console.log(itemId, "itemId");
        
        setActiveTab(itemId);

        // Navigate to specific pages based on menu item
        switch (itemId) {
            case 'volunteer-management':
                navigate('/volunteer-management');
                break;
            case 'member-management':
                navigate('/member-management');
                break;
            case 'gallery-management':
                navigate('/gallery-management');
                break;
            case 'certificate-management':
                navigate('/certificate-management');
                break;
            case 'beneficiary-management':
                navigate('/beneficiary-management');
                break;
            case 'membership-applications':
                navigate('/membership-applications');
                break;
            case 'dashboard':
                navigate('/dashboard');
                break;
            default:
                // For other items, just set active tab
                break;
        }
    };

    const filteredMenuItems = menuItems.filter(item =>
        item.roles.includes(currentUser?.role || 'member')
    );

    return (
        <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-56 sm:w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                                 {/* Header */}
                 <div className="flex items-center justify-center h-14 sm:h-16 border-b border-gray-200">
                     <div 
                         className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                         onClick={() => navigate('/')}
                     >
                         <img src={foundation2} alt="Orbosis Foundation" className="h-8 sm:h-10 lg:h-12 w-auto" />
                     </div>
                 </div>

                {/* Menu Items - Scrollable */}
                <ScrollArea className="flex-1 px-2 sm:px-3 py-3 sm:py-4">
                    <div className="space-y-1">
                        {filteredMenuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Button
                                    key={item.id}
                                    variant={activeTab === item.id ? 'default' : 'ghost'}
                                    className={cn(
                                        'w-full justify-start cursor-pointer text-sm py-2 px-3',
                                        activeTab === item.id && 'bg-purple-100 text-purple-900 hover:bg-purple-200'
                                    )}
                                    onClick={() => handleMenuClick(item.id)}
                                >
                                    <Icon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="text-xs sm:text-sm">{item.label}</span>
                                </Button>
                            );
                        })}
                    </div>
                </ScrollArea>

                {/* Admin User Info & Dropdown - Fixed at bottom */}
                <div className="mt-auto border-t border-gray-200 p-2 sm:p-4">
                    <div className="relative">
                        {/* User Info Button */}
                        <button
                            onClick={toggleUserMenu}
                            className="w-full flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            disabled={loading}
                        >
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-medium text-xs sm:text-sm">
                                    {loading ? '...' : currentUser?.name?.charAt(0)?.toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                    {loading ? 'Loading...' : currentUser?.name}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">
                                    {loading ? '' : currentUser?.role}
                                </p>
                            </div>
                            <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isUserMenuOpen && (
                            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <div className="py-1">
                                    <button
                                        onClick={() => {
                                            setIsUserMenuOpen(false);
                                            // Navigate to profile based on role
                                            if (currentUser?.role === 'volunteer') {
                                                setActiveTab('volunteer-profile');
                                            } else if (currentUser?.role === 'donor') {
                                                setActiveTab('donor-profile');
                                            } else {
                                                navigate('/profile');
                                            }
                                        }}
                                        className="w-full flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                                    >
                                        <User className="mr-2 sm:mr-3 h-3 w-3 sm:h-4 sm:w-4" />
                                        Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                    >
                                        <LogOut className="mr-2 sm:mr-3 h-3 w-3 sm:h-4 sm:w-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
