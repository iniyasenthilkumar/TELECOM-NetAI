export type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Unknown';
export type IncidentStatus = 'Open' | 'Investigating' | 'Monitoring' | 'Resolved' | 'Escalated';
export type AlertStatus = 'New' | 'Correlated' | 'Acknowledged' | 'Suppressed';
export type DeviceType = 'Router' | 'Switch' | 'Server' | 'Firewall' | 'Load Balancer';
export type DeviceStatus = 'Up' | 'Down' | 'Degraded' | 'Maintenance' | 'Unknown';

export interface Alert {
  id: string;
  timestamp: string;
  device: string;
  alertType: string;
  message: string;
  severity: Severity;
  incidentId: string | null;
  status: AlertStatus;
  isDuplicate: boolean;
}

export interface CorrelationEvidence {
  sameDevice: boolean;
  timeWindow: boolean;
  relatedAlertTypes: boolean;
  networkDependency: boolean;
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: IncidentStatus;
  affectedDevices: string[];
  affectedUsers: number;
  alertCount: number;
  detectedAt: string;
  confidence: number;
  summary: string;
  correlationEvidence: CorrelationEvidence;
  aiAnalysis: {
    likelyCause: string;
    reasoning: string;
  };
  runbookId: string | null;
  recommendation: string[] | null;
  recommendationEvidence: string | null;
  escalated: boolean;
  escalationReason?: string;
  unknownFactors?: string[];
}

export interface Device {
  id: string;
  name: string;
  ipAddress: string;
  type: DeviceType;
  location: string;
  status: DeviceStatus;
  lastSeen: string;
  activeIncidents: string[];
}

export interface Runbook {
  id: string;
  title: string;
  category: string;
  symptoms: string[];
  initialActions: string[];
  escalationCondition: string;
  lastUpdated: string;
  description: string;
}

export interface MetricCard {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: string;
  severity?: Severity;
}
