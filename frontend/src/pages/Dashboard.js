import React, { useState, useEffect } from 'react';
import {
    ChartBarIcon,
    UserGroupIcon,
    VideoCameraIcon,
    FilmIcon,
    ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import StatCard from '../components/ui/StatCard';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import statsService from '../services/statsService';
import { formatNumber } from '../utils/helpers';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await statsService.getDashboardStats();
                setStats(response.data.data);
            } catch (err) {
                setError('Failed to load dashboard stats');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
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
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Overview of your sports streaming platform
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <StatCard
                    title="Daily Active Users"
                    value={stats?.dailyActiveUsers || 0}
                    icon={UserGroupIcon}
                    change="+12%"
                    changeType="positive"
                />

                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers || 0}
                    icon={UserGroupIcon}
                    change="+5%"
                    changeType="positive"
                />

                <StatCard
                    title="Total Streams"
                    value={stats?.totalStreams || 0}
                    icon={VideoCameraIcon}
                    change="+8%"
                    changeType="positive"
                />

                <StatCard
                    title="Total TV Channels"
                    value={stats?.totalTvChannels || 0}
                    icon={FilmIcon}
                    change="+3%"
                    changeType="positive"
                />
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <Card>
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                            Content Overview
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                        <VideoCameraIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Live Streams</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Currently active</p>
                                    </div>
                                </div>
                                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {formatNumber(stats?.liveStreams || 0)}
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-md bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                        <FilmIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Live TV Channels</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Currently active</p>
                                    </div>
                                </div>
                                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {formatNumber(stats?.liveTvChannels || 0)}
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-md bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                                        <FilmIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Highlights</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Total available</p>
                                    </div>
                                </div>
                                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {formatNumber(stats?.totalHighlights || 0)}
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-md bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                                        <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Active Ads</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Currently running</p>
                                    </div>
                                </div>
                                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {formatNumber(stats?.activeAds || 0)}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                            Quick Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <a
                                href="/streams"
                                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                                <VideoCameraIcon className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-2" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Manage Streams</span>
                            </a>

                            <a
                                href="/live-tv"
                                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                                <FilmIcon className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-2" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Manage TV</span>
                            </a>

                            <a
                                href="/categories"
                                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                                <svg className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Categories</span>
                            </a>

                            <a
                                href="/announcements"
                                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                                <svg className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Announcements</span>
                            </a>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;