import type { IncidentStatus } from '@/types';

const statusConfig: Record<IncidentStatus, { bg: string; text: string; border: string; label: string }> = {
  Open: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    label: 'Open',
  },
  Investigating: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
    label: 'Investigating',
  },
  Monitoring: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    label: 'Monitoring',
  },
  Resolved: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/30',
    label: 'Resolved',
  },
  Escalated: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    label: 'Escalated',
  },
};

export function StatusBadge({ status }: { status: IncidentStatus }) {
  const c = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${c.bg} ${c.text} ${c.border}`}>
      {c.label}
    </span>
  );
}
