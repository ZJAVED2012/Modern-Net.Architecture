import React, { useState, useMemo } from 'react';
import {
  Zap,
  Leaf,
  DollarSign,
  TrendingDown,
  RotateCcw,
  TreePine,
  Car,
  Fuel,
  Home,
  CheckCircle2,
  Building,
  Info,
  Sliders,
  Printer
} from 'lucide-react';

interface CarbonPreset {
  label: string;
  factor: number; // kg CO2 per kWh
  region: string;
}

const CARBON_PRESETS: CarbonPreset[] = [
  { label: 'Coal-Heavy Grid', factor: 0.75, region: 'Asia / Regional Developing' },
  { label: 'US National Avg', factor: 0.38, region: 'United States Average' },
  { label: 'EU Grid Avg', factor: 0.25, region: 'European Union Mix' },
  { label: 'Clean / Hydro', factor: 0.10, region: 'Renewables / Nuclear / Hydro' }
];

export const PowerConsumptionSimulator: React.FC = () => {
  // Primary User Inputs
  const [closetsCount, setClosetsCount] = useState<number>(10);
  const [kwhRate, setKwhRate] = useState<number>(0.16); // $/kWh
  const [switchesPerCloset, setSwitchesPerCloset] = useState<number>(3);
  const [switchPowerWatts, setSwitchPowerWatts] = useState<number>(180); // W
  const [acCoolingRatio, setAcCoolingRatio] = useState<number>(0.60); // 60% of IT load for split A/C
  const [upsLossRatio, setUpsLossRatio] = useState<number>(0.10); // 10% inverter/charging loss
  const [carbonFactor, setCarbonFactor] = useState<number>(0.42); // kg CO2 / kWh
  const [timeHorizonYears, setTimeHorizonYears] = useState<number>(10);
  const [simulationMode, setSimulationMode] = useState<'decommission' | 'net-campus'>('decommission');

  // FTTO Net Campus Parameters (if mode === 'net-campus')
  const [oltChassisWatts] = useState<number>(2400); // 2 redundant OLTs in data center
  const [onuFleetWatts] = useState<number>(6); // 6W avg per ONU
  const onuCount = closetsCount * 100; // estimated ONUs
  const datacenterPue = 1.30; // Data center PUE is much better than closet 1.70 PUE

  // Computations
  const calculations = useMemo(() => {
    // 1. Traditional IDF Load per Closet
    const itLoadPerClosetW = switchesPerCloset * switchPowerWatts;
    const coolingLoadPerClosetW = itLoadPerClosetW * acCoolingRatio;
    const upsLossPerClosetW = (itLoadPerClosetW + coolingLoadPerClosetW) * upsLossRatio;
    const totalLoadPerClosetW = itLoadPerClosetW + coolingLoadPerClosetW + upsLossPerClosetW;

    // Total Traditional Power for all Closets
    const totalTraditionalKw = (totalLoadPerClosetW * closetsCount) / 1000;
    const annualTraditionalKwh = totalTraditionalKw * 24 * 365;

    // 2. Net Campus Calculation (if factoring in OLT + ONUs)
    const fttoTotalWatts = (oltChassisWatts * datacenterPue) + (onuCount * onuFleetWatts);
    const fttoTotalKw = fttoTotalWatts / 1000;
    const annualFttoKwh = fttoTotalKw * 24 * 365;

    // Effective power saved based on mode
    const powerSavedKw = simulationMode === 'decommission'
      ? totalTraditionalKw
      : Math.max(0, totalTraditionalKw - fttoTotalKw);

    const annualEnergySavedKwh = simulationMode === 'decommission'
      ? annualTraditionalKwh
      : Math.max(0, annualTraditionalKwh - annualFttoKwh);

    // Costs
    const annualCostSavings = annualEnergySavedKwh * kwhRate;
    const horizonCostSavings = annualCostSavings * timeHorizonYears;

    // Carbon Footprint (Metric Tons of CO2)
    // 1 kg = 0.001 Metric Ton
    const annualCarbonAvoidedTons = (annualEnergySavedKwh * carbonFactor) / 1000;
    const horizonCarbonAvoidedTons = annualCarbonAvoidedTons * timeHorizonYears;

    // EPA Greenhouse Gas Equivalencies:
    // - 1 Metric Ton CO2 ~ 2,482 miles driven by an avg gasoline passenger vehicle
    // - 1 Metric Ton CO2 ~ 112.5 gallons of gasoline
    // - 1 Metric Ton CO2 ~ 16.5 tree seedlings grown for 10 years
    // - 1 Metric Ton CO2 ~ 0.12 homes annual electricity use (approx 8,800 kWh/home)
    const vehicleMilesEliminated = horizonCarbonAvoidedTons * 2482;
    const gasolineGallonsSaved = horizonCarbonAvoidedTons * 112.5;
    const treesGrown = horizonCarbonAvoidedTons * 16.5;
    const homesPoweredAnnual = (annualEnergySavedKwh / 8800) * timeHorizonYears;

    return {
      itLoadPerClosetW,
      coolingLoadPerClosetW,
      upsLossPerClosetW,
      totalLoadPerClosetW,
      totalTraditionalKw,
      annualTraditionalKwh,
      fttoTotalKw,
      powerSavedKw,
      annualEnergySavedKwh,
      annualCostSavings,
      horizonCostSavings,
      annualCarbonAvoidedTons,
      horizonCarbonAvoidedTons,
      vehicleMilesEliminated,
      gasolineGallonsSaved,
      treesGrown,
      homesPoweredAnnual
    };
  }, [
    closetsCount,
    kwhRate,
    switchesPerCloset,
    switchPowerWatts,
    acCoolingRatio,
    upsLossRatio,
    carbonFactor,
    timeHorizonYears,
    simulationMode,
    oltChassisWatts,
    onuFleetWatts,
    onuCount,
    datacenterPue
  ]);

  // Preset Handlers
  const handlePresetUniversity = () => {
    setClosetsCount(10);
    setKwhRate(0.16);
    setSwitchesPerCloset(3);
    setSwitchPowerWatts(180);
    setAcCoolingRatio(0.60);
    setUpsLossRatio(0.10);
    setCarbonFactor(0.42);
    setTimeHorizonYears(10);
  };

  const handlePresetMegaCampus = () => {
    setClosetsCount(30);
    setKwhRate(0.18);
    setSwitchesPerCloset(4);
    setSwitchPowerWatts(200);
    setAcCoolingRatio(0.70);
    setUpsLossRatio(0.12);
    setCarbonFactor(0.48);
    setTimeHorizonYears(10);
  };

  const handlePresetHospital = () => {
    setClosetsCount(16);
    setKwhRate(0.15);
    setSwitchesPerCloset(4);
    setSwitchPowerWatts(220);
    setAcCoolingRatio(0.80);
    setUpsLossRatio(0.15);
    setCarbonFactor(0.38);
    setTimeHorizonYears(10);
  };

  const handlePresetIndustrial = () => {
    setClosetsCount(4);
    setKwhRate(0.20);
    setSwitchesPerCloset(3);
    setSwitchPowerWatts(190);
    setAcCoolingRatio(0.65);
    setUpsLossRatio(0.10);
    setCarbonFactor(0.55);
    setTimeHorizonYears(10);
  };

  return (
    <div className="space-y-8">
      {/* Header with Title and Mode */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-1.5">
            <Leaf className="w-3.5 h-3.5" />
            <span>Campus Green IT & Decarbonization Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <span>Power Consumption & Carbon Footprint Simulator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Simulate the cumulative electrical and environmental savings of eliminating active floor IDF switch closets, dedicated split air conditioning, and distributed UPS battery plants.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Presets:</span>
          <button
            onClick={handlePresetUniversity}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 transition-colors cursor-pointer"
          >
            University (10 IDFs)
          </button>
          <button
            onClick={handlePresetMegaCampus}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-300 transition-colors cursor-pointer"
          >
            Mega Campus (30 IDFs)
          </button>
          <button
            onClick={handlePresetHospital}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-teal-300 transition-colors cursor-pointer"
          >
            Hospital (16 IDFs)
          </button>
          <button
            onClick={handlePresetIndustrial}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 transition-colors cursor-pointer"
          >
            Industrial (4 IDFs)
          </button>
        </div>
      </div>

      {/* Simulator Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-slate-300">
            <strong>Simulation Scope:</strong> Choose whether to model direct IDF room decommissioning or full-campus net energy including edge ONUs.
          </span>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setSimulationMode('decommission')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              simulationMode === 'decommission'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            IDF Closets Decommissioned
          </button>
          <button
            onClick={() => setSimulationMode('net-campus')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              simulationMode === 'net-campus'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Full-Campus Net View (Sec 19.6)
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Input Controls */}
        <div className="lg:col-span-6 space-y-5 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Input Parameters</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Horizon: {timeHorizonYears} Years
            </span>
          </div>

          {/* 1. Number of Active IDF Closets */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-200 font-medium">Number of Active IDF Closets</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="80"
                  value={closetsCount}
                  onChange={(e) => setClosetsCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-center font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
                <span className="text-slate-400 text-xs">closets</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={closetsCount}
              onChange={(e) => setClosetsCount(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>1 closet (Small building)</span>
              <span>10 closets (University dept)</span>
              <span>50 closets (Full campus)</span>
            </div>
          </div>

          {/* 2. Specific Electricity Rate ($/kWh) */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-200 font-medium">Local Electricity Rate ($/kWh)</label>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.04"
                  max="0.60"
                  value={kwhRate}
                  onChange={(e) => setKwhRate(Math.max(0.01, parseFloat(e.target.value) || 0.01))}
                  className="w-18 bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-center font-mono font-bold text-cyan-400 focus:outline-none focus:border-cyan-500"
                />
                <span className="text-slate-400 text-xs">/ kWh</span>
              </div>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.45"
              step="0.01"
              value={kwhRate}
              onChange={(e) => setKwhRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>$0.08 (Subsidized/Hydro)</span>
              <span>$0.16 (US / Pakistan Avg)</span>
              <span>$0.35+ (High-tariff Europe)</span>
            </div>
          </div>

          {/* 3. Switches per Closet & Power Draw */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300">Switches per Closet</label>
                <span className="font-mono text-cyan-400 font-bold">{switchesPerCloset} units</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={switchesPerCloset}
                onChange={(e) => setSwitchesPerCloset(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500">Total switches: {closetsCount * switchesPerCloset} units</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300">Switch Draw (W)</label>
                <span className="font-mono text-cyan-400 font-bold">{switchPowerWatts} W</span>
              </div>
              <input
                type="range"
                min="100"
                max="350"
                step="10"
                value={switchPowerWatts}
                onChange={(e) => setSwitchPowerWatts(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500">Includes baseline PoE load</span>
            </div>
          </div>

          {/* 4. Dedicated Split A/C & UPS Overhead */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300">Closet A/C Cooling Load</label>
                <span className="font-mono text-teal-300 font-bold">{(acCoolingRatio * 100).toFixed(0)}% of IT</span>
              </div>
              <input
                type="range"
                min="0.30"
                max="1.20"
                step="0.05"
                value={acCoolingRatio}
                onChange={(e) => setAcCoolingRatio(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg cursor-pointer accent-teal-400"
              />
              <span className="text-[10px] text-slate-500">Dedicated split A/C: ~{Math.round(calculations.coolingLoadPerClosetW)}W / closet</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300">UPS Inverter Loss</label>
                <span className="font-mono text-teal-300 font-bold">{(upsLossRatio * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.20"
                step="0.01"
                value={upsLossRatio}
                onChange={(e) => setUpsLossRatio(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg cursor-pointer accent-teal-400"
              />
              <span className="text-[10px] text-slate-500">Continuous heat dissipation</span>
            </div>
          </div>

          {/* 5. Carbon Intensity & Time Horizon */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-200 font-medium">Grid Carbon Intensity</label>
              <span className="font-mono text-emerald-400 font-bold tabular-nums">
                {carbonFactor.toFixed(2)} kg CO₂ / kWh
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CARBON_PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setCarbonFactor(p.factor)}
                  className={`px-2 py-1.5 rounded-lg border text-left text-[11px] transition-colors cursor-pointer ${
                    Math.abs(carbonFactor - p.factor) < 0.01
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="truncate font-medium">{p.label}</div>
                  <div className="text-[10px] opacity-75">{p.factor} kg</div>
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>Time Horizon:</span>
              <div className="flex gap-1.5">
                {[1, 3, 5, 10, 15].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setTimeHorizonYears(yr)}
                    className={`px-2.5 py-1 rounded-md text-xs cursor-pointer ${
                      timeHorizonYears === yr
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {yr} Yrs
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Impact Output Dashboard */}
        <div className="lg:col-span-6 space-y-5">
          {/* 4 Primary Key Indicators */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-lg">
              <div className="flex items-center justify-between text-emerald-400 text-xs">
                <span className="font-semibold uppercase tracking-wider text-[11px]">Electricity Cost Saved</span>
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums mt-1">
                ${Math.round(calculations.horizonCostSavings).toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-300 mt-1">
                ${Math.round(calculations.annualCostSavings).toLocaleString()} saved annually @ ${kwhRate.toFixed(2)}/kWh
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-950/40 via-slate-900 to-slate-900 border border-teal-500/30 shadow-lg">
              <div className="flex items-center justify-between text-teal-300 text-xs">
                <span className="font-semibold uppercase tracking-wider text-[11px]">Carbon Abated ({timeHorizonYears} Yrs)</span>
                <Leaf className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums mt-1">
                {calculations.horizonCarbonAvoidedTons.toFixed(1)} MT
              </div>
              <div className="text-[11px] text-teal-300 mt-1">
                {calculations.annualCarbonAvoidedTons.toFixed(1)} Metric Tons CO₂e / year
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between text-cyan-400 text-xs">
                <span className="font-semibold uppercase tracking-wider text-[11px]">Continuous Load Saved</span>
                <TrendingDown className="w-4 h-4" />
              </div>
              <div className="text-2xl font-extrabold font-mono text-white tabular-nums mt-1">
                {calculations.powerSavedKw.toFixed(1)} kW
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {(calculations.annualEnergySavedKwh / 1000).toFixed(1)} MWh eliminated/year
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between text-amber-300 text-xs">
                <span className="font-semibold uppercase tracking-wider text-[11px]">Floor Closets Removed</span>
                <Building className="w-4 h-4" />
              </div>
              <div className="text-2xl font-extrabold font-mono text-white tabular-nums mt-1">
                {closetsCount} Rooms
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {closetsCount * 6} m² real estate reclaimed
              </div>
            </div>
          </div>

          {/* Environmental Equivalents Cards (EPA GHG Formula) */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Tangible Environmental Equivalents ({timeHorizonYears}-Year Impact)
              </span>
              <span className="text-[10px] text-slate-500 font-mono">EPA Equivalencies Formula</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-center space-y-1">
                <TreePine className="w-5 h-5 text-emerald-400 mx-auto" />
                <div className="font-mono font-bold text-sm text-white tabular-nums">
                  {Math.round(calculations.treesGrown).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">Tree seedlings grown 10 yrs</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-center space-y-1">
                <Fuel className="w-5 h-5 text-teal-400 mx-auto" />
                <div className="font-mono font-bold text-sm text-white tabular-nums">
                  {Math.round(calculations.gasolineGallonsSaved).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">Gallons gasoline avoided</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-center space-y-1">
                <Car className="w-5 h-5 text-blue-400 mx-auto" />
                <div className="font-mono font-bold text-sm text-white tabular-nums">
                  {Math.round(calculations.vehicleMilesEliminated / 1000).toLocaleString()}k
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">Passenger vehicle miles</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-center space-y-1">
                <Home className="w-5 h-5 text-amber-400 mx-auto" />
                <div className="font-mono font-bold text-sm text-white tabular-nums">
                  {calculations.homesPoweredAnnual.toFixed(1)}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">Homes powered for a year</div>
              </div>
            </div>
          </div>

          {/* Breakdown per Closet Stack */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                Electrical Load Composition per Traditional Closet
              </span>
              <span className="font-mono text-cyan-400 font-bold">
                {Math.round(calculations.totalLoadPerClosetW)} Watts / closet
              </span>
            </div>

            {/* Stack bar */}
            <div className="h-4 w-full bg-slate-950 rounded-lg overflow-hidden flex border border-slate-800">
              <div
                style={{ width: `${(calculations.itLoadPerClosetW / calculations.totalLoadPerClosetW) * 100}%` }}
                title={`Switches: ${calculations.itLoadPerClosetW}W`}
                className="bg-cyan-500 h-full"
              />
              <div
                style={{ width: `${(calculations.coolingLoadPerClosetW / calculations.totalLoadPerClosetW) * 100}%` }}
                title={`Dedicated A/C: ${calculations.coolingLoadPerClosetW.toFixed(0)}W`}
                className="bg-teal-500 h-full"
              />
              <div
                style={{ width: `${(calculations.upsLossPerClosetW / calculations.totalLoadPerClosetW) * 100}%` }}
                title={`UPS Losses: ${calculations.upsLossPerClosetW.toFixed(0)}W`}
                className="bg-amber-500 h-full"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                <span>Switches: {calculations.itLoadPerClosetW}W ({((calculations.itLoadPerClosetW / calculations.totalLoadPerClosetW) * 100).toFixed(0)}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                <span>Split A/C: {Math.round(calculations.coolingLoadPerClosetW)}W ({((calculations.coolingLoadPerClosetW / calculations.totalLoadPerClosetW) * 100).toFixed(0)}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span>UPS Loss: {Math.round(calculations.upsLossPerClosetW)}W</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Sensitivity Matrix Table */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Sensitivity Matrix: Annual Electricity Savings Across Rates & Closet Counts
            </h3>
            <p className="text-xs text-slate-400">
              Calculates net annual cash savings ($/year) based on your chosen switch and cooling loads ({Math.round(calculations.totalLoadPerClosetW)}W per closet).
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-medium">100% 24/7/365 Runtime</span>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-300 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3 border-b border-slate-800">Active IDF Closets</th>
                <th className="py-2.5 px-3 border-b border-slate-800 text-right">@ $0.10/kWh</th>
                <th className="py-2.5 px-3 border-b border-slate-800 text-right text-cyan-300">@ $0.14/kWh</th>
                <th className="py-2.5 px-3 border-b border-slate-800 text-right text-emerald-300">@ $0.18/kWh</th>
                <th className="py-2.5 px-3 border-b border-slate-800 text-right">@ $0.22/kWh</th>
                <th className="py-2.5 px-3 border-b border-slate-800 text-right">@ $0.28/kWh</th>
                <th className="py-2.5 px-3 border-b border-slate-800 text-right text-teal-300">Annual CO₂ Saved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {[5, 10, 15, 20, 30, 40, 50].map((cNum) => {
                const kwhPerYr = ((cNum * calculations.totalLoadPerClosetW) / 1000) * 8760;
                const co2PerYr = (kwhPerYr * carbonFactor) / 1000;
                const isCurrent = cNum === closetsCount;

                return (
                  <tr
                    key={cNum}
                    className={`transition-colors ${
                      isCurrent ? 'bg-cyan-500/10 font-bold text-white' : 'hover:bg-slate-800/30 text-slate-300'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-sans font-semibold flex items-center gap-2">
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                      <span>{cNum} Closets</span>
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums">${Math.round(kwhPerYr * 0.10).toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-cyan-300">${Math.round(kwhPerYr * 0.14).toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-emerald-300">${Math.round(kwhPerYr * 0.18).toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">${Math.round(kwhPerYr * 0.22).toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">${Math.round(kwhPerYr * 0.28).toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-teal-300">{co2PerYr.toFixed(1)} MT CO₂</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
