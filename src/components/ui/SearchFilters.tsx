import React from 'react';
import { Search, MapPin, DollarSign, Filter } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  mobileOnly: boolean;
  setMobileOnly: (mobile: boolean) => void;
  categories: string[];
  locations: string[];
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  priceRange,
  setPriceRange,
  mobileOnly,
  setMobileOnly,
  categories,
  locations,
  onApplyFilters,
  onClearFilters,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear All
        </Button>
      </div>

      {/* Search */}
      <div>
        <Input
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="w-5 h-5 text-gray-400" />}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range (KES)
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0] || ''}
              onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1] || ''}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 0])}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Mobile Service */}
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={mobileOnly}
            onChange={(e) => setMobileOnly(e.target.checked)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span className="text-sm font-medium text-gray-700">Mobile service only</span>
        </label>
      </div>

      <Button variant="gradient" className="w-full" onClick={onApplyFilters}>
        Apply Filters
      </Button>
    </div>
  );
};