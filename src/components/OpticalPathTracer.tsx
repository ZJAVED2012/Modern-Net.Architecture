import React, { useState, useMemo } from 'react';
import {
  Network,
  Server,
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  Eye,
  Sliders,
  Check,
  Download,
  Printer,
  Compass,
  Cpu,
  Activity
} from 'lucide-react';

interface OltPort {
  id: string;
  name: string;
  slot: number;
  port: number;
  wavelength: string;
  txPowerDbm: number;
  transceiver: string;
  connectedOdfCore: string;
}

interface OnuTarget {
  id: string;
  name: string;
  location: string;
  category: string;
  model: string;
  rxSensitivityDbm: number;
  minRxPowerDbm: number;
  maxRxPowerDbm: number;
  splitterPath: {
    odfPort: string;
    feederCable: string;
    feederKm: number;
    fdhCabinet: string;
    l1Splitter: string;
    l1Ratio: string;
    l1LossDb: number;
    riserCable: string;
    riserMeters: number;
    l2Splitter: string;
    l2Ratio: string;
    l2LossDb: number;
    dropFiberMeters: number;
    faceplatePort: string;
  };
}

const OLT_PORTS: OltPort[] = [
  {
    id: 'olt-port-1',
    name: 'OLT PON Port 0/1/1',
    slot: 1,
    port: 1,
    wavelength: '1577nm Down / 1270nm Up (XGS-PON)',
    txPowerDbm: 3.5,
    transceiver: 'SFP+ Class N1 (+2 to +5 dBm)',
    connectedOdfCore: 'ODF-DC-01 / Core 01-08'
  },
  {
    id: 'olt-port-2',
    name: 'OLT PON Port 0/1/2',
    slot: 1,
    port: 2,
    wavelength: '1577nm Down / 1270nm Up (XGS-PON)',
    txPowerDbm: 3.8,
    transceiver: 'SFP+ Class N2 (+3 to +6 dBm)',
    connectedOdfCore: 'ODF-DC-01 / Core 09-16'
  },
  {
    id: 'olt-port-3',
    name: 'OLT PON Port 0/1/3',
    slot: 1,
    port: 3,
    wavelength: '1490nm Down / 1310nm Up (GPON Class B+)',
    txPowerDbm: 2.8,
    transceiver: 'SFP GPON Class B+ (+1.5 to +5 dBm)',
    connectedOdfCore: 'ODF-DC-01 / Core 17-24'
  },
  {
    id: 'olt-port-4',
    name: 'OLT PON Port 0/1/4',
    slot: 1,
    port: 4,
    wavelength: '1577nm Down / 1270nm Up (XGS-PON High Power)',
    txPowerDbm: 4.2,
    transceiver: 'SFP+ Class E1 (+4 to +8 dBm)',
    connectedOdfCore: 'ODF-DC-02 / Core 01-08'
  }
];

const ONU_TARGETS: OnuTarget[] = [
  {
    id: 'onu-cs-lab',
    name: 'CS AI Research Lab (40 High-End Workstations)',
    location: 'Academic Block A · Floor 3 · Room 304',
    category: 'University Faculty',
    model: 'Huawei OptiXstar P812E (8x 2.5GE + PoE++)',
    rxSensitivityDbm: -28.0,
    minRxPowerDbm: -24.0,
    maxRxPowerDbm: -8.0,
    splitterPath: {
      odfPort: 'ODF-DC-01 Panel A Port 01',
      feederCable: 'OSP 48-Core G.652D Underground Conduit',
      feederKm: 1.8,
      fdhCabinet: 'FDH-Block-A (Outside Vault)',
      l1Splitter: 'PLC Splitter SP-01',
      l1Ratio: '1:4 Cascaded Head',
      l1LossDb: 7.2,
      riserCable: 'LSZH 12-Core G.657A2 Vertical Shaft',
      riserMeters: 45,
      l2Splitter: 'PLC Splitter FL3-SP02',
      l2Ratio: '1:8 Floor Distribution',
      l2LossDb: 10.5,
      dropFiberMeters: 28,
      faceplatePort: 'Wall Faceplate FP-304-A (SC/APC)'
    }
  },
  {
    id: 'onu-pacs-mri',
    name: 'Radiology MRI PACS Imaging Console (Zero EMI)',
    location: 'Medical Complex · Diagnostic Radiology Wing',
    category: 'Healthcare',
    model: 'Huawei OptiXstar S600E (Medical Dielectric)',
    rxSensitivityDbm: -29.0,
    minRxPowerDbm: -23.5,
    maxRxPowerDbm: -9.0,
    splitterPath: {
      odfPort: 'ODF-DC-01 Panel B Port 09',
      feederCable: 'Dielectric Non-Conductive Armored OSP Fiber',
      feederKm: 2.4,
      fdhCabinet: 'FDH-Med-Center (Sub-Basement Vault)',
      l1Splitter: 'PLC Splitter MED-SP01',
      l1Ratio: '1:2 Redundant Type-B',
      l1LossDb: 3.6,
      riserCable: 'Metal-Free G.657B3 Optical Riser',
      riserMeters: 30,
      l2Splitter: 'PLC Splitter RAD-SP01',
      l2Ratio: '1:16 Clinical Hub',
      l2LossDb: 13.8,
      dropFiberMeters: 18,
      faceplatePort: 'Shielded MRI Bulkhead SC/APC'
    }
  },
  {
    id: 'onu-scada-cell',
    name: 'Robotics Assembly Cell & SCADA Controller',
    location: 'Smart Industry Plant 02 · Robotic Line C',
    category: 'Smart Industry',
    model: 'OptiXstar E810 Industrial Rugged DIN-Rail',
    rxSensitivityDbm: -28.0,
    minRxPowerDbm: -24.5,
    maxRxPowerDbm: -8.0,
    splitterPath: {
      odfPort: 'ODF-DC-02 Panel A Port 03',
      feederCable: 'Steel-Tape Armored Heavy Anti-Rodent Glass',
      feederKm: 3.1,
      fdhCabinet: 'FDH-Factory-02 (Rugged IP68 Enclosure)',
      l1Splitter: 'PLC Splitter IND-SP01',
      l1Ratio: '1:4 Industrial Feeder',
      l1LossDb: 7.3,
      riserCable: 'High-Temperature Anti-Vibration G.657A2',
      riserMeters: 60,
      l2Splitter: 'PLC Splitter ROB-SP01',
      l2Ratio: '1:8 Plant Sub-Distribution',
      l2LossDb: 10.6,
      dropFiberMeters: 35,
      faceplatePort: 'IP67 Waterproof Bulkhead Outlet'
    }
  },
  {
    id: 'onu-boardroom',
    name: 'Executive Boardroom 4K Immersive Telepresence',
    location: 'Corporate HQ Tower · Floor 12 · Boardroom A',
    category: 'Corporate Office',
    model: 'Huawei OptiXstar P612E (86-Type Flush Mount)',
    rxSensitivityDbm: -28.0,
    minRxPowerDbm: -24.0,
    maxRxPowerDbm: -8.0,
    splitterPath: {
      odfPort: 'ODF-DC-01 Panel A Port 05',
      feederCable: 'LSZH 24-Core Backbone Conduit',
      feederKm: 0.9,
      fdhCabinet: 'FDH-HQ-Basement (BEF Room)',
      l1Splitter: 'PLC Splitter HQ-SP01',
      l1Ratio: '1:2 Spine Splitter',
      l1LossDb: 3.5,
      riserCable: 'LSZH Micro-Conduit Blown Fiber Riser',
      riserMeters: 80,
      l2Splitter: 'PLC Splitter FL12-SP01',
      l2Ratio: '1:16 Executive Riser Hub',
      l2LossDb: 13.7,
      dropFiberMeters: 14,
      faceplatePort: 'Under-Desk Flush Plate FP-1201'
    }
  }
];

export const OpticalPathTracer: React.FC = () => {
  const [selectedPortId, setSelectedPortId] = useState<string>('olt-port-1');
  const [selectedOnuId, setSelectedOnuId] = useState<string>('onu-cs-lab');
  const [activeStepModal, setActiveStepModal] = useState<string | null>(null);
  const [isMicroscopeOpen, setIsMicroscopeOpen] = useState<boolean>(false);
  const [connectorCondition, setConnectorCondition] = useState<'clean' | 'contaminated'>('clean');

  const selectedPort = useMemo(
    () => OLT_PORTS.find(p => p.id === selectedPortId) || OLT_PORTS[0],
    [selectedPortId]
  );

  const selectedOnu = useMemo(
    () => ONU_TARGETS.find(o => o.id === selectedOnuId) || ONU_TARGETS[0],
    [selectedOnuId]
  );

  // Optical Loss Calculation Engine (dB)
  const lossMetrics = useMemo(() => {
    const path = selectedOnu.splitterPath;

    // Constants based on ITU-T G.652D & G.657A2 standards
    const fiberLossPerKm = 0.35; // dB/km at 1310/1577nm
    const connectorLoss = 0.25;  // SC/APC insertion loss per mated pair
    const spliceLoss = 0.05;     // Fusion splice loss per point

    const feederFiberLoss = Number((path.feederKm * fiberLossPerKm).toFixed(2));
    const riserFiberLoss = Number(((path.riserMeters / 1000) * fiberLossPerKm).toFixed(2));
    const dropFiberLoss = Number(((path.dropFiberMeters / 1000) * fiberLossPerKm).toFixed(2));
    const totalFiberLoss = Number((feederFiberLoss + riserFiberLoss + dropFiberLoss).toFixed(2));

    // Connectors count: OLT SFP (1) + ODF in/out (2) + FDH in/out (2) + Floor split in/out (2) + Faceplate (1) + ONU Rx (1) = 9 mated connections (est. 4 mated pairs ~ 1.25 dB)
    const totalConnectorLoss = 1.25;
    const totalSpliceLoss = 0.25; // 5 fusion splices
    const totalSplitterLoss = Number((path.l1LossDb + path.l2LossDb).toFixed(2));

    const totalCalculatedLoss = Number(
      (totalFiberLoss + totalConnectorLoss + totalSpliceLoss + totalSplitterLoss).toFixed(2)
    );

    const calculatedRxPower = Number((selectedPort.txPowerDbm - totalCalculatedLoss).toFixed(2));
    const opticalLinkMargin = Number((calculatedRxPower - selectedOnu.minRxPowerDbm).toFixed(2));

    const isHealthy =
      calculatedRxPower >= selectedOnu.minRxPowerDbm &&
      calculatedRxPower <= selectedOnu.maxRxPowerDbm;

    return {
      feederFiberLoss,
      riserFiberLoss,
      dropFiberLoss,
      totalFiberLoss,
      totalConnectorLoss,
      totalSpliceLoss,
      totalSplitterLoss,
      totalCalculatedLoss,
      calculatedRxPower,
      opticalLinkMargin,
      isHealthy
    };
  }, [selectedPort, selectedOnu]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Institutional Title & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Fiber Network Diagnostics · ITU-T G.9807.1</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>Optical Path Tracer & Link Budget Analyzer</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl">
            Select an <strong>OLT PON Port</strong> and an <strong>ONU Endpoint</strong> to visually trace and audit the complete physical optical path: patch panel bulkheads, outside plant feeder conduits, optical splitters, vertical riser cabling, and decibel (dBm) link attenuation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMicroscopeOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 cursor-pointer transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ferrule Inspection (400x)</span>
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* SELECTOR CONTROLS: OLT PORT & ONU DESTINATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* OLT Port Selection Box */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>Step 1: Select Headend OLT PON Port</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Headend DC Rack A1</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {OLT_PORTS.map(port => {
              const isSelected = selectedPortId === port.id;
              return (
                <button
                  key={port.id}
                  onClick={() => setSelectedPortId(port.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 ring-2 ring-cyan-400/80 shadow-md shadow-cyan-950/50'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>{port.name}</span>
                    <span className="text-[10px] font-mono text-cyan-300">
                      +{port.txPowerDbm} dBm
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1 truncate">
                    {port.transceiver}
                  </div>
                  <div className="text-[9px] text-emerald-400 font-mono mt-1">
                    {port.connectedOdfCore}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ONU Endpoint Selection Box */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Network className="w-4 h-4" />
              <span>Step 2: Select Target Edge ONU Terminal</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Campus Endpoints</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ONU_TARGETS.map(onu => {
              const isSelected = selectedOnuId === onu.id;
              return (
                <button
                  key={onu.id}
                  onClick={() => setSelectedOnuId(onu.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-400/80 shadow-md shadow-emerald-950/50'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="truncate max-w-[140px]">{onu.name.split(' (')[0]}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {onu.category}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-1">
                    {onu.location}
                  </div>
                  <div className="text-[9px] text-cyan-300 font-mono mt-1 truncate">
                    {onu.model}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* OPTICAL HEALTH SUMMARY & DECIBEL ATTENUATION GAUGE */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono text-sm border shadow-lg ${
                lossMetrics.isHealthy
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-emerald-950/60'
                  : 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-rose-950/60'
              }`}
            >
              {lossMetrics.isHealthy ? 'PASS' : 'WARN'}
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Active Link Trace: {selectedPort.name} → {selectedOnu.name.split(' (')[0]}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Total Path Length: <strong>{(selectedOnu.splitterPath.feederKm + (selectedOnu.splitterPath.riserMeters + selectedOnu.splitterPath.dropFiberMeters) / 1000).toFixed(2)} km</strong> · 
                Transceiver: <span className="font-mono text-cyan-300">{selectedPort.wavelength}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">Calculated Rx Power:</span>
              <strong
                className={`text-base font-bold ${
                  lossMetrics.isHealthy ? 'text-emerald-300' : 'text-rose-400'
                }`}
              >
                {lossMetrics.calculatedRxPower} dBm
              </strong>
            </div>
            <div className="text-right pl-3 border-l border-slate-800">
              <span className="text-slate-400 block text-[10px]">Optical Margin:</span>
              <strong className="text-base font-bold text-cyan-300">
                +{lossMetrics.opticalLinkMargin} dB
              </strong>
            </div>
          </div>
        </div>

        {/* Optical Budget Step Breakdown Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block">1. Launch Tx Power</span>
            <strong className="text-cyan-300 text-sm">+{selectedPort.txPowerDbm} dBm</strong>
            <span className="text-[9px] text-slate-500 block truncate">{selectedPort.transceiver}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block">2. Feeder Cable Loss</span>
            <strong className="text-amber-300 text-sm">-{lossMetrics.feederFiberLoss} dB</strong>
            <span className="text-[9px] text-slate-500 block">{selectedOnu.splitterPath.feederKm} km @ 0.35dB/km</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block">3. Level 1 Splitter</span>
            <strong className="text-amber-300 text-sm">-{selectedOnu.splitterPath.l1LossDb} dB</strong>
            <span className="text-[9px] text-slate-500 block">{selectedOnu.splitterPath.l1Ratio} PLC</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block">4. Level 2 Splitter</span>
            <strong className="text-amber-300 text-sm">-{selectedOnu.splitterPath.l2LossDb} dB</strong>
            <span className="text-[9px] text-slate-500 block">{selectedOnu.splitterPath.l2Ratio} PLC</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block">5. Connectors & Splices</span>
            <strong className="text-amber-300 text-sm">-{(lossMetrics.totalConnectorLoss + lossMetrics.totalSpliceLoss).toFixed(2)} dB</strong>
            <span className="text-[9px] text-slate-500 block">SC/APC + Fusion</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-1">
            <span className="text-[10px] text-emerald-400 block">6. Net Received Rx</span>
            <strong className="text-emerald-300 text-sm">{lossMetrics.calculatedRxPower} dBm</strong>
            <span className="text-[9px] text-slate-400 block">Min Sens: {selectedOnu.minRxPowerDbm} dBm</span>
          </div>
        </div>
      </div>

      {/* FULL INTERACTIVE 7-STAGE PHYSICAL OPTICAL PATH DIAGRAM */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Physical End-to-End Optical Link Schematic
            </h4>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">
            Click any node below for physical wiring & splice specifications
          </span>
        </div>

        {/* Horizontal Visual Pathway Stages */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {[
            {
              stage: 'Stage 1',
              title: 'OLT PON Port',
              spec: selectedPort.name,
              detail: `${selectedPort.wavelength}`,
              loss: `+${selectedPort.txPowerDbm} dBm Tx`,
              color: 'cyan',
              icon: Server
            },
            {
              stage: 'Stage 2',
              title: 'Main ODF Patch',
              spec: selectedOnu.splitterPath.odfPort,
              detail: 'SC/APC Bulkhead Adapter',
              loss: '-0.25 dB',
              color: 'sky',
              icon: Layers
            },
            {
              stage: 'Stage 3',
              title: 'Backbone Feeder',
              spec: `${selectedOnu.splitterPath.feederKm} km OSP Cable`,
              detail: selectedOnu.splitterPath.feederCable,
              loss: `-${lossMetrics.feederFiberLoss} dB`,
              color: 'blue',
              icon: Network
            },
            {
              stage: 'Stage 4',
              title: 'L1 Optical Splitter',
              spec: selectedOnu.splitterPath.l1Splitter,
              detail: `${selectedOnu.splitterPath.l1Ratio} in ${selectedOnu.splitterPath.fdhCabinet}`,
              loss: `-${selectedOnu.splitterPath.l1LossDb} dB`,
              color: 'amber',
              icon: Zap
            },
            {
              stage: 'Stage 5',
              title: 'Riser Distribution',
              spec: `${selectedOnu.splitterPath.riserMeters}m Vertical Shaft`,
              detail: selectedOnu.splitterPath.riserCable,
              loss: `-${lossMetrics.riserFiberLoss} dB`,
              color: 'indigo',
              icon: Activity
            },
            {
              stage: 'Stage 6',
              title: 'L2 Floor Splitter',
              spec: selectedOnu.splitterPath.l2Splitter,
              detail: `${selectedOnu.splitterPath.l2Ratio} PLC in Floor Cupboard`,
              loss: `-${selectedOnu.splitterPath.l2LossDb} dB`,
              color: 'purple',
              icon: Zap
            },
            {
              stage: 'Stage 7',
              title: 'Edge Wall ONU',
              spec: selectedOnu.model,
              detail: selectedOnu.splitterPath.faceplatePort,
              loss: `${lossMetrics.calculatedRxPower} dBm Rx`,
              color: 'emerald',
              icon: Cpu
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                    <span>{item.stage}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </div>
                  <div className="text-[11px] text-cyan-300 font-mono mt-1 font-semibold truncate">
                    {item.spec}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight mt-1 line-clamp-2">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-500">Loss:</span>
                  <span className="font-bold text-amber-300">{item.loss}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Port & Wiring Patch Matrix Table */}
        <div className="pt-4 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Detailed Port & Patch Matrix Routing
          </h4>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Physical Segment</th>
                  <th className="p-3">From Interface</th>
                  <th className="p-3">To Interface</th>
                  <th className="p-3">Media / Glass Core</th>
                  <th className="p-3">Attenuation</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/60 text-slate-200">
                <tr>
                  <td className="p-3 font-semibold text-cyan-300">1. Headend OLT Output</td>
                  <td className="p-3">{selectedPort.name}</td>
                  <td className="p-3">{selectedPort.connectedOdfCore}</td>
                  <td className="p-3">G.652D Single-Mode LC/APC</td>
                  <td className="p-3 text-emerald-300">+{selectedPort.txPowerDbm} dBm Launch</td>
                  <td className="p-3 text-emerald-400 font-bold">NORMAL</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-sky-300">2. Outside Plant Feeder</td>
                  <td className="p-3">{selectedPort.connectedOdfCore}</td>
                  <td className="p-3">{selectedOnu.splitterPath.fdhCabinet}</td>
                  <td className="p-3">{selectedOnu.splitterPath.feederCable} ({selectedOnu.splitterPath.feederKm} km)</td>
                  <td className="p-3 text-amber-300">-{lossMetrics.feederFiberLoss} dB</td>
                  <td className="p-3 text-emerald-400 font-bold">NORMAL</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-amber-300">3. Level 1 Passive Split</td>
                  <td className="p-3">{selectedOnu.splitterPath.l1Splitter} In</td>
                  <td className="p-3">{selectedOnu.splitterPath.l1Ratio} Out Port 03</td>
                  <td className="p-3">PLC Planar Lightwave Circuit (0 Watts)</td>
                  <td className="p-3 text-amber-300">-{selectedOnu.splitterPath.l1LossDb} dB</td>
                  <td className="p-3 text-emerald-400 font-bold">UNPOWERED</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-indigo-300">4. Vertical Floor Riser</td>
                  <td className="p-3">{selectedOnu.splitterPath.fdhCabinet}</td>
                  <td className="p-3">{selectedOnu.splitterPath.l2Splitter} In</td>
                  <td className="p-3">G.657A2 LSZH ({selectedOnu.splitterPath.riserMeters}m)</td>
                  <td className="p-3 text-amber-300">-{lossMetrics.riserFiberLoss} dB</td>
                  <td className="p-3 text-emerald-400 font-bold">NORMAL</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-purple-300">5. Level 2 Floor Split</td>
                  <td className="p-3">{selectedOnu.splitterPath.l2Splitter} In</td>
                  <td className="p-3">{selectedOnu.splitterPath.l2Ratio} Out Port 07</td>
                  <td className="p-3">PLC Floor Splitter Box (0 Watts)</td>
                  <td className="p-3 text-amber-300">-{selectedOnu.splitterPath.l2LossDb} dB</td>
                  <td className="p-3 text-emerald-400 font-bold">UNPOWERED</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-emerald-300">6. Edge ONU Termination</td>
                  <td className="p-3">{selectedOnu.splitterPath.faceplatePort}</td>
                  <td className="p-3">{selectedOnu.model} Optical Rx</td>
                  <td className="p-3">Bend-Insensitive Drop Fiber ({selectedOnu.splitterPath.dropFiberMeters}m)</td>
                  <td className="p-3 text-emerald-300 font-bold">{lossMetrics.calculatedRxPower} dBm Rx</td>
                  <td className="p-3 text-emerald-400 font-bold">OPTIMAL PASS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FIBER MICROSCOPE INSPECTION MODAL (IEC 61300-3-35 COMPLIANCE) */}
      {isMicroscopeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="max-w-2xl w-full bg-slate-900 border-2 border-cyan-500/40 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Fiber Ferrule Video Microscope Inspection (400x Digital Zoom)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    IEC 61300-3-35 Acceptance Verification
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsMicroscopeOpen(false)}
                className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Simulated 400x Ferrule Scope Canvas */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-slate-950 border-4 border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden shrink-0">
                {/* Concentric Inspection Zones */}
                <div className="absolute inset-4 rounded-full border border-slate-800" title="Zone D: Contact" />
                <div className="absolute inset-10 rounded-full border border-slate-700/60" title="Zone C: Adhesive" />
                <div className="absolute inset-16 rounded-full border border-slate-600/80" title="Zone B: Cladding" />
                
                {/* 9um Single-Mode Glass Core */}
                <div className="relative w-12 h-12 rounded-full bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 animate-pulse" />
                </div>

                {/* Simulated Dust Particles if Contaminated */}
                {connectorCondition === 'contaminated' && (
                  <>
                    <span className="absolute top-12 left-16 w-3 h-2 rounded bg-amber-400/90 rotate-45 shadow-sm" />
                    <span className="absolute bottom-14 right-14 w-4 h-1.5 rounded bg-amber-400/90 shadow-sm" />
                    <span className="absolute top-20 right-16 w-2 h-2 rounded-full bg-rose-400 shadow-sm" />
                  </>
                )}

                {/* Reticle Crosshair */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/30 pointer-events-none" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/30 pointer-events-none" />
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">Inspection Status:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2.5 py-0.5 rounded font-mono font-bold text-xs ${
                        connectorCondition === 'clean'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {connectorCondition === 'clean' ? 'PASS (CLEAN FERRULE)' : 'FAIL (DUST / CONTAMINATION)'}
                    </span>
                    <button
                      onClick={() =>
                        setConnectorCondition(prev => (prev === 'clean' ? 'contaminated' : 'clean'))
                      }
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-[10px] cursor-pointer"
                    >
                      Toggle Condition
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-slate-300 text-xs leading-relaxed">
                  <p>
                    <strong>Zone A (Core 0-25µm):</strong> 0 defects allowed. Any scratch in the core causes up to 2.5 dB Fresnel reflection loss.
                  </p>
                  <p>
                    <strong>Zone B (Cladding 25-115µm):</strong> Max 5 minor pits (&lt;5µm) permitted outside the light guidance zone.
                  </p>
                  <p>
                    <strong>Remediation:</strong> Clean with dry alcohol-free one-click cleaner pen. Never blow air with mouth.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Inspecting ferrule for: <strong>{selectedOnu.splitterPath.faceplatePort}</strong></span>
              <button
                onClick={() => setIsMicroscopeOpen(false)}
                className="px-3 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 cursor-pointer font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
