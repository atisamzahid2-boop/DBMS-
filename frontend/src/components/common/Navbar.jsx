import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import FileMenu from './FileMenu';
import { LogOut, Moon, Sun, Bell, Search } from 'lucide-react';

export default function Navbar({ onRefresh, title }) {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : 'U';

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between px-5 h-16">
        {/* Left */}
        <div className="flex items-center gap-4">
          <FileMenu onRefresh={onRefresh} />
          {title && (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</span>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition">
            <Search size={18} />
          </button>

          <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-700 ml-1">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40">
              {initials}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight">{user?.username || 'User'}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{user?.role || 'Staff'}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
