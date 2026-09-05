import { useState, useMemo } from 'react';
import { Search, BookOpen, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { runbooks } from '@/data/runbooks';

const categories = ['All', 'Connectivity', 'Performance', 'Security', 'Routing'];

export function Runbooks() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return runbooks.filter((r) => {
      const matchesSearch =
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.symptoms.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  return (
    <div className="p-6 space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-ink-50">Runbooks</h1>
        <p className="mt-1 text-sm text-ink-400">
          {runbooks.length} approved troubleshooting procedures · Used for evidence-backed recommendations
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 animate-fade-in-up">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              placeholder="Search runbooks by title, symptoms, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  categoryFilter === cat
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                    : 'bg-ink-800 text-ink-400 border border-ink-700 hover:bg-ink-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Runbook Cards */}
      <div className="grid lg:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full glass-card p-12 text-center text-ink-400 text-sm">
            No runbooks match your search.
          </div>
        ) : (
          filtered.map((rb) => (
            <div key={rb.id} className="glass-card card-hover p-5 animate-fade-in-up">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-brand-400 font-medium">{rb.id}</p>
                    <h3 className="text-sm font-semibold text-ink-50">{rb.title}</h3>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-ink-800 text-ink-300 border border-ink-700 font-medium">
                  {rb.category}
                </span>
              </div>

              <p className="text-sm text-ink-400 leading-relaxed mb-4">{rb.description}</p>

              {/* Symptoms */}
              <div className="mb-4">
                <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-2">Symptoms</p>
                <div className="space-y-1">
                  {rb.symptoms.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-ink-300">
                      <AlertTriangle className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expandable actions */}
              <button
                onClick={() => setExpandedId(expandedId === rb.id ? null : rb.id)}
                className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 font-medium"
              >
                {expandedId === rb.id ? 'Hide' : 'Show'} initial actions
                <ArrowRight className={`h-3 w-3 transition-transform ${expandedId === rb.id ? 'rotate-90' : ''}`} />
              </button>

              {expandedId === rb.id && (
                <div className="mt-3 space-y-3 animate-fade-in">
                  <div>
                    <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-2">Initial Actions</p>
                    <div className="space-y-1.5">
                      {rb.initialActions.map((action, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-ink-300">
                          <span className="h-4 w-4 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-[10px] text-brand-400 font-semibold flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg bg-orange-500/5 border border-orange-500/20 p-3">
                    <p className="text-xs font-medium text-orange-300 uppercase tracking-wider mb-1">Escalation Condition</p>
                    <p className="text-xs text-ink-300">{rb.escalationCondition}</p>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-ink-700/30 flex items-center justify-between text-xs text-ink-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                  Approved
                </span>
                <span>Last updated: {rb.lastUpdated}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
