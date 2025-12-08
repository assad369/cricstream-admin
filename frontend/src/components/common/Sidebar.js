import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import {
    XMarkIcon,
    HomeIcon,
    RectangleStackIcon,
    VideoCameraIcon,
    FilmIcon,
    LinkIcon,
    GlobeAltIcon,
    MegaphoneIcon,
    RectangleGroupIcon,
    TvIcon
} from '@heroicons/react/24/outline';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Categories', href: '/categories', icon: RectangleStackIcon },
    { name: 'Streams', href: '/streams', icon: VideoCameraIcon },
    { name: 'Live TV', href: '/live-tv', icon: TvIcon },
    { name: 'Highlights', href: '/highlights', icon: FilmIcon },
    { name: 'Social Links', href: '/social-links', icon: LinkIcon },
    { name: 'Base URLs', href: '/base-urls', icon: GlobeAltIcon },
    { name: 'Announcements', href: '/announcements', icon: MegaphoneIcon },
    { name: 'Ads', href: '/ads', icon: RectangleGroupIcon },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-4 py-5 border-b border-gray-200 dark:border-gray-700/50">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <PlayCircleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                            CricStream
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <p className="px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    Menu
                </p>
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                                isActive
                                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                            }`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 transition-colors ${
                                isActive
                                    ? 'bg-primary-100 dark:bg-primary-800/50'
                                    : 'bg-gray-100 dark:bg-gray-700/50 group-hover:bg-gray-200 dark:group-hover:bg-gray-600/50'
                            }`}>
                                <item.icon
                                    className={`h-5 w-5 ${
                                        isActive
                                            ? 'text-primary-600 dark:text-primary-400'
                                            : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                                    }`}
                                    aria-hidden="true"
                                />
                            </div>
                            {item.name}
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700/50">
                <div className="flex items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                    <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold shadow-md">
                            A
                        </div>
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Admin User</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Administrator</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
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
                                </Transition.Child>

                                <SidebarContent />
                            </Dialog.Panel>
                        </Transition.Child>

                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Desktop sidebar */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <SidebarContent />
                </div>
            </div>
        </>
    );
};

export default Sidebar;