import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/auth';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Sidebar } from './components/layout/Sidebar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PageLoading } from './components/ui/LoadingSpinner';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailsPage } from './pages/ServiceDetailsPage';
import { ContactPage } from './pages/ContactPage';
import { BlogListPage } from './pages/blog/BlogListPage';
import { BlogPostPage } from './pages/blog/BlogPostPage';
import { useUIStore } from './store/ui';
import { cn } from './lib/utils';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Dashboard placeholder components
const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
        <h3 className="text-lg font-medium">Welcome Back!</h3>
        <p className="mt-2 text-purple-100">Manage your beauty journey</p>
      </div>
      <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 rounded-xl text-white">
        <h3 className="text-lg font-medium">Quick Stats</h3>
        <p className="mt-2 text-pink-100">View your activity</p>
      </div>
    </div>
  </div>
);

const ServicesPage = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Services</h1>
      <p className="text-gray-600">Services listing will be implemented here.</p>
    </div>
  </div>
);

function App() {
  const { checkAuth, isLoading } = useAuthStore();
  const { sidebarOpen } = useUIStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#333',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              },
              success: {
                style: {
                  border: '1px solid #10b981',
                },
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                style: {
                  border: '1px solid #ef4444',
                },
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />

          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Routes with header and footer */}
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <div className="flex">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/services/:id" element={<ServiceDetailsPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/blog" element={<BlogListPage />} />
                      <Route path="/blog/:slug" element={<BlogPostPage />} />
                      
                      {/* Protected dashboard routes */}
                      <Route
                        path="/dashboard/*"
                        element={
                          <ProtectedRoute>
                            <div className="flex min-h-screen pt-16">
                              <Sidebar />
                              <div className={cn(
                                'flex-1 transition-all duration-200',
                                sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'
                              )}>
                                <Routes>
                                  <Route path="/" element={<Dashboard />} />
                                  <Route path="/appointments" element={<Dashboard />} />
                                  <Route path="/payments" element={<Dashboard />} />
                                  <Route path="/services" element={<Dashboard />} />
                                  <Route path="/analytics" element={<Dashboard />} />
                                  <Route path="/package-upgrade" element={<Dashboard />} />
                                  <Route path="/earnings" element={<Dashboard />} />
                                  <Route path="/settings" element={<Dashboard />} />
                                </Routes>
                              </div>
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      {/* Admin routes */}
                      <Route
                        path="/admin/*"
                        element={
                          <ProtectedRoute allowedRoles={['admin']}>
                            <div className="flex min-h-screen pt-16">
                              <Sidebar />
                              <div className="flex-1 lg:ml-64">
                                <Routes>
                                  <Route path="/dashboard" element={<Dashboard />} />
                                  <Route path="/users" element={<Dashboard />} />
                                  <Route path="/services" element={<Dashboard />} />
                                  <Route path="/payments" element={<Dashboard />} />
                                  <Route path="/analytics" element={<Dashboard />} />
                                  <Route path="/reports" element={<Dashboard />} />
                                  <Route path="/settings" element={<Dashboard />} />
                                </Routes>
                              </div>
                            </div>
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </div>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;