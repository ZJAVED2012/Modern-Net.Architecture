import React, { useState } from 'react';
import { Gauge, CheckCircle2, AlertTriangle, XCircle, RotateCcw, HelpCircle, Layers } from 'lucide-react';

interface OpticsClass {
  id: string;
  name: string;
  budgetDb: number;
  standard: string;
  description: string;
}

const OPTICS_CLASSES: OpticsClass[] = [
  { id: 'gpon_b', name: 'GPON Class B+', budgetDb: 28.0, standard: 'ITU-T G.984.2', description: 'Standard GPON optics (28 dB dynamic range).' },
  { id: 'gpon_c', name: 'GPON Class C+', budgetDb: 32.0, standard: 'ITU-T G.984.2', description: 'Extended reach GPON optics (32 dB dynamic range).' },
  { id: 'xgs_n1', name: 'XGS-PON Class N1', budgetDb: 29.0, standard: 'ITU-T G.9807.1', description: 'Mainstream enterprise 10G symmetric optics (29 dB range).' },
  { id: 'xgs_n2', name: 'XGS-PON Class N2', budgetDb: 31.0, standard: 'ITU-T G.9807.1', description: 'High-power 10G symmetric optics (31 dB range).' },
  { id: 'pon_50g', name: '50G-PON Class C+', budgetDb: 32.0, standard: 'ITU-T G.9804.3', description: 'Next-gen 50 Gbps optical transceiver class (32 dB range).' },
];

const SPLITTER_OPTIONS = [
  { label: '1:2 Splitter', lossDb: 3.5, ratio: '1:2' },
  { label: '1:4 Splitter', lossDb: 7.2, ratio: '1:4' },
  { label: '1:8 Splitter', lossDb: 10.5, ratio: '1:8' },
  { label: '1:16 Splitter', lossDb: 14.0, ratio: '1:16' },
  { label: '1:32 Splitter', lossDb: 17.5, ratio: '1:32' },
  { label: '1:64 Splitter', lossDb: 21.0, ratio: '1:64' },
  { label: 'Cascaded (1:4 + 1:8)', lossDb: 18.2, ratio: '1:32 Cascaded' },
];

export const OdnBudgetCalculator: React.FC = () => {
  // Calculator state
  const [distanceKm, setDistanceKm] = useState<number>(2.0);
  const [attenuationPerKm, setAttenuationPerKm] = useState<number>(0.35); // 1310nm
  const [connectorPairs, setConnectorPairs] = useState<number>(4);
  const [connectorLossDb, setConnectorLossDb] = useState<number>(0.5);
  const [splicesCount, setSplicesCount] = useState<number>(6);
  const [spliceLossDb, setSpliceLossDb] = useState<number>(0.1);
  const [selectedSplitterIndex, setSelectedSplitterIndex] = useState<number>(4); // 1:32 default
  const [safetyMarginDb, setSafetyMarginDb] = useState<number>(3.0);
  const [selectedClassId, setSelectedClassId] = useState<string>('xgs_n1');

  // Calculations
  const fiberLoss = distanceKm * attenuationPerKm;
  const connectorTotalLoss = connectorPairs * connectorLossDb;
  const spliceTotalLoss = splicesCount * spliceLossDb;
  const splitterLoss = SPLITTER_OPTIONS[selectedSplitterIndex].lossDb;
  const totalLinkLoss = fiberLoss + connectorTotalLoss + spliceTotalLoss + splitterLoss + safetyMarginDb;

  const currentOptics = OPTICS_CLASSES.find(c => c.id === selectedClassId) || OPTICS_CLASSES[2];
  const headroomDb = currentOptics.budgetDb - totalLinkLoss;

  const isPass = headroomDb >= 2.0;
  const isWarning = headroomDb >= 0 && headroomDb < 2.0;
  const isFail = headroomDb < 0;

  const resetToSection08Example = () => {
    setDistanceKm(2.0);
    setAttenuationPerKm(0.35);
    setConnectorPairs(4);
    setConnectorLossDb(0.5);
    setSplicesCount(6);
    setSpliceLossDb(0.1);
    setSelectedSplitterIndex(4); // 1:32
    setSafetyMarginDb(3.0);
    setSelectedClassId('xgs_n1');
  };

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Gauge className="w-5 h-5 text-cyan-400" />
            <span>ODN Optical Link Loss Budget Calculator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Calculate end-to-end passive attenuation across single-mode glass, splitters, splices, and connectors to verify link margin against ITU-T optics classes.
          </p>
        </div>

        <button
          onClick={resetToSection08Example}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 rounded-lg transition-colors cursor-pointer self-start sm:self-auto whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Load Section 08 Reference Example</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Controls */}
        <div className="lg:col-span-7 space-y-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800">
            Link Budget Parameters
          </div>

          {/* 1. Distance & Fiber Attenuation */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-300 font-medium">Fiber Link Distance (km)</label>
              <span className="font-mono font-semibold text-cyan-400 tabular-nums">{distanceKm.toFixed(1)} km</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="20.0"
              step="0.1"
              value={distanceKm}
              onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex gap-2">
                <button onClick={() => setDistanceKm(0.8)} className="hover:text-cyan-300 cursor-pointer">0.8 km (Faculty)</button>
                <span>·</span>
                <button onClick={() => setDistanceKm(2.0)} className="hover:text-cyan-300 cursor-pointer">2.0 km (Campus)</button>
                <span>·</span>
                <button onClick={() => setDistanceKm(5.0)} className="hover:text-cyan-300 cursor-pointer">5.0 km (Hostels)</button>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Wavelength:</span>
                <button
                  onClick={() => setAttenuationPerKm(0.35)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${attenuationPerKm === 0.35 ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400'}`}
                >
                  1310nm (0.35 dB/km)
                </button>
                <button
                  onClick={() => setAttenuationPerKm(0.22)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${attenuationPerKm === 0.22 ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400'}`}
                >
                  1550nm (0.22 dB/km)
                </button>
              </div>
            </div>
          </div>

          {/* 2. Optical Splitter Configuration */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-300 font-medium">Splitter Architecture & Ratio</label>
              <span className="font-mono font-semibold text-teal-300 tabular-nums">
                {SPLITTER_OPTIONS[selectedSplitterIndex].lossDb.toFixed(1)} dB Loss
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SPLITTER_OPTIONS.map((item, idx) => (
                <button
                  key={item.ratio}
                  onClick={() => setSelectedSplitterIndex(idx)}
                  className={`px-2.5 py-2 text-xs rounded-lg border text-left transition-colors cursor-pointer ${
                    selectedSplitterIndex === idx
                      ? 'bg-teal-500/20 border-teal-400 text-teal-200 font-semibold'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-mono text-[11px]">{item.ratio}</div>
                  <div className="text-[10px] text-slate-400">{item.lossDb} dB</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Connectors & Splices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
            {/* Connectors */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="text-slate-300">Mated Connector Pairs</label>
                <span className="font-mono text-cyan-400 tabular-nums">{connectorPairs} pairs ({connectorTotalLoss.toFixed(1)} dB)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={connectorPairs}
                onChange={(e) => setConnectorPairs(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-400 block">LC/APC ~0.50 dB per mated pair</span>
            </div>

            {/* Splices */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="text-slate-300">Fusion Splices</label>
                <span className="font-mono text-cyan-400 tabular-nums">{splicesCount} splices ({spliceTotalLoss.toFixed(2)} dB)</span>
              </div>
              <input
                type="range"
                min="0"
                max="16"
                step="1"
                value={splicesCount}
                onChange={(e) => setSplicesCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-400 block">Precision fusion ~0.10 dB per splice</span>
            </div>
          </div>

          {/* 4. Safety Margin & Optics Standard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="text-slate-300">Safety Margin (Aging/Repairs)</label>
                <span className="font-mono text-amber-400 tabular-nums">{safetyMarginDb.toFixed(1)} dB</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.5"
                value={safetyMarginDb}
                onChange={(e) => setSafetyMarginDb(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="text-[10px] text-slate-400 block">Standard engineering buffer: 3.0 dB</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 block">Target Optics Class</label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white cursor-pointer focus:outline-none focus:border-cyan-500"
              >
                {OPTICS_CLASSES.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name} ({opt.budgetDb} dB - {opt.standard})
                  </option>
                ))}
              </select>
              <span className="text-[10px] text-slate-400 block">{currentOptics.description}</span>
            </div>
          </div>
        </div>

        {/* Right Output: Gauge & Verification Card */}
        <div className="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Optical Budget Verification
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Class: {currentOptics.name}
              </span>
            </div>

            {/* Verdict Card */}
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                isPass
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  : isWarning
                  ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
              }`}
            >
              {isPass && <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />}
              {isWarning && <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />}
              {isFail && <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />}

              <div>
                <div className="text-sm font-bold">
                  {isPass && 'LINK BUDGET PASS (Robust Headroom)'}
                  {isWarning && 'MARGIN WARNING (Tight Headroom)'}
                  {isFail && 'LINK BUDGET FAIL (Attenuation Exceeded)'}
                </div>
                <div className="text-xs mt-1 leading-relaxed opacity-90">
                  {isPass && `The link has +${headroomDb.toFixed(2)} dB of excess optical margin beyond the 3 dB safety buffer. Transmission will be stable and error-free.`}
                  {isWarning && `The link has only +${headroomDb.toFixed(2)} dB margin. Minor fiber bend or temperature fluctuation could cause bit errors.`}
                  {isFail && `Link exceeds allowable loss by ${Math.abs(headroomDb).toFixed(2)} dB. Reduce splitter ratio, decrease distance, or upgrade to Class C+ / N2 optics.`}
                </div>
              </div>
            </div>

            {/* Numeric Summary Matrix */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Total Calculated Loss</span>
                <span className="text-xl font-bold font-mono text-white tabular-nums mt-0.5 block">
                  {totalLinkLoss.toFixed(2)} dB
                </span>
                <span className="text-[10px] text-slate-500">Including 3.0 dB safety</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Remaining Headroom</span>
                <span
                  className={`text-xl font-bold font-mono tabular-nums mt-0.5 block ${
                    isPass ? 'text-emerald-400' : isWarning ? 'text-amber-400' : 'text-rose-400'
                  }`}
                >
                  {headroomDb >= 0 ? `+${headroomDb.toFixed(2)}` : headroomDb.toFixed(2)} dB
                </span>
                <span className="text-[10px] text-slate-500">Budget: {currentOptics.budgetDb} dB</span>
              </div>
            </div>

            {/* Visual Loss Breakdown Stack */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] text-slate-400 block">Attenuation Contribution Breakdown:</span>
              <div className="h-4 w-full bg-slate-950 rounded-lg overflow-hidden flex border border-slate-800">
                <div
                  style={{ width: `${(splitterLoss / totalLinkLoss) * 100}%` }}
                  title={`Splitter: ${splitterLoss.toFixed(1)} dB`}
                  className="bg-teal-500 h-full"
                />
                <div
                  style={{ width: `${(connectorTotalLoss / totalLinkLoss) * 100}%` }}
                  title={`Connectors: ${connectorTotalLoss.toFixed(1)} dB`}
                  className="bg-cyan-500 h-full"
                />
                <div
                  style={{ width: `${(fiberLoss / totalLinkLoss) * 100}%` }}
                  title={`Fiber Glass: ${fiberLoss.toFixed(1)} dB`}
                  className="bg-blue-500 h-full"
                />
                <div
                  style={{ width: `${(safetyMarginDb / totalLinkLoss) * 100}%` }}
                  title={`Safety Margin: ${safetyMarginDb.toFixed(1)} dB`}
                  className="bg-amber-500 h-full"
                />
                <div
                  style={{ width: `${(spliceTotalLoss / totalLinkLoss) * 100}%` }}
                  title={`Splices: ${spliceTotalLoss.toFixed(1)} dB`}
                  className="bg-emerald-500 h-full"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-teal-500" /> Splitter: {splitterLoss.toFixed(1)} dB ({((splitterLoss / totalLinkLoss) * 100).toFixed(0)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" /> Connectors: {connectorTotalLoss.toFixed(1)} dB
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Glass: {fiberLoss.toFixed(2)} dB
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Margin: {safetyMarginDb.toFixed(1)} dB
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Formula: Loss = α·L + N_c·A_c + N_s·A_s + A_split + M</span>
            <span className="text-cyan-400">ITU-T G.984 / G.9807</span>
          </div>
        </div>
      </div>
    </div>
  );
};
