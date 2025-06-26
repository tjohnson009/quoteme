import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    // variant?: 'primary' | 'secondary' | 'outline';
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string; 
}

const Button: React.FC<ButtonProps> = ({
    children,
    // variant = 'primary',
    // size = 'medium',
    disabled = false,
    onClick,
}) => {
    const baseStyles = 'rounded-md font-medium transition-colors duration-200 cursor-pointer';
    
    // const variants = {
    //     primary: 'bg-blue-600 text-white hover:bg-blue-700',
    //     secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    //     outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
    // };

    // const sizes = {
    //     small: 'px-3 py-1 text-sm',
    //     medium: 'px-4 py-2 text-base',
    //     large: 'px-6 py-3 text-lg'
    // };

    return (
        <button
            className={`${baseStyles} ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;