import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            className="ml-3 p-1 rounded-full text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {darkMode ? (
                <SunIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
                <MoonIcon className="h-6 w-6" aria-hidden="true" />
            )}
        </button>
    );
};

export default ThemeToggle;