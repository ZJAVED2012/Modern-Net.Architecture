import React, { useState, useMemo } from 'react';
import { HelpCircle, Search, AlertTriangle, BookA } from 'lucide-react';
import { GLOSSARY_DATA, GlossaryItem } from '../data/architectureGuide';

export const GlossarySearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  const domains = ['All', 'PON Technology', 'Passive ODN', 'Architecture', 'Security', 'Wireless', 'Power', 'Economics & TCO', 'Hardware'];

  const filteredItems = useMemo(() => {
    return GLOSSARY_DATA.filter((item) => {
      const matchesDomain =
        selectedDomain === 'All' ||
        item.domain.toLowerCase().includes(selectedDomain.toLowerCase());

      const matchesSearch =
        searchTerm === '' ||
        item.abbr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.simpleExplanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.standards && item.standards.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesDomain && matchesSearch;
    });
  }, [searchTerm, selectedDomain]);

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <BookA className="w-5 h-5 text-cyan-400" />
            <span>Abbreviation & Terminology Glossary (Section 29)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Authoritative reference of all 35+ campus optical networking standards, ITU-T / IEEE protocols, and terminology distinctions.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search acronyms or terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Critical Confused Pairs Warning Callout */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 space-y-2">
        <div className="font-bold flex items-center gap-2 text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Critical Disambiguation Warning — Commonly Confused Pairs</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-slate-300">
          <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
            <strong className="text-white">POF vs PoF:</strong> POF (Plastic Optical Fiber) is a short-reach plastic cable material with zero power delivery. PoF (Power over Fiber) is laser optical power or composite copper-fiber delivery.
          </div>
          <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
            <strong className="text-white">ODN vs ODF:</strong> ODN (Optical Distribution Network) is the entire end-to-end passive path. ODF is the physical rack-mount patch chassis in the central IT room.
          </div>
          <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
            <strong className="text-white">FTTO vs POL:</strong> FTTO describes physical fiber reach (to the office). POL describes the transmission technology (Passive Optical LAN tree).
          </div>
          <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
            <strong className="text-white">ONU vs ONT:</strong> ITU-T standards use ONU as the overarching unit, and ONT as single-user terminals. Vendors use both terms interchangeably; check datasheets.
          </div>
        </div>
      </div>

      {/* Domain Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs">
        {domains.map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              selectedDomain === dom
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {dom}
          </button>
        ))}
      </div>

      {/* Glossary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredItems.map((item) => (
          <div
            key={item.abbr}
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-2"
          >
            <div>
              <div className="flex items-center justify-between pb-1">
                <span className="font-mono text-base font-bold text-cyan-400">{item.abbr}</span>
                <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {item.domain}
                </span>
              </div>
              <div className="text-xs font-semibold text-white">{item.fullName}</div>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{item.simpleExplanation}</p>
            </div>

            {item.standards && (
              <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                <span>Standard:</span>
                <span className="text-cyan-300">{item.standards}</span>
              </div>
            )}
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full p-8 text-center text-xs text-slate-400">
            No terms found matching "{searchTerm}".
          </div>
        )}
      </div>
    </div>
  );
};
