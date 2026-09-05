import type { Severity } from '@/types';

const config: Record<Severity, { bg: string; text: string; border: string; dot: string; label: string }> = {
  Critical: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/30',
    dot: 'bg-red-500',
    label: 'Critical',
  },
  High: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
    dot: 'bg-orange-500',
    label: 'High',
  },
  Medium: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
    dot: 'bg-yellow-500',
    label: 'Medium',
  },
  Low: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/30',
    dot: 'bg-green-500',
    label: 'Low',
  },
  Unknown: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    dot: 'bg-purple-500',
    label: 'Unknown',
  },
};

export function SeverityBadge({ severity, size = 'sm' }: { severity: Severity; size?: 'sm' | 'xs' }) {
  const c = config[severity];
  const padding = size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${c.bg} ${c.text} ${c.border} ${padding}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot} ${severity === 'Critical' ? 'animate-pulse-soft' : ''}`} />
      {c.label}
    </span>
  );
}

export function severityColor(severity: Severity): string {
  return {
    Critical: '#ef4444',
    High: '#f97316',
    Medium: '#eab308',
    Low: '#22c55e',
    Unknown: '#a855f7',
  }[severity];
}

export function severityBgColor(severity: Severity): string {
  return {
    Critical: 'rgba(239, 68, 68, 0.1)',
    High: 'rgba(249, 115, 22, 0.1)',
    Medium: 'rgba(234, 179, 8, 0.1)',
    Low: 'rgba(34, 197, 94, 0.1)',
    Unknown: 'rgba(168, 85, 247, 0.1)',
  }[severity];
}
