import React, { useState, useMemo } from 'react';
import {
  Layers,
  Network,
  Server,
  Shield,
  Zap,
  Building,
  Factory,
  Stethoscope,
  Briefcase,
  Monitor,
  Wifi,
  Video,
  Phone,
  Eye,
  Play,
  Pause,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Wrench,
  Sparkles,
  Maximize2,
  RotateCcw,
  Sliders,
  Radio,
  FileText,
  Copy,
  Check,
  Download,
  ZoomIn,
  ZoomOut,
  Search,
  Compass,
  Printer,
  Info,
  Activity,
  Terminal,
  X,
  Film,
  Volume2,
  VolumeX,
  FastForward,
  Rewind
} from 'lucide-react';

export type EnvironmentKey =
  | 'university'
  | 'hospital'
  | 'industry'
  | 'large-campus'
  | 'small-campus'
  | 'building'
  | 'office';

interface Node3D {
  id: string;
  name: string;
  category: 'Core/Security' | 'Headend OLT' | 'Backbone Feeder' | 'Passive ODN' | 'Edge ONU' | 'Endpoint Device';
  layerZ: number; // 0 to 5 for 3D depth
  posX: number;   // 0 to 100 percentage across canvas
  posY: number;   // 0 to 100 percentage down canvas
  powerState: 'active' | 'passive';
  modelExample: string;
  portsUsed: string;
  mediumIn: string;
  mediumOut: string;
  deploymentRole: string;
  howToDeploy: string;
  cliCommandSample: string;
  ciscoCli?: string;
  zteCli?: string;
  transceiverType?: string;
  connectorType?: string;
  wavelength?: string;
  opticalPowerDbm?: string;
  poePowerWatts?: string;
  rackSpace?: string;
}

interface Link3D {
  fromId: string;
  toId: string;
  cableType: 'Fiber Feeder' | 'Fiber Drop' | 'Copper Ethernet' | 'Copper PoE++' | 'LACP Trunk';
  color: string;
  signalType: string;
}

interface DeploymentStage {
  stageNumber: number;
  title: string;
  duration: string;
  focusNodes: string[];
  protocol: string;
  acceptanceTest: string;
}

export const ENVIRONMENTS_DATA: Record<
  EnvironmentKey,
  {
    name: string;
    subtitle: string;
    icon: any;
    accentColor: string;
    imageUrl: string;
    nodes: Node3D[];
    links: Link3D[];
    stages: DeploymentStage[];
  }
> = {
  university: {
    name: 'University Campus (Multi-Building)',
    subtitle: '10 Academic Faculties, Central Data Center, 1:16 Floor Splitters, Smart Classrooms & Wi-Fi 7',
    icon: Building,
    accentColor: 'cyan',
    imageUrl: '/src/assets/images/university_campus_net_1791279171441.jpg',
    nodes: [
      {
        id: 'u-firewall',
        name: 'Perimeter Security Firewall',
        category: 'Core/Security',
        layerZ: 0,
        posX: 12,
        posY: 18,
        powerState: 'active',
        modelExample: 'Huawei USG6680E / FortiGate 600F',
        portsUsed: '10GE WAN to ISP, 40GE Eth-Trunk to Core',
        mediumIn: 'Single-mode ISP Fiber',
        mediumOut: '40G MPO/LC Fiber Trunk',
        deploymentRole: 'Perimeter NAT, academic content filtering, student vs. staff isolation.',
        howToDeploy: 'Rack mount in DC Rack A1 with dual AC feeds; configure security zones Trust/Untrust.',
        cliCommandSample: 'firewall zone trust; add interface Eth-Trunk 1'
      },
      {
        id: 'u-core',
        name: 'Campus Core Switch (100GE)',
        category: 'Core/Security',
        layerZ: 0,
        posX: 30,
        posY: 18,
        powerState: 'active',
        modelExample: 'Huawei S12700E / Cisco Catalyst 9600',
        portsUsed: '100GE LACP Trunks to OLTs, L3 Gateways',
        mediumIn: '40G Eth-Trunk from Firewall',
        mediumOut: '100GE Single-mode Fiber to OLT',
        deploymentRole: 'Spine Layer 3 routing, DHCP relay with Option 82, campus gateway routing.',
        howToDeploy: 'Install in DC Rack A2; configure VLANIF gateways (VLAN 10, 20, 30, 50, 60).',
        cliCommandSample: 'vlan batch 10 20 30 50 60; interface Eth-Trunk 2; mode lacp-static'
      },
      {
        id: 'u-olt',
        name: 'Optical Line Terminal (OLT Chassis)',
        category: 'Headend OLT',
        layerZ: 1,
        posX: 50,
        posY: 18,
        powerState: 'active',
        modelExample: 'Huawei SmartAX EA5800-X7 (16-Port XGS-PON)',
        portsUsed: 'Slots 9-10 MPU, Slot 1 16-Port XGS-PON SFP+',
        mediumIn: '100GE from Core Switch',
        mediumOut: 'LC/APC Single-Mode Pigtails to ODF',
        deploymentRole: 'Central intelligent master scheduling DBA time slots for up to 1,024 ONUs.',
        howToDeploy: 'Mount in central DC with dual -48V DC feeds; configure DBA and line profiles.',
        cliCommandSample: 'dba-profile add profile-id 10 type3 assure 51200 max 1024000'
      },
      {
        id: 'u-odf',
        name: '288-Core High-Density ODF',
        category: 'Passive ODN',
        layerZ: 1,
        posX: 70,
        posY: 18,
        powerState: 'passive',
        modelExample: '19-inch 288-Core LC/APC Patch Matrix',
        portsUsed: 'Splice cassettes 1-12, Bulkhead adapters',
        mediumIn: 'OLT SFP+ LC/APC Pigtails',
        mediumOut: '48-Core Outdoor Armored Feeder Trunk',
        deploymentRole: 'Unpowered fiber patch matrix connecting OLT ports to outdoor campus feeder ring.',
        howToDeploy: 'Mount adjacent to OLT; fusion splice outdoor loose-tube fibers to LC/APC pigtails (<0.08dB).',
        cliCommandSample: '# Passive frame: Label TIA-606-C [Rack-ODF-Tray-Port]'
      },
      {
        id: 'u-feeder',
        name: 'Armored Feeder Ring (G.652.D)',
        category: 'Backbone Feeder',
        layerZ: 2,
        posX: 50,
        posY: 42,
        powerState: 'passive',
        modelExample: 'GYTA53 48-Core Double-Sheathed Armored Glass',
        portsUsed: 'Underground Duct Ring through Manholes',
        mediumIn: 'ODF Tray 1 Ports',
        mediumOut: 'Building Entrance Splice Cassette',
        deploymentRole: 'Carries light up to 20 km without repeaters; Type B redundant dual-homed paths.',
        howToDeploy: 'Pull through underground duct with tension dynamometer; leave 15m expansion coils in manholes.',
        cliCommandSample: '# OTDR test bi-directional: Loss < 0.35 dB/km @ 1310nm'
      },
      {
        id: 'u-splitter-eng',
        name: 'Faculty of Computing 1:16 Splitter',
        category: 'Passive ODN',
        layerZ: 3,
        posX: 25,
        posY: 62,
        powerState: 'passive',
        modelExample: 'PLC 1:16 Splitter in Floor ELV Riser ODB',
        portsUsed: '1 Input In-Port -> 16 Out-Ports',
        mediumIn: 'Outdoor Feeder Strand (1 Core)',
        mediumOut: '16x Indoor Bend-Insensitive Drop Fibers',
        deploymentRole: 'Unpowered optical beam splitter in building riser shaft (0 Watts, zero cooling).',
        howToDeploy: 'Mount in floor ELV riser box; splice input to feeder; measure output power (-16 dBm to -20 dBm).',
        cliCommandSample: '# Insertion loss budget: 14.0 dB per 1:16 PLC split'
      },
      {
        id: 'u-splitter-adm',
        name: 'Admin & Library 1:16 Splitter',
        category: 'Passive ODN',
        layerZ: 3,
        posX: 75,
        posY: 62,
        powerState: 'passive',
        modelExample: 'PLC 1:16 Splitter in Floor ELV Riser ODB',
        portsUsed: '1 Input In-Port -> 16 Out-Ports',
        mediumIn: 'Outdoor Feeder Strand (1 Core)',
        mediumOut: '16x Indoor Bend-Insensitive Drop Fibers',
        deploymentRole: 'Unpowered optical beam splitter serving executive admin offices and library floors.',
        howToDeploy: 'Mount in riser shaft cabinet; clean bulkhead ports using one-click pen before patching.',
        cliCommandSample: '# Verified output power: -18.2 dBm @ 1577nm'
      },
      {
        id: 'u-onu-fcit',
        name: 'Professor Office Panel ONU',
        category: 'Edge ONU',
        layerZ: 4,
        posX: 18,
        posY: 82,
        powerState: 'active',
        modelExample: 'Huawei OptiXstar P871E (86-Box Flush Mount)',
        portsUsed: '1x XGS-PON Optical, 4x GE Copper + PoE',
        mediumIn: 'G.657 Bend-Insensitive Drop Fiber',
        mediumOut: 'Cat6 UTP Patch Leads to Endpoints',
        deploymentRole: 'Converts optical signal into 4 Gigabit Ethernet sockets in faculty office.',
        howToDeploy: 'Mount into standard 86-type wall box; plug SC/APC green fiber; verify PON LED turns solid green.',
        cliCommandSample: 'ont add 1 1 sn-auth "48575443ABC12345" omci'
      },
      {
        id: 'u-onu-lab',
        name: 'Smart Lab Zone ONU (PoE++)',
        category: 'Edge ONU',
        layerZ: 4,
        posX: 40,
        posY: 82,
        powerState: 'active',
        modelExample: 'OptiXstar P885E (24x 2.5GE PoE++ Ports)',
        portsUsed: '2x XGS-PON Uplinks, 24x 2.5GE PoE++ Out',
        mediumIn: 'G.657 2-Core Drop Fiber',
        mediumOut: 'Cat6A Copper to Wi-Fi 7 APs and PCs',
        deploymentRole: 'Powers high-density smart classroom equipment, 60W PoE++ interactive displays.',
        howToDeploy: 'Rack mount in lab bench credenza; connect redundant feeder fiber drops.',
        cliCommandSample: 'interface xgpon 0/1; ont-port eth 24 poe-mode 802.3bt'
      },
      {
        id: 'u-onu-admin',
        name: 'Vice Chancellor Office ONU',
        category: 'Edge ONU',
        layerZ: 4,
        posX: 80,
        posY: 82,
        powerState: 'active',
        modelExample: 'Huawei OptiXstar P871E Panel ONU',
        portsUsed: '1x SC/APC Optical, 4x GE Copper',
        mediumIn: 'G.657 Drop Fiber',
        mediumOut: 'Cat6 Patch Leads to Executive PC & Phone',
        deploymentRole: 'Executive office terminal with dedicated QoS and hardware AES-128 encryption.',
        howToDeploy: 'Flush mount on wall beside executive desk; zero audible fan noise (fanless passive heat sink).',
        cliCommandSample: 'ont-encryption 1 1 aes'
      },
      {
        id: 'u-pc',
        name: 'Faculty Workstation PC',
        category: 'Endpoint Device',
        layerZ: 5,
        posX: 10,
        posY: 94,
        powerState: 'active',
        modelExample: 'Gigabit Workstation (VLAN 20)',
        portsUsed: 'RJ-45 GbE NIC',
        mediumIn: 'Cat6 Copper Patch Lead (Blue, 2m)',
        mediumOut: 'User Screen / Host Stack',
        deploymentRole: 'High-speed wired desktop access for faculty research.',
        howToDeploy: 'Plug into ONU GE Port 1; receives DHCP address 10.10.20.x automatically.',
        cliCommandSample: 'ipconfig /all -> Gateway: 10.10.20.1 (Ping < 1.5ms)'
      },
      {
        id: 'u-wifi',
        name: 'Wi-Fi 7 Access Point',
        category: 'Endpoint Device',
        layerZ: 5,
        posX: 32,
        posY: 94,
        powerState: 'active',
        modelExample: 'Huawei AirEngine 8771-X1T (Tri-Band)',
        portsUsed: '2.5GE / 10GE PoE++ Uplink',
        mediumIn: 'Cat6A Copper (Blue + Red Dashed, PoE)',
        mediumOut: 'Wireless Radio (2.4G/5G/6G)',
        deploymentRole: 'Broadcasts multi-SSID wireless networks (Faculty, Students, Guests) with WPA3.',
        howToDeploy: 'Ceiling mount in center of lab; draws 45W PoE++ power from Zone ONU.',
        cliCommandSample: 'wlan; vap-profile name FACULTY_WIFI; service-vlan 20'
      },
      {
        id: 'u-cctv',
        name: '4K IP Surveillance Camera',
        category: 'Endpoint Device',
        layerZ: 5,
        posX: 55,
        posY: 94,
        powerState: 'active',
        modelExample: '4K H.265+ Dome Camera (VLAN 50)',
        portsUsed: '100M/1G RJ-45 Port',
        mediumIn: 'Cat6 Copper (PoE 802.3af 12W)',
        mediumOut: 'Video Stream to NVR',
        deploymentRole: 'Hallway perimeter security; strictly blocked from external internet outbound.',
        howToDeploy: 'Corner mount on corridor ceiling; plug into ONU Port 3.',
        cliCommandSample: 'rtsp://10.10.50.45:554/Streaming/Channels/101'
      },
      {
        id: 'u-phone',
        name: 'VoIP IP Desk Phone',
        category: 'Endpoint Device',
        layerZ: 5,
        posX: 85,
        posY: 94,
        powerState: 'active',
        modelExample: 'SIP HD Audio Phone (VLAN 60)',
        portsUsed: 'RJ-45 Ethernet + Handset',
        mediumIn: 'Cat6 Copper (PoE 802.3af 5W)',
        mediumOut: 'SIP Audio RTP Stream',
        deploymentRole: 'Campus 4-digit extension telephony with DSCP Expedited Forwarding (EF) priority.',
        howToDeploy: 'Desk mount; auto-provisions via LLDP-MED on Voice VLAN 60.',
        cliCommandSample: 'SIP Register: 2045@10.10.60.10 (Status: 200 OK)'
      }
    ],
    links: [
      { fromId: 'u-firewall', toId: 'u-core', cableType: 'LACP Trunk', color: '#f43f5e', signalType: '40G Eth-Trunk 1' },
      { fromId: 'u-core', toId: 'u-olt', cableType: 'LACP Trunk', color: '#06b6d4', signalType: '100GE Eth-Trunk 2' },
      { fromId: 'u-olt', toId: 'u-odf', cableType: 'Fiber Feeder', color: '#f59e0b', signalType: 'XGS-PON 10G Optical' },
      { fromId: 'u-odf', toId: 'u-feeder', cableType: 'Fiber Feeder', color: '#f59e0b', signalType: '48-Core Armored Feeder' },
      { fromId: 'u-feeder', toId: 'u-splitter-eng', cableType: 'Fiber Feeder', color: '#10b981', signalType: 'Single Feeder Core (0 Watts)' },
      { fromId: 'u-feeder', toId: 'u-splitter-adm', cableType: 'Fiber Feeder', color: '#10b981', signalType: 'Single Feeder Core (0 Watts)' },
      { fromId: 'u-splitter-eng', toId: 'u-onu-fcit', cableType: 'Fiber Drop', color: '#10b981', signalType: '1-Core Drop Fiber (G.657)' },
      { fromId: 'u-splitter-eng', toId: 'u-onu-lab', cableType: 'Fiber Drop', color: '#10b981', signalType: '2-Core Drop Fiber (G.657)' },
      { fromId: 'u-splitter-adm', toId: 'u-onu-admin', cableType: 'Fiber Drop', color: '#10b981', signalType: '1-Core Drop Fiber (G.657)' },
      { fromId: 'u-onu-fcit', toId: 'u-pc', cableType: 'Copper Ethernet', color: '#3b82f6', signalType: '1 Gbps Data (VLAN 20)' },
      { fromId: 'u-onu-lab', toId: 'u-wifi', cableType: 'Copper PoE++', color: '#ec4899', signalType: '2.5Gbps Data + 60W PoE++' },
      { fromId: 'u-onu-lab', toId: 'u-cctv', cableType: 'Copper PoE++', color: '#14b8a6', signalType: '100Mbps RTSP + 12W PoE' },
      { fromId: 'u-onu-admin', toId: 'u-phone', cableType: 'Copper Ethernet', color: '#f59e0b', signalType: 'SIP Voice Data (VLAN 60)' }
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Central Data Center Headend Commissioning',
        duration: 'Weeks 1–4',
        focusNodes: ['u-firewall', 'u-core', 'u-olt', 'u-odf'],
        protocol: 'Install dual OLT chassis in Rack A1/A2, splice LC/APC pigtails into 288-core ODF, configure 100GE LACP trunks.',
        acceptanceTest: 'Verify OLT control board redundancy failover < 50ms; confirm optical Tx power +3.5 dBm on all ports.'
      },
      {
        stageNumber: 2,
        title: 'Campus Outside Plant Armored Feeder Pulling',
        duration: 'Weeks 5–9',
        focusNodes: ['u-feeder'],
        protocol: 'Pull 48-core double-sheathed armored single-mode cable through underground ducts in physical ring.',
        acceptanceTest: 'Execute bi-directional OTDR trace; ensure splice loss < 0.08 dB and total link attenuation < 2.5 dB.'
      },
      {
        stageNumber: 3,
        title: 'Vertical ELV Riser Splitter Integration',
        duration: 'Weeks 10–14',
        focusNodes: ['u-splitter-eng', 'u-splitter-adm'],
        protocol: 'Mount Optical Distribution Boxes (ODBs) in building riser shafts; snap 1:16 PLC splitters into trays.',
        acceptanceTest: 'Measure optical power at every splitter output port with calibrated OPM (Target: -17 dBm to -21 dBm).'
      },
      {
        stageNumber: 4,
        title: 'Horizontal Office Drops & Panel ONU Mounting',
        duration: 'Weeks 15–18',
        focusNodes: ['u-onu-fcit', 'u-onu-lab', 'u-onu-admin'],
        protocol: 'Pull bend-insensitive G.657 drops into 86-type wall boxes; mount flush panel ONUs; auto-register via OMCI.',
        acceptanceTest: 'Observe PON status LED turns solid green; verify OMCI profile push from central OLT within 15 seconds.'
      },
      {
        stageNumber: 5,
        title: 'Multi-Service Edge Turn-Up & Switch Room Retirement',
        duration: 'Weeks 19–24',
        focusNodes: ['u-pc', 'u-wifi', 'u-cctv', 'u-phone'],
        protocol: 'Connect Wi-Fi 7 APs (PoE++), CCTV cameras, and phones; migrate user VLANs; turn off floor switch room A/C.',
        acceptanceTest: 'Run 72-hour error-free soak test; confirm 10 floor IDF switch closets decommissioned and powered down.'
      }
    ]
  },

  hospital: {
    name: 'Modern Hospital & Healthcare Campus',
    subtitle: 'Zero-EMI Optical Infrastructure, MRI/Radiology Isolation, PACS Imaging & Critical Telemetry',
    icon: Stethoscope,
    accentColor: 'emerald',
    imageUrl: '/src/assets/images/hospital_medical_net_1791279188559.jpg',
    nodes: [
      {
        id: 'h-core',
        name: 'Medical Core Datacenter Switch',
        category: 'Core/Security',
        layerZ: 0,
        posX: 20,
        posY: 18,
        powerState: 'active',
        modelExample: 'Dual Resilient Fabric 99.999% SLA',
        portsUsed: 'Dedicated PACS 100G links, OLT Trunks',
        mediumIn: 'Medical Hospital Spine Fiber',
        mediumOut: '100GE to Dual Healthcare OLTs',
        deploymentRole: 'Ultra-low latency packet switching for surgical telemetry and gigabyte MRI radiology scans.',
        howToDeploy: 'Hospital datacenter with clean power and isolated medical UPS circuits.',
        cliCommandSample: 'vlan 70 name PACS_RADIOLOGY; priority 6'
      },
      {
        id: 'h-olt',
        name: 'Healthcare OLT (Type B Protected)',
        category: 'Headend OLT',
        layerZ: 1,
        posX: 50,
        posY: 18,
        powerState: 'active',
        modelExample: 'Huawei SmartAX EA5800 Type B Dual Homing',
        portsUsed: 'Dual PON Ports for Protection Group',
        mediumIn: '100GE from Medical Core',
        mediumOut: '2:N Splitter Feeder Cables',
        deploymentRole: 'Sub-50ms automatic optical protection so life-support telemetry never drops during fiber damage.',
        howToDeploy: 'Configure Type B protection group between PON ports 0/1/1 and 0/2/1.',
        cliCommandSample: 'protect-group 1 gpon work-port 0/1/1 protect-port 0/2/1'
      },
      {
        id: 'h-feeder',
        name: 'Dielectric Fiber Backbone (Zero EMI)',
        category: 'Backbone Feeder',
        layerZ: 2,
        posX: 50,
        posY: 42,
        powerState: 'passive',
        modelExample: 'All-Dielectric Non-Conductive Cable (ADSS)',
        portsUsed: 'Hospital Utility Tunnels',
        mediumIn: 'Datacenter ODF',
        mediumOut: 'Surgical & Inpatient Floor Riser',
        deploymentRole: 'Non-metallic glass cable routing near MRI magnets with zero electromagnetic interference.',
        howToDeploy: 'Pull through dedicated non-ferrous cable trays directly adjacent to imaging suites.',
        cliCommandSample: '# 100% immune to 3-Tesla MRI magnetic fields'
      },
      {
        id: 'h-splitter',
        name: 'Radiology / Surgical 1:16 Splitter',
        category: 'Passive ODN',
        layerZ: 3,
        posX: 50,
        posY: 62,
        powerState: 'passive',
        modelExample: 'Zero-Heat Riser Splitter Box',
        portsUsed: '1 Input -> 16 Out-Ports',
        mediumIn: 'Dielectric Feeder Fiber',
        mediumOut: 'Cleanroom Optical Drops',
        deploymentRole: 'Unpowered splitter in surgical wing riser; produces 0 Watts heat and zero electrical noise.',
        howToDeploy: 'Install inside cleanroom shaft with sealed gasket access door.',
        cliCommandSample: '# Insertion loss 14.1 dB; zero spark hazard'
      },
      {
        id: 'h-onu-mri',
        name: 'Diagnostic Radiology Panel ONU',
        category: 'Edge ONU',
        layerZ: 4,
        posX: 25,
        posY: 82,
        powerState: 'active',
        modelExample: 'Antimicrobial Faceplate Panel ONU (10GE)',
        portsUsed: '1x XGS-PON, 2x 10GE LAN',
        mediumIn: 'G.657 Bend-Insensitive Fiber',
        mediumOut: 'Shielded Patch Leads to PACS Workstation',
        deploymentRole: 'Transfers high-resolution CT/MRI scans at wire speed to radiologists.',
        howToDeploy: 'Flush mount on wall beside diagnostic monitors; easy alcohol wipe-down casing.',
        cliCommandSample: 'service-port vlan 70 gpon 0/1/1 ont 1 gemport 1'
      },
      {
        id: 'h-onu-icu',
        name: 'ICU Telemetry Station ONU',
        category: 'Edge ONU',
        layerZ: 4,
        posX: 75,
        posY: 82,
        powerState: 'active',
        modelExample: 'Rugged Fanless Medical Grade ONU (PoE+)',
        portsUsed: '4x GE PoE+ Ports',
        mediumIn: 'G.657 Fiber Drop',
        mediumOut: 'Cat6 to Patient Monitors & Nurse Tablet AP',
        deploymentRole: 'Powers patient vitals monitoring equipment and emergency nurse call buttons.',
        howToDeploy: 'Mount behind nurse station desk; backed by hospital essential power circuit.',
        cliCommandSample: 'ont-port eth 4 poe-priority critical'
      },
      {
        id: 'h-mri-pc',
        name: '3D PACS Diagnostic Workstation',
        category: 'Endpoint Device',
        layerZ: 5,
        posX: 25,
        posY: 94,
        powerState: 'active',
        modelExample: 'Dual Medical Monitor Viewing Console',
        portsUsed: '10G Ethernet NIC',
        mediumIn: 'Cat6A Patch Lead (VLAN 70)',
        mediumOut: 'Diagnostic Imaging Display',
        deploymentRole: 'Radiologist reading console with instant zero-lag scan retrieval.',
        howToDeploy: 'Connect to 10G port on Radiology ONU.',
        cliCommandSample: 'DICOM transfer speed: > 950 MB/s'
      },
      {
        id: 'h-icu-mon',
        name: 'Patient Telemetry & Infusion System',
        category: 'Endpoint Device',
        layerZ: 5,
        posX: 75,
        posY: 94,
        powerState: 'active',
        modelExample: 'Continuous Cardiac & Oxygen Monitor',
        portsUsed: 'PoE 802.3af Medical Port',
        mediumIn: 'Cat6 Patch Lead (VLAN 80)',
        mediumOut: 'Central Nurse Station Alert Matrix',
        deploymentRole: 'Continuous real-time patient telemetry with highest QoS priority.',
        howToDeploy: 'Wall arm mount beside patient bed; draws PoE power from ICU ONU.',
        cliCommandSample: 'DSCP EF (Expedited Forwarding - Priority 6)'
      }
    ],
    links: [
      { fromId: 'h-core', toId: 'h-olt', cableType: 'LACP Trunk', color: '#10b981', signalType: 'Dual 100GE Uplink' },
      { fromId: 'h-olt', toId: 'h-feeder', cableType: 'Fiber Feeder', color: '#10b981', signalType: 'Type B Protected Feeder' },
      { fromId: 'h-feeder', toId: 'h-splitter', cableType: 'Fiber Feeder', color: '#10b981', signalType: 'Dielectric Fiber (Zero EMI)' },
      { fromId: 'h-splitter', toId: 'h-onu-mri', cableType: 'Fiber Drop', color: '#06b6d4', signalType: 'Cleanroom Optical Drop' },
      { fromId: 'h-splitter', toId: 'h-onu-icu', cableType: 'Fiber Drop', color: '#06b6d4', signalType: 'Cleanroom Optical Drop' },
      { fromId: 'h-onu-mri', toId: 'h-mri-pc', cableType: 'Copper Ethernet', color: '#3b82f6', signalType: '10GE PACS Imaging Data' },
      { fromId: 'h-onu-icu', toId: 'h-icu-mon', cableType: 'Copper PoE++', color: '#ec4899', signalType: 'Vital Telemetry + PoE' }
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Core Datacenter & Medical OLT Setup',
        duration: 'Weeks 1–3',
        focusNodes: ['h-core', 'h-olt'],
        protocol: 'Install redundant OLTs on isolated medical power bus; configure Type B protection.',
        acceptanceTest: 'Simulate primary fiber pull; verify sub-50ms failover with zero packet loss on telemetry.'
      },
      {
        stageNumber: 2,
        title: 'Dielectric Non-Metallic Fiber Pulling',
        duration: 'Weeks 4–7',
        focusNodes: ['h-feeder'],
        protocol: 'Route metal-free optical cables through MRI suite conduits and surgical shafts.',
        acceptanceTest: 'Verify complete absence of magnetic resonance interference while MRI is at full 3T scan.'
      },
      {
        stageNumber: 3,
        title: 'Cleanroom Splitters & Clinical ONUs Turn-Up',
        duration: 'Weeks 8–12',
        focusNodes: ['h-splitter', 'h-onu-mri', 'h-onu-icu'],
        protocol: 'Install sealed ODBs and antimicrobial ONUs in patient rooms and reading suites.',
        acceptanceTest: 'Verify alcohol-resistant faceplates and complete absence of cooling fan dust dispersal.'
      },
      {
        stageNumber: 4,
        title: 'PACS Imaging & Life-Safety Acceptance',
        duration: 'Weeks 13–16',
        focusNodes: ['h-mri-pc', 'h-icu-mon'],
        protocol: 'Map PACS DICOM VLAN 70 and Patient Telemetry VLAN 80 with strict QoS priority queues.',
        acceptanceTest: 'Verify 4GB MRI series loads in < 2 seconds; confirm 99.999% uptime compliance.'
      }
    ]
  },

  industry: {
    name: 'Smart Industry & Manufacturing Plant',
    subtitle: 'Rugged DIN-Rail ONUs, Steel-Tape Armored Glass, OT/IT Zero-Trust & Heavy Machinery EMI Immunity',
    icon: Factory,
    accentColor: 'amber',
    imageUrl: '/src/assets/images/smart_industry_net_1791279206500.jpg',
    nodes: [
      {
        id: 'i-olt',
        name: 'Central Control Room OLT',
        category: 'Headend OLT',
        layerZ: 0,
        posX: 20,
        posY: 18,
        powerState: 'active',
        modelExample: 'Industrial OLT in Climate-Controlled Admin Vault',
        portsUsed: 'XGS-PON Combo SFP+ to Plant Floor',
        mediumIn: 'Enterprise ERP 40G Uplink',
        mediumOut: 'Steel-Tape Armored Outside Trunk',
        deploymentRole: 'Concentrated master keeping all active networking gear away from hot, dusty factory floors.',
        howToDeploy: 'Install in admin office server room with isolated grounding and power conditioning.',
        cliCommandSample: 'dba-profile add profile-id 40 profile-name INDUSTRIAL_SCADA type1 fix 10240'
      },
      {
        id: 'i-feeder',
        name: 'Heavy Steel-Tape Armored Trunk',
        category: 'Backbone Feeder',
        layerZ: 1,
        posX: 50,
        posY: 42,
        powerState: 'passive',
        modelExample: 'GYTA53 Double Corrugated Steel Armored Cable',
        portsUsed: 'High-Bay Overhead Gantry Conduits',
        mediumIn: 'Control Room ODF',
        mediumOut: 'Plant Gantry Optical Distribution Box',
        deploymentRole: 'Traverses heavy motor welding shops with 100% immunity to electrical sparks and inductive surge.',
        howToDeploy: 'Clamp along industrial overhead cable trays; ground steel tape at entry points.',
        cliCommandSample: '# Resistant to crushing, rodents, and heavy welding EMF'
      },
      {
        id: 'i-splitter',
        name: 'IP66 Dust-Tight Gantry Splitter Box',
        category: 'Passive ODN',
        layerZ: 2,
        posX: 50,
        posY: 62,
        powerState: 'passive',
        modelExample: 'Sealed IP66 Metal Enclosure (1:16 PLC)',
        portsUsed: '1 Input -> 16 Industrial Drop Out-Ports',
        mediumIn: 'Armored Feeder Cable',
        mediumOut: 'Heavy Armored Drop Fibers',
        deploymentRole: 'Passive optical junction box mounted on high factory pillars with zero cooling fans.',
        howToDeploy: 'Mount with vibration dampeners on plant structural steel columns; 0 Watts power.',
        cliCommandSample: '# Sealed against oil mist, grinding dust, and humidity'
      },
      {
        id: 'i-onu-plc',
        name: 'Plant-Floor DIN-Rail Industrial ONU',
        category: 'Edge ONU',
        layerZ: 3,
        posX: 25,
        posY: 82,
        powerState: 'active',
        modelExample: 'Huawei OptiXstar T602E / T823E (-40°C to +70°C)',
        portsUsed: 'SC/APC Optical, 4x GE M12/RJ45 + RS485 Serial',
        mediumIn: 'Armored Drop Fiber',
        mediumOut: 'Industrial Shielded Cat6 to Machine PLC',
        deploymentRole: 'Converts optical signal into machine network interfaces inside high-temperature panels.',
        howToDeploy: 'Snap onto standard 35mm DIN-rail inside machine control enclosure; dual 24V DC power feeds.',
        cliCommandSample: 'ont-port eth 4 speed 1000 duplex full'
      },
      {
        id: 'i-onu-cam',
        name: 'Perimeter Fence Security ONU',
        category: 'Edge ONU',
        layerZ: 3,
        posX: 75,
        posY: 82,
        powerState: 'active',
        modelExample: 'Outdoor Pole-Mounted IP67 PoE+ ONU',
        portsUsed: 'SC/APC Optical, 2x PoE+ Out',
        mediumIn: 'Armored Drop Cable',
        mediumOut: 'Outdoor UV-Resistant Cat6 to PTZ Camera',
        deploymentRole: 'Powers long-range thermal perimeter cameras 800m away with zero intermediate repeaters.',
        howToDeploy: 'Mount on boundary fence mast with surge arrestors; fed by direct single-mode fiber.',
        cliCommandSample: 'ont-port eth 1 poe-power 30W'
      },
      {
        id: 'i-plc-mach',
        name: 'Automated Assembly PLC Controller',
        category: 'Endpoint Device',
        layerZ: 4,
        posX: 25,
        posY: 94,
        powerState: 'active',
        modelExample: 'Siemens S7-1500 / Allen-Bradley PLC',
        portsUsed: 'Profinet / Modbus TCP Port',
        mediumIn: 'Industrial Shielded Ethernet (VLAN 90)',
        mediumOut: 'Robotic Actuators & Sensors',
        deploymentRole: 'Controls robotic arms and production conveyer lines with deterministic low jitter.',
        howToDeploy: 'Connect to Port 1 of DIN-rail ONU inside control panel.',
        cliCommandSample: 'Profinet cycle time: 1.0 ms deterministic'
      },
      {
        id: 'i-ptz-cam',
        name: 'Perimeter Thermal PTZ Camera',
        category: 'Endpoint Device',
        layerZ: 4,
        posX: 75,
        posY: 94,
        powerState: 'active',
        modelExample: 'Long-Range Thermal Night-Vision Camera',
        portsUsed: 'PoE+ RJ-45 Port',
        mediumIn: 'Outdoor UV Shielded Cat6 (VLAN 50)',
        mediumOut: 'Control Room Video Wall',
        deploymentRole: 'Monitors plant perimeter fence 800m away across outdoor boundary.',
        howToDeploy: 'Mount on mast top; powered via 802.3at PoE+ from fence-mounted ONU.',
        cliCommandSample: 'RTSP video stream: 10.10.50.88 (Night Vision Active)'
      }
    ],
    links: [
      { fromId: 'i-olt', toId: 'i-feeder', cableType: 'Fiber Feeder', color: '#f59e0b', signalType: 'XGS-PON Armored Trunk' },
      { fromId: 'i-feeder', toId: 'i-splitter', cableType: 'Fiber Feeder', color: '#f59e0b', signalType: 'Steel Armored Trunk' },
      { fromId: 'i-splitter', toId: 'i-onu-plc', cableType: 'Fiber Drop', color: '#10b981', signalType: 'Armored Drop Fiber' },
      { fromId: 'i-splitter', toId: 'i-onu-cam', cableType: 'Fiber Drop', color: '#10b981', signalType: 'Outdoor Armored Drop' },
      { fromId: 'i-onu-plc', toId: 'i-plc-mach', cableType: 'Copper Ethernet', color: '#3b82f6', signalType: 'Profinet Real-Time Data' },
      { fromId: 'i-onu-cam', toId: 'i-ptz-cam', cableType: 'Copper PoE++', color: '#ec4899', signalType: 'Video Stream + 30W PoE+' }
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Control Room Headend & OT Network Isolation',
        duration: 'Weeks 1–3',
        focusNodes: ['i-olt'],
        protocol: 'Install industrial OLT in control room; configure zero-trust OT VLAN 90 isolation from corporate IT.',
        acceptanceTest: 'Verify strict firewall isolation; ensure zero unauthenticated packets pass between factory and office.'
      },
      {
        stageNumber: 2,
        title: 'Corrugated Steel Armored Trunk Pulling',
        duration: 'Weeks 4–8',
        focusNodes: ['i-feeder', 'i-splitter'],
        protocol: 'Run heavy armored cables over high factory gantries; install IP66 vibration-proof splitters on columns.',
        acceptanceTest: 'Check optical power stability while 500-ton stamping presses and arc welders run at peak load.'
      },
      {
        stageNumber: 3,
        title: 'DIN-Rail ONUs & Machine Automation Commissioning',
        duration: 'Weeks 9–14',
        focusNodes: ['i-onu-plc', 'i-onu-cam', 'i-plc-mach', 'i-ptz-cam'],
        protocol: 'Snap DIN-rail ONUs into machine panels; hook up Profinet PLCs and 800m perimeter fence cameras.',
        acceptanceTest: 'Measure Profinet cycle latency (< 1.5ms); confirm uninterrupted video streaming from remote fence.'
      }
    ]
  },

  'large-campus': {
    name: 'Large Enterprise Campus (5,000+ Users)',
    subtitle: 'Dual-Homed OLTs, High-Density 24-Port 2.5GE PoE++ ONUs, Dual-Core 100G Fabric & Auditorium Coverage',
    icon: Building,
    accentColor: 'purple',
    imageUrl: '/src/assets/images/large_campus_net_1791279219332.jpg',
    nodes: [
      {
        id: 'lc-olt1',
        name: 'Primary Headend OLT-A',
        category: 'Headend OLT',
        layerZ: 0,
        posX: 25,
        posY: 18,
        powerState: 'active',
        modelExample: 'Huawei EA5800-X15 (Chassis A)',
        portsUsed: '15 Service Slots, Dual 100GE Uplinks',
        mediumIn: '100GE Core Switch A',
        mediumOut: 'ODF Rack 1 LC/APC Trays',
        deploymentRole: 'Primary optical aggregation headend driving 2,000+ subscriber trees.',
        howToDeploy: 'DC Rack A1; dual -48V DC feeds from independent rectifier plants.',
        cliCommandSample: 'protect-group 10 type B'
      },
      {
        id: 'lc-olt2',
        name: 'Redundant Headend OLT-B',
        category: 'Headend OLT',
        layerZ: 0,
        posX: 75,
        posY: 18,
        powerState: 'active',
        modelExample: 'Huawei EA5800-X15 (Chassis B)',
        portsUsed: '15 Service Slots, Dual 100GE Uplinks',
        mediumIn: '100GE Core Switch B',
        mediumOut: 'ODF Rack 2 LC/APC Trays',
        deploymentRole: 'Hot-standby redundant optical headend in separate datacenter row.',
        howToDeploy: 'DC Rack B1; feeds secondary paths of 2:N optical splitters.',
        cliCommandSample: 'protect-group 10 member gpon 0/1/1'
      },
      {
        id: 'lc-splitter',
        name: '2:32 High-Reliability Splitter',
        category: 'Passive ODN',
        layerZ: 1,
        posX: 50,
        posY: 52,
        powerState: 'passive',
        modelExample: '2 Input x 32 Output PLC Splitter',
        portsUsed: 'Input A from OLT-A, Input B from OLT-B',
        mediumIn: 'Dual Feeder Cables (Path A & B)',
        mediumOut: '32x Horizontal Distribution Drops',
        deploymentRole: 'Provides automatic hardware failover: if Feeder A is cut, Splitter automatically receives light on Input B.',
        howToDeploy: 'Install in building entrance vault; both feeder cables enter from opposite sides of building.',
        cliCommandSample: '# Failover time: < 35 ms (ITU-T G.984.1 Type B)'
      },
      {
        id: 'lc-onu-zone',
        name: 'High-Density 24-Port PoE++ ONU',
        category: 'Edge ONU',
        layerZ: 2,
        posX: 50,
        posY: 82,
        powerState: 'active',
        modelExample: 'OptiXstar P885E (24x 2.5GE / 10GE Ports)',
        portsUsed: '2x XGS-PON Uplinks, 24x 802.3bt Out (1,440W)',
        mediumIn: 'Dual Single-Mode Drop Fibers',
        mediumOut: 'Cat6A Copper to 24 High-Density APs',
        deploymentRole: 'Serves large auditoriums, stadiums, and library halls from a single 1U device.',
        howToDeploy: 'Rack mount in auditorium AV credenza; powers 12 Wi-Fi 7 APs and video encoders.',
        cliCommandSample: 'poe-power-management total-budget 1440W'
      },
      {
        id: 'lc-wifi-dense',
        name: 'Auditorium High-Density AP Array',
        category: 'Endpoint Device',
        layerZ: 3,
        posX: 50,
        posY: 94,
        powerState: 'active',
        modelExample: 'High-Capacity Stadium AP (500+ Clients)',
        portsUsed: 'Dual 10GE PoE++ Uplinks',
        mediumIn: 'Cat6A Copper (60W PoE++)',
        mediumOut: 'Beamforming Wireless Mesh',
        deploymentRole: 'Supports 1,500 simultaneous conference attendees without channel saturation.',
        howToDeploy: 'Mount along auditorium catwalks with directional antennas.',
        cliCommandSample: 'radio-5g channel-mode 320mhz beamforming enable'
      }
    ],
    links: [
      { fromId: 'lc-olt1', toId: 'lc-splitter', cableType: 'Fiber Feeder', color: '#a855f7', signalType: 'Feeder Path A (Active)' },
      { fromId: 'lc-olt2', toId: 'lc-splitter', cableType: 'Fiber Feeder', color: '#c084fc', signalType: 'Feeder Path B (Standby)' },
      { fromId: 'lc-splitter', toId: 'lc-onu-zone', cableType: 'Fiber Drop', color: '#10b981', signalType: 'Distribution Drop' },
      { fromId: 'lc-onu-zone', toId: 'lc-wifi-dense', cableType: 'Copper PoE++', color: '#ec4899', signalType: '2x 10GE + 60W PoE++' }
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Dual Datacenter OLT Cluster Deployment',
        duration: 'Weeks 1–6',
        focusNodes: ['lc-olt1', 'lc-olt2'],
        protocol: 'Rack mount primary and secondary OLT chassis with Type B cross-coupling.',
        acceptanceTest: 'Simulate power loss on OLT-A; verify all 5,000 subscriber sessions switch to OLT-B in < 40ms.'
      },
      {
        stageNumber: 2,
        title: 'Dual-Path Diverse Fiber Ring Splicing',
        duration: 'Weeks 7–14',
        focusNodes: ['lc-splitter'],
        protocol: 'Splice 2:32 splitters with feeds entering from north and south campus conduit gates.',
        acceptanceTest: 'Cut Feeder Path A with technician cleaver; verify zero video freeze on conference streams.'
      },
      {
        stageNumber: 3,
        title: 'High-Density Zone Terminals & Auditorium Turn-Up',
        duration: 'Weeks 15–24',
        focusNodes: ['lc-onu-zone', 'lc-wifi-dense'],
        protocol: 'Mount 24-port PoE++ zone ONUs in lecture halls and auditoriums; activate Wi-Fi 7 beams.',
        acceptanceTest: 'Load test with 1,000 synthetic wireless clients; verify aggregate throughput > 8.5 Gbps.'
      }
    ]
  },

  'small-campus': {
    name: 'Small Campus / SME Branch Office',
    subtitle: 'Compact 1U Pizza-Box OLT, Single Riser 1:16 Splitter, All-in-One Wi-Fi ONUs & Budget Optimization',
    icon: Briefcase,
    accentColor: 'blue',
    imageUrl: '/src/assets/images/small_campus_net_1791279238867.jpg',
    nodes: [
      {
        id: 'sc-olt',
        name: 'Compact 1U Pizza-Box OLT',
        category: 'Headend OLT',
        layerZ: 0,
        posX: 25,
        posY: 20,
        powerState: 'active',
        modelExample: 'Huawei SmartAX MA5801 (8-Port XGS-PON/GPON)',
        portsUsed: '10GE Uplink, 8x PON Ports',
        mediumIn: 'Direct ISP Fiber Gateway',
        mediumOut: 'LC/APC Pigtails to Mini ODF',
        deploymentRole: 'Economical, self-contained 1U optical headend designed for single buildings and small colleges.',
        howToDeploy: 'Mount in admin server cabinet with single standard AC 220V power; consumes only 65 Watts.',
        cliCommandSample: 'sysname Branch-OLT-01; dba-profile add profile-id 10 type4 max 1024000'
      },
      {
        id: 'sc-splitter',
        name: 'Single Riser 1:16 Splitter Box',
        category: 'Passive ODN',
        layerZ: 1,
        posX: 50,
        posY: 50,
        powerState: 'passive',
        modelExample: 'Wall-Mounted 1:16 PLC Cassette Box',
        portsUsed: '1 In -> 16 Out',
        mediumIn: '1-Core Feeder from Server Room',
        mediumOut: '16x Drop Fibers to Offices',
        deploymentRole: 'Feeds the entire branch building through vertical conduit without any floor switches.',
        howToDeploy: 'Mount on 2nd floor utility wall; requires 0 electrical outlets.',
        cliCommandSample: '# Entire building optical distribution costs under $200'
      },
      {
        id: 'sc-onu',
        name: 'All-in-One Wi-Fi 7 Optical Terminal',
        category: 'Edge ONU',
        layerZ: 2,
        posX: 50,
        posY: 80,
        powerState: 'active',
        modelExample: 'Huawei OptiXstar EN8145X6 (Built-In Wi-Fi)',
        portsUsed: '1x SC/APC Optical, 4x GE, Integrated Wi-Fi',
        mediumIn: 'G.657 Drop Fiber from Riser',
        mediumOut: 'Direct Wireless Broadcast & Copper Ports',
        deploymentRole: 'Eliminates separate external APs; single box provides high-speed wireless and wired ports for room.',
        howToDeploy: 'Desk mount or wall mount in office; power using local 12V DC power brick.',
        cliCommandSample: 'wlan-service ssid "Branch-Office-Secure" wpa3'
      },
      {
        id: 'sc-pc',
        name: 'Staff Desktop Computer',
        category: 'Endpoint Device',
        layerZ: 3,
        posX: 30,
        posY: 94,
        powerState: 'active',
        modelExample: 'Office PC (Cat6 Copper)',
        portsUsed: 'Gigabit Ethernet',
        mediumIn: 'Cat6 Patch Lead',
        mediumOut: 'Office Workstation',
        deploymentRole: 'Wired business workstation connected directly to all-in-one terminal.',
        howToDeploy: 'Plug into GE Port 1 of terminal.',
        cliCommandSample: 'DHCP IP: 192.168.1.15'
      },
      {
        id: 'sc-phone',
        name: 'Reception IP Phone',
        category: 'Endpoint Device',
        layerZ: 3,
        posX: 70,
        posY: 94,
        powerState: 'active',
        modelExample: 'Front Desk Telephony',
        portsUsed: 'VoIP SIP Port',
        mediumIn: 'Cat6 Patch Lead',
        mediumOut: 'Voice Audio',
        deploymentRole: 'Reception desk telephone for inbound customer calls.',
        howToDeploy: 'Plug into GE Port 2; registers with cloud PBX.',
        cliCommandSample: 'SIP Extension 101 Registered'
      }
    ],
    links: [
      { fromId: 'sc-olt', toId: 'sc-splitter', cableType: 'Fiber Feeder', color: '#3b82f6', signalType: 'Single 10G PON Strand' },
      { fromId: 'sc-splitter', toId: 'sc-onu', cableType: 'Fiber Drop', color: '#10b981', signalType: 'Indoor Drop Fiber' },
      { fromId: 'sc-onu', toId: 'sc-pc', cableType: 'Copper Ethernet', color: '#3b82f6', signalType: '1 Gbps Data' },
      { fromId: 'sc-onu', toId: 'sc-phone', cableType: 'Copper Ethernet', color: '#f59e0b', signalType: 'SIP Voice' }
    ],
    stages: [
      {
        stageNumber: 1,
        title: '1U Pizza-Box OLT Rack Mounting & ISP Hookup',
        duration: 'Day 1–2',
        focusNodes: ['sc-olt'],
        protocol: 'Mount 1U OLT in existing small server cabinet; configure single management IP and default route.',
        acceptanceTest: 'Verify OLT web GUI access; confirm GPON/XGS-PON laser activation.'
      },
      {
        stageNumber: 2,
        title: 'Single Riser Splitter Box Mounting & Drop Pulling',
        duration: 'Day 3–5',
        focusNodes: ['sc-splitter'],
        protocol: 'Mount single 1:16 splitter in central stairwell; pull pre-connectorized drop cables to offices.',
        acceptanceTest: 'Check optical power at all 16 office outlets (Target: -17 dBm).'
      },
      {
        stageNumber: 3,
        title: 'All-in-One Wi-Fi ONUs Turn-Up & Handover',
        duration: 'Day 6–7',
        focusNodes: ['sc-onu', 'sc-pc', 'sc-phone'],
        protocol: 'Plug in all-in-one wireless ONUs in offices; configure unified Wi-Fi SSID; connect PCs and phones.',
        acceptanceTest: 'Perform speed test (> 850 Mbps); verify turn-key operation achieved within one single week.'
      }
    ]
  },

  building: {
    name: 'Multi-Floor Academic Building (Riser Focus)',
    subtitle: 'Basement ODF, Vertical ELV Conduit Shaft, Floors 1–5 Passive Splitters & Horizontal Drop Channels',
    icon: Layers,
    accentColor: 'teal',
    imageUrl: '/src/assets/images/building_riser_net_1791279254376.jpg',
    nodes: [
      {
        id: 'b-basement',
        name: 'Basement Building Entrance Facility (BEF)',
        category: 'Backbone Feeder',
        layerZ: 0,
        posX: 50,
        posY: 15,
        powerState: 'passive',
        modelExample: 'Wall-Mount Entrance Box with Splice Trays',
        portsUsed: 'Camp wide Feeder In, Vertical Riser Out',
        mediumIn: 'Campus Underground Feeder Cable',
        mediumOut: 'Vertical 24-Core Riser Fiber Cable',
        deploymentRole: 'Building entry point transitioning outdoor armored fiber to flame-retardant LSZH riser cable.',
        howToDeploy: 'Mount in basement telecom utility room; ground armor jacket to building structural earth.',
        cliCommandSample: '# Passive transition point: 0 Watts'
      },
      {
        id: 'b-floor1',
        name: 'Floor 1 Splitter Box (Classrooms)',
        category: 'Passive ODN',
        layerZ: 1,
        posX: 50,
        posY: 32,
        powerState: 'passive',
        modelExample: 'Floor ELV Riser ODB (1:16 Splitter)',
        portsUsed: '1 In -> 16 Out',
        mediumIn: 'Riser Fiber Core 1',
        mediumOut: '16x Horizontal Drop Fibers',
        deploymentRole: 'Feeds 16 lecture hall podiums and hallway access points on Floor 1.',
        howToDeploy: 'Mount inside vertical ELV shaft cupboard; unpowered and completely silent.',
        cliCommandSample: '# Replaces 1x 48-port active switch and rack'
      },
      {
        id: 'b-floor3',
        name: 'Floor 3 Splitter Box (Faculty Offices)',
        category: 'Passive ODN',
        layerZ: 2,
        posX: 50,
        posY: 52,
        powerState: 'passive',
        modelExample: 'Floor ELV Riser ODB (1:16 Splitter)',
        portsUsed: '1 In -> 16 Out',
        mediumIn: 'Riser Fiber Core 3',
        mediumOut: '16x Horizontal Drop Fibers',
        deploymentRole: 'Feeds 16 professor office wall boxes on Floor 3.',
        howToDeploy: 'Snap into DIN rail inside floor electrical riser cabinet.',
        cliCommandSample: '# Saves 6 m² floor space (converted to office)'
      },
      {
        id: 'b-floor5',
        name: 'Floor 5 Splitter Box (Dean & Admin)',
        category: 'Passive ODN',
        layerZ: 3,
        posX: 50,
        posY: 72,
        powerState: 'passive',
        modelExample: 'Floor ELV Riser ODB (1:16 Splitter)',
        portsUsed: '1 In -> 16 Out',
        mediumIn: 'Riser Fiber Core 5',
        mediumOut: '16x Horizontal Drop Fibers',
        deploymentRole: 'Feeds executive dean suite and conference room on Floor 5.',
        howToDeploy: 'Top of vertical riser shaft; terminate end of riser cable.',
        cliCommandSample: '# Optical headroom: +6.4 dB margin'
      },
      {
        id: 'b-onu-dean',
        name: 'Dean Suite Panel ONU (86-Box)',
        category: 'Edge ONU',
        layerZ: 4,
        posX: 30,
        posY: 90,
        powerState: 'active',
        modelExample: 'Flush Wall-Box Panel ONU (4x GE)',
        portsUsed: '1x SC/APC In, 4x GE Out',
        mediumIn: 'G.657 Bend-Insensitive Drop',
        mediumOut: 'Cat6 to Dean PC & Video Bar',
        deploymentRole: 'Executive desk terminal with full Gigabit speed and PoE support.',
        howToDeploy: 'Flush mount into 86-type electrical box.',
        cliCommandSample: 'ont-lineprofile xgpon profile-id 20'
      },
      {
        id: 'b-wifi-f5',
        name: 'Floor 5 Wi-Fi 7 Corridor AP',
        category: 'Endpoint Device',
        layerZ: 5,
        posX: 70,
        posY: 90,
        powerState: 'active',
        modelExample: 'Corridor Wireless AP (PoE Powered)',
        portsUsed: 'PoE+ RJ-45 Port',
        mediumIn: 'Cat6A Copper from Zone ONU',
        mediumOut: 'Wireless Radio (320MHz Band)',
        deploymentRole: 'Provides seamless wireless coverage across Floor 5 executive corridor.',
        howToDeploy: 'Ceiling mount; powered by PoE from local ONU.',
        cliCommandSample: 'SSID: "Campus-Faculty-5G"'
      }
    ],
    links: [
      { fromId: 'b-basement', toId: 'b-floor1', cableType: 'Fiber Feeder', color: '#14b8a6', signalType: 'Vertical LSZH Riser Cable' },
      { fromId: 'b-floor1', toId: 'b-floor3', cableType: 'Fiber Feeder', color: '#14b8a6', signalType: 'Vertical LSZH Riser Cable' },
      { fromId: 'b-floor3', toId: 'b-floor5', cableType: 'Fiber Feeder', color: '#14b8a6', signalType: 'Vertical LSZH Riser Cable' },
      { fromId: 'b-floor5', toId: 'b-onu-dean', cableType: 'Fiber Drop', color: '#10b981', signalType: 'Ceiling Drop Fiber' },
      { fromId: 'b-floor5', toId: 'b-wifi-f5', cableType: 'Copper PoE++', color: '#ec4899', signalType: 'Drop to AP + PoE' }
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Vertical Riser Shaft Pathway Clearing',
        duration: 'Week 1–2',
        focusNodes: ['b-basement', 'b-floor1', 'b-floor3', 'b-floor5'],
        protocol: 'Inspect vertical riser conduits; pull 24-core flame-retardant LSZH riser cable from basement to Floor 5.',
        acceptanceTest: 'Ensure firestop penetrations comply with building fire code after pulling.'
      },
      {
        stageNumber: 2,
        title: 'Floor Splitter Box Fusion Splicing',
        duration: 'Week 3–4',
        focusNodes: ['b-floor1', 'b-floor3', 'b-floor5'],
        protocol: 'Install unpowered ODB boxes on Floors 1, 3, and 5; splice dedicated fiber cores into 1:16 PLC splitters.',
        acceptanceTest: 'Confirm optical insertion loss < 14.2 dB across all splitter ports.'
      },
      {
        stageNumber: 3,
        title: 'Horizontal Drop Pulling & Panel ONU Turn-Up',
        duration: 'Week 5–6',
        focusNodes: ['b-onu-dean', 'b-wifi-f5'],
        protocol: 'Pull bend-insensitive G.657 drop fibers through hallway ceilings into wall boxes; mount panel ONUs.',
        acceptanceTest: 'Confirm Dean PC and corridor Wi-Fi 7 AP achieve full wire-speed connectivity.'
      }
    ]
  },

  office: {
    name: 'Corporate Enterprise HQ (Executive Floors)',
    subtitle: 'Hot-Desking Panel ONUs, Teams/Zoom Video Bars, Dual-Homed Redundancy & Raised-Floor Routing',
    icon: Briefcase,
    accentColor: 'indigo',
    imageUrl: '/src/assets/images/corporate_office_net_1791279273571.jpg',
    nodes: [
      {
        id: 'o-core',
        name: 'HQ Enterprise Datacenter Core',
        category: 'Core/Security',
        layerZ: 0,
        posX: 25,
        posY: 18,
        powerState: 'active',
        modelExample: 'Dual Core Switch Fabric',
        portsUsed: '100G LACP Links to OLT',
        mediumIn: 'Enterprise Cloud ExpressRoute',
        mediumOut: '100GE to Enterprise OLT',
        deploymentRole: 'Routes corporate SaaS traffic, Zoom QoS priority, and Active Directory authentication.',
        howToDeploy: 'HQ Server Room with N+1 UPS power.',
        cliCommandSample: 'vlan batch 10 20 50 60; dscp af41 priority'
      },
      {
        id: 'o-olt',
        name: 'Enterprise 10G OLT (AES-128 Encrypted)',
        category: 'Headend OLT',
        layerZ: 0,
        posX: 75,
        posY: 18,
        powerState: 'active',
        modelExample: 'Huawei EA5800 10G SFP+ Chassis',
        portsUsed: 'XGS-PON Ports with AES-128',
        mediumIn: '100GE from Core',
        mediumOut: 'LC/APC Pigtails to ODF',
        deploymentRole: 'Hardware encryption on all downstream optical frames for corporate confidential data protection.',
        howToDeploy: 'HQ Server Rack with dual feeds.',
        cliCommandSample: 'ont-encryption 1 1 aes enable'
      },
      {
        id: 'o-splitter',
        name: 'Ceiling Plenum 1:16 Splitter',
        category: 'Passive ODN',
        layerZ: 1,
        posX: 50,
        posY: 50,
        powerState: 'passive',
        modelExample: 'Plenum-Rated Metal Splitter Box',
        portsUsed: '1 In -> 16 Out',
        mediumIn: 'Riser Feeder Fiber',
        mediumOut: 'Under-Floor Raised Drops',
        deploymentRole: 'Hidden inside ceiling plenum or under raised access flooring (0 Watts, zero noise).',
        howToDeploy: 'Mount in acoustic ceiling space; flame-retardant metal casing.',
        cliCommandSample: '# 0 Watts power; zero heat generated in office ceiling'
      },
      {
        id: 'o-onu-desk',
        name: 'Hot-Desking Under-Desk Panel ONU',
        category: 'Edge ONU',
        layerZ: 2,
        posX: 30,
        posY: 80,
        powerState: 'active',
        modelExample: 'OptiXstar P871E Panel ONU (PoE+)',
        portsUsed: '4x GE Ethernet + PoE',
        mediumIn: 'Raised Floor G.657 Drop Fiber',
        mediumOut: 'Cat6 to Laptop Dock & Desk Phone',
        deploymentRole: 'Provides Gigabit connectivity and 30W PoE power to executive hot-desking station.',
        howToDeploy: 'Flush mount inside modular desk utility box.',
        cliCommandSample: 'port vlan eth 1 translation 20 user-vlan 20'
      },
      {
        id: 'o-onu-conf',
        name: 'Boardroom Video Conference ONU',
        category: 'Edge ONU',
        layerZ: 2,
        posX: 70,
        posY: 80,
        powerState: 'active',
        modelExample: 'Multi-Gigabit Zone ONU (PoE++)',
        portsUsed: '2.5GE Ports with 802.3bt 60W PoE',
        mediumIn: 'Raised Floor G.657 Drop Fiber',
        mediumOut: 'Cat6A to Zoom Video Bar & Touch Panel',
        deploymentRole: 'Powers 4K video conferencing camera and ceiling microphone arrays without power cords.',
        howToDeploy: 'Conceal inside boardroom credenza under video display.',
        cliCommandSample: 'ont-port eth 1 poe-mode 802.3bt-60W'
      },
      {
        id: 'o-videobar',
        name: '4K Zoom/Teams Boardroom Video Bar',
        category: 'Endpoint Device',
        layerZ: 3,
        posX: 70,
        posY: 94,
        powerState: 'active',
        modelExample: 'All-in-One 4K Camera + Mic Array',
        portsUsed: '2.5GE PoE++ Input',
        mediumIn: 'Cat6A Copper (60W PoE)',
        mediumOut: 'Ultra-HD Video Stream',
        deploymentRole: 'Enterprise executive board meeting video collaboration.',
        howToDeploy: 'Mount below main display; draws power and high-speed data from Boardroom ONU.',
        cliCommandSample: 'SIP / H.323 Video Stream: 4K 60fps Ultra-HD'
      }
    ],
    links: [
      { fromId: 'o-core', toId: 'o-olt', cableType: 'LACP Trunk', color: '#6366f1', signalType: '100GE Data Fabric' },
      { fromId: 'o-olt', toId: 'o-splitter', cableType: 'Fiber Feeder', color: '#f59e0b', signalType: 'AES-128 Encrypted PON' },
      { fromId: 'o-splitter', toId: 'o-onu-desk', cableType: 'Fiber Drop', color: '#10b981', signalType: 'Raised Floor Drop Fiber' },
      { fromId: 'o-splitter', toId: 'o-onu-conf', cableType: 'Fiber Drop', color: '#10b981', signalType: 'Raised Floor Drop Fiber' },
      { fromId: 'o-onu-conf', toId: 'o-videobar', cableType: 'Copper PoE++', color: '#ec4899', signalType: '2.5GE Data + 60W PoE++' }
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'HQ Server Room OLT & AES-128 Crypto Setup',
        duration: 'Week 1–2',
        focusNodes: ['o-core', 'o-olt'],
        protocol: 'Install 10G OLT in HQ server room; activate downstream AES-128 encryption key rotation.',
        acceptanceTest: 'Capture optical packets with protocol analyzer; verify all downstream payload is encrypted.'
      },
      {
        stageNumber: 2,
        title: 'Raised Flooring Optical Drop Cable Routing',
        duration: 'Week 3–4',
        focusNodes: ['o-splitter', 'o-onu-desk', 'o-onu-conf'],
        protocol: 'Run bend-insensitive drops under modular raised floor tiles directly to desk cable trays.',
        acceptanceTest: 'Confirm zero micro-bending loss even when floor tiles are replaced and walked on.'
      },
      {
        stageNumber: 3,
        title: 'Boardroom Video Bar & Hot-Desking Verification',
        duration: 'Week 5–6',
        focusNodes: ['o-videobar'],
        protocol: 'Turn on 60W PoE++ to video bar; test 4K Teams video conference with multiple participants.',
        acceptanceTest: 'Verify zero frame drop during peak video calls; confirm clean desk aesthetic achieved.'
      }
    ]
  }
};

export interface NetworkDeployment3DGraphProps {
  initialEnvKey?: EnvironmentKey;
  initialVideoTour?: boolean;
}

export const NetworkDeployment3DGraph: React.FC<NetworkDeployment3DGraphProps> = ({
  initialEnvKey = 'university',
  initialVideoTour = false
}) => {
  const [activeEnvKey, setActiveEnvKey] = useState<EnvironmentKey>(initialEnvKey);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('u-olt');
  const [viewAngle, setViewAngle] = useState<'3d-isometric' | '2d-blueprint' | 'front-riser'>('3d-isometric');
  const [pitchAngle, setPitchAngle] = useState<number>(24);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isLaserSimulating, setIsLaserSimulating] = useState<boolean>(true);
  const [laserSpeed, setLaserSpeed] = useState<'normal' | 'fast' | 'slow'>('normal');
  const [activeStageNumber, setActiveStageNumber] = useState<number>(1);
  const [tracedEndpointId, setTracedEndpointId] = useState<string | null>(null);
  const [vendorSyntax, setVendorSyntax] = useState<'huawei' | 'cisco' | 'zte'>('huawei');
  const [copiedCli, setCopiedCli] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectorTab, setInspectorTab] = useState<'cli' | 'ports' | 'deployment' | 'troubleshoot' | 'comparison'>('cli');
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState<boolean>(false);

  // 3D Cinematic Video Tour State
  const [isVideoTourMode, setIsVideoTourMode] = useState<boolean>(initialVideoTour);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(initialVideoTour);
  const [videoSceneIndex, setVideoSceneIndex] = useState<number>(0);
  const [videoPlaybackSpeed, setVideoPlaybackSpeed] = useState<number>(1);
  const [isVideoAudioMuted, setIsVideoAudioMuted] = useState<boolean>(false);

  React.useEffect(() => {
    if (initialEnvKey) {
      setActiveEnvKey(initialEnvKey);
      const first = ENVIRONMENTS_DATA[initialEnvKey]?.nodes[0];
      if (first) setSelectedNodeId(first.id);
    }
    if (initialVideoTour) {
      setIsVideoTourMode(true);
      setIsVideoPlaying(true);
    }
  }, [initialEnvKey, initialVideoTour]);

  const env = ENVIRONMENTS_DATA[activeEnvKey] || ENVIRONMENTS_DATA.university;
  const selectedNode = env.nodes.find(n => n.id === selectedNodeId) || env.nodes[0];
  const activeStage = env.stages.find(s => s.stageNumber === activeStageNumber) || env.stages[0];

  // 6-Scene Cinematic Video Tour based on current environment's equipment hierarchy
  const videoTourScenes = useMemo(() => {
    const nodes = env.nodes;
    const coreNode = nodes.find(n => n.category === 'Core/Security') || nodes[0];
    const oltNode = nodes.find(n => n.category === 'Headend OLT') || nodes[1] || nodes[0];
    const feederNode = nodes.find(n => n.category === 'Backbone Feeder') || nodes[2] || oltNode;
    const splitterNode = nodes.find(n => n.category === 'Passive ODN') || nodes[3] || feederNode;
    const onuNode = nodes.find(n => n.category === 'Edge ONU') || nodes[4] || splitterNode;
    const endpointNode = nodes.find(n => n.category === 'Endpoint Device') || nodes[nodes.length - 1] || onuNode;

    return [
      {
        id: 'scene-1',
        title: 'Scene 1: Central Datacenter Vault & Security Core',
        titleUrdu: 'منظر 1: سینٹرل ڈیٹا سینٹر کور اور فائر وال',
        focusNodeId: coreNode.id,
        cameraTilt: 20,
        cameraZoom: 1.25,
        cameraAngle: 'Datacenter Spine Orbit (40G/100G Fabric)',
        timestamp: '00:00 - 00:06',
        opticalPower: 'Layer 3 Wire-Speed',
        speedRating: '100 Gbps Core Trunk',
        narrationEn: `Central Data Center Spine: ${coreNode.name} aggregates traffic and enforces zero-trust security policies before traffic enters the optical distribution headend.`,
        narrationUr: `مرکزی ڈیٹا سینٹر: ${coreNode.name} تمام کیمپس ٹریفک کو 100G اسپیڈ پر پروسیس کر کے آپٹیکل ہیڈ اینڈ کی طرف بھیجتا ہے۔`
      },
      {
        id: 'scene-2',
        title: 'Scene 2: Headend OLT Laser Modulation',
        titleUrdu: 'منظر 2: آپٹیکل لائن ٹرمینل (OLT) لیزر موڈولیشن',
        focusNodeId: oltNode.id,
        cameraTilt: 28,
        cameraZoom: 1.2,
        cameraAngle: 'Headend Chassis Close-up (1577nm/1270nm)',
        timestamp: '00:06 - 00:12',
        opticalPower: '+3.5 dBm Tx Power',
        speedRating: '10G XGS-PON SFP+',
        narrationEn: `Headend OLT Chassis: ${oltNode.name} modulates laser light at 1577nm downstream and dynamically assigns DBA bandwidth time slots for up to 1,024 user terminals.`,
        narrationUr: `ہیڈ اینڈ OLT: ${oltNode.name} 1577nm طولِ موج پر لیزر بیم خارج کرتا ہے اور تمام یوزرز کے لیے ٹائم سلاٹس شیڈول کرتا ہے۔`
      },
      {
        id: 'scene-3',
        title: 'Scene 3: Outside Plant Armored Feeder Backbone',
        titleUrdu: 'منظر 3: آؤٹ ڈور آرمرڈ فیڈر کیبل بیک بون',
        focusNodeId: feederNode.id,
        cameraTilt: 36,
        cameraZoom: 1.05,
        cameraAngle: 'Underground Trench & Manhole Pathway',
        timestamp: '00:12 - 00:18',
        opticalPower: '-0.35 dB/km Attenuation',
        speedRating: '48-Core Single-Mode Glass',
        narrationEn: `Outside Plant Trunk: ${feederNode.name} carries light pulses across campus underground ducts over 20 kilometers with zero electronic repeaters and zero fire risk.`,
        narrationUr: `زیرِ زمین فیڈر کیبل: ${feederNode.name} بنا کسی بجلی یا ریپیٹر کے 20 کلومیٹر تک ڈیٹا بیم کو محفوظ طریقے سے کیمپس میں پھیلاتا ہے۔`
      },
      {
        id: 'scene-4',
        title: 'Scene 4: Vertical Riser Passive Optical Splitters',
        titleUrdu: 'منظر 4: عمودی بلڈنگ رائزر اور 0-واٹ اسپلٹرز',
        focusNodeId: splitterNode.id,
        cameraTilt: 30,
        cameraZoom: 1.15,
        cameraAngle: 'Floor ELV Shaft & Riser Cupboard',
        timestamp: '00:18 - 00:24',
        opticalPower: '-13.8 dB Split Loss (0 Watts)',
        speedRating: '1:16 PLC Passive Split',
        narrationEn: `Floor Distribution Riser: ${splitterNode.name} splits the single incoming optical beam into 16 separate office drops with 0 Watts power, generating zero heat in corridors.`,
        narrationUr: `بلڈنگ رائزر اسپلٹر: ${splitterNode.name} بغیر کسی بجلی کے 0 واٹ پر لیزر بیم کو 16 الگ الگ کمروں کے لیے تقسیم کرتا ہے۔`
      },
      {
        id: 'scene-5',
        title: 'Scene 5: Edge Optical Network Unit (Panel ONU)',
        titleUrdu: 'منظر 5: یوزر ڈیسک پینل ONU اور PoE++',
        focusNodeId: onuNode.id,
        cameraTilt: 25,
        cameraZoom: 1.25,
        cameraAngle: 'Office Wall-Box 86-Type Flush Mount',
        timestamp: '00:24 - 00:30',
        opticalPower: '-18.2 dBm Rx Sensitivity',
        speedRating: '4x Gigabit LAN + PoE++',
        narrationEn: `Office Terminal: ${onuNode.name} terminates bend-insensitive G.657 glass fiber into user desks, delivering Gigabit Ethernet and PoE power with silent fanless operation.`,
        narrationUr: `ڈیسک ٹرمینل: ${onuNode.name} دیوار کے ساکٹ میں فٹ ہو کر فائبر کو گیگابٹ نیٹ ورک اور PoE بجلی میں تبدیل کرتا ہے۔`
      },
      {
        id: 'scene-6',
        title: 'Scene 6: Multi-Service User Endpoints in Action',
        titleUrdu: 'منظر 6: اینڈ پوائنٹ ڈیوائسز (Wi-Fi 7، کیمرے، پی سی)',
        focusNodeId: endpointNode.id,
        cameraTilt: 20,
        cameraZoom: 1.3,
        cameraAngle: 'Desktop & Ceiling Access Point View',
        timestamp: '00:30 - 00:36',
        opticalPower: 'Wire-Speed Non-Blocking',
        speedRating: '1G / 2.5G / 10G Delivery',
        narrationEn: `Service Handover: ${endpointNode.name} receives high-speed connectivity with sub-millisecond latency, completing the end-to-end all-optical deployment lifecycle.`,
        narrationUr: `سروس ڈیلیوری: ${endpointNode.name} بغیر کسی تعطل کے تیز رفتار ڈیٹا حاصل کر رہی ہے اور روایتی سوئچ رومز مکمل طور پر ختم ہو چکے ہیں۔`
      }
    ];
  }, [env]);

  const currentScene = videoTourScenes[videoSceneIndex] || videoTourScenes[0];

  // Web Audio synthesizer for ambient sci-fi telemetry beeps during 3D video tour
  const playLaserBeep = (freq = 880) => {
    if (isVideoAudioMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const handleSelectScene = (sceneIdx: number) => {
    setVideoSceneIndex(sceneIdx);
    const targetScene = videoTourScenes[sceneIdx];
    if (targetScene) {
      setSelectedNodeId(targetScene.focusNodeId);
      setPitchAngle(targetScene.cameraTilt);
      setZoomLevel(targetScene.cameraZoom);
      playLaserBeep(650 + sceneIdx * 80);
    }
  };

  // Video Tour playback timer
  React.useEffect(() => {
    let interval: any = null;
    if (isVideoPlaying && isVideoTourMode) {
      interval = setInterval(() => {
        setVideoSceneIndex(prev => {
          const next = (prev + 1) % videoTourScenes.length;
          const currentScene = videoTourScenes[next];
          if (currentScene) {
            setSelectedNodeId(currentScene.focusNodeId);
            setPitchAngle(currentScene.cameraTilt);
            setZoomLevel(currentScene.cameraZoom);
            playLaserBeep(700 + next * 70);
          }
          return next;
        });
      }, Math.round(5500 / videoPlaybackSpeed));
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVideoPlaying, isVideoTourMode, videoTourScenes, videoPlaybackSpeed, isVideoAudioMuted]);

  const handleStartVideoTour = (sceneIdx: number = 0) => {
    setIsVideoTourMode(true);
    setIsVideoPlaying(true);
    setViewAngle('3d-isometric');
    handleSelectScene(sceneIdx);
    document.getElementById('network-3d-interactive-canvas')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExitVideoTour = () => {
    setIsVideoTourMode(false);
    setIsVideoPlaying(false);
    setPitchAngle(24);
    setZoomLevel(1.0);
  };

  const handleToggleVideoPlay = () => {
    setIsVideoPlaying(prev => !prev);
    playLaserBeep(880);
  };

  const handleNextVideoScene = () => {
    const next = (videoSceneIndex + 1) % videoTourScenes.length;
    handleSelectScene(next);
  };

  const handlePrevVideoScene = () => {
    const prev = (videoSceneIndex - 1 + videoTourScenes.length) % videoTourScenes.length;
    handleSelectScene(prev);
  };

  // Filter nodes if search query present
  const filteredNodes = useMemo(() => {
    if (!searchQuery.trim()) return env.nodes;
    const q = searchQuery.toLowerCase();
    return env.nodes.filter(
      n =>
        n.name.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q) ||
        n.modelExample.toLowerCase().includes(q) ||
        n.portsUsed.toLowerCase().includes(q) ||
        n.deploymentRole.toLowerCase().includes(q)
    );
  }, [env, searchQuery]);

  // List of endpoints in current environment for pathway tracing
  const endpointNodes = useMemo(() => {
    return env.nodes.filter(n => n.category === 'Endpoint Device');
  }, [env]);

  // Calculate unbroken pathway from Core/Firewall down to tracedEndpointId
  const pathwayInfo = useMemo(() => {
    if (!tracedEndpointId) return null;
    const pathNodeIds: string[] = [];
    const pathLinkIndices: number[] = [];
    let currentId: string | null = tracedEndpointId;
    pathNodeIds.unshift(currentId);

    let safety = 0;
    while (currentId && safety < 12) {
      safety++;
      const inLinkIdx = env.links.findIndex(l => l.toId === currentId);
      if (inLinkIdx === -1) break;
      pathLinkIndices.unshift(inLinkIdx);
      const parentId = env.links[inLinkIdx].fromId;
      pathNodeIds.unshift(parentId);
      currentId = parentId;
    }

    const targetNode = env.nodes.find(n => n.id === tracedEndpointId);
    return {
      nodeIds: pathNodeIds,
      linkIndices: pathLinkIndices,
      targetNode
    };
  }, [tracedEndpointId, env]);

  const handleCopyCli = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handlePrintBlueprint = () => {
    window.print();
  };

  const handleExportSvg = () => {
    const svgElem = document.getElementById('network-3d-svg-canvas');
    if (!svgElem) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElem);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeEnvKey}-all-optical-3d-topology.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Vendor CLI generator fallback if specific syntax not set
  const getVendorCliCode = (node: typeof selectedNode, vendor: 'huawei' | 'cisco' | 'zte') => {
    if (vendor === 'cisco' && node.ciscoCli) return node.ciscoCli;
    if (vendor === 'zte' && node.zteCli) return node.zteCli;
    if (vendor === 'huawei') return node.cliCommandSample;
    
    // Auto-formatted standard multi-vendor commands
    if (vendor === 'cisco') {
      return `! Cisco IOS-XE Architecture Configuration: ${node.name}
hostname Campus-Edge-01
! Interface definition
interface TenGigabitEthernet1/0/1
 description Uplink to Headend OLT / Distribution
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,50,60,90
 no shutdown
! QoS Expedited Forwarding
class-map match-any VOICE_TELEMETRY
 match ip dscp ef
policy-map ENTERPRISE_EDGE_QOS
 class VOICE_TELEMETRY
  priority level 1
! Verification benchmark
# show interfaces status
# show mac address-table
# show platform hardware optical-transceiver`;
    }

    if (vendor === 'zte') {
      return `! ZTE ZXROS All-Optical Commissioning: ${node.name}
configure terminal
pon-onu-mng gpon-onu_1/1/1:1
 service 1 gemport 1 vlan 20
 tcont 1 profile 10G_DEFAULT
! Flow configuration
interface gpon-olt_1/1/1
 onu 1 type ZTE-F670 sn ${node.id.toUpperCase()}001
! Benchmark verification
# show gpon onu detail-info gpon-onu_1/1/1:1
# show gpon onu optical-power gpon-onu_1/1/1:1`;
    }

    return node.cliCommandSample;
  };

  return (
    <div className="space-y-8">
      {/* Institutional Title & Standard Page Setting Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-1.5">
            <Radio className="w-3.5 h-3.5" />
            <span>Interactive 3D Network Connectivity & Deployment Engine (2026 Reference)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>End-to-End Network Deployment & 3D Connectivity Graph</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl">
            Explore complete physical and optical connectivity from the <strong>Central Data Center Headend</strong> down to user endpoints across <strong>University, Hospital, Smart Industry, Large Campus, Small Campus, Multi-Floor Building, and Corporate Office</strong>.
          </p>
        </div>

        {/* Global Standard Actions: Print Blueprint, Export SVG */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportSvg}
            title="Export 3D network vector schematic as SVG"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export SVG</span>
          </button>
          <button
            onClick={handlePrintBlueprint}
            title="Print standard engineering schematic"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-teal-400" />
            <span>Print Blueprint</span>
          </button>
        </div>
      </div>

      {/* Visual Enterprise Network 3D Architecture Gallery (Click Any Image to Launch Full 3D Layout) */}
      <div className="space-y-3 p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Enterprise Network 3D Visual Architecture Showcase (Click Any Image to Launch Live 3D Layout)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any environment below to immediately project its end-to-end 3D physical and optical topology, equipment placement, and production CLI code.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleStartVideoTour(0)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-rose-950/40 cursor-pointer transition-all"
            >
              <Film className="w-3.5 h-3.5" />
              <span>🎬 3D Video View Tour</span>
            </button>
            <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-lg">
              Active: <strong>{env.name}</strong>
            </span>
          </div>
        </div>

        {/* 7-Card Grid with Generated Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {(
            [
              { key: 'university', label: 'University Campus', icon: Building, tag: '10 Faculties · 48C Feeder' },
              { key: 'hospital', label: 'Hospital Healthcare', icon: Stethoscope, tag: 'Zero-EMI · MRI PACS' },
              { key: 'industry', label: 'Smart Industry', icon: Factory, tag: 'Rugged OT · SCADA/PLCs' },
              { key: 'large-campus', label: 'Large Campus (5K+)', icon: Building, tag: 'Dual OLTs · 2:32 Split' },
              { key: 'small-campus', label: 'Small Campus / SME', icon: Briefcase, tag: '1U OLT · Wi-Fi ONUs' },
              { key: 'building', label: 'Multi-Floor Building', icon: Layers, tag: 'Basement BEF · Riser' },
              { key: 'office', label: 'Corporate Office HQ', icon: Briefcase, tag: 'Under-Desk · Teams 4K' }
            ] as const
          ).map(item => {
            const isSelected = activeEnvKey === item.key;
            const data = ENVIRONMENTS_DATA[item.key];
            const IconComponent = item.icon;

            return (
              <div
                key={item.key}
                onClick={() => {
                  setActiveEnvKey(item.key);
                  const firstNode = data.nodes[0];
                  if (firstNode) setSelectedNodeId(firstNode.id);
                  setActiveStageNumber(1);
                  setTracedEndpointId(null);
                  document.getElementById('network-3d-interactive-canvas')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col ${
                  isSelected
                    ? 'border-cyan-400 ring-2 ring-cyan-400 shadow-xl shadow-cyan-950/80 scale-[1.02] bg-slate-900'
                    : 'border-slate-800 bg-slate-950/80 hover:border-slate-600 hover:scale-[1.01]'
                }`}
              >
                {/* Image Container with Aspect Ratio */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Active Indicator Badge */}
                  {isSelected ? (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-bold flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                      <span>3D Live</span>
                    </div>
                  ) : (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono group-hover:bg-cyan-500/20 transition-colors">
                      Open 3D
                    </div>
                  )}

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px]">
                    <span className="font-bold text-white truncate max-w-[110px]">{item.label}</span>
                    <span className="text-cyan-300 font-mono text-[9px] bg-slate-950/80 px-1.5 py-0.5 rounded">
                      {data.nodes.length} Eq.
                    </span>
                  </div>
                </div>

                {/* Subtitle / Spec & Quick Action */}
                <div className="p-2 text-[10px] text-slate-300 flex items-center justify-between gap-1 border-t border-slate-800/80 bg-slate-950/70">
                  <span className="truncate text-slate-400">{item.tag}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveEnvKey(item.key);
                        handleStartVideoTour(0);
                      }}
                      title={`Play 3D Video Tour for ${data.name}`}
                      className="px-2 py-0.5 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-mono text-[9px] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Film className="w-2.5 h-2.5" />
                      <span>Video</span>
                    </button>
                    <ChevronRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-Environment Tab Rail */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Select Deployment Environment Profile:
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            7 Standard Scenarios
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {(
            [
              { key: 'university', label: 'University Campus', icon: Building, tag: '10 Faculties' },
              { key: 'hospital', label: 'Hospital & Healthcare', icon: Stethoscope, tag: 'Zero-EMI PACS' },
              { key: 'industry', label: 'Smart Industry', icon: Factory, tag: 'Rugged OT/SCADA' },
              { key: 'large-campus', label: 'Large Campus', icon: Building, tag: '5,000+ Users' },
              { key: 'small-campus', label: 'Small Campus / SME', icon: Briefcase, tag: '1U Pizza-Box' },
              { key: 'building', label: 'Multi-Floor Building', icon: Layers, tag: 'Riser Shafts' },
              { key: 'office', label: 'Corporate Office HQ', icon: Briefcase, tag: 'Hot-Desk / Teams' }
            ] as const
          ).map(item => {
            const isSelected = activeEnvKey === item.key;
            const IconComponent = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveEnvKey(item.key);
                  const firstNode = ENVIRONMENTS_DATA[item.key].nodes[0];
                  if (firstNode) setSelectedNodeId(firstNode.id);
                  setActiveStageNumber(1);
                  setTracedEndpointId(null);
                }}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-950/40 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`} />
                <span className="text-[11px] leading-tight block truncate w-full">{item.label}</span>
                <span className="text-[9px] text-slate-400 font-mono truncate w-full">{item.tag}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Environment Header Info & Search Filter */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-sm font-bold text-white">{env.name}</h3>
          </div>
          <p className="text-slate-400 text-[11px]">{env.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Equipment Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter equipment (e.g., OLT, ONU, Wi-Fi, Camera)..."
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 w-52 sm:w-64"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                ×
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <span>Nodes: <strong className="text-cyan-300">{env.nodes.length}</strong></span>
            <span>·</span>
            <span>Links: <strong className="text-emerald-300">{env.links.length}</strong></span>
          </div>
        </div>
      </div>

      {/* END-TO-END PATHWAY TRACER (Datacenter to Endpoint Light Flow) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/30 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Datacenter-to-Endpoint Optical Pathway Tracer:
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Select an endpoint to trace unbroken light flow & optical dBm budget from DC Headend:
          </span>
        </div>

        {/* Endpoint Selector Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setTracedEndpointId(null)}
            className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all border ${
              tracedEndpointId === null
                ? 'bg-slate-800 text-white border-slate-600'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            Show All Links
          </button>
          {endpointNodes.map(ep => {
            const isTraced = tracedEndpointId === ep.id;
            return (
              <button
                key={ep.id}
                onClick={() => {
                  setTracedEndpointId(ep.id);
                  setSelectedNodeId(ep.id);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all border ${
                  isTraced
                    ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-400/50'
                }`}
              >
                <span>{ep.name}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            );
          })}
        </div>

        {/* Pathway Signal Step Metrics (When active) */}
        {pathwayInfo && (
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-amber-500/30 text-xs space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-[11px] text-amber-300 font-mono">
              <span className="font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                Active Route: Datacenter Core/Firewall → {pathwayInfo.targetNode?.name}
              </span>
              <span className="text-slate-400">Total Optical Stages: {pathwayInfo.nodeIds.length}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono">
              {pathwayInfo.nodeIds.map((nId, idx) => {
                const n = env.nodes.find(node => node.id === nId);
                if (!n) return null;
                return (
                  <React.Fragment key={nId}>
                    <button
                      onClick={() => setSelectedNodeId(n.id)}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/20 cursor-pointer"
                    >
                      {n.name}
                    </button>
                    {idx < pathwayInfo.nodeIds.length - 1 && (
                      <span className="text-amber-400 px-1 font-bold">→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[10px] text-slate-400 font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">OLT Tx Power:</span>
                <strong className="text-emerald-400 text-xs">+3.5 dBm (1577nm)</strong>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Passive Split Loss:</span>
                <strong className="text-amber-400 text-xs">-13.8 dB (1:16 PLC)</strong>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">ONU Rx Level:</span>
                <strong className="text-cyan-400 text-xs">-18.3 dBm (Optimal)</strong>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Endpoint Speed:</span>
                <strong className="text-purple-400 text-xs">Wire-Speed 1G / 2.5G</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STANDARD PAGE SETTING TOOLBAR (Camera, Zoom, Pitch, Animation) */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Perspective Selectors */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-400 font-medium mr-1 text-[11px]">View Mode:</span>
          <button
            onClick={() => {
              setViewAngle('3d-isometric');
              if (isVideoTourMode) setIsVideoTourMode(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors border ${
              viewAngle === '3d-isometric' && !isVideoTourMode
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm font-semibold'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            3D Isometric
          </button>
          <button
            onClick={() => {
              setViewAngle('2d-blueprint');
              if (isVideoTourMode) setIsVideoTourMode(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors border ${
              viewAngle === '2d-blueprint' && !isVideoTourMode
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm font-semibold'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            2D Blueprint
          </button>
          <button
            onClick={() => {
              setViewAngle('front-riser');
              if (isVideoTourMode) setIsVideoTourMode(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors border ${
              viewAngle === 'front-riser' && !isVideoTourMode
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm font-semibold'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            Vertical Riser
          </button>
          <button
            onClick={() => {
              if (isVideoTourMode) {
                handleExitVideoTour();
              } else {
                handleStartVideoTour(0);
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors border flex items-center gap-1.5 ${
              isVideoTourMode
                ? 'bg-rose-500/25 text-rose-300 border-rose-500/60 shadow-md font-bold ring-1 ring-rose-400'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-rose-400" />
            <span>3D Video View</span>
          </button>
        </div>

        {/* Pitch Slider (When in 3D) */}
        {viewAngle === '3d-isometric' && (
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>3D Tilt:</span>
            <input
              type="range"
              min="10"
              max="45"
              value={pitchAngle}
              onChange={e => setPitchAngle(Number(e.target.value))}
              className="w-24 accent-cyan-400 cursor-pointer"
            />
            <span className="font-mono text-cyan-300">{pitchAngle}°</span>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium text-[11px]">Zoom:</span>
          <button
            onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.1))}
            title="Zoom out"
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] text-slate-300 w-10 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel(prev => Math.min(1.35, prev + 0.1))}
            title="Zoom in"
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1.0)}
            title="Reset Zoom"
            className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* Laser Pulse Control & Fullscreen 3D */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsLaserSimulating(!isLaserSimulating)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors border ${
              isLaserSimulating
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            {isLaserSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLaserSimulating ? 'Pause Pulse' : 'Simulate Pulse'}</span>
          </button>

          <button
            onClick={() => setIsFullscreenModalOpen(true)}
            title="Expand into Immersive Fullscreen 3D Inspection"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/40 cursor-pointer transition-colors shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fullscreen 3D</span>
          </button>
        </div>
      </div>

      {/* 3D CINEMATIC VIDEO FLYTHROUGH PLAYER CONSOLE (When Active) */}
      {isVideoTourMode && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-rose-500/50 shadow-2xl space-y-4 animate-fadeIn">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center shrink-0">
                <Film className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                    LIVE 4K CINEMATIC 3D FLYTHROUGH VIDEO
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono">
                    {env.name}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                  {videoTourScenes[videoSceneIndex]?.title}
                </h4>
              </div>
            </div>

            {/* Right Controls: Speed, Audio, Exit */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              {/* Speed Selector */}
              <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 p-0.5 text-[11px] font-mono">
                {[0.75, 1, 1.5, 2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => setVideoPlaybackSpeed(speed)}
                    className={`px-2 py-1 rounded transition-colors ${
                      videoPlaybackSpeed === speed
                        ? 'bg-rose-500/30 text-rose-300 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Audio Synth Toggle */}
              <button
                onClick={() => setIsVideoAudioMuted(!isVideoAudioMuted)}
                title={isVideoAudioMuted ? 'Unmute Audio Synthesis' : 'Mute Audio Synthesis'}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  !isVideoAudioMuted
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                {isVideoAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Exit Video Mode */}
              <button
                onClick={handleExitVideoTour}
                title="Exit 3D Video Tour"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Exit Video</span>
              </button>
            </div>
          </div>

          {/* Transport Controls & Scene Timeline */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Playback Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrevVideoScene}
                title="Previous Scene"
                className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white cursor-pointer"
              >
                <Rewind className="w-4 h-4" />
              </button>

              <button
                onClick={handleToggleVideoPlay}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-950/50 cursor-pointer transition-colors"
              >
                {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isVideoPlaying ? 'Pause Video' : 'Resume Video'}</span>
              </button>

              <button
                onClick={handleNextVideoScene}
                title="Next Scene"
                className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white cursor-pointer"
              >
                <FastForward className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-slate-400 pl-2">
                {videoTourScenes[videoSceneIndex]?.timestamp}
              </span>
            </div>

            {/* 6-Scene Interactive Timeline Bar */}
            <div className="flex-1 max-w-2xl grid grid-cols-6 gap-1.5">
              {videoTourScenes.map((scene, sIdx) => {
                const isCurrent = videoSceneIndex === sIdx;
                const isPassed = videoSceneIndex > sIdx;
                return (
                  <button
                    key={scene.id}
                    onClick={() => handleSelectScene(sIdx)}
                    title={`${scene.title} (${scene.timestamp})`}
                    className={`group flex flex-col p-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-rose-500/25 border-rose-400 ring-1 ring-rose-400 shadow-md'
                        : isPassed
                        ? 'bg-slate-900 border-slate-700 text-slate-400'
                        : 'bg-slate-950 border-slate-800/80 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] font-mono">
                      <span className={isCurrent ? 'font-bold text-rose-300' : 'text-slate-400'}>
                        S{sIdx + 1}
                      </span>
                      <span className="text-[8px] text-slate-500">
                        {scene.timestamp.split(' - ')[0]}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          isCurrent
                            ? 'w-full bg-rose-400 animate-pulse'
                            : isPassed
                            ? 'w-full bg-cyan-400'
                            : 'w-0'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE 3D GRAPH CANVAS */}
      <div
        id="network-3d-interactive-canvas"
        className="relative p-6 sm:p-10 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl overflow-hidden select-none"
      >
        {/* Ambient Grid Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* 3D Perspective Container */}
        <div
          style={{
            transform:
              viewAngle === '3d-isometric'
                ? `perspective(1000px) rotateX(${pitchAngle}deg) scale(${zoomLevel})`
                : viewAngle === 'front-riser'
                ? `perspective(1000px) rotateY(15deg) scale(${zoomLevel})`
                : `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="relative w-full h-[540px] sm:h-[580px]"
        >
          {/* Depth Layer Banners (Indicating Vertical Hierarchy in 3D) */}
          {viewAngle === '3d-isometric' && (
            <div className="absolute inset-x-0 inset-y-0 pointer-events-none text-[9px] font-mono text-slate-600 space-y-24 pt-4">
              <div className="border-b border-slate-800/60 pb-1 flex justify-between">
                <span>LAYER 0: CENTRAL DATACENTER / HEADEND (ACTIVE)</span>
                <span>DATA CENTER VAULT</span>
              </div>
              <div className="border-b border-slate-800/60 pb-1 flex justify-between">
                <span>LAYER 1: OUTSIDE PLANT FEEDER BACKBONE (PASSIVE GLASS)</span>
                <span>UNDERGROUND CONDUITS</span>
              </div>
              <div className="border-b border-slate-800/60 pb-1 flex justify-between">
                <span>LAYER 2: FLOOR RISER DISTRIBUTION & SPLITTERS (0 WATTS)</span>
                <span>VERTICAL SHAFTS</span>
              </div>
              <div className="border-b border-slate-800/60 pb-1 flex justify-between">
                <span>LAYER 3: EDGE OPTICAL TERMINALS (PANEL ONUs)</span>
                <span>OFFICE WALL BOXES</span>
              </div>
              <div className="border-b border-slate-800/60 pb-1 flex justify-between">
                <span>LAYER 4: USER ENDPOINTS & MULTI-SERVICE DEVICES</span>
                <span>DESK & CEILING APs</span>
              </div>
            </div>
          )}

          {/* SVG Connection Lines */}
          <svg
            id="network-3d-svg-canvas"
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          >
            {env.links.map((link, lIdx) => {
              const fromNode = env.nodes.find(n => n.id === link.fromId);
              const toNode = env.nodes.find(n => n.id === link.toId);
              if (!fromNode || !toNode) return null;

              const isHighlighted =
                selectedNodeId === fromNode.id || selectedNodeId === toNode.id;
              
              const isPathwayLink = pathwayInfo?.linkIndices.includes(lIdx);

              const strokeColor = isPathwayLink
                ? '#f59e0b'
                : isHighlighted
                ? '#38bdf8'
                : link.color;

              return (
                <g key={lIdx}>
                  {/* Glowing Underline */}
                  <line
                    x1={`${fromNode.posX}%`}
                    y1={`${fromNode.posY}%`}
                    x2={`${toNode.posX}%`}
                    y2={`${toNode.posY}%`}
                    stroke={strokeColor}
                    strokeWidth={isPathwayLink ? 5 : isHighlighted ? 4 : 2}
                    strokeOpacity={isPathwayLink ? 1.0 : isHighlighted ? 0.9 : 0.4}
                  />

                  {/* Animated Light Pulse */}
                  {isLaserSimulating && (
                    <line
                      x1={`${fromNode.posX}%`}
                      y1={`${fromNode.posY}%`}
                      x2={`${toNode.posX}%`}
                      y2={`${toNode.posY}%`}
                      stroke={strokeColor}
                      strokeWidth={isPathwayLink ? 4 : isHighlighted ? 3 : 2}
                      strokeDasharray={isPathwayLink ? "10 8" : "6 14"}
                      className="animate-pulse"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Interactive Equipment Nodes */}
          {filteredNodes.map(node => {
            const isSelected = selectedNodeId === node.id;
            const isStageFocused = activeStage.focusNodes.includes(node.id);
            const isPathwayNode = pathwayInfo?.nodeIds.includes(node.id);

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                style={{
                  left: `${node.posX}%`,
                  top: `${node.posY}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isSelected ? 40 : 20 + node.layerZ
                }}
                className="absolute cursor-pointer transition-all duration-300 group"
              >
                {/* Visual Equipment Card */}
                <div
                  className={`relative p-2.5 sm:p-3 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? isVideoTourMode
                        ? 'bg-rose-500/30 border-rose-400 shadow-2xl shadow-rose-500/40 scale-110 ring-2 ring-rose-400'
                        : 'bg-cyan-500/25 border-cyan-400 shadow-xl shadow-cyan-500/30 scale-110 ring-2 ring-cyan-400'
                      : isPathwayNode
                      ? 'bg-amber-950/80 border-amber-400 shadow-lg shadow-amber-950/40 ring-1 ring-amber-400 scale-105'
                      : isStageFocused
                      ? 'bg-slate-900 border-amber-400/80 shadow-md shadow-amber-950/40'
                      : 'bg-slate-900/90 border-slate-700 hover:border-slate-500 hover:scale-105'
                  }`}
                >
                  {/* Rotating Targeting Radar Ring in Video Tour Mode */}
                  {isVideoTourMode && isSelected && (
                    <div className="absolute -inset-3 border-2 border-dashed border-rose-400 rounded-2xl animate-spin pointer-events-none" />
                  )}

                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        node.powerState === 'active'
                          ? 'bg-rose-400 animate-pulse'
                          : 'bg-emerald-400'
                      }`}
                    />
                    <span className="text-[9px] font-mono uppercase text-slate-400">
                      {node.powerState}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-white leading-tight max-w-[120px] truncate">
                    {node.name}
                  </div>
                  <div className="text-[10px] text-cyan-300 font-mono mt-0.5 truncate max-w-[120px]">
                    {node.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* VIDEO MODE VIEWFINDER HUD & FLOATING DUAL-LANGUAGE SUBTITLE CARD */}
        {isVideoTourMode && (
          <>
            {/* Viewfinder Corner Brackets */}
            <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-rose-400/80 pointer-events-none z-30" />
            <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-rose-400/80 pointer-events-none z-30" />
            <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-rose-400/80 pointer-events-none z-30" />
            <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-rose-400/80 pointer-events-none z-30" />

            {/* Live Camera Telemetry Watermark */}
            <div className="absolute top-6 left-8 pointer-events-none z-30 font-mono text-[10px] text-rose-300 space-y-0.5 bg-slate-950/85 px-3 py-1.5 rounded-xl border border-rose-500/30 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="font-bold">CAM: 3D OPTICAL FLYTHROUGH</span>
                <span className="text-slate-500">|</span>
                <span className="text-cyan-300">60.0 FPS</span>
              </div>
              <div className="text-slate-300 text-[9px]">
                TARGET: <strong>{selectedNode.name}</strong> ({selectedNode.modelExample})
              </div>
            </div>

            <div className="absolute top-6 right-8 pointer-events-none z-30 font-mono text-[10px] text-amber-300 text-right bg-slate-950/85 px-3 py-1.5 rounded-xl border border-amber-500/30 backdrop-blur-md shadow-xl">
              <div className="font-bold">{currentScene.opticalPower}</div>
              <div className="text-[9px] text-slate-400">{currentScene.speedRating}</div>
            </div>

            {/* Floating Bilingual Subtitle Narration Card */}
            <div className="absolute bottom-16 sm:bottom-12 inset-x-4 sm:inset-x-12 z-30 pointer-events-auto">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/95 backdrop-blur-xl border-2 border-rose-500/40 shadow-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold text-[10px]">
                      SCENE {videoSceneIndex + 1}/6
                    </span>
                    <span className="font-bold text-white text-xs sm:text-sm">
                      {currentScene.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrevVideoScene}
                      className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
                      title="Previous Scene"
                    >
                      <Rewind className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleToggleVideoPlay}
                      className="px-2 py-1 rounded bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      title={isVideoPlaying ? 'Pause Video' : 'Resume Video'}
                    >
                      {isVideoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span>{isVideoPlaying ? 'Pause' : 'Play'}</span>
                    </button>
                    <button
                      onClick={handleNextVideoScene}
                      className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
                      title="Next Scene"
                    >
                      <FastForward className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* English Narration */}
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
                  {currentScene.narrationEn}
                </p>

                {/* Urdu Narration */}
                <p className="text-xs sm:text-sm text-amber-200 leading-relaxed font-urdu text-right border-t border-slate-800/80 pt-1.5" dir="rtl">
                  {currentScene.narrationUr}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Canvas Legend */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span>Active Equipment (Powered)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Passive Component (0 Watts Unpowered)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-amber-400" />
              <span>Single-Mode Optical Fiber</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-blue-500" />
              <span>Copper Ethernet</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-pink-500" />
              <span>PoE++ Power Delivery</span>
            </span>
          </div>

          <span className="font-mono text-[11px] text-cyan-400">
            Click any device above to inspect complete development configuration
          </span>
        </div>
      </div>

      {/* 6-SCENE CINEMATIC VISUAL REEL (When in Video Tour Mode) */}
      {isVideoTourMode && (
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-rose-500/30 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-rose-400" />
              <span className="font-bold text-white uppercase tracking-wider">
                Full 6-Scene Flythrough Sequence for {env.name}
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Click any stage to direct 3D camera
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {videoTourScenes.map((scene, idx) => {
              const isCurrent = videoSceneIndex === idx;
              return (
                <div
                  key={scene.id}
                  onClick={() => handleSelectScene(idx)}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-rose-500/20 border-rose-400 ring-2 ring-rose-400/80 shadow-lg shadow-rose-950/40 scale-102'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className={isCurrent ? 'font-bold text-rose-300' : 'text-slate-400'}>
                        SCENE 0{idx + 1}
                      </span>
                      <span className="text-slate-500">{scene.timestamp}</span>
                    </div>
                    <div className="text-xs font-bold text-white line-clamp-2">
                      {scene.title.split(': ')[1] || scene.title}
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-800/80 text-[10px] space-y-0.5 font-mono">
                    <div className="text-amber-300 truncate">{scene.opticalPower}</div>
                    <div className="text-cyan-300 truncate">{scene.speedRating}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SELECTED EQUIPMENT DEVELOPMENT & DEPLOYMENT CARD (MULTI-TAB INSPECTOR) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border-2 border-cyan-500/40 shadow-2xl space-y-6">
        {/* Device Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold uppercase">
                {selectedNode.category}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300 font-mono text-[11px]">
                {selectedNode.modelExample}
              </span>
              <span className="text-slate-500">·</span>
              <span
                className={`text-[11px] font-bold ${
                  selectedNode.powerState === 'active'
                    ? 'text-rose-400'
                    : 'text-emerald-400'
                }`}
              >
                {selectedNode.powerState === 'active'
                  ? 'ACTIVE (POWERED)'
                  : 'PASSIVE (0 WATTS)'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <span>{selectedNode.name}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {selectedNode.deploymentRole}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1 text-slate-300 self-start sm:self-auto min-w-[220px]">
            <div>
              Medium In: <strong className="text-cyan-300">{selectedNode.mediumIn}</strong>
            </div>
            <div>
              Medium Out: <strong className="text-emerald-300">{selectedNode.mediumOut}</strong>
            </div>
            <div>
              Ports: <strong className="text-amber-300">{selectedNode.portsUsed}</strong>
            </div>
          </div>
        </div>

        {/* Inspector Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: 'cli', label: 'CLI Configuration Script', icon: Terminal },
            { id: 'ports', label: 'Port & Wiring Matrix', icon: Network },
            { id: 'deployment', label: 'Field Deployment Protocol', icon: Wrench },
            { id: 'troubleshoot', label: 'Diagnostics & Health Verification', icon: Activity },
            { id: 'comparison', label: 'FTTO vs Traditional Copper', icon: Layers }
          ].map(tab => {
            const Icon = tab.icon;
            const isTabActive = inspectorTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setInspectorTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                  isTabActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: CLI Configuration Script */}
        {inspectorTab === 'cli' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              {/* Vendor Switcher */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 font-medium mr-1">CLI Syntax:</span>
                {(['huawei', 'cisco', 'zte'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setVendorSyntax(v)}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-medium uppercase cursor-pointer transition-colors border ${
                      vendorSyntax === v
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              {/* Copy Script Button */}
              <button
                onClick={() =>
                  handleCopyCli(getVendorCliCode(selectedNode, vendorSyntax))
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 cursor-pointer transition-colors"
              >
                {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCli ? 'Copied to Clipboard!' : 'Copy CLI Configuration'}</span>
              </button>
            </div>

            <div className="relative p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-200 select-all leading-relaxed">
              <pre>{getVendorCliCode(selectedNode, vendorSyntax)}</pre>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              Note: This configuration script applies production parameters for {selectedNode.name} in {env.name}. Adjust interface numbers and VLAN IDs to match site specific design.
            </p>
          </div>
        )}

        {/* Tab 2: Port & Wiring Matrix */}
        {inspectorTab === 'ports' && (
          <div className="space-y-4 text-xs">
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left font-mono">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Interface / Port</th>
                    <th className="p-3">Physical Media</th>
                    <th className="p-3">Connector</th>
                    <th className="p-3">Wavelength / Transceiver</th>
                    <th className="p-3">Nominal Power / Budget</th>
                    <th className="p-3">Connected To</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/60 text-slate-200 text-xs">
                  <tr>
                    <td className="p-3 font-semibold text-cyan-300">Uplink Inbound</td>
                    <td className="p-3">{selectedNode.mediumIn}</td>
                    <td className="p-3 text-amber-300">{selectedNode.connectorType || 'LC/APC or SC/APC'}</td>
                    <td className="p-3">{selectedNode.wavelength || '1577nm Down / 1270nm Up (XGS-PON)'}</td>
                    <td className="p-3 text-emerald-300">{selectedNode.opticalPowerDbm || '-15 dBm to -24 dBm'}</td>
                    <td className="p-3 text-slate-400">Upstream Distribution / Core</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-emerald-300">Downlink Outbound</td>
                    <td className="p-3">{selectedNode.mediumOut}</td>
                    <td className="p-3 text-amber-300">{selectedNode.portsUsed.includes('RJ') ? 'RJ-45 Cat6A' : 'SC/APC Bulkhead'}</td>
                    <td className="p-3">{selectedNode.portsUsed.includes('PoE') ? '802.3bt Type 4 (60W-90W)' : '1000Base-T Wire-speed'}</td>
                    <td className="p-3 text-emerald-300">{selectedNode.poePowerWatts || (selectedNode.powerState === 'active' ? '15W-45W PoE' : '0 Watts')}</td>
                    <td className="p-3 text-slate-400">Downstream ONU / Endpoints</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
              <strong>Physical Port Mapping Summary:</strong> {selectedNode.portsUsed}. Connectors must be inspected with a fiber video microscope and cleaned with an alcohol-free one-click pen before mating.
            </div>
          </div>
        )}

        {/* Tab 3: Field Deployment Protocol */}
        {inspectorTab === 'deployment' && (
          <div className="space-y-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Step-by-Step Field Mounting & Commissioning Protocol:</span>
              </span>
              <p className="text-slate-200 leading-relaxed text-xs">
                {selectedNode.howToDeploy}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-cyan-300 text-[11px]">1. Mechanical Mount</span>
                  <p className="text-[11px] text-slate-400">
                    Secure into standard 19&quot; rack, 86-type wall box, or 35mm DIN-rail with structural fasteners.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-emerald-300 text-[11px]">2. Optical Cleaning</span>
                  <p className="text-[11px] text-slate-400">
                    Clean green SC/APC or LC/APC ferrules using dry one-click cleaning pen (&lt;0.05 dB reflection).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-300 text-[11px]">3. Power & Earthing</span>
                  <p className="text-[11px] text-slate-400">
                    Connect safety ground bonding lead (&lt;1 Ohm); verify dual redundant DC/AC power supplies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Diagnostics & Health Verification */}
        {inspectorTab === 'troubleshoot' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Routine Link Health Benchmark Commands:</span>
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-[11px] text-slate-200 overflow-x-auto space-y-1">
                  <div># display optical-info {selectedNode.id}</div>
                  <div># display ont info 0 1 all</div>
                  <div># display mac-address port</div>
                  <div># ping -c 50 10.10.1.1</div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Target acceptance metric: Rx optical attenuation between -15 dBm and -24 dBm with zero CRC errors over 24 hours.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Common Field Fault Remediation:</span>
                </span>
                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  <li>• <strong>Optical LOS Red LED:</strong> Inspect fiber patch cord bend radius (&gt;30mm) and clean ferrule with one-click pen.</li>
                  <li>• <strong>Rogue ONT State:</strong> Laser stuck transmitting; isolate port on OLT and verify with Optical Power Meter.</li>
                  <li>• <strong>VLAN Tag Drop:</strong> Verify OMCI translation rule matches upstream Core Switch L3 gateway.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: FTTO vs Traditional Copper */}
        {inspectorTab === 'comparison' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[11px]">
                  Traditional 3-Tier Copper Architecture:
                </span>
                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  <li>• Requires dedicated 10 m² floor switch rooms (IDFs) every 90 meters.</li>
                  <li>• Active 48-port switches consume 120W to 350W each, requiring 24/7 air conditioning.</li>
                  <li>• Thick bundles of copper cables clog ceiling trays and produce EMI in medical/industrial areas.</li>
                  <li>• Switch refresh cycles every 5-7 years, incurring high recurring Capex.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                  FTTO All-Optical Passive Architecture:
                </span>
                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  <li>• Replaces IDF switch rooms with 0-Watt passive splitters inside riser shafts.</li>
                  <li>• 0 Watts heat generated in corridors; saves 70%+ cooling electricity.</li>
                  <li>• Thin, lightweight glass fibers carry light up to 20 km with zero EMI.</li>
                  <li>• ODN passive glass lasts 30+ years; upgrade from 10G to 50G by swapping headend optics only.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* "HOW TO DEPLOY NETWORK" PHASE PROGRESSION CONTROLLER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Step-by-Step Deployment Stages for {env.name}</span>
            </h3>
            <p className="text-slate-400 text-xs">
              Follow these sequential phases to deploy this exact network from zero to full cutover.
            </p>
          </div>

          {/* Stage Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {env.stages.map(st => (
              <button
                key={st.stageNumber}
                onClick={() => {
                  setActiveStageNumber(st.stageNumber);
                  const firstTarget = env.nodes.find(n => st.focusNodes.includes(n.id));
                  if (firstTarget) setSelectedNodeId(firstTarget.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  activeStageNumber === st.stageNumber
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                Stage {st.stageNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Current Stage Details */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold font-mono flex items-center justify-center">
                {activeStage.stageNumber}
              </span>
              <h4 className="text-sm font-bold text-white">{activeStage.title}</h4>
            </div>
            <span className="font-mono text-slate-400 text-[11px]">{activeStage.duration}</span>
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Installation Protocol:</span>
            <p className="text-slate-200 leading-relaxed">{activeStage.protocol}</p>
          </div>

          <div className="pt-2 text-[11px] text-emerald-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Engineering Acceptance Test:</strong> {activeStage.acceptanceTest}</span>
          </div>
        </div>
      </div>

      {/* Fullscreen 3D Inspection Modal */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{env.name} — Fullscreen 3D Network Topology</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                    Live 3D Inspection
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  {env.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isVideoTourMode) {
                    handleExitVideoTour();
                  } else {
                    handleStartVideoTour(0);
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border transition-colors ${
                  isVideoTourMode
                    ? 'bg-rose-500/25 text-rose-300 border-rose-500/60 shadow-md ring-1 ring-rose-400'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-rose-400" />
                <span>{isVideoTourMode ? 'Exit Video Tour' : 'Play 3D Video Tour'}</span>
              </button>
              <button
                onClick={() => setIsLaserSimulating(!isLaserSimulating)}
                className="px-3 py-1.5 rounded-lg text-xs bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                {isLaserSimulating ? 'Pause Pulse' : 'Simulate Pulse'}
              </button>
              <button
                onClick={() => setIsFullscreenModalOpen(false)}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
                title="Close Fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Scenario Picker inside Fullscreen */}
          <div className="py-3 flex items-center gap-2 overflow-x-auto shrink-0">
            {(['university', 'hospital', 'industry', 'large-campus', 'small-campus', 'building', 'office'] as const).map(k => {
              const d = ENVIRONMENTS_DATA[k];
              const isCur = activeEnvKey === k;
              return (
                <button
                  key={k}
                  onClick={() => {
                    setActiveEnvKey(k);
                    const fn = d.nodes[0];
                    if (fn) setSelectedNodeId(fn.id);
                    setTracedEndpointId(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                    isCur
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d.name.split(' (')[0]}
                </button>
              );
            })}
          </div>

          {/* Expanded 3D Canvas */}
          <div className="flex-1 min-h-[500px] relative p-6 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden mt-2">
            <div
              style={{
                transform: `perspective(1200px) rotateX(${pitchAngle}deg) scale(${zoomLevel})`,
                transformOrigin: 'top center',
                transition: 'transform 0.4s ease-out'
              }}
              className="relative w-full h-[580px]"
            >
              {/* SVG Links */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                {env.links.map((link, lIdx) => {
                  const fromNode = env.nodes.find(n => n.id === link.fromId);
                  const toNode = env.nodes.find(n => n.id === link.toId);
                  if (!fromNode || !toNode) return null;
                  const isHighlighted = selectedNodeId === fromNode.id || selectedNodeId === toNode.id;
                  const isPathway = pathwayInfo?.linkIndices.includes(lIdx);
                  const color = isPathway ? '#f59e0b' : isHighlighted ? '#38bdf8' : link.color;
                  return (
                    <g key={lIdx}>
                      <line
                        x1={`${fromNode.posX}%`}
                        y1={`${fromNode.posY}%`}
                        x2={`${toNode.posX}%`}
                        y2={`${toNode.posY}%`}
                        stroke={color}
                        strokeWidth={isPathway ? 5 : isHighlighted ? 4 : 2}
                        strokeOpacity={isPathway ? 1.0 : isHighlighted ? 0.9 : 0.4}
                      />
                      {isLaserSimulating && (
                        <line
                          x1={`${fromNode.posX}%`}
                          y1={`${fromNode.posY}%`}
                          x2={`${toNode.posX}%`}
                          y2={`${toNode.posY}%`}
                          stroke={color}
                          strokeWidth={isPathway ? 4 : 3}
                          strokeDasharray={isPathway ? "10 8" : "6 14"}
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Equipment Nodes */}
              {env.nodes.map(node => {
                const isSelected = selectedNodeId === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    style={{
                      left: `${node.posX}%`,
                      top: `${node.posY}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: isSelected ? 40 : 20 + node.layerZ
                    }}
                    className="absolute cursor-pointer transition-all duration-300"
                  >
                    <div
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'bg-cyan-500/30 border-cyan-400 shadow-2xl scale-110 ring-2 ring-cyan-400'
                          : 'bg-slate-900/90 border-slate-700 hover:border-slate-500 hover:scale-105'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className={`w-2 h-2 rounded-full ${node.powerState === 'active' ? 'bg-rose-400 animate-pulse' : 'bg-emerald-400'}`} />
                        <span className="text-[9px] font-mono uppercase text-slate-400">{node.powerState}</span>
                      </div>
                      <div className="text-xs font-bold text-white max-w-[130px] truncate">{node.name}</div>
                      <div className="text-[10px] text-cyan-300 font-mono mt-0.5 max-w-[130px] truncate">{node.category}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between mt-3 shrink-0">
            <span>Selected Device: <strong className="text-white">{selectedNode.name}</strong> ({selectedNode.modelExample})</span>
            <span className="font-mono text-cyan-400">Click any device to inspect</span>
          </div>
        </div>
      )}
    </div>
  );
};
