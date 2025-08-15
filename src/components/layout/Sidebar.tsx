import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, User, Calendar, CreditCard, Settings, 
  Package, ShoppingBag, TrendingUp, Users, 
  FileText, BarChart, X, Heart, Crown
} from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { useUIStore } from '../../store/ui';
import { cn } from '../../lib/utils';

const customerNavItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Calendar, label: 'Appointments', href: '/dashboard/appointments' },
  { icon: CreditCard, label: 'Payment History', href: '/dashboard/payments' },
  { icon: Settings, label: 'Profile Settings', href: '/dashboard/settings' },
];

const sellerNavItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: ShoppingBag, label: 'My Services', href: '/dashboard/services' },
  { icon: Calendar, label: 'Appointments', href: '/dashboard/appointments' },
  { icon: TrendingUp, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Crown, label: 'Package Upgrade', href: '/dashboard/package-upgrade' },
  { icon: CreditCard, label: 'Earnings', href: '/dashboard/earnings' },
  { icon: Settings, label: 'Profile Settings', href: '/dashboard/settings' },
];

const adminNavItems = [
  { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: ShoppingBag, label: 'Services', href: '/admin/services' },
  { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
  { icon: BarChart, label: 'Analytics', href: '/admin/analytics' },
  { icon: FileText, label: 'Reports', href: '/admin/reports' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const location = useLocation();

  if (!user) return null;

  const getNavItems = () => {
    switch (user.role) {
      case 'admin':
        return adminNavItems;
      case 'seller':
        return sellerNavItems;
      default:
        return customerNavItems;
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Themabinti
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
            
            {user.role === 'seller' && user.seller_package && (
              <div className="mt-3 p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-purple-600 capitalize">
                    {user.seller_package} Package
                  </span>
                  <Crown className="w-4 h-4 text-purple-500" />
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};