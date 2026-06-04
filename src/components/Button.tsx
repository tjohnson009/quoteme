import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    children,
    disabled = false,
    onClick,
    type = 'button',
}) => {
    const baseStyles = 'w-3/4 mx-auto cursor-pointer bg-blue-500 rounded p-2.5';

    return (
        <button
            type={type}
            className={` ${baseStyles} ${
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