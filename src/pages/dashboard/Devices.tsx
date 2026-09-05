import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Server, Wifi, Shield, HardDrive, Network } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { devices } from '@/data/devices';
import { DeviceStatusIndicator } from '@/components/ui/DeviceStatusIndicator';
import type { DeviceType, DeviceStatus } from '@/types';

const typeIcons: Record<DeviceType, LucideIcon> = {
  Router: Wifi,
  Switch: Server,
  Server: HardDrive,
  Firewall: Shield,
  'Load Balancer': Network,
};

const typeFilters: ('All' | DeviceType)[] = ['All', 'Router', 'Switch', 'Server', 'Firewall', 'Load Balancer'];
const statusFilters: ('All' | DeviceStatus)[] = ['All', 'Up', 'Down', 'Degraded', 'Maintenance', 'Unknown'];

export function Devices() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | DeviceType>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | DeviceStatus>('All');

  const filtered = useMemo(() => {
    return devices.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.ipAddress.includes(search) ||
        d.location.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All' || d.type === typeFilter;
      const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, typeFilter, statusFilter]);

  return (
    <div className="p-6 space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-ink-50">Devices</h1>
        <p className="mt-1 text-sm text-ink-400">
          {devices.length} network devices · {devices.filter((d) => d.status === 'Up').length} operational · {devices.filter((d) => d.status === 'Down' || d.status === 'Degraded').length} with issues
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 animate-fade-in-up">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              placeholder="Search by name, IP address, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'All' | DeviceType)}
            className="input-field py-2 text-sm cursor-pointer"
          >
            {typeFilters.map((t) => (
              <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'All' | DeviceStatus)}
            className="input-field py-2 text-sm cursor-pointer"
          >
            {statusFilters.map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Device Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full glass-card p-12 text-center text-ink-400 text-sm">
            No devices match your filters.
          </div>
        ) : (
          filtered.map((device) => {
            const Icon = typeIcons[device.type];
            return (
              <div key={device.id} className="glass-card card-hover p-5 animate-fade-in-up">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-ink-800 border border-ink-700/60 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-brand-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-50">{device.name}</p>
                      <p className="text-xs text-ink-400 font-mono">{device.ipAddress}</p>
                    </div>
                  </div>
                  <DeviceStatusIndicator status={device.status} />
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-ink-400">Type</span>
                    <span className="text-ink-200 font-medium">{device.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-400">Location</span>
                    <span className="text-ink-200 font-medium">{device.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-400">Last Seen</span>
                    <span className="text-ink-200 font-mono">{device.lastSeen}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ink-400">Active Incidents</span>
                    {device.activeIncidents.length > 0 ? (
                      <div className="flex gap-1">
                        {device.activeIncidents.map((inc) => (
                          <Link
                            key={inc}
                            to={`/incidents/${inc}`}
                            className="text-xs font-mono text-brand-400 hover:text-brand-300 hover:underline"
                          >
                            {inc}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <span className="text-ink-500">None</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
