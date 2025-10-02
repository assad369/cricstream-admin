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
    AdvertisementsIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Categories', href: '/categories', icon: RectangleStackIcon },
    { name: 'Streams', href: '/streams', icon: VideoCameraIcon },
    { name: 'Live TV', href: '/live-tv', icon: FilmIcon },
    { name: 'Highlights', href: '/highlights', icon: FilmIcon },
    { name: 'Social Links', href: '/social-links', icon: LinkIcon },
    { name: 'Base URLs', href: '/base-urls', icon: GlobeAltIcon },
    { name: 'Announcements', href: '/announcements', icon: MegaphoneIcon },
    { name: 'Ads', href: '/ads', icon: AdvertisementsIcon },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();

    const SidebarContent = () => (
        <>
            <div className="flex items-center flex-shrink-0 px-4 py-4">
                <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    Sports Streaming Admin
                </h1>
            </div>

            <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                isActive
                                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                            }`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon
                                className={`mr-3 flex-shrink-0 h-6 w-6 ${
                                    isActive
                                        ? 'text-primary-500 dark:text-primary-400'
                                        : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                                }`}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <span className="text-primary-800 dark:text-primary-200 font-medium">
                A
              </span>
                        </div>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin User</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                    </div>
                </div>
            </div>
        </>
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