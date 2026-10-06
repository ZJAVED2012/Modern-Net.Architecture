import React from 'react';
import { Network, ShieldCheck, ExternalLink } from 'lucide-react';

export const IubEngineeringFooter: React.FC = () => {
  return (
    <footer className="mt-16 bg-slate-950 border-t border-slate-800 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80">
          {/* Col 1: System Identification & IUB Directorate of IT */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Network className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-white text-sm">
                Modern Net.Architecture
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Engineering reference architecture and decision modeling platform for migrating modern university campuses, data centers, and industrial facilities from legacy copper Ethernet switching to Passive Optical LAN (FTTO/POL).
            </p>

            <div className="pt-1 text-slate-300">
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Designed & Developed by</div>
              <div className="text-xs font-bold text-cyan-400 mt-0.5">Mr. Zeeshan Javed</div>
              <div className="text-[11px] text-slate-400">
                AI System Lead Engineer · Directorate of IT
              </div>
              <div className="text-[11px] text-slate-300 font-medium">
                The Islamia University of Bahawalpur (IUB)
              </div>
            </div>
          </div>

          {/* Col 2: Author & Technical Origin */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
              Technical Guide Publication
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-white font-medium">Prepared by:</strong> Rizwan Majeed
            </div>
            <div className="text-xs text-slate-400">
              Director IT · Institute of Space Technology (IST)
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              Field architecture study prepared following <strong className="text-slate-300">HUAWEI CONNECT 2026, Shanghai</strong>, to support universities, data centers and small industries in understanding and executing all-optical campus modernizations.
            </p>
            <div className="text-[10px] text-slate-500 pt-1">
              Independent educational and engineering document. Product names and trademarks are property of their respective owners.
            </div>
          </div>

          {/* Col 3: Reference Standards & ITU-T Baselines */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
              Governing Standards
            </div>
            <ul className="space-y-1 text-[11px] text-slate-400">
              <li>· ITU-T G.984 (GPON 2.5G/1.25G)</li>
              <li>· ITU-T G.9807.1 (XGS-PON 10G Symmetric)</li>
              <li>· ITU-T G.9804 (50G-PON Coexistence)</li>
              <li>· IEEE 802.3bt (PoE++ up to 90W)</li>
              <li>· IEEE 802.1Q (VLAN Trunking)</li>
              <li>· IEEE 802.1X (Network Access Control)</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 Directorate of IT · The Islamia University of Bahawalpur (IUB). All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Mr. Zeeshan Javed, AI System Lead Engineer</span>
            <span>·</span>
            <span>Directorate of IT, IUB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
