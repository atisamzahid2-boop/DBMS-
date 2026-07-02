import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Package, ShoppingCart, Truck, BarChart3, Settings, X, Tag, Globe, Store } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Customers', path: '/customers', icon: Users },
  { label: 'Countries', path: '/countries', icon: Globe },
  { label: 'Merchants', path: '/merchants', icon: Store },
  { label: 'Categories', path: '/categories', icon: Tag },
  { label: 'Products', path: '/products', icon: Package },
  { label: 'Orders', path: '/orders', icon: ShoppingCart },
  { label: 'Suppliers', path: '/suppliers', icon: Truck },
  { label: 'Reports', path: '/reports', icon: BarChart3 },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-slate-900 dark:bg-slate-950 border-r border-slate-800 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
              <Package size={18} className="text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-wide">WMS</span>
              <p className="text-xs text-slate-500 leading-none">Wholesale System</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-3 space-y-0.5 overflow-y-auto" style={{ height: 'calc(100% - 64px)' }}>
          <p className="px-3 pt-3 pb-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Menu</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
