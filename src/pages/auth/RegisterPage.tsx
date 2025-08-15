import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Phone, Heart, Crown } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  password_confirmation: z.string(),
  role: z.enum(['customer', 'seller']),
  seller_package: z.string().optional(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ['password_confirmation'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const sellerPackages = [
  {
    value: 'basic',
    name: 'Basic',
    price: 2000,
    features: ['Up to 3 services', 'Basic profile', 'Email support'],
  },
  {
    value: 'premium',
    name: 'Premium',
    price: 5000,
    features: ['Up to 10 services', 'Enhanced profile', 'Priority support', 'Analytics'],
  },
  {
    value: 'professional',
    name: 'Professional',
    price: 8000,
    features: ['Unlimited services', 'Premium profile', '24/7 support', 'Advanced analytics', 'Featured listing'],
  },
];

export const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'customer' | 'seller'>('customer');
  const { register: registerUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const watchRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Themabinti
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">
            Join our community and start your beauty journey
          </p>
        </div>

        <Card glassmorphic>
          <CardHeader>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">Get Started</h3>
              <p className="text-gray-600 text-sm">
                Fill in your details to create your account
              </p>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Account Type Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  I want to
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative">
                    <input
                      type="radio"
                      value="customer"
                      {...register('role')}
                      className="sr-only"
                      onChange={() => setSelectedRole('customer')}
                    />
                    <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      watchRole === 'customer'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="text-center space-y-2">
                        <User className="w-8 h-8 mx-auto text-purple-600" />
                        <h4 className="font-medium">Book Services</h4>
                        <p className="text-sm text-gray-600">Find and book beauty services</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className="relative">
                    <input
                      type="radio"
                      value="seller"
                      {...register('role')}
                      className="sr-only"
                      onChange={() => setSelectedRole('seller')}
                    />
                    <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      watchRole === 'seller'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="text-center space-y-2">
                        <Crown className="w-8 h-8 mx-auto text-purple-600" />
                        <h4 className="font-medium">Offer Services</h4>
                        <p className="text-sm text-gray-600">Provide beauty services</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  icon={<User className="w-5 h-5 text-gray-400" />}
                  error={errors.name?.message}
                  {...register('name')}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+254 700 000 000"
                  icon={<Phone className="w-5 h-5 text-gray-400" />}
                  error={errors.phone?.message}
                  {...register('phone')}
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                icon={<Mail className="w-5 h-5 text-gray-400" />}
                error={errors.email?.message}
                {...register('email')}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create password"
                      className="block w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-200"
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm password"
                      className="block w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-200"
                      {...register('password_confirmation')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password_confirmation && (
                    <p className="text-sm text-red-600">{errors.password_confirmation.message}</p>
                  )}
                </div>
              </div>

              {/* Seller Package Selection */}
              {watchRole === 'seller' && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Choose Your Package
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sellerPackages.map((pkg) => (
                      <label key={pkg.value} className="relative">
                        <input
                          type="radio"
                          value={pkg.value}
                          {...register('seller_package')}
                          className="sr-only"
                        />
                        <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          watch('seller_package') === pkg.value
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="text-center space-y-3">
                            <h4 className="font-semibold text-lg">{pkg.name}</h4>
                            <p className="text-2xl font-bold text-purple-600">
                              KES {pkg.price.toLocaleString()}/mo
                            </p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {pkg.features.map((feature, idx) => (
                                <li key={idx}>• {feature}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="mt-1 rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-purple-600 hover:text-purple-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-purple-600 hover:text-purple-500">
                    Privacy Policy
                  </Link>
                </span>
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};