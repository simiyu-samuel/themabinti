import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, MapPin, Clock, Smartphone, Calendar, MessageCircle, 
  ArrowLeft, Share2, Heart, User, Phone, Mail, CheckCircle 
} from 'lucide-react';
import { useApiQuery, useApiMutation } from '../hooks/useApi';
import { Service, ApiResponse } from '../types';
import { useAuthStore } from '../store/auth';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { GradientText } from '../components/ui/GradientText';
import { formatCurrency, generateWhatsAppUrl } from '../lib/utils';
import toast from 'react-hot-toast';

export const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    preferred_date: '',
    preferred_time: '',
    notes: '',
  });

  // Fetch service details
  const { data: serviceData, isLoading } = useApiQuery<ApiResponse<Service>>(
    ['service', id!],
    `/services/${id}`,
    { enabled: !!id }
  );

  // Book service mutation
  const bookServiceMutation = useApiMutation(
    '/bookings',
    'post',
    {
      onSuccess: () => {
        toast.success('Booking request sent successfully!');
        setShowBookingForm(false);
        setBookingData({ preferred_date: '', preferred_time: '', notes: '' });
      },
      invalidateQueries: [['bookings']],
    }
  );

  const service = serviceData?.data;

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book a service');
      navigate('/login');
      return;
    }

    if (!bookingData.preferred_date || !bookingData.preferred_time) {
      toast.error('Please select your preferred date and time');
      return;
    }

    bookServiceMutation.mutate({
      service_id: id,
      ...bookingData,
    });
  };

  const handleWhatsAppBook = () => {
    if (!service) return;
    
    const message = `Hi! I'm interested in booking your "${service.title}" service. 
    
Service Details:
- Price: ${formatCurrency(service.price)}
- Duration: ${service.duration} minutes
- Location: ${service.location}

Please let me know your availability. Thank you!`;
    
    const whatsappUrl = generateWhatsAppUrl(service.seller.phone, message);
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: service?.title,
          text: service?.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service not found</h2>
          <Button asChild>
            <Link to="/services">Browse Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-[16/10] relative">
                  <img
                    src={service.media[selectedImageIndex]?.url || 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image navigation */}
                  {service.media.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {service.media.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === selectedImageIndex
                              ? 'bg-white'
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Thumbnail strip */}
                {service.media.length > 1 && (
                  <div className="p-4 flex space-x-2 overflow-x-auto">
                    {service.media.map((media, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === selectedImageIndex
                            ? 'border-purple-500'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={media.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Service details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          {service.category}
                        </span>
                        {service.mobile_service && (
                          <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <Smartphone className="w-3 h-3" />
                            Mobile Service
                          </span>
                        )}
                      </div>
                      
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h1>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{service.rating.toFixed(1)}</span>
                          <span>({service.reviews_count} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration} minutes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{service.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={handleShare}>
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Provider</h3>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                          {service.seller.avatar ? (
                            <img
                              src={service.seller.avatar}
                              alt={service.seller.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-8 h-8 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{service.seller.name}</h4>
                          {service.seller.bio && (
                            <p className="text-gray-600 text-sm mt-1">{service.seller.bio}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{service.seller.phone}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{service.seller.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24"
            >
              <Card>
                <CardHeader>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      <GradientText>{formatCurrency(service.price)}</GradientText>
                    </div>
                    <p className="text-gray-600">per session</p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {!showBookingForm ? (
                    <div className="space-y-3">
                      <Button
                        variant="gradient"
                        size="lg"
                        className="w-full"
                        onClick={() => setShowBookingForm(true)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={handleWhatsAppBook}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Book
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Book This Service</h3>
                      
                      <Input
                        label="Preferred Date"
                        type="date"
                        value={bookingData.preferred_date}
                        onChange={(e) => setBookingData(prev => ({ ...prev, preferred_date: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      
                      <Input
                        label="Preferred Time"
                        type="time"
                        value={bookingData.preferred_time}
                        onChange={(e) => setBookingData(prev => ({ ...prev, preferred_time: e.target.value }))}
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          value={bookingData.notes}
                          onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Any special requests or notes..."
                          rows={3}
                          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Button
                          variant="gradient"
                          className="w-full"
                          onClick={handleBooking}
                          isLoading={bookServiceMutation.isPending}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Confirm Booking
                        </Button>
                        
                        <Button
                          variant="ghost"
                          className="w-full"
                          onClick={() => setShowBookingForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t text-center text-sm text-gray-500">
                    <p>✓ Secure booking</p>
                    <p>✓ Instant confirmation</p>
                    <p>✓ 24/7 support</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};