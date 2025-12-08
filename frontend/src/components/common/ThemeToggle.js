import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            className="relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6">
                <SunIcon 
                    className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                        darkMode 
                            ? 'opacity-100 rotate-0 text-yellow-400' 
                            : 'opacity-0 rotate-90 text-gray-400'
                    }`} 
                    aria-hidden="true" 
                />
                <MoonIcon 
                    className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                        darkMode 
                            ? 'opacity-0 -rotate-90 text-gray-400' 
                            : 'opacity-100 rotate-0 text-gray-600'
                    }`} 
                    aria-hidden="true" 
                />
            </div>
        </button>
    );
};

export default ThemeToggle;