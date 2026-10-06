import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Zap,
  Gauge,
  Radio,
  Sliders,
  Terminal,
  Copy,
  Check,
  ShieldAlert,
  ArrowRight,
  Crosshair,
  Wrench,
  Search,
  Layers,
  Sparkles
} from 'lucide-react';

export interface FaultScenario {
  id: string;
  name: string;
  category: 'Optical Physical' | 'Laser & Protocol' | 'Power & PoE' | 'Protection';
  description: string;
  symptoms: string[];
  txPowerDbm: number;
  rxPowerDbm: number;
  loss1310Dbm: number;
  loss1577Dbm: number;
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL_FAULT';
  otdrEventDistanceMeters: number;
  otdrEventType: string;
  rootCause: string;
  cliDiagnosisCommand: string;
  cliDiagnosticOutput: string;
  physicalRemediationSteps: string[];
  toolRequired: string;
}

export const FAULT_SCENARIOS: FaultScenario[] = [
  {
    id: 'healthy',
    name: 'Normal Healthy Optical Link',
    category: 'Optical Physical',
    description: 'Clean optical path with pristine LC/APC angled end-faces, low fusion splice attenuation, and healthy receiver power margin.',
    symptoms: [
      'PON LED solid green on all registered ONUs',
      'Zero bit error rate (BER < 10^-12)',
      'Sub-2ms ping latency to default gateway',
      'Optical headroom well above safety threshold (+10.8 dB)'
    ],
    txPowerDbm: 3.5,
    rxPowerDbm: -18.2,
    loss1310Dbm: 21.7,
    loss1577Dbm: 21.7,
    status: 'HEALTHY',
    otdrEventDistanceMeters: 2000,
    otdrEventType: 'Continuous Link End (Normal)',
    rootCause: 'All optical parameters within ITU-T G.9807.1 Class N1 specifications.',
    cliDiagnosisCommand: 'display ont optical-info 0 1 1 1',
    cliDiagnosticOutput: `-----------------------------------------------------------------------------
  ONU Index               : 1
  ONT Laser Status        : Normal
  Tx Optical Power (dBm)  : 2.80
  Rx Optical Power (dBm)  : -18.20
  Rx Optical Sensitivity  : -29.00 dBm
  Overload Optical Power  : -8.00 dBm
  OLT Rx ONT Power (dBm)  : -19.40
  Operating Temperature  : 38.5 C
  Supply Voltage (V)      : 3.32
  Laser Bias Current (mA) : 12.4
  Status                  : Normal (Healthy Margin: +10.80 dB)
-----------------------------------------------------------------------------`,
    physicalRemediationSteps: [
      'No physical action required.',
      'Maintain biannual inspection schedule using digital inspection probe.'
    ],
    toolRequired: 'Dual-Wavelength Optical Power Meter (OPM)'
  },

  {
    id: 'dirty-connector',
    name: 'Contaminated / Dirty LC/APC Connector',
    category: 'Optical Physical',
    description: 'Microscopic dust, skin oil, or ferrule debris on the 8° angled connector face at the ODF or floor splitter box.',
    symptoms: [
      'Intermittent packet loss during peak data bursts',
      'High optical return loss (reflectance spikes > -45 dB)',
      'Optical power degraded by 3.5 dB to 6.0 dB',
      'NMS generates warning alarm: "Rx Optical Power Degradation"'
    ],
    txPowerDbm: 3.5,
    rxPowerDbm: -25.8,
    loss1310Dbm: 29.3,
    loss1577Dbm: 29.3,
    status: 'WARNING',
    otdrEventDistanceMeters: 350,
    otdrEventType: 'High Reflective Event (Connector Reflection)',
    rootCause: 'Dust particle or finger oil on ferrule core. 1 dust particle (5 um) blocks light completely over a 9 um single-mode core.',
    cliDiagnosisCommand: 'display ont optical-info 0 1 1 1',
    cliDiagnosticOutput: `-----------------------------------------------------------------------------
  ONU Index               : 1
  ONT Laser Status        : Normal
  Tx Optical Power (dBm)  : 2.80
  Rx Optical Power (dBm)  : -25.80  <-- WARNING (Close to sensitivity limit!)
  Rx Optical Sensitivity  : -29.00 dBm
  Warning Threshold       : -24.00 dBm (EXCEEDED)
  Alarm State             : RX_POWER_LOW_ALARM Active
  Link Headroom Remaining : +3.20 dB (Critical Degradation)
-----------------------------------------------------------------------------`,
    physicalRemediationSteps: [
      'Unplug green LC/APC patch cord from bulkhead adapter.',
      'Inspect ferrule face using 400x digital inspection probe (IEC 61300-3-35 standard).',
      'Clean ferrule using dry One-Click LC/APC Cleaning Pen (click 2 times).',
      'Re-inspect: ensure zone A core is 100% free of pits, scratches, and oil.',
      'Re-insert connector; verify Rx power jumps back up to -18.2 dBm.'
    ],
    toolRequired: 'One-Click LC/APC 1.25mm Cleaning Pen & Digital Fiber Scope'
  },

  {
    id: 'macro-bend',
    name: 'Macro-Bend Cable Pinch in Vertical ELV Riser',
    category: 'Optical Physical',
    description: 'Fiber cable pinched by cable ties or bent around a sharp 90° conduit corner with bend radius < 15mm in the vertical ELV riser.',
    symptoms: [
      'High attenuation specifically at 1577 nm, while 1310 nm reads relatively normal!',
      'Downstream 10G signals drop packets while upstream 1270 nm remains connected',
      'LOS LED intermittently blinks red on ONU during thermal changes'
    ],
    txPowerDbm: 3.5,
    rxPowerDbm: -27.4,
    loss1310Dbm: 22.5,
    loss1577Dbm: 30.9,
    status: 'WARNING',
    otdrEventDistanceMeters: 780,
    otdrEventType: 'Non-Reflective Bending Loss Event (Step Drop)',
    rootCause: 'Longer wavelengths (1577 nm / 1550 nm) escape the fiber cladding much more easily than shorter wavelengths (1310 nm) when bent tightly.',
    cliDiagnosisCommand: 'display ont optical-info 0 1 1 1',
    cliDiagnosticOutput: `-----------------------------------------------------------------------------
  ONU Index               : 1
  Wavelength 1310nm Loss  : 22.50 dB (Normal)
  Wavelength 1577nm Loss  : 30.90 dB (High Delta: +8.4 dB excess attenuation!)
  Delta (1577nm - 1310nm) : 8.40 dB  <-- CLASSIC SIGNATURE OF A MACRO-BEND!
  Rx Optical Power (dBm)  : -27.40 dBm
  Status                  : Macro-Bend Detected at ~780m from Central OLT
-----------------------------------------------------------------------------`,
    physicalRemediationSteps: [
      'Locate riser shaft at distance indicated by OTDR (Floor 3 ELV Riser, ~780m).',
      'Inspect cable pathway for overtightened zip-ties or tight bends over metal conduit edges.',
      'Replace plastic zip-ties with hook-and-loop Velcro cable straps.',
      'Ensure minimum bend radius >= 30mm for feeder cable, or use G.657 bend-tolerant fiber.',
      'Observe Optical Power Meter: 1577nm power immediately recovers by 8+ dB.'
    ],
    toolRequired: 'Dual-Wavelength OTDR (1310nm & 1550/1577nm) & Velcro Straps'
  },

  {
    id: 'fiber-cut',
    name: 'Backbone Feeder Fiber Cut (Civil Works / Dig)',
    category: 'Protection',
    description: 'Underground conduit severed by backhoe or rodent damage between central data center and building entrance.',
    symptoms: [
      'Instant loss of signal on all 16/32 ONUs on the PON tree simultaneously',
      'LOS LED flashes red on all affected office terminals',
      'Sub-50ms Type B automatic protection switches to secondary path (if provisioned)',
      'Critical NMS alarm: "Loss of Signal (LOS) / Loss of Frame (LOF)"'
    ],
    txPowerDbm: 3.5,
    rxPowerDbm: -40.0,
    loss1310Dbm: 45.0,
    loss1577Dbm: 45.0,
    status: 'CRITICAL_FAULT',
    otdrEventDistanceMeters: 1240,
    otdrEventType: 'Catastrophic Non-Reflective Break / Open End',
    rootCause: 'Physical fiber break at distance 1,240m along outdoor pathway.',
    cliDiagnosisCommand: 'display ont optical-alarm 0/1/1 all',
    cliDiagnosticOutput: `-----------------------------------------------------------------------------
  Alarm ID                : 0x00000041
  Alarm Name              : LOS (Loss of Signal)
  Severity                : CRITICAL
  Affected Port           : XGS-PON 0/1/1
  Affected ONUs           : ONUs 1 through 32 (100% Outage)
  Protection Group State  : TYPE_B_SWITCHED_TO_BACKUP (Path B Active)
  Switchover Duration     : 38 ms (Compliant with < 50ms ITU-T G.984.1 standard)
-----------------------------------------------------------------------------`,
    physicalRemediationSteps: [
      'Dispatch field technician with OTDR to central ODF.',
      'Shoot OTDR trace on broken fiber: pinpoint exact break distance at 1,240 meters.',
      'Locate underground manhole near break point; inspect conduit damage.',
      'Pull new cable section or prepare outdoor IP68 splice enclosure.',
      'Fusion splice all 24 fiber cores using core-alignment fusion splicer (< 0.08 dB per splice).',
      'Verify continuity and restore primary feeder path.'
    ],
    toolRequired: 'Core-Alignment Fusion Splicer, Precision Cleaver & OTDR'
  },

  {
    id: 'rogue-onu',
    name: 'Rogue ONT Babbling Laser Jamming PON Tree',
    category: 'Laser & Protocol',
    description: 'Damaged ONT optical transceiver with laser driver failure continuously emitting light (continuous wave) instead of synchronized TDMA time-slots.',
    symptoms: [
      'All 32 ONUs on the same PON port lose upstream connectivity simultaneously!',
      'Downstream traffic continues working (users can receive data but cannot send requests)',
      'Upstream frame collisions cause 100% upstream packet drop for every neighbor on the tree'
    ],
    txPowerDbm: 3.5,
    rxPowerDbm: -18.2,
    loss1310Dbm: 21.7,
    loss1577Dbm: 21.7,
    status: 'CRITICAL_FAULT',
    otdrEventDistanceMeters: 1850,
    otdrEventType: 'Continuous Optical Interference (Babbling Laser)',
    rootCause: 'Hardware failure in ONT laser diode driver or damaged firmware transmitting continuous light outside allocated TDMA slot.',
    cliDiagnosisCommand: 'display rogue-ont info 0 1 1',
    cliDiagnosticOutput: `-----------------------------------------------------------------------------
  Port Index              : 0/1/1
  Rogue ONT State         : ROGUE_ONT_DETECTED
  Detection Method        : Upstream Silence Slot Energy Detection
  Rogue ONT Serial Number : 4857544399AABB11 (Room 412 - Lab Terminal)
  Rogue Optical Power     : +2.4 dBm (Continuous unmodulated emission)
  Automated Action Taken  : FORCED_OPTICAL_SHUTDOWN
  Status                  : Rogue ONT laser shut off via downstream OMCI message.
                            Remaining 31 ONUs upstream transmission RESTORED!
-----------------------------------------------------------------------------`,
    physicalRemediationSteps: [
      'OLT automatically issues downstream OMCI command to shut off the rogue laser.',
      'If rogue ONT fails to respond to OMCI shutdown, disconnect splitter port 12 feeding Room 412.',
      'Replace damaged ONT with pre-provisioned spare terminal from IT depot.',
      'Return defective ONT to hardware manufacturer for RMA replacement.'
    ],
    toolRequired: 'OLT CLI Rogue-ONT Detection Feature & Optical Power Meter'
  },

  {
    id: 'poe-overload',
    name: 'PoE+ Budget Overload on Edge ONU',
    category: 'Power & PoE',
    description: 'High-power Wi-Fi 7 AP attempting to pull 45W from an ONU port limited to 802.3af (15.4W) or aggregate ONU PoE budget exceeded.',
    symptoms: [
      'Wi-Fi 7 AP repeatedly reboots every 45 seconds when 6 GHz radios power on',
      'AP radios degrade to 2x2 MIMO or turn off 6 GHz band to save power',
      'ONU PoE fault LED blinks amber',
      'Connected IP camera cuts out during night-time when infrared illuminators activate'
    ],
    txPowerDbm: 3.5,
    rxPowerDbm: -18.2,
    loss1310Dbm: 21.7,
    loss1577Dbm: 21.7,
    status: 'WARNING',
    otdrEventDistanceMeters: 2000,
    otdrEventType: 'Optical Path OK (Electrical PoE Deficit)',
    rootCause: 'Endpoint power class mismatch: Wi-Fi 7 requires 802.3bt (Class 6, 60W), but ONU port configured for 802.3af (15.4W).',
    cliDiagnosisCommand: 'display ont port poe-state 0 1 1 1',
    cliDiagnosticOutput: `-----------------------------------------------------------------------------
  ONU Index               : 1
  Total PoE Budget        : 60.00 W
  Current Power Allocated : 58.50 W  <-- 97.5% LOAD (OVERLOAD RISK)
  Port 1 (PC)             : PoE Disabled (Data Only)
  Port 2 (Wi-Fi 7 AP)     : Request: 45.00W (802.3bt) | Allocated: 30.00W (DENIED PEAK)
  Port 3 (CCTV PTZ Cam)   : Request: 22.00W | Allocated: 22.00W
  Port 4 (VoIP Phone)     : Request: 6.50W  | Allocated: 6.50W
  Error Code              : POE_POWER_BUDGET_EXCEEDED (AP throttled)
-----------------------------------------------------------------------------`,
    physicalRemediationSteps: [
      'Verify ONU power adapter rating: upgrade local power brick from 65W to 90W DC.',
      'Or connect Wi-Fi 7 AP to dedicated 802.3bt multi-port zone ONU.',
      'In OLT CLI, adjust PoE port priorities: assign Port 2 (Wi-Fi) Critical Priority.',
      'Verify AP powers up all three radio bands (2.4 GHz, 5 GHz, 6 GHz) without rebooting.'
    ],
    toolRequired: 'PoE Inline Power & Load Meter (IEEE 802.3af/at/bt Tester)'
  }
];

export const OpticalDiagnosticsSimulator: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('healthy');
  const [selectedWavelength, setSelectedWavelength] = useState<number>(1577);
  const [activeTab, setActiveTab] = useState<'simulator' | 'otdr' | 'cli' | 'remediation'>('simulator');
  const [copiedCli, setCopiedCli] = useState<boolean>(false);

  const scenario = FAULT_SCENARIOS.find(s => s.id === selectedScenarioId) || FAULT_SCENARIOS[0];

  const handleCopyCli = () => {
    navigator.clipboard.writeText(scenario.cliDiagnosticOutput).then(() => {
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2500);
    });
  };

  // Dynamic values depending on wavelength
  const currentLoss = selectedWavelength === 1310 ? scenario.loss1310Dbm : scenario.loss1577Dbm;
  const currentRxPower = scenario.txPowerDbm - currentLoss;
  const headroomRemaining = currentRxPower - (-29.0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Field Engineering Diagnostic & Simulation Lab</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>Interactive Optical Fault & Diagnostic Simulator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl">
            Simulate real-world field optical failures (dirty connectors, macro-bends, fiber cuts, rogue ONUs, and PoE overloads). Inspect virtual Optical Power Meter (OPM) readings, OTDR traces, root causes, and production CLI remediation commands.
          </p>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start lg:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Virtual Test Lab & OPM
          </button>
          <button
            onClick={() => setActiveTab('otdr')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'otdr'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Virtual OTDR Trace Graph
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'cli'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CLI Diagnostics Output
          </button>
          <button
            onClick={() => setActiveTab('remediation')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'remediation'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Physical Remediation Protocol
          </button>
        </div>
      </div>

      {/* Scenario Selector Rail */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Select Real-World Optical Scenario to Simulate:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {FAULT_SCENARIOS.map((sc) => {
            const isSelected = sc.id === scenario.id;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-950/40'
                    : sc.status === 'CRITICAL_FAULT'
                    ? 'bg-rose-950/20 border-rose-500/30 text-slate-300 hover:border-rose-400'
                    : sc.status === 'WARNING'
                    ? 'bg-amber-950/20 border-amber-500/30 text-slate-300 hover:border-amber-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`w-2 h-2 rounded-full ${
                    sc.status === 'HEALTHY' ? 'bg-emerald-400' : sc.status === 'WARNING' ? 'bg-amber-400' : 'bg-rose-500 animate-pulse'
                  }`} />
                  <span className="text-[10px] font-mono text-slate-500">{sc.category.split(' ')[0]}</span>
                </div>
                <div className="text-xs font-bold leading-snug">{sc.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN VIEW 1: VIRTUAL TEST LAB & OPTICAL POWER METER (OPM) */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Virtual Optical Power Meter (OPM) Instrument */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Virtual Optical Power Meter (OPM)
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                Model: OPM-9800 PRO
              </span>
            </div>

            {/* OPM LCD Digital Screen */}
            <div className="p-5 rounded-2xl bg-emerald-950/30 border-2 border-emerald-500/40 font-mono space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs text-emerald-300 border-b border-emerald-500/30 pb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CAL: {selectedWavelength} nm</span>
                </div>
                <span>REF: {scenario.txPowerDbm.toFixed(2)} dBm</span>
              </div>

              {/* Huge LCD readout */}
              <div className="py-2 text-center">
                <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight tabular-nums">
                  {currentRxPower < -38 ? '< -40.00' : currentRxPower.toFixed(2)} <span className="text-xl text-emerald-300 font-normal">dBm</span>
                </div>
                <div className="text-xs text-emerald-300 mt-1">
                  Optical Loss: {currentLoss > 40 ? '> 40.0 dB (Break)' : `${currentLoss.toFixed(2)} dB`}
                </div>
              </div>

              {/* Status Bar on LCD */}
              <div className="flex items-center justify-between pt-2 border-t border-emerald-500/30 text-[11px]">
                <span className="text-slate-300">Class N1 Sens: -29.0 dBm</span>
                <span className={`font-bold px-2 py-0.5 rounded ${
                  headroomRemaining > 5
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : headroomRemaining > 0
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-rose-500/30 text-rose-300 font-bold animate-pulse'
                }`}>
                  {headroomRemaining > 0 ? `+${headroomRemaining.toFixed(2)} dB MARGIN` : 'OUT OF SPEC'}
                </span>
              </div>
            </div>

            {/* Wavelength Switcher Buttons */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 block">Select Calibrated Test Wavelength:</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[1310, 1490, 1577].map((wvl) => (
                  <button
                    key={wvl}
                    onClick={() => setSelectedWavelength(wvl)}
                    className={`py-2 rounded-xl font-mono font-bold transition-colors cursor-pointer border ${
                      selectedWavelength === wvl
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {wvl} nm
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-slate-500 block pt-1">
                Tip: Macro-bends show distinct attenuation divergence between 1310 nm and 1577 nm!
              </span>
            </div>

            {/* Physical Test Tool Recommendation */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 font-semibold block text-[11px] uppercase">Required Field Instrumentation:</span>
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{scenario.toolRequired}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Scenario Details, Symptoms & Diagnostics */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
            <div className="space-y-1.5 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                  scenario.status === 'HEALTHY'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : scenario.status === 'WARNING'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {scenario.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-slate-400 font-mono">Category: {scenario.category}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{scenario.name}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {scenario.description}
              </p>
            </div>

            {/* Observable Symptoms */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Observable Field Symptoms:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {scenario.symptoms.map((sym, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Root Cause Analysis */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] block">
                Engineering Root Cause Analysis:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {scenario.rootCause}
              </p>
            </div>

            {/* Quick Action Navigation */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <button
                onClick={() => setActiveTab('otdr')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-medium cursor-pointer transition-colors"
              >
                Inspect OTDR Trace & Distance ({scenario.otdrEventDistanceMeters}m)
              </button>
              <button
                onClick={() => setActiveTab('cli')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-medium cursor-pointer transition-colors"
              >
                View OLT CLI Diagnostic Script
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN VIEW 2: VIRTUAL OTDR TRACE GRAPH */}
      {activeTab === 'otdr' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-cyan-400" />
                <span>Virtual Optical Time-Domain Reflectometer (OTDR) Trace</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulated backscatter reflection curve showing localized fiber events along the 2,000m campus feeder route.
              </p>
            </div>
            <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-500/30">
              Event Distance: {scenario.otdrEventDistanceMeters} meters
            </span>
          </div>

          {/* Graphical Trace Canvas */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between text-slate-500 text-[11px] border-b border-slate-800 pb-2">
              <span>0 m (OLT Port)</span>
              <span>500 m</span>
              <span>1000 m</span>
              <span>1500 m</span>
              <span>2000 m (Floor Splitter)</span>
            </div>

            {/* Simulated OTDR Graph */}
            <div className="h-44 relative border-b border-l border-slate-700 flex items-end">
              {/* Event Marker Flag */}
              <div
                style={{ left: `${(scenario.otdrEventDistanceMeters / 2000) * 100}%` }}
                className="absolute top-0 bottom-0 border-l-2 border-dashed border-rose-400 flex flex-col justify-start items-center"
              >
                <div className="bg-rose-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] whitespace-nowrap shadow-md -translate-x-1/2">
                  {scenario.otdrEventType} @ {scenario.otdrEventDistanceMeters}m
                </div>
              </div>

              {/* Visual SVG curve */}
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 150">
                {/* Reference Baseline Curve */}
                <path
                  d="M 0,20 L 175,32 L 175,15 L 200,45 L 620,80 L 1000,120"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Scenario Curve */}
                {scenario.id === 'healthy' && (
                  <path d="M 0,20 L 175,32 L 175,18 L 200,45 L 620,80 L 1000,120" fill="none" stroke="#10b981" strokeWidth="3" />
                )}
                {scenario.id === 'dirty-connector' && (
                  <path d="M 0,20 L 175,32 L 175,0 L 200,60 L 620,95 L 1000,135" fill="none" stroke="#f59e0b" strokeWidth="3" />
                )}
                {scenario.id === 'macro-bend' && (
                  <path d="M 0,20 L 175,32 L 200,45 L 390,65 L 390,95 L 1000,145" fill="none" stroke="#f59e0b" strokeWidth="3" />
                )}
                {scenario.id === 'fiber-cut' && (
                  <path d="M 0,20 L 175,32 L 200,45 L 620,80 L 620,150" fill="none" stroke="#ef4444" strokeWidth="3" />
                )}
                {(scenario.id === 'rogue-onu' || scenario.id === 'poe-overload') && (
                  <path d="M 0,20 L 175,32 L 175,18 L 200,45 L 620,80 L 1000,120" fill="none" stroke="#06b6d4" strokeWidth="3" />
                )}
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-slate-600 border-dashed" />
                <span>Reference Baseline</span>
              </span>
              <span className="flex items-center gap-1.5 font-bold text-white">
                <span className={`w-3 h-1 rounded-full ${
                  scenario.status === 'HEALTHY' ? 'bg-emerald-400' : scenario.status === 'WARNING' ? 'bg-amber-400' : 'bg-rose-500'
                }`} />
                <span>Current Simulated Trace ({scenario.name})</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MAIN VIEW 3: OLT CLI DIAGNOSTICS & TELEMETRY */}
      {activeTab === 'cli' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span>OLT Diagnostic CLI Output & Alarm Telemetry</span>
              </h3>
              <span className="text-xs text-slate-400">Command: <code>{scenario.cliDiagnosisCommand}</code></span>
            </div>

            <button
              onClick={handleCopyCli}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
            >
              {copiedCli ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCli ? 'Copied!' : 'Copy CLI Output'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed shadow-inner">
            <pre>{scenario.cliDiagnosticOutput}</pre>
          </div>
        </div>
      )}

      {/* MAIN VIEW 4: PHYSICAL REMEDIATION PROTOCOL */}
      {activeTab === 'remediation' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-emerald-400" />
              <span>Step-by-Step Field Remediation Protocol</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Follow these standard operating procedures to rectify the fault and restore optical power to baseline.
            </p>
          </div>

          <div className="space-y-3">
            {scenario.physicalRemediationSteps.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3.5 text-xs">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-slate-200 leading-relaxed text-xs">{step}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200 flex items-center justify-between">
            <span className="font-semibold">Tool Required on Site: {scenario.toolRequired}</span>
            <span className="text-[11px] text-cyan-400 font-mono">Standard Operating Procedure</span>
          </div>
        </div>
      )}
    </div>
  );
};
