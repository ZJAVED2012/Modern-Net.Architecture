import React from 'react';
import { ArrowRight, Cpu, Layers, Activity, ShieldCheck, Zap, BookOpen, Compass, Leaf } from 'lucide-react';

interface HeroSectionProps {
  onExploreTopology: () => void;
  onOpenCalculator: () => void;
  onOpenTco: () => void;
  onOpenGuide: () => void;
  onOpenPowerSimulator: () => void;
  onOpen3DGraph?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreTopology,
  onOpenCalculator,
  onOpenTco,
  onOpenGuide,
  onOpenPowerSimulator,
  onOpen3DGraph,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 border-b border-slate-800/60">
      {/* Background radial gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-b from-cyan-900/15 via-blue-900/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Attribution Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/60 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">Directorate of IT</span>
            <span>·</span>
            <span>The Islamia University of Bahawalpur (IUB)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Engineering Architecture:</span>
            <span className="text-cyan-300 font-medium">Mr. Zeeshan Javed, AI System Lead Engineer</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Title & Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300">
              <Layers className="w-3.5 h-3.5" />
              <span>FTTO · POL · All-Optical Campus Reference Framework 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Modern Campus Network <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">Infrastructure</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Transition from multi-floor copper switch closets to centralized, carrier-grade passive optical LAN. Move intelligence to the central data center, extend thin single-mode glass to user desks, and eliminate distributed floor maintenance.
            </p>

            {/* Publication Source Badge */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-medium text-slate-200">Technical Publication & Field Report:</span>
                <span className="text-cyan-400">HUAWEI CONNECT 2026, Shanghai</span>
              </div>
              <p className="text-slate-400 leading-normal">
                Prepared by <strong className="text-slate-200">Rizwan Majeed</strong>, Director IT, Institute of Space Technology (IST), to support universities, data centers and small industries in deploying high-performance all-optical networks.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreTopology}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-lg shadow-lg shadow-cyan-950/40 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Interactive Topology Explorer</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpen3DGraph && (
                <button
                  onClick={onOpen3DGraph}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/50 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-md shadow-cyan-950/30"
                >
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>3D Deployment Graph</span>
                </button>
              )}

              <button
                onClick={onOpenPowerSimulator}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-emerald-300 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-500/40 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>Power & Carbon Simulator</span>
              </button>

              <button
                onClick={onOpenGuide}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 text-teal-400" />
                <span>29-Section Guide</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual & Core Metrics */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src="/src/assets/images/hero_optical_campus_1791199237157.jpg"
                alt="All-Optical Campus Architecture Visualization"
                className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">Central Data Center Optical Headend</div>
                  <div className="text-slate-400">Direct Passive Feeder to 10 Academic Facilities</div>
                </div>
                <div className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[11px]">
                  XGS-PON / 10G
                </div>
              </div>
            </div>

            {/* 4 Quantitative Rigor Indicators */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">72.8%</div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">Technician Hours Saved</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Annual routine maintenance (442h → 120h)</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-2xl font-bold font-mono text-teal-300 tabular-nums">60 m²</div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">Floor Space Reclaimed</div>
                <div className="text-[11px] text-slate-400 mt-0.5">10 active switch closets returned to faculty</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-2xl font-bold font-mono text-blue-400 tabular-nums">5,000+</div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">User Reference Campus</div>
                <div className="text-[11px] text-slate-400 mt-0.5">10 Academic Buildings, 2 Libraries, 5 Hostels</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">20+ Yrs</div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">Single-Mode Glass Lifespan</div>
                <div className="text-[11px] text-slate-400 mt-0.5">GPON, XGS-PON and 50G-PON coexist</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
