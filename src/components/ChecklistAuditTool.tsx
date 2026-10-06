import React, { useState } from 'react';
import { CheckSquare, Square, ShieldCheck, Download, Award, ChevronRight, Cable, Gauge, Shield, Zap, Wifi, Settings, HelpCircle } from 'lucide-react';
import { DESIGN_CHECKLIST_SECTIONS, VENDOR_CHECKLIST_DATA, HUAWEI_MODELS_DATA } from '../data/architectureGuide';

export const ChecklistAuditTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'vendor' | 'huawei'>('checklist');
  
  // Track checked items for Section 28
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'p1': true,
    'p3': true,
    'o1': true,
    'o2': true,
    'n1': true,
    'n3': true,
    'pw1': true,
    'w1': true,
    'm1': true
  });

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Compute readiness
  const totalItems = DESIGN_CHECKLIST_SECTIONS.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const readinessPercentage = Math.round((completedItems / totalItems) * 100);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cable': return <Cable className="w-4 h-4 text-cyan-400" />;
      case 'Gauge': return <Gauge className="w-4 h-4 text-teal-400" />;
      case 'Shield': return <Shield className="w-4 h-4 text-blue-400" />;
      case 'Zap': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'Wifi': return <Wifi className="w-4 h-4 text-purple-400" />;
      default: return <Settings className="w-4 h-4 text-emerald-400" />;
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Engineer's Design Checklist & Vendor Matrix</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Sections 24, 25 & 28: Interactive pre-flight engineering audit, vendor proposal evaluation criteria, and Huawei OptiXstar reference hardware catalog.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'checklist'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Engineering Checklist (Sec 28)
          </button>
          <button
            onClick={() => setActiveTab('vendor')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'vendor'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Vendor Evaluation Matrix (Sec 24)
          </button>
          <button
            onClick={() => setActiveTab('huawei')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'huawei'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Huawei OptiXstar Catalog (Sec 25)
          </button>
        </div>
      </div>

      {/* View 1: Engineering Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          {/* Readiness Score Banner */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Campus Pre-Flight Engineering Audit Readiness
              </div>
              <div className="text-xs text-slate-400">
                {completedItems} of {totalItems} specifications audited across Physical, Optical, Network, Power, Wireless, and Operations.
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                  {readinessPercentage}%
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                  {readinessPercentage >= 80 ? 'Tender Ready' : 'Audit In Progress'}
                </div>
              </div>

              <button
                onClick={handlePrintCertificate}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow transition-colors cursor-pointer whitespace-nowrap"
              >
                <Award className="w-4 h-4" />
                <span>Export Audit Summary</span>
              </button>
            </div>
          </div>

          {/* Checklist Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DESIGN_CHECKLIST_SECTIONS.map((cat, cIdx) => {
              const catCompleted = cat.items.filter(item => checkedItems[item.id]).length;
              return (
                <div key={cIdx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(cat.icon)}
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">{cat.category}</h4>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 tabular-nums">
                      {catCompleted}/{cat.items.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {cat.items.map((item) => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`p-2.5 rounded-lg border flex items-start gap-2.5 cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-cyan-950/20 border-cyan-500/30 text-slate-200'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="pt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-cyan-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-600" />
                            )}
                          </div>
                          <span className="text-xs leading-relaxed">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: Vendor Evaluation Matrix */}
      {activeTab === 'vendor' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <strong>Section 24 Objective Procurement Guide:</strong> Use these 14 vendor-neutral questions when evaluating commercial FTTO/POL vendor proposals (Huawei, Nokia, CommScope, D-Link, ZTE, Fiberhome) to protect your institution against proprietary lock-in, poor PoE budgets, or hidden recurring licensing.
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-900/90">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-300 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 border-b border-slate-800">#</th>
                  <th className="py-3 px-4 border-b border-slate-800">Evaluation Domain</th>
                  <th className="py-3 px-4 border-b border-slate-800">Audit Scope</th>
                  <th className="py-3 px-4 border-b border-slate-800">Mandatory Tender Question to Demand</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {VENDOR_CHECKLIST_DATA.map((v, idx) => (
                  <tr key={v.id} className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-mono text-cyan-400 font-bold">{idx + 1}</td>
                    <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">{v.category}</td>
                    <td className="py-3 px-4 text-slate-300 font-medium whitespace-nowrap">{v.item}</td>
                    <td className="py-3 px-4 text-slate-400 leading-relaxed">{v.question}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 3: Huawei OptiXstar Catalog */}
      {activeTab === 'huawei' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <strong>Section 25 Reference Packaging:</strong> Official enterprise optical-terminal models observed at HUAWEI CONNECT 2026, Shanghai (e.huawei.com). Regional specifications and PoE power delivery must be confirmed against regional product datasheets.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HUAWEI_MODELS_DATA.map((hw, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-white">{hw.model}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                    {hw.type}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Optical Uplink:</span>
                    <span className="font-mono text-cyan-300 font-semibold">{hw.uplink}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Downlink Ports:</span>
                    <span className="font-mono text-slate-200">{hw.downlink}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>PoE Capabilities:</span>
                    <span className="font-mono text-teal-300">{hw.poe}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Recommended Campus Use:</span>
                  {hw.typicalUse}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
