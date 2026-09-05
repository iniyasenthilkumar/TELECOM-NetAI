import type { Alert } from '@/types';

function generateAlerts(): Alert[] {
  const alerts: Alert[] = [];
  let counter = 1;

  const add = (
    time: string,
    device: string,
    alertType: string,
    message: string,
    severity: Alert['severity'],
    incidentId: string | null,
    status: Alert['status'],
    isDuplicate: boolean,
  ) => {
    alerts.push({
      id: `ALT-${String(counter).padStart(4, '0')}`,
      timestamp: time,
      device,
      alertType,
      message,
      severity,
      incidentId,
      status,
      isDuplicate,
    });
    counter++;
  };

  // INC-001: Core Router Failure — 18 alerts
  add('10:32:10', 'Router-R1', 'UNREACHABLE', 'Device unreachable via ICMP', 'Critical', 'INC-001', 'Correlated', false);
  add('10:32:13', 'Router-R1', 'LINK_DOWN', 'Interface Gi0/1 link down', 'Critical', 'INC-001', 'Correlated', false);
  add('10:32:16', 'Router-R1', 'PACKET_LOSS', 'Packet loss 85% on Gi0/1', 'Critical', 'INC-001', 'Correlated', false);
  add('10:32:20', 'Router-R1', 'HIGH_LATENCY', 'High latency detected on path', 'High', 'INC-001', 'Correlated', false);
  add('10:32:25', 'Router-R1', 'UNREACHABLE', 'Device unreachable via ICMP', 'Critical', 'INC-001', 'Correlated', true);
  add('10:32:30', 'Switch-S2', 'LINK_DOWN', 'Uplink to Router-R1 down', 'Critical', 'INC-001', 'Correlated', false);
  add('10:32:35', 'Switch-S2', 'PACKET_LOSS', 'Packet loss 72% on uplink', 'High', 'INC-001', 'Correlated', false);
  add('10:32:42', 'Router-R1', 'BGP_IDLE', 'BGP neighbor 10.0.0.10 state Idle', 'High', 'INC-001', 'Correlated', false);
  add('10:32:48', 'Router-R1', 'SNMP_TIMEOUT', 'SNMP timeout on Router-R1', 'Medium', 'INC-001', 'Correlated', false);
  add('10:32:55', 'Switch-S2', 'STP_CHANGE', 'STP topology change notification', 'Medium', 'INC-001', 'Correlated', false);
  add('10:33:02', 'Router-R1', 'UNREACHABLE', 'Device unreachable via ICMP', 'Critical', 'INC-001', 'Correlated', true);
  add('10:33:08', 'Router-R1', 'INTERFACE_ERR', 'Interface Gi0/1 input errors 145', 'High', 'INC-001', 'Correlated', false);
  add('10:33:15', 'Switch-S2', 'HIGH_LATENCY', 'Latency 320ms on uplink path', 'High', 'INC-001', 'Correlated', false);
  add('10:33:22', 'Router-R1', 'LINK_DOWN', 'Interface Gi0/1 link down', 'Critical', 'INC-001', 'Correlated', true);
  add('10:33:30', 'Switch-S2', 'UNREACHABLE', 'Management interface unreachable', 'High', 'INC-001', 'Correlated', false);
  add('10:33:38', 'Router-R1', 'PACKET_LOSS', 'Packet loss 91% on Gi0/1', 'Critical', 'INC-001', 'Correlated', false);
  add('10:33:45', 'Router-R1', 'BGP_IDLE', 'BGP neighbor 10.0.0.11 state Idle', 'High', 'INC-001', 'Correlated', false);
  add('10:33:52', 'Switch-S2', 'PACKET_LOSS', 'Packet loss 68% on uplink', 'High', 'INC-001', 'Correlated', true);

  // INC-002: Authentication Failures — 11 alerts
  add('10:41:02', 'Server-S4', 'AUTH_FAILURE', 'Repeated authentication failures (3)', 'High', 'INC-002', 'Correlated', false);
  add('10:41:15', 'Server-S4', 'AUTH_FAILURE', 'Repeated authentication failures (5)', 'High', 'INC-002', 'Correlated', false);
  add('10:41:28', 'Server-S4', 'AUTH_FAILURE', 'Repeated authentication failures (7)', 'High', 'INC-002', 'Correlated', false);
  add('10:41:35', 'Server-S4', 'RADIUS_TIMEOUT', 'RADIUS server timeout 5000ms', 'High', 'INC-002', 'Correlated', false);
  add('10:41:42', 'Server-S4', 'AUTH_FAILURE', 'Repeated authentication failures (10)', 'High', 'INC-002', 'Correlated', false);
  add('10:41:50', 'Server-S4', 'ACCT_LOCKOUT', 'Account lockout: svc_account_42', 'High', 'INC-002', 'Correlated', false);
  add('10:41:58', 'Server-S4', 'AUTH_FAILURE', 'Repeated authentication failures (12)', 'High', 'INC-002', 'Correlated', true);
  add('10:42:05', 'Server-S4', 'ACL_DENY', 'ACL deny spike from 10.0.2.4', 'Medium', 'INC-002', 'Correlated', false);
  add('10:42:12', 'Server-S4', 'AUTH_FAILURE', 'Repeated authentication failures (14)', 'High', 'INC-002', 'Correlated', false);
  add('10:42:20', 'Server-S4', 'RADIUS_TIMEOUT', 'RADIUS server timeout 8000ms', 'High', 'INC-002', 'Correlated', true);
  add('10:42:28', 'Server-S4', 'AUTH_FAILURE', 'Repeated authentication failures (17)', 'High', 'INC-002', 'Correlated', false);

  // INC-003: High Network Latency — 23 alerts
  for (let i = 0; i < 12; i++) {
    add(
      `10:${52 + Math.floor(i / 6)}:${String((i * 5) % 60).padStart(2, '0')}`,
      'Router-R3',
      'HIGH_LATENCY',
      `Latency ${250 + i * 8}ms on transit path`,
      i % 3 === 0 ? 'High' : 'Medium',
      'INC-003',
      'Correlated',
      i > 0 && i % 4 === 0,
    );
  }
  for (let i = 0; i < 11; i++) {
    add(
      `10:${53 + Math.floor(i / 6)}:${String((i * 7) % 60).padStart(2, '0')}`,
      'Router-R3',
      'JITTER',
      `Jitter ${30 + i * 3}ms on interface Gi0/2`,
      'Medium',
      'INC-003',
      'Correlated',
      i > 0 && i % 5 === 0,
    );
  }

  // INC-004: VLAN Segment Connectivity Loss — 9 alerts
  add('10:45:05', 'Switch-S4', 'LINK_DOWN', 'Interface Gi0/24 link down', 'High', 'INC-004', 'Correlated', false);
  add('10:45:08', 'Switch-S4', 'STP_CHANGE', 'STP topology change on VLAN 200', 'High', 'INC-004', 'Correlated', false);
  add('10:45:12', 'Switch-S4', 'VLAN_DOWN', 'VLAN 200 connectivity lost', 'High', 'INC-004', 'Correlated', false);
  add('10:45:18', 'Switch-S4', 'LINK_DOWN', 'Interface Gi0/24 link down', 'High', 'INC-004', 'Correlated', true);
  add('10:45:25', 'Switch-S4', 'STP_CHANGE', 'STP reconvergence in progress', 'Medium', 'INC-004', 'Correlated', false);
  add('10:45:32', 'Switch-S4', 'PACKET_LOSS', 'Packet loss 45% on VLAN 200', 'High', 'INC-004', 'Correlated', false);
  add('10:45:40', 'Switch-S4', 'VLAN_DOWN', 'VLAN 200 connectivity lost', 'High', 'INC-004', 'Correlated', true);
  add('10:45:48', 'Switch-S4', 'LINK_DOWN', 'Uplink Gi0/1 to core down', 'Critical', 'INC-004', 'Correlated', false);
  add('10:45:55', 'Switch-S4', 'STP_CHANGE', 'STP topology change notification', 'Medium', 'INC-004', 'Correlated', true);

  // INC-005: Server Application Timeout — 14 alerts
  for (let i = 0; i < 14; i++) {
    add(
      `10:${48 + Math.floor(i / 5)}:${String((i * 12) % 60).padStart(2, '0')}`,
      'Server-S5',
      i % 3 === 0 ? 'APP_TIMEOUT' : i % 3 === 1 ? 'HIGH_LATENCY' : 'PACKET_LOSS',
      i % 3 === 0
        ? `Application timeout from ${100 + i * 10}ms latency`
        : i % 3 === 1
          ? `Latency ${180 + i * 15}ms on upstream path`
          : `Packet loss ${3 + i}% on app tier`,
      i % 4 === 0 ? 'High' : 'Medium',
      'INC-005',
      'Correlated',
      i > 0 && i % 6 === 0,
    );
  }

  // INC-006: Access Switch Down — 7 alerts
  add('10:48:10', 'Switch-S5', 'UNREACHABLE', 'Device unreachable via ICMP', 'Critical', 'INC-006', 'Correlated', false);
  add('10:48:11', 'Switch-S5', 'LINK_DOWN', 'All interfaces down', 'Critical', 'INC-006', 'Correlated', false);
  add('10:48:12', 'Switch-S5', 'SNMP_TIMEOUT', 'SNMP timeout on Switch-S5', 'High', 'INC-006', 'Correlated', false);
  add('10:48:13', 'Switch-S5', 'LINK_DOWN', 'All interfaces down', 'Critical', 'INC-006', 'Correlated', true);
  add('10:48:14', 'Switch-S5', 'UNREACHABLE', 'Management interface unreachable', 'Critical', 'INC-006', 'Correlated', false);
  add('10:48:15', 'Switch-S5', 'STP_CHANGE', 'STP root bridge change detected', 'High', 'INC-006', 'Correlated', false);
  add('10:48:16', 'Switch-S5', 'LINK_DOWN', 'All interfaces down', 'Critical', 'INC-006', 'Correlated', true);

  // INC-007: Database Tier Packet Loss — 16 alerts
  for (let i = 0; i < 16; i++) {
    add(
      `10:${53 + Math.floor(i / 8)}:${String((i * 6) % 60).padStart(2, '0')}`,
      'Server-S6',
      i % 2 === 0 ? 'PACKET_LOSS' : 'TCP_RETRANS',
      i % 2 === 0
        ? `Packet loss ${6 + i * 0.5}% on DB tier path`
        : `TCP retransmission spike: ${50 + i * 8} retransmits/sec`,
      i % 3 === 0 ? 'High' : 'Medium',
      'INC-007',
      'Correlated',
      i > 0 && i % 5 === 0,
    );
  }

  // INC-008: BGP Session Instability — 12 alerts
  for (let i = 0; i < 12; i++) {
    add(
      `10:${30 + Math.floor(i / 3)}:${String((i * 15) % 60).padStart(2, '0')}`,
      'Router-R2',
      i % 2 === 0 ? 'BGP_IDLE' : 'BGP_ESTABLISHED',
      i % 2 === 0
        ? `BGP session to peer 10.0.0.20 state Idle`
        : `BGP session to peer 10.0.0.20 state Established`,
      i % 2 === 0 ? 'High' : 'Medium',
      'INC-008',
      'Correlated',
      i > 0 && i % 4 === 0,
    );
  }

  // INC-009: Firewall Policy Violation — 5 alerts (resolved)
  for (let i = 0; i < 5; i++) {
    add(
      `09:1${5 + i}:${String(i * 12).padStart(2, '0')}`,
      'Firewall-FW1',
      'POLICY_VIOLATION',
      `NAT rule mismatch caused policy violation from 10.0.3.50`,
      'Low',
      'INC-009',
      'Acknowledged',
      i > 0,
    );
  }

  // INC-010: Unknown Device Anomaly — 17 alerts (escalated)
  for (let i = 0; i < 17; i++) {
    add(
      `14:${32 + Math.floor(i / 4)}:${String((i * 7) % 60).padStart(2, '0')}`,
      'Router-X900',
      'AUTH_FAILURE',
      `Authentication failure #${i + 1} from unknown source 192.168.99.${50 + i}`,
      i < 5 ? 'High' : i < 10 ? 'Critical' : 'Unknown',
      'INC-010',
      'Correlated',
      i > 0 && i % 3 === 0,
    );
  }

  // Uncorrelated / New alerts — 20 alerts
  const uncorrelatedDevices = ['Router-R2', 'Switch-S1', 'Switch-S3', 'Firewall-FW2', 'LoadBalancer-LB1', 'Server-S4', 'Router-R3'];
  const uncorrelatedTypes = [
    ['LINK_DOWN', 'Interface flapping detected', 'Medium'],
    ['HIGH_LATENCY', 'Latency 150ms on path', 'Low'],
    ['PACKET_LOSS', 'Packet loss 2% on transit', 'Low'],
    ['SNMP_TIMEOUT', 'SNMP timeout 3000ms', 'Low'],
    ['CPU_HIGH', 'CPU utilization 87%', 'Medium'],
    ['MEM_HIGH', 'Memory utilization 91%', 'Medium'],
    ['LINK_DOWN', 'Interface flapping detected', 'Medium'],
    ['AUTH_FAILURE', 'Single authentication failure', 'Low'],
    ['BGP_IDLE', 'BGP session brief interruption', 'Medium'],
    ['STP_CHANGE', 'STP topology change notification', 'Low'],
    ['INTERFACE_ERR', 'Interface input errors 12', 'Low'],
    ['HIGH_LATENCY', 'Latency 180ms on edge path', 'Low'],
    ['PACKET_LOSS', 'Packet loss 3% on VLAN 100', 'Low'],
    ['CPU_HIGH', 'CPU utilization 82%', 'Medium'],
    ['LINK_DOWN', 'Interface Gi0/8 brief link flap', 'Low'],
    ['SNMP_TIMEOUT', 'SNMP timeout 2000ms', 'Low'],
    ['MEM_HIGH', 'Memory utilization 85%', 'Medium'],
    ['AUTH_FAILURE', 'Single authentication failure', 'Low'],
    ['HIGH_LATENCY', 'Latency 165ms on access path', 'Low'],
    ['PACKET_LOSS', 'Packet loss 1.5% on edge', 'Low'],
  ] as const;

  uncorrelatedTypes.forEach((ut, i) => {
    add(
      `10:${50 + Math.floor(i / 5)}:${String((i * 13) % 60).padStart(2, '0')}`,
      uncorrelatedDevices[i % uncorrelatedDevices.length],
      ut[0],
      ut[1],
      ut[2] as Alert['severity'],
      null,
      'New',
      false,
    );
  });

  return alerts;
}

export const alerts: Alert[] = generateAlerts();

export function getAlertsByIncident(incidentId: string): Alert[] {
  return alerts.filter((a) => a.incidentId === incidentId);
}

export function getAlertsByDevice(deviceName: string): Alert[] {
  return alerts.filter((a) => a.device === deviceName);
}
