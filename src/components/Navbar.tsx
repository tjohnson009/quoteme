import React, { useState } from 'react';
import Link from 'next/link';
import { logout } from '@/services/auth'

const Navbar: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdown = () => setDropdownOpen((open) => !open);

    return (
        <nav className="w-full h-14 flex sticky top-0 z-40 items-center justify-between px-2 bg-background-secondary border-b border-border">
            <Link href="/dashboard" className="font-bold text-xl text-foreground hover:text-accent-1 transition">
              QuoteMe
            </Link>

            <div className="relative">
            <button
                onClick={handleDropdown}
                className="bg-transparent border-none cursor-pointer p-2 rounded-md hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-accent-2/40 transition"
                type="button"
                aria-label={dropdownOpen ? "Close menu" : "Open menu"}
                aria-expanded={dropdownOpen}
            >
                {dropdownOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                )}
            </button>
            {dropdownOpen && (
                <div
                className="absolute right-0 top-10 bg-background-secondary border border-border shadow-lg rounded min-w-[120px] z-10"
                >
                <button
                    className="block w-full px-4 py-3 bg-transparent border-none text-left cursor-pointer hover:bg-foreground/10"
                    onClick={() => setDropdownOpen(false)}
                    type="button"
                >
                    Profile
                </button>
                <button
                    className="block w-full px-4 py-3 bg-transparent border-none text-left cursor-pointer text-error hover:bg-foreground/10"
                    onClick={() => {
                    setDropdownOpen(false);
                    logout()
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