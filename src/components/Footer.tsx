import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full bg-background-secondary text-foreground-secondary border-t border-border py-4 mt-auto">
    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
      <span className="text-sm">&copy; {new Date().getFullYear()} QuoteMe - All rights reserved.</span>
      <div className="flex gap-4 mt-2 sm:mt-0">
        <a href="#" className="hover:underline text-muted-foreground text-sm">Privacy Policy</a>
        <a href="#" className="hover:underline text-muted-foreground text-sm">Terms of Service</a>
        <a href="mailto:timjohnson0914@gmail.com" className="hover:underline text-muted-foreground text-sm">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer; 