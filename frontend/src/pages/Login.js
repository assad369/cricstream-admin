import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../utils/validation';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Admin Dashboard for Sports Streaming Platform
                    </p>
                </div>

                <Card>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700 dark:text-red-300">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <FormInput
                            name="email"
                            label="Email address"
                            type="email"
                            placeholder="Enter your email"
                            required
                            register={register}
                            errors={errors}
                        />

                        <FormInput
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            register={register}
                            errors={errors}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full"
                            >
                                {isLoading ? <Loading size="small" /> : 'Sign in'}
                            </Button>
                        </div>
                    </form>
                </Card>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                        Contact your administrator
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;