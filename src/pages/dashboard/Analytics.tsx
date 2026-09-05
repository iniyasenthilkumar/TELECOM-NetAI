import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { TrendingUp, TrendingDown, GitBranch, UserCheck } from 'lucide-react';
import { severityColor } from '@/components/ui/SeverityBadge';

const alertsOverTime = [
  { time: '08:00', alerts: 8, incidents: 0 },
  { time: '08:30', alerts: 12, incidents: 1 },
  { time: '09:00', alerts: 15, incidents: 2 },
  { time: '09:30', alerts: 6, incidents: 0 },
  { time: '10:00', alerts: 22, incidents: 3 },
  { time: '10:30', alerts: 35, incidents: 4 },
  { time: '11:00', alerts: 28, incidents: 2 },
  { time: '11:30', alerts: 19, incidents: 1 },
  { time: '12:00', alerts: 14, incidents: 1 },
];

const incidentsBySeverity = [
  { name: 'Critical', value: 3, color: severityColor('Critical') },
  { name: 'High', value: 3, color: severityColor('High') },
  { name: 'Medium', value: 3, color: severityColor('Medium') },
  { name: 'Low', value: 1, color: severityColor('Low') },
  { name: 'Unknown', value: 1, color: severityColor('Unknown') },
];

const topAffectedDevices = [
  { name: 'Router-R3', alerts: 23 },
  { name: 'Router-R1', alerts: 18 },
  { name: 'Server-S6', alerts: 16 },
  { name: 'Server-S5', alerts: 14 },
  { name: 'Router-R2', alerts: 12 },
  { name: 'Server-S4', alerts: 11 },
  { name: 'Router-X900', alerts: 17 },
  { name: 'Switch-S4', alerts: 9 },
];

const resolutionTrend = [
  { day: 'Mon', opened: 8, resolved: 5, escalated: 1 },
  { day: 'Tue', opened: 12, resolved: 9, escalated: 2 },
  { day: 'Wed', opened: 6, resolved: 4, escalated: 0 },
  { day: 'Thu', opened: 10, resolved: 7, escalated: 1 },
  { day: 'Fri', opened: 14, resolved: 10, escalated: 2 },
  { day: 'Sat', opened: 4, resolved: 3, escalated: 0 },
  { day: 'Sun', opened: 3, resolved: 2, escalated: 1 },
];

const correlationRate = [
  { time: '08:00', rate: 85 },
  { time: '09:00', rate: 88 },
  { time: '10:00', rate: 92 },
  { time: '11:00', rate: 90 },
  { time: '12:00', rate: 94 },
];

const escalationGauge = [{ name: 'Escalation Rate', value: 10, fill: '#a855f7' }];

const tooltipStyle = {
  backgroundColor: '#0e1320',
  border: '1px solid #1a2238',
  borderRadius: '12px',
  fontSize: '12px',
};

export function Analytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-ink-50">Analytics</h1>
        <p className="mt-1 text-sm text-ink-400">Network incident trends, alert correlation, and escalation metrics.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-ink-400 uppercase tracking-wider">Avg Correlation Rate</p>
              <p className="text-2xl font-bold text-ink-50 mt-1">89.8%</p>
            </div>
            <GitBranch className="h-8 w-8 text-brand-400/40" />
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <TrendingUp className="h-3 w-3 text-green-400" />
            <span className="text-green-400 font-medium">+3.2%</span>
            <span className="text-ink-400">vs last week</span>
          </div>
        </div>

        <div className="glass-card p-4 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-ink-400 uppercase tracking-wider">Escalation Rate</p>
              <p className="text-2xl font-bold text-ink-50 mt-1">10%</p>
            </div>
            <UserCheck className="h-8 w-8 text-purple-400/40" />
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <TrendingDown className="h-3 w-3 text-green-400" />
            <span className="text-green-400 font-medium">-2.0%</span>
            <span className="text-ink-400">vs last week</span>
          </div>
        </div>

        <div className="glass-card p-4 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-ink-400 uppercase tracking-wider">Avg Resolution Time</p>
              <p className="text-2xl font-bold text-ink-50 mt-1">42m</p>
            </div>
            <TrendingDown className="h-8 w-8 text-green-400/40" />
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <TrendingDown className="h-3 w-3 text-green-400" />
            <span className="text-green-400 font-medium">-8m</span>
            <span className="text-ink-400">faster</span>
          </div>
        </div>

        <div className="glass-card p-4 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-ink-400 uppercase tracking-wider">Alert-to-Incident Ratio</p>
              <p className="text-2xl font-bold text-ink-50 mt-1">7.2:1</p>
            </div>
            <TrendingUp className="h-8 w-8 text-brand-400/40" />
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <TrendingUp className="h-3 w-3 text-green-400" />
            <span className="text-green-400 font-medium">+0.5</span>
            <span className="text-ink-400">better grouping</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Alerts Over Time */}
        <div className="glass-card p-6 animate-fade-in-up">
          <h3 className="text-sm font-semibold text-ink-50 mb-1">Alerts Over Time</h3>
          <p className="text-xs text-ink-400 mb-4">Hourly alert volume — last 5 hours</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={alertsOverTime} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="analyticsAlertGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1185f8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1185f8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2238" vertical={false} />
              <XAxis dataKey="time" stroke="#6b7699" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7699" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#9aa3c0' }} />
              <Area type="monotone" dataKey="alerts" stroke="#1185f8" strokeWidth={2} fill="url(#analyticsAlertGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Incidents by Severity */}
        <div className="glass-card p-6 animate-fade-in-up">
          <h3 className="text-sm font-semibold text-ink-50 mb-1">Incidents by Severity</h3>
          <p className="text-xs text-ink-400 mb-4">Current distribution</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="60%" height={200}>
              <PieChart>
                <Pie
                  data={incidentsBySeverity}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {incidentsBySeverity.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="#0e1320" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
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
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Affected Devices */}
        <div className="glass-card p-6 animate-fade-in-up">
          <h3 className="text-sm font-semibold text-ink-50 mb-1">Top Affected Devices</h3>
          <p className="text-xs text-ink-400 mb-4">By alert count</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topAffectedDevices} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2238" horizontal={false} />
              <XAxis type="number" stroke="#6b7699" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" stroke="#6b7699" fontSize={11} tickLine={false} axisLine={false} width={90} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(26, 34, 56, 0.4)' }} />
              <Bar dataKey="alerts" fill="#1185f8" radius={[0, 6, 6, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Incident Resolution Trends */}
        <div className="glass-card p-6 animate-fade-in-up">
          <h3 className="text-sm font-semibold text-ink-50 mb-1">Incident Resolution Trends</h3>
          <p className="text-xs text-ink-400 mb-4">Opened vs resolved vs escalated — last 7 days</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={resolutionTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2238" vertical={false} />
              <XAxis dataKey="day" stroke="#6b7699" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7699" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(26, 34, 56, 0.4)' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="opened" name="Opened" fill="#1185f8" radius={[4, 4, 0, 0]} barSize={12} />
              <Bar dataKey="resolved" name="Resolved" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={12} />
              <Bar dataKey="escalated" name="Escalated" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Alert-to-Incident Correlation Rate */}
        <div className="glass-card p-6 animate-fade-in-up">
          <h3 className="text-sm font-semibold text-ink-50 mb-1">Alert-to-Incident Correlation Rate</h3>
          <p className="text-xs text-ink-400 mb-4">Percentage of alerts successfully grouped into incidents</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={correlationRate} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2238" vertical={false} />
              <XAxis dataKey="time" stroke="#6b7699" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7699" fontSize={11} tickLine={false} axisLine={false} domain={[80, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Escalation Rate Gauge */}
        <div className="glass-card p-6 animate-fade-in-up">
          <h3 className="text-sm font-semibold text-ink-50 mb-1">Escalation Rate</h3>
          <p className="text-xs text-ink-400 mb-4">Percentage of incidents escalated to human review</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart
              data={escalationGauge}
              startAngle={90}
              endAngle={-270}
              innerRadius="70%"
              outerRadius="100%"
            >
              <RadialBar dataKey="value" cornerRadius={10} fill="#a855f7" background={{ fill: '#1a2238' }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-center -mt-32">
            <p className="text-3xl font-bold text-ink-50">10%</p>
            <p className="text-xs text-ink-400 mt-1">1 of 10 incidents escalated</p>
          </div>
        </div>
      </div>
    </div>
  );
}
