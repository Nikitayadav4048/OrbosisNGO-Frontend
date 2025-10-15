import React, { useState, useEffect } from 'react'
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar.jsx';
import { Button } from '../components/ui/button';
import { ArrowLeft, UserPlus, X, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import logo from "../assets/Foundation2.png"
import { Label } from '../components/ui/label.jsx';
import { Input } from '../components/ui/input';
import api from '../config/api';

const GalleryManagementPage = () => {
    const [activeTab, setActiveTab] = useState('gallery-management');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [galleryItems, setGalleryItems] = useState([]);
    const [isLoadingGallery, setIsLoadingGallery] = useState(true);
    const [formData, setFormData] = useState({
        galleryImages: [],
        youtubeVideo: []
    });
    const [currentVideo, setCurrentVideo] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Load gallery items from localStorage (offline mode)
    useEffect(() => {
        const loadGallery = () => {
            try {
                setIsLoadingGallery(true);
                const savedGallery = localStorage.getItem('galleryItems');
                if (savedGallery) {
                    setGalleryItems(JSON.parse(savedGallery));
                } else {
                    setGalleryItems([]);
                }
            } catch (error) {
                setGalleryItems([]);
            } finally {
                setIsLoadingGallery(false);
            }
        };
        loadGallery();
    }, []);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            if (!formData.galleryImages?.length && !formData.youtubeVideo?.length) {
                alert('Please add at least one image or video');
                return;
            }

            // Create new gallery item (offline mode)
            const newItem = {
                _id: Date.now().toString(),
                galleryImages: formData.galleryImages ? Array.from(formData.galleryImages).map(file => URL.createObjectURL(file)) : [],
                youtubeVideo: formData.youtubeVideo || [],
                createdAt: new Date().toISOString()
            };

            const updatedGallery = [newItem, ...galleryItems];
            setGalleryItems(updatedGallery);
            
            // Save to localStorage
            localStorage.setItem('galleryItems', JSON.stringify(updatedGallery));
            
            closeModal();
            setFormData({
                galleryImages: [],
                youtubeVideo: []
            });
            setCurrentVideo("");
            setShowSuccessModal(true);
            
            // Auto close success modal after 3 seconds
            setTimeout(() => {
                setShowSuccessModal(false);
            }, 3000);
        } catch (error) {
            alert('Failed to add gallery item. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect(()=>{
    //     try {
    //         const handleGallery = async()=>{
    //             const response = await api.get('api/')
    //         }
    //     } catch (error) {
            
    //     }
    // })

    return (
        <>
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Dashboard Header */}
                <DashboardHeader />
                
                {/* Main Content Area */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Gallery Management</h2>
                        </div>
                    </div>
                <Card className="bg-white shadow-sm border-0">
                    <CardContent className="p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <ImageIcon className="h-5 w-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">Gallery Items ({galleryItems.length})</h2>
                            </div>

                            <Button
                                onClick={openModal}
                                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                            >
                                Add Gallery Item
                            </Button>
                        </div>

                        {/* Gallery Items Display */}
                        {isLoadingGallery ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Gallery...</h3>
                                <p className="text-gray-500">Please wait while we fetch gallery items.</p>
                            </div>
                        ) : galleryItems.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ImageIcon className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No Gallery Items</h3>
                                <p className="text-gray-500 mb-6">Start by adding your first gallery item.</p>
                                <Button
                                    onClick={openModal}
                                    className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                                >
                                    Add Gallery Item
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {galleryItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="space-y-3">
                                            {item.galleryImages && item.galleryImages.length > 0 && (
                                                <div>
                                                    <h4 className="font-medium text-gray-900 mb-2">Images ({item.galleryImages.length})</h4>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {item.galleryImages.slice(0, 4).map((img, idx) => (
                                                            <img
                                                                key={idx}
                                                                src={img}
                                                                alt={`Gallery ${idx + 1}`}
                                                                className="w-full h-20 object-cover rounded-lg"
                                                                onError={(e) => {
                                                                    e.target.src = '/placeholder.png';
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {item.youtubeVideo && item.youtubeVideo.length > 0 && (
                                                <div>
                                                    <h4 className="font-medium text-gray-900 mb-2">Videos ({item.youtubeVideo.length})</h4>
                                                    <div className="space-y-1">
                                                        {item.youtubeVideo.slice(0, 2).map((video, idx) => (
                                                            <p key={idx} className="text-sm text-blue-600 truncate">
                                                                {video}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <p className="text-xs text-gray-500">
                                                Added: {new Date(item.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
                </div>
            </div>
        </div>
        
        {/* Add Gallery Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="max-w-2xl w-full mx-auto max-h-[85vh] overflow-y-auto scrollbar-hide">


                        {/* Main Form Card */}
                        <Card className="bg-white shadow-lg border-0">
                            {/* Close Button */}
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                >
                                    <X className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                            <CardHeader className="text-center pb-8">
                                {/* Icon */}
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        <div className="flex justify-center mb-4">
                                            <img src={logo} alt="logo" className='w-40 h-20' />
                                        </div>
                                    </div>
                                </div>

                                {/* Title */}
                                <CardTitle className="text-3xl font-bold text-[#6b21a8] mb-2">
                                    Gallery Management
                                </CardTitle>

                                {/* Subtitle */}
                                <p className="text-gray-600 text-lg">
                                    Join our mission to empower women through skills development
                                </p>
                            </CardHeader>

                            <CardContent className="px-8 pb-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Personal Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery Add</h3>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                                                    Upload Image *
                                                </Label>
                                                <Input
                                                    id="galleryImages"
                                                    type="file"
                                                    multiple
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            galleryImages: Array.from(e.target.files), // ✅ actual files array
                                                        })
                                                    }
                                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                />

                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700">
                                                    Upload Video (URL) *
                                                </Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="text"
                                                        value={currentVideo}
                                                        onChange={(e) => setCurrentVideo(e.target.value)}
                                                        placeholder="Enter your video url"
                                                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClick={() => {
                                                            if (currentVideo.trim() !== "") {
                                                                setFormData({
                                                                    ...formData,
                                                                    youtubeVideo: [...formData.youtubeVideo, currentVideo],
                                                                });
                                                                setCurrentVideo("");
                                                            }
                                                        }}
                                                        className="bg-blue-600 text-white"
                                                    >
                                                        Add
                                                    </Button>
                                                </div>

                                                {/* Show added videos */}
                                                {/* <ul className="list-disc ml-6 mt-2 text-sm text-gray-700">
                                                    {formData.youtubeVideo.map((video, idx) => (
                                                        <li key={idx}>{video}</li>
                                                    ))}
                                                </ul> */}
                                            </div>


                                        </div>
                                    </div>


                                    {/* Form Actions */}
                                    <div className="pt-6 flex gap-3 justify-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={closeModal}
                                            className="px-6 py-2 cursor-pointer"
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <span>Add Gallery...</span>
                                                </div>
                                            ) : (
                                                'Add Gallery'
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

        {/* Success Modal */}
        {showSuccessModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform animate-in zoom-in-95 duration-300">
                    <div className="p-8 text-center">
                        {/* Success Icon */}
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        
                        {/* Success Message */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Upload Successful!
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Your gallery item has been added successfully and is now visible in the gallery.
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
                            >
                                Great!
                            </button>
                            <button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    openModal();
                                }}
                                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors cursor-pointer"
                            >
                                Add More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default GalleryManagementPage