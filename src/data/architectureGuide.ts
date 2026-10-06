/**
 * Complete Structured Data for Technical Architecture Guide (2026)
 * FTTO · POL · All-Optical Campus Network Infrastructure
 * Designed & Developed by Mr. Zeeshan Javed, AI System Lead Engineer, Directorate of IT, IUB
 * Technical Publication by Rizwan Majeed, Director IT, Institute of Space Technology
 */

export interface SectionContent {
  id: string;
  number: string;
  title: string;
  category: 'executive' | 'fundamentals' | 'optical' | 'datacenter' | 'architecture' | 'economics' | 'governance' | 'reference';
  summary: string;
  keyPoints?: string[];
  callouts?: {
    type: 'key-point' | 'technical-note' | 'management' | 'warning';
    title: string;
    text: string;
  }[];
  tables?: {
    caption: string;
    headers: string[];
    rows: (string | number)[][];
  }[];
  contentParagraphs: string[];
}

export interface GlossaryItem {
  abbr: string;
  fullName: string;
  simpleExplanation: string;
  domain: string;
  standards?: string;
}

export const GLOSSARY_DATA: GlossaryItem[] = [
  { abbr: 'ACL', fullName: 'Access Control List', simpleExplanation: 'Rules that permit or block traffic based on IP, port or protocol.', domain: 'Security' },
  { abbr: 'AES', fullName: 'Advanced Encryption Standard', simpleExplanation: 'Encryption method used on PON downstream traffic (AES-128).', domain: 'PON Security', standards: 'ITU-T G.984' },
  { abbr: 'AP', fullName: 'Access Point', simpleExplanation: 'Device that provides Wi-Fi connectivity to end users.', domain: 'Wireless', standards: 'IEEE 802.11ax/be' },
  { abbr: 'BMS', fullName: 'Building Management System', simpleExplanation: 'Controls lighting, HVAC, sensors and environmental systems.', domain: 'IoT / ELV' },
  { abbr: 'CapEx', fullName: 'Capital Expenditure', simpleExplanation: 'Upfront purchase and installation cost of infrastructure.', domain: 'Economics & TCO' },
  { abbr: 'CCTV', fullName: 'Closed-Circuit Television', simpleExplanation: 'IP video surveillance and security camera system.', domain: 'Endpoints' },
  { abbr: 'DBA', fullName: 'Dynamic Bandwidth Allocation', simpleExplanation: 'How the OLT assigns upstream transmission time slots to ONUs.', domain: 'PON Protocol', standards: 'ITU-T G.984.3' },
  { abbr: 'DHCP', fullName: 'Dynamic Host Configuration Protocol', simpleExplanation: 'Automatically assigns IP addresses and network parameters to client devices.', domain: 'Network Services' },
  { abbr: 'ELV', fullName: 'Extra-Low Voltage', simpleExplanation: 'Low-voltage building systems (data, CCTV, access control, fire alarm).', domain: 'Building Services' },
  { abbr: 'FEC', fullName: 'Forward Error Correction', simpleExplanation: 'Adds mathematical redundancy to correct optical transmission bit errors.', domain: 'PON Physical Layer' },
  { abbr: 'FTTO', fullName: 'Fiber-to-the-Office', simpleExplanation: 'Architectural model where fiber extends directly to individual offices or wall boxes.', domain: 'Campus Architecture' },
  { abbr: 'GE / XGE', fullName: 'Gigabit Ethernet / 10-Gigabit Ethernet', simpleExplanation: 'Standard Ethernet user and uplink speeds (1 Gbps / 10 Gbps).', domain: 'Ethernet Ports', standards: 'IEEE 802.3' },
  { abbr: 'GPON', fullName: 'Gigabit Passive Optical Network', simpleExplanation: 'Mature, cost-effective 2.5 Gbps down / 1.25 Gbps up optical standard.', domain: 'PON Technology', standards: 'ITU-T G.984' },
  { abbr: 'HPC / GPU', fullName: 'High-Performance Computing / GPU Cluster', simpleExplanation: 'Compute clusters needing non-blocking, dedicated low-latency spine-leaf Ethernet.', domain: 'Data Center' },
  { abbr: 'IDF', fullName: 'Intermediate Distribution Frame', simpleExplanation: 'Floor-level equipment room housing access switches, patch panels, UPS and cooling.', domain: 'Traditional LAN' },
  { abbr: 'IGMP', fullName: 'Internet Group Management Protocol', simpleExplanation: 'Manages multicast group memberships for IPTV and digital classroom streaming.', domain: 'Multicast Routing' },
  { abbr: 'IoT', fullName: 'Internet of Things', simpleExplanation: 'Sensors, smart door locks, thermostats and automated meters.', domain: 'Endpoints' },
  { abbr: 'IP', fullName: 'Internet Protocol', simpleExplanation: 'Core addressing and routing protocol of the global Internet.', domain: 'Network Layer' },
  { abbr: 'LAN', fullName: 'Local Area Network', simpleExplanation: 'Computer network covering a localized geographic area such as a campus.', domain: 'General' },
  { abbr: 'LSZH', fullName: 'Low Smoke Zero Halogen', simpleExplanation: 'Fire-resistant cable jacket material that emits minimal smoke and no toxic halogens.', domain: 'Cabling Infrastructure' },
  { abbr: 'MDF', fullName: 'Main Distribution Frame', simpleExplanation: 'Principal equipment room of a building/campus connecting to core routing.', domain: 'Traditional LAN' },
  { abbr: 'NMS', fullName: 'Network Management System', simpleExplanation: 'Centralized software platform for monitoring, provisioning and alarm correlation.', domain: 'Operations' },
  { abbr: 'NOC', fullName: 'Network Operations Center', simpleExplanation: 'Centralized operations room where network health is continuously monitored.', domain: 'Operations' },
  { abbr: 'ODF', fullName: 'Optical Distribution Frame', simpleExplanation: 'Rack-mounted modular frame in the central IT room for fiber patching and splicing.', domain: 'Passive ODN' },
  { abbr: 'ODN', fullName: 'Optical Distribution Network', simpleExplanation: 'The entire passive optical path between OLT and ONUs (cables, splitters, splices).', domain: 'Passive ODN' },
  { abbr: 'OLT', fullName: 'Optical Line Terminal', simpleExplanation: 'Central intelligent master device in the data center driving passive optical trees.', domain: 'PON Headend', standards: 'ITU-T G.984 / G.9807' },
  { abbr: 'OMCI', fullName: 'ONU Management and Control Interface', simpleExplanation: 'ITU standard protocol allowing OLTs to centrally configure and monitor ONUs.', domain: 'PON Management', standards: 'ITU-T G.988' },
  { abbr: 'ONT', fullName: 'Optical Network Terminal', simpleExplanation: 'User-side optical device serving a single user or office (overlaps with ONU).', domain: 'Endpoints' },
  { abbr: 'ONU', fullName: 'Optical Network Unit', simpleExplanation: 'Compact optical terminal near users converting light to Ethernet and Wi-Fi.', domain: 'Endpoints' },
  { abbr: 'OpEx', fullName: 'Operational Expenditure', simpleExplanation: 'Recurring day-to-day costs of electricity, cooling, maintenance and staff.', domain: 'Economics & TCO' },
  { abbr: 'OTDR', fullName: 'Optical Time-Domain Reflectometer', simpleExplanation: 'Precision instrument measuring optical fiber loss, reflections and splice faults.', domain: 'Testing & QA' },
  { abbr: 'PoE / PoE+ / PoE++', fullName: 'Power over Ethernet', simpleExplanation: 'Supplying electrical DC power over twisted-pair copper cable (15.4W / 30W / 60-90W).', domain: 'Power Systems', standards: 'IEEE 802.3af/at/bt' },
  { abbr: 'PoF', fullName: 'Power over Fiber', simpleExplanation: 'Delivering electrical power via laser light or composite copper-fiber hybrid cables.', domain: 'Power Delivery' },
  { abbr: 'POF', fullName: 'Plastic Optical Fiber', simpleExplanation: 'Thick-core plastic optical cable used for very short runs; unrelated to power.', domain: 'Cabling Media' },
  { abbr: 'POL', fullName: 'Passive Optical LAN', simpleExplanation: 'Campus LAN architecture using point-to-multipoint passive PON technology.', domain: 'Campus Architecture' },
  { abbr: 'PON', fullName: 'Passive Optical Network', simpleExplanation: 'Point-to-multipoint optical network utilizing unpowered splitters.', domain: 'Optical Access' },
  { abbr: 'POTS', fullName: 'Plain Old Telephone Service', simpleExplanation: 'Analog RJ-11 voice telephone service supported on legacy ONUs.', domain: 'Voice' },
  { abbr: 'QoS', fullName: 'Quality of Service', simpleExplanation: 'Traffic prioritization mechanisms ensuring voice/video latency guarantees.', domain: 'Traffic Engineering' },
  { abbr: 'RF', fullName: 'Radio Frequency', simpleExplanation: 'Wireless radio spectrum design and propagation for Wi-Fi coverage.', domain: 'Wireless' },
  { abbr: 'SFP / SFP+', fullName: 'Small Form-factor Pluggable', simpleExplanation: 'Compact, hot-pluggable optical transceiver module format.', domain: 'Hardware' },
  { abbr: 'SSID', fullName: 'Service Set Identifier', simpleExplanation: 'Human-readable broadcast name of a wireless network segment.', domain: 'Wireless' },
  { abbr: 'TCO', fullName: 'Total Cost of Ownership', simpleExplanation: 'Total financial assessment: CapEx + 10-year OpEx + mid-life refresh cycles.', domain: 'Financial Strategy' },
  { abbr: 'UPS', fullName: 'Uninterruptible Power Supply', simpleExplanation: 'Battery energy storage system providing continuous power during outages.', domain: 'Power Infrastructure' },
  { abbr: 'VLAN', fullName: 'Virtual Local Area Network', simpleExplanation: 'Logically isolated broadcast domain configured over shared physical infrastructure.', domain: 'Network Segmentation', standards: 'IEEE 802.1Q' },
  { abbr: 'VoIP', fullName: 'Voice over IP', simpleExplanation: 'Digital telephony transmission using IP protocol packets.', domain: 'Voice' },
  { abbr: 'XGS-PON', fullName: '10-Gigabit Symmetric PON', simpleExplanation: 'Mainstream modern enterprise optical standard delivering 10 Gbps symmetric.', domain: 'PON Technology', standards: 'ITU-T G.9807.1' },
  { abbr: '50G-PON', fullName: '50-Gigabit Symmetric PON', simpleExplanation: 'Next-generation optical standard delivering 50 Gbps with wavelength coexistence.', domain: 'PON Technology', standards: 'ITU-T G.9804' },
];

export const WORKED_EXAMPLES_DATA = [
  {
    id: 'ex1',
    title: 'Example 1: Routine Maintenance Hours',
    description: 'Annual routine technician operational effort on an illustrative 5,000-user university campus.',
    traditionalHours: 442,
    fttoHours: 120,
    reductionPercent: 72.8,
    breakdown: [
      { activity: 'Room / IDF inspections', traditional: '10 IDFs × 12 visits × 1.5 h = 180 h', ftto: '1 central room × 12 visits × 2 h = 24 h' },
      { activity: 'UPS battery checks', traditional: '11 UPS × 4 checks × 1 h = 44 h', ftto: '3 UPS × 4 checks × 1 h = 12 h' },
      { activity: 'Firmware upgrades', traditional: '45 switches × 2/yr × 0.75 h = 68 h', ftto: '2 OLTs × 2 × 2 h + 2 bulk upgrades = 24 h' },
      { activity: 'Configuration changes', traditional: '120 changes × 30 min login = 60 h', ftto: '120 changes × 10 min profile = 20 h' },
      { activity: 'Fault site visits', traditional: '60 incidents × 1.5 h = 90 h', ftto: '60 incidents × 40 min = 40 h' },
    ],
    keyInsight: 'Routine effort falls from 55 working days down to 15 working days per year, freeing IT staff from physical room rounds to focus on digital services.'
  },
  {
    id: 'ex2',
    title: 'Example 2: Resolving a "Wi-Fi is down" Complaint',
    description: 'Side-by-side incident workflow comparing traditional switch closet troubleshooting with centralized PON telemetry.',
    traditionalHours: 2.2,
    fttoHours: 0.6,
    reductionPercent: 72.7,
    breakdown: [
      { activity: 'Initial Triage & Port Check', traditional: 'Check building switch, locate room key, check patch panel', ftto: 'OLT dashboard inspects ONU light level and PoE state immediately' },
      { activity: 'Physical Dispatch', traditional: 'Walk to floor IDF, test patch cord, test UPS socket', ftto: 'Technician dispatched directly to office with verified replacement unit' },
      { activity: 'Replacement & Verification', traditional: 'Replace switch port, reconfigure VLAN, retest', ftto: 'Hot-swap ONU, auto-provisions via OMCI profile in 90 seconds' }
    ],
    keyInsight: 'Optical power levels (Rx/Tx dBm) and PoE status are visible centrally from the data center before any physical walk.'
  },
  {
    id: 'ex3',
    title: 'Example 3: Adding a 30-Seat Computer Lab',
    description: 'Moves, adds and changes comparison when converting classroom space into an active instructional lab.',
    traditionalHours: 32,
    fttoHours: 8,
    reductionPercent: 75.0,
    breakdown: [
      { activity: 'Horizontal Cabling', traditional: 'Pull 30 Cat6A copper cables through packed risers back to floor IDF', ftto: 'Pull 1 or 2 thin fiber strands from existing floor splitter box' },
      { activity: 'Floor IDF Expansion', traditional: 'Add 48-port switch, add patch panel, check IDF UPS and thermal headroom', ftto: 'No work in floor room; passive splitter has spare ports' },
      { activity: 'Endpoint Activation', traditional: 'Punch down 30 keystone jacks, configure switch ports', ftto: 'Deploy multi-port desktop/rack ONU or compact ONUs directly in lab' }
    ],
    keyInsight: 'Expanding capacity does not require expanding floor closet thermal load or running 30 bulky copper cables through congested vertical conduits.'
  },
  {
    id: 'ex4',
    title: 'Example 4: Distributed Infrastructure to Own',
    description: '10-year overhead of owning battery plants, cooling systems, and physical security.',
    traditionalHours: 10, // count of active IDF rooms
    fttoHours: 1, // count of central rooms
    reductionPercent: 90.0,
    breakdown: [
      { activity: 'Active Equipment Rooms', traditional: '10 IDFs + 1 MDF (11 rooms total)', ftto: '1 Data Center / Headend room (+ passive boxes in shafts)' },
      { activity: 'UPS Battery Banks', traditional: '11 individual UPS batteries, replaced every 3-5 years', ftto: 'Central datacenter UPS + battery module at critical security ONUs' },
      { activity: 'Floor Air Conditioning', traditional: '10 split A/C units running 24/7/365 with regular filter servicing', ftto: 'Eliminated; central precision cooling in data center absorbs OLT heat' },
      { activity: 'Physical Security & Fire', traditional: '10 rooms requiring key management, smoke detectors, access logs', ftto: 'Single secure data center facility perimeter' }
    ],
    keyInsight: 'Every floor IDF is a miniature distributed data center. Eliminating 10 IDFs removes 10 air conditioners, 10 UPS battery banks, and 10 access control points.'
  },
  {
    id: 'ex5',
    title: 'Example 5: Space Returned to the Institution',
    description: 'Floor area previously occupied by active communications rooms returned to teaching and research.',
    traditionalHours: 60, // m²
    fttoHours: 0,
    reductionPercent: 100.0,
    breakdown: [
      { activity: 'IDF Rooms Released', traditional: '10 dedicated rooms on academic floors', ftto: '0 dedicated rooms needed' },
      { activity: 'Average Area per IDF', traditional: 'Approx 6 m² per switch closet', ftto: 'Passive distribution boxes occupy 0 m² of floor space (wall/shaft)' },
      { activity: 'Total Reclaimed Space', traditional: '60 m² allocated to switch racks', ftto: '60 m² returned — equivalent to 2 faculty offices or a 25-seat seminar room' }
    ],
    keyInsight: 'In congested urban campuses and high-density academic departments, 60 m² of reclaimed real estate carries significant institutional value.'
  },
  {
    id: 'ex6',
    title: 'Example 6: Electricity — An Honest Comparative View',
    description: 'Average electrical power draw (kW) excluding endpoints. Shows realistic neutral comparison.',
    traditionalHours: 10.9, // kW
    fttoHours: 11.6, // kW
    reductionPercent: -6.4,
    breakdown: [
      { activity: 'Switches vs OLTs', traditional: '45 access/distribution switches × 150 W = 6.8 kW', ftto: '2 redundant OLT chassis × 1.5 kW = 3.0 kW' },
      { activity: 'Endpoint Optical Units', traditional: '0 kW (handled in switches)', ftto: '1,200 ONUs × 6 W average = 7.2 kW' },
      { activity: 'Room Cooling Overhead', traditional: '50% of IDF IT load (A/C compressors) = 3.4 kW', ftto: '33% of OLT load in data center = 1.0 kW' },
      { activity: 'UPS Inverter Losses', traditional: '10% of distributed load = 0.7 kW', ftto: '10% of backed-up load = 0.4 kW' },
      { activity: 'Total System Load', traditional: '10.9 kW continuous', ftto: '11.6 kW continuous (with 6W ONUs)' }
    ],
    keyInsight: 'Electricity is roughly neutral: removing 10 floor A/C units balances against powering 1,200 small ONUs. Do not sell FTTO purely on electricity savings.'
  },
  {
    id: 'ex7',
    title: 'Example 7: Next-Generation Speed Upgrades (Wi-Fi 7 & Beyond)',
    description: 'Comparative migration pathway when upgrading to multi-gigabit access and Wi-Fi 7 APs.',
    traditionalHours: 100, // relative cost/effort index
    fttoHours: 25,
    reductionPercent: 75.0,
    breakdown: [
      { activity: 'Wi-Fi 7 Multi-Gigabit', traditional: 'Rip & replace 40 access switches with 2.5G/5G/10G PoE++ switches; Cat5e/older Cat6 cables may fail multi-gig certification over 60m', ftto: 'Swap target ONUs to 2.5GE/10GE PoE++ models; single-mode fiber infrastructure remains 100% untouched' },
      { activity: 'Backbone Capacity Boost', traditional: 'Re-cable distribution links, upgrade core 40G/100G optics', ftto: 'Introduce XGS-PON or 50G-PON line card on existing OLT chassis on same fiber tree' },
      { activity: 'Campus Expansion', traditional: 'Build new IDF rooms, run 400A sub-panels, install split A/C', ftto: 'Splice into existing feeder fiber cable and add optical distribution box' }
    ],
    keyInsight: 'Single-mode optical fiber has near-infinite physical transmission bandwidth. GPON, XGS-PON and 50G-PON coexist on the same fiber glass simultaneously using separate optical wavelengths.'
  }
];

export const HUAWEI_MODELS_DATA = [
  {
    model: 'OptiXstar P802P Series',
    type: 'Panel ONU (86-Type Wall Box)',
    uplink: '1 × XGS-PON (10G Symmetric)',
    downlink: '4 × GE (1 Gbps) Ethernet',
    poe: 'None (Data Only)',
    typicalUse: 'Faculty offices, administrative desks, classrooms requiring neat flush wall mounting without clutter.',
    verifiedSource: 'Huawei Enterprise Optical Terminal Product Catalog (2026)'
  },
  {
    model: 'OptiXstar P602P Series',
    type: 'Panel ONU (86-Type Wall Box)',
    uplink: '1 × GPON (2.5G / 1.25G)',
    downlink: '4 × GE (1 Gbps) Ethernet',
    poe: 'None',
    typicalUse: 'Cost-sensitive office drops, general student dorms on mature GPON trees.',
    verifiedSource: 'Huawei Enterprise Optical Terminal Product Catalog (2026)'
  },
  {
    model: 'OptiXstar P892M-01',
    type: 'M45 Multi-Service Panel ONU',
    uplink: '1 × XGS-PON',
    downlink: '4 × GE (PoE/PoE+) + 1 × XGE (10GE PoE++)',
    poe: 'PoE (802.3af), PoE+ (802.3at), PoE++ (802.3bt)',
    typicalUse: 'Offices with Wi-Fi 6E/7 APs, IP phones and security PTZ cameras needing direct power from the terminal.',
    verifiedSource: 'Huawei Enterprise Optical Terminal Product Catalog (2026)'
  },
  {
    model: 'OptiXstar P885E-10',
    type: 'High-Density Rack-Mount ONU',
    uplink: '2 × XGS-PON Pro / XGS-PON Uplinks (Type B Protection)',
    downlink: '24 × 2.5GE PoE++ Ports',
    poe: 'PoE++ (up to 90W per port, 740W shared budget)',
    typicalUse: 'High-density lecture halls, central library wings, computer training laboratories, stadium AP clusters.',
    verifiedSource: 'Huawei Enterprise Optical Terminal Product Catalog (2026)'
  },
  {
    model: 'OptiXstar S600E',
    type: 'Miniature SFP Optical Module ONU',
    uplink: '1 × GPON (Plugs into camera/AP SFP socket)',
    downlink: 'Host SFP Interface',
    poe: 'Powered by host device',
    typicalUse: 'Direct fiber connection to outdoor perimeter CCTV cameras and high-mount wireless APs without external box.',
    verifiedSource: 'Huawei Enterprise Optical Terminal Product Catalog (2026)'
  }
];

export const VENDOR_CHECKLIST_DATA = [
  { id: 'v1', category: 'OLT Capacity', item: 'PON Port Density & Chassis Scalability', question: 'How many PON ports per card and chassis? What is the maximum registered ONU count per chassis under full line rate?' },
  { id: 'v2', category: 'PON Standard', item: 'Wavelength Coexistence & Combo PON', question: 'Does the OLT support Combo PON (GPON + XGS-PON) on the same optical port for seamless in-service migration?' },
  { id: 'v3', category: 'Uplink Capacity', item: 'Core Interconnect & Oversubscription', question: 'What is the number and speed of uplinks (40GE/100GE)? What is the oversubscription ratio from PON backplane to uplink fabric?' },
  { id: 'v4', category: 'ONU Port Speeds', item: 'Multi-Gigabit (2.5GE / 10GE) Endpoints', question: 'Are 2.5GE and 10GE user-side interfaces supported on panel and compact ONUs for modern Wi-Fi 7 AP connectivity?' },
  { id: 'v5', category: 'PoE Capabilities', item: 'PoE / PoE+ / PoE++ Standard Budgets', question: 'Does the vendor support IEEE 802.3bt (Type 3 / Type 4 up to 90W) on edge optical units, and what is the total thermal PoE budget?' },
  { id: 'v6', category: 'Wireless Support', item: 'Multi-Vendor AP Interoperability', question: 'Can third-party Wi-Fi APs (Aruba, Cisco, Ruckus) connect with full VLAN trunking, DHCP Option 43, and 802.1X passthrough?' },
  { id: 'v7', category: 'Network Services', item: 'VLAN, QoS & IGMP Multicast', question: 'Does the system support QinQ (802.1ad), 8 CoS priority queues per ONU port, and IGMPv3 snooping for campus TV and streaming?' },
  { id: 'v8', category: 'Optical Redundancy', item: 'Type B & Type C Protection Switching', question: 'Does the OLT support sub-50ms Type B dual-homing feeder protection to two independent PON line cards or separate OLTs?' },
  { id: 'v9', category: 'Security & Auth', item: 'Rogue ONU Detection & AES-128', question: 'How does the OLT detect rogue continuously-emitting ONUs? Does downstream broadcast enforce hardware AES-128 encryption?' },
  { id: 'v10', category: 'Central Operations', item: 'OMCI & Telemetry-Based NMS', question: 'Can all ONUs be configured, updated, and diagnosed via OMCI from the NMS without local physical connection?' },
  { id: 'v11', category: 'Firmware Upgrades', item: 'Batch In-Service Upgrades & Rollback', question: 'Can thousands of ONUs be upgraded in concurrent batches during maintenance windows with automatic fallback on failure?' },
  { id: 'v12', category: 'Multi-Vendor Support', item: 'Standard OMCI vs Vendor Lock-In', question: 'Does the OLT interoperate with third-party BBF.247 certified ONUs, or does it enforce vendor-proprietary extensions?' },
  { id: 'v13', category: 'Support & Spares', item: 'Local Depots & Hardware Replacement SLA', question: 'Is there a guaranteed 4-hour local hardware replacement depot in-country for OLT control boards and power modules?' },
  { id: 'v14', category: 'Total Financial TCO', item: '10-Year Lifecycle Licensing', question: 'Are NMS, OLT port, and ONU management licenses perpetual or recurring subscriptions? What are the year 6-10 support rates?' },
];

export const DESIGN_CHECKLIST_SECTIONS = [
  {
    category: 'Physical Infrastructure',
    icon: 'Cable',
    items: [
      { id: 'p1', label: 'Fiber specification: Single-mode ITU-T G.652.D for risers; G.657 bend-insensitive for horizontal office drops.' },
      { id: 'p2', label: 'Cable pathways: Audit vertical shaft fire-stopping, conduit fill ratios (<40%), and trunking bend radii (>30mm).' },
      { id: 'p3', label: 'Data center ODF: Adequate capacity with 30% spare splice trays, LC/APC angled connectors to prevent back-reflection.' },
      { id: 'p4', label: 'Distribution boxes: Fire-rated, lockable optical distribution boxes (ODB) in ELV risers on each floor.' },
      { id: 'p5', label: 'Standardized labeling: TIA-606-C compliant color-coded labeling matching campus GIS and fiber management records.' }
    ]
  },
  {
    category: 'Optical & Loss Budget',
    icon: 'Gauge',
    items: [
      { id: 'o1', label: 'Wavelength plan: Ensure 1490nm/1310nm (GPON) and 1577nm/1270nm (XGS-PON) optical coexistence filters are planned.' },
      { id: 'o2', label: 'Calculated link budget: End-to-end loss under 24.0 dB for XGS-PON Class N1 (29 dB budget) including 3.0 dB safety margin.' },
      { id: 'o3', label: 'Split ratio selection: Maximum 1:32 for standard office trees, 1:16 for high-density academic AP zones.' },
      { id: 'o4', label: 'Reflectance control: LC/APC (Angled Physical Contact, green) connectors used on all optical patch points to maintain >60 dB return loss.' },
      { id: 'o5', label: 'OTDR baseline testing: Dual-wavelength bi-directional OTDR test traces archived for every feeder and drop core.' }
    ]
  },
  {
    category: 'Network & Security',
    icon: 'Shield',
    items: [
      { id: 'n1', label: 'VLAN architecture: Logical isolation for Admin (10), Faculty (20), Students (30), Guest (40), CCTV (50), Voice (60), IoT (70), Mgmt (99).' },
      { id: 'n2', label: 'Authentication: IEEE 802.1X Port-Based Authentication or MAC bypass enforced on all user-facing Ethernet sockets.' },
      { id: 'n3', label: 'PON Downstream Security: Hardware AES-128 encryption key rotation verified between OLT and each individual ONU.' },
      { id: 'n4', label: 'Dynamic Bandwidth Allocation: DBA Type 1 (Fixed) for Voice/CCTV, Type 3 (Assured + Max) for faculty, Type 4 (Best Effort) for guests.' },
      { id: 'n5', label: 'Multicast design: IGMPv3 snooping enabled on OLT line cards to prevent video flood over passive broadcast trees.' }
    ]
  },
  {
    category: 'Power Management',
    icon: 'Zap',
    items: [
      { id: 'pw1', label: 'Central OLT resilience: Dual redundant AC/DC power feeds backed by data center N+1 generator and UPS system.' },
      { id: 'pw2', label: 'ONU power distribution: Defined strategy (Local mains adapter vs Central Class 2 DC power vs Composite hybrid cable).' },
      { id: 'pw3', label: 'Critical endpoint backup: Mini-UPS or centralized DC battery backup provided for emergency phones and security CCTV ONUs.' },
      { id: 'pw4', label: 'PoE power budget audit: Confirm ONU power supply wattage exceeds the aggregate peak draw of connected PoE+ (30W) APs and cameras.' },
      { id: 'pw5', label: 'Electrical safety compliance: Low-voltage compliance with local electrical safety regulations and NFPA/NEC building codes.' }
    ]
  },
  {
    category: 'Wireless & RF Integration',
    icon: 'Wifi',
    items: [
      { id: 'w1', label: 'Professional RF survey: Pre-deployment predictive simulation and post-deployment validation; fiber does not solve bad RF!' },
      { id: 'w2', label: 'Port speed matching: 2.5GE or 5GE/10GE ports provided on ONUs feeding Wi-Fi 6E/7 APs to avoid 1 Gbps access bottlenecks.' },
      { id: 'w3', label: 'PoE classification: IEEE 802.3at (30W) or 802.3bt (60W) budget verified for dual-radio and tri-band 4x4 MIMO APs.' },
      { id: 'w4', label: 'WLAN controller integration: Central controller or cloud management tunnel (CAPWAP/VXLAN) passing through OLT without fragmentation.' },
      { id: 'w5', label: 'SSID-to-VLAN mapping: 802.1Q tagged trunks carried from AP back through ONU to core gateway.' }
    ]
  },
  {
    category: 'Operations & Maintenance',
    icon: 'Settings',
    items: [
      { id: 'm1', label: 'Central NMS deployment: High-availability NMS server with automated configuration backup and GIS fiber mapping.' },
      { id: 'm2', label: 'Proactive optical monitoring: Threshold alerts configured for optical Tx/Rx power degradation before link failure.' },
      { id: 'm3', label: 'Spares inventory: 5% spare pre-provisioned ONUs of each form factor and 1 spare OLT control & PON line card on site.' },
      { id: 'm4', label: 'Staff skills development: Fiber inspection, cleaning (one-click pens), and optical power meter training for campus IT engineers.' },
      { id: 'm5', label: 'Vendor SLA: Active 24/7/365 hardware replacement and software maintenance agreement with vendor in country.' }
    ]
  }
];
