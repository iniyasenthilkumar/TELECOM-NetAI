import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertTriangle,
  Bell,
  Server,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/incidents', label: 'Incidents', icon: AlertTriangle },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/devices', label: 'Devices', icon: Server },
  { to: '/runbooks', label: 'Runbooks', icon: BookOpen },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } flex flex-col bg-ink-900 border-r border-ink-700/50 transition-all duration-300 flex-shrink-0`}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-ink-700/50">
        {collapsed ? <Logo showText={false} /> : <Logo />}
        <button
          onClick={onToggle}
          className="text-ink-400 hover:text-ink-100 transition-colors p-1 rounded-lg hover:bg-ink-800"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''} ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-ink-700/50">
        {!collapsed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 px-2">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-sm font-semibold text-white">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink-100 truncate">{user?.name || 'Analyst'}</p>
                <p className="text-xs text-ink-400 truncate">{user?.organization || 'Organization'}</p>
              </div>
            </div>
            <button onClick={handleSignOut} className="nav-item w-full text-red-400 hover:bg-red-500/10">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="h-9 w-9 mx-auto rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-sm font-semibold text-white">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <button
              onClick={handleSignOut}
              className="nav-item justify-center text-red-400 hover:bg-red-500/10"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
