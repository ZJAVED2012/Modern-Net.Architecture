import React, { useState } from 'react';
import {
  FileText,
  Printer,
  ChevronRight,
  Server,
  Layers,
  Zap,
  Monitor,
  Wifi,
  Video,
  Phone,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Building,
  Factory,
  ArrowRight,
  Sparkles,
  Download
} from 'lucide-react';

export const VisualBriefReader: React.FC = () => {
  const [activePage, setActivePage] = useState<'all' | 'p1' | 'p2' | 'p3'>('all');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header and Page Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Official 3-Page Executive Summary (September 2026)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>Modern Campus Network Infrastructure — Visual Brief</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Authored by <strong>Engr. Rizwan Majeed</strong>, Director IT, Institute of Space Technology (IST), after visiting HUAWEI CONNECT 2026, Shanghai. Concise 3-page executive summary for university leadership, data centers, and small industries.
          </p>
        </div>

        {/* Page Switcher & Print Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setActivePage('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activePage === 'all'
                  ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All 3 Pages
            </button>
            <button
              onClick={() => setActivePage('p1')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activePage === 'p1'
                  ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Page 1
            </button>
            <button
              onClick={() => setActivePage('p2')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activePage === 'p2'
                  ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Page 2
            </button>
            <button
              onClick={() => setActivePage('p3')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activePage === 'p3'
                  ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Page 3
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print Visual Brief</span>
          </button>
        </div>
      </div>

      {/* DOCUMENT CANVAS CONTAINER (MATCHES EXACT PDF LOOK) */}
      <div className="space-y-12 max-w-5xl mx-auto text-slate-900 print:text-black">
        {/* ========================================================================= */}
        {/* PAGE 1: THE ARCHITECTURAL CHANGE IN ONE PICTURE                           */}
        {/* ========================================================================= */}
        {(activePage === 'all' || activePage === 'p1') && (
          <div className="p-8 sm:p-12 rounded-3xl bg-white shadow-2xl space-y-8 border border-slate-200 print:border-none print:shadow-none print:p-0 print:break-after-page">
            {/* Page Header Bar */}
            <div className="border-b-2 border-rose-600 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-500 gap-2">
                <span className="font-bold tracking-widest text-rose-700 uppercase">
                  VISUAL BRIEF · FTTO / POL · 2026
                </span>
                <span>Rizwan Majeed · Director IT, Institute of Space Technology · September 2026</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
                Modern Campus Network Infrastructure
              </h1>
              <p className="text-sm text-slate-600 mt-0.5">
                From traditional Ethernet switching to modern all-optical access — for universities, data centers and small industries
              </p>
            </div>

            {/* Section 01 Header Banner */}
            <div className="bg-slate-950 text-white px-4 py-2 rounded-lg flex items-center justify-between text-xs font-bold">
              <span className="tracking-wide">01 THE ARCHITECTURAL CHANGE IN ONE PICTURE</span>
              <span className="text-slate-400 font-normal">Same services · different place for the intelligence</span>
            </div>

            {/* Figure 1: Architectural Difference in One Picture */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Traditional Side */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-1 border-b border-slate-200">
                    Traditional Three-Tier Ethernet
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2 rounded bg-slate-100 border text-center font-bold">Internet / Firewall</div>
                    <div className="text-center font-mono text-[10px] text-slate-400">↓ Fiber Uplink</div>
                    <div className="p-2 rounded bg-slate-200 border text-center font-bold">Core Switch (Central)</div>
                    <div className="text-center font-mono text-[10px] text-slate-400">↓ Fiber Riser</div>
                    <div className="p-2 rounded bg-amber-50 border border-amber-300 text-center font-bold text-amber-900">
                      Distribution Switch (Building)
                    </div>
                    <div className="text-center font-mono text-[10px] text-slate-400">↓ Fiber Riser</div>
                    <div className="p-2 rounded bg-rose-50 border-2 border-rose-400 text-center font-bold text-rose-900">
                      Access Switches (Every Floor Room · ACTIVE)
                    </div>
                    <div className="text-center font-mono text-[10px] text-slate-400">↓ 100m Copper Bundles</div>
                    <div className="p-2 rounded bg-slate-100 border text-center text-[11px]">
                      Desk PCs · Wi-Fi APs · IP Phones · Cameras
                    </div>
                  </div>
                </div>

                {/* FTTO / POL Side */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider pb-1 border-b border-slate-200">
                    FTTO / Passive Optical LAN
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2 rounded bg-slate-100 border text-center font-bold">Internet / Firewall</div>
                    <div className="text-center font-mono text-[10px] text-slate-400">↓ Fiber Uplink</div>
                    <div className="p-2 rounded bg-slate-200 border text-center font-bold">Core Switch (Central)</div>
                    <div className="text-center font-mono text-[10px] text-slate-400">↓ Short Patch</div>
                    <div className="p-2 rounded bg-cyan-50 border-2 border-cyan-500 text-center font-bold text-cyan-950">
                      Optical Line Terminal (OLT in Central IT Room)
                    </div>
                    <div className="text-center font-mono text-[10px] text-emerald-600">↓ Passive Single-Mode Glass (~20 km)</div>
                    <div className="p-2 rounded bg-emerald-50 border border-emerald-400 text-center font-bold text-emerald-950">
                      Passive Splitters in Floor Shafts (0 WATTS · PASSIVE)
                    </div>
                    <div className="text-center font-mono text-[10px] text-emerald-600">↓ Thin Drop Fiber</div>
                    <div className="p-2 rounded bg-cyan-100 border border-cyan-400 text-center font-bold text-cyan-950">
                      Small ONUs in Offices (Ethernet · PoE · Wi-Fi)
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 italic">
                <strong>Figure 1:</strong> Traditional networks put powered switches on every floor. An all-optical design keeps the intelligence in the IT room and uses unpowered fiber and splitters to reach a small Optical Network Unit (ONU) in each office. Users still get the same Ethernet, Wi-Fi, voice and CCTV connections.
              </div>
            </div>

            {/* 4 Pillars Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xl font-extrabold text-slate-900 block">Fewer rooms</span>
                <span className="text-xs text-slate-600 mt-1 block">No powered switch room on each floor</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xl font-extrabold text-slate-900 block">~20 km</span>
                <span className="text-xs text-slate-600 mt-1 block">Fiber reach, against 100 m for copper</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xl font-extrabold text-slate-900 block">One console</span>
                <span className="text-xs text-slate-600 mt-1 block">All access ports managed centrally</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xl font-extrabold text-slate-900 block">Shared</span>
                <span className="text-xs text-slate-600 mt-1 block">Capacity per optical port — size it deliberately</span>
              </div>
            </div>

            {/* The Same Building, Both Ways Comparison */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-4 bg-rose-600 rounded-sm" />
                <span>The same building, both ways</span>
              </h3>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-lg border border-rose-200">
                    <strong className="text-rose-900 block mb-1">Traditional Five-Storey Building:</strong>
                    Five floors, five active equipment rooms, each requiring active switches, battery backup (UPS), precision air conditioning, physical door locks, and fire suppression.
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-emerald-200">
                    <strong className="text-emerald-900 block mb-1">FTTO / POL Modern Architecture:</strong>
                    The same five floors served by unpowered optical splitter boxes in the existing vertical riser shafts, with compact ONUs inside the offices. Only the two ends need electricity.
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 italic pt-1">
                  <strong>Figure 2:</strong> Left: five floors, five equipment rooms. Right: the same five floors served by passive splitter boxes in shafts.
                </div>
              </div>
            </div>

            {/* Red Key Point Callout */}
            <div className="border-l-4 border-rose-600 pl-4 py-2 bg-rose-50/60 rounded-r-xl text-xs sm:text-sm text-slate-800 space-y-1">
              <span className="font-bold text-rose-700 uppercase tracking-wider block text-xs">KEY POINT</span>
              <p>
                <strong>FTTO/POL does not change what the network delivers.</strong> It changes where the active equipment sits, and what carries the signal between the IT room and the user.
              </p>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Modern Campus Network Infrastructure · FTTO / POL — Visual Brief</span>
              <span>Page 1 / 3</span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 2: HOW IT WORKS, AND WHAT IT MEANS FOR THE DATA CENTER               */}
        {/* ========================================================================= */}
        {(activePage === 'all' || activePage === 'p2') && (
          <div className="p-8 sm:p-12 rounded-3xl bg-white shadow-2xl space-y-8 border border-slate-200 print:border-none print:shadow-none print:p-0 print:break-after-page">
            {/* Section 02 Header Banner */}
            <div className="bg-slate-950 text-white px-4 py-2 rounded-lg flex items-center justify-between text-xs font-bold">
              <span className="tracking-wide">02 HOW IT WORKS, AND WHAT IT MEANS FOR THE DATA CENTER</span>
              <span className="text-slate-400 font-normal">An access technology — not a server-fabric replacement</span>
            </div>

            {/* Figures 3 and 4 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Figure 3: Shared Optical Tree</span>
                <p className="text-slate-600">
                  One Optical Line Terminal (OLT) feeds several optical trees. Each port is split passively (1:8, 1:16, 1:32), so many offices share one fiber strand without active repeaters.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Figure 4: The Office Aggregation Point</span>
                <p className="text-slate-600">
                  One office, six devices (2 PCs, 1 printer, 1 Wi-Fi AP, 1 IP phone, 1 camera), three needing PoE. Six long copper runs become <strong>one fiber plus short patch cords</strong>.
                </p>
              </div>
            </div>

            {/* The Data Center Becomes the Optical Head-End */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-4 bg-rose-600 rounded-sm" />
                <span>The data center becomes the optical head-end</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Strengthens Data Center Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-900 text-white font-bold p-2.5">Strengthens the Data Center: How</div>
                  <div className="divide-y divide-slate-200">
                    <div className="p-2.5 bg-white">
                      <strong>Access layer protected:</strong> The OLT sits behind data-center power, cooling and security instead of ten weaker floor rooms.
                    </div>
                    <div className="p-2.5 bg-slate-50">
                      <strong>Fewer core ports:</strong> ≈ 20 building uplinks replaced by ≈ 4 OLT uplinks.
                    </div>
                    <div className="p-2.5 bg-white">
                      <strong>Facility systems included:</strong> CCTV, access control, sensors and emergency phones on one platform.
                    </div>
                    <div className="p-2.5 bg-slate-50">
                      <strong>Central visibility:</strong> Optical power and port status seen before users call.
                    </div>
                  </div>
                </div>

                {/* Keep Switched Ethernet For Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-800 text-white font-bold p-2.5">Keep Switched Ethernet For: Why</div>
                  <div className="divide-y divide-slate-200">
                    <div className="p-2.5 bg-white">
                      <strong>Server-to-server traffic:</strong> East-west high-throughput flows inside the server hall.
                    </div>
                    <div className="p-2.5 bg-slate-50">
                      <strong>Storage & clusters:</strong> Storage networks, hyper-converged and GPU compute clusters.
                    </div>
                    <div className="p-2.5 bg-white">
                      <strong>Dedicated high speed:</strong> Devices needing their own dedicated 25G/100G link.
                    </div>
                    <div className="p-2.5 bg-slate-50">
                      <strong>Latency-critical systems:</strong> Where shared, scheduled capacity is unsuitable.
                    </div>
                  </div>
                </div>
              </div>

              {/* Gray Technical Note Callout */}
              <div className="border-l-4 border-slate-600 pl-4 py-2 bg-slate-100 rounded-r-xl text-xs text-slate-800 space-y-1">
                <span className="font-bold text-slate-700 uppercase tracking-wider block text-[10px]">TECHNICAL NOTE</span>
                <p>
                  A Passive Optical Network (PON) is a shared medium with scheduled upstream slots — excellent for many users with bursty traffic, wrong for server fabrics. <strong>A good design uses both: switched Ethernet inside the server hall, PON for everything outside it.</strong>
                </p>
              </div>
            </div>

            {/* Also Suited to Small Industry */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-4 bg-rose-600 rounded-sm" />
                <span>Also suited to small industry</span>
              </h3>

              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="py-2.5 px-3">Industrial Challenge</th>
                      <th className="py-2.5 px-3">What Fiber Changes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-2 px-3 font-semibold">Warehouse 300 m away</td>
                      <td className="py-2 px-3">No separate switch cabinet or media converter at the far end</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-2 px-3 font-semibold">Motors, welding, electrical drives</td>
                      <td className="py-2 px-3">Fiber is 100% immune to electromagnetic interference</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold">Dusty, hot production floor</td>
                      <td className="py-2 px-3">Passive splitter box instead of a fan-cooled switch cabinet</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-2 px-3 font-semibold">Perimeter cameras along the fence</td>
                      <td className="py-2 px-3">PoE-capable ONUs near the fence, fed by fiber</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold">One- or two-person IT team</td>
                      <td className="py-2 px-3">One OLT and one management screen to look after</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Modern Campus Network Infrastructure · FTTO / POL — Visual Brief</span>
              <span>Page 2 / 3</span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 3: WHAT CHANGES IN PRACTICE — EFFORT, COST AND DECISION              */}
        {/* ========================================================================= */}
        {(activePage === 'all' || activePage === 'p3') && (
          <div className="p-8 sm:p-12 rounded-3xl bg-white shadow-2xl space-y-8 border border-slate-200 print:border-none print:shadow-none print:p-0">
            {/* Section 03 Header Banner */}
            <div className="bg-slate-950 text-white px-4 py-2 rounded-lg flex items-center justify-between text-xs font-bold">
              <span className="tracking-wide">03 WHAT CHANGES IN PRACTICE — EFFORT, COST AND DECISION</span>
              <span className="text-slate-400 font-normal">Illustrative 5,000-user campus</span>
            </div>

            {/* At a Glance Table & Maintenance Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* At a glance table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-900 text-white font-bold p-2.5">At a Glance: 5,000-User Campus</div>
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 border-b">
                    <tr>
                      <th className="py-2 px-3">Metric</th>
                      <th className="py-2 px-2">Traditional</th>
                      <th className="py-2 px-2 text-rose-700">FTTO / POL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-1.5 px-3">Active switch rooms on floors</td>
                      <td className="py-1.5 px-2 font-mono">10</td>
                      <td className="py-1.5 px-2 font-mono font-bold text-rose-700">0</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-1.5 px-3">Floor-level network switches</td>
                      <td className="py-1.5 px-2 font-mono">40</td>
                      <td className="py-1.5 px-2 font-mono font-bold text-rose-700">0</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-3">Network UPS units to maintain</td>
                      <td className="py-1.5 px-2 font-mono">≈ 11</td>
                      <td className="py-1.5 px-2 font-mono font-bold text-emerald-700">1 + critical</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-1.5 px-3">Cooling points for network</td>
                      <td className="py-1.5 px-2 font-mono">≈ 11</td>
                      <td className="py-1.5 px-2 font-mono font-bold text-emerald-700">1 (data center)</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-3">Places to log in for config</td>
                      <td className="py-1.5 px-2 font-mono">≈ 45</td>
                      <td className="py-1.5 px-2 font-mono font-bold text-cyan-700">2 OLTs</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-1.5 px-3">Maximum horizontal reach</td>
                      <td className="py-1.5 px-2 font-mono">100 m</td>
                      <td className="py-1.5 px-2 font-mono font-bold text-cyan-700">up to ~20 km</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-3">Small active devices in offices</td>
                      <td className="py-1.5 px-2 font-mono">none</td>
                      <td className="py-1.5 px-2 font-mono font-bold">≈ 1,200 ONUs</td>
                    </tr>
                    <tr className="bg-emerald-50 font-bold">
                      <td className="py-2 px-3 text-emerald-950">Routine maintenance effort</td>
                      <td className="py-2 px-2 font-mono text-slate-700">≈ 442 h/yr</td>
                      <td className="py-2 px-2 font-mono text-emerald-700">≈ 120 h/yr</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Maintenance effort comparison */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                <span className="font-bold text-slate-900 block">Figure 7: Routine Maintenance Effort per Year</span>
                <div className="space-y-2 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                      <span>Room / IDF Inspections</span>
                      <span>180 h → 24 h</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-rose-600" style={{ width: '13%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                      <span>UPS Battery Checks</span>
                      <span>44 h → 12 h</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-rose-600" style={{ width: '27%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                      <span>Firmware Upgrades</span>
                      <span>68 h → 24 h</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-rose-600" style={{ width: '35%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                      <span>Configuration Changes</span>
                      <span>60 h → 20 h</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-rose-600" style={{ width: '33%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                      <span>Fault Site Visits</span>
                      <span>90 h → 40 h</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-rose-600" style={{ width: '44%' }} />
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-white border text-center font-bold text-slate-800 text-xs">
                  Total Routine Effort: 55 working days/yr → 15 working days/yr
                </div>
              </div>
            </div>

            {/* Central Banner */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold text-center leading-relaxed">
              Fewer rooms to inspect, one place to configure, and optical diagnostics that send the technician to the right office first time — with the same VLANs, policies and user experience.
            </div>

            {/* Where It Fits vs Points to Plan Honestly */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Where it fits */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-900 text-white font-bold p-2.5">Where It Fits — And Where It Does Not</div>
                <div className="divide-y divide-slate-200">
                  <div className="p-2.5 bg-emerald-50/60">
                    <strong className="text-emerald-950 block">Strong Fit:</strong>
                    Multi-building campuses, hostels, hospitals, hotels, outdoor perimeters, and high Wi-Fi 7 density.
                  </div>
                  <div className="p-2.5 bg-slate-50">
                    <strong className="text-slate-800 block">Traditional May Still Be Better:</strong>
                    A single small office within 100 m of one cabinet, recently re-cabled copper with years of life left, or sites needing dedicated 10G+ per device.
                  </div>
                </div>
              </div>

              {/* Points to plan honestly */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-800 text-white font-bold p-2.5">Points to Plan Honestly</div>
                <div className="divide-y divide-slate-200 text-[11px]">
                  <div className="p-2 bg-white">
                    <strong>Power at the ONU:</strong> FTTO removes floor switches, not the need for power at terminals and endpoints.
                  </div>
                  <div className="p-2 bg-slate-50">
                    <strong>Electricity:</strong> Roughly neutral — cooling saved, but ≈ 1,200 ONUs draw power.
                  </div>
                  <div className="p-2 bg-white">
                    <strong>Shared capacity:</strong> Size split ratios and PON type to busy-hour demand.
                  </div>
                  <div className="p-2 bg-slate-50">
                    <strong>Failure domains:</strong> One OLT serves thousands of users — design redundancy deliberately.
                  </div>
                  <div className="p-2 bg-white">
                    <strong>Skills & spares:</strong> Budget for training, optical test tools and spare ONUs.
                  </div>
                </div>
              </div>
            </div>

            {/* Abbreviation Reference Footer */}
            <div className="p-3 bg-slate-50 rounded-xl border text-[10px] text-slate-600 leading-relaxed font-mono">
              <strong>OLT</strong> Optical Line Terminal · <strong>ONU/ONT</strong> Optical Network Unit/Terminal · <strong>ODF</strong> Optical Distribution Frame · <strong>ODN</strong> Optical Distribution Network · <strong>PON</strong> Passive Optical Network · <strong>GPON/XGS-PON</strong> 2.5G/10G symmetric PON · <strong>FTTO</strong> Fiber-to-the-Office · <strong>POL</strong> Passive Optical LAN · <strong>PoE</strong> Power over Ethernet · <strong>IDF/MDF</strong> Intermediate/Main Distribution Frame · <strong>VLAN</strong> Virtual Local Area Network · <strong>UPS</strong> Uninterruptible Power Supply
            </div>

            {/* Page Footer with Attribution */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 font-mono gap-2">
              <div>
                <strong>Rizwan Majeed</strong>, Director IT · Institute of Space Technology (IST)
              </div>
              <div>Modern Campus Network Infrastructure · Page 3 / 3</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
