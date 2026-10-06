import React, { useState } from 'react';
import {
  Layers,
  Network,
  Server,
  Shield,
  Monitor,
  Wifi,
  Video,
  Phone,
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  Download,
  Sliders,
  Settings,
  Plus,
  Trash2,
  ChevronRight,
  Compass,
  FileText,
  Terminal,
  Copy,
  Check,
  Building,
  Factory,
  Stethoscope,
  Briefcase,
  Radio,
  Code,
  Sparkles,
  Cable
} from 'lucide-react';

export type EnvironmentType = 'university' | 'industry' | 'hospital' | 'office' | 'sme';

interface ZoneConfig {
  id: string;
  name: string;
  splitRatio: '1:4' | '1:8' | '1:16' | '1:32';
  pcs: number;
  wifiAps: number;
  cctvCameras: number;
  ipPhones: number;
}

interface DeviceBlueprint {
  id: string;
  name: string;
  category: 'Active Core' | 'Headend' | 'Passive ODN' | 'Edge Terminal' | 'User Endpoint';
  modelExample: string;
  roleSummary: string;
  environmentRoles: Record<EnvironmentType, string>;
  wiringMap: {
    sourceInterface: string;
    cableMedium: string;
    targetDevice: string;
    targetInterface: string;
    signalType: string;
  }[];
  specifications: { label: string; value: string }[];
  deploymentGuide: string[];
  cliConfiguration: string;
  verificationCommands: string[];
}

export const DEVICE_BLUEPRINTS: Record<string, DeviceBlueprint> = {
  firewall: {
    id: 'firewall',
    name: 'Enterprise Security Gateway / Firewall',
    category: 'Active Core',
    modelExample: 'Huawei USG6680E / FortiGate 600F / Cisco Firepower 2140',
    roleSummary: 'Perimeter protection, deep packet inspection, inter-VLAN access control, and NAT translation for all campus traffic.',
    environmentRoles: {
      university: 'Isolates student Wi-Fi traffic from financial/admin servers, enforces academic content filtering, and manages dual 10GE ISP uplinks.',
      industry: 'Enforces strict OT/IT zero-trust boundary, insulates SCADA/PLC networks from external threats, and inspects industrial protocols (Modbus/Profinet).',
      hospital: 'Guarantees HIPAA/regulatory isolation for medical telemetry & PACS imaging data; restricts MRI/CT diagnostic workstation traffic to on-premise radiology servers.',
      office: 'Enterprise perimeter firewall with SSL-VPN remote access, SaaS acceleration, and automated threat prevention for cloud collaboration.',
      sme: 'All-in-one perimeter security gateway, DNS proxy, and integrated DHCP server for small branch campus.'
    },
    wiringMap: [
      { sourceInterface: '10GE 0/0/1', cableMedium: 'Single-mode Fiber (LC/UPC)', targetDevice: 'ISP 1 Primary Gateway', targetInterface: 'WAN Uplink', signalType: 'IP Transit / BGP' },
      { sourceInterface: '10GE 0/0/2', cableMedium: 'Single-mode Fiber (LC/UPC)', targetDevice: 'ISP 2 Secondary Gateway', targetInterface: 'WAN Uplink', signalType: 'Backup Transit' },
      { sourceInterface: '40GE 0/0/3-4 (Eth-Trunk 1)', cableMedium: 'Direct Attach Copper / MPO Fiber', targetDevice: 'Campus Core Switch', targetInterface: '100GE 1/0/1-2', signalType: 'Internal 802.1Q Trunk' }
    ],
    specifications: [
      { label: 'Firewall Throughput', value: '40 Gbps IPv4 / 20 Gbps Threat Protection' },
      { label: 'Concurrent Sessions', value: '6,000,000 active sessions' },
      { label: 'Power Supply', value: 'Dual Redundant AC/DC 350W' },
      { label: 'Security Zones', value: 'Trust (LAN), Untrust (Internet), DMZ (Servers)' }
    ],
    deploymentGuide: [
      'Mount unit into central data center Rack A1 with 1U space and dual dedicated power rails.',
      'Connect Out-of-Band Management (OOB) Ethernet port to dedicated IT management switch.',
      'Configure Eth-Trunk 1 LACP bundle to campus core switch and trunk VLANs 10, 20, 30, 40, 50, 60.',
      'Define security zone policies: permit Faculty/Students to Internet, block student VLAN from Admin servers.',
      'Isolate Surveillance CCTV (VLAN 50) and restrict to local Network Video Recorders (NVR) only.'
    ],
    cliConfiguration: `# === HUAWEI USG6600E ENTERPRISE FIREWALL CONFIGURATION ===
sysname Campus-FW-01
#
# 1. Configure LACP Link Aggregation to Core Switch
interface Eth-Trunk 1
 description TRUNK-TO-CAMPUS-CORE-SWITCH
 portswitch
 mode lacp-static
 trunkpermit vlan 10 20 30 40 50 60 99
#
interface GigabitEthernet 0/0/3
 eth-trunk 1
interface GigabitEthernet 0/0/4
 eth-trunk 1
#
# 2. Define Security Zones
firewall zone trust
 set priority 85
 add interface Eth-Trunk 1
#
firewall zone untrust
 set priority 5
 add interface 10GE 0/0/1
 add interface 10GE 0/0/2
#
firewall zone dmz
 set priority 50
#
# 3. Inter-VLAN & Internet Security Policies
security-policy
 rule name PERMIT_CAMPUS_INTERNET
  source-zone trust
  destination-zone untrust
  source-address 10.10.0.0 mask 255.255.0.0
  action permit
 #
 rule name ISOLATE_CCTV_CAMERAS
  source-zone trust
  destination-zone untrust
  source-address 10.10.50.0 mask 255.255.255.0
  action deny
 #
 rule name PROTECT_ADMIN_SERVERS
  source-zone trust
  destination-zone trust
  source-address 10.10.30.0 mask 255.255.255.0
  destination-address 10.10.10.0 mask 255.255.255.0
  action deny
#
# 4. Outbound NAT Policy
nat-policy
 rule name NAT_OUTBOUND_CAMPUS
  source-zone trust
  destination-zone untrust
  source-address 10.10.0.0 mask 255.255.0.0
  action source-nat easy-ip
return`,
    verificationCommands: [
      'display firewall session table',
      'display security-policy rule all',
      'display interface Eth-Trunk 1',
      'display nat-policy all'
    ]
  },

  core: {
    id: 'core',
    name: 'Campus Core Switch (100GE L3 Routing Fabric)',
    category: 'Active Core',
    modelExample: 'Huawei CloudEngine S12700E / Cisco Catalyst 9606R',
    roleSummary: 'Central Layer 3 routing spine connecting all campus VLANs, hosting default gateways, DHCP relays, and redundant OLT uplinks.',
    environmentRoles: {
      university: 'Layer 3 routing spine handling 5,000+ simultaneous student & faculty sessions across VLANs 10–99 with wire-speed LACP 100GE uplinks.',
      industry: 'Resilient non-blocking fabric for real-time robotic telemetry, automated guided vehicles (AGV), and enterprise ERP interconnects.',
      hospital: 'Redundant dual-engine core switch ensuring 99.999% uptime for surgical rooms, ICU monitoring, and PACS imaging transfers.',
      office: 'High-density 100GE core switch with hardware VXLAN support for seamless hot-desking mobility across headquarters floors.',
      sme: 'Compact L3 aggregation switch handling inter-VLAN routing and gateway duties.'
    },
    wiringMap: [
      { sourceInterface: '100GE 1/0/1-2 (Eth-Trunk 1)', cableMedium: '40G/100G Direct Attach Fiber', targetDevice: 'Enterprise Firewall', targetInterface: 'Eth-Trunk 1', signalType: 'Northbound Transit' },
      { sourceInterface: '100GE 1/0/3-4 (Eth-Trunk 2)', cableMedium: '100G Single-mode Fiber (MPO/LC)', targetDevice: 'Optical Line Terminal (OLT-A)', targetInterface: '100GE 0/9/0-1', signalType: 'Southbound Optical Feeder' },
      { sourceInterface: '100GE 2/0/3-4 (Eth-Trunk 3)', cableMedium: '100G Single-mode Fiber (MPO/LC)', targetDevice: 'Optical Line Terminal (OLT-B)', targetInterface: '100GE 0/9/0-1', signalType: 'Redundant Protection Feeder' }
    ],
    specifications: [
      { label: 'Switching Capacity', value: '57.6 Tbps non-blocking backplane' },
      { label: 'Packet Forwarding Rate', value: '14,400 Mpps' },
      { label: 'High Availability', value: 'CSS2 Hardware Fabric Clustering (<50ms failover)' },
      { label: 'Routing Protocols', value: 'OSPFv3, BGP4+, IS-IS, VRRP, PIM-SM' }
    ],
    deploymentGuide: [
      'Rack mount dual Main Processing Units (MPU) and redundant power modules in Data Center Rack A2.',
      'Configure L3 Gateway VLANIFs: VLAN 10 (Admin), 20 (Faculty), 30 (Students), 50 (CCTV), 60 (VoIP).',
      'Configure DHCP Relay with Option 82 to forward requests to centralized Windows Server / Infoblox DHCP.',
      'Enable 802.1p CoS and DSCP QoS queues: prioritize Voice (CoS 5, DSCP EF) and Video (CoS 4, DSCP AF41).',
      'Establish LACP Eth-Trunk 2 to OLT uplink board.'
    ],
    cliConfiguration: `# === HUAWEI CLOUDENGE S12700E CORE SWITCH CONFIGURATION ===
sysname Campus-Core-01
#
# 1. Create Campus Global VLANs
vlan batch 10 20 30 40 50 60 99
#
# 2. Configure L3 Gateway Interfaces
interface Vlanif10
 description GATEWAY-ADMIN-SERVERS
 ip address 10.10.10.1 255.255.255.0
#
interface Vlanif20
 description GATEWAY-FACULTY-OFFICES
 ip address 10.10.20.1 255.255.255.0
 dhcp select relay
 dhcp relay server-ip 10.10.10.50
#
interface Vlanif30
 description GATEWAY-STUDENT-CLASSROOMS
 ip address 10.10.30.1 255.255.254.0
 dhcp select relay
 dhcp relay server-ip 10.10.10.50
#
interface Vlanif50
 description GATEWAY-CCTV-CAMERAS
 ip address 10.10.50.1 255.255.255.0
#
interface Vlanif60
 description GATEWAY-VOIP-PHONES
 ip address 10.10.60.1 255.255.255.0
#
# 3. Configure 100GE LACP Trunk to OLT Headend
interface Eth-Trunk 2
 description 100GE-UPLINK-TO-CENTRAL-OLT
 port link-type trunk
 port trunk allow-pass vlan 10 20 30 40 50 60 99
 mode lacp-static
#
interface 100GE 1/0/3
 eth-trunk 2
interface 100GE 1/0/4
 eth-trunk 2
#
# 4. Default Route to Firewall Gateway
ip route-static 0.0.0.0 0.0.0.0 10.10.99.254
return`,
    verificationCommands: [
      'display vlan summary',
      'display eth-trunk 2',
      'display ip routing-table',
      'display dhcp relay statistics'
    ]
  },

  nms: {
    id: 'nms',
    name: 'Network Management System (NMS / iMaster NCE)',
    category: 'Active Core',
    modelExample: 'Huawei iMaster NCE-Campus / ZTE ZENIC ONE',
    roleSummary: 'Centralized telemetry, automated OMCI zero-touch provisioning, optical power threshold monitoring, and Rogue ONT detection.',
    environmentRoles: {
      university: 'Centralized campus dashboard: manages 1,200+ ONUs, automates zero-touch registration via OMCI, and monitors optical link budgets in real time.',
      industry: '24/7 industrial telemetry engine monitoring plant-floor optical power levels and sending instant alerts before dirty environments degrade lasers.',
      hospital: 'Mission-critical health monitoring platform ensuring sub-50ms Type B feeder protection failover and tracking diagnostic port latency.',
      office: 'Self-service administrative portal for provisioning employee desk bandwidth and monitoring Wi-Fi 7 client density.',
      sme: 'Web-based centralized management reducing IT administration to a single technician.'
    },
    wiringMap: [
      { sourceInterface: 'Management NIC 1', cableMedium: 'Cat6A RJ-45 Copper', targetDevice: 'Campus Core Switch', targetInterface: 'GE 1/0/99 (VLAN 99)', signalType: 'SNMPv3 / NETCONF / RESTCONF' }
    ],
    specifications: [
      { label: 'Managed Terminals Capacity', value: 'Up to 50,000 ONUs / APs' },
      { label: 'Telemetry Precision', value: 'Second-level real-time optical power polling' },
      { label: 'Protocols Supported', value: 'OMCI (ITU-T G.988), NETCONF, RESTCONF, SNMPv3' },
      { label: 'Alarm Triggers', value: 'Rx Power < -24.0 dBm, Fiber Cut, Laser Degrade' }
    ],
    deploymentGuide: [
      'Deploy virtual appliance on VMware ESXi / KVM cluster in central data center.',
      'Configure static IP on Out-of-Band Management VLAN 99.',
      'Import campus building GIS blueprints and room ONU port mappings.',
      'Create standard OMCI Service Templates (e.g. Faculty Profile, Lab Profile, Wi-Fi Profile).',
      'Enable automated Rogue ONT detection: continuously listens for babbling lasers that jam upstream optical trees.'
    ],
    cliConfiguration: `# === NMS / OLT INTEGRATION CONFIGURATION SCRIPT ===
# Configure SNMPv3 credentials on OLT for NMS secure polling
snmp-agent
snmp-agent sys-info version v3
snmp-agent group v3 NMS_ADMIN_GROUP privacy
snmp-agent user v3 nms_operator NMS_ADMIN_GROUP authentication-mode sha AuthPassword2026! privacy-mode aes128 PrivPassword2026!
#
# Configure Telemetry Server & Periodic Trap Push
snmp-agent target-host trap address udp-domain 10.10.99.10 params securityname nms_operator v3 privacy
#
# Enable Optical Threshold Alarms (Proactive Rx Degradation)
optical-alarm threshold rx-power critical -24.0
optical-alarm threshold rx-power warning -22.0
#
# Enable Rogue ONT Auto-Detection & Isolation
rogue-ont check manual 0/1/1
return`,
    verificationCommands: [
      'display snmp-agent sys-info',
      'display optical-alarm threshold',
      'display rogue-ont info all'
    ]
  },

  olt: {
    id: 'olt',
    name: 'Optical Line Terminal (OLT Headend)',
    category: 'Headend',
    modelExample: 'Huawei SmartAX EA5800-X7 / ZTE Titan C600 / Nokia FX-4',
    roleSummary: 'Central headend concentrating all campus optical ports. Serves up to 1,024 ONUs per shelf over single-mode glass with 0 powered switches outside the IT room.',
    environmentRoles: {
      university: 'Central headend chassis housing 16-port XGS-PON line cards; runs Dynamic Bandwidth Allocation (DBA) to balance high burst traffic during classes.',
      industry: 'Carrier-grade headend operating in central climate-controlled server room, feeding passive glass into harsh manufacturing zones.',
      hospital: 'Dual-homed Type B protected OLT system guaranteeing non-stop connectivity for critical medical telemetry.',
      office: 'Concentrated 10G-PON headend feeding multi-tenant office floors with AES-128 hardware encrypted lines.',
      sme: 'Compact 1U pizza-box OLT (e.g. Huawei SmartAX MA5801) delivering 8 PON ports at low capital cost.'
    },
    wiringMap: [
      { sourceInterface: '100GE 0/9/0-1', cableMedium: '100G Single-mode Fiber', targetDevice: 'Campus Core Switch', targetInterface: 'Eth-Trunk 2', signalType: 'LACP 100GE Uplink' },
      { sourceInterface: 'XGS-PON Port 0/1/1', cableMedium: 'Single-mode SC/APC Pigtail (Green)', targetDevice: 'Central ODF Frame', targetInterface: 'Tray 1 Adapter 8', signalType: '10G Symmetric Laser (1577nm/1270nm)' },
      { sourceInterface: 'XGS-PON Port 0/1/2', cableMedium: 'Single-mode SC/APC Pigtail (Green)', targetDevice: 'Central ODF Frame', targetInterface: 'Tray 1 Adapter 9', signalType: 'Zone 2 Feeder' }
    ],
    specifications: [
      { label: 'PON Technology', value: 'XGS-PON (ITU-T G.9807.1) 10G Down / 10G Up' },
      { label: 'Downstream Wavelength', value: '1577 nm (Continuous Laser)' },
      { label: 'Upstream Wavelength', value: '1270 nm (Burst Mode Laser)' },
      { label: 'Optical Power Class', value: 'Class N1 (+2.0 to +5.0 dBm Tx, -29 dBm Rx Sensitivity)' },
      { label: 'Split Ratio Capacity', value: 'Up to 1:64 or 1:128 per PON port' },
      { label: 'Power Consumption', value: 'Dual -48V DC, ~450W full load' }
    ],
    deploymentGuide: [
      'Install OLT chassis into central data center 19-inch rack with dual -48V DC power supplies.',
      'Insert redundant Main Processing Control Boards (MPLA/MPLB) in slots 9 and 10.',
      'Insert 16-Port XGS-PON combo interface card in Slot 1.',
      'Define DBA Bandwidth profiles: T1 (Fixed Voice), T3 (Assured Faculty), T4 (Best-Effort Student).',
      'Create ONT Line Profile & Service Profile specifying GEM ports, T-CONTs, and VLAN mappings.',
      'Add ONUs via unique Serial Number (SN) authentication with zero-touch OMCI configuration push.'
    ],
    cliConfiguration: `# === HUAWEI SMARTAX EA5800-X7 OLT PRODUCTION CONFIGURATION ===
sysname Central-OLT-01
#
# 1. Configure Dynamic Bandwidth Allocation (DBA) Profiles
# T3 Profile for Faculty: 50 Mbps guaranteed, 1000 Mbps burstable
dba-profile add profile-id 20 profile-name FACULTY_DBA type3 assure 51200 max 1024000
# T1 Profile for Voice/CCTV: Fixed 20 Mbps, zero jitter
dba-profile add profile-id 30 profile-name CCTV_VOICE_DBA type1 fix 20480
#
# 2. Configure ONT Line Profile (Mapping Traffic to T-CONTs)
ont-lineprofile xgpon profile-id 20 profile-name FACULTY_LINE_PROFILE
 tcont 1 dba-profile-id 20
 tcont 2 dba-profile-id 30
 gem add 1 eth tcont 1
 gem add 2 eth tcont 2
 gem mapping 1 1 vlan 20
 gem mapping 2 1 vlan 50
 commit
quit
#
# 3. Configure ONT Service Profile (Port Types: 4xGE Ethernet)
ont-srvprofile xgpon profile-id 20 profile-name 4GE_PANEL_ONU
 ont-port eth 4 pots 1
 port vlan eth 1 translation 20 user-vlan 20
 port vlan eth 2 translation 30 user-vlan 30
 port vlan eth 3 translation 50 user-vlan 50
 port vlan eth 4 translation 60 user-vlan 60
 commit
quit
#
# 4. Provision Faculty ONU on XGS-PON Port 0/1/1
interface xgpon 0/1
 ont add 1 1 sn-auth "48575443ABC12345" omci ont-lineprofile-id 20 ont-srvprofile-id 20 desc "Faculty_Room_302"
#
# Enable downstream AES-128 Encryption for Privacy
 ont-encryption 1 1 aes
quit
#
# 5. Create Service-Port Virtual Circuits
service-port 100 vlan 20 gpon 0/1/1 ont 1 gemport 1 multi-service user-vlan 20 tag-transform translate
service-port 101 vlan 50 gpon 0/1/1 ont 1 gemport 2 multi-service user-vlan 50 tag-transform translate
return`,
    verificationCommands: [
      'display ont info 0 1 1 1',
      'display ont optical-info 0 1 1 1',
      'display ont traffic 0 1 1 1',
      'display service-port all'
    ]
  },

  odf: {
    id: 'odf',
    name: 'Optical Distribution Frame (ODF)',
    category: 'Headend',
    modelExample: '288-Core High-Density Optical Distribution Frame',
    roleSummary: 'Passive patch matrix linking OLT laser transceiver outputs to outdoor feeder trunks with green angled LC/APC adapters.',
    environmentRoles: {
      university: 'Carrier-grade patch matrix mapping OLT line cards to multi-building single-mode trunk cables across campus.',
      industry: 'Protected fiber distribution center routing steel-armored outdoor cables to factory halls.',
      hospital: 'High-density cleanroom patch bay with redundant A/B feeder routing for medical pavilions.',
      office: 'Central riser patch hub feeding vertical building conduits.',
      sme: 'Compact 48-port wall-mounted optical patch box.'
    },
    wiringMap: [
      { sourceInterface: 'Adapter Ports 1-16', cableMedium: 'LC/APC Single-mode Pigtails', targetDevice: 'Optical Line Terminal (OLT)', targetInterface: 'PON Ports 0/1/1-16', signalType: 'Headend SFP+ Feeds' },
      { sourceInterface: 'Backplane Splice Trays', cableMedium: '24-Core ITU-T G.652.D Armored Cable', targetDevice: 'Outdoor Conduit Trunk', targetInterface: 'Campus Feeder Ring', signalType: 'Outside Plant Trunk' }
    ],
    specifications: [
      { label: 'Connector Standard', value: 'LC/APC (Angled Physical Contact, 8° polish)' },
      { label: 'Insertion Loss', value: '< 0.15 dB per mated pair' },
      { label: 'Return Loss (Reflectance)', value: '> 65 dB (prevents laser back-reflection)' },
      { label: 'Capacity', value: '288 Fiber Cores in 4U 19-inch subrack' }
    ],
    deploymentGuide: [
      'Install ODF in central IT room rack adjacent to OLT chassis.',
      'Strip outer jacket of outdoor armored feeder cable and ground steel armor to data center earth bar.',
      'Fusion splice feeder fiber strands to factory-polished green LC/APC pigtails in splice cassettes.',
      'Maintain fiber bend radius >= 30mm inside tray; dress pigtails neatly on cable routing spools.',
      'Clean all ferrule end-faces using One-Click LC/APC cleaning pen before insertion.'
    ],
    cliConfiguration: `# === ODF FIBER LABELING & PASSIVE ASSET DOCUMENTATION ===
# Standard TIA-606-C Labeling Format:
# [Rack]-[Frame]-[Tray]-[Port] -> [Destination Building]-[Riser Box]-[Fiber ID]
ODF-A1-TRAY01-PORT08  ->  ENG-BLDG-ELV03-FIBER01 (Primary Feeder)
ODF-A1-TRAY01-PORT09  ->  ENG-BLDG-ELV03-FIBER02 (Type-B Protection)
ODF-A1-TRAY01-PORT10  ->  ADMIN-BLDG-ELV01-FIBER01
ODF-A1-TRAY01-PORT11  ->  LIBRARY-BLDG-ELV02-FIBER01

# Splicing Target: Loss < 0.08 dB per fusion splice on core-alignment fusion splicer.`,
    verificationCommands: [
      'Visual inspection with 400x digital fiber microscope',
      'Optical Insertion Loss test (Target: < 0.20 dB)',
      'Visual Fault Locator (VFL 650nm Red Laser) continuity test'
    ]
  },

  feeder: {
    id: 'feeder',
    name: 'Feeder Single-Mode Optical Backbone',
    category: 'Passive ODN',
    modelExample: '24/48/96-Core ITU-T G.652.D Loose-Tube Armored Single-Mode Fiber',
    roleSummary: 'Passive glass transmission path connecting Data Center ODF to building riser splitters. 0 active repeaters needed across distances up to 20 km.',
    environmentRoles: {
      university: 'Underground duct backbone connecting 10+ campus academic faculties in a diverse physical ring.',
      industry: 'Heavy steel-tape armored fiber traversing noisy manufacturing plants with 100% electromagnetic immunity.',
      hospital: 'Dielectric outdoor cable routed along underground tunnels connecting surgical and patient pavilions.',
      office: 'Vertical building optical backbone pulled through riser conduits.',
      sme: 'Single armored 12-core drop from street vault.'
    },
    wiringMap: [
      { sourceInterface: 'ODF Patch Matrix', cableMedium: 'Single-mode Core G.652.D (Yellow)', targetDevice: 'Floor Splitter Box (ODB)', targetInterface: 'Splitter Input In-Port', signalType: 'Bi-directional PON Optical Signal' }
    ],
    specifications: [
      { label: 'Attenuation @ 1310 nm', value: '0.35 dB / km' },
      { label: 'Attenuation @ 1550 / 1577 nm', value: '0.20 dB / km' },
      { label: 'Operating Distance', value: 'Up to 20 km standard PON reach' },
      { label: 'Protection Scheme', value: 'Type B Redundant Dual-Feeder Ring' }
    ],
    deploymentGuide: [
      'Pull loose-tube armored cable through underground ducts with dynamometer tension monitoring (<1500 N).',
      'Leave 15-meter expansion slack loops in underground manholes and at building entry points.',
      'Terminate inside building entrance distribution box with strain relief clamps.',
      'Perform bi-directional OTDR test at 1310nm and 1550nm; certify zero macro-bends or localized attenuation spikes.'
    ],
    cliConfiguration: `# === OTDR CERTIFICATION PARAMETERS ===
Wavelengths: 1310 nm, 1550 nm, 1577 nm
Pulse Width: 10 ns (short-range resolution)
Refractive Index (IOR): 1.4677
Splice Loss Threshold: <= 0.08 dB
Connector Loss Threshold: <= 0.20 dB
Total Link Loss Target: < 2.5 dB for 2.0 km campus feeder`,
    verificationCommands: [
      'Execute Bi-Directional OTDR trace',
      'Verify continuity with Visual Fault Locator (VFL)',
      'Record optical attenuation baseline in GIS asset manager'
    ]
  },

  splitter: {
    id: 'splitter',
    name: '1:16 / 1:32 Passive Optical Splitter (PLC)',
    category: 'Passive ODN',
    modelExample: 'Planar Lightwave Circuit (PLC) Splitter inside Optical Distribution Box (ODB)',
    roleSummary: 'Completely unpowered optical beam splitter mounted in vertical floor ELV shafts. Divides 1 incoming feeder fiber into 16 or 32 office drop fibers. Consumes 0 Watts of electricity.',
    environmentRoles: {
      university: 'Mounted in floor ELV riser shaft; each 1:16 splitter feeds 16 faculty offices or classroom wall boxes.',
      industry: 'Protected inside IP66 dust-tight and vibration-proof metal enclosure on factory gantry or utility pillar.',
      hospital: 'Zero-power splitter in floor riser closet; produces zero heat and zero electromagnetic interference near radiology.',
      office: 'Compact DIN-rail or wall-box splitter hidden in electrical riser room.',
      sme: 'Single 1:16 splitter serving the entire branch building.'
    },
    wiringMap: [
      { sourceInterface: 'Splitter In-Port', cableMedium: 'Single-mode Fiber Pigtail', targetDevice: 'Feeder Cable Strand', targetInterface: 'ODF / Data Center Link', signalType: '10G Combined Optical Stream' },
      { sourceInterface: 'Splitter Out-Ports 1-16', cableMedium: 'G.657 Bend-Insensitive Drops', targetDevice: 'Office Panel ONUs', targetInterface: 'ONU Optical SC/APC Port', signalType: 'Point-to-Multipoint Optical Branches' }
    ],
    specifications: [
      { label: 'Split Ratio', value: '1:16 (Standard) or 1:32 (High Density)' },
      { label: 'Insertion Loss (1:16)', value: '13.8 dB to 14.2 dB' },
      { label: 'Insertion Loss (1:32)', value: '17.2 dB to 17.6 dB' },
      { label: 'Wavelength Bandwidth', value: '1260 nm to 1650 nm (Full Optical Spectrum)' },
      { label: 'Power Consumption', value: '0.0 Watts (Completely Passive)' }
    ],
    deploymentGuide: [
      'Mount wall-mounted Optical Distribution Box (ODB) inside vertical ELV riser on each floor.',
      'Snap PLC splitter module into ODB cassette tray.',
      'Fusion splice input pigtail to feeder fiber from data center.',
      'Connect output ports to labeled green SC/APC bulkhead adapters.',
      'Verify optical power on every output port with optical power meter: must read between -12 dBm and -20 dBm.'
    ],
    cliConfiguration: `# === SPLITTER LOSS BUDGET AUDIT FORMULA ===
# Total Loss = Alpha*L + N_conn*Loss_conn + N_splice*Loss_splice + Splitter_Loss + Safety_Margin
# For 1:16 Splitter:
# Splitter Loss: 14.0 dB
# Connectors (3 mated pairs @ 0.25 dB): 0.75 dB
# Splices (4 fusion splices @ 0.08 dB): 0.32 dB
# Fiber (2.0 km @ 0.35 dB/km): 0.70 dB
# Safety Margin: 3.00 dB
# Total Link Loss = 18.77 dB < 29.0 dB (XGS-PON Class N1) -> Headroom = +10.23 dB (PASS)`,
    verificationCommands: [
      'Measure output power with Optical Power Meter (OPM) at 1577nm',
      'Verify optical uniformity across all 16 ports (< 1.2 dB variance)',
      'Record port mapping in floor ELV cabinet schedule'
    ]
  },

  drop: {
    id: 'drop',
    name: 'Horizontal Bend-Insensitive Drop Fiber',
    category: 'Passive ODN',
    modelExample: '1-Core / 2-Core ITU-T G.657.A2 Flexible Indoor Drop Cable',
    roleSummary: 'Ultra-thin, bend-insensitive indoor optical drop running from floor splitter box through ceilings directly into office wall boxes.',
    environmentRoles: {
      university: 'Routed through hallway cable basket to faculty office wall boxes without micro-bending loss around tight conduit corners.',
      industry: 'Protected inside flexible conduit leading to plant-floor industrial control panels.',
      hospital: 'Plenum-rated, Low-Smoke Zero-Halogen (LSZH) cable running above acoustic ceiling tiles.',
      office: 'Concealed horizontal cable routed through modular raised flooring.',
      sme: 'Direct drop from floor utility box to receptionist and conference room.'
    },
    wiringMap: [
      { sourceInterface: 'Floor ODB Splitter Out-Port', cableMedium: '2.0mm LSZH Bend-Insensitive Fiber', targetDevice: 'Office 86-Type Wall Box', targetInterface: 'Panel ONU SC/APC Optical Socket', signalType: 'Single-mode Optical Drop' }
    ],
    specifications: [
      { label: 'Fiber Standard', value: 'ITU-T G.657.A2 (Minimum Bend Radius: 7.5 mm)' },
      { label: 'Jacket Material', value: 'Low-Smoke Zero-Halogen (LSZH), Flame Retardant' },
      { label: 'Bending Loss (1 turn @ 7.5mm)', value: '< 0.50 dB @ 1550nm / 1577nm' },
      { label: 'Tensile Strength', value: '100 N (Short term) / 80 N (Long term)' }
    ],
    deploymentGuide: [
      'Pull drop cable through ceiling trays and down into 86-type wall back-box.',
      'Terminate field-installable SC/APC mechanical connector or fusion splice a pre-polished pigtail.',
      'Leave 0.5m of optical slack coiled neatly inside wall box to prevent strain.',
      'Measure received optical power (Rx): must be between -14 dBm and -22 dBm.'
    ],
    cliConfiguration: `# Field Termination Test Benchmark:
Connector Type: SC/APC (Green)
Fiber Type: Single-Mode G.657.A2
Target Insertion Loss: <= 0.25 dB per mechanical termination
Visual VFL Check: No red laser leakage at bend points`,
    verificationCommands: [
      'Visual Fault Locator (VFL) check for micro-bends',
      'Optical Power Meter (OPM) reading at office faceplate'
    ]
  },

  onu: {
    id: 'onu',
    name: 'Optical Network Unit (86-Box Panel ONU)',
    category: 'Edge Terminal',
    modelExample: 'Huawei OptiXstar P871E / P802E (4xGE + PoE)',
    roleSummary: 'The only powered active device at the room edge. Converts the incoming optical fiber into 4 Gigabit Ethernet copper ports with PoE power delivery.',
    environmentRoles: {
      university: 'Flush-mounted into 86-type wall box of lecturer office; provides 4 GE sockets for PC, Wi-Fi 7 AP, VoIP phone, and printer.',
      industry: 'DIN-Rail mounted rugged industrial ONU with wide operating temperature (-40°C to +70°C) and heavy surge protection.',
      hospital: 'Cleanable antimicrobial faceplate panel ONU mounted in patient ward or nurse station, zero electrical noise.',
      office: 'Under-desk or flush wall panel ONU powering executive workstation and PoE desk phone.',
      sme: 'All-in-one Wi-Fi 6/7 optical gateway ONU with integrated wireless antennas.'
    },
    wiringMap: [
      { sourceInterface: 'SC/APC Optical In-Port', cableMedium: 'Single-mode Drop Fiber', targetDevice: 'Floor Splitter Out-Port', targetInterface: 'Splitter Port 3', signalType: 'Optical XGS-PON / GPON Signal' },
      { sourceInterface: 'GE Port 1', cableMedium: 'Cat6 UTP Copper (Blue)', targetDevice: 'Workstation Desktop PC', targetInterface: 'PC RJ-45 NIC', signalType: '1000BASE-T Ethernet (VLAN 20)' },
      { sourceInterface: 'GE Port 2 (PoE+)', cableMedium: 'Cat6A UTP Copper (Blue + Red)', targetDevice: 'Wi-Fi 7 Access Point', targetInterface: 'AP 2.5GE PoE Port', signalType: 'Data + 802.3bt PoE (35W)' },
      { sourceInterface: 'GE Port 3 (PoE)', cableMedium: 'Cat6 UTP Copper (Blue + Red)', targetDevice: '4K IP CCTV Camera', targetInterface: 'Camera RJ-45 Port', signalType: 'Data + 802.3af PoE (12W)' },
      { sourceInterface: 'GE Port 4', cableMedium: 'Cat6 UTP Copper (Blue)', targetDevice: 'VoIP Desktop Phone', targetInterface: 'IP Phone LAN Port', signalType: 'SIP Voice Data (VLAN 60)' }
    ],
    specifications: [
      { label: 'Uplink Interface', value: '1× XGS-PON / GPON (SC/APC Optical Port)' },
      { label: 'LAN Interfaces', value: '4× 10/100/1000 Mbps RJ-45 Ethernet' },
      { label: 'PoE Delivery', value: 'IEEE 802.3af/at PoE+ (Up to 60W aggregate budget)' },
      { label: 'Mounting Form Factor', value: 'Standard 86-type electrical wall box flush mount' },
      { label: 'Operating Power', value: '12V DC local adapter or centralized remote DC' }
    ],
    deploymentGuide: [
      'Connect incoming SC/APC drop fiber to optical port on back of panel ONU.',
      'Seat the panel ONU into the standard 86-type wall box and secure with two side screws.',
      'Snap on cosmetic outer faceplate flush with wall surface.',
      'Observe front LED indicators: PON light should blink green, then turn solid green within 15 seconds.',
      'Verify Ethernet copper sockets 1 through 4 light up green when endpoints are connected.'
    ],
    cliConfiguration: `# === ONU OMCI REMOTE PROVISIONING (PUSHED AUTOMATICALLY FROM OLT) ===
# Port 1: Untagged VLAN 20 (Faculty PC)
# Port 2: Tagged Trunk VLAN 20, 30, 40 + PoE+ (Wi-Fi 7 AP)
# Port 3: Untagged VLAN 50 + PoE (CCTV Camera)
# Port 4: Untagged VLAN 60 (VoIP Desktop Phone)

# LED Status Diagnostic Guide:
# PON LED Solid Green   -> Authenticated and Registered with OLT (NORMAL)
# PON LED Blinking Green -> Registering / Obtaining OMCI Configuration
# LOS LED Blinking Red   -> Fiber disconnected / Optical signal < -29.0 dBm
# LAN LED Solid Green    -> 1000 Mbps Link Established`,
    verificationCommands: [
      'Check front panel LED states (PON=Solid Green, LOS=Off)',
      'Verify optical Rx power via OLT: display ont optical-info',
      'Test PoE power delivery: display ont port poe-state'
    ]
  },

  pc: {
    id: 'pc',
    name: 'Workstation Desktop PC / Faculty Computer',
    category: 'User Endpoint',
    modelExample: 'Intel Core i7 Workstation / All-in-One PC (Windows 11 / Linux)',
    roleSummary: 'Standard high-speed wired desktop client connected via Cat6 copper patch lead directly to ONU GE Port 1.',
    environmentRoles: {
      university: 'Lecturer workstation or student computer lab terminal with full Gigabit Internet and campus intranet access.',
      industry: 'Human-Machine Interface (HMI) PC or supervisory workstation on factory control floor.',
      hospital: 'Nurse station terminal or electronic medical records (EMR) workstation.',
      office: 'Executive desktop computer or hot-desking dock in corporate headquarters.',
      sme: 'Staff PC or point-of-sale (POS) terminal.'
    },
    wiringMap: [
      { sourceInterface: 'RJ-45 Ethernet NIC', cableMedium: 'Cat6 UTP Patch Lead (Blue, 2m)', targetDevice: 'Panel ONU', targetInterface: 'GE Port 1', signalType: '1000BASE-T Full-Duplex' }
    ],
    specifications: [
      { label: 'Link Speed', value: '1000 Mbps Full-Duplex (1 Gbps)' },
      { label: 'VLAN Assignment', value: 'VLAN 20 (Faculty) / VLAN 30 (Student)' },
      { label: 'IP Addressing', value: 'IPv4 / IPv6 DHCP Auto-Configuration' },
      { label: 'Latency to Gateway', value: '< 1.5 ms' }
    ],
    deploymentGuide: [
      'Plug standard Cat6 patch lead into RJ-45 socket on PC and into Port 1 of panel ONU.',
      'NIC negotiates 1000 Mbps full duplex automatically.',
      'PC sends DHCP Discover; Core Switch relays via Option 82 and assigns 10.10.20.x IP address.',
      'Run ping test to Core Gateway (10.10.20.1) and verify latency < 2.0 ms.'
    ],
    cliConfiguration: `# === CLIENT OS IP VERIFICATION (WINDOWS POWERSHELL / LINUX BASH) ===
# Windows:
ipconfig /all
Test-NetConnection -ComputerName 10.10.20.1 -Port 80

# Linux:
ip addr show eth0
ping -c 4 10.10.20.1`,
    verificationCommands: [
      'ping 10.10.20.1 -t',
      'tracert 10.10.10.1',
      'speedtest-cli --single'
    ]
  },

  wifi: {
    id: 'wifi',
    name: 'Enterprise Wi-Fi 7 Access Point',
    category: 'User Endpoint',
    modelExample: 'Huawei AirEngine 8771-X1T / Cisco Catalyst 9136',
    roleSummary: 'Next-generation wireless access point plugged into ONU 2.5GE/10GE PoE++ port. Broadcasts multi-SSID wireless networks with WPA3.',
    environmentRoles: {
      university: 'High-density lecture hall and laboratory coverage; supports 500+ active mobile devices simultaneously.',
      industry: 'Provides low-latency wireless connectivity for Automated Guided Vehicles (AGVs) and handheld barcode scanners.',
      hospital: 'Provides clean wireless roaming for mobile nurse tablets and infusion pump telemetry.',
      office: 'Seamless corporate wireless with zero-touch 802.1X Single Sign-On and guest portal.',
      sme: 'Single enterprise AP covering the entire office floor.'
    },
    wiringMap: [
      { sourceInterface: '2.5GE/10GE Uplink Port', cableMedium: 'Cat6A Shielded Copper (Blue + Red Dashed)', targetDevice: 'Panel ONU', targetInterface: 'GE Port 2 (PoE++)', signalType: 'Data Trunk + 802.3bt PoE Power' }
    ],
    specifications: [
      { label: 'Wi-Fi Standard', value: 'Wi-Fi 7 (IEEE 802.11be) Tri-Band' },
      { label: 'Peak Data Rate', value: 'Up to 18.67 Gbps aggregate' },
      { label: 'Radio Channels', value: '2.4 GHz, 5 GHz, and 6 GHz (320 MHz width)' },
      { label: 'Power Consumption', value: '35W - 50W (Supplied via 802.3bt PoE++)' }
    ],
    deploymentGuide: [
      'Ceiling mount AP in center of room for unobstructed 360° radio propagation.',
      'Connect Cat6A patch cord from AP uplink port to ONU GE Port 2 (PoE enabled).',
      'AP powers up via PoE; receives management IP on VLAN 99 from DHCP.',
      'AP automatically connects to centralized wireless controller / NMS; downloads configuration.',
      'Verify broadcast of SSIDs: "Campus-Faculty" (VLAN 20), "Campus-Students" (VLAN 30), "Campus-Guest" (VLAN 40).'
    ],
    cliConfiguration: `# === HUAWEI AIRENGINE WI-FI 7 AP PROFILE CONFIGURATION ===
wlan
#
# 1. Define Multi-SSID VAP Profiles
vap-profile name FACULTY_WIFI
 service-vlan vlan-id 20
 ssid-profile FACULTY_SSID
 security-profile WPA3_ENTERPRISE_PROFILE
#
vap-profile name STUDENT_WIFI
 service-vlan vlan-id 30
 ssid-profile STUDENT_SSID
 security-profile WPA3_STUDENT_PROFILE
#
vap-profile name GUEST_WIFI
 service-vlan vlan-id 40
 ssid-profile GUEST_SSID
 security-profile OPEN_PORTAL_PROFILE
#
# 2. Assign Radio Profiles & 320MHz Channels
radio-5g-profile name HIGH_THROUGHPUT_320M
 channel-mode 320mhz
 return`,
    verificationCommands: [
      'display ap all',
      'display station all',
      'display ap radio-state all'
    ]
  },

  cctv: {
    id: 'cctv',
    name: '4K Ultra-HD IP Surveillance Camera',
    category: 'User Endpoint',
    modelExample: 'Hikvision / Dahua / Axis 4K Dome IP Camera',
    roleSummary: 'High-definition physical security camera powered via PoE from ONU Port 3. Kept in isolated VLAN 50 with zero direct Internet access.',
    environmentRoles: {
      university: 'Campus building entrance, hallway, and laboratory perimeter monitoring.',
      industry: 'Plant production line inspection and perimeter security monitoring.',
      hospital: 'Emergency room, pharmacy store, and patient corridor monitoring.',
      office: 'Reception, elevator lobby, and server room access monitoring.',
      sme: 'Front gate and office inventory protection.'
    },
    wiringMap: [
      { sourceInterface: 'RJ-45 100M/1G Network Port', cableMedium: 'Cat6 UTP Copper (Blue + Red Dashed)', targetDevice: 'Panel ONU', targetInterface: 'GE Port 3 (PoE)', signalType: 'RTSP Video Stream + 802.3af PoE Power' }
    ],
    specifications: [
      { label: 'Video Resolution', value: '4K Ultra-HD (3840 × 2160 @ 30 fps)' },
      { label: 'Compression Codec', value: 'H.265+ Smart Codec' },
      { label: 'Power Draw', value: '12 Watts (Supplied by ONU PoE 802.3af)' },
      { label: 'Streaming Protocol', value: 'RTSP / ONVIF Profile S/T' }
    ],
    deploymentGuide: [
      'Mount camera to ceiling or corridor corner with tamper-proof bracket.',
      'Connect Cat6 cable to ONU Port 3; verify camera IR LEDs power up.',
      'Assign static IP in 10.10.50.0/24 subnet (isolated CCTV VLAN 50).',
      'Register camera RTSP stream into Central Network Video Recorder (NVR).',
      'Verify Firewall policy blocks this IP from all external Internet outbound connections.'
    ],
    cliConfiguration: `# === CCTV CAMERA NETWORK & NVR STREAMING SETUP ===
Camera Static IP: 10.10.50.45
Subnet Mask: 255.255.255.0
Default Gateway: 10.10.50.1 (Campus Core Switch)
VLAN Tag: 50 (Surveillance VLAN)
Primary NVR Server IP: 10.10.50.10
RTSP Stream URI: rtsp://admin:SecurityPass2026@10.10.50.45:554/Streaming/Channels/101
Bitrate: 4096 Kbps Constant Bitrate (CBR)
QoS Tag: DSCP AF41 (CoS 4)`,
    verificationCommands: [
      'ping 10.10.50.45 from Core Switch',
      'Verify live RTSP feed playback on central monitoring video wall',
      'Check PoE power allocation on ONU: display ont port poe-state'
    ]
  },

  phone: {
    id: 'phone',
    name: 'Enterprise VoIP Desktop Phone',
    category: 'User Endpoint',
    modelExample: 'Grandstream GRP2614 / Cisco IP Phone 8845 / Poly Edge E350',
    roleSummary: 'SIP telephony terminal plugged into ONU Port 4 with Voice VLAN 60 and DSCP EF priority for crystal-clear audio.',
    environmentRoles: {
      university: 'Faculty office desk phone with campus 4-digit extension dialing.',
      industry: 'Plant-floor ruggedized intercom and emergency dispatch telephone.',
      hospital: 'Nurse station triage phone with emergency code call priority.',
      office: 'Executive desk phone with HD conferencing and directory integration.',
      sme: 'Front desk reception telephone.'
    },
    wiringMap: [
      { sourceInterface: 'RJ-45 LAN Port', cableMedium: 'Cat6 UTP Copper (Blue)', targetDevice: 'Panel ONU', targetInterface: 'GE Port 4', signalType: 'SIP Protocol + G.711/G.729 Audio' }
    ],
    specifications: [
      { label: 'VoIP Protocol', value: 'SIP RFC 3261' },
      { label: 'Audio Codecs', value: 'Opus, G.722 (Wideband HD Audio), G.711u/a' },
      { label: 'QoS Priority', value: 'DSCP EF (46) / 802.1p CoS 5' },
      { label: 'Power Method', value: 'PoE 802.3af (5W) or local 5V DC' }
    ],
    deploymentGuide: [
      'Connect Cat6 cable from phone LAN port to Port 4 of panel ONU.',
      'Phone receives IP on Voice VLAN 60 via LLDP-MED auto-discovery.',
      'Phone registers with campus PBX / Asterisk / Cisco Unified Communications Manager.',
      'Verify extension dial tone and place test internal call.'
    ],
    cliConfiguration: `# === SIP TELEPHONY PROVISIONING ===
Extension: 2045
Display Name: "Dr. Faculty Office 302"
SIP Server / IP PBX: 10.10.60.10
Voice VLAN: 60 (LLDP-MED Auto)
QoS Audio Tag: DSCP EF (Expedited Forwarding - Priority 5)
Jitter Buffer: Adaptive (10-50 ms)`,
    verificationCommands: [
      'Check SIP Registration Status: REGISTERED (200 OK)',
      'Place test call to 4-digit internal extension',
      'Verify voice packet jitter < 15ms'
    ]
  }
};

const ZTE_OLT_CLI = `! === ZTE TITAN C600 OLT PRODUCTION CONFIGURATION ===
! 1. Configure Dynamic Bandwidth Profiles (T-CONTs)
conf t
gpon
  profile tcont T3_FACULTY type 3 fb 51200 mb 1024000
  profile tcont T1_VOICE type 1 fb 20480
  profile traffic TR_FACULTY sir 51200 pir 1024000
  profile traffic TR_VOICE sir 20480 pir 20480
!
! 2. ONU Traffic & Service Profiles
  profile onu-traffic ONUTRAF_FACULTY
    gemport 1 tcont 1 traffic TR_FACULTY
    gemport 2 tcont 2 traffic TR_VOICE
  profile vlan-service VSERV_FACULTY
    gemport 1 user-vlan 20 vlan 20
    gemport 2 user-vlan 60 vlan 60
!
! 3. Register ONT on XGS-PON Port 1/1/1
interface xg-pon_1/1/1
  onu 1 type ZTE-P871E sn ZTEG4857ABC1 desc "Faculty_Room_302"
!
! 4. Bind Virtual Port & VLAN Translation
interface xg-pon_1/1/1:1
  tcont 1 name T1 profile T3_FACULTY
  tcont 2 name T2 profile T1_VOICE
  gemport 1 tcont 1
  gemport 2 tcont 2
  switchport mode hybrid vport 1
  switchport vlan 20 tag vport 1
  switchport vlan 60 tag vport 2
!
! 5. Verification Commands:
! show gpon onu state xg-pon_1/1/1
! show pon power onu-rx xg-pon_1/1/1:1`;

const NOKIA_OLT_CLI = `# === NOKIA 7360 ISAM FX OLT PRODUCTION CONFIGURATION ===
# 1. Bandwidth Profiles (QoS)
configure qos interface xgpon-1/1/1:1 bandwidth-profile "FACULTY_BW" guaranteed-rate 51200 maximum-rate 1024000
configure qos interface xgpon-1/1/1:1 bandwidth-profile "VOICE_BW" guaranteed-rate 20480 maximum-rate 20480

# 2. Configure VLANs
configure vlan 20 name "FACULTY_DATA" mode residential-bridge
configure vlan 60 name "CAMPUS_VOICE" mode residential-bridge

# 3. Provision ONT Hardware & Serial Number
configure equipment ont interface xgpon-1/1/1:1
  serno ALCL12345678
  sw-ver-check disabled
  desc1 "Faculty_Room_302"
  optics-type auto-detect

# 4. Configure Virtual Bridge Ports
configure bridge port 1/1/1:1/1
  vlan-id 20
  tag single-tagged
configure bridge port 1/1/1:1/2
  vlan-id 60
  tag single-tagged

# 5. Verification Commands:
# show equipment ont status 1/1/1:1
# show equipment ont optics 1/1/1:1`;

export const FttoPolStudio: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'graphic' | 'concept' | 'roadmap' | 'builder'>('graphic');
  const [activeEnvironment, setActiveEnvironment] = useState<EnvironmentType>('university');
  const [selectedVendor, setSelectedVendor] = useState<'huawei' | 'zte' | 'nokia'>('huawei');
  const [isLightFlowing, setIsLightFlowing] = useState<boolean>(true);
  const [selectedElement, setSelectedElement] = useState<string>('olt');
  const [tracedEndpoint, setTracedEndpoint] = useState<string>('none');
  const [configSubTab, setConfigSubTab] = useState<'cli' | 'ports' | 'deployment' | 'specs' | 'diagnostics'>('cli');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Interactive Builder State
  const [zones, setZones] = useState<ZoneConfig[]>([
    { id: 'z1', name: 'Zone 1: Academic Faculty Block', splitRatio: '1:16', pcs: 12, wifiAps: 4, cctvCameras: 3, ipPhones: 6 },
    { id: 'z2', name: 'Zone 2: Administration & Finance', splitRatio: '1:16', pcs: 14, wifiAps: 3, cctvCameras: 4, ipPhones: 8 },
    { id: 'z3', name: 'Zone 3: Central Library & Labs', splitRatio: '1:16', pcs: 16, wifiAps: 6, cctvCameras: 4, ipPhones: 4 }
  ]);

  const addZone = () => {
    const newId = `z${zones.length + 1}`;
    setZones([
      ...zones,
      {
        id: newId,
        name: `Zone ${zones.length + 1}: Student Center / Facility`,
        splitRatio: '1:16',
        pcs: 10,
        wifiAps: 3,
        cctvCameras: 2,
        ipPhones: 2
      }
    ]);
  };

  const removeZone = (id: string) => {
    if (zones.length <= 1) return;
    setZones(zones.filter(z => z.id !== id));
  };

  const updateZone = (id: string, field: keyof ZoneConfig, val: any) => {
    setZones(zones.map(z => z.id === id ? { ...z, [field]: val } : z));
  };

  // Calculations for Builder
  const totalEndpoints = zones.reduce((acc, z) => acc + z.pcs + z.wifiAps + z.cctvCameras + z.ipPhones, 0);
  const totalPoeWatts = zones.reduce((acc, z) => acc + (z.wifiAps * 35) + (z.cctvCameras * 20) + (z.ipPhones * 10), 0);
  const totalZonesCount = zones.length;

  const currentDevice = DEVICE_BLUEPRINTS[selectedElement] || DEVICE_BLUEPRINTS['olt'];

  const getActiveCliCode = () => {
    if (selectedElement === 'olt') {
      if (selectedVendor === 'zte') return ZTE_OLT_CLI;
      if (selectedVendor === 'nokia') return NOKIA_OLT_CLI;
      return currentDevice.cliConfiguration;
    }
    return currentDevice.cliConfiguration;
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(getActiveCliCode()).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    });
  };

  // Check if an element is part of the traced pathway
  const isElementTraced = (elemId: string) => {
    if (tracedEndpoint === 'none') return false;
    const corePath = ['firewall', 'core', 'olt', 'odf', 'feeder', 'splitter', 'drop', 'onu'];
    if (corePath.includes(elemId)) return true;
    return elemId === tracedEndpoint;
  };

  return (
    <div className="space-y-8">
      {/* Title & Navigation */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Architectural Pillar (Section 04 & Figure 5 Interactive)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>The Modern Concept: FTTO & POL Interactive Development Studio</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl">
            "Move intelligence to the center, extend fiber toward the user, and keep the path in between passive." Click on <strong>any device in the graphic</strong> to inspect its real-world development configuration, physical port mapping, and production CLI code.
          </p>
        </div>

        {/* Studio Sub-Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start lg:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveSubTab('graphic')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'graphic'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Figure 5 Interactive Canvas
          </button>
          <button
            onClick={() => setActiveSubTab('concept')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'concept'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            FTTO vs POL Concepts
          </button>
          <button
            onClick={() => setActiveSubTab('roadmap')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'roadmap'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Zero-to-End Roadmap
          </button>
          <button
            onClick={() => setActiveSubTab('builder')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'builder'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Design Studio
          </button>
        </div>
      </div>

      {/* VIEW 1: FIGURE 5 AUTHENTIC GRAPHIC SCHEMATIC + LIVE CONFIGURATOR */}
      {activeSubTab === 'graphic' && (
        <div className="space-y-6">
          {/* Controls Bar: Environment Profiles & Pathway Tracer */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
              {/* Environment Profiles Selector */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Deployment Environment:</span>
                </span>
                {[
                  { id: 'university', label: '🎓 University Campus' },
                  { id: 'industry', label: '🏭 Smart Factory / Plant' },
                  { id: 'hospital', label: '🏥 Hospital / Healthcare' },
                  { id: 'office', label: '🏢 Corporate Enterprise HQ' },
                  { id: 'sme', label: '🏬 Small Campus / Branch' }
                ].map((env) => (
                  <button
                    key={env.id}
                    onClick={() => setActiveEnvironment(env.id as EnvironmentType)}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-xs font-medium ${
                      activeEnvironment === env.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {env.label}
                  </button>
                ))}
              </div>

              {/* Laser Simulation Toggle */}
              <button
                onClick={() => setIsLightFlowing(!isLightFlowing)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors shrink-0 ${
                  isLightFlowing
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isLightFlowing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isLightFlowing ? 'Pause Laser Pulses' : 'Simulate Laser Flow'}</span>
              </button>
            </div>

            {/* End-to-End Pathway Tracer Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold">Trace Optical Signal Pathway to Endpoint:</span>
                <select
                  value={tracedEndpoint}
                  onChange={(e) => setTracedEndpoint(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="none">-- Select Endpoint to Trace --</option>
                  <option value="pc">Workstation Desktop PC (Cat6 Copper)</option>
                  <option value="wifi">Wi-Fi 7 Access Point (PoE++ 802.3bt)</option>
                  <option value="cctv">4K IP CCTV Camera (PoE 802.3af)</option>
                  <option value="phone">VoIP Desktop Phone (SIP Voice VLAN)</option>
                </select>
              </div>

              <div className="text-[11px] text-cyan-300 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Selected Device: <strong>{currentDevice.name}</strong> (Click any element below to inspect)</span>
              </div>
            </div>
          </div>

          {/* Interactive Figure 5 Graphic Canvas */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
            {/* 1. CENTRAL IT ROOM / DATA CENTER (Top Container) */}
            <div className={`p-5 sm:p-6 rounded-2xl bg-slate-950/90 border-2 transition-all relative ${
              ['firewall', 'core', 'nms', 'olt', 'odf'].includes(selectedElement)
                ? 'border-cyan-500/60 shadow-lg shadow-cyan-950/30'
                : 'border-slate-700/80'
            }`}>
              {/* Red active label strip */}
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Central IT Room / Data Center (Active Powered Equipment)
                </span>
                <span className="text-[10px] text-slate-400 ml-auto font-mono">
                  {activeEnvironment === 'industry' ? 'Central Server Vault' : activeEnvironment === 'hospital' ? 'Core Medical Datacenter' : 'Carrier-Grade Facilities'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* NMS Screen */}
                <div className="md:col-span-3">
                  <div
                    onClick={() => setSelectedElement('nms')}
                    className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all ${
                      selectedElement === 'nms'
                        ? 'bg-cyan-500/20 border-cyan-400 shadow-lg scale-102'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-1.5">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-white">Network Management</div>
                    <div className="text-[10px] text-cyan-300">System (NMS / iMaster)</div>
                    <div className="text-[9px] text-slate-500 mt-1 font-mono">Click for OMCI Script</div>
                  </div>
                </div>

                {/* Firewall & Core Switch & OLT Stack */}
                <div className="md:col-span-6 space-y-3">
                  {/* Firewall */}
                  <div
                    onClick={() => setSelectedElement('firewall')}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedElement === 'firewall'
                        ? 'bg-rose-500/20 border-rose-400 shadow-lg scale-101'
                        : isElementTraced('firewall')
                        ? 'bg-rose-950/30 border-rose-500/50'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-rose-500/20 text-rose-400 flex items-center justify-center">
                        <Shield className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-white">Enterprise Firewall / Gateway</span>
                    </div>
                    <span className="text-[10px] text-rose-400 font-mono">NAT / ACL / IPS</span>
                  </div>

                  {/* Core Switch */}
                  <div
                    onClick={() => setSelectedElement('core')}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedElement === 'core'
                        ? 'bg-cyan-500/20 border-cyan-400 shadow-lg scale-101'
                        : isElementTraced('core')
                        ? 'bg-cyan-950/30 border-cyan-500/50'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                        <Server className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Campus Core Switch</div>
                        <div className="text-[10px] text-slate-400">100GE L3 Routing Fabric</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-cyan-300 font-mono">100GE LACP Trunks</span>
                  </div>

                  {/* Optical Line Terminal (OLT) */}
                  <div
                    onClick={() => setSelectedElement('olt')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedElement === 'olt'
                        ? 'bg-amber-500/20 border-amber-400 shadow-lg scale-101'
                        : isElementTraced('olt')
                        ? 'bg-amber-950/30 border-amber-500/60'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Optical Line Terminal (OLT)</div>
                        <div className="text-[10px] text-amber-300">All optical ports centralized</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                      XGS-PON 10G
                    </span>
                  </div>
                </div>

                {/* ODF (Optical Distribution Frame) */}
                <div className="md:col-span-3">
                  <div
                    onClick={() => setSelectedElement('odf')}
                    className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all ${
                      selectedElement === 'odf'
                        ? 'bg-amber-500/20 border-amber-400 shadow-lg scale-102'
                        : isElementTraced('odf')
                        ? 'bg-amber-950/30 border-amber-500/50'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="grid grid-cols-4 gap-1 w-16 mx-auto mb-2">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <span key={i} className={`w-2 h-2 rounded-full ${isLightFlowing ? 'bg-amber-400 animate-pulse' : 'bg-amber-600'}`} />
                      ))}
                    </div>
                    <div className="text-xs font-bold text-white">Central ODF</div>
                    <div className="text-[10px] text-slate-400">Optical Distribution Frame</div>
                    <div className="text-[9px] text-emerald-400 font-mono mt-0.5">LC/APC Patch Matrix</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connecting Optical Trunk (Orange Line) */}
            <div
              onClick={() => setSelectedElement('feeder')}
              className="flex justify-center my-3 cursor-pointer group"
              title="Click to inspect Feeder Optical Backbone"
            >
              <div className="flex flex-col items-center">
                <div className={`h-8 w-1.5 transition-all ${
                  selectedElement === 'feeder' || isElementTraced('feeder')
                    ? 'bg-amber-300 shadow-lg shadow-amber-400/80 w-2'
                    : isLightFlowing
                    ? 'bg-amber-400 animate-pulse shadow-md shadow-amber-400/50'
                    : 'bg-amber-500'
                }`} />
                <span className={`px-3 py-1 rounded-full text-[10px] font-mono border transition-all ${
                  selectedElement === 'feeder' || isElementTraced('feeder')
                    ? 'bg-amber-950/80 border-amber-400 text-amber-200 shadow-lg'
                    : 'bg-slate-950 border-amber-500/40 text-amber-300 group-hover:border-amber-400'
                }`}>
                  Single-Mode Feeder Fiber Trunk (G.652.D Armored)
                </span>
                <div className={`h-8 w-1.5 transition-all ${
                  selectedElement === 'feeder' || isElementTraced('feeder')
                    ? 'bg-amber-300 shadow-lg shadow-amber-400/80 w-2'
                    : isLightFlowing
                    ? 'bg-amber-400 animate-pulse shadow-md shadow-amber-400/50'
                    : 'bg-amber-500'
                }`} />
              </div>
            </div>

            {/* 2. PASSIVE OPTICAL DISTRIBUTION NETWORK — NO POWERED EQUIPMENT (Middle Container) */}
            <div className={`p-5 sm:p-6 rounded-2xl bg-slate-950/60 border-2 border-dashed transition-all relative ${
              selectedElement === 'splitter' || isElementTraced('splitter')
                ? 'border-emerald-500/60 shadow-lg shadow-emerald-950/30'
                : 'border-slate-700'
            }`}>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-500" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Passive Optical Distribution Network (ODN) — No Powered Equipment
                </span>
                <span className="text-[10px] text-emerald-400 ml-auto font-mono">0 Watts · Zero Heat</span>
              </div>

              {/* 3 Zone Splitters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Zone 1 (Building A)', 'Zone 2 (Building B)', 'Zone 3 (Building C)'].map((zoneLabel, zIdx) => (
                  <div
                    key={zIdx}
                    onClick={() => setSelectedElement('splitter')}
                    className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
                      selectedElement === 'splitter'
                        ? 'bg-emerald-500/20 border-emerald-400 shadow-lg scale-102'
                        : isElementTraced('splitter')
                        ? 'bg-emerald-950/30 border-emerald-500/50'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-amber-400 rounded-sm" />
                      <div className="h-0.5 w-6 bg-amber-400" />
                      <div className="flex flex-col gap-0.5">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      </div>
                    </div>
                    <div className="text-xs font-bold text-white">1:16 PLC Splitter</div>
                    <div className="text-[11px] text-emerald-400 font-medium">{zoneLabel}</div>
                    <div className="text-[10px] text-slate-400 mt-1">Mounted in Floor Riser ODB (0 Watts)</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connecting Distribution Drops (Orange Lines) */}
            <div
              onClick={() => setSelectedElement('drop')}
              className="grid grid-cols-3 gap-6 my-3 cursor-pointer group"
              title="Click to inspect Bend-Insensitive Office Drop Fibers"
            >
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`h-8 w-1 transition-all ${
                    selectedElement === 'drop' || isElementTraced('drop')
                      ? 'bg-amber-300 w-1.5 shadow-md shadow-amber-400/80'
                      : isLightFlowing
                      ? 'bg-amber-400 animate-pulse'
                      : 'bg-amber-500'
                  }`} />
                  <span className="text-[9px] text-slate-500 font-mono group-hover:text-amber-300">
                    G.657 Bend-Insensitive Drop
                  </span>
                </div>
              ))}
            </div>

            {/* 3. OPTICAL NETWORK UNITS (ONUs) & ENDPOINT DEVICES */}
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Edge Terminals & End Devices (Powered by Local PoE / 802.3bt)</span>
                <span className="text-[10px] text-slate-400 font-mono">Only Powered Devices Outside Data Center</span>
              </div>

              {/* 3 Clusters for Zone 1, 2, 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((zoneNum) => (
                  <div key={zoneNum} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                    {/* ONU Header */}
                    <div
                      onClick={() => setSelectedElement('onu')}
                      className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                        selectedElement === 'onu'
                          ? 'bg-cyan-500/20 border-cyan-400 shadow-lg scale-102'
                          : isElementTraced('onu')
                          ? 'bg-cyan-950/30 border-cyan-500/60'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold text-white">Panel ONU (86-Box)</span>
                      </div>
                      <span className="text-[10px] text-cyan-300 font-mono">4×GE + PoE+ (60W)</span>
                    </div>

                    {/* End Devices for this Zone */}
                    <div className="space-y-2 pt-1">
                      {/* PC */}
                      <div
                        onClick={() => setSelectedElement('pc')}
                        className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                          selectedElement === 'pc'
                            ? 'bg-blue-500/20 border-blue-400 shadow-md scale-102'
                            : isElementTraced('pc')
                            ? 'bg-blue-950/40 border-blue-500/80 shadow-md'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Monitor className="w-3.5 h-3.5 text-blue-400" />
                          <span className="text-[11px] text-slate-200">Workstation PC</span>
                        </div>
                        <span className="text-[10px] text-blue-400 font-mono">Cat6 Copper (Blue)</span>
                      </div>

                      {/* Wi-Fi AP */}
                      <div
                        onClick={() => setSelectedElement('wifi')}
                        className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                          selectedElement === 'wifi'
                            ? 'bg-purple-500/20 border-purple-400 shadow-md scale-102'
                            : isElementTraced('wifi')
                            ? 'bg-purple-950/40 border-purple-500/80 shadow-md'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Wifi className="w-3.5 h-3.5 text-purple-400" />
                          <span className="text-[11px] text-slate-200">Wi-Fi 7 Access Point</span>
                        </div>
                        <span className="text-[10px] text-rose-400 font-mono">PoE++ Powered (Red)</span>
                      </div>

                      {/* CCTV Camera */}
                      <div
                        onClick={() => setSelectedElement('cctv')}
                        className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                          selectedElement === 'cctv'
                            ? 'bg-teal-500/20 border-teal-400 shadow-md scale-102'
                            : isElementTraced('cctv')
                            ? 'bg-teal-950/40 border-teal-500/80 shadow-md'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Video className="w-3.5 h-3.5 text-teal-400" />
                          <span className="text-[11px] text-slate-200">4K IP CCTV Camera</span>
                        </div>
                        <span className="text-[10px] text-rose-400 font-mono">PoE Powered (Red)</span>
                      </div>

                      {/* VoIP Phone */}
                      <div
                        onClick={() => setSelectedElement('phone')}
                        className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                          selectedElement === 'phone'
                            ? 'bg-amber-500/20 border-amber-400 shadow-md scale-102'
                            : isElementTraced('phone')
                            ? 'bg-amber-950/40 border-amber-500/80 shadow-md'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-amber-400" />
                          <span className="text-[11px] text-slate-200">VoIP Desktop Phone</span>
                        </div>
                        <span className="text-[10px] text-amber-400 font-mono">Voice VLAN 60</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Legend at Bottom */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-slate-800 border-t-2 border-rose-500 rounded-sm" />
                <span className="text-slate-300">Active equipment (powered)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 border border-dashed border-slate-400 rounded-sm" />
                <span className="text-slate-300">Passive component (unpowered)</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-slate-300">End device</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-amber-400 rounded-full" />
                <span className="text-slate-300">Optical fiber (Single-mode)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-blue-500 rounded-full" />
                <span className="text-slate-300">Ethernet copper</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 border-t border-dashed border-rose-500" />
                <span className="text-slate-300">Power / PoE (802.3af/at/bt)</span>
              </div>
            </div>
          </div>

          {/* DEVICE DEEP-DIVE DEVELOPMENT & CONFIGURATION INSPECTOR */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border-2 border-cyan-500/40 shadow-2xl space-y-6">
            {/* Device Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 uppercase">
                    {currentDevice.category}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-300 font-mono text-[11px]">{currentDevice.modelExample}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                  <span>{currentDevice.name}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {currentDevice.roleSummary}
                </p>
              </div>

              {/* Environment-Specific Operational Role */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs self-start sm:self-auto max-w-md space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Role in {activeEnvironment.toUpperCase()} Environment:
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {currentDevice.environmentRoles[activeEnvironment]}
                </p>
              </div>
            </div>

            {/* Inspector Navigation Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto text-xs">
              <button
                onClick={() => setConfigSubTab('cli')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  configSubTab === 'cli'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Production CLI Configuration</span>
              </button>

              <button
                onClick={() => setConfigSubTab('ports')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  configSubTab === 'ports'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Physical Port & Wiring Map</span>
              </button>

              <button
                onClick={() => setConfigSubTab('deployment')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  configSubTab === 'deployment'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Step-by-Step Deployment Guide</span>
              </button>

              <button
                onClick={() => setConfigSubTab('diagnostics')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  configSubTab === 'diagnostics'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CLI Diagnostics & Test</span>
              </button>

              <button
                onClick={() => setConfigSubTab('specs')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  configSubTab === 'specs'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Optical & Electrical Specs</span>
              </button>
            </div>

            {/* TAB 1: PRODUCTION CLI CONFIGURATION */}
            {configSubTab === 'cli' && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-slate-400">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-cyan-300 font-semibold">{currentDevice.name} CLI:</span>
                    {selectedElement === 'olt' && (
                      <div className="flex items-center gap-1 p-0.5 bg-slate-950 border border-slate-800 rounded-lg">
                        <button
                          onClick={() => setSelectedVendor('huawei')}
                          className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                            selectedVendor === 'huawei'
                              ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Huawei VRP
                        </button>
                        <button
                          onClick={() => setSelectedVendor('zte')}
                          className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                            selectedVendor === 'zte'
                              ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          ZTE ZXROS
                        </button>
                        <button
                          onClick={() => setSelectedVendor('nokia')}
                          className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                            selectedVendor === 'nokia'
                              ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Nokia ISAM
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleCopyCli}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold cursor-pointer transition-colors self-start sm:self-auto"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Configuration'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-[380px] shadow-inner select-all">
                  <pre>{getActiveCliCode()}</pre>
                </div>
              </div>
            )}

            {/* TAB 2: PHYSICAL PORT & WIRING INTERCONNECTION MAP */}
            {configSubTab === 'ports' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Device Interconnection & Port Mapping Matrix
                </span>

                <div className="overflow-x-auto border border-slate-800 rounded-xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3">Source Interface</th>
                        <th className="py-2.5 px-3">Cable Medium</th>
                        <th className="py-2.5 px-3">Target Device</th>
                        <th className="py-2.5 px-3">Target Interface</th>
                        <th className="py-2.5 px-3">Protocol / Signal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {currentDevice.wiringMap.map((wire, wIdx) => (
                        <tr key={wIdx} className="hover:bg-slate-800/30">
                          <td className="py-2 px-3 text-cyan-300 font-semibold">{wire.sourceInterface}</td>
                          <td className="py-2 px-3 text-slate-300 font-sans text-[11px]">{wire.cableMedium}</td>
                          <td className="py-2 px-3 text-white font-sans font-medium">{wire.targetDevice}</td>
                          <td className="py-2 px-3 text-teal-300">{wire.targetInterface}</td>
                          <td className="py-2 px-3 text-amber-300 font-sans text-[11px]">{wire.signalType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: STEP-BY-STEP REAL-WORLD DEPLOYMENT GUIDE */}
            {configSubTab === 'deployment' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Turn-Up Procedure & Deployment Protocol
                </span>

                <div className="space-y-2.5">
                  {currentDevice.deploymentGuide.map((step, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <p className="text-slate-300 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: CLI DIAGNOSTICS & VERIFICATION */}
            {configSubTab === 'diagnostics' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  CLI Operational Health & Verification Commands
                </span>

                <div className="space-y-2">
                  {currentDevice.verificationCommands.map((cmd, cIdx) => (
                    <div key={cIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                      <span className="text-cyan-300">{cmd}</span>
                      <span className="text-[10px] text-slate-500 font-sans">Run on CLI</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: OPTICAL & ELECTRICAL SPECS */}
            {configSubTab === 'specs' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Hardware Engineering Ratings & Specifications
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {currentDevice.specifications.map((spec, spIdx) => (
                    <div key={spIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">{spec.label}</span>
                      <span className="text-sm font-bold text-white font-mono block">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: FTTO VS POL COMPREHENSIVE CONCEPTUAL DEEP-DIVE */}
      {activeSubTab === 'concept' && (
        <div className="space-y-6">
          {/* Governing Key Point Banner */}
          <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 text-xs sm:text-sm text-cyan-200 space-y-2">
            <div className="font-bold text-white text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              <span>Core Architectural Principle: FTTO vs POL Distinction</span>
            </div>
            <p className="leading-relaxed text-slate-300">
              <strong>FTTO and POL are related but not identical.</strong> FTTO describes <em>where the fiber goes</em> (to the office desk or wall box). POL describes <em>how it is built</em> (passive point-to-multipoint shared optical tree). Most modern FTTO deployments use POL, but an FTTO network could also use point-to-point active Ethernet fiber, and a POL network could terminate at a floor zone box rather than individual offices.
            </p>
          </div>

          {/* 3-Tier Explanations Grid: FTTO & POL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FTTO Container */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Fiber-to-the-Office (FTTO)</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono uppercase">
                  Physical Reach
                </span>
              </div>

              {/* Simple Explanation */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Simple Explanation
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  FTTO means the fiber cable comes all the way to the office — or very close to it — instead of stopping at a switch room on each floor.
                </p>
              </div>

              {/* Technical Explanation */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  Technical Explanation
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  FTTO is an architectural description: optical fiber is the horizontal medium, and a small active terminal near the user converts the optical signal to Ethernet and Wi-Fi. It can be built with PON technology or with point-to-point fiber and compact switches.
                </p>
              </div>

              {/* Real-World Example */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Real-World Example
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A small optical terminal mounted in the wall box of a lecturer's office provides four Ethernet sockets; no floor switch room is needed.
                </p>
              </div>
            </div>

            {/* POL Container */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Passive Optical LAN (POL)</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono uppercase">
                  Network Architecture
                </span>
              </div>

              {/* Simple Explanation */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Simple Explanation
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  POL is a way of building a Local Area Network (LAN) where one fiber from the IT room is shared by many offices using unpowered splitters.
                </p>
              </div>

              {/* Technical Explanation */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  Technical Explanation
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  POL applies Passive Optical Network (PON) technology — originally developed by telecom operators for fiber-to-the-home — to enterprise LANs. An OLT serves many ONUs over a point-to-multipoint optical tree built from passive splitters.
                </p>
              </div>

              {/* Real-World Example */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Real-World Example
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  One fiber leaves the data center, is split 1:32 in a floor shaft, and serves 32 offices, each with its own ONU.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: ZERO-TO-END CAMPUS DEVELOPMENT ROADMAP */}
      {activeSubTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <strong>Zero-to-End Implementation Blueprint:</strong> How an engineering team transitions from zero infrastructure to a fully operating all-optical campus network without disrupting existing university operations.
          </div>

          <div className="space-y-4">
            {[
              {
                step: 'Phase 0',
                title: 'Site Pathway & ELV Riser Audit',
                duration: 'Weeks 1–3',
                tasks: [
                  'Audit vertical riser conduits, fire-stop penetrations, and cable tray fill factors (<40%).',
                  'Identify locations for unpowered Optical Distribution Boxes (ODBs) on each floor.',
                  'Catalogue existing endpoint counts: wired PCs, Wi-Fi AP positions, CCTV cameras, and IP phones.'
                ],
                deliverable: 'Comprehensive Pathway & Endpoint GIS Survey'
              },
              {
                step: 'Phase 1',
                title: 'Central IT Room / Data Center Optical Headend',
                duration: 'Weeks 4–6',
                tasks: [
                  'Install redundant Optical Line Terminal (OLT-A & OLT-B) chassis in data center racks.',
                  'Mount 288-core Optical Distribution Frame (ODF) with green angled LC/APC adapters.',
                  'Establish dual 100GE LACP uplinks from OLTs to redundant campus core switches.',
                  'Deploy and initialize Central Network Management System (NMS / iMaster NCE).'
                ],
                deliverable: 'Commissioned Carrier-Grade Optical Headend'
              },
              {
                step: 'Phase 2',
                title: 'Outdoor Backbone Feeder Glass Deployment',
                duration: 'Weeks 7–10',
                tasks: [
                  'Pull 48-core / 96-core ITU-T G.652.D armored outdoor single-mode fiber cables through campus conduits.',
                  'Maintain diverse physical ring routing to prevent single-point fiber cut vulnerability.',
                  'Terminate feeder cables onto data center ODF and building entrance splice trays.'
                ],
                deliverable: 'Certified Backbone Feeder Links with Bi-Directional OTDR Traces'
              },
              {
                step: 'Phase 3',
                title: 'Floor Splitter Box Fusion Splicing & Loss Budget Test',
                duration: 'Weeks 11–14',
                tasks: [
                  'Mount wall-mounted Optical Distribution Boxes (ODBs) in vertical ELV riser shafts on every floor.',
                  'Install 1:16 or 1:32 Planar Lightwave Circuit (PLC) passive splitters inside ODB trays.',
                  'Perform precision fusion splicing (loss < 0.08 dB per splice).',
                  'Verify optical insertion loss across all splitter ports using calibrated optical power meter.'
                ],
                deliverable: 'Passive Optical Distribution Network (ODN) Signed-Off'
              },
              {
                step: 'Phase 4',
                title: 'Office Horizontal Drop Fiber & Panel ONU Mount',
                duration: 'Weeks 15–18',
                tasks: [
                  'Pull 1-core or 2-core bend-insensitive G.657 fiber drops from floor ODB to office wall boxes.',
                  'Terminate drop fibers with field-installable LC/APC mechanical or fusion splice connectors.',
                  'Install 86-type panel ONUs flush with wall boxes in faculty offices, laboratories, and classrooms.',
                  'Verify optical receiver power (Rx dBm between -12 dBm and -24 dBm).'
                ],
                deliverable: 'Activated Edge Optical Terminals'
              },
              {
                step: 'Phase 5',
                title: 'Multi-Service Integration (Wi-Fi 7, CCTV, Voice)',
                duration: 'Weeks 19–21',
                tasks: [
                  'Connect enterprise Wi-Fi 7 APs into 2.5GE/10GE PoE++ ports on multi-service ONUs.',
                  'Connect IP CCTV cameras and VoIP phones; verify 802.3af/at/bt PoE power delivery.',
                  'Assign 802.1Q tagged VLANs: Admin (10), Faculty (20), Students (30), CCTV (50), Voice (60).'
                ],
                deliverable: 'Full Multi-Service Triple-Play Edge Connectivity'
              },
              {
                step: 'Phase 6',
                title: 'Zero-Touch OMCI Provisioning & Legacy Decommission',
                duration: 'Weeks 22–24',
                tasks: [
                  'Push automated OMCI service templates from central NMS based on ONU serial number.',
                  'Execute 72-hour burn-in and sub-50ms Type B optical protection failover testing.',
                  'Migrate user traffic building by building.',
                  'Shut down legacy access switches, remove floor UPS batteries, and turn off floor A/C units.'
                ],
                deliverable: '100% All-Optical Live Campus & 60 m² Space Reclaimed'
              }
            ].map((p, pIdx) => (
              <div key={pIdx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {p.step}
                    </span>
                    <h4 className="text-sm font-bold text-white">{p.title}</h4>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{p.duration}</span>
                </div>

                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside pl-1">
                  {p.tasks.map((task, tIdx) => (
                    <li key={tIdx}>{task}</li>
                  ))}
                </ul>

                <div className="pt-2 text-[11px] text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Deliverable:</strong> {p.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: REAL-TIME INTERACTIVE CAMPUS DESIGN STUDIO */}
      {activeSubTab === 'builder' && (
        <div className="space-y-6">
          {/* Builder Controls Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <div>
              <span className="font-bold text-white text-sm block">Real-Time Campus Network Design Studio</span>
              <span className="text-slate-400 text-xs">Add campus zones, customize split ratios, and dynamically calculate capacity and PoE requirements.</span>
            </div>
            <button
              onClick={addZone}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold cursor-pointer transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Campus Zone</span>
            </button>
          </div>

          {/* Builder Summary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block">Total Campus Zones</span>
              <span className="text-xl font-bold font-mono text-cyan-400 tabular-nums mt-0.5 block">{totalZonesCount} Zones</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block">Connected Endpoints</span>
              <span className="text-xl font-bold font-mono text-teal-300 tabular-nums mt-0.5 block">{totalEndpoints} Devices</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block">Total PoE Draw</span>
              <span className="text-xl font-bold font-mono text-amber-300 tabular-nums mt-0.5 block">{totalPoeWatts} W</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block">Floor Switches Needed</span>
              <span className="text-xl font-bold font-mono text-emerald-400 tabular-nums mt-0.5 block">0 Units (FTTO)</span>
            </div>
          </div>

          {/* Zones Config Cards */}
          <div className="space-y-4">
            {zones.map((zone, idx) => (
              <div key={zone.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-bold font-mono flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={zone.name}
                      onChange={(e) => updateZone(zone.id, 'name', e.target.value)}
                      className="bg-transparent text-sm font-bold text-white border-b border-transparent hover:border-slate-700 focus:border-cyan-500 focus:outline-none px-1"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span>Splitter:</span>
                      <select
                        value={zone.splitRatio}
                        onChange={(e) => updateZone(zone.id, 'splitRatio', e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="1:4">1:4 (7.2 dB loss)</option>
                        <option value="1:8">1:8 (10.5 dB loss)</option>
                        <option value="1:16">1:16 (14.0 dB loss)</option>
                        <option value="1:32">1:32 (17.5 dB loss)</option>
                      </select>
                    </div>

                    {zones.length > 1 && (
                      <button
                        onClick={() => removeZone(zone.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Remove Zone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Device Inputs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <label className="text-slate-400 flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5 text-blue-400" />
                      <span>Wired PCs (GE)</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={zone.pcs}
                      onChange={(e) => updateZone(zone.id, 'pcs', parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-white text-sm"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <label className="text-slate-400 flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-purple-400" />
                      <span>Wi-Fi 7 APs (PoE++)</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={zone.wifiAps}
                      onChange={(e) => updateZone(zone.id, 'wifiAps', parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-white text-sm"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <label className="text-slate-400 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-teal-400" />
                      <span>CCTV Cameras (PoE)</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={zone.cctvCameras}
                      onChange={(e) => updateZone(zone.id, 'cctvCameras', parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-white text-sm"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <label className="text-slate-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>IP VoIP Phones</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={zone.ipPhones}
                      onChange={(e) => updateZone(zone.id, 'ipPhones', parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
