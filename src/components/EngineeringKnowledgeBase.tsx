import React, { useState, useMemo } from 'react';
import {
  FileText,
  BookOpen,
  Search,
  CheckCircle2,
  Bookmark,
  Layers,
  Zap,
  Shield,
  Server,
  Calculator,
  Terminal,
  Download,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

interface KnowledgeItem {
  id: string;
  category: 'Standards' | 'Design Patterns' | 'Best Practices' | 'Formulas';
  standardRef?: string;
  title: string;
  subtitle: string;
  summary: string;
  keySpecs: { label: string; value: string }[];
  deepDive: string[];
  cliSample?: string;
  tags: string[];
}

const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: 'itu-g9807',
    category: 'Standards',
    standardRef: 'ITU-T G.9807.1 (2016 / Amd 2020)',
    title: '10-Gigabit-Capable Symmetric Passive Optical Networks (XGS-PON)',
    subtitle: 'Primary Standard for Modern All-Optical Enterprise & Campus Networks',
    summary:
      'Specifies symmetric 9.95328 Gbps transmission in both downstream and upstream directions over point-to-multipoint optical distribution networks with sub-millisecond DBA scheduling.',
    keySpecs: [
      { label: 'Downstream Wavelength', value: '1577 nm (1575–1580 nm)' },
      { label: 'Upstream Wavelength', value: '1270 nm (1260–1280 nm)' },
      { label: 'Nominal Line Rate', value: '9.95328 Gbps Symmetric' },
      { label: 'Optical Budget Class', value: 'Class N1 (29 dB) / N2 (31 dB) / E1 (33 dB)' },
      { label: 'Max Split Ratio', value: '1:64 or 1:128 (Typically 1:32 on Campus)' },
      { label: 'Coexistence', value: 'WDM1r Filter (Coexists with GPON & 50G-PON)' }
    ],
    deepDive: [
      'XGS-PON uses wavelength division multiplexing (WDM) to operate simultaneously on the same single-mode glass strand as legacy GPON without interference.',
      'Framing protocol employs XGEM (XG-PON Encapsulation Method) with hardware AES-128 encryption on each XGEM port ID for enterprise tenant privacy.',
      'Dynamic Bandwidth Allocation (DBA) SR-DBA (Status-Reporting DBA) reports buffer occupancy every 125 microseconds, guaranteeing microsecond latency for real-time VoIP and 4K video streams.'
    ],
    cliSample: `! Huawei EA5800 XGS-PON Commissioning
interface xpon 0/1
 port 0 xg-pon
 ont add 0 1 sn-auth "48575443DEADBEEF" omci ont-lineprofile-id 20 ont-srvprofile-id 20
 ont port native-vlan 0 1 eth 1 vlan 20 priority 5`,
    tags: ['XGS-PON', 'ITU-T', '10G', 'Optics', 'DBA', 'Symmetric']
  },
  {
    id: 'itu-g657',
    category: 'Standards',
    standardRef: 'ITU-T G.657.A2 & B3 (2016)',
    title: 'Bending-Loss Insensitive Single-Mode Optical Fiber for Access Networks',
    subtitle: 'Mandatory Physical Glass Standard for Campus Corridors and Desk ONUs',
    summary:
      'Specifies ultra-low macrobending attenuation glass fibers designed specifically for tight bends inside office trunking, electrical shafts, and 86-type wall backboxes without signal degradation.',
    keySpecs: [
      { label: 'G.657.A2 Min Bend Radius', value: '7.5 mm (1 turn at 1550nm: <0.5 dB loss)' },
      { label: 'G.657.B3 Min Bend Radius', value: '5.0 mm (1 turn at 1550nm: <0.15 dB loss)' },
      { label: 'Mode Field Diameter', value: '8.6 to 9.2 µm @ 1310 nm' },
      { label: 'Attenuation @ 1310nm', value: '≤ 0.35 dB / km' },
      { label: 'Attenuation @ 1550nm', value: '≤ 0.22 dB / km' },
      { label: 'Backward Compatibility', value: '100% Splicing Compatible with G.652.D' }
    ],
    deepDive: [
      'Standard legacy G.652.D fiber requires a minimum 30 mm bend radius; bending below this causes severe light leakage (>3 dB) at 1577nm.',
      'G.657.A2 employs a specialized fluorine-doped low-index trench in the cladding that reflects escaping light back into the 9µm core, allowing sharp 90-degree turns in surface conduit.',
      'All desk-side patch cables and riser drop cords in modern FTTO must be G.657.A2 or G.657.B3 to guarantee zero micro-bend attenuation over 25+ years.'
    ],
    tags: ['Fiber Physics', 'G.657', 'Bending Radius', 'LSZH', 'Cable Plant']
  },
  {
    id: 'ieee-8023bt',
    category: 'Standards',
    standardRef: 'IEEE 802.3bt Type 4 (90W PoE++)',
    title: '4-Pair Power over Ethernet Delivery for Hybrid Photo-Electric Networks',
    subtitle: 'Standard for Powering Remote ONUs, Wi-Fi 7 APs, and PTZ Cameras',
    summary:
      'Enables delivery of up to 90 Watts of direct DC electrical power over 4 twisted pairs alongside optical fiber in hybrid composite cabling, eliminating local 220V power outlets at ceiling AP locations.',
    keySpecs: [
      { label: 'Max PSE Output Power', value: '90.0 Watts (Type 4)' },
      { label: 'Min PD Received Power', value: '71.3 Watts (at 100 meters)' },
      { label: 'Voltage Range', value: '52.0 V to 57.0 V DC' },
      { label: 'Cable Conductors', value: 'All 4 Pairs (Pairs 1-2, 3-6, 4-5, 7-8)' },
      { label: 'Target Devices', value: 'Wi-Fi 7 Tri-Band APs, 4K Video Bars, Digital Signage' }
    ],
    deepDive: [
      'Hybrid optical cables combine 2 strands of bend-insensitive single-mode glass with 2 copper conductor wires (18 AWG to 14 AWG) inside a single LSZH flame-retardant jacket.',
      'The central OLT chassis or dedicated centralized DC power supply delivers remote centralized backup power with battery bank support in the central data center.',
      'Eliminates the need for licensed electrical contractors to install 220V AC power plugs above false ceilings or exterior campus light poles.'
    ],
    tags: ['PoE++', 'IEEE 802.3bt', 'Hybrid Cable', 'Wi-Fi 7', 'Remote Power']
  },
  {
    id: 'type-b-protection',
    category: 'Design Patterns',
    standardRef: 'ITU-T G.984 / G.987 Type B Architecture',
    title: 'Type B Dual-OLT Redundancy & Sub-50ms Optical Protection Switching',
    subtitle: 'High-Availability Architecture for Hospitals, Data Centers & Mission-Critical OT',
    summary:
      'Employs 2:N optical splitters connected to two separate OLT PON ports residing in redundant line cards or physically separated data centers, providing automatic fiber cut failover in under 50 milliseconds.',
    keySpecs: [
      { label: 'Switchover Time', value: '< 50 ms (Zero Call Drops / Zero Session Loss)' },
      { label: 'Splitter Type', value: '2:16, 2:32, or 2:64 Balanced PLC' },
      { label: 'Protected Segment', value: 'Backbone Feeder Fiber & OLT Transceiver' },
      { label: 'Unprotected Segment', value: 'Drop Cable from Splitter to ONU' },
      { label: 'Hardware Requirement', value: 'Dual Active-Standby OLT PON Ports' }
    ],
    deepDive: [
      'When an optical power loss of signal (LOS) is detected on the primary feeder cable, the OLT automatically activates the secondary laser transmitter.',
      'All registered ONUs switch their transmitter timing seamlessly to the secondary PON port using upstream synchronization frames.',
      'Ideal for hospital PACS radiology networks, university examination servers, and industrial SCADA robotic lines where fiber cuts cannot interrupt operations.'
    ],
    cliSample: `! Cisco IOS-XE PON Redundancy Setup
interface Pon-Protection-Group 1
 primary TenGigabitEthernet1/0/1
 backup TenGigabitEthernet2/0/1
 switchover-threshold optical-power -27
 revertive-mode disable`,
    tags: ['Redundancy', 'Type B', 'High Availability', 'Sub-50ms', 'Protection']
  },
  {
    id: 'zero-idf-pattern',
    category: 'Design Patterns',
    standardRef: 'FTTO Green Campus Architectural Model',
    title: 'Zero-IDF All-Optical Architecture (Eliminating Floor Telecom Closets)',
    subtitle: 'Replacing Active Floor Switches with 0-Watt Passive Distribution Splitters',
    summary:
      'Eliminates all distributed 48-port active access switches and floor intermediate distribution frames (IDFs), consolidating switching into the central data center and deploying passive optical splitters in vertical shafts.',
    keySpecs: [
      { label: 'Floor Real Estate Saved', value: '10 m² to 15 m² per floor (Returned to Core Business)' },
      { label: 'Corridor Power Saved', value: '0 Watts (Replaces 150W-350W per switch rack)' },
      { label: 'Cooling Requirement', value: '0 BTU/hr (Zero Air Conditioning in Shafts)' },
      { label: 'Lifespan of ODN Glass', value: '30+ Years (Silicon Dioxide Glass does not age)' },
      { label: 'Upgrade Path', value: 'Swap Headend Optics (10G -> 50G -> 100G without recabling)' }
    ],
    deepDive: [
      'Traditional campus networks require dedicated air-conditioned switch closets every 90 meters due to copper Cat6 Ethernet 100-meter physical length limitations.',
      'All-optical fiber reaches 20 kilometers with negligible attenuation, enabling centralized data center aggregation directly to office desks.',
      'Reduces campus network carbon footprint by over 70% and cuts annual recurring electricity bills by thousands of dollars.'
    ],
    tags: ['Zero-IDF', 'FTTO', 'Green Network', 'Energy Efficiency', 'TCO']
  },
  {
    id: 'optical-loss-budget',
    category: 'Formulas',
    standardRef: 'ITU-T G.984.2 & TIA-568.3-D',
    title: 'Comprehensive Optical Link Loss Budget Formula',
    subtitle: 'Mathematical Model for Calculating Worst-Case Passive ODN Attenuation',
    summary:
      'Calculates total decibel (dB) attenuation between OLT transmitter and ONU receiver: fiber length loss, fusion splices, bulkhead connectors, passive splitter insertion loss, and engineering safety margin.',
    keySpecs: [
      { label: 'Core Formula', value: 'Total Loss = (L × α) + (N_splice × 0.05) + (N_conn × 0.25) + SplitLoss + Margin' },
      { label: '1:2 Split Loss', value: '3.5 dB (Theoretical 3.01 dB + 0.49 dB insertion)' },
      { label: '1:4 Split Loss', value: '7.2 dB' },
      { label: '1:8 Split Loss', value: '10.5 dB' },
      { label: '1:16 Split Loss', value: '13.8 dB' },
      { label: '1:32 Split Loss', value: '17.2 dB' }
    ],
    deepDive: [
      'Optical Link Budget = P_tx(min) - P_rx(sensitivity). For XGS-PON Class N1, the total allowable link loss is 29.0 dB.',
      'Always maintain a minimum engineering safety margin of 3.0 dB to account for future fiber re-splicing, patch cord bending, and transmitter laser aging over 15 years.',
      'Cleanliness rule: A single fingerprint or dust speck on an SC/APC ferrule can introduce 1.5 dB to 4.0 dB of uncalculated insertion loss.'
    ],
    tags: ['Calculation', 'Formula', 'Loss Budget', 'Splitter Loss', 'Decibels']
  }
];

export const EngineeringKnowledgeBase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemId, setSelectedItemId] = useState<string>('itu-g9807');
  const [copiedCli, setCopiedCli] = useState<boolean>(false);

  // Interactive Loss Calculator State
  const [calcKm, setCalcKm] = useState<number>(2.5);
  const [calcSplitter, setCalcSplitter] = useState<number>(16); // 2, 4, 8, 16, 32, 64
  const [calcConnectors, setCalcConnectors] = useState<number>(4);
  const [calcSplices, setCalcSplices] = useState<number>(6);
  const [calcTxPower, setCalcTxPower] = useState<number>(3.5);

  const categories = ['All', 'Standards', 'Design Patterns', 'Best Practices', 'Formulas'];

  const filteredItems = useMemo(() => {
    return KNOWLEDGE_ITEMS.filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.standardRef && item.standardRef.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const selectedItem = useMemo(() => {
    return KNOWLEDGE_ITEMS.find(i => i.id === selectedItemId) || filteredItems[0] || KNOWLEDGE_ITEMS[0];
  }, [selectedItemId, filteredItems]);

  // Live Formula Calculator Computation
  const calculatedLossResult = useMemo(() => {
    const fiberLoss = calcKm * 0.35;
    const connLoss = calcConnectors * 0.25;
    const spliceLoss = calcSplices * 0.05;
    const splitLossMap: Record<number, number> = {
      2: 3.5,
      4: 7.2,
      8: 10.5,
      16: 13.8,
      32: 17.2,
      64: 20.6
    };
    const splitLoss = splitLossMap[calcSplitter] || 13.8;
    const safetyMargin = 3.0;

    const totalLoss = Number((fiberLoss + connLoss + spliceLoss + splitLoss + safetyMargin).toFixed(2));
    const netRx = Number((calcTxPower - totalLoss).toFixed(2));
    const isPass = netRx >= -24.0;

    return {
      fiberLoss: Number(fiberLoss.toFixed(2)),
      connLoss: Number(connLoss.toFixed(2)),
      spliceLoss: Number(spliceLoss.toFixed(2)),
      splitLoss,
      safetyMargin,
      totalLoss,
      netRx,
      isPass
    };
  }, [calcKm, calcSplitter, calcConnectors, calcSplices, calcTxPower]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Engineering Knowledge Base · Telecommunications Reference Library</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>All-Optical Campus Architecture Standards & Design Patterns</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl">
            Quick-access international telecom specifications, ITU-T G.9807 (XGS-PON), G.657 bend-insensitive glass standards, Type B failover patterns, and real-time optical loss calculators.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Knowledge Summary</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search standards, ITU-T, formulas..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* MAIN TWO-COLUMN SPLIT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Article List (4 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredItems.map(item => {
            const isSelected = selectedItem.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItemId(item.id)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400 ring-2 ring-cyan-400/80 shadow-xl shadow-cyan-950/60'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-semibold">
                    {item.category}
                  </span>
                  {item.standardRef && (
                    <span className="text-amber-300/90 font-bold">{item.standardRef.split(' (')[0]}</span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white mt-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>

                <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-slate-800/80">
                  {item.tags.map(t => (
                    <span
                      key={t}
                      className="px-1.5 py-0.2 rounded bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl space-y-6">
            {/* Standard Header */}
            <div className="pb-4 border-b border-slate-800 space-y-2">
              <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                  {selectedItem.category}
                </span>
                {selectedItem.standardRef && (
                  <span className="text-amber-300 font-bold">
                    Official Reference: {selectedItem.standardRef}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                {selectedItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-cyan-300 font-medium">
                {selectedItem.subtitle}
              </p>
            </div>

            {/* Core Specifications Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Key Technical Parameters & Normative Bounds
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                {selectedItem.keySpecs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
                  >
                    <span className="text-[10px] text-slate-500 uppercase">{spec.label}</span>
                    <strong className="text-white text-xs mt-0.5">{spec.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep-Dive Architectural Insights */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Engineering Application & Standards Analysis
              </h4>
              <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                {selectedItem.deepDive.map((para, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 font-bold font-mono text-[10px] mt-0.5">
                      {idx + 1}
                    </span>
                    <p>{para}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-Vendor Configuration Snippet if Available */}
            {selectedItem.cliSample && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Production CLI Configuration Reference</span>
                  </h4>
                  <button
                    onClick={() => handleCopy(selectedItem.cliSample!)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-cyan-300 font-mono border border-slate-700 cursor-pointer"
                  >
                    {copiedCli ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCli ? 'Copied' : 'Copy Snippet'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                  <pre>{selectedItem.cliSample}</pre>
                </div>
              </div>
            )}
          </div>

          {/* INTERACTIVE LINK LOSS BUDGET CALCULATOR WIDGET */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Interactive Optical Link Budget Calculator (ITU-T G.9807 Mode)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Live Compute</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px]">Fiber Distance (km):</span>
                <input
                  type="number"
                  min="0.1"
                  max="20"
                  step="0.1"
                  value={calcKm}
                  onChange={e => setCalcKm(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-bold"
                />
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[11px]">Splitter Ratio:</span>
                <select
                  value={calcSplitter}
                  onChange={e => setCalcSplitter(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-bold"
                >
                  <option value={2}>1:2 (3.5 dB)</option>
                  <option value={4}>1:4 (7.2 dB)</option>
                  <option value={8}>1:8 (10.5 dB)</option>
                  <option value={16}>1:16 (13.8 dB)</option>
                  <option value={32}>1:32 (17.2 dB)</option>
                  <option value={64}>1:64 (20.6 dB)</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[11px]">Tx Launch Power (dBm):</span>
                <input
                  type="number"
                  min="0"
                  max="8"
                  step="0.5"
                  value={calcTxPower}
                  onChange={e => setCalcTxPower(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-bold"
                />
              </div>
            </div>

            {/* Result Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-400 text-[10px]">Calculated Net Rx Power:</span>
                <div className="flex items-center gap-2">
                  <strong
                    className={`text-lg font-bold ${
                      calculatedLossResult.isPass ? 'text-emerald-300' : 'text-rose-400'
                    }`}
                  >
                    {calculatedLossResult.netRx} dBm
                  </strong>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      calculatedLossResult.isPass
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {calculatedLossResult.isPass ? 'LINK MARGIN PASS' : 'LINK ATTENUATION HIGH'}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 space-y-0.5">
                <div>Total Loss: <strong className="text-amber-300">-{calculatedLossResult.totalLoss} dB</strong></div>
                <div>(Fiber: {calculatedLossResult.fiberLoss}dB · Split: {calculatedLossResult.splitLoss}dB · Safety: 3.0dB)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
