import type { Incident } from '@/types';

export const incidents: Incident[] = [
  {
    id: 'INC-001',
    title: 'Core Router Failure',
    severity: 'Critical',
    status: 'Investigating',
    affectedDevices: ['Router-R1', 'Switch-S2'],
    affectedUsers: 850,
    alertCount: 18,
    detectedAt: '10:32 AM',
    confidence: 92,
    summary:
      'Multiple network alerts indicate a possible failure involving Router-R1 and its connected interface Gi0/1. The router became unreachable at 10:32 AM, followed by link-down, packet loss, and latency alerts from dependent devices within a 15-second window.',
    correlationEvidence: {
      sameDevice: true,
      timeWindow: true,
      relatedAlertTypes: true,
      networkDependency: true,
    },
    aiAnalysis: {
      likelyCause:
        'Core router/interface connectivity failure on Router-R1, likely involving interface Gi0/1 link-down causing downstream packet loss and latency.',
      reasoning:
        'The system correlated 18 alerts involving the same router (Router-R1) and its dependent switch (Switch-S2) within a 15-second time window. The alert sequence — unreachable, link down, packet loss, latency — is consistent with a single interface or device failure propagating to dependent network paths.',
    },
    runbookId: 'RB-001',
    recommendation: [
      'Check physical connectivity and cable integrity at Router-R1.',
      'Verify interface Gi0/1 status using "show interface Gi0/1".',
      'Test router reachability using ping and traceroute from adjacent devices.',
      'Check routing information and BGP neighbor status on Router-R1.',
      'Escalate to Network Engineer if the router remains unreachable after 15 minutes.',
    ],
    recommendationEvidence:
      'Source: RB-001 — Router Unreachable. Evidence: "Check interface status and verify physical connectivity when a router becomes unreachable."',
    escalated: false,
  },
  {
    id: 'INC-002',
    title: 'Authentication Failures',
    severity: 'High',
    status: 'Open',
    affectedDevices: ['Server-S4'],
    affectedUsers: 120,
    alertCount: 11,
    detectedAt: '10:41 AM',
    confidence: 84,
    summary:
      'Repeated authentication failure events detected from Server-S4 targeting the RADIUS infrastructure. 11 failure events were correlated within a 3-minute window, indicating a possible credential issue or brute-force attempt.',
    correlationEvidence: {
      sameDevice: true,
      timeWindow: true,
      relatedAlertTypes: true,
      networkDependency: false,
    },
    aiAnalysis: {
      likelyCause:
        'Possible credential misconfiguration or brute-force authentication attempt targeting Server-S4 against the RADIUS server.',
      reasoning:
        'The system correlated 11 authentication failure alerts from the same device (Server-S4) within a 3-minute window. The alert pattern — repeated AUTH_FAILURE events with increasing frequency — is consistent with either a misconfigured service or a coordinated credential attack.',
    },
    runbookId: 'RB-004',
    recommendation: [
      'Identify the source and target of authentication failures on Server-S4.',
      'Check AAA server availability and RADIUS response time.',
      'Verify credentials and account status in the identity store.',
      'Review access logs for brute-force patterns or credential stuffing.',
      'Escalate to Security team if a coordinated attack pattern is detected.',
    ],
    recommendationEvidence:
      'Source: RB-004 — Authentication Failures. Evidence: "Repeated authentication failure events from a single device require AAA server verification and credential review."',
    escalated: false,
  },
  {
    id: 'INC-003',
    title: 'High Network Latency',
    severity: 'Medium',
    status: 'Monitoring',
    affectedDevices: ['Router-R3'],
    affectedUsers: 340,
    alertCount: 23,
    detectedAt: '10:52 AM',
    confidence: 79,
    summary:
      'Sustained latency above 250ms detected on network paths through Router-R3 in DC-West. 23 latency and jitter alerts were correlated over a 20-minute observation window.',
    correlationEvidence: {
      sameDevice: true,
      timeWindow: true,
      relatedAlertTypes: true,
      networkDependency: true,
    },
    aiAnalysis: {
      likelyCause:
        'Possible interface congestion or QoS misclassification on Router-R3 causing sustained latency on transit paths.',
      reasoning:
        'The system correlated 23 latency and jitter alerts involving Router-R3 over a 20-minute window. The sustained nature of the latency, combined with jitter spikes, indicates a congestion or QoS issue rather than a transient event.',
    },
    runbookId: 'RB-002',
    recommendation: [
      'Identify affected network segments using path analysis through Router-R3.',
      'Check interface utilization and queue depth on affected links.',
      'Review QoS policy configuration for misclassification.',
      'Analyze traffic patterns for congestion or abnormal flows.',
      'Escalate to Network Engineer if latency persists after QoS review.',
    ],
    recommendationEvidence:
      'Source: RB-002 — High Network Latency. Evidence: "Sustained latency above 200ms requires path analysis and QoS policy review to identify congestion or misclassification."',
    escalated: false,
  },
  {
    id: 'INC-004',
    title: 'VLAN Segment Connectivity Loss',
    severity: 'High',
    status: 'Investigating',
    affectedDevices: ['Switch-S4'],
    affectedUsers: 210,
    alertCount: 9,
    detectedAt: '10:45 AM',
    confidence: 88,
    summary:
      'Loss of connectivity detected on VLAN 200 through Switch-S4 in DC-West. STP topology change notifications and interface down events were correlated, indicating a possible link failure on the distribution layer.',
    correlationEvidence: {
      sameDevice: true,
      timeWindow: true,
      relatedAlertTypes: true,
      networkDependency: true,
    },
    aiAnalysis: {
      likelyCause:
        'Link failure on Switch-S4 affecting VLAN 200, likely caused by a transceiver or cable issue on the uplink to the core.',
      reasoning:
        'The system correlated STP topology change notifications with interface link-down events on Switch-S4 within a 30-second window. The pattern is consistent with a single uplink failure triggering STP reconvergence.',
    },
    runbookId: 'RB-003',
    recommendation: [
      'Verify physical link status and transceiver health on Switch-S4 uplinks.',
      'Check for recent configuration changes on the affected interface.',
      'Review STP convergence logs for topology changes.',
      'Confirm failover to redundant link if available.',
      'Escalate to Network Engineer if the link does not recover after physical inspection.',
    ],
    recommendationEvidence:
      'Source: RB-003 — Link Failure. Evidence: "Interface link state change to down with STP topology change notifications requires physical link verification and STP convergence review."',
    escalated: false,
  },
  {
    id: 'INC-005',
    title: 'Server Application Timeout',
    severity: 'Medium',
    status: 'Monitoring',
    affectedDevices: ['Server-S5'],
    affectedUsers: 95,
    alertCount: 14,
    detectedAt: '10:48 AM',
    confidence: 76,
    summary:
      'Application timeout events detected from Server-S5 in the App Tier. The timeouts correlate with intermittent latency spikes on the upstream network path.',
    correlationEvidence: {
      sameDevice: true,
      timeWindow: true,
      relatedAlertTypes: true,
      networkDependency: true,
    },
    aiAnalysis: {
      likelyCause:
        'Network path instability causing application timeouts on Server-S5, possibly related to upstream congestion.',
      reasoning:
        'The system correlated 14 application timeout alerts from Server-S5 with intermittent latency spikes on the upstream path. The temporal correlation suggests network path issues rather than application-level faults.',
    },
    runbookId: 'RB-002',
    recommendation: [
      'Identify affected network segments using path analysis to Server-S5.',
      'Check interface utilization and queue depth on upstream links.',
      'Review QoS policy configuration for misclassification.',
      'Analyze traffic patterns for congestion or abnormal flows.',
      'Escalate to Network Engineer if latency persists after QoS review.',
    ],
    recommendationEvidence:
      'Source: RB-002 — High Network Latency. Evidence: "Application timeout reports correlated with latency spikes indicate network path instability requiring path analysis."',
    escalated: false,
  },
  {
    id: 'INC-006',
    title: 'Access Switch Down',
    severity: 'Critical',
    status: 'Investigating',
    affectedDevices: ['Switch-S5'],
    affectedUsers: 180,
    alertCount: 7,
    detectedAt: '10:48 AM',
    confidence: 90,
    summary:
      'Switch-S5 in the Access layer of DC-East went down at 10:48 AM. All connected endpoints lost connectivity. The switch is not responding to management requests.',
    correlationEvidence: {
      sameDevice: true,
      timeWindow: true,
      relatedAlertTypes: true,
      networkDependency: true,
    },
    aiAnalysis: {
      likelyCause:
        'Complete device failure on Switch-S5, likely a hardware or power issue given the abrupt loss of all connectivity.',
      reasoning:
        'The system correlated 7 alerts — unreachable, all interfaces down, no SNMP response — from Switch-S5 within a 5-second window. The simultaneous loss of all interfaces and management connectivity is consistent with a device-level failure.',
    },
    runbookId: 'RB-003',
    recommendation: [
      'Verify physical link status and transceiver health on Switch-S5.',
      'Check for recent configuration changes on the affected interface.',
      'Review STP convergence logs for topology changes.',
      'Confirm failover to redundant link if available.',
      'Escalate to Network Engineer if the link does not recover after physical inspection.',
    ],
    recommendationEvidence:
      'Source: RB-003 — Link Failure. Evidence: "Loss of connectivity on a specific VLAN or segment with interface link state changes requires physical verification."',
    escalated: false,
  },
  {
    id: 'INC-007',
    title: 'Database Tier Packet Loss',
    severity: 'High',
    status: 'Open',
    affectedDevices: ['Server-S6'],
    affectedUsers: 450,
    alertCount: 16,
    detectedAt: '10:53 AM',
    confidence: 81,
    summary:
      'Sustained packet loss above 8% detected on the Database Tier through Server-S6. TCP retransmission spikes indicate possible interface errors or hardware degradation.',
    correlationEvidence: {
      sameDevice: true,
      timeWindow: true,
      relatedAlertTypes: true,
      networkDependency: false,
    },
    aiAnalysis: {
      likelyCause:
        'Interface errors or hardware degradation on Server-S6 network path, causing sustained packet loss and TCP retransmissions.',
      reasoning:
        'The system correlated 16 packet loss and TCP retransmission alerts from Server-S6 over a 10-minute window. The sustained nature and correlation with interface error counters suggests a hardware issue rather than congestion.',
    },
    runbookId: 'RB-005',
    recommendation: [
      'Identify the network segment where packet loss is occurring on Server-S6.',
      'Check interface error counters and CRC errors on affected links.',
      'Review hardware health for line cards or transceivers.',
      'Analyze traffic engineering paths for suboptimal routing.',
      'Escalate to Network Engineer if hardware faults are suspected.',
    ],
    recommendationEvidence:
      'Source: RB-005 — Packet Loss. Evidence: "Sustained packet loss above 5% with TCP retransmission spikes requires interface error counter analysis and hardware health review."',
    escalated: false,
  },
  {
    id: 'INC-008',
    title: 'BGP Session Instability',
    severity: 'Medium',
    status: 'Monitoring',
    affectedDevices: ['Router-R2'],
    affectedUsers: 60,
    alertCount: 12,
    detectedAt: '10:30 AM',
    confidence: 85,
    summary:
      'BGP session between Router-R2 and its upstream peer is flapping between Established and Idle states. Route withdrawal bursts are causing routing table instability.',
    correlationEvidence: {
      sameDevice: true,
      timeWindow: true,
      relatedAlertTypes: true,
      networkDependency: false,
    },
    aiAnalysis: {
      likelyCause:
        'BGP session instability on Router-R2, possibly caused by transport connectivity issues or hold timer misconfiguration with the upstream peer.',
      reasoning:
        'The system correlated 12 BGP state transition alerts from Router-R2 over a 15-minute window. The pattern of rapid Established-to-Idle transitions with hold timer expired events is consistent with transport instability or timer misconfiguration.',
    },
    runbookId: 'RB-006',
    recommendation: [
      'Check BGP neighbor configuration and hold timer values on Router-R2.',
      'Verify underlying transport connectivity to the BGP peer.',
      'Review BGP log messages for specific error codes.',
      'Check CPU and memory utilization on the affected router.',
      'Escalate to Network Engineer if the BGP session does not stabilize.',
    ],
    recommendationEvidence:
      'Source: RB-006 — BGP Session Flap. Evidence: "BGP session state transitions between Established and Idle require neighbor configuration review and transport connectivity verification."',
    escalated: false,
  },
  {
    id: 'INC-009',
    title: 'Firewall Policy Violation Spike',
    severity: 'Low',
    status: 'Resolved',
    affectedDevices: ['Firewall-FW1'],
    affectedUsers: 15,
    alertCount: 5,
    detectedAt: '09:15 AM',
    confidence: 87,
    summary:
      'Spike in firewall policy violation alerts on Firewall-FW1 was investigated and resolved. The violations were traced to a misconfigured NAT rule that has been corrected.',
    correlationEvidence: {
      sameDevice: true,
      timeWindow: true,
      relatedAlertTypes: true,
      networkDependency: false,
    },
    aiAnalysis: {
      likelyCause:
        'Misconfigured NAT rule on Firewall-FW1 causing policy violation alerts. The rule has been corrected and alerts have stopped.',
      reasoning:
        'The system correlated 5 policy violation alerts from Firewall-FW1 within a 10-minute window. All violations shared the same source-destination pattern, indicating a single misconfiguration rather than an attack.',
    },
    runbookId: 'RB-004',
    recommendation: [
      'Identify the source and target of authentication failures.',
      'Check AAA server availability and response time.',
      'Verify credentials and account status in the identity store.',
      'Review access logs for brute-force patterns or credential stuffing.',
      'Escalate to Security team if a coordinated attack pattern is detected.',
    ],
    recommendationEvidence:
      'Source: RB-004 — Authentication Failures. Evidence: "Access control list deny spikes require review of access logs for patterns."',
    escalated: false,
  },
  {
    id: 'INC-010',
    title: 'Unknown Device Anomaly — Router-X900',
    severity: 'Unknown',
    status: 'Escalated',
    affectedDevices: ['Router-X900'],
    affectedUsers: 0,
    alertCount: 17,
    detectedAt: '02:32 PM',
    confidence: 38,
    summary:
      '17 authentication failure events detected from Router-X900 at the Branch Site-Alpha. No matching troubleshooting runbook was found for this alert pattern. The system cannot determine the root cause with sufficient confidence and has escalated for human review.',
    correlationEvidence: {
      sameDevice: true,
      timeWindow: true,
      relatedAlertTypes: false,
      networkDependency: false,
    },
    aiAnalysis: {
      likelyCause:
        'Unable to determine likely cause with sufficient confidence. The alert pattern does not match any known runbook symptoms.',
      reasoning:
        'The system correlated 17 authentication failure alerts from Router-X900 over a 5-minute window. However, the device is a branch router with a different authentication architecture than the core network, and no runbook covers this specific device profile. Confidence is below the 60% threshold for automated recommendation.',
    },
    runbookId: null,
    recommendation: null,
    recommendationEvidence: null,
    escalated: true,
    escalationReason: 'No matching troubleshooting runbook found for this alert pattern and device profile.',
    unknownFactors: [
      'Root cause — the alert pattern does not match any known failure mode in the runbook library.',
      'Applicable troubleshooting procedure — no runbook covers Router-X900 branch authentication architecture.',
      'Affected user count — unable to determine impact scope for the branch site.',
    ],
  },
];

export function getIncidentById(id: string): Incident | undefined {
  return incidents.find((i) => i.id === id);
}
