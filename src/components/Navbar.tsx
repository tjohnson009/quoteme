import React, { useState } from 'react';

interface NavbarProps {
    // onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdown = () => setDropdownOpen((open) => !open);

    return (
        <nav className="w-full h-14 flex sticky items-center justify-between px-2 bg-black-100 border-b border-gray-400">
            <div className="font-bold text-xl">
            Logo
            </div>

            {/* Dropdown */}
            <div className="relative">
            <button
                onClick={handleDropdown}
                className="bg-transparent border-none cursor-pointer text-base px-4 py-2"
                type="button"
            >
                ☰
            </button>
            {dropdownOpen && (
                <div
                className="absolute right-0 top-10 bg-white shadow-lg rounded min-w-[120px] z-10"
                >
                <button
                    className="block w-full px-4 py-3 bg-transparent border-none text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                    type="button"
                >
                    Profile
                </button>
                <button
                    className="block w-full px-4 py-3 bg-transparent border-none text-left cursor-pointer text-red-600 hover:bg-gray-100"
                    onClick={() => {
                    setDropdownOpen(false);
                    // onLogout();
                    }}
                    type="button"
                >
                    Logout
                </button>
                </div>
            )}
            </div>
        </nav>
    );
};

export default Navbar;