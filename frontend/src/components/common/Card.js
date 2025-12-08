import React from 'react';

const Card = ({ 
    children, 
    className = '', 
    variant = 'default',
    padding = 'default',
    hover = false,
    ...props 
}) => {
    const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl border transition-all duration-200';
    
    const variantClasses = {
        default: 'border-gray-200/50 dark:border-gray-700/50 shadow-sm',
        elevated: 'border-gray-100 dark:border-gray-700/30 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50',
        outline: 'border-gray-200 dark:border-gray-700 shadow-none',
        ghost: 'border-transparent shadow-none bg-transparent dark:bg-transparent'
    };

    const paddingClasses = {
        none: '',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8'
    };

    const hoverClasses = hover 
        ? 'cursor-pointer hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg hover:shadow-primary-500/10' 
        : '';

    return (
        <div 
            className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`} 
            {...props}
        >
            {children}
        </div>
    );
};

// Card Header component
Card.Header = ({ children, className = '', ...props }) => (
    <div className={`pb-4 border-b border-gray-200/50 dark:border-gray-700/50 ${className}`} {...props}>
        {children}
    </div>
);

// Card Title component
Card.Title = ({ children, className = '', ...props }) => (
    <h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`} {...props}>
        {children}
    </h3>
);

// Card Description component
Card.Description = ({ children, className = '', ...props }) => (
    <p className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${className}`} {...props}>
        {children}
    </p>
);

// Card Body component
Card.Body = ({ children, className = '', ...props }) => (
    <div className={`py-4 ${className}`} {...props}>
        {children}
    </div>
);

// Card Footer component
Card.Footer = ({ children, className = '', ...props }) => (
    <div className={`pt-4 border-t border-gray-200/50 dark:border-gray-700/50 ${className}`} {...props}>
        {children}
    </div>
);

export default Card;