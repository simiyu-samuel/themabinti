import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Service } from '../../types';
import { Card, CardContent } from './Card';
import { Button } from './Button';
import { formatCurrency, generateWhatsAppUrl } from '../../lib/utils';

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index = 0 }) => {
  const primaryImage = service.media.find(m => m.is_primary)?.url || service.media[0]?.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card hover className="overflow-hidden h-full">
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={primaryImage || 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800'} 
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
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
            <div className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              {service.category}
            </div>
          </div>
        </div>
        
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
            </div>
            
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
                const whatsappUrl = generateWhatsAppUrl(service.seller.phone, message);
                window.open(whatsappUrl, '_blank');
              }}
            >
              WhatsApp Book
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};