import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full border-t border-border py-6 mt-auto">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-6">
      <span className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} QuoteMe</span>
      <div className="flex gap-5">
        <a href="https://github.com/tjohnson009/quoteme" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition">View the code on GitHub</a>
        <a href="mailto:timjohnson0914@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer; 