import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, Star, MapPin, Clock, ChevronRight, Sparkles, Heart, 
  Zap, Shield, Users, ArrowRight, Play, CheckCircle, TrendingUp,
  Award, Smartphone
} from 'lucide-react';
import { useApiQuery } from '../hooks/useApi';
import { Service, ApiResponse } from '../types';
import { GradientButton } from '../components/ui/GradientButton';
import { GlassmorphicCard } from '../components/ui/GlassmorphicCard';
import { FloatingShapes } from '../components/ui/FloatingShapes';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { Input } from '../components/ui/Input';
import { formatCurrency, generateWhatsAppUrl } from '../lib/utils';

const categories = [
  { 
    name: 'Beauty & Makeup', 
    icon: '💄', 
    count: 145,
    gradient: 'from-pink-500 to-rose-500',
    description: 'Professional makeup and beauty services'
  },
  { 
    name: 'Hair Services', 
    icon: '💇‍♀️', 
    count: 98,
    gradient: 'from-purple-500 to-indigo-500',
    description: 'Expert hair styling and treatments'
  },
  { 
    name: 'Wellness & Spa', 
    icon: '🧘‍♀️', 
    count: 76,
    gradient: 'from-green-500 to-teal-500',
    description: 'Relaxation and wellness therapies'
  },
  { 
    name: 'Fitness & Health', 
    icon: '💪', 
    count: 82,
    gradient: 'from-orange-500 to-red-500',
    description: 'Personal training and health services'
  },
  { 
    name: 'Lifestyle Services', 
    icon: '✨', 
    count: 54,
    gradient: 'from-yellow-500 to-orange-500',
    description: 'Lifestyle enhancement services'
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Discover & Browse',
    description: 'Explore our curated selection of premium beauty, health, and lifestyle services from verified professionals across Kenya.',
    icon: <Search className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
  },
  {
    step: 2,
    title: 'Book & Schedule',
    description: 'Choose your preferred service provider, select your ideal time slot, and book appointments with just a few clicks.',
    icon: <Clock className="w-8 h-8" />,
    color: 'from-pink-500 to-rose-500',
  },
  {
    step: 3,
    title: 'Enjoy & Relax',
    description: 'Sit back and enjoy professional services delivered right to your doorstep or at premium locations.',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'from-rose-500 to-purple-500',
  },
];

const trustIndicators = [
  { icon: <Shield className="w-6 h-6" />, text: 'Verified Professionals', count: '500+' },
  { icon: <Users className="w-6 h-6" />, text: 'Happy Customers', count: '10,000+' },
  { icon: <Zap className="w-6 h-6" />, text: 'Same-day Booking', count: '24/7' },
  { icon: <Award className="w-6 h-6" />, text: 'Service Guarantee', count: '100%' },
];

const testimonials = [
  {
    name: 'Sarah Wanjiku',
    role: 'Regular Customer',
    image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Themabinti has transformed my beauty routine. The professionals are amazing and the convenience is unmatched!',
    rating: 5,
  },
  {
    name: 'Grace Muthoni',
    role: 'Service Provider',
    image: 'https://images.pexels.com/photos/3992659/pexels-photo-3992659.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'As a makeup artist, this platform has helped me reach more clients and grow my business significantly.',
    rating: 5,
  },
  {
    name: 'David Kimani',
    role: 'Fitness Enthusiast',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'The personal trainers here are top-notch. I\'ve achieved my fitness goals faster than I ever imagined.',
    rating: 5,
  },
];

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch featured services
  const { data: featuredServicesData } = useApiQuery<ApiResponse<Service[]>>(
    ['featured-services'],
    '/services/featured'
  );

  const featuredServices = featuredServicesData?.data || [];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
        <FloatingShapes />
        
        {/* Animated mesh background */}
        <div className="absolute inset-0 bg-mesh-gradient bg-300% animate-gradient-shift opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <div className="space-y-6">
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Your Beauty
                <motion.span 
                  className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Journey Starts
                </motion.span>
                <span className="block">Here</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Discover Kenya's finest beauty, health, and lifestyle professionals. 
                Book premium services delivered to your doorstep with just a few clicks.
              </motion.p>
            </div>

            {/* Search Bar */}
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <GlassmorphicCard className="p-3" opacity="medium">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="What service are you looking for?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-0 bg-transparent text-white placeholder-white/70 focus:ring-0 text-lg"
                      icon={<Search className="w-6 h-6 text-white/70" />}
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-6 py-4 rounded-xl bg-white/10 text-white border-0 focus:ring-2 focus:ring-white/50 text-lg"
                  >
                    <option value="" className="text-gray-900">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name} className="text-gray-900">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <GradientButton size="lg" className="px-8" glow animated>
                    <Search className="w-5 h-5 mr-2" />
                    Find Services
                  </GradientButton>
                </div>
              </GlassmorphicCard>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {trustIndicators.map((indicator, index) => (
                <motion.div
                  key={index}
                  className="text-center text-white/90"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                    {indicator.icon}
                  </div>
                  <div className="font-bold text-xl mb-1">
                    <AnimatedCounter end={parseInt(indicator.count.replace(/\D/g, '') || '0')} suffix={indicator.count.replace(/\d/g, '')} />
                  </div>
                  <div className="text-sm font-medium">{indicator.text}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronRight className="w-6 h-6 text-white rotate-90" />
        </motion.div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-pink-50/50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-6">
              Featured Services
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Handpicked services from our top-rated professionals across Kenya
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredServices.slice(0, 8).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <GlassmorphicCard hover className="overflow-hidden h-full">
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={service.media[0]?.url || 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800'} 
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {formatCurrency(service.price)}
                      </div>
                      {service.mobile_service && (
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                          <Smartphone className="w-3 h-3" />
                          Mobile
                        </div>
                      )}
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {service.category}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1 space-y-3">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{service.rating.toFixed(1)}</span>
                          <span className="text-gray-500">({service.reviews_count})</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration}min</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{service.location}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {service.seller.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{service.seller.name}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 space-y-2">
                      <GradientButton 
                        size="sm" 
                        className="w-full"
                        animated
                      >
                        <Link to={`/services/${service.id}`} className="flex items-center justify-center w-full">
                          View Details
                        </Link>
                      </GradientButton>
                      <button 
                        className="w-full px-4 py-2 border-2 border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium"
                        onClick={() => {
                          const message = `Hi! I'm interested in your ${service.title} service. Can you please provide more details?`;
                          const whatsappUrl = generateWhatsAppUrl(service.seller.phone, message);
                          window.open(whatsappUrl, '_blank');
                        }}
                      >
                        WhatsApp Book
                      </button>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GradientButton size="lg" animated>
              <Link to="/services" className="flex items-center">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </GradientButton>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Popular Categories
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Browse services by category and find exactly what you're looking for
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Link
                  to={`/services?category=${encodeURIComponent(category.name.toLowerCase())}`}
                  className="group block"
                >
                  <GlassmorphicCard hover className="text-center p-8 h-full">
                    <div className="space-y-4">
                      <motion.div 
                        className={`text-5xl mx-auto w-20 h-20 flex items-center justify-center bg-gradient-to-br ${category.gradient} rounded-2xl shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="text-white text-2xl">{category.icon}</span>
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {category.description}
                        </p>
                        <p className="text-purple-600 font-semibold">
                          {category.count} services
                        </p>
                      </div>
                    </div>
                  </GlassmorphicCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
        <FloatingShapes />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-6">
              How It Works
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Getting the services you need has never been easier
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Connecting line for desktop */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-1/2 w-full h-1 bg-gradient-to-r from-purple-300 to-pink-300 z-0 transform translate-x-1/2"></div>
                )}
                
                <div className="relative z-10 space-y-6">
                  <motion.div 
                    className={`mx-auto w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white shadow-xl`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.icon}
                  </motion.div>
                  
                  <div className="space-y-4">
                    <motion.div 
                      className="inline-block px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-600 font-bold text-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      Step {step.step}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Community Says
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Real stories from real people who love using Themabinti
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <GlassmorphicCard className="p-8 h-full">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-600 italic text-lg leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-800 text-white relative overflow-hidden">
        <FloatingShapes />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Start Your Beauty Journey?
              </h2>
              <p className="text-purple-100 text-xl leading-relaxed">
                Join thousands of satisfied customers who trust Themabinti for their beauty, health, and lifestyle needs.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <GradientButton variant="secondary" size="xl" glow animated>
                <Link to="/services" className="flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Book a Service Now
                </Link>
              </GradientButton>
              <GradientButton variant="outline" size="xl" animated>
                <Link to="/register" className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Become a Seller
                </Link>
              </GradientButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};