import type { DeviceStatus } from '@/types';

const config: Record<DeviceStatus, { color: string; label: string }> = {
  Up: { color: 'text-green-400', label: 'Up' },
  Down: { color: 'text-red-400', label: 'Down' },
  Degraded: { color: 'text-yellow-400', label: 'Degraded' },
  Maintenance: { color: 'text-blue-400', label: 'Maintenance' },
  Unknown: { color: 'text-purple-400', label: 'Unknown' },
};

const dotColor: Record<DeviceStatus, string> = {
  Up: 'bg-green-500',
  Down: 'bg-red-500',
  Degraded: 'bg-yellow-500',
  Maintenance: 'bg-blue-500',
  Unknown: 'bg-purple-500',
};

export function DeviceStatusIndicator({ status }: { status: DeviceStatus }) {
  const c = config[status];
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${dotColor[status]} ${status === 'Down' ? 'animate-pulse-soft' : ''}`} />
      <span className={`text-sm font-medium ${c.color}`}>{c.label}</span>
    </span>
  );
}
