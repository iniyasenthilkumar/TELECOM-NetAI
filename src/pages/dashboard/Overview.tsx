import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { AlertTriangle, ArrowRight, Activity, Clock } from 'lucide-react';
import { MetricCard } from '@/components/ui/MetricCard';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfidenceIndicator } from '@/components/ui/ConfidenceIndicator';
import { incidents } from '@/data/incidents';
import { alerts } from '@/data/alerts';
import { severityColor } from '@/components/ui/SeverityBadge';

const alertsOverTime = [
  { time: '09:00', alerts: 12, incidents: 1 },
  { time: '09:15', alerts: 8, incidents: 0 },
  { time: '09:30', alerts: 15, incidents: 2 },
  { time: '09:45', alerts: 6, incidents: 0 },
  { time: '10:00', alerts: 22, incidents: 3 },
  { time: '10:15', alerts: 18, incidents: 1 },
  { time: '10:30', alerts: 35, incidents: 4 },
  { time: '10:45', alerts: 28, incidents: 2 },
  { time: '11:00', alerts: 19, incidents: 1 },
];

const incidentsBySeverity = [
  { name: 'Critical', value: 3, color: severityColor('Critical') },
  { name: 'High', value: 3, color: severityColor('High') },
  { name: 'Medium', value: 3, color: severityColor('Medium') },
  { name: 'Low', value: 1, color: severityColor('Low') },
  { name: 'Unknown', value: 1, color: severityColor('Unknown') },
];

const topDevices = [
  { name: 'Router-R1', alerts: 18 },
  { name: 'Router-R3', alerts: 23 },
  { name: 'Server-S6', alerts: 16 },
  { name: 'Server-S4', alerts: 11 },
  { name: 'Router-R2', alerts: 12 },
  { name: 'Switch-S4', alerts: 9 },
];

export function Overview() {
  const activeIncidents = incidents.filter((i) => i.status !== 'Resolved');
  const recentIncidents = [...incidents].sort((a, b) => b.confidence - a.confidence).slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-ink-50">Network Operations Overview</h1>
        <p className="mt-1 text-sm text-ink-400">Real-time visibility into network incidents and alert activity.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard label="Critical Incidents" value="03" trend="12%" trendUp={false} icon="alert" accent="red" />
        <MetricCard label="High Priority" value="07" trend="8%" trendUp={false} icon="warning" accent="orange" />
        <MetricCard label="Active Alerts" value="128" trend="23%" trendUp={true} icon="shield" accent="blue" />
        <MetricCard label="Affected Devices" value="24" trend="4%" trendUp={false} icon="server" accent="cyan" />
        <MetricCard label="System Health" value="98.4%" trend="0.2%" trendUp={true} icon="gauge" accent="green" />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Alerts Over Time */}
        <div className="glass-card p-6 lg:col-span-2 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-ink-50">Alerts & Incidents Over Time</h3>
              <p className="text-xs text-ink-400 mt-0.5">Last 3 hours · 5-minute intervals</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-ink-300">
                <span className="h-2 w-2 rounded-full bg-brand-400" /> Alerts
              </span>
              <span className="flex items-center gap-1.5 text-ink-300">
                <span className="h-2 w-2 rounded-full bg-orange-400" /> Incidents
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={alertsOverTime} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="alertGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1185f8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1185f8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="incidentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2238" vertical={false} />
              <XAxis dataKey="time" stroke="#6b7699" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7699" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0e1320',
                  border: '1px solid #1a2238',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#9aa3c0' }}
              />
              <Area type="monotone" dataKey="alerts" stroke="#1185f8" strokeWidth={2} fill="url(#alertGrad)" />
              <Area type="monotone" dataKey="incidents" stroke="#f97316" strokeWidth={2} fill="url(#incidentGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Incidents by Severity */}
        <div className="glass-card p-6 animate-fade-in-up">
          <h3 className="text-sm font-semibold text-ink-50 mb-1">Incidents by Severity</h3>
          <p className="text-xs text-ink-400 mb-4">Distribution across active incidents</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={incidentsBySeverity}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              >
                {incidentsBySeverity.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="#0e1320" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0e1320',
                  border: '1px solid #1a2238',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {incidentsBySeverity.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-ink-300">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.name}
                </span>
                <span className="text-ink-400 font-medium tabular-nums">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Incidents */}
        <div className="glass-card p-6 lg:col-span-2 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-ink-50">Priority Incidents</h3>
            <Link to="/incidents" className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentIncidents.map((inc) => (
              <Link
                key={inc.id}
                to={`/incidents/${inc.id}`}
                className="flex items-center gap-4 px-3 py-3 rounded-xl bg-ink-900/40 border border-ink-700/30 hover:border-ink-600 hover:bg-ink-800/60 transition-all duration-200"
              >
                <div className="flex-shrink-0">
                  <SeverityBadge severity={inc.severity} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-ink-400">{inc.id}</span>
                    <span className="text-sm font-medium text-ink-100 truncate">{inc.title}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-ink-400">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> {inc.alertCount} alerts
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="h-3 w-3" /> {inc.affectedDevices.length} devices
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {inc.detectedAt}
                    </span>
                  </div>
                </div>
                <div className="hidden md:block w-24">
                  <ConfidenceIndicator value={inc.confidence} size="sm" />
                </div>
                <StatusBadge status={inc.status} />
              </Link>
            ))}
          </div>
        </div>

        {/* Top Affected Devices */}
        <div className="glass-card p-6 animate-fade-in-up">
          <h3 className="text-sm font-semibold text-ink-50 mb-1">Top Affected Devices</h3>
          <p className="text-xs text-ink-400 mb-4">By alert count</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topDevices} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2238" horizontal={false} />
              <XAxis type="number" stroke="#6b7699" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#6b7699"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0e1320',
                  border: '1px solid #1a2238',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
                cursor={{ fill: 'rgba(26, 34, 56, 0.4)' }}
              />
              <Bar dataKey="alerts" fill="#1185f8" radius={[0, 6, 6, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
