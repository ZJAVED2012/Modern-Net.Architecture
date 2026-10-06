import React, { useState } from 'react';
import { DollarSign, Clock, BatteryCharging, Maximize2, Zap, ArrowUpRight, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { WORKED_EXAMPLES_DATA } from '../data/architectureGuide';

export const TcoModeler: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'worked-examples' | 'tco-calculator'>('worked-examples');
  const [expandedExampleId, setExpandedExampleId] = useState<string>('ex1');

  // Interactive TCO Modeler state
  const [buildingsCount, setBuildingsCount] = useState<number>(10);
  const [idfsCount, setIdfsCount] = useState<number>(10);
  const [switchesCount, setSwitchesCount] = useState<number>(45);
  const [onuFleetCount, setOnuFleetCount] = useState<number>(1200);
  const [techHourlyRate, setTechHourlyRate] = useState<number>(35); // $/hr
  const [kwhTariff, setKwhTariff] = useState<number>(0.16); // $/kWh
  const [upsBatteryLifeYears, setUpsBatteryLifeYears] = useState<number>(4);
  const [switchUnitCost, setSwitchUnitCost] = useState<number>(1800); // 48-port PoE switch
  const [onuUnitCost, setOnuUnitCost] = useState<number>(110); // Panel/PoE ONU average
  const [oltChassisCost, setOltChassisCost] = useState<number>(24000); // Redundant pair OLTs

  // Calculations
  // 1. Maintenance Hours per year
  const traditionalLaborHours = idfsCount * 18 + idfsCount * 4.4 + switchesCount * 1.5 + 60 + 90;
  const fttoLaborHours = 24 + 12 + 24 + 20 + 40;
  const laborHoursSavedAnnual = Math.max(0, traditionalLaborHours - fttoLaborHours);
  const laborCostSavings10Yr = laborHoursSavedAnnual * techHourlyRate * 10;

  // 2. Space Reclaimed
  const spaceReclaimedSqm = idfsCount * 6; // 6 m² per IDF

  // 3. Electricity & Cooling
  const traditionalSwitchWatts = switchesCount * 150; // W
  const traditionalCoolingWatts = idfsCount * 340; // 340W per IDF A/C compressor
  const traditionalTotalKw = (traditionalSwitchWatts + traditionalCoolingWatts + 700) / 1000;
  const traditional10YrPowerCost = traditionalTotalKw * 24 * 365 * 10 * kwhTariff;

  const fttoOltWatts = 3000; // 2 OLTs @ 1.5kW
  const fttoOnuWatts = onuFleetCount * 6; // 6W avg per ONU
  const fttoCoolingWatts = 1000; // 1kW datacenter cooling incremental
  const fttoTotalKw = (fttoOltWatts + fttoOnuWatts + fttoCoolingWatts + 400) / 1000;
  const ftto10YrPowerCost = fttoTotalKw * 24 * 365 * 10 * kwhTariff;

  // 4. Hardware Replacement at Year 6-7
  const traditionalMidLifeSwitchCost = switchesCount * switchUnitCost;
  const fttoMidLifeUpgradeCost = (onuFleetCount * 0.25) * onuUnitCost + 12000; // 25% of ONUs upgraded for 10G + OLT line card

  // 5. UPS Battery Replacements over 10 years
  const batteryReplacementsCount = Math.floor(10 / upsBatteryLifeYears);
  const traditionalUps10YrCost = idfsCount * 450 * batteryReplacementsCount;
  const fttoUps10YrCost = 2 * 1200 * batteryReplacementsCount; // datacenter centralized UPS cells

  // Presets
  const applyUniversityPreset = () => {
    setBuildingsCount(10);
    setIdfsCount(10);
    setSwitchesCount(45);
    setOnuFleetCount(1200);
    setTechHourlyRate(35);
    setKwhTariff(0.16);
    setUpsBatteryLifeYears(4);
    setSwitchUnitCost(1800);
    setOnuUnitCost(110);
    setOltChassisCost(24000);
  };

  const applyIndustryPreset = () => {
    setBuildingsCount(3);
    setIdfsCount(4);
    setSwitchesCount(12);
    setOnuFleetCount(180);
    setTechHourlyRate(45);
    setKwhTariff(0.18);
    setUpsBatteryLifeYears(3);
    setSwitchUnitCost(2200);
    setOnuUnitCost(130);
    setOltChassisCost(14000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-cyan-400" />
            <span>Economic Impact, TCO & Worked Examples</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Section 19 & 20 analytical models: 7 practical worked examples derived from verified assumptions and 10-year TCO sensitivity modeling.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('worked-examples')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'worked-examples'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            The 7 Worked Examples
          </button>
          <button
            onClick={() => setActiveTab('tco-calculator')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'tco-calculator'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            10-Year Interactive TCO
          </button>
        </div>
      </div>

      {/* View 1: 7 Worked Examples Deep-Dive */}
      {activeTab === 'worked-examples' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div>
              <span className="font-semibold text-white">Methodology Note:</span> All 7 worked examples use the same illustrative 5,000-user campus baseline: 10 buildings, 10 IDFs, 45 access switches replaced by 2 OLTs and 1,200 ONUs.
            </div>
            <span className="text-cyan-400 font-mono">Sections 19.1 - 19.7</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {WORKED_EXAMPLES_DATA.map((ex) => {
              const isExpanded = expandedExampleId === ex.id;
              return (
                <div
                  key={ex.id}
                  className={`rounded-xl border transition-all ${
                    isExpanded ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setExpandedExampleId(isExpanded ? '' : ex.id)}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isExpanded ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                        {ex.id === 'ex1' && <Clock className="w-4 h-4" />}
                        {ex.id === 'ex2' && <Check className="w-4 h-4" />}
                        {ex.id === 'ex3' && <ArrowUpRight className="w-4 h-4" />}
                        {ex.id === 'ex4' && <BatteryCharging className="w-4 h-4" />}
                        {ex.id === 'ex5' && <Maximize2 className="w-4 h-4" />}
                        {ex.id === 'ex6' && <Zap className="w-4 h-4" />}
                        {ex.id === 'ex7' && <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{ex.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{ex.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {ex.reductionPercent > 0 && (
                        <div className="text-right hidden sm:block">
                          <span className="text-xs font-bold font-mono text-emerald-400 tabular-nums">
                            -{ex.reductionPercent.toFixed(1)}% Effort
                          </span>
                        </div>
                      )}
                      {ex.reductionPercent < 0 && (
                        <div className="text-right hidden sm:block">
                          <span className="text-xs font-bold font-mono text-amber-400 tabular-nums">
                            Neutral (~{Math.abs(ex.reductionPercent).toFixed(1)}%)
                          </span>
                        </div>
                      )}
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-3">
                      {/* Breakdown Comparison Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider">
                            <tr>
                              <th className="py-2 px-3 rounded-l">Activity / Dimension</th>
                              <th className="py-2 px-3 text-amber-300">Traditional Ethernet Assumption</th>
                              <th className="py-2 px-3 text-cyan-300 rounded-r">FTTO / POL Optical Assumption</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {ex.breakdown.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-800/20">
                                <td className="py-2 px-3 font-medium text-slate-200">{row.activity}</td>
                                <td className="py-2 px-3 text-slate-400 font-mono text-[11px]">{row.traditional}</td>
                                <td className="py-2 px-3 text-slate-300 font-mono text-[11px]">{row.ftto}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Key Insight Box */}
                      <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200">
                        <strong>Key Institutional Takeaway:</strong> {ex.keyInsight}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: Interactive 10-Year TCO Modeler */}
      {activeTab === 'tco-calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Form */}
          <div className="lg:col-span-6 space-y-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Institutional Parameters
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={applyUniversityPreset}
                  className="px-2 py-1 text-[11px] font-medium rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 cursor-pointer"
                >
                  University (5k)
                </button>
                <button
                  onClick={applyIndustryPreset}
                  className="px-2 py-1 text-[11px] font-medium rounded bg-slate-800 hover:bg-slate-700 text-teal-300 cursor-pointer"
                >
                  Industry (500)
                </button>
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300">IDFs to Eliminate</label>
                  <span className="font-mono text-cyan-400 font-semibold">{idfsCount} rooms</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={idfsCount}
                  onChange={(e) => setIdfsCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300">Traditional Switches</label>
                  <span className="font-mono text-amber-400 font-semibold">{switchesCount} units</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={switchesCount}
                  onChange={(e) => setSwitchesCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg cursor-pointer accent-amber-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300">ONUs to Deploy</label>
                  <span className="font-mono text-teal-300 font-semibold">{onuFleetCount} ONUs</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="50"
                  value={onuFleetCount}
                  onChange={(e) => setOnuFleetCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg cursor-pointer accent-teal-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300">Technician Wage</label>
                  <span className="font-mono text-cyan-400 font-semibold">${techHourlyRate}/hr</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="80"
                  value={techHourlyRate}
                  onChange={(e) => setTechHourlyRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300">Electricity Tariff</label>
                  <span className="font-mono text-cyan-400 font-semibold">${kwhTariff.toFixed(2)}/kWh</span>
                </div>
                <input
                  type="range"
                  min="0.08"
                  max="0.40"
                  step="0.01"
                  value={kwhTariff}
                  onChange={(e) => setKwhTariff(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300">UPS Battery Life</label>
                  <span className="font-mono text-cyan-400 font-semibold">{upsBatteryLifeYears} years</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={upsBatteryLifeYears}
                  onChange={(e) => setUpsBatteryLifeYears(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
              *Parameters dynamically calculate routine inspection hours, mid-life hardware replacement, cooling power, and floor real estate returned over a 10-year horizon.
            </div>
          </div>

          {/* Results Output Dashboard */}
          <div className="lg:col-span-6 space-y-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800">
              10-Year Lifecycle Comparison
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Annual Maintenance Saved</span>
                <span className="text-xl font-bold font-mono text-emerald-400 tabular-nums mt-0.5 block">
                  {laborHoursSavedAnnual.toFixed(0)} hrs/yr
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  ${(laborHoursSavedAnnual * techHourlyRate).toLocaleString()}/yr labor freed
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Campus Space Reclaimed</span>
                <span className="text-xl font-bold font-mono text-teal-300 tabular-nums mt-0.5 block">
                  {spaceReclaimedSqm} m²
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  ~{(spaceReclaimedSqm / 30).toFixed(1)} seminar classrooms
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Mid-Life Hardware Refresh</span>
                <span className="text-xl font-bold font-mono text-cyan-400 tabular-nums mt-0.5 block">
                  ${(traditionalMidLifeSwitchCost - fttoMidLifeUpgradeCost).toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">
                  Fiber retained; no copper re-pull
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">UPS Battery Replacements</span>
                <span className="text-xl font-bold font-mono text-emerald-400 tabular-nums mt-0.5 block">
                  ${(traditionalUps10YrCost - fttoUps10YrCost).toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">
                  {idfsCount} floor batteries eliminated
                </span>
              </div>
            </div>

            {/* 10-Year Cumulative Summary Table */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="font-semibold text-slate-200">10-Year Operational Overhead Breakdown:</div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Routine Maintenance Labor (10 yrs):</span>
                  <span className="font-mono text-slate-300">
                    Trad: ${(traditionalLaborHours * techHourlyRate * 10).toLocaleString()} vs FTTO: ${(fttoLaborHours * techHourlyRate * 10).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Electricity + Cooling (10 yrs):</span>
                  <span className="font-mono text-slate-300">
                    Trad: ${Math.round(traditional10YrPowerCost).toLocaleString()} vs FTTO: ${Math.round(ftto10YrPowerCost).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>IDF Battery Replacements (10 yrs):</span>
                  <span className="font-mono text-slate-300">
                    Trad: ${traditionalUps10YrCost.toLocaleString()} vs FTTO: ${fttoUps10YrCost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
