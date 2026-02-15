import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route: string) => path === route || (route !== '/' && path.startsWith(route));

  const navItems = [
    { route: '/', icon: 'home', label: 'Acasă' },
    { route: '/search', icon: 'search', label: 'Căutare' },
    { route: '/appointments', icon: 'calendar_today', label: 'Programări' },
    { route: '/profile', icon: 'person', label: 'Profil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-6 py-2 pb-safe z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-md mx-auto h-14">
        {navItems.map((item) => (
          <Link
            key={item.route}
            to={item.route}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              isActive(item.route) ? 'text-primary scale-105' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${isActive(item.route) ? 'fill-icon' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;