import { Search, Bell, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function TopNav() {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-ink-700/50 bg-ink-900/80 backdrop-blur-xl flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input
            type="text"
            placeholder="Search incidents, alerts, devices..."
            className="input-field pl-10 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
          <ShieldCheck className="h-4 w-4 text-green-400" />
          <span className="text-xs font-medium text-green-400">System Operational</span>
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse-soft" />
        </div>

        <button className="relative p-2 rounded-xl hover:bg-ink-800 transition-colors">
          <Bell className="h-5 w-5 text-ink-300" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-ink-900" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-ink-700/50">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-sm font-semibold text-white">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-ink-100">{user?.name || 'Analyst'}</p>
            <p className="text-xs text-ink-400">Network Engineer</p>
          </div>
        </div>
      </div>
    </header>
  );
}
