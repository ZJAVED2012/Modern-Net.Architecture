import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  Calendar,
  AlertTriangle,
  Layers,
  Server,
  Zap,
  Cable,
  ShieldCheck,
  Award,
  ChevronRight,
  ChevronLeft,
  Printer,
  FileCheck,
  Search,
  Filter,
  CheckSquare,
  Square,
  Gauge,
  Activity,
  Cpu,
  Download,
  Upload,
  Save,
  RotateCcw,
  Check,
  FileDown,
  Share2,
  Copy,
  Users,
  Link2,
  ExternalLink,
  Key,
  X
} from 'lucide-react';

export interface DeploymentPhase {
  id: string;
  phaseNumber: number;
  title: string;
  category: 'Planning' | 'Headend' | 'Optical Plant' | 'Edge & Service' | 'Testing & Migration' | 'Operations';
  weekRange: string;
  estimatedDays: number;
  milestoneName: string;
  objective: string;
  summary: string;
  tasks: { id: string; label: string; details: string }[];
  deliverable: string;
  toolsRequired: string[];
  keyRisk: string;
  mitigation: string;
}

export const DEPLOYMENT_PHASES: DeploymentPhase[] = [
  {
    id: 'phase-1',
    phaseNumber: 1,
    title: 'Site Survey & Infrastructure Audit',
    category: 'Planning',
    weekRange: 'Weeks 1–2',
    estimatedDays: 14,
    milestoneName: 'Milestone 1: Campus Readiness Baseline Signed',
    objective: 'Survey physical pathways, conduits, ELV shafts, and endpoint densities across all target buildings.',
    summary: 'Comprehensive audit of underground ducts, riser raceways, fire-stopping seals, endpoint counts (PCs, APs, CCTV, VoIP), and existing dark fiber availability.',
    tasks: [
      { id: 'p1-t1', label: 'Conduit & Riser Capacity Audit', details: 'Inspect vertical ELV shafts and duct routes; ensure cable fill ratio is under 40% and bend radii exceed 30mm.' },
      { id: 'p1-t2', label: 'Endpoint Census by Room', details: 'Enumerate exact socket requirements: wired PCs, multi-gigabit Wi-Fi 7 APs, IP security cameras, and POTS/VoIP phones.' },
      { id: 'p1-t3', label: 'Electrical & UPS Assessment', details: 'Inspect data center electrical feeds for OLT dual AC/DC supplies and determine ONU powering strategy in each office zone.' },
      { id: 'p1-t4', label: 'Path Distance & GIS Mapping', details: 'Measure exact route distance from central data center to each building entrance to feed link budget calculations.' }
    ],
    deliverable: 'Comprehensive Pathway Audit Report & Endpoint GIS Allocation Matrix',
    toolsRequired: ['Laser Distance Meter', 'Conduit Rodder & Duct Pull Gauge', 'Riser Pathway Inspection Camera', 'Campus GIS Mapping Software'],
    keyRisk: 'Blocked underground ducts or congested vertical riser shafts requiring civil works.',
    mitigation: 'Verify dark fiber availability and execute duct clearing/sub-ducting during early design.'
  },
  {
    id: 'phase-2',
    phaseNumber: 2,
    title: 'Optical Architecture & Loss Budget Design',
    category: 'Planning',
    weekRange: 'Weeks 3–4',
    estimatedDays: 14,
    milestoneName: 'Milestone 2: High-Level & Detailed Design (HLD/LLD) Approved',
    objective: 'Finalize PON standard, optical split ratios, loss budgets, VLAN logical hierarchy, and Type B protection paths.',
    summary: 'Transform physical survey data into concrete engineering blueprints: select XGS-PON vs GPON, calculate end-to-end optical link loss with 3 dB margin, and plan VLANs 10–99.',
    tasks: [
      { id: 'p2-t1', label: 'Optical Link Loss Budget Verification', details: 'Calculate total loss per tree: α·L + N_conn·A_conn + N_splice·A_splice + A_split + 3.0dB margin < Class N1/C+ budget.' },
      { id: 'p2-t2', label: 'Splitter Architecture Selection', details: 'Determine centralized (1:32 in riser) vs cascaded (1:4 basement + 1:8 floor) based on building geometry.' },
      { id: 'p2-t3', label: 'VLAN & DBA Bandwidth Mapping', details: 'Map traffic classes: Fixed (DBA T1) for Voice/CCTV, Assured (DBA T3) for Faculty, Best Effort (DBA T4) for Guest Wi-Fi.' },
      { id: 'p2-t4', label: 'Type B Protection Architecture', details: 'Design 2:N optical splitters and dual-routed feeder cables for mission-critical administrative and data facilities.' }
    ],
    deliverable: 'Approved High-Level Design (HLD), Low-Level Design (LLD), and Optical Loss Schematics',
    toolsRequired: ['ODN Link Budget Modeling Tool', 'CAD / Fiber Pathway Design Suite', 'VLAN & IP Schema Planner'],
    keyRisk: 'Split ratio chosen arbitrarily without calculating attenuation, causing receiver sensitivity degradation.',
    mitigation: 'Mandate strict compliance with ITU-T G.9807.1 link budget formulas with 3.0 dB safety headroom.'
  },
  {
    id: 'phase-3',
    phaseNumber: 3,
    title: 'Pilot Building Deployment & Validation',
    category: 'Planning',
    weekRange: 'Weeks 5–7',
    estimatedDays: 21,
    milestoneName: 'Milestone 3: Pilot Building Acceptance & Operational Sign-Off',
    objective: 'Deploy and test a single representative faculty building to validate performance, team skills, and operational workflows.',
    summary: 'The single most valuable milestone: turns theoretical vendor claims into empirical operational proof on your own campus before university-wide capital commitment.',
    tasks: [
      { id: 'p3-t1', label: 'Deploy Pilot Building ODN', details: 'Install floor distribution boxes, 1:16 splitters, and horizontal drop fibers in one active academic department.' },
      { id: 'p3-t2', label: 'Install Test ONUs & APs', details: 'Mount panel ONUs in faculty offices; connect high-density Wi-Fi APs and test multi-SSID 802.1Q tagging.' },
      { id: 'p3-t3', label: 'Measure Operational Metrics', details: 'Validate optical power levels (Rx/Tx dBm), packet latency (<2ms), throughput under load, and OMCI provisioning speed.' },
      { id: 'p3-t4', label: 'Staff Operational Training', details: 'Train campus IT technicians on one-click fiber cleaning pens, optical power meters, and NMS alarm management.' }
    ],
    deliverable: 'Pilot Building Performance Report & Certified Operational Runbook',
    toolsRequired: ['Optical Power Meter (1310/1490/1577nm)', 'One-Click LC/APC Fiber Cleaning Pens', 'Network Performance Benchmark (RFC 2544 / iPerf3)'],
    keyRisk: 'Technicians treating fiber like copper (e.g. touching ferrule faces with bare hands).',
    mitigation: 'Implement mandatory "Inspect Before You Connect" optical fiber hygiene certification.'
  },
  {
    id: 'phase-4',
    phaseNumber: 4,
    title: 'Data Center Optical Headend Deployment',
    category: 'Headend',
    weekRange: 'Weeks 8–10',
    estimatedDays: 21,
    milestoneName: 'Milestone 4: Central OLT & Core Fabric Commissioned',
    objective: 'Install and commission redundant carrier-grade OLT chassis, high-density ODF frames, and dual 100GE core links.',
    summary: 'Concentrate network intelligence in the secure central data center: mount dual OLTs with redundant -48V DC power, connect to spine-leaf core switches, and configure NMS.',
    tasks: [
      { id: 'p4-t1', label: 'OLT Chassis Rack Installation', details: 'Mount OLT-A and OLT-B in separate server racks with dual A+B power feeds backed by data center generator & UPS.' },
      { id: 'p4-t2', label: 'ODF Frame & Cable Management', details: 'Install 288-core rack-mount Optical Distribution Frame (ODF) with green LC/APC angled adapters and fiber slack spools.' },
      { id: 'p4-t3', label: 'Core Interconnect & LACP Trunks', details: 'Terminate dual 40GE/100GE uplinks from each OLT to the redundant campus core switches with link aggregation.' },
      { id: 'p4-t4', label: 'Central NMS Initialization', details: 'Deploy high-availability Network Management System (iMaster NCE / NMS) with SNMP, Syslog, and automated daily backup.' }
    ],
    deliverable: 'Commissioned Data Center Headend with Active NMS Console',
    toolsRequired: ['Torque Screwdrivers & Rack Hardware', 'High-Density LC/APC Patch Cords', 'NMS Server Platform / Virtual Appliance'],
    keyRisk: 'Single-point failure at the OLT if power or control boards are not duplicated.',
    mitigation: 'Enforce redundant control boards, dual power modules, and dual-homed LACP uplinks across all headend gear.'
  },
  {
    id: 'phase-5',
    phaseNumber: 5,
    title: 'Passive ODN Outside Plant & Backbone Pulling',
    category: 'Optical Plant',
    weekRange: 'Weeks 11–14',
    estimatedDays: 28,
    milestoneName: 'Milestone 5: 100% Backbone Glass Certified with Bi-Directional OTDR',
    objective: 'Deploy outdoor armored single-mode feeder cables from data center ODF to all campus buildings and ELV risers.',
    summary: 'Blow or pull 48-core / 96-core ITU-T G.652.D armored single-mode fiber through underground ducts, splice into building entrance frames, and certify with OTDR.',
    tasks: [
      { id: 'p5-t1', label: 'Underground Duct Cable Pulling', details: 'Pull loose-tube outdoor armored single-mode cables; maintain continuous pulling tension below manufacturer rating.' },
      { id: 'p5-t2', label: 'Building Entrance Enclosures', details: 'Install IP68 rated outdoor splice enclosures and transition outdoor armored cable to indoor flame-retardant LSZH fiber.' },
      { id: 'p5-t3', label: 'Vertical ELV Riser Cable Pulling', details: 'Install riser-rated multi-core distribution cables in vertical building shafts with strain relief clamps every 2 meters.' },
      { id: 'p5-t4', label: 'Bi-Directional OTDR Certification', details: 'Test every feeder fiber strand at 1310nm and 1550nm/1577nm; verify splice loss < 0.10 dB and absence of macro-bends.' }
    ],
    deliverable: 'Certified Backbone Cable Plant with Full OTDR Trace Archive',
    toolsRequired: ['Dual-Wavelength OTDR (1310/1550/1577nm)', 'Cable Winch & Dynamometer Tension Gauge', 'Visual Fault Locator (VFL Red Laser)'],
    keyRisk: 'Micro-bends or pinching during cable pulling causing localized high optical attenuation.',
    mitigation: 'Use bend-tolerant optical fiber and verify continuous pulling tension with calibrated dynamometer.'
  },
  {
    id: 'phase-6',
    phaseNumber: 6,
    title: 'Floor Splitter Box Splicing & Horizontal Drops',
    category: 'Optical Plant',
    weekRange: 'Weeks 15–17',
    estimatedDays: 21,
    milestoneName: 'Milestone 6: Floor Distribution Boxes & Drop Fibers Complete',
    objective: 'Install Optical Distribution Boxes (ODBs) in floor ELV risers, mount PLC splitters, and run horizontal drop fibers to offices.',
    summary: 'Replace active floor switch closets with compact, unpowered wall-mounted boxes: fusion-splice 1:16 or 1:32 splitters and pull thin bend-insensitive drops to wall boxes.',
    tasks: [
      { id: 'p6-t1', label: 'Mount Floor ODB Enclosures', details: 'Install lockable, fire-rated optical distribution boxes in vertical ELV risers; 0 Watts of electrical power needed.' },
      { id: 'p6-t2', label: 'Precision Fusion Splicing', details: 'Splice feeder fiber into 1:16 or 1:32 Planar Lightwave Circuit (PLC) splitters; verify splice loss < 0.08 dB on fusion splicer.' },
      { id: 'p6-t3', label: 'Pull Office Horizontal Drop Fibers', details: 'Pull 1-core/2-core ITU-T G.657 bend-insensitive optical drops through ceiling trays and wall conduits to 86-boxes.' },
      { id: 'p6-t4', label: 'Field Termination & Power Check', details: 'Terminate drop cables with LC/APC connectors; verify incoming optical power with calibrated power meter (-14 to -22 dBm).' }
    ],
    deliverable: '100% Terminated and Tested Passive Optical Distribution Network (ODN)',
    toolsRequired: ['Core-Alignment Fusion Splicer (Fujikura/Sumitomo)', 'Precision Fiber Cleaver', 'Optical Power Meter with LC/APC Adapter'],
    keyRisk: 'Splitter ports mislabeled, leading to confusion during office activation.',
    mitigation: 'Enforce TIA-606-C standardized color-coded labeling matching GIS fiber database records.'
  },
  {
    id: 'phase-7',
    phaseNumber: 7,
    title: 'ONU Deployment & Zero-Touch OMCI Provisioning',
    category: 'Edge & Service',
    weekRange: 'Weeks 18–19',
    estimatedDays: 14,
    milestoneName: 'Milestone 7: All Optical Terminals Registered & Provisioned',
    objective: 'Install panel ONUs in office wall boxes and configure automated zero-touch provisioning via OMCI service profiles.',
    summary: 'Mount compact flush optical terminals in faculty desks and classrooms. When connected to fiber, ONUs automatically register with the OLT and pull VLAN configurations.',
    tasks: [
      { id: 'p7-t1', label: 'Mount 86-Box Panel ONUs', details: 'Fit compact 4-port Gigabit panel ONUs flush into standard electrical wall boxes; neatly store 0.5m fiber slack inside box.' },
      { id: 'p7-t2', label: 'Deploy Multi-Port PoE ONUs', details: 'Mount 802.3bt PoE++ capable ONUs in ceiling voids or zone boxes for high-density Wi-Fi APs and camera clusters.' },
      { id: 'p7-t3', label: 'Automate OMCI Zero-Touch Profiles', details: 'Push service templates from central NMS: configure 802.1Q VLANs, port speeds, and DBA profiles based on ONU Serial Number.' },
      { id: 'p7-t4', label: 'Verify Downstream Hardware Encryption', details: 'Confirm individual AES-128 downstream encryption key rotation is active between OLT and each registered ONU.' }
    ],
    deliverable: 'Fully Registered and Encrypted Fleet of Campus Optical Network Units',
    toolsRequired: ['ONU Barcode / QR Scanner for Serial Numbers', 'OMCI Service Profile Templates on NMS', 'RJ-45 Ethernet Cable Tester'],
    keyRisk: 'Rogue ONU continuously emitting laser light, jamming the shared upstream PON tree.',
    mitigation: 'Enable automated Rogue ONU Detection and laser shutoff mechanisms in OLT system firmware.'
  },
  {
    id: 'phase-8',
    phaseNumber: 8,
    title: 'Multi-Service Integration (Wi-Fi 7, CCTV, VoIP)',
    category: 'Edge & Service',
    weekRange: 'Weeks 20–21',
    estimatedDays: 14,
    milestoneName: 'Milestone 8: Campus Endpoints & Services Operational',
    objective: 'Connect campus endpoints to ONUs: multi-gigabit Wi-Fi 7 APs, IP security cameras, IP phones, and lab computers.',
    summary: 'Activate user-facing digital services over the optical network: verify IEEE 802.3af/at/bt PoE power delivery, configure multi-SSID VLAN trunks, and prioritize voice/video QoS.',
    tasks: [
      { id: 'p8-t1', label: 'Wi-Fi 7 AP Multi-Gigabit Connectivity', details: 'Plug enterprise Wi-Fi 7 APs into 2.5GE/10GE PoE++ ONU ports; verify tri-band radios receive full 35-60W PoE power.' },
      { id: 'p8-t2', label: 'Multi-SSID 802.1Q Tagged Trunking', details: 'Verify wireless traffic maps correctly: Staff SSID -> VLAN 20, Student SSID -> VLAN 30, Guest SSID -> VLAN 40.' },
      { id: 'p8-t3', label: 'CCTV Security Camera Activation', details: 'Connect IP surveillance cameras on isolated VLAN 50; configure strict firewall policies permitting access only to NVR servers.' },
      { id: 'p8-t4', label: 'VoIP Telephony QoS Prioritization', details: 'Assign DSCP EF (Expedited Forwarding) and 802.1p CoS 5 to VoIP traffic; verify voice calls maintain <20ms jitter.' }
    ],
    deliverable: 'Verified End-to-End Multi-Service Operation Across All Campus Facilities',
    toolsRequired: ['Wi-Fi RF Spectrum Analyzer & Site Survey Software', 'PoE Load Tester (802.3af/at/bt)', 'VoIP Call Quality Analyzer (PESQ / MOS)'],
    keyRisk: 'ONU PoE budget exceeded if multiple high-power PTZ cameras or Wi-Fi 7 APs draw power simultaneously.',
    mitigation: 'Conduct rigorous endpoint power audit matching device peak wattage against the ONU power supply rating.'
  },
  {
    id: 'phase-9',
    phaseNumber: 9,
    title: 'Acceptance, Failover Stress Testing & Cutover',
    category: 'Testing & Migration',
    weekRange: 'Weeks 22–23',
    estimatedDays: 14,
    milestoneName: 'Milestone 9: Formal Acceptance & 100% User Traffic Cutover',
    objective: 'Execute sub-50ms Type B failover testing, 72-hour burn-in stress tests, and transition user traffic building by building.',
    summary: 'Subject the all-optical network to rigorous stress testing: simulate feeder cable cuts to verify sub-50ms automatic failover, test 10G line rate throughput, and cut over live traffic.',
    tasks: [
      { id: 'p9-t1', label: 'Sub-50ms Type B Protection Test', details: 'Physically disconnect primary feeder fiber; verify automatic optical switchover to backup path occurs within 50ms without dropped calls.' },
      { id: 'p9-t2', label: '72-Hour Continuous Burn-In Test', details: 'Run sustained traffic load across all PON trees for 72 hours; verify zero optical CRC bit errors and stable temperature.' },
      { id: 'p9-t3', label: 'Building-by-Building Live Cutover', details: 'Migrate user default gateways from legacy distribution switches to the new optical core during weekend maintenance windows.' },
      { id: 'p9-t4', label: 'Decommission Legacy Floor IDFs', details: 'Power down legacy access switches, disconnect copper patch cables, remove floor UPS batteries, and shut down floor A/C units.' }
    ],
    deliverable: 'Signed Acceptance Certificate & Decommissioning of 10 Floor Switch Rooms',
    toolsRequired: ['Optical Switchover Timer & Packet Capture Analyzer', 'Load Generator Appliance', 'Decommissioning Punch List & E-Waste Protocol'],
    keyRisk: 'Unplanned downtime during gateway cutover if VLAN subnets or DHCP helper addresses are misconfigured.',
    mitigation: 'Maintain legacy and optical networks in parallel dual-homed mode on the same core switch prior to final cutover.'
  },
  {
    id: 'phase-10',
    phaseNumber: 10,
    title: 'Day-2 Operations, Telemetry & Space Reclaim',
    category: 'Operations',
    weekRange: 'Week 24+',
    estimatedDays: 30,
    milestoneName: 'Milestone 10: Institutional All-Optical Steady-State Certified',
    objective: 'Transition to streamlined central management, proactive optical telemetry, staff certification, and academic space repurposing.',
    summary: 'Enjoy the long-term operational dividends: 72.8% reduction in routine maintenance hours, 60 m² of reclaimed real estate returned to teaching, and central proactive monitoring.',
    tasks: [
      { id: 'p10-t1', label: 'Proactive Optical Telemetry Alerting', details: 'Set proactive NMS threshold alerts for optical power degradation (e.g. Rx drops below -23 dBm) before users experience packet loss.' },
      { id: 'p10-t2', label: 'Reclaim Floor Space for Academic Use', details: 'Convert the 10 vacated IDF closets into faculty research offices, student project rooms, or academic seminar spaces.' },
      { id: 'p10-t3', label: 'Spares Inventory Depot Verification', details: 'Stock pre-provisioned spare ONUs (5% buffer) and spare OLT line cards in local IT depot for instant 15-minute replacement.' },
      { id: 'p10-t4', label: 'Executive TCO Audit & Energy Validation', details: 'Validate actual electricity consumption and technician hour savings against pre-deployment TCO financial projections.' }
    ],
    deliverable: 'Annual All-Optical Operations Benchmark & Reclaimed Space Documentation',
    toolsRequired: ['NMS Historical Analytics & SLA Dashboard', 'Central Spares Depot & Hot-Swap Station', 'Campus Facility Asset Management System'],
    keyRisk: 'Neglecting periodic optical cleaning leading to gradual dirt accumulation on ODF patch ports.',
    mitigation: 'Establish biannual optical port inspection schedule using digital inspection microscopes.'
  }
];

export const DeploymentLifecycleRoadmap: React.FC = () => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('phase-1');
  const [viewMode, setViewMode] = useState<'journey' | 'gantt' | 'checklist'>('journey');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  
  // Persistence key
  const STORAGE_KEY = 'all_optical_deployment_progress_v1';
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Project Info State
  const [projectName, setProjectName] = useState<string>('Campus FTTO All-Optical Modernization');
  const [institutionName, setInstitutionName] = useState<string>('The Islamia University of Bahawalpur');
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Team Share State
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [shareTab, setShareTab] = useState<'generate' | 'join'>('generate');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [inputShareCode, setInputShareCode] = useState<string>('');

  // Track user project tasks completion
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.completedTasks) {
          return parsed.completedTasks;
        }
      }
    } catch (e) {
      console.warn('Could not load saved deployment progress from localStorage', e);
    }
    return {
      'p1-t1': true,
      'p1-t2': true,
      'p1-t3': true,
      'p1-t4': true,
      'p2-t1': true,
      'p2-t2': true,
      'p2-t3': true,
      'p3-t1': true,
      'p3-t2': true
    };
  });

  // Check for shared URL token on initial mount
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const shareData = searchParams.get('share_data') || (window.location.hash.includes('share=') ? window.location.hash.split('share=')[1] : null);

      if (shareData) {
        const decodedString = decodeURIComponent(escape(atob(shareData)));
        const parsed = JSON.parse(decodedString);

        if (parsed.t && Array.isArray(parsed.t)) {
          const taskMap: Record<string, boolean> = {};
          parsed.t.forEach((id: string) => {
            taskMap[id] = true;
          });
          setCompletedTasks(taskMap);
          if (parsed.p) setProjectName(parsed.p);
          if (parsed.i) setInstitutionName(parsed.i);

          setSaveNotification(`Successfully loaded shared team project "${parsed.p || 'All-Optical Deployment'}"!`);
          setTimeout(() => setSaveNotification(null), 5000);

          // Clean up URL parameter cleanly without reloading
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        }
      }
    } catch (e) {
      console.warn('Could not parse share_data from URL', e);
    }
  }, []);

  // Auto-save to localStorage whenever completedTasks changes
  useEffect(() => {
    try {
      const payload = {
        projectName,
        institutionName,
        completedTasks,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Could not save progress to localStorage', e);
    }
  }, [completedTasks, projectName, institutionName]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const getSharePayload = () => {
    return {
      p: projectName,
      i: institutionName,
      t: Object.keys(completedTasks).filter(k => completedTasks[k]),
      d: Date.now()
    };
  };

  const getShareToken = () => {
    try {
      const payload = getSharePayload();
      return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    } catch (e) {
      return '';
    }
  };

  const getShareUrl = () => {
    const token = getShareToken();
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}${window.location.pathname}?share_data=${token}`;
  };

  const handleCopyLink = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleCopyCode = () => {
    const token = getShareToken();
    navigator.clipboard.writeText(token).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    });
  };

  const handleJoinProject = (codeOrUrl: string) => {
    if (!codeOrUrl.trim()) return;
    try {
      let rawToken = codeOrUrl.trim();
      if (rawToken.includes('share_data=')) {
        rawToken = rawToken.split('share_data=')[1].split('&')[0];
      } else if (rawToken.includes('share=')) {
        rawToken = rawToken.split('share=')[1].split('&')[0];
      }

      const decodedString = decodeURIComponent(escape(atob(rawToken)));
      const parsed = JSON.parse(decodedString);

      if (parsed.t && Array.isArray(parsed.t)) {
        const taskMap: Record<string, boolean> = {};
        parsed.t.forEach((id: string) => {
          taskMap[id] = true;
        });
        setCompletedTasks(taskMap);
        if (parsed.p) setProjectName(parsed.p);
        if (parsed.i) setInstitutionName(parsed.i);

        setIsShareModalOpen(false);
        setInputShareCode('');
        setSaveNotification(`Joined team project "${parsed.p}" successfully!`);
        setTimeout(() => setSaveNotification(null), 5000);
      } else {
        alert('Invalid share code or URL format. Please ensure you pasted the complete code.');
      }
    } catch (err) {
      alert('Could not decode the team share code. Please check that the link or code is complete.');
    }
  };

  const selectedPhase = DEPLOYMENT_PHASES.find(p => p.id === selectedPhaseId) || DEPLOYMENT_PHASES[0];

  // Overall completion metrics
  const totalTasksCount = DEPLOYMENT_PHASES.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const projectProgressPct = Math.round((completedCount / totalTasksCount) * 100);

  const categories = ['All', 'Planning', 'Headend', 'Optical Plant', 'Edge & Service', 'Testing & Migration', 'Operations'];

  const filteredPhases = DEPLOYMENT_PHASES.filter(p => {
    if (categoryFilter === 'All') return true;
    return p.category === categoryFilter;
  });

  const handlePrint = () => {
    window.print();
  };

  // Export JSON file
  const handleExportJson = () => {
    const exportData = {
      project: {
        name: projectName,
        institution: institutionName,
        leadEngineer: 'Mr. Zeeshan Javed, AI System Lead Engineer, Directorate of IT, IUB',
        technicalReference: 'Engr. Rizwan Majeed, Director IT, Institute of Space Technology (IST)',
        architectureFramework: 'FTTO / POL Modern Campus All-Optical Reference Framework (2026)',
        exportTimestamp: new Date().toISOString(),
        formattedDate: new Date().toLocaleString()
      },
      progress: {
        totalPhases: 10,
        overallCompletionPercentage: projectProgressPct,
        completedTasksCount: completedCount,
        totalTasksCount: totalTasksCount,
        readinessStatus: projectProgressPct >= 90 ? 'Commissioned' : projectProgressPct >= 50 ? 'Deployment In Progress' : 'Early Phase Planning'
      },
      phasesSummary: DEPLOYMENT_PHASES.map(phase => {
        const pTasks = phase.tasks;
        const pCompleted = pTasks.filter(t => completedTasks[t.id]).length;
        return {
          phaseNumber: phase.phaseNumber,
          title: phase.title,
          category: phase.category,
          weekRange: phase.weekRange,
          milestoneName: phase.milestoneName,
          status: pCompleted === pTasks.length ? 'Completed' : pCompleted > 0 ? 'In Progress' : 'Pending',
          completedTasks: pCompleted,
          totalTasks: pTasks.length,
          tasks: pTasks.map(t => ({
            id: t.id,
            label: t.label,
            details: t.details,
            completed: !!completedTasks[t.id]
          }))
        };
      }),
      completedTasks: completedTasks
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    const safeName = projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${safeName}-deployment-progress-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setSaveNotification('Project progress successfully exported as JSON file!');
    setTimeout(() => setSaveNotification(null), 4000);
  };

  // Import JSON file
  const handleImportJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        if (parsed.completedTasks && typeof parsed.completedTasks === 'object') {
          setCompletedTasks(parsed.completedTasks);
          if (parsed.project?.name) setProjectName(parsed.project.name);
          if (parsed.project?.institution) setInstitutionName(parsed.project.institution);

          setSaveNotification('Deployment project progress restored from JSON file!');
          setTimeout(() => setSaveNotification(null), 4000);
        } else {
          alert('Invalid file format. Please upload a valid All-Optical deployment progress JSON file.');
        }
      } catch (err) {
        alert('Failed to parse the JSON file. Please ensure it is a valid JSON document.');
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = '';
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all tasks? This will clear all checked items.')) {
      setCompletedTasks({});
      setSaveNotification('Progress reset to 0%.');
      setTimeout(() => setSaveNotification(null), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>End-to-End Engineering Implementation Blueprint</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>All-Optical Deployment Lifecycle Roadmap</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            From initial site survey and loss budget modeling to physical outside plant pulling, OLT headend provisioning, sub-50ms Type B failover testing, and floor switch closet decommissioning.
          </p>
        </div>

        {/* View Switcher, JSON Export/Import & Print */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Hidden file input for JSON import */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJson}
            accept=".json,application/json"
            className="hidden"
          />

          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setViewMode('journey')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'journey'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Interactive Journey
            </button>
            <button
              onClick={() => setViewMode('gantt')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'gantt'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Timeline & Schedule
            </button>
            <button
              onClick={() => setViewMode('checklist')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'checklist'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Punch List Audit
            </button>
          </div>

          {/* Team Share Button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            title="Generate shareable link or code for team engineers"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Team Share</span>
          </button>

          {/* JSON Export Button */}
          <button
            onClick={handleExportJson}
            title="Save and export project progress as JSON file"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          {/* JSON Import Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Load saved progress from a JSON file"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Load JSON</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={handleResetProgress}
            title="Reset all tasks"
            className="p-2 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handlePrint}
            title="Export or print deployment roadmap"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print View</span>
          </button>
        </div>
      </div>

      {/* Save Notification Toast */}
      {saveNotification && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between animate-fadeIn shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{saveNotification}</span>
          </div>
          <span className="text-[10px] text-emerald-300 font-mono">Local Storage Synced</span>
        </div>
      )}

      {/* Progress & Executive KPI Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold uppercase tracking-wider text-slate-200">
              Campus Project Execution Progress:
            </span>
            <span className="font-mono text-cyan-400 font-bold tabular-nums">
              {completedCount} / {totalTasksCount} Engineering Tasks Completed ({projectProgressPct}%)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 flex">
            <div
              style={{ width: `${projectProgressPct}%` }}
              className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-500"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
            <span>Phase 1: Site Survey (Day 0)</span>
            <span>Phase 3: Pilot Validation</span>
            <span>Phase 5: ODN Certified</span>
            <span>Phase 9: Closets Removed</span>
            <span>Phase 10: Day-2 Ops</span>
          </div>
        </div>

        <div className="md:col-span-4 flex items-center justify-around border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 pl-0 md:pl-6">
          <div className="text-center">
            <span className="text-[11px] text-slate-400 block">Total Horizon</span>
            <span className="text-xl font-bold font-mono text-white mt-0.5 block">24 Weeks</span>
            <span className="text-[10px] text-cyan-300 font-mono">6 Months Turnkey</span>
          </div>
          <div className="text-center">
            <span className="text-[11px] text-slate-400 block">Critical Gate</span>
            <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">Phase 3</span>
            <span className="text-[10px] text-slate-400 font-mono">Pilot Building Sign-Off</span>
          </div>
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE JOURNEY MAP */}
      {viewMode === 'journey' && (
        <div className="space-y-6">
          {/* Horizontal Scrubber / Phase Selection Rail */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                Deployment Phases (Click phase to inspect details):
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2 py-0.5 rounded text-[11px] cursor-pointer transition-colors ${
                      categoryFilter === cat
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Phase Node Pills Slider */}
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
              {DEPLOYMENT_PHASES.map((phase) => {
                const isSelected = phase.id === selectedPhase.id;
                const phaseCompleted = phase.tasks.every(t => completedTasks[t.id]);
                const someCompleted = phase.tasks.some(t => completedTasks[t.id]);

                return (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhaseId(phase.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 shadow-lg text-white'
                        : phaseCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300 hover:border-emerald-400'
                        : someCompleted
                        ? 'bg-slate-900 border-cyan-500/30 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`font-mono text-xs font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                        P{phase.phaseNumber}
                      </span>
                      {phaseCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">{phase.weekRange.split(' ')[1]}</span>
                      )}
                    </div>
                    <div className="text-[11px] font-semibold truncate mt-1">{phase.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deep-Dive Phase Inspection Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
            {/* Phase Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 text-xs">
                  <span className="font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    PHASE {selectedPhase.phaseNumber} OF 10
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-300 font-medium">{selectedPhase.category}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-400 font-mono">{selectedPhase.weekRange} ({selectedPhase.estimatedDays} Days)</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {selectedPhase.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed max-w-4xl pt-1">
                  {selectedPhase.summary}
                </p>
              </div>

              {/* Milestone Badge */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-right self-start sm:self-auto space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 justify-end">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Gate Milestone</span>
                </div>
                <div className="text-xs font-bold text-white max-w-xs">{selectedPhase.milestoneName}</div>
              </div>
            </div>

            {/* 2-Column Grid: Tasks & Tools / Deliverable */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Tasks Punch List */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Engineering Tasks & Checkpoints
                  </span>
                  <span className="text-[11px] text-slate-400">Click to track completion</span>
                </div>

                <div className="space-y-2.5">
                  {selectedPhase.tasks.map((task) => {
                    const isDone = !!completedTasks[task.id];
                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                          isDone
                            ? 'bg-cyan-950/20 border-cyan-500/30 text-slate-200'
                            : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="pt-0.5 shrink-0">
                          {isDone ? (
                            <CheckSquare className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <div className={`text-xs font-bold ${isDone ? 'text-white' : 'text-slate-200'}`}>
                            {task.label}
                          </div>
                          <div className="text-xs text-slate-400 leading-relaxed">
                            {task.details}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Deliverables, Tools, and Risk Mitigations */}
              <div className="lg:col-span-5 space-y-4">
                {/* Deliverable Card */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-1.5">
                  <div className="font-bold text-emerald-400 flex items-center gap-2 text-xs uppercase tracking-wider">
                    <FileCheck className="w-4 h-4" />
                    <span>Formal Sign-Off Deliverable</span>
                  </div>
                  <p className="text-slate-200 font-medium leading-relaxed">
                    {selectedPhase.deliverable}
                  </p>
                </div>

                {/* Tools & Instrumentation */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-slate-300 uppercase tracking-wider block text-[11px]">
                    Specialized Equipment & Tools Required:
                  </span>
                  <ul className="space-y-1.5 text-slate-400 text-xs">
                    {selectedPhase.toolsRequired.map((tool, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risk & Mitigation Warning */}
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2 text-xs">
                  <div className="font-bold text-amber-300 flex items-center gap-2 text-[11px] uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Phase Design Risk & Mitigation</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed">
                    <strong className="text-amber-200">Risk:</strong> {selectedPhase.keyRisk}
                  </div>
                  <div className="text-slate-300 leading-relaxed">
                    <strong className="text-emerald-300">Mitigation:</strong> {selectedPhase.mitigation}
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Controls between Phases */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs">
              <button
                disabled={selectedPhase.phaseNumber === 1}
                onClick={() => {
                  const prev = DEPLOYMENT_PHASES.find(p => p.phaseNumber === selectedPhase.phaseNumber - 1);
                  if (prev) setSelectedPhaseId(prev.id);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  selectedPhase.phaseNumber === 1
                    ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Phase</span>
              </button>

              <span className="text-slate-500 font-mono">
                {selectedPhase.phaseNumber} of 10
              </span>

              <button
                disabled={selectedPhase.phaseNumber === 10}
                onClick={() => {
                  const next = DEPLOYMENT_PHASES.find(p => p.phaseNumber === selectedPhase.phaseNumber + 1);
                  if (next) setSelectedPhaseId(next.id);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  selectedPhase.phaseNumber === 10
                    ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600'
                    : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border-cyan-500/30 font-semibold'
                }`}
              >
                <span>Next Phase</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: GANTT SCHEDULE & TIMELINE VIEW */}
      {viewMode === 'gantt' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                24-Week Turnkey Implementation Schedule
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Concurrent execution schedule showing workstream overlap between civil pathways, central headend build, and ODN splicing.
              </p>
            </div>
            <span className="text-cyan-400 font-mono font-medium">Standard 6-Month Campus Model</span>
          </div>

          <div className="space-y-3 overflow-x-auto">
            {/* Timeline Header (Weeks 1 to 24) */}
            <div className="min-w-[700px] flex items-center text-[10px] font-mono text-slate-500 pb-2 border-b border-slate-800">
              <div className="w-56 shrink-0 font-sans text-slate-400">Phase Workstream</div>
              <div className="flex-1 grid grid-cols-12 text-center">
                <span>W1-2</span>
                <span>W3-4</span>
                <span>W5-6</span>
                <span>W7-8</span>
                <span>W9-10</span>
                <span>W11-12</span>
                <span>W13-14</span>
                <span>W15-16</span>
                <span>W17-18</span>
                <span>W19-20</span>
                <span>W21-22</span>
                <span>W23-24</span>
              </div>
            </div>

            {/* Gantt Rows */}
            {DEPLOYMENT_PHASES.map((p) => {
              // Calculate start week & duration
              // Parsing weeks e.g. "Weeks 1–2", "Weeks 11–14", "Week 24+"
              let startCol = 0;
              let spanCols = 2;

              if (p.phaseNumber === 1) { startCol = 0; spanCols = 1; }
              else if (p.phaseNumber === 2) { startCol = 1; spanCols = 1; }
              else if (p.phaseNumber === 3) { startCol = 2; spanCols = 2; }
              else if (p.phaseNumber === 4) { startCol = 3; spanCols = 2; }
              else if (p.phaseNumber === 5) { startCol = 5; spanCols = 2; }
              else if (p.phaseNumber === 6) { startCol = 7; spanCols = 2; }
              else if (p.phaseNumber === 7) { startCol = 8; spanCols = 1; }
              else if (p.phaseNumber === 8) { startCol = 9; spanCols = 1; }
              else if (p.phaseNumber === 9) { startCol = 10; spanCols = 1; }
              else { startCol = 11; spanCols = 1; }

              return (
                <div
                  key={p.id}
                  onClick={() => { setSelectedPhaseId(p.id); setViewMode('journey'); }}
                  className="min-w-[700px] flex items-center text-xs py-2 hover:bg-slate-800/30 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="w-56 shrink-0 pr-3 font-semibold text-white truncate flex items-center gap-2">
                    <span className="font-mono text-cyan-400 text-xs">P{p.phaseNumber}</span>
                    <span className="truncate">{p.title}</span>
                  </div>

                  <div className="flex-1 grid grid-cols-12 gap-1 h-7 bg-slate-950 rounded-lg p-1 border border-slate-800/80">
                    <div
                      style={{
                        gridColumnStart: startCol + 1,
                        gridColumnEnd: `span ${spanCols}`
                      }}
                      className={`h-full rounded-md text-[10px] font-mono font-bold flex items-center justify-center text-slate-950 truncate px-1 shadow ${
                        p.phaseNumber === 3
                          ? 'bg-emerald-400'
                          : p.phaseNumber === 4
                          ? 'bg-cyan-400'
                          : p.phaseNumber === 9
                          ? 'bg-amber-400'
                          : 'bg-teal-400'
                      }`}
                    >
                      {p.weekRange}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: FULL CHECKLIST PUNCH LIST AUDIT */}
      {viewMode === 'checklist' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Full 40-Point Engineering Punch List & Verification Audit
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Complete punch list covering every phase from Survey to Day-2 Operations. Use this to audit contractor compliance before release of payment.
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer hover:bg-cyan-300"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Punch List</span>
            </button>
          </div>

          <div className="space-y-6">
            {DEPLOYMENT_PHASES.map((phase) => (
              <div key={phase.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">Phase {phase.phaseNumber}</span>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{phase.title}</h4>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{phase.weekRange}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {phase.tasks.map((task) => {
                    const isDone = !!completedTasks[task.id];
                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-colors ${
                          isDone
                            ? 'bg-cyan-950/20 border-cyan-500/30 text-slate-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="pt-0.5 shrink-0">
                          {isDone ? (
                            <CheckSquare className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                        <div className="text-xs space-y-0.5">
                          <span className="font-bold text-white block">{task.label}</span>
                          <span className="text-slate-400 text-[11px] block">{task.details}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-5 text-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Team Project Timeline Share</h3>
                  <p className="text-xs text-slate-400">Collaborate with fellow campus network engineers</p>
                </div>
              </div>

              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
              <button
                onClick={() => setShareTab('generate')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-colors cursor-pointer text-center ${
                  shareTab === 'generate'
                    ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Generate Link & Code
              </button>
              <button
                onClick={() => setShareTab('join')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-colors cursor-pointer text-center ${
                  shareTab === 'join'
                    ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Join Team Project / Enter Code
              </button>
            </div>

            {/* Tab 1: Generate Link & Code */}
            {shareTab === 'generate' && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-teal-400" />
                      <span>Shareable Team URL</span>
                    </span>
                    <span className="text-[10px] text-teal-400 font-mono">Instant Auto-Load</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={getShareUrl()}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 font-mono truncate select-all"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Sending this link allows another engineer to open this exact timeline with all {completedCount} tasks preserved.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Project Sync Token / Code</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Portability Token</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={getShareToken()}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 font-mono truncate select-all"
                    />
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>State is client-side encoded and portable. No third-party account required.</span>
                </div>
              </div>
            )}

            {/* Tab 2: Join Team Project */}
            {shareTab === 'join' && (
              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Paste Team Share URL or Sync Token</label>
                  <textarea
                    rows={3}
                    placeholder="Paste the share link or sync code provided by your lead engineer..."
                    value={inputShareCode}
                    onChange={(e) => setInputShareCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>

                <button
                  onClick={() => handleJoinProject(inputShareCode)}
                  disabled={!inputShareCode.trim()}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    inputShareCode.trim()
                      ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-950/40'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Load & Synchronize Team Timeline</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
