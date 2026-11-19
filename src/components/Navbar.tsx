import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '@/services/auth'

const Navbar: React.FC = () => {
    const router = useRouter();
    // only show Log out once someone is on their dashboard
    const isDashboard = router.pathname === '/dashboard';

    return (
        <nav className="w-full h-16 sticky top-0 z-40 bg-background-secondary/80 backdrop-blur-md border-b border-border">
            {/* same max width as the pages, so the logo lines up with the content */}
            <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 font-serif text-2xl font-semibold text-foreground hover:text-accent-2 transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent-2" aria-hidden="true">
                    <path d="M4 18v-5.2c0-3.6 1.6-6.1 4.9-7.6l1 1.7C8 7.9 7 9.2 6.9 11H9v7H4zm10 0v-5.2c0-3.6 1.6-6.1 4.9-7.6l1 1.7C18 7.9 17 9.2 16.9 11H19v7h-5z" />
                </svg>
                QuoteMe
            </Link>

            {isDashboard && (
                <button
                    onClick={() => logout()}
                    type="button"
                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-foreground-secondary cursor-pointer hover:bg-foreground/5 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 transition"
                >
                    Log out
                </button>
            )}
            </div>
        </nav>
    );
};

export default Navbar;
