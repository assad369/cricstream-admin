import React from 'react';
import { formatNumber } from '../../utils/helpers';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';

const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    change, 
    changeType = 'positive',
    subtitle,
    loading = false,
    className = ''
}) => {
    if (loading) {
        return (
            <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 ${className}`}>
                <div className="animate-pulse space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                    </div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                </div>
            </div>
        );
    }

    const trendColors = {
        positive: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30',
        negative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30',
        neutral: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/30'
    };

    const iconBgColors = [
        'from-primary-400 to-primary-600',
        'from-emerald-400 to-emerald-600',
        'from-amber-400 to-amber-600',
        'from-rose-400 to-rose-600',
        'from-violet-400 to-violet-600',
        'from-cyan-400 to-cyan-600'
    ];

    // Get a consistent color based on title hash
    const getColorIndex = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash) % iconBgColors.length;
    };

    const bgColor = iconBgColors[getColorIndex(title)];

    return (
        <div className={`group bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 hover:border-gray-300 dark:hover:border-gray-600 ${className}`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {title}
                    </p>
                    <div className="mt-2 flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {formatNumber(value)}
                        </p>
                        {change && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${trendColors[changeType]}`}>
                                {changeType === 'positive' ? (
                                    <ArrowTrendingUpIcon className="h-3 w-3 mr-0.5" />
                                ) : changeType === 'negative' ? (
                                    <ArrowTrendingDownIcon className="h-3 w-3 mr-0.5" />
                                ) : null}
                                {change}
                            </span>
                        )}
                    </div>
                    {subtitle && (
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {subtitle}
                        </p>
                    )}
                </div>
                {Icon && (
                    <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${bgColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;