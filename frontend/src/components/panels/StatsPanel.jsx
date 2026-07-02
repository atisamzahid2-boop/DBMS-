import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsPanel({ title, value, subtitle, icon: Icon, trend, trendValue, color = 'primary' }) {
  const colorMap = {
    primary: {
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      icon: 'text-indigo-600 dark:text-indigo-400',
      accent: 'bg-indigo-600',
    },
    secondary: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      icon: 'text-emerald-600 dark:text-emerald-400',
      accent: 'bg-emerald-600',
    },
    accent: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      icon: 'text-amber-600 dark:text-amber-400',
      accent: 'bg-amber-500',
    },
    danger: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      icon: 'text-red-600 dark:text-red-400',
      accent: 'bg-red-500',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      icon: 'text-purple-600 dark:text-purple-400',
      accent: 'bg-purple-600',
    },
  };

  const c = colorMap[color] || colorMap.primary;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 card-hover">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${c.bg}`}>
            <Icon size={22} className={c.icon} />
          </div>
        )}
      </div>
      {trend !== undefined && (
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          {trend >= 0 ? (
            <TrendingUp size={13} className="text-emerald-500" />
          ) : (
            <TrendingDown size={13} className="text-red-500" />
          )}
          <span className={`font-semibold ${trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
            {Math.abs(trend)}%
          </span>
          <span className="text-slate-400 dark:text-slate-500">{trendValue}</span>
        </div>
      )}
    </div>
  );
}
