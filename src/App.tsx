/**
 * Modern Campus Network Infrastructure: FTTO · POL · All-Optical Campus
 * Design & Developed by:
 * Mr. Zeeshan Javed
 * AI System Lead Engineer, Directorate of IT, The Islamia University of Bahawalpur (IUB)
 * 
 * Technical Architecture Guide (2026) by:
 * Rizwan Majeed, Director IT, Institute of Space Technology (IST)
 */

import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { InteractiveTopologyViewer } from './components/InteractiveTopologyViewer';
import { OdnBudgetCalculator } from './components/OdnBudgetCalculator';
import { TcoModeler } from './components/TcoModeler';
import { GuideReader } from './components/GuideReader';
import { ChecklistAuditTool } from './components/ChecklistAuditTool';
import { GlossarySearch } from './components/GlossarySearch';
import { PowerConsumptionSimulator } from './components/PowerConsumptionSimulator';
import { FttoPolStudio } from './components/FttoPolStudio';
import { NetworkDeployment3DGraph, EnvironmentKey } from './components/NetworkDeployment3DGraph';
import { DeploymentLifecycleRoadmap } from './components/DeploymentLifecycleRoadmap';
import { ProjectReportGenerator } from './components/ProjectReportGenerator';
import { VisualBriefReader } from './components/VisualBriefReader';
import { OpticalDiagnosticsSimulator } from './components/OpticalDiagnosticsSimulator';
import { CampusBomEstimator } from './components/CampusBomEstimator';
import { QuickCommandPalette } from './components/QuickCommandPalette';
import { IubEngineeringFooter } from './components/IubEngineeringFooter';
import { CHAPTERS_DATA } from './data/chaptersData';
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
  Server,
  Building,
  Bookmark,
  Network,
  Leaf,
  FileText
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('executive');
  const [selected3DEnv, setSelected3DEnv] = useState<EnvironmentKey>('university');
  const [autoStartVideoTour, setAutoStartVideoTour] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Section 27 "FTTO in 5 Minutes" quick summary
  const fttoIn5Mins = CHAPTERS_DATA.find((c) => c.id === 'sec-27');
  const execSummary = CHAPTERS_DATA.find((c) => c.id === 'sec-01');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* 3-Zone Top Navigation Contract */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrint={handlePrint}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
      />

      <main className="flex-1">
        {/* Tab 1: Executive Overview & Landing */}
        {activeTab === 'executive' && (
          <div className="space-y-12">
            <HeroSection
              onExploreTopology={() => setActiveTab('topology')}
              onOpenCalculator={() => setActiveTab('calculator')}
              onOpenTco={() => setActiveTab('tco')}
              onOpenGuide={() => setActiveTab('guide')}
              onOpenPowerSimulator={() => setActiveTab('power')}
              onOpen3DGraph={() => setActiveTab('deploy-3d')}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              {/* Executive "FTTO in 5 Minutes" Card (Section 27) */}
              <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <Bookmark className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Section 27 Briefing</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">FTTO in 5 Minutes (Executive Synopsis)</h2>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">For University & Institutional Leadership</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                    <p>
                      Today, every floor of every campus building has a small room full of network switches. Each room needs electricity, battery backup, air conditioning, locks and regular attention from the IT team. Multiply that across an entire campus and the IT team is looking after dozens of miniature computer rooms.
                    </p>
                    <p>
                      A modern optical design moves the intelligence of the network into the central IT room or data center, where it is easier to protect, power and manage. From there, thin glass fibers — which need no electricity — carry the network through the buildings. In each office, a small optical box turns the fiber signal back into ordinary network sockets for computers, Wi-Fi, phones and cameras.
                    </p>
                    <p>
                      The result is fewer rooms to run, longer reach (kilometers vs 100 meters), simpler central management, and a glass cabling infrastructure that can be upgraded for decades without re-pulling cables.
                    </p>

                    <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200 font-medium">
                      "We move intelligence toward the central IT room, move fiber closer to users, reduce active switches in distributed rooms, and use compact optical terminals near users."
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-3">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <div className="text-xs font-semibold text-slate-200">The 4 Strategic Levers:</div>
                      <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                        <li><strong className="text-slate-200">Fewer Active Rooms:</strong> 0 switch closets on floors.</li>
                        <li><strong className="text-slate-200">Longer Reach:</strong> Up to 20 km optical vs 100m copper.</li>
                        <li><strong className="text-slate-200">Central Management:</strong> Single OLT / OMCI console.</li>
                        <li><strong className="text-slate-200">Shared Optical Capacity:</strong> DBA scheduled bandwidth.</li>
                      </ul>
                    </div>

                    <button
                      onClick={() => setActiveTab('ftto-studio')}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-xs font-bold text-slate-950 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-cyan-950/40"
                    >
                      <span>Open Figure 5 & FTTO Studio</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                    </button>

                    <button
                      onClick={() => setActiveTab('guide')}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <span>Read Complete 29 Sections</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Side-by-Side Comparison Matrix (Section 01 Table) */}
              <section className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white">At-a-Glance: Traditional vs All-Optical Campus</h3>
                    <p className="text-xs text-slate-400">Baseline comparison for an illustrative 5,000-user university campus</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('tco')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
                  >
                    View Worked Examples →
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-900/80">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 text-slate-300 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4 border-b border-slate-800">Operational Dimension</th>
                        <th className="py-3 px-4 border-b border-slate-800 text-amber-300">Traditional 3-Tier Ethernet</th>
                        <th className="py-3 px-4 border-b border-slate-800 text-cyan-300">Modern All-Optical FTTO / POL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-200">Active Floor Equipment Rooms</td>
                        <td className="py-3 px-4 text-slate-400">10–20 active IDFs needing continuous A/C cooling and UPS maintenance</td>
                        <td className="py-3 px-4 text-slate-200 font-medium text-cyan-300">0 active floor rooms; passive unpowered splitters in shafts</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-200">Horizontal Cable Reach</td>
                        <td className="py-3 px-4 text-slate-400">Strict 100-meter physical channel limit on copper Cat6/Cat6A</td>
                        <td className="py-3 px-4 text-slate-200 font-medium text-cyan-300">Up to 20 km optical transmission on single-mode glass</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-200">Configuration & Monitoring</td>
                        <td className="py-3 px-4 text-slate-400">40–60 individual switches to login, configure, and patch</td>
                        <td className="py-3 px-4 text-slate-200 font-medium text-cyan-300">Centralized profile push via OMCI from central OLT in Data Center</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-200">Campus Real Estate Impact</td>
                        <td className="py-3 px-4 text-slate-400">~60 m² allocated to switch racks, UPS, and air conditioning</td>
                        <td className="py-3 px-4 text-slate-200 font-medium text-cyan-300">60 m² returned to university for faculty offices or classrooms</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-200">Annual Routine Maintenance</td>
                        <td className="py-3 px-4 text-slate-400">~442 hours (~55 technician days) for room inspections and checks</td>
                        <td className="py-3 px-4 text-slate-200 font-medium text-cyan-300">~120 hours (~15 technician days) — 72.8% reduction in rounds</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-200">Physical Architecture Trade-off</td>
                        <td className="py-3 px-4 text-slate-400">Few large switches concentrated in dedicated rooms</td>
                        <td className="py-3 px-4 text-slate-200 font-medium text-cyan-300">Many compact optical terminals at user desks; local power required</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 4 Interactive Tool Cards */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  onClick={() => setActiveTab('topology')}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Network className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Interactive Topology</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Examine interactive network diagrams: All-Optical FTTO, Traditional 3-Tier, Data Center Headend, and Office endpoint delivery.
                  </p>
                  <div className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
                    <span>Explore Topologies</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('calculator')}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 transition-all cursor-pointer group space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">ODN Link Budget</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Interactive optical link budget engineering: adjust fiber distance, splitters (1:2 to 1:64), connectors, and splices.
                  </p>
                  <div className="text-xs font-semibold text-teal-400 flex items-center gap-1">
                    <span>Calculate Loss</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('power')}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer group space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Power & Carbon Simulator</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Model electricity cost savings and metric tons of CO₂ avoided by eliminating active IDF switch closets and dedicated A/C.
                  </p>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <span>Simulate Power</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('tco')}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer group space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">10-Year TCO & Examples</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Simulate university and industrial lifecycle costs: maintenance hours, room leases, and mid-life switch replacement.
                  </p>
                  <div className="text-xs font-semibold text-blue-400 flex items-center gap-1">
                    <span>Model Lifecycle</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </section>

              {/* Enterprise Network Architectures Visual Showcase (Click to Open Full 3D Layout) */}
              <section className="space-y-6 pt-4 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-2">
                      <Layers className="w-3.5 h-3.5" />
                      <span>7 Enterprise Deployment Environments</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      All-Optical Architecture Visual Gallery
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                      Click on any network image below to immediately launch its full interactive 3D layout, inspect physical wiring, and view production CLI configurations.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => {
                        setAutoStartVideoTour(true);
                        setActiveTab('deploy-3d');
                      }}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-lg shadow-rose-950/40 transition-all cursor-pointer self-start sm:self-auto"
                    >
                      <span>🎬 Play 3D Video Tour</span>
                    </button>
                    <button
                      onClick={() => {
                        setAutoStartVideoTour(false);
                        setActiveTab('deploy-3d');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <span>Open 3D Engine</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {[
                    {
                      key: 'university' as EnvironmentKey,
                      title: 'University Campus',
                      subtitle: '10 Academic Faculties · 48C Feeder Ring',
                      badge: 'XGS-PON 10G',
                      badgeColor: 'text-cyan-300 border-cyan-500/30 bg-cyan-950/60',
                      image: '/src/assets/images/university_campus_net_1791279171441.jpg',
                      desc: 'Multi-building backbone connecting data center to smart classrooms, faculty offices, and high-density Wi-Fi 7.'
                    },
                    {
                      key: 'hospital' as EnvironmentKey,
                      title: 'Hospital & Healthcare',
                      subtitle: 'Zero-EMI Glass · MRI PACS Radiology',
                      badge: 'Zero-EMI Clinical',
                      badgeColor: 'text-emerald-300 border-emerald-500/30 bg-emerald-950/60',
                      image: '/src/assets/images/hospital_medical_net_1791279188559.jpg',
                      desc: 'Non-conductive dielectric optical cabling near 3T MRI magnets with sub-50ms life-safety telemetry protection.'
                    },
                    {
                      key: 'industry' as EnvironmentKey,
                      title: 'Smart Industry & Plant',
                      subtitle: 'Rugged DIN-Rail ONUs · SCADA Automation',
                      badge: 'IEC 62443 OT',
                      badgeColor: 'text-amber-300 border-amber-500/30 bg-amber-950/60',
                      image: '/src/assets/images/smart_industry_net_1791279206500.jpg',
                      desc: 'Steel-tape corrugated armored glass resistant to heavy welding sparks, motor vibration, and robotic conveyor lines.'
                    },
                    {
                      key: 'large-campus' as EnvironmentKey,
                      title: 'Large Enterprise Campus',
                      subtitle: '5,000+ Users · Dual OLTs Type B Protection',
                      badge: 'High-Density 100G',
                      badgeColor: 'text-purple-300 border-purple-500/30 bg-purple-950/60',
                      image: '/src/assets/images/large_campus_net_1791279219332.jpg',
                      desc: 'Dual-datacenter redundant aggregation powering 2:32 splitters, stadium AP arrays, and enterprise cloud access.'
                    },
                    {
                      key: 'small-campus' as EnvironmentKey,
                      title: 'Small Campus & SME',
                      subtitle: 'Compact 1U Pizza-Box OLT · Turn-Key',
                      badge: 'Budget Optimized',
                      badgeColor: 'text-blue-300 border-blue-500/30 bg-blue-950/60',
                      image: '/src/assets/images/small_campus_net_1791279238867.jpg',
                      desc: 'Cost-effective 8-port optical headend consuming just 65W with all-in-one wireless ONUs for branch offices.'
                    },
                    {
                      key: 'building' as EnvironmentKey,
                      title: 'Multi-Floor Building',
                      subtitle: 'Basement BEF · Vertical Conduit Riser',
                      badge: '6-Floor Cutaway',
                      badgeColor: 'text-teal-300 border-teal-500/30 bg-teal-950/60',
                      image: '/src/assets/images/building_riser_net_1791279254376.jpg',
                      desc: 'Flame-retardant LSZH vertical riser cable feeding unpowered floor splitters inside electrical shafts.'
                    },
                    {
                      key: 'office' as EnvironmentKey,
                      title: 'Corporate Office HQ',
                      subtitle: 'Executive Floors · Raised Plenum Routing',
                      badge: 'Teams 4K / Zoom',
                      badgeColor: 'text-indigo-300 border-indigo-500/30 bg-indigo-950/60',
                      image: '/src/assets/images/corporate_office_net_1791279273571.jpg',
                      desc: 'Hardware AES-128 encryption with under-desk panel ONUs powering hot-desking stations and 60W video bars.'
                    }
                  ].map((envItem) => (
                    <div
                      key={envItem.key}
                      onClick={() => {
                        setSelected3DEnv(envItem.key);
                        setAutoStartVideoTour(false);
                        setActiveTab('deploy-3d');
                      }}
                      className="group rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/40 cursor-pointer flex flex-col"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                        <img
                          src={envItem.image}
                          alt={envItem.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                        
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border backdrop-blur-md shadow-sm">
                          <span className={envItem.badgeColor + ' px-1.5 py-0.5 rounded'}>{envItem.badge}</span>
                        </div>

                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                          <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {envItem.title}
                          </span>
                          <span className="text-[11px] text-cyan-400 font-mono flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            <span>Open 3D</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] font-semibold text-slate-300">{envItem.subtitle}</div>
                          <p className="text-xs text-slate-400 leading-relaxed mt-1">{envItem.desc}</p>
                        </div>
                        <div className="pt-2 text-[10px] font-mono border-t border-slate-800/80 flex items-center justify-between">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelected3DEnv(envItem.key);
                              setAutoStartVideoTour(true);
                              setActiveTab('deploy-3d');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>▶ 3D Video View</span>
                          </button>
                          <span className="text-slate-400 group-hover:text-cyan-300 flex items-center gap-1">
                            <span>Full 3D Layout</span>
                            <span>→</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* Tab 1.1: Official 3-Page Visual Brief (September 2026) */}
        {activeTab === 'visual-brief' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <VisualBriefReader />
          </div>
        )}

        {/* Tab 1.2: Project Report & Leadership Proposal Generator */}
        {activeTab === 'proposal' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProjectReportGenerator />
          </div>
        )}

        {/* Tab 1.5: FTTO & POL Studio & Figure 5 Interactive */}
        {activeTab === 'ftto-studio' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <FttoPolStudio />
          </div>
        )}

        {/* Tab 1.6: 3D Network Connectivity & Deployment Graph */}
        {activeTab === 'deploy-3d' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <NetworkDeployment3DGraph initialEnvKey={selected3DEnv} initialVideoTour={autoStartVideoTour} />
          </div>
        )}

        {/* Tab 1.8: Deployment Lifecycle Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <DeploymentLifecycleRoadmap />
          </div>
        )}

        {/* Tab 1.9: Optical Fault & Diagnostics Simulator */}
        {activeTab === 'diagnostics' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <OpticalDiagnosticsSimulator />
          </div>
        )}

        {/* Tab 1.95: Campus Bill of Materials (BOM) Estimator */}
        {activeTab === 'bom' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CampusBomEstimator />
          </div>
        )}

        {/* Tab 2: Full Architecture Guide (29 Sections) */}
        {activeTab === 'guide' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <GuideReader />
          </div>
        )}

        {/* Tab 3: Interactive Topology Viewer */}
        {activeTab === 'topology' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <InteractiveTopologyViewer />
          </div>
        )}

        {/* Tab 4: ODN Optical Loss Budget Calculator */}
        {activeTab === 'calculator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <OdnBudgetCalculator />
          </div>
        )}

        {/* Tab 5: Power Consumption & Carbon Footprint Simulator */}
        {activeTab === 'power' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <PowerConsumptionSimulator />
          </div>
        )}

        {/* Tab 6: TCO Modeler & 7 Worked Examples */}
        {activeTab === 'tco' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <TcoModeler />
          </div>
        )}

        {/* Tab 7: Pre-Flight Design Checklist & Vendor Scorecard */}
        {activeTab === 'audit' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ChecklistAuditTool />
          </div>
        )}

        {/* Tab 8: Terminology Glossary */}
        {activeTab === 'glossary' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <GlossarySearch />
          </div>
        )}
      </main>

      {/* Institutional Academic Engineering Footer */}
      <IubEngineeringFooter />

      {/* Quick Command Palette & Search Modal (Ctrl+K) */}
      <QuickCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={(tabId) => setActiveTab(tabId)}
      />
    </div>
  );
}
