import { Link } from 'react-router-dom';
import {
  ArrowRight,
  GitBranch,
  Brain,
  BookOpen,
  UserCheck,
  ShieldCheck,
  Search,
  Layers,
  TrendingUp,
  AlertTriangle,
  Activity,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { ConfidenceIndicator } from '@/components/ui/ConfidenceIndicator';

const features = [
  {
    icon: GitBranch,
    title: 'Alert Correlation',
    description: 'Group related network alerts into a single incident, eliminating noise and reducing alert fatigue.',
  },
  {
    icon: TrendingUp,
    title: 'Intelligent Prioritization',
    description: 'Identify incidents based on potential impact and severity, so teams focus on what matters first.',
  },
  {
    icon: BookOpen,
    title: 'Runbook-Grounded AI',
    description: 'Use approved troubleshooting runbooks to recommend actions — never guessing, always grounded.',
  },
  {
    icon: UserCheck,
    title: 'Human Escalation',
    description: 'Escalate uncertain or unsupported incidents to a human network engineer instead of guessing.',
  },
];

const workflow = [
  { label: 'Alerts', icon: AlertTriangle },
  { label: 'Correlation', icon: GitBranch },
  { label: 'Incident', icon: Layers },
  { label: 'Priority', icon: TrendingUp },
  { label: 'Runbook', icon: BookOpen },
  { label: 'Recommendation', icon: CheckCircle2 },
  { label: 'Escalation', icon: UserCheck },
];

const trustItems = [
  { icon: ShieldCheck, title: 'Evidence-Backed Recommendations', description: 'Every recommendation cites the exact runbook evidence used.' },
  { icon: Search, title: 'Traceable Alerts', description: 'Full alert lineage from raw alert to correlated incident.' },
  { icon: BookOpen, title: 'Runbook Citations', description: 'Recommendations link directly to approved troubleshooting procedures.' },
  { icon: Activity, title: 'Confidence Indicators', description: 'Each incident shows a confidence score with clear thresholds.' },
  { icon: UserCheck, title: 'Human-in-the-Loop', description: 'Uncertain cases escalate to engineers — the system never guesses.' },
  { icon: Brain, title: 'Explainable AI', description: 'Reasoning is shown alongside every analysis, not hidden in a black box.' },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-ink-950">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-950/80 backdrop-blur-xl border-b border-ink-700/40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-ink-300 hover:text-ink-100 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-ink-300 hover:text-ink-100 transition-colors">How It Works</a>
            <a href="#trust" className="text-sm text-ink-300 hover:text-ink-100 transition-colors">Trust & Explainability</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/signin" className="btn-ghost">Sign In</Link>
            <Link to="/signup" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern radial-fade opacity-20" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-brand-500/10 rounded-full blur-[150px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse-soft" />
                <span className="text-xs font-medium text-brand-300">Telecom — Network Incident Triage | PS07</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-50 leading-[1.1] tracking-tight">
                Turn Network Noise Into{' '}
                <span className="text-gradient">Actionable Incidents.</span>
              </h1>
              <p className="mt-6 text-lg text-ink-300 leading-relaxed max-w-xl">
                NetSentry AI correlates noisy network alerts, identifies incidents, prioritizes impact, and delivers evidence-backed troubleshooting recommendations.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Link to="/signup" className="btn-primary text-base px-6 py-3">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/dashboard" className="btn-secondary text-base px-6 py-3">
                  View Demo
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-ink-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>No setup required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Real demo data</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="animate-fade-in-up animation-delay-200">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-ink-50">Why NetSentry AI?</h2>
            <p className="mt-4 text-ink-400 max-w-2xl mx-auto">
              Four core capabilities that transform how network operations teams handle incidents.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass-card card-hover p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5">
                  <f.icon className="h-6 w-6 text-brand-400" />
                </div>
                <h3 className="text-lg font-semibold text-ink-50 mb-2">{f.title}</h3>
                <p className="text-sm text-ink-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 relative">
        <div className="absolute inset-0 grid-pattern radial-fade opacity-10" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-ink-50">How It Works</h2>
            <p className="mt-4 text-ink-400 max-w-2xl mx-auto">
              From raw alerts to human escalation — a deterministic, evidence-backed workflow.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-600 to-transparent" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-2">
              {workflow.map((step, i) => (
                <div key={step.label} className="flex flex-col items-center text-center relative">
                  <div className="h-14 w-14 rounded-2xl bg-ink-850 border border-ink-700/60 flex items-center justify-center mb-3 relative z-10 card-hover">
                    <step.icon className="h-6 w-6 text-brand-400" />
                  </div>
                  <span className="text-xs font-medium text-ink-300">{step.label}</span>
                  {i < workflow.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute top-5 -right-1 h-4 w-4 text-ink-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Explainability */}
      <section id="trust" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-ink-50">Trust & Explainability</h2>
            <p className="mt-4 text-ink-400 max-w-2xl mx-auto">
              Every recommendation is traceable, evidence-backed, and never guesses when evidence is missing.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustItems.map((item, i) => (
              <div
                key={item.title}
                className="glass-card card-hover p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-ink-800 border border-ink-700/60 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink-50 mb-1">{item.title}</h3>
                    <p className="text-sm text-ink-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[200px] w-[400px] bg-brand-500/15 rounded-full blur-[100px]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-50">Ready to triage smarter?</h2>
              <p className="mt-4 text-ink-400 max-w-xl mx-auto">
                Start monitoring your network operations with evidence-backed incident triage.
              </p>
              <Link to="/signup" className="btn-primary text-base px-8 py-3 mt-8 inline-flex">
                Start Monitoring
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-ink-700/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm text-ink-400">
            NexusTiq24 Hackathon — PS07: Network Incident Triage Assistant
          </p>
          <p className="text-xs text-ink-500">Built with Gemini AI + FAISS Retrieval</p>
        </div>
      </footer>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      <div className="glass-card p-5 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-400">
            <Activity className="h-3.5 w-3.5" />
            <span>Live Network Operations</span>
          </div>
        </div>

        {/* Incoming Alerts Stream */}
        <div className="mb-4">
          <p className="text-xs font-medium text-ink-400 uppercase tracking-wider mb-2">Incoming Alerts</p>
          <div className="space-y-1.5">
            {[
              { time: '10:32:10', device: 'Router-R1', type: 'UNREACHABLE', sev: 'Critical' as const },
              { time: '10:32:13', device: 'Router-R1', type: 'LINK_DOWN', sev: 'Critical' as const },
              { time: '10:32:16', device: 'Router-R1', type: 'PACKET_LOSS', sev: 'Critical' as const },
              { time: '10:32:20', device: 'Switch-S2', type: 'HIGH_LATENCY', sev: 'High' as const },
            ].map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-xs px-3 py-1.5 rounded-lg bg-ink-900/60 border border-ink-700/40 animate-slide-in-right"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <span className="text-ink-400 font-mono">{a.time}</span>
                <span className="text-ink-200 font-medium">{a.device}</span>
                <span className="text-ink-400">{a.type}</span>
                <SeverityBadge severity={a.sev} size="xs" />
              </div>
            ))}
          </div>
        </div>

        {/* Correlated Incident */}
        <div className="rounded-xl bg-brand-500/5 border border-brand-500/20 p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="h-4 w-4 text-brand-400" />
            <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider">Correlated Incident</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-ink-50">INC-001 — Core Router Failure</p>
              <p className="text-xs text-ink-400">4 alerts grouped · 2 devices affected</p>
            </div>
            <SeverityBadge severity="Critical" size="xs" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-ink-400">Confidence</span>
              <span className="text-green-400 font-semibold">92%</span>
            </div>
            <ConfidenceIndicator value={92} size="sm" />
          </div>
        </div>

        {/* AI Analysis */}
        <div className="rounded-xl bg-ink-900/60 border border-ink-700/40 p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4 text-brand-400" />
            <span className="text-xs font-semibold text-ink-200 uppercase tracking-wider">AI Analysis</span>
          </div>
          <p className="text-xs text-ink-300 leading-relaxed">
            <span className="text-ink-400">Likely Cause:</span> Core router/interface connectivity failure on Router-R1.
          </p>
        </div>

        {/* Runbook Recommendation */}
        <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-green-400" />
            <span className="text-xs font-semibold text-green-300 uppercase tracking-wider">Runbook Recommendation</span>
          </div>
          <p className="text-xs text-ink-300 mb-2">
            <span className="text-ink-400">RB-001 — Router Unreachable</span>
          </p>
          <div className="space-y-1">
            {['Check physical connectivity', 'Verify interface Gi0/1 status', 'Test router reachability'].map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-ink-300">
                <span className="h-4 w-4 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-[10px] text-green-400 font-semibold">
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating accent */}
      <div className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-brand-500/20 blur-md" />
      <div className="absolute -bottom-3 -left-3 h-8 w-8 rounded-full bg-brand-500/10 blur-md" />
    </div>
  );
}
