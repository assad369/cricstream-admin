import React from 'react';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    className = '',
    icon: Icon,
    iconPosition = 'left',
    ...props
}) => {
    const baseClasses = 'btn';
    
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
        success: 'btn-success',
        ghost: 'btn-ghost'
    };

    const sizeClasses = {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size]} ${className}`;

    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={classes}
            {...props}
        >
            {loading && (
                <svg
                    className={`animate-spin h-4 w-4 ${children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {!loading && Icon && iconPosition === 'left' && (
                <Icon className={`h-4 w-4 ${children ? 'mr-2' : ''}`} aria-hidden="true" />
            )}
            {children}
            {!loading && Icon && iconPosition === 'right' && (
                <Icon className={`h-4 w-4 ${children ? 'ml-2' : ''}`} aria-hidden="true" />
            )}
        </button>
    );
};

export default Button;