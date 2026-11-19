import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    disabled = false,
    onClick,
    type = 'button',
    className = '',
}) => {
    const baseStyles = 'px-4 py-2.5 rounded-lg bg-accent-1 text-on-accent font-medium shadow-sm cursor-pointer hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 disabled:opacity-50 disabled:cursor-not-allowed transition';

    return (
        <button
            type={type}
            className={`${baseStyles} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;