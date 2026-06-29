import { Volume2, Moon, Sun, Github } from "lucide-react";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 dark:shadow-none animate-pulse">
            <Volume2 className="w-5 h-5" id="brand-logo" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-lg text-gray-900 dark:text-zinc-50 leading-tight">
              Bangla Voice Generator
            </h1>
            <p className="text-xs font-medium text-gray-500 dark:text-zinc-400 font-mono">
              বাংলা টেক্সট-টু-ভয়েস
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            id="theme-toggle-btn"
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-300 bg-gray-50 dark:bg-zinc-850 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
