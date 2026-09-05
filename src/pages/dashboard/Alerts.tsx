import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Filter, Copy } from 'lucide-react';
import { alerts } from '@/data/alerts';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import type { Severity, AlertStatus } from '@/types';

const severityOptions: ('All' | Severity)[] = ['All', 'Critical', 'High', 'Medium', 'Low', 'Unknown'];
const statusOptions: ('All' | AlertStatus)[] = ['All', 'New', 'Correlated', 'Acknowledged', 'Suppressed'];

const PAGE_SIZE = 15;

export function Alerts() {
  const [search, setSearch] = useState('');
  const [sevFilter, setSevFilter] = useState<'All' | Severity>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | AlertStatus>('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      const matchesSearch =
        a.device.toLowerCase().includes(search.toLowerCase()) ||
        a.alertType.toLowerCase().includes(search.toLowerCase()) ||
        a.message.toLowerCase().includes(search.toLowerCase()) ||
        (a.incidentId || '').toLowerCase().includes(search.toLowerCase());
      const matchesSev = sevFilter === 'All' || a.severity === sevFilter;
      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchesSearch && matchesSev && matchesStatus;
    });
  }, [search, sevFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="p-6 space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-ink-50">Alerts</h1>
        <p className="mt-1 text-sm text-ink-400">
          {alerts.length} total alerts · {alerts.filter((a) => a.status === 'New').length} uncorrelated · {alerts.filter((a) => a.isDuplicate).length} duplicates grouped
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 animate-fade-in-up">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              placeholder="Search by device, alert type, message, or incident ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-ink-400" />
              <select
                value={sevFilter}
                onChange={(e) => { setSevFilter(e.target.value as 'All' | Severity); setPage(1); }}
                className="input-field py-2 text-sm cursor-pointer"
              >
                {severityOptions.map((s) => (
                  <option key={s} value={s}>{s === 'All' ? 'All Severities' : s}</option>
                ))}
              </select>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as 'All' | AlertStatus); setPage(1); }}
              className="input-field py-2 text-sm cursor-pointer"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden animate-fade-in-up">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-700/50 bg-ink-900/40">
                <th className="text-left text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Timestamp</th>
                <th className="text-left text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Device</th>
                <th className="text-left text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Alert Type</th>
                <th className="text-left text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Message</th>
                <th className="text-left text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Severity</th>
                <th className="text-left text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Incident</th>
                <th className="text-left text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-ink-400 text-sm">
                    No alerts match your filters.
                  </td>
                </tr>
              ) : (
                paginated.map((alert) => (
                  <tr key={alert.id} className="border-b border-ink-700/30 hover:bg-ink-800/40 transition-colors duration-150">
                    <td className="px-4 py-2.5">
                      <span className="text-xs font-mono text-ink-400">{alert.timestamp}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-sm text-ink-100 font-medium">{alert.device}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-xs font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-md">
                        {alert.alertType}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-ink-300">{alert.message}</span>
                        {alert.isDuplicate && (
                          <span title="Duplicate alert" className="flex-shrink-0">
                            <Copy className="h-3 w-3 text-ink-500" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <SeverityBadge severity={alert.severity} size="xs" />
                    </td>
                    <td className="px-4 py-2.5">
                      {alert.incidentId ? (
                        <Link
                          to={`/incidents/${alert.incidentId}`}
                          className="text-xs font-mono text-brand-400 hover:text-brand-300 hover:underline"
                        >
                          {alert.incidentId}
                        </Link>
                      ) : (
                        <span className="text-xs text-ink-500">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          alert.status === 'New'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : alert.status === 'Correlated'
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                              : alert.status === 'Acknowledged'
                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                : 'bg-ink-700 text-ink-400 border border-ink-600'
                        }`}
                      >
                        {alert.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-ink-700/50">
            <p className="text-xs text-ink-400">
              Page {page} of {totalPages} · {filtered.length} alerts
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg bg-ink-800 text-ink-300 hover:bg-ink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-lg text-sm font-medium transition-all ${
                    p === page ? 'bg-brand-500 text-white' : 'bg-ink-800 text-ink-300 hover:bg-ink-700'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg bg-ink-800 text-ink-300 hover:bg-ink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
