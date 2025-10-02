import React from 'react';
import Card from '../common/Card';
import { formatNumber } from '../../utils/helpers';

const StatCard = ({ title, value, icon: Icon, change, changeType = 'positive' }) => {
    const changeColor = changeType === 'positive' ? 'text-green-600' : 'text-red-600';
    const changeIcon = changeType === 'positive' ? '↑' : '↓';

    return (
        <Card>
            <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-md p-3">
                        <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                {title}
                            </dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {formatNumber(value)}
                                </div>
                                {change && (
                                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${changeColor}`}>
                                        <span>{changeIcon}</span>
                                        <span className="sr-only">{changeType === 'positive' ? 'Increased' : 'Decreased'} by</span>
                                        {change}
                                    </div>
                                )}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default StatCard;