import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../utils/validation';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');

        const result = await login(data.email, data.password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-1/4 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2" />
                    <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-white rounded-full translate-y-1/2" />
                </div>
                
                <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16 xl:px-20">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <PlayCircleIcon className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">CricStream</h1>
                    </div>
                    
                    <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
                        Welcome to the<br />
                        <span className="text-primary-200">Admin Dashboard</span>
                    </h2>
                    
                    <p className="text-lg text-primary-100 max-w-md">
                        Manage your sports streaming platform with ease. Control streams, 
                        TV channels, highlights, and more from one powerful dashboard.
                    </p>
                    
                    <div className="mt-12 flex items-center space-x-4">
                        <div className="flex -space-x-2">
                            {[...Array(4)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white text-sm font-medium"
                                >
                                    {String.fromCharCode(65 + i)}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-primary-100">
                            Trusted by <span className="font-semibold text-white">1000+</span> users
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center">
                        <div className="inline-flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                                <PlayCircleIcon className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CricStream</h1>
                        </div>
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Enter your credentials to access the admin dashboard
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 p-8">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            {error && (
                                <div className="alert alert-error animate-slide-down">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm">{error}</span>
                                    </div>
                                </div>
                            )}

                            <FormInput
                                name="email"
                                label="Email address"
                                type="email"
                                placeholder="name@example.com"
                                required
                                register={register}
                                errors={errors}
                                icon={EnvelopeIcon}
                            />

                            <FormInput
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                required
                                register={register}
                                errors={errors}
                                icon={LockClosedIcon}
                            />

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 dark:bg-gray-700"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        Remember me
                                    </span>
                                </label>
                            </div>

                            <Button
                                type="submit"
                                loading={isLoading}
                                className="w-full"
                                size="lg"
                            >
                                Sign in
                            </Button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Don't have an account?{' '}
                        <span className="font-medium text-primary-600 dark:text-primary-400">
                            Contact your administrator
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;