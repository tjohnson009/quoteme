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
    const baseStyles = 'px-4 py-2 rounded-lg bg-accent-2 text-on-accent font-medium cursor-pointer hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-2/40 disabled:opacity-50 disabled:cursor-not-allowed transition';

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