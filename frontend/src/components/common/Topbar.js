import React from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Topbar = ({ setSidebarOpen }) => {
    const { user, logout } = useAuth();
    const { darkMode } = useTheme();

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <button
                            type="button"
                            className="md:hidden px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        <div className="flex-shrink-0 flex items-center md:hidden">
                            <h1 className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                Sports Admin
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <ThemeToggle />

                        <button
                            type="button"
                            className="ml-3 p-1 rounded-full text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        <div className="ml-3 relative">
                            <div>
                                <button
                                    type="button"
                                    className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                    id="user-menu-button"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <span className="text-primary-800 dark:text-primary-200 font-medium">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                                    </div>
                                </button>
                            </div>

                            <div className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Your Profile
                                </Link>
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;