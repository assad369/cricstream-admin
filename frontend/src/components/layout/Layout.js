// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../common/Sidebar';
// import Topbar from '../common/Topbar';
//
// const Layout = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//
//     return (
//         <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
//             <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//
//             <div className="flex flex-col flex-1 overflow-hidden">
//                 <Topbar setSidebarOpen={setSidebarOpen} />
//
//                 <main className="flex-1 overflow-y-auto p-4 md:p-6">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     );
// };
//
// export default Layout;

import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
// import { useAuth } from 'frontend/src/context/AuthContext.js';
// import { useTheme } from 'frontend/src/context/ThemeContext.js';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

import {
    HomeIcon,
    VideoCameraIcon,
    FilmIcon,
    ClockIcon,
    LinkIcon,
    GlobeAltIcon,
    MegaphoneIcon,
    RectangleStackIcon,
    ArrowRightOnRectangleIcon,
    MoonIcon,
    SunIcon,
    Bars3Icon,
    XMarkIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';
import configService from '../../services/configService';

const Layout = () => {
    const { user, logout } = useAuth();
    const { darkMode, toggleTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const [appName, setAppName] = useState('Sports Admin');

    useEffect(() => {
        configService.getAppName().then(res => {
            const name = res?.data?.data?.appName || 'Sports Admin';
            setAppName(name);
        }).catch(() => {});
    }, []);

    const navigation = [
        { name: 'Dashboard', href: '/', icon: HomeIcon },
        { name: 'Streams', href: '/streams', icon: VideoCameraIcon },
        { name: 'Categories', href: '/categories', icon: RectangleStackIcon },
        { name: 'Live TV', href: '/live-tv', icon: FilmIcon },
        { name: 'Highlights', href: '/highlights', icon: ClockIcon },
        { name: 'Social Links', href: '/social-links', icon: LinkIcon },
        { name: 'Base URLs', href: '/base-urls', icon: GlobeAltIcon },
        { name: 'Announcements', href: '/announcements', icon: MegaphoneIcon },
        { name: 'Ads', href: '/ads', icon: RectangleStackIcon },
        { name: 'Profile & Settings', href: '/profile', icon: Cog6ToothIcon },
    ];

    const isActive = (href) => {
        return location.pathname === href;
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="sr-only">Close sidebar</span>
                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">{appName}</h1>
                        </div>
                        <nav className="mt-8 flex-1 px-2 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                                        isActive(item.href)
                                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon
                                        className={`mr-4 flex-shrink-0 h-6 w-6 ${
                                            isActive(item.href)
                                                ? 'text-primary-500 dark:text-primary-400'
                                                : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                                        }`}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex items-center">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.email}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">{appName}</h1>
                        </div>
                        <nav className="mt-8 flex-1 px-2 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                        isActive(item.href)
                                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                >
                                    <item.icon
                                        className={`mr-3 flex-shrink-0 h-6 w-6 ${
                                            isActive(item.href)
                                                ? 'text-primary-500 dark:text-primary-400'
                                                : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                                        }`}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex items-center w-full">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.email}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                            >
                                {darkMode ? (
                                    <SunIcon className="h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                            <button
                                onClick={logout}
                                className="ml-3 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                            >
                                <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <div className="lg:hidden">
                    <div className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 sm:px-6">
                        <div>
                            <button
                                type="button"
                                className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div>
                            <h1 className="text-lg font-medium text-gray-900 dark:text-white">{appName}</h1>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={toggleTheme}
                                className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                            >
                                {darkMode ? (
                                    <SunIcon className="h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                            <button
                                onClick={logout}
                                className="ml-3 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                            >
                                <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>

                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;