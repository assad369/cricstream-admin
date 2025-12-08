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

import React, { useEffect, useState, Fragment } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Dialog, Transition, Menu } from '@headlessui/react';
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
    Cog6ToothIcon,
    ChevronDownIcon,
    UserCircleIcon,
    BellIcon
} from '@heroicons/react/24/outline';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import configService from '../../services/configService';

const Layout = () => {
    const { user, logout } = useAuth();
    const { darkMode, toggleTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const [appName, setAppName] = useState('CricStream');

    useEffect(() => {
        configService.getAppName().then(res => {
            const name = res?.data?.data?.appName || 'CricStream';
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
    ];

    const isActive = (href) => {
        if (href === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(href);
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="flex items-center h-16 px-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <PlayCircleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white">{appName}</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <div className="mb-2 px-3">
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Main Menu
                    </p>
                </div>
                {navigation.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                                active
                                    ? 'bg-gradient-to-r from-primary-500/10 to-primary-600/10 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-700/50 shadow-sm'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            <item.icon
                                className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200 ${
                                    active
                                        ? 'text-primary-600 dark:text-primary-400'
                                        : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                                }`}
                            />
                            {item.name}
                            {active && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
                            )}
                        </Link>
                    );
                })}

                <div className="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="mb-2 px-3">
                        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                            Account
                        </p>
                    </div>
                    <Link
                        to="/profile"
                        onClick={() => setSidebarOpen(false)}
                        className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                            isActive('/profile')
                                ? 'bg-gradient-to-r from-primary-500/10 to-primary-600/10 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-700/50 shadow-sm'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        <Cog6ToothIcon className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200 ${
                            isActive('/profile')
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                        }`} />
                        Settings
                    </Link>
                </div>
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-primary-500/20">
                            {user?.email?.charAt(0).toUpperCase() || 'A'}
                        </div>
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user?.email || 'Admin'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {user?.role || 'Administrator'}
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Logout"
                    >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Mobile sidebar */}
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button
                                            type="button"
                                            className="-m-2.5 p-2.5"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                
                                <div className="flex grow flex-col bg-white dark:bg-gray-800 shadow-2xl">
                                    <SidebarContent />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Desktop sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex w-72 flex-col">
                    <div className="flex grow flex-col bg-white dark:bg-gray-800 border-r border-gray-200/50 dark:border-gray-700/50">
                        <SidebarContent />
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top header */}
                <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl px-4 sm:gap-x-6 sm:px-6 lg:px-8">
                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Separator */}
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" aria-hidden="true" />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        {/* Page title / Breadcrumb area */}
                        <div className="flex flex-1 items-center">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white lg:hidden">
                                {appName}
                            </h2>
                        </div>

                        {/* Right side actions */}
                        <div className="flex items-center gap-x-2 sm:gap-x-4">
                            {/* Theme toggle */}
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                            >
                                {darkMode ? (
                                    <SunIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                    <MoonIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                            </button>

                            {/* Notifications */}
                            <button
                                type="button"
                                className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                            >
                                <BellIcon className="h-5 w-5" aria-hidden="true" />
                                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800" />
                            </button>

                            {/* Separator */}
                            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700" aria-hidden="true" />

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative">
                                <Menu.Button className="flex items-center gap-x-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-primary-500/20">
                                        {user?.email?.charAt(0).toUpperCase() || 'A'}
                                    </div>
                                    <span className="hidden lg:flex lg:items-center">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {user?.email?.split('@')[0] || 'Admin'}
                                        </span>
                                        <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-400" aria-hidden="true" />
                                    </span>
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
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 focus:outline-none divide-y divide-gray-100 dark:divide-gray-700">
                                        <div className="px-4 py-3">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {user?.email}
                                            </p>
                                        </div>
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/profile"
                                                        className={`${
                                                            active ? 'bg-gray-50 dark:bg-gray-700' : ''
                                                        } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                                                    >
                                                        <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400" />
                                                        Your Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/profile"
                                                        className={`${
                                                            active ? 'bg-gray-50 dark:bg-gray-700' : ''
                                                        } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                                                    >
                                                        <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-400" />
                                                        Settings
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={logout}
                                                        className={`${
                                                            active ? 'bg-gray-50 dark:bg-gray-700' : ''
                                                        } flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                                                    >
                                                        <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
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
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-y-auto">
                    <div className="py-6 lg:py-8">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;