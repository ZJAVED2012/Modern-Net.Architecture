import React, { useState } from 'react';
import { BrandLogoLeft, AuthorityLogoRight } from './Logos';
import {
  Network,
  Printer,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  FileText,
  Search,
  Activity,
  FileSpreadsheet,
  Building,
  Radio,
  Layers,
  Wrench,
  Calculator,
  Compass,
  CheckCircle2,
  BookOpen,
  Bot
} from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPrint: () => void;
  onOpenSearch?: () => void;
}

interface NavGroup {
  id: string;
  label: string;
  items: { id: string; label: string; badge?: string }[];
}

export const TopNav: React.FC<TopNavProps> = ({ activeTab, setActiveTab, onPrint, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navGroups: NavGroup[] = [
    {
      id: 'executive',
      label: 'Executive',
      items: [
        { id: 'executive', label: 'Overview' },
        { id: 'visual-brief', label: 'Visual Brief (3 Pages)', badge: 'PDF' },
        { id: 'proposal', label: 'Leadership Proposal', badge: 'New' }
      ]
    },
    {
      id: 'architecture',
      label: 'Architecture & 3D',
      items: [
        { id: 'ftto-studio', label: 'FTTO & POL Studio' },
        { id: 'deploy-3d', label: '3D Deployment Graph', badge: '3D' },
        { id: 'path-tracer', label: 'Optical Path Tracer', badge: 'Trace' },
        { id: 'knowledge-base', label: 'Knowledge Base', badge: 'ITU' },
        { id: 'topology', label: 'Interactive Topology' },
        { id: 'guide', label: 'Architecture Guide (29 Sec)' }
      ]
    },
    {
      id: 'calculators',
      label: 'Calculators & BOM',
      items: [
        { id: 'calculator', label: 'ODN Loss Calculator' },
        { id: 'power', label: 'Power & Carbon Simulator' },
        { id: 'tco', label: 'TCO & Worked Examples' },
        { id: 'bom', label: 'Campus BOM Estimator', badge: 'BOM' }
      ]
    },
    {
      id: 'operations',
      label: 'Deployment & AI',
      items: [
        { id: 'ai-assistant', label: 'AI Optical Chatbot', badge: 'AI' },
        { id: 'roadmap', label: 'Deployment Roadmap (24 Wk)' },
        { id: 'diagnostics', label: 'Optical Fault Simulator', badge: 'Lab' },
        { id: 'audit', label: 'Design Checklist (36 Pt)' },
        { id: 'glossary', label: 'Glossary (50+ Terms)' }
      ]
    }
  ];

  // Helper to find which group the activeTab belongs to
  const currentGroup = navGroups.find(g => g.items.some(i => i.id === activeTab)) || navGroups[0];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand Logo (Left Side) */}
          <div className="flex items-center gap-3">
            <BrandLogoLeft onClick={() => setActiveTab('executive')} />
          </div>

          {/* Zone 2: Standard Categorized Navigation Dropdowns (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navGroups.map((group) => {
              const isGroupActive = group.items.some(i => i.id === activeTab);
              const isDropdownOpen = activeDropdown === group.id;

              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(group.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                      isGroupActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <span>{group.label}</span>
                    <span className="text-[10px] text-slate-500">▾</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 space-y-0.5 animate-fadeIn z-50">
                      {group.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            activeTab === item.id
                              ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Zone 3: Global Actions (Search, PDF, Print, Badges) */}
          <div className="flex items-center gap-2">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                title="Quick Command Palette & Search (Ctrl+K)"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Search</span>
                <kbd className="text-[10px] font-mono bg-slate-800 px-1 py-0.2 rounded text-slate-400 border border-slate-700 ml-0.5">
                  Ctrl K
                </kbd>
              </button>
            )}

            <button
              onClick={() => setActiveTab('ai-assistant')}
              title="Open AI Optical Network Chatbot (Urdu & English)"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Chatbot</span>
            </button>

            <button
              onClick={() => setActiveTab('proposal')}
              title="Generate formal PDF proposal for university leadership"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Proposal PDF</span>
            </button>

            <button
              onClick={onPrint}
              title="Print or Save PDF report"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print</span>
            </button>

            {/* Zone 3 Right Side Official Seal: IUB Directorate of IT (Always visible on right side) */}
            <div className="flex items-center pl-2 sm:pl-2.5 border-l border-slate-800 shrink-0">
              <AuthorityLogoRight />
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Secondary Sub-Bar (Desktop): Instant Access to Current Group Items */}
        <div className="hidden lg:flex items-center justify-between py-1.5 border-t border-slate-800/60 text-xs font-mono">
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="text-slate-500 font-semibold mr-1 uppercase text-[10px]">
              {currentGroup.label}:
            </span>
            {currentGroup.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap text-xs ${
                  activeTab === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="text-[10px] text-slate-500 shrink-0">
            Reference: <strong>Engr. Rizwan Majeed (Director IT, IST)</strong>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Dual Logos in Mobile Menu */}
            <div className="flex items-center justify-between px-3 pb-3 border-b border-slate-800/80">
              <BrandLogoLeft onClick={() => { setActiveTab('executive'); setMobileMenuOpen(false); }} />
              <AuthorityLogoRight />
            </div>
            {navGroups.map((group) => (
              <div key={group.id} className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                  {group.label}
                </div>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                      activeTab === item.id
                        ? 'bg-cyan-500/15 text-cyan-300 font-bold'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}

            <div className="pt-3 border-t border-slate-800 px-3 flex items-center justify-between text-xs text-slate-400">
              <span>Directorate of IT · IUB</span>
              <button onClick={onPrint} className="text-cyan-400 flex items-center gap-1">
                <Printer className="w-3.5 h-3.5" /> Print Brief
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
