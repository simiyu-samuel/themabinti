import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, MapPin, Clock, ChevronRight, Sparkles, Heart, Zap, Shield, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { formatCurrency, generateWhatsAppUrl } from '../lib/utils';

// Mock data for featured services
const featuredServices = [
  {
    id: '1',
    title: 'Professional Makeup for Events',
    description: 'Transform your look with expert makeup artistry for weddings, parties, and special occasions.',
    price: 8000,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
    provider: 'Grace Wanjiku',
    category: 'Beauty & Makeup',
    mobile: true,
    location: 'Nairobi',
  },
  {
    id: '2',
    title: 'Luxury Spa & Massage Therapy',
    description: 'Relax and rejuvenate with therapeutic massage and spa treatments in the comfort of your home.',
    price: 12000,
    rating: 4.8,
    reviews: 89,
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=800',
    provider: 'Serenity Wellness',
    category: 'Wellness & Spa',
    mobile: true,
    location: 'Westlands',
  },
  {
    id: '3',
    title: 'Hair Styling & Treatment',
    description: 'Expert hair care services including cuts, styling, coloring, and treatments for all hair types.',
    price: 5500,
    rating: 4.7,
    reviews: 203,
    image: 'https://images.pexels.com/photos/3993207/pexels-photo-3993207.jpeg?auto=compress&cs=tinysrgb&w=800',
    provider: 'Afro Glam Studio',
    category: 'Hair Services',
    mobile: false,
    location: 'Karen',
  },
  {
    id: '4',
    title: 'Personal Fitness Training',
    description: 'Achieve your fitness goals with personalized training sessions and nutrition guidance.',
    price: 6000,
    rating: 4.9,
    reviews: 127,
    image: 'https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&w=800',
    provider: 'FitLife Kenya',
    category: 'Fitness & Health',
    mobile: true,
    location: 'Kilimani',
  },
];

const categories = [
  { name: 'Beauty & Makeup', icon: '💄', count: 145 },
  { name: 'Hair Services', icon: '💇‍♀️', count: 98 },
  { name: 'Wellness & Spa', icon: '🧘‍♀️', count: 76 },
  { name: 'Fitness & Health', icon: '💪', count: 82 },
  { name: 'Lifestyle Services', icon: '✨', count: 54 },
];

const howItWorks = [
  {
    step: 1,
    title: 'Browse & Search',
    description: 'Explore our curated selection of beauty, health, and lifestyle services in your area.',
    icon: <Search className="w-8 h-8" />,
  },
  {
    step: 2,
    title: 'Book & Schedule',
    description: 'Choose your preferred service provider and book appointments at your convenience.',
    icon: <Clock className="w-8 h-8" />,
  },
  {
    step: 3,
    title: 'Enjoy & Relax',
    description: 'Sit back and enjoy professional services delivered right to your doorstep.',
    icon: <Sparkles className="w-8 h-8" />,
  },
];

const trustIndicators = [
  { icon: <Shield className="w-6 h-6" />, text: 'Verified Professionals' },
  { icon: <Users className="w-6 h-6" />, text: '10,000+ Happy Customers' },
  { icon: <Zap className="w-6 h-6" />, text: 'Same-day Booking' },
];

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-purple-800">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-pink-300/20 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-purple-300/10 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Your Beauty
                <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  Awaits
                </span>
              </h1>
              <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                Discover Kenya's finest beauty, health, and lifestyle professionals. 
                Book premium services delivered to your doorstep with just a few clicks.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Card glassmorphic className="p-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="What service are you looking for?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-0 bg-transparent text-white placeholder-white/70 focus:ring-0"
                      icon={<Search className="w-5 h-5 text-white/70" />}
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/10 text-white border-0 focus:ring-2 focus:ring-white/50"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name} className="text-gray-900">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <Button variant="gradient" size="lg" className="md:px-8">
                    Find Services
                  </Button>
                </div>
              </Card>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-white/90">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {indicator.icon}
                  <span className="font-medium">{indicator.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-white rotate-90" />
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
              Featured Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked services from our top-rated professionals across Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service) => (
              <Card key={service.id} hover className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  {service.mobile && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Mobile Service
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                    {formatCurrency(service.price)}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{service.rating}</span>
                        <span className="text-gray-500">({service.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{service.location}</span>
                      </div>
                    </div>
                    
                    <div className="pt-3 space-y-2">
                      <Button 
                        variant="gradient" 
                        size="sm" 
                        className="w-full"
                        asChild
                      >
                        <Link to={`/services/${service.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          const message = `Hi! I'm interested in your ${service.title} service. Can you please provide more details?`;
                          const whatsappUrl = generateWhatsAppUrl('254700000000', message);
                          window.open(whatsappUrl, '_blank');
                        }}
                      >
                        WhatsApp Book
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">
                View All Services
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Browse services by category and find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/services?category=${encodeURIComponent(category.name.toLowerCase())}`}
                className="group"
              >
                <Card hover className="text-center p-6 transition-colors group-hover:bg-gradient-to-br group-hover:from-purple-50 group-hover:to-pink-50">
                  <div className="space-y-4">
                    <div className="text-4xl mx-auto w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl group-hover:from-purple-200 group-hover:to-pink-200 transition-colors">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {category.count} services
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Getting the services you need has never been easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative text-center">
                {/* Connecting line for desktop */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 z-0"></div>
                )}
                
                <div className="relative z-10 space-y-6">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    {step.icon}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="inline-block px-4 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-600 font-semibold text-sm">
                      Step {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Start Your Beauty Journey?
              </h2>
              <p className="text-purple-100 text-lg leading-relaxed">
                Join thousands of satisfied customers who trust Themabinti for their beauty, health, and lifestyle needs.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/services">
                  Book a Service Now
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/seller/register">
                  Become a Seller
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};