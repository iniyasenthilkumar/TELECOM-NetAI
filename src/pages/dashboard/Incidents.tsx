import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Eye, Filter } from 'lucide-react';
import { incidents } from '@/data/incidents';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfidenceIndicator } from '@/components/ui/ConfidenceIndicator';
import type { Severity, IncidentStatus } from '@/types';

const severityOptions: ('All' | Severity)[] = ['All', 'Critical', 'High', 'Medium', 'Low', 'Unknown'];
const statusOptions: ('All' | IncidentStatus)[] = ['All', 'Open', 'Investigating', 'Monitoring', 'Resolved', 'Escalated'];

const PAGE_SIZE = 8;

export function Incidents() {
  const [search, setSearch] = useState('');
  const [sevFilter, setSevFilter] = useState<'All' | Severity>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | IncidentStatus>('All');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'detectedAt' | 'confidence' | 'severity'>('detectedAt');

  const filtered = useMemo(() => {
    let result = incidents.filter((i) => {
      const matchesSearch =
        i.id.toLowerCase().includes(search.toLowerCase()) ||
        i.title.toLowerCase().includes(search.toLowerCase()) ||
        i.affectedDevices.some((d) => d.toLowerCase().includes(search.toLowerCase()));
      const matchesSev = sevFilter === 'All' || i.severity === sevFilter;
      const matchesStatus = statusFilter === 'All' || i.status === statusFilter;
      return matchesSearch && matchesSev && matchesStatus;
    });

    const sevRank: Record<Severity, number> = { Critical: 0, High: 1, Medium: 2, Low: 3, Unknown: 4 };
    result = [...result].sort((a, b) => {
      if (sortBy === 'confidence') return b.confidence - a.confidence;
      if (sortBy === 'severity') return sevRank[a.severity] - sevRank[b.severity];
      return a.detectedAt.localeCompare(b.detectedAt);
    });

    return result;
  }, [search, sevFilter, statusFilter, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = () => setPage(1);

  return (
    <div className="p-6 space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-ink-50">Incidents</h1>
        <p className="mt-1 text-sm text-ink-400">
          {filtered.length} correlated incidents · {incidents.filter((i) => i.status !== 'Resolved').length} active
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 animate-fade-in-up">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              placeholder="Search by incident ID, title, or device..."
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
                onChange={(e) => {
                  setSevFilter(e.target.value as 'All' | Severity);
                  handleFilterChange();
                }}
                className="input-field py-2 text-sm cursor-pointer"
              >
                {severityOptions.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Severities' : s}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as 'All' | IncidentStatus);
                handleFilterChange();
              }}
              className="input-field py-2 text-sm cursor-pointer"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Statuses' : s}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="input-field py-2 text-sm cursor-pointer"
            >
              <option value="detectedAt">Sort: Detected Time</option>
              <option value="confidence">Sort: Confidence</option>
              <option value="severity">Sort: Severity</option>
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
                <th className="text-left text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Incident ID</th>
                <th className="text-left text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Title</th>
                <th className="text-left text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Severity</th>
                <th className="text-left text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-center text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Devices</th>
                <th className="text-center text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Alerts</th>
                <th className="text-left text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Detected</th>
                <th className="text-left text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3 min-w-[120px]">Confidence</th>
                <th className="text-center text-xs font-semibold text-ink-300 uppercase tracking-wider px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-ink-400 text-sm">
                    No incidents match your filters.
                  </td>
                </tr>
              ) : (
                paginated.map((inc) => (
                  <tr
                    key={inc.id}
                    className="border-b border-ink-700/30 hover:bg-ink-800/40 transition-colors duration-150"
                  >
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-brand-400 font-medium">{inc.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/incidents/${inc.id}`} className="text-sm font-medium text-ink-100 hover:text-brand-400 transition-colors">
                        {inc.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <SeverityBadge severity={inc.severity} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={inc.status} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm text-ink-200 tabular-nums">{inc.affectedDevices.length}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm text-ink-200 tabular-nums">{inc.alertCount}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-ink-400 font-mono">{inc.detectedAt}</span>
                    </td>
                    <td className="px-4 py-3 min-w-[120px]">
                      <ConfidenceIndicator value={inc.confidence} size="sm" />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        to={`/incidents/${inc.id}`}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-ink-800 hover:bg-brand-500/20 text-ink-300 hover:text-brand-400 transition-all"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
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
              Page {page} of {totalPages} · {filtered.length} incidents
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg bg-ink-800 text-ink-300 hover:bg-ink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-lg text-sm font-medium transition-all ${
                    p === page
                      ? 'bg-brand-500 text-white'
                      : 'bg-ink-800 text-ink-300 hover:bg-ink-700'
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
