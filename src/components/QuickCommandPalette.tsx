import React, { useState, useEffect } from 'react';
import {
  Search,
  Command,
  ArrowRight,
  Layers,
  Wrench,
  FileText,
  Compass,
  Activity,
  FileSpreadsheet,
  CheckCircle2,
  Terminal,
  X,
  BookOpen
} from 'lucide-react';
import { CHAPTERS_DATA } from '../data/chaptersData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
  onSelectSection?: (sectionNumber: string) => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: 'Tools & Simulators' | 'Architecture Sections (1-29)' | 'CLI & Configurations';
  description: string;
  action: () => void;
}

export const QuickCommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onSelectSection
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build searchable index
  const items: SearchItem[] = [
    // Tools
    {
      id: 'tool-visual-brief',
      title: 'Visual Brief (3-Page Executive Summary)',
      category: 'Tools & Simulators',
      description: 'Official September 2026 3-page brief: Figure 1 architecture, data center roles, and maintenance economics',
      action: () => { onSelectTab('visual-brief'); onClose(); }
    },
    {
      id: 'tool-proposal',
      title: 'Leadership Proposal & PDF Generator',
      category: 'Tools & Simulators',
      description: 'Generate institutional PDF proposal with formal sign-off blocks and dividends',
      action: () => { onSelectTab('proposal'); onClose(); }
    },
    {
      id: 'tool-ftto-studio',
      title: 'FTTO & POL Interactive Device Studio',
      category: 'Tools & Simulators',
      description: 'Figure 5 schematic, multi-environment profiles, port wiring, and CLI inspector',
      action: () => { onSelectTab('ftto-studio'); onClose(); }
    },
    {
      id: 'tool-deploy-3d',
      title: '3D Network Connectivity & Deployment Graph',
      category: 'Tools & Simulators',
      description: 'Interactive 3D isometric network graph across 7 environments with equipment deployment stages',
      action: () => { onSelectTab('deploy-3d'); onClose(); }
    },
    {
      id: 'tool-roadmap',
      title: 'Deployment Lifecycle Roadmap (10 Phases)',
      category: 'Tools & Simulators',
      description: '24-week Gantt schedule, 40-point punch list, JSON export/import, and Team Share link',
      action: () => { onSelectTab('roadmap'); onClose(); }
    },
    {
      id: 'tool-diagnostics',
      title: 'Optical Fault & Diagnostics Simulator',
      category: 'Tools & Simulators',
      description: 'Virtual OPM, OTDR trace graph, dirty connector, macro-bend, and rogue ONT lab',
      action: () => { onSelectTab('diagnostics'); onClose(); }
    },
    {
      id: 'tool-bom',
      title: 'Campus Bill of Materials (BOM) Estimator',
      category: 'Tools & Simulators',
      description: 'Hardware sizing, optical port estimator, tender CSV export, and Capex calculation',
      action: () => { onSelectTab('bom'); onClose(); }
    },
    {
      id: 'tool-calculator',
      title: 'ODN Optical Loss Budget Calculator',
      category: 'Tools & Simulators',
      description: 'Calculate fiber loss, splitters, connectors, splices, and safety headroom margin',
      action: () => { onSelectTab('calculator'); onClose(); }
    },
    {
      id: 'tool-power',
      title: 'Power & Decarbonization Simulator',
      category: 'Tools & Simulators',
      description: 'Calculate annual kWh saved, electricity cost avoided, and MT CO2e abated',
      action: () => { onSelectTab('power'); onClose(); }
    },
    {
      id: 'tool-tco',
      title: '10-Year TCO & Worked Economics Model',
      category: 'Tools & Simulators',
      description: 'Floor IDF closet decommissioning, technician hours saved, and space reclaimed',
      action: () => { onSelectTab('tco'); onClose(); }
    },
    {
      id: 'tool-audit',
      title: 'Design Checklist & Verification Audit',
      category: 'Tools & Simulators',
      description: '36-point engineering validation checklist across all lifecycle phases',
      action: () => { onSelectTab('audit'); onClose(); }
    },
    {
      id: 'tool-glossary',
      title: 'Optical Networking Glossary (50+ Terms)',
      category: 'Tools & Simulators',
      description: 'Comprehensive definitions of XGS-PON, OMCI, DBA, PLC, OTDR, OLT, ONT, ODF',
      action: () => { onSelectTab('glossary'); onClose(); }
    },

    // CLI & Configurations
    {
      id: 'cli-olt',
      title: 'OLT CLI Configuration (Huawei / ZTE / Nokia)',
      category: 'CLI & Configurations',
      description: 'DBA profiles, ONT line profiles, service ports, and serial number registration',
      action: () => { onSelectTab('ftto-studio'); onClose(); }
    },
    {
      id: 'cli-core',
      title: 'Campus Core Switch Configuration',
      category: 'CLI & Configurations',
      description: '100GE LACP Eth-Trunk, VLANIF gateways, DHCP relay Option 82, and OSPF',
      action: () => { onSelectTab('ftto-studio'); onClose(); }
    },
    {
      id: 'cli-firewall',
      title: 'Enterprise Firewall Security Zones & Policies',
      category: 'CLI & Configurations',
      description: 'Trust/Untrust zones, student isolation, outbound NAT, and CCTV ACL rules',
      action: () => { onSelectTab('ftto-studio'); onClose(); }
    },
    {
      id: 'cli-wifi',
      title: 'Wi-Fi 7 AP Multi-SSID VAP Profiles',
      category: 'CLI & Configurations',
      description: 'Faculty, Student, Guest SSID trunks, 320 MHz channels, and WPA3 Enterprise',
      action: () => { onSelectTab('ftto-studio'); onClose(); }
    },

    // All 29 Architecture Sections
    ...CHAPTERS_DATA.map(ch => ({
      id: `section-${ch.number}`,
      title: `Section ${ch.number}: ${ch.title}`,
      category: 'Architecture Sections (1-29)' as const,
      description: ch.summary || `Engineering principles and implementation for ${ch.title}`,
      action: () => {
        onSelectTab('guide');
        if (onSelectSection) onSelectSection(ch.number);
        onClose();
      }
    }))
  ];

  const filteredItems = items.filter(item => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden text-slate-200">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800 bg-slate-950">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search tools, CLI commands, 29 sections, fault simulator, BOM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-slate-500"
          />
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No matching tools, sections, or CLI configurations found for "{searchQuery}".
            </div>
          ) : (
            filteredItems.map(item => (
              <div
                key={item.id}
                onClick={item.action}
                className="p-3 rounded-xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div className="space-y-0.5 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {item.category.split(' ')[0]}
                    </span>
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Tip: Press <strong>ESC</strong> to close. Click any result to navigate instantly.</span>
          <span className="font-mono text-cyan-400">{filteredItems.length} items</span>
        </div>
      </div>
    </div>
  );
};
