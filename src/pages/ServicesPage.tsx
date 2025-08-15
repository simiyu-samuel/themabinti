import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApiQuery } from '../hooks/useApi';
import { Service, ApiResponse } from '../types';
import { ServiceCard } from '../components/ui/ServiceCard';
import { SearchFilters } from '../components/ui/SearchFilters';
import { Pagination } from '../components/ui/Pagination';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { GradientText } from '../components/ui/GradientText';

export const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [mobileOnly, setMobileOnly] = useState(false);

  // Build query string
  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedLocation) params.set('location', selectedLocation);
    if (priceRange[0] > 0) params.set('min_price', priceRange[0].toString());
    if (priceRange[1] > 0) params.set('max_price', priceRange[1].toString());
    if (mobileOnly) params.set('mobile_only', '1');
    params.set('page', currentPage.toString());
    return params.toString();
  };

  // Fetch services
  const { data: servicesData, isLoading } = useApiQuery<ApiResponse<Service[]>>(
    ['services', buildQueryString()],
    `/services?${buildQueryString()}`
  );

  // Fetch categories and locations for filters
  const { data: categoriesData } = useApiQuery<string[]>(
    ['service-categories'],
    '/services/categories'
  );

  const { data: locationsData } = useApiQuery<string[]>(
    ['service-locations'],
    '/services/locations'
  );

  const handleApplyFilters = () => {
    setCurrentPage(1);
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedLocation) params.set('location', selectedLocation);
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
    setPriceRange([0, 0]);
    setMobileOnly(false);
    setCurrentPage(1);
    setSearchParams({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <GradientText>Discover Amazing Services</GradientText>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through our curated collection of beauty, health, and lifestyle services
            from verified professionals across Kenya.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <SearchFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                mobileOnly={mobileOnly}
                setMobileOnly={setMobileOnly}
                categories={categoriesData || []}
                locations={locationsData || []}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
              />
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="lg:col-span-3">
            {servicesData?.data && servicesData.data.length > 0 ? (
              <>
                {/* Results count */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6"
                >
                  <p className="text-gray-600">
                    Showing {servicesData.data.length} of {servicesData.meta?.total || 0} services
                  </p>
                </motion.div>

                {/* Services grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {servicesData.data.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                  ))}
                </div>

                {/* Pagination */}
                {servicesData.meta && servicesData.meta.last_page > 1 && (
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={servicesData.meta.current_page}
                      totalPages={servicesData.meta.last_page}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No services found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};