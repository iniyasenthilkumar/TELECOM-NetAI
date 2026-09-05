import { Activity, ShieldCheck, AlertTriangle, Server, Gauge } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: 'alert' | 'shield' | 'warning' | 'server' | 'gauge';
  accent: 'red' | 'orange' | 'blue' | 'cyan' | 'green';
}

const iconMap: Record<string, LucideIcon> = {
  alert: AlertTriangle,
  shield: ShieldCheck,
  warning: AlertTriangle,
  server: Server,
  gauge: Gauge,
};

const accentMap: Record<string, { bg: string; text: string; border: string }> = {
  red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  blue: { bg: 'bg-brand-500/10', text: 'text-brand-400', border: 'border-brand-500/20' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
};

export function MetricCard({ label, value, trend, trendUp, icon, accent }: MetricCardProps) {
  const Icon = iconMap[icon];
  const a = accentMap[accent];

  return (
    <div className="glass-card card-hover p-5 animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-300 uppercase tracking-wider">{label}</p>
          <p className="mt-2 text-3xl font-bold text-ink-50 tabular-nums">{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${a.bg} ${a.text} ${a.border}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className={`text-xs font-semibold ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
          <span className="text-xs text-ink-400">vs last hour</span>
        </div>
      )}
    </div>
  );
}

export { Activity };
