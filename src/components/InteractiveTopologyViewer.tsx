import React, { useState } from 'react';
import { Layers, Network, Server, ArrowRight, Shield, Zap, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

interface NodeDetail {
  id: string;
  name: string;
  category: string;
  powerState: 'active' | 'passive';
  specs: string;
  medium: string;
  reach: string;
  failureRadius: string;
  standard: string;
  description: string;
}

const TOPOLOGY_NODES: Record<string, NodeDetail> = {
  core: {
    id: 'core',
    name: 'Campus Core Switch (Redundant Pair)',
    category: 'Core Routing',
    powerState: 'active',
    specs: 'Dual Chassis, 100GE / 400GE Wire-Speed Fabric, L3 Routing & OSPF/BGP',
    medium: 'MPO / LC Single-Mode Fiber Backplane',
    reach: 'Campus-wide (up to 40 km)',
    failureRadius: 'Whole Campus (mitigated by VRRP/MLAG pair)',
    standard: 'IEEE 802.3ba / 802.1Q',
    description: 'High-speed redundant core in the central data center routing traffic between academic VLANs, external ISP circuits, and campus data center services.'
  },
  olt: {
    id: 'olt',
    name: 'Optical Line Terminal (OLT Chassis)',
    category: 'PON Headend',
    powerState: 'active',
    specs: '16-Port Combo PON (GPON + XGS-PON), Dual Control Boards, Dual -48V DC feeds',
    medium: 'LC/APC Single-Mode Fiber to ODF',
    reach: 'Up to 20 km optical path',
    failureRadius: 'All trees connected to chassis (mitigated by Type B dual homing)',
    standard: 'ITU-T G.984 (GPON), G.9807.1 (XGS-PON), G.988 (OMCI)',
    description: 'The central intelligent optical master in the data center. Houses the DBA scheduler, downstream AES-128 crypto engine, and OMCI configuration manager.'
  },
  odf: {
    id: 'odf',
    name: 'Optical Distribution Frame (ODF)',
    category: 'Passive Headend',
    powerState: 'passive',
    specs: 'Modular 19-inch 144-core / 288-core fiber patching & fusion splice chassis',
    medium: 'G.652.D Single-Mode Pigtails with LC/APC connectors',
    reach: 'Local Data Center Cross-Connect',
    failureRadius: 'Single fiber strand or tray',
    standard: 'Telcordia GR-449 / TIA-568',
    description: 'Completely unpowered rack-mounted frame where OLT optical transceivers patch to campus backbone outdoor armored feeder cables.'
  },
  feeder: {
    id: 'feeder',
    name: 'Backbone Feeder Fiber Cable',
    category: 'Passive Transmission',
    powerState: 'passive',
    specs: '48-Core / 96-Core Outdoor Armored Single-Mode Fiber, Gel-filled / Loose tube',
    medium: 'ITU-T G.652.D Glass (0.35 dB/km @ 1310nm)',
    reach: '500m to 15 km across campus ducts',
    failureRadius: 'All buildings downstream of severed trunk',
    standard: 'ITU-T G.652.D',
    description: 'Dielectric or armored optical cable running through underground campus conduits. Carries light without electromagnetic interference or ground loops.'
  },
  splitter: {
    id: 'splitter',
    name: '1:16 / 1:32 Planar Lightwave Circuit (PLC) Splitter',
    category: 'Passive ODN Junction',
    powerState: 'passive',
    specs: '1 Input → 32 Outputs, Insertion Loss ~17.5 dB, Uniformity <1.5 dB, 0 Watts',
    medium: 'PLC optical silica chip in steel tube / ABS box',
    reach: 'Floor / Riser Distribution Box',
    failureRadius: 'The 32 downstream offices connected to this tree',
    standard: 'ITU-T G.671 / Telcordia GR-1209',
    description: 'Unpowered optical device that splits laser light geometrically. Requires no electrical outlet, no cooling, and no software configuration.'
  },
  onu_office: {
    id: 'onu_office',
    name: 'Panel ONU (86-Type Wall Box)',
    category: 'Optical Terminal',
    powerState: 'active',
    specs: '1 × XGS-PON Uplink, 4 × GE RJ-45 Sockets, 6W Power Consumption',
    medium: 'Drop fiber in, copper patch cords out to PC and printer',
    reach: 'Local faculty office (1-5m patch cord)',
    failureRadius: 'Single faculty desk / office room',
    standard: 'ITU-T G.9807.1 / IEEE 802.3ab',
    description: 'Compact optical terminal mounted flush in an 86mm wall box. Replaces the floor access switch for wired office computers.'
  },
  onu_poe: {
    id: 'onu_poe',
    name: 'Multi-Service PoE+ / PoE++ ONU',
    category: 'Optical Terminal with Power',
    powerState: 'active',
    specs: '1 × XGS-PON Uplink, 4 × GE PoE+ (30W) + 1 × 10GE PoE++ (60W-90W)',
    medium: 'Single-mode drop fiber in, Cat6A PoE cables to AP & camera',
    reach: 'Local department zone (within 20m)',
    failureRadius: 'Single office zone or AP cluster',
    standard: 'IEEE 802.3bt (PoE++) / ITU-T G.9807.1',
    description: 'Powers ceiling Wi-Fi 7 access points, pan-tilt-zoom security cameras, and IP telephony directly from the optical terminal.'
  },
  traditional_dist: {
    id: 'traditional_dist',
    name: 'Building Distribution Switch (Traditional)',
    category: 'Traditional Active Layer',
    powerState: 'active',
    specs: 'Modular 24-Port 10GE SFP+ L3 Switch, 350W Power, Rack-Mounted',
    medium: 'Multimode/Single-mode fiber to IDFs and Core',
    reach: 'Building Basement / MDF',
    failureRadius: 'Whole building floors',
    standard: 'IEEE 802.3ae',
    description: 'Requires dedicated building MDF room, dedicated cooling, and regular firmware patch cycles.'
  },
  traditional_access: {
    id: 'traditional_access',
    name: 'Floor Access Switch (Traditional IDF)',
    category: 'Traditional Active Layer',
    powerState: 'active',
    specs: '48-Port 1GE PoE+ Switch with 4×10GE uplinks, 150W-450W power draw',
    medium: '48 bulky Cat6/Cat6A copper cables to every wall outlet (max 100m)',
    reach: 'Strict 100m copper limit',
    failureRadius: '48 office outlets / one whole floor',
    standard: 'IEEE 802.3at / 802.3ab',
    description: 'Active switch located in every floor IDF closet. Requires continuous air conditioning, dedicated UPS battery, and physical room security.'
  },
  ap_wifi7: {
    id: 'ap_wifi7',
    name: 'Enterprise Wi-Fi 7 Access Point',
    category: 'Wireless Edge',
    powerState: 'active',
    specs: 'Tri-Band (2.4/5/6 GHz) 4×4 MIMO, 2.5GE/10GE Uplink, 35W PoE++ Draw',
    medium: 'Cat6A copper patch cord from PoE ONU or IDF switch',
    reach: 'Local RF cell coverage (15-25m radius)',
    failureRadius: 'Local wireless room coverage',
    standard: 'IEEE 802.11be / Wi-Fi 7',
    description: 'Provides multi-gigabit wireless capacity to faculty laptops and student mobile devices across tagged SSIDs.'
  }
};

export const InteractiveTopologyViewer: React.FC = () => {
  const [activeView, setActiveView] = useState<'ftto' | 'traditional' | 'datacenter' | 'office'>('ftto');
  const [selectedNodeKey, setSelectedNodeKey] = useState<string>('olt');

  const selectedNode = TOPOLOGY_NODES[selectedNodeKey] || TOPOLOGY_NODES['olt'];

  return (
    <div className="space-y-6">
      {/* Header and View Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <span>Interactive Campus Architecture Topologies</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare traditional copper switching with all-optical FTTO/POL across headend, distribution, and edge. Click any node to inspect technical parameters.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => { setActiveView('ftto'); setSelectedNodeKey('olt'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeView === 'ftto'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All-Optical FTTO / POL
          </button>
          <button
            onClick={() => { setActiveView('traditional'); setSelectedNodeKey('traditional_access'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeView === 'traditional'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Traditional 3-Tier
          </button>
          <button
            onClick={() => { setActiveView('datacenter'); setSelectedNodeKey('core'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeView === 'datacenter'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Data Center Headend
          </button>
          <button
            onClick={() => { setActiveView('office'); setSelectedNodeKey('onu_office'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeView === 'office'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Office: Copper vs Fiber
          </button>
        </div>
      </div>

      {/* Main Interactive Diagram Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Topology Stage */}
        <div className="lg:col-span-8 p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800/80">
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              {activeView === 'ftto' && 'Figure 1B: Modern FTTO All-Optical Topology (Central Intelligence + Passive ODN)'}
              {activeView === 'traditional' && 'Figure 1A: Traditional 3-Tier Multi-Floor Architecture (Distributed Active Closets)'}
              {activeView === 'datacenter' && 'Figure 14: Data Center Headend Dual-Homing & Server Fabric Demarcation'}
              {activeView === 'office' && 'Figure 9: Faculty Office Endpoint Delivery Comparison'}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-cyan-400 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> Active Central
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> 100% Passive
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Floor Switch (Legacy)
              </span>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="w-full h-80 sm:h-96 flex items-center justify-center relative">
            {activeView === 'ftto' && (
              <div className="w-full h-full flex flex-col justify-between py-2">
                {/* Layer 1: Central Data Center Headend */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">CENTRAL DATA CENTER / HEADEND</div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Dual Redundant OLTs (OLT-A & OLT-B)</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Carrier Grade</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedNodeKey('core')}
                      className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                        selectedNodeKey === 'core' ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      Core Switch Pair
                    </button>
                    <button
                      onClick={() => setSelectedNodeKey('olt')}
                      className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                        selectedNodeKey === 'olt' ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      OLT Chassis
                    </button>
                    <button
                      onClick={() => setSelectedNodeKey('odf')}
                      className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                        selectedNodeKey === 'odf' ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      ODF Frame
                    </button>
                  </div>
                </div>

                {/* Connecting Laser Beams (Feeder Fiber) */}
                <div className="flex items-center justify-around relative py-2">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-0.5 bg-gradient-to-b from-cyan-400 to-emerald-400 animate-pulse" />
                    <button
                      onClick={() => setSelectedNodeKey('feeder')}
                      className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                        selectedNodeKey === 'feeder' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400' : 'bg-slate-950 border-emerald-500/40 text-emerald-300'
                      }`}
                    >
                      Single-Mode Feeder Fiber (Up to 20 km)
                    </button>
                    <div className="h-6 w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-500 animate-pulse" />
                  </div>
                </div>

                {/* Layer 2: Passive Optical Distribution Network (ODN) */}
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-400 font-semibold">PASSIVE ODN IN RISER / ELV SHAFT</div>
                      <div className="text-xs text-slate-300">0 Watts Power · 0 Active Maintenance · Zero Cooling</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedNodeKey('splitter')}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
                      selectedNodeKey === 'splitter' ? 'bg-emerald-400 text-slate-950 font-bold border-emerald-300' : 'bg-slate-900 border-emerald-500/50 text-emerald-300 hover:bg-emerald-950/40'
                    }`}
                  >
                    1:16 / 1:32 Optical Splitter (PLC)
                  </button>
                </div>

                {/* Connecting Drop Fibers */}
                <div className="flex items-center justify-around relative py-2">
                  <div className="w-1/3 flex flex-col items-center">
                    <div className="h-4 w-px bg-emerald-400/80" />
                    <span className="text-[10px] text-slate-400">G.657 Bend-Insensitive Drop</span>
                    <div className="h-4 w-px bg-emerald-400/80" />
                  </div>
                  <div className="w-1/3 flex flex-col items-center">
                    <div className="h-4 w-px bg-emerald-400/80" />
                    <span className="text-[10px] text-slate-400">G.657 Drop to AP Zone</span>
                    <div className="h-4 w-px bg-emerald-400/80" />
                  </div>
                </div>

                {/* Layer 3: User Edge & Endpoints */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Faculty Desks</div>
                      <div className="text-xs font-bold text-white">Panel ONU (86-Box)</div>
                      <div className="text-[10px] text-cyan-400">4×GE Ports (PC, Printer)</div>
                    </div>
                    <button
                      onClick={() => setSelectedNodeKey('onu_office')}
                      className={`px-2 py-1 text-xs rounded border transition-colors cursor-pointer ${
                        selectedNodeKey === 'onu_office' ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      Inspect
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Ceiling AP & Cameras</div>
                      <div className="text-xs font-bold text-white">Multi-Service PoE++ ONU</div>
                      <div className="text-[10px] text-teal-400">Wi-Fi 7 + CCTV (PoE+)</div>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setSelectedNodeKey('onu_poe')}
                        className={`px-2 py-1 text-xs rounded border transition-colors cursor-pointer ${
                          selectedNodeKey === 'onu_poe' ? 'bg-teal-500 text-slate-950 font-bold border-teal-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        ONU
                      </button>
                      <button
                        onClick={() => setSelectedNodeKey('ap_wifi7')}
                        className={`px-2 py-1 text-xs rounded border transition-colors cursor-pointer ${
                          selectedNodeKey === 'ap_wifi7' ? 'bg-blue-500 text-slate-950 font-bold border-blue-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        AP
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'traditional' && (
              <div className="w-full h-full flex flex-col justify-between py-2">
                {/* Traditional Core */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-400">DATA CENTER CORE</div>
                      <div className="text-sm font-bold text-white">Central Core Switch Chassis</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedNodeKey('core')}
                    className="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-200 border border-slate-700 cursor-pointer"
                  >
                    Core Details
                  </button>
                </div>

                {/* Building Distribution Layer */}
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-amber-400 font-semibold">BUILDING MDF ROOM (Active Switch)</div>
                    <div className="text-xs text-slate-300">Requires dedicated room, cooling, and UPS battery</div>
                  </div>
                  <button
                    onClick={() => setSelectedNodeKey('traditional_dist')}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
                      selectedNodeKey === 'traditional_dist' ? 'bg-amber-400 text-slate-950 font-bold border-amber-300' : 'bg-slate-900 border-amber-500/50 text-amber-300'
                    }`}
                  >
                    Building Dist Switch (350W)
                  </button>
                </div>

                {/* Floor Access IDFs */}
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-amber-300 font-semibold">FLOOR 1–6 IDFs (10-20 Switch Rooms)</div>
                    <div className="text-xs text-rose-300">45 Switches, 11 UPS, 10 Split A/C Units to maintain</div>
                  </div>
                  <button
                    onClick={() => setSelectedNodeKey('traditional_access')}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
                      selectedNodeKey === 'traditional_access' ? 'bg-amber-400 text-slate-950 font-bold border-amber-300' : 'bg-slate-900 border-amber-500/50 text-amber-300'
                    }`}
                  >
                    Floor Access Switch (150W)
                  </button>
                </div>

                {/* 100m Copper Drop Warning */}
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-rose-900/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-rose-300">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Copper horizontal cabling strictly limited to 100m. Risers packed with 48 thick cables per room.</span>
                  </div>
                  <button
                    onClick={() => setSelectedNodeKey('traditional_access')}
                    className="px-2 py-1 rounded bg-rose-500/20 text-rose-200 border border-rose-500/30 cursor-pointer"
                  >
                    Inspect Cable Limits
                  </button>
                </div>
              </div>
            )}

            {activeView === 'datacenter' && (
              <div className="w-full h-full flex flex-col justify-between py-2">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {/* Left: Server Hall Ethernet Spine-Leaf */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-blue-500/30 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-blue-400 font-semibold">SERVER HALL FABRIC (Keep Switched Ethernet)</div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Dedicated 100G/400G spine-leaf non-blocking architecture for database servers, storage clusters, and GPU compute. Low microsecond jitter.
                      </p>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center text-xs text-blue-300 font-mono">
                      Spine-Leaf Fabric (Not POL)
                    </div>
                  </div>

                  {/* Right: Optical Headend (POL) */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-cyan-400 font-semibold">CAMPUS OPTICAL HEADEND (Use POL)</div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Dual OLTs in data center network room connected directly to campus ODF. Feeds 10 buildings, hostels, and perimeter CCTV over shared passive trees.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedNodeKey('olt')}
                        className="w-1/2 py-1 text-center rounded bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/40 cursor-pointer"
                      >
                        Dual OLTs
                      </button>
                      <button
                        onClick={() => setSelectedNodeKey('odf')}
                        className="w-1/2 py-1 text-center rounded bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/40 cursor-pointer"
                      >
                        Campus ODF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'office' && (
              <div className="w-full h-full flex flex-col justify-between py-2">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {/* Traditional Office: 6 copper cables */}
                  <div className="p-3 rounded-xl bg-amber-950/15 border border-amber-500/30 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-amber-400 font-bold uppercase">Traditional Office Delivery</div>
                      <div className="text-[11px] text-slate-300 mt-1">
                        Requires <strong>6 separate Cat6A copper cables</strong> pulled up to 100 meters to the floor switch closet:
                      </div>
                      <ul className="text-[11px] text-slate-400 mt-2 space-y-1 list-disc list-inside">
                        <li>PC 1 (Data Cable 1)</li>
                        <li>PC 2 (Data Cable 2)</li>
                        <li>Printer (Data Cable 3)</li>
                        <li>Wi-Fi AP (PoE Cable 4)</li>
                        <li>IP Phone (PoE Cable 5)</li>
                        <li>CCTV Camera (PoE Cable 6)</li>
                      </ul>
                    </div>
                    <div className="text-[11px] text-rose-300 bg-rose-950/40 p-2 rounded border border-rose-900/60">
                      Riser congestion + 6 IDF patch panel ports occupied
                    </div>
                  </div>

                  {/* Modern FTTO Office: 1 fiber */}
                  <div className="p-3 rounded-xl bg-cyan-950/15 border border-cyan-500/30 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-cyan-400 font-bold uppercase">Modern FTTO Office Delivery</div>
                      <div className="text-[11px] text-slate-300 mt-1">
                        Requires <strong>1 single-mode optical fiber</strong> pulled from the floor riser splitter:
                      </div>
                      <div className="mt-2 p-2 rounded bg-slate-900 border border-slate-800">
                        <div className="text-xs font-semibold text-white">PoE-Capable Wall Panel ONU</div>
                        <div className="text-[11px] text-cyan-300 mt-0.5">Provides local RJ-45 ports + PoE locally:</div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          Short 1-2m patch cords connect PCs, printer, phone & AP locally.
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedNodeKey('onu_poe')}
                      className="py-1 text-center rounded bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/40 cursor-pointer"
                    >
                      Inspect Office PoE ONU
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Node Technical Inspection Drawer */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Engineering Node Inspector
              </span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                  selectedNode.powerState === 'passive'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}
              >
                {selectedNode.powerState === 'passive' ? '100% Passive (0W)' : 'Active Electronic'}
              </span>
            </div>

            <div className="mt-3">
              <h3 className="text-lg font-bold text-white">{selectedNode.name}</h3>
              <p className="text-xs text-cyan-400 font-medium mt-0.5">{selectedNode.category}</p>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{selectedNode.description}</p>
            </div>

            {/* Spec Matrix */}
            <div className="mt-4 space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">Hardware Specifications</span>
                <span className="text-slate-200 font-medium mt-0.5 block">{selectedNode.specs}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px]">Transmission Medium</span>
                  <span className="text-slate-200 font-medium text-[11px] mt-0.5 block">{selectedNode.medium}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px]">Effective Reach</span>
                  <span className="text-slate-200 font-medium text-[11px] mt-0.5 block">{selectedNode.reach}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">Failure Domain Radius</span>
                <span className="text-amber-300 font-medium text-[11px] mt-0.5 block">{selectedNode.failureRadius}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">Governing Standard</span>
                <span className="text-cyan-300 font-mono text-[11px] mt-0.5 block">{selectedNode.standard}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Click any node in diagram to inspect</span>
            <span className="text-cyan-400 font-mono">ITU-T / IEEE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
