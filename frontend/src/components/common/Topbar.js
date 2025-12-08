import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { 
    Bars3Icon, 
    BellIcon, 
    UserCircleIcon, 
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Topbar = ({ setSidebarOpen }) => {
    const { user, logout } = useAuth();
    const { darkMode } = useTheme();

    return (
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Mobile Logo */}
                        <div className="flex items-center md:hidden ml-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-md shadow-primary-500/20">
                                <PlayCircleIcon className="w-5 h-5 text-white" />
                            </div>
                            <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
                                CricStream
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Notifications */}
                        <button
                            type="button"
                            className="relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                            {/* Notification indicator */}
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800"></span>
                        </button>

                        {/* Profile Dropdown */}
                        <Menu as="div" className="relative">
                            <Menu.Button className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold shadow-md shadow-primary-500/20">
                                    {user?.email?.charAt(0).toUpperCase() || 'A'}
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {user?.name || 'Admin'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                                        {user?.email || 'admin@example.com'}
                                    </p>
                                </div>
                            </Menu.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none divide-y divide-gray-100 dark:divide-gray-700">
                                    <div className="p-3">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {user?.name || 'Admin User'}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {user?.email || 'admin@example.com'}
                                        </p>
                                    </div>
                                    <div className="p-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    to="/profile"
                                                    className={`${
                                                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                    } flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg transition-colors`}
                                                >
                                                    <UserCircleIcon className="h-5 w-5 mr-3 text-gray-400" />
                                                    Your Profile
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    to="/profile"
                                                    className={`${
                                                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                    } flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg transition-colors`}
                                                >
                                                    <Cog6ToothIcon className="h-5 w-5 mr-3 text-gray-400" />
                                                    Settings
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="p-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={logout}
                                                    className={`${
                                                        active ? 'bg-red-50 dark:bg-red-900/20' : ''
                                                    } flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg transition-colors`}
                                                >
                                                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                                                    Sign out
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;