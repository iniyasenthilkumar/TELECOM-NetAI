import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Brain,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Server,
  Users,
  GitBranch,
  ShieldAlert,
  HelpCircle,
  UserCheck,
  FileText,
  Lightbulb,
} from 'lucide-react';
import { getIncidentById } from '@/data/incidents';
import { getAlertsByIncident } from '@/data/alerts';
import { getRunbookById } from '@/data/runbooks';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfidenceIndicator } from '@/components/ui/ConfidenceIndicator';
import { DeviceStatusIndicator } from '@/components/ui/DeviceStatusIndicator';
import { getDeviceByName } from '@/data/devices';

export function IncidentDetails() {
  const { id } = useParams<{ id: string }>();
  const incident = id ? getIncidentById(id) : undefined;

  if (!incident) {
    return (
      <div className="p-6">
        <div className="glass-card p-12 text-center">
          <AlertTriangle className="h-12 w-12 text-ink-400 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-ink-100">Incident not found</h2>
          <p className="text-sm text-ink-400 mt-2">The incident you're looking for does not exist.</p>
          <Link to="/incidents" className="btn-primary mt-6 inline-flex">
            <ArrowLeft className="h-4 w-4" /> Back to Incidents
          </Link>
        </div>
      </div>
    );
  }

  const relatedAlerts = getAlertsByIncident(incident.id);
  const runbook = getRunbookById(incident.runbookId);
  const isEscalated = incident.escalated;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Back link */}
      <Link to="/incidents" className="flex items-center gap-2 text-sm text-ink-400 hover:text-ink-100 transition-colors animate-fade-in">
        <ArrowLeft className="h-4 w-4" />
        Back to Incidents
      </Link>

      {/* Header */}
      <div className="glass-card p-6 animate-fade-in-up">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-mono text-brand-400 font-semibold">{incident.id}</span>
              <span className="text-ink-600">—</span>
              <h1 className="text-xl font-bold text-ink-50">{incident.title}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <SeverityBadge severity={incident.severity} />
              <StatusBadge status={incident.status} />
              <div className="flex items-center gap-2 text-sm text-ink-300">
                <Clock className="h-4 w-4 text-ink-400" />
                <span>Detected at {incident.detectedAt}</span>
              </div>
            </div>
          </div>
          <div className="lg:w-64">
            <p className="text-xs font-medium text-ink-400 uppercase tracking-wider mb-2">AI Confidence</p>
            <ConfidenceIndicator value={incident.confidence} size="lg" />
          </div>
        </div>

        {/* Key facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-ink-700/40">
          <div>
            <p className="text-xs text-ink-400 uppercase tracking-wider mb-1.5">Affected Devices</p>
            <div className="space-y-1">
              {incident.affectedDevices.map((d) => {
                const dev = getDeviceByName(d);
                return (
                  <div key={d} className="flex items-center gap-2">
                    <Server className="h-3.5 w-3.5 text-ink-400" />
                    <span className="text-sm text-ink-100 font-medium">{d}</span>
                    {dev && <DeviceStatusIndicator status={dev.status} />}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-xs text-ink-400 uppercase tracking-wider mb-1.5">Affected Users</p>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-ink-400" />
              <span className="text-lg font-bold text-ink-50 tabular-nums">{incident.affectedUsers.toLocaleString()}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-ink-400 uppercase tracking-wider mb-1.5">Correlated Alerts</p>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-ink-400" />
              <span className="text-lg font-bold text-ink-50 tabular-nums">{incident.alertCount}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-ink-400 uppercase tracking-wider mb-1.5">Runbook Match</p>
            <div className="flex items-center gap-2">
              {runbook ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">{runbook.id}</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-400">No match</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="glass-card p-6 animate-fade-in-up">
        <h2 className="text-sm font-semibold text-ink-50 mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4 text-brand-400" />
          Incident Summary
        </h2>
        <p className="text-sm text-ink-300 leading-relaxed">{incident.summary}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Related Alerts Timeline */}
        <div className="glass-card p-6 animate-fade-in-up">
          <h2 className="text-sm font-semibold text-ink-50 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-brand-400" />
            Related Alerts
            <span className="text-xs text-ink-400 font-normal">({relatedAlerts.length} correlated)</span>
          </h2>
          <div className="relative">
            <div className="absolute left-[15px] top-0 bottom-0 w-px bg-ink-700" />
            <div className="space-y-3">
              {relatedAlerts.map((alert, i) => (
                <div key={alert.id} className="relative flex items-start gap-4 pl-0">
                  <div
                    className={`h-8 w-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 ${
                      alert.isDuplicate
                        ? 'bg-ink-800 border-ink-600'
                        : alert.severity === 'Critical'
                          ? 'bg-red-500/10 border-red-500/40'
                          : alert.severity === 'High'
                            ? 'bg-orange-500/10 border-orange-500/40'
                            : alert.severity === 'Unknown'
                              ? 'bg-purple-500/10 border-purple-500/40'
                              : 'bg-ink-800 border-ink-600'
                    }`}
                  >
                    <AlertTriangle
                      className={`h-3.5 w-3.5 ${
                        alert.severity === 'Critical'
                          ? 'text-red-400'
                          : alert.severity === 'High'
                            ? 'text-orange-400'
                            : alert.severity === 'Unknown'
                              ? 'text-purple-400'
                              : 'text-ink-400'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-ink-400">{alert.timestamp}</span>
                      <span className="text-sm text-ink-100 font-medium">{alert.device}</span>
                      {alert.isDuplicate && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-ink-700 text-ink-400 font-medium">
                          DUPLICATE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ink-300 mt-0.5">
                      <span className="font-mono text-ink-400">{alert.alertType}</span> — {alert.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why This Incident Was Correlated */}
        <div className="glass-card p-6 animate-fade-in-up">
          <h2 className="text-sm font-semibold text-ink-50 mb-4 flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-brand-400" />
            Why This Incident Was Correlated
          </h2>
          <div className="space-y-3">
            <CorrelationRow
              label="Same affected device"
              passed={incident.correlationEvidence.sameDevice}
              detail="Multiple alerts reference the same network device."
            />
            <CorrelationRow
              label="Same time window"
              passed={incident.correlationEvidence.timeWindow}
              detail="Alerts occurred within a short temporal proximity."
            />
            <CorrelationRow
              label="Related alert types"
              passed={incident.correlationEvidence.relatedAlertTypes}
              detail="Alert types share a common failure pattern."
            />
            <CorrelationRow
              label="Network dependency relationship"
              passed={incident.correlationEvidence.networkDependency}
              detail="Devices share a network topology dependency."
            />
          </div>
        </div>
      </div>

      {/* AI Investigation */}
      <div className="glass-card p-6 animate-fade-in-up border-brand-500/20">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
            <Brain className="h-4 w-4 text-brand-400" />
          </div>
          <h2 className="text-sm font-semibold text-ink-50">AI Investigation</h2>
          <span className="text-xs text-ink-400 ml-auto">Powered by Gemini · FAISS Retrieval</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-ink-900/60 border border-ink-700/40 p-4">
            <p className="text-xs font-medium text-ink-400 uppercase tracking-wider mb-2">Likely Cause</p>
            <p className="text-sm text-ink-100 leading-relaxed">{incident.aiAnalysis.likelyCause}</p>
          </div>
          <div className="rounded-xl bg-ink-900/60 border border-ink-700/40 p-4">
            <p className="text-xs font-medium text-ink-400 uppercase tracking-wider mb-2">Reasoning</p>
            <p className="text-sm text-ink-100 leading-relaxed">{incident.aiAnalysis.reasoning}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-brand-500/5 border border-brand-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-brand-400" />
            <p className="text-xs font-medium text-brand-300 uppercase tracking-wider">AI Disclaimer</p>
          </div>
          <p className="text-xs text-ink-300 leading-relaxed">
            This analysis represents a likely cause based on correlated evidence, not a proven root cause. The system uses
            language such as "likely," "possible," and "indicates" deliberately. Final determination requires engineer verification.
          </p>
        </div>
      </div>

      {/* Runbook Recommendation OR Human Escalation */}
      {isEscalated ? (
        <EscalationCard incident={incident} />
      ) : runbook ? (
        <RunbookCard
          runbookId={runbook.id}
          runbookTitle={runbook.title}
          recommendation={incident.recommendation || []}
          evidence={incident.recommendationEvidence || ''}
          lastUpdated={runbook.lastUpdated}
        />
      ) : null}
    </div>
  );
}

function CorrelationRow({ label, passed, detail }: { label: string; passed: boolean; detail: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-ink-900/40 border border-ink-700/30 p-3">
      <div
        className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${
          passed ? 'bg-green-500/10 border border-green-500/30' : 'bg-ink-700 border border-ink-600'
        }`}
      >
        {passed ? (
          <CheckCircle2 className="h-4 w-4 text-green-400" />
        ) : (
          <XCircle className="h-4 w-4 text-ink-400" />
        )}
      </div>
      <div>
        <p className={`text-sm font-medium ${passed ? 'text-ink-100' : 'text-ink-400'}`}>{label}</p>
        <p className="text-xs text-ink-400 mt-0.5">{detail}</p>
      </div>
    </div>
  );
}

function RunbookCard({
  runbookId,
  runbookTitle,
  recommendation,
  evidence,
  lastUpdated,
}: {
  runbookId: string;
  runbookTitle: string;
  recommendation: string[];
  evidence: string;
  lastUpdated: string;
}) {
  return (
    <div className="glass-card p-6 animate-fade-in-up border-green-500/20">
      <div className="flex items-center gap-2 mb-5">
        <div className="h-8 w-8 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <BookOpen className="h-4 w-4 text-green-400" />
        </div>
        <h2 className="text-sm font-semibold text-ink-50">Recommended Initial Response</h2>
        <span className="text-xs text-ink-400 ml-auto">Runbook last updated: {lastUpdated}</span>
      </div>

      <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4 mb-4">
        <p className="text-xs font-medium text-green-300 uppercase tracking-wider mb-1">Matched Runbook</p>
        <p className="text-sm text-ink-100 font-medium">
          {runbookId} — {runbookTitle}
        </p>
      </div>

      <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-3">Recommended Steps</p>
      <div className="space-y-2 mb-5">
        {recommendation.map((step, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl bg-ink-900/40 border border-ink-700/30 p-3">
            <span className="h-6 w-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-xs font-semibold text-green-400 flex-shrink-0">
              {i + 1}
            </span>
            <p className="text-sm text-ink-200 leading-relaxed pt-0.5">{step}</p>
          </div>
        ))}
      </div>

      {/* Why this recommendation */}
      <div className="rounded-xl bg-ink-900/60 border border-ink-700/40 p-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-4 w-4 text-brand-400" />
          <p className="text-xs font-semibold text-ink-200 uppercase tracking-wider">Why this recommendation?</p>
        </div>
        <p className="text-sm text-ink-300 leading-relaxed">{evidence}</p>
      </div>
    </div>
  );
}

function EscalationCard({ incident }: { incident: NonNullable<ReturnType<typeof getIncidentById>> }) {
  return (
    <div className="glass-card p-6 animate-fade-in-up border-purple-500/30">
      <div className="flex items-center gap-2 mb-5">
        <div className="h-8 w-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
          <ShieldAlert className="h-4 w-4 text-purple-400" />
        </div>
        <h2 className="text-sm font-semibold text-ink-50">Human Review Required</h2>
        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-medium ml-auto">
          ESCALATED
        </span>
      </div>

      {/* Warning */}
      <div className="rounded-xl bg-purple-500/5 border border-purple-500/20 p-4 mb-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-purple-300">{incident.escalationReason}</p>
            <p className="text-xs text-ink-400 mt-1">
              The system does not invent troubleshooting procedures when evidence is unavailable. This incident has been escalated for human review.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-5">
        {/* What we know */}
        <div className="rounded-xl bg-ink-900/60 border border-ink-700/40 p-4">
          <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-3">What We Know</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-ink-400">Device:</span>
              <span className="text-ink-100 font-medium">{incident.affectedDevices.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-ink-400">Alert count:</span>
              <span className="text-ink-100 font-medium">{incident.alertCount}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-ink-400">Started at:</span>
              <span className="text-ink-100 font-medium">{incident.detectedAt}</span>
            </div>
          </div>
        </div>

        {/* What remains unknown */}
        <div className="rounded-xl bg-ink-900/60 border border-ink-700/40 p-4">
          <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-3">What Remains Unknown</p>
          <div className="space-y-2">
            {incident.unknownFactors?.map((factor, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <HelpCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-ink-300">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended action */}
      <div className="rounded-xl bg-purple-500/10 border border-purple-500/30 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <UserCheck className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="text-xs font-medium text-purple-300 uppercase tracking-wider">Recommended Action</p>
            <p className="text-sm font-semibold text-ink-50 mt-0.5">Escalate to Network Engineer</p>
          </div>
          <button className="btn-secondary ml-auto text-sm border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
            Assign Engineer
          </button>
        </div>
      </div>
    </div>
  );
}
