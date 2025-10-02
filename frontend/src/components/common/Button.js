import React from 'react';

const Button = ({
                    children,
                    type = 'button',
                    variant = 'primary',
                    disabled = false,
                    className = '',
                    ...props
                }) => {
    const baseClasses = 'btn';
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger'
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return (
        <button
            type={type}
            disabled={disabled}
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;