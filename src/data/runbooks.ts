import type { Runbook } from '@/types';

export const runbooks: Runbook[] = [
  {
    id: 'RB-001',
    title: 'Router Unreachable',
    category: 'Connectivity',
    symptoms: [
      'Router device unreachable via ICMP',
      'Interface link down event',
      'Packet loss exceeding 50%',
      'BGP neighbor status change to Idle',
    ],
    initialActions: [
      'Check physical connectivity and cable integrity at the affected router.',
      'Verify interface status using "show interface" for the affected port.',
      'Test router reachability using ping and traceroute from adjacent devices.',
      'Check routing information and BGP neighbor status.',
      'Escalate to Network Engineer if the router remains unreachable after 15 minutes.',
    ],
    escalationCondition: 'Router remains unreachable after initial connectivity checks and reachability tests are performed.',
    lastUpdated: '2026-08-28',
    description: 'Troubleshooting procedure for routers that become unreachable or have interface link-down events. Covers physical connectivity verification, interface status checks, and reachability testing.',
  },
  {
    id: 'RB-002',
    title: 'High Network Latency',
    category: 'Performance',
    symptoms: [
      'Sustained latency above 200ms on network paths',
      'Jitter exceeding 30ms',
      'Application timeout reports from users',
      'ICMP response time degradation',
    ],
    initialActions: [
      'Identify affected network segments using path analysis.',
      'Check interface utilization and queue depth on affected links.',
      'Review QoS policy configuration for misclassification.',
      'Analyze traffic patterns for congestion or abnormal flows.',
      'Escalate to Network Engineer if latency persists after QoS review.',
    ],
    escalationCondition: 'Latency remains above threshold after QoS and utilization review with no clear congestion cause.',
    lastUpdated: '2026-08-22',
    description: 'Procedure for diagnosing and mitigating sustained high network latency. Covers path analysis, interface utilization, and QoS policy review.',
  },
  {
    id: 'RB-003',
    title: 'Link Failure',
    category: 'Connectivity',
    symptoms: [
      'Interface link state change to down',
      'Loss of connectivity on a specific VLAN or segment',
      'Spanning Tree Protocol topology change notifications',
      'Redundant link failover events',
    ],
    initialActions: [
      'Verify physical link status and transceiver health on both ends.',
      'Check for recent configuration changes on the affected interface.',
      'Review STP convergence logs for topology changes.',
      'Confirm failover to redundant link if available.',
      'Escalate to Network Engineer if the link does not recover after physical inspection.',
    ],
    escalationCondition: 'Link remains down after physical inspection and configuration review with no redundant path available.',
    lastUpdated: '2026-09-01',
    description: 'Procedure for handling network link failures including physical verification, configuration review, and STP convergence analysis.',
  },
  {
    id: 'RB-004',
    title: 'Authentication Failures',
    category: 'Security',
    symptoms: [
      'Repeated authentication failure events from a single device or user',
      'RADIUS or TACACS+ server timeout events',
      'Account lockout notifications',
      'Access control list deny spikes',
    ],
    initialActions: [
      'Identify the source and target of authentication failures.',
      'Check AAA server availability and response time.',
      'Verify credentials and account status in the identity store.',
      'Review access logs for brute-force patterns or credential stuffing.',
      'Escalate to Security team if a coordinated attack pattern is detected.',
    ],
    escalationCondition: 'Authentication failures are coordinated across multiple sources or indicate a potential security incident.',
    lastUpdated: '2026-08-30',
    description: 'Procedure for investigating repeated authentication failures, including AAA server checks, credential verification, and security escalation criteria.',
  },
  {
    id: 'RB-005',
    title: 'Packet Loss',
    category: 'Performance',
    symptoms: [
      'Sustained packet loss above 5% on network paths',
      'TCP retransmission spikes',
      'Application degradation correlated with loss events',
      'MPLS traffic engineering path changes',
    ],
    initialActions: [
      'Identify the network segment where packet loss is occurring.',
      'Check interface error counters and CRC errors on affected links.',
      'Review hardware health for line cards or transceivers.',
      'Analyze traffic engineering paths for suboptimal routing.',
      'Escalate to Network Engineer if hardware faults are suspected.',
    ],
    escalationCondition: 'Packet loss is caused by suspected hardware failure or cannot be resolved through path optimization.',
    lastUpdated: '2026-08-25',
    description: 'Procedure for diagnosing packet loss including interface error analysis, hardware health checks, and traffic engineering path review.',
  },
  {
    id: 'RB-006',
    title: 'BGP Session Flap',
    category: 'Routing',
    symptoms: [
      'BGP session state transitions between Established and Idle',
      'Route withdrawal and re-announcement bursts',
      'BGP hold timer expired events',
      'Routing table instability',
    ],
    initialActions: [
      'Check BGP neighbor configuration and hold timer values.',
      'Verify underlying transport connectivity to the BGP peer.',
      'Review BGP log messages for specific error codes.',
      'Check CPU and memory utilization on the affected router.',
      'Escalate to Network Engineer if the BGP session does not stabilize.',
    ],
    escalationCondition: 'BGP session continues to flap after configuration review and transport connectivity verification.',
    lastUpdated: '2026-08-18',
    description: 'Procedure for diagnosing BGP session instability including neighbor configuration review, transport checks, and router resource analysis.',
  },
];

export function getRunbookById(id: string | null): Runbook | undefined {
  if (!id) return undefined;
  return runbooks.find((r) => r.id === id);
}
