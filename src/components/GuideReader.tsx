import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Filter, AlertTriangle, CheckCircle, Info, ChevronRight, Bookmark } from 'lucide-react';
import { CHAPTERS_DATA, Chapter } from '../data/chaptersData';

interface GuideReaderProps {
  initialSectionId?: string;
}

export const GuideReader: React.FC<GuideReaderProps> = ({ initialSectionId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeChapterId, setActiveChapterId] = useState<string>(initialSectionId || 'sec-01');

  const categories = ['All', 'Strategy', 'Fundamentals', 'Architecture', 'Optical', 'Datacenter', 'Comparison', 'Economics', 'Governance', 'Implementation', 'Reference'];

  const filteredChapters = useMemo(() => {
    return CHAPTERS_DATA.filter((chap) => {
      const matchesCategory = selectedCategory === 'All' || chap.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        chap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chap.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chap.number.includes(searchQuery) ||
        chap.sections.some(s => s.heading.toLowerCase().includes(searchQuery.toLowerCase()) || s.body.some(b => b.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const currentChapter = useMemo(() => {
    return CHAPTERS_DATA.find((c) => c.id === activeChapterId) || CHAPTERS_DATA[0];
  }, [activeChapterId]);

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>Technical Architecture Guide (All 29 Sections)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Authoritative institutional manual: Full technical text, engineering parameters, ITU-T / IEEE specifications, and leadership perspectives.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search all 29 sections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Category Filter Pills (Functional Buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main 2-Column Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Chapter Navigation Index */}
        <div className="lg:col-span-4 rounded-2xl bg-slate-900/90 border border-slate-800 p-3 max-h-[780px] overflow-y-auto space-y-1">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80 flex justify-between items-center">
            <span>Index of Sections</span>
            <span className="font-mono text-cyan-400 tabular-nums">{filteredChapters.length} / 29</span>
          </div>

          <div className="pt-1 space-y-1">
            {filteredChapters.map((chap) => {
              const isSelected = chap.id === currentChapter.id;
              return (
                <button
                  key={chap.id}
                  onClick={() => setActiveChapterId(chap.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-cyan-500/15 border border-cyan-500/30 text-white'
                      : 'hover:bg-slate-800/40 text-slate-300'
                  }`}
                >
                  <span className={`font-mono text-xs font-bold pt-0.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {chap.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{chap.title}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span>{chap.category}</span>
                      <span>·</span>
                      <span>{chap.readTime}</span>
                    </div>
                  </div>
                </button>
              );
            })}

            {filteredChapters.length === 0 && (
              <div className="p-4 text-center text-xs text-slate-400">
                No sections found matching "{searchQuery}".
              </div>
            )}
          </div>
        </div>

        {/* Right: Section Reading Article */}
        <article className="lg:col-span-8 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6">
          {/* Article Header */}
          <div className="space-y-3 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono font-bold text-cyan-400">SECTION {currentChapter.number}</span>
              <span>·</span>
              <span>{currentChapter.category}</span>
              <span>·</span>
              <span>{currentChapter.readTime} read</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {currentChapter.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {currentChapter.summary}
            </p>
          </div>

          {/* Key Takeaway Banner */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20 text-xs sm:text-sm text-cyan-200 flex items-start gap-3">
            <Bookmark className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Key Architectural Takeaway:</span>
              <span className="text-slate-300 mt-0.5 block leading-relaxed">{currentChapter.keyTakeaway}</span>
            </div>
          </div>

          {/* Section Body Paragraphs */}
          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            {currentChapter.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-base font-bold text-white tracking-tight">{sec.heading}</h4>
                {sec.body.map((para, pIdx) => (
                  <p key={pIdx} className="text-slate-300">{para}</p>
                ))}
                {sec.bulletPoints && (
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300 text-xs sm:text-sm">
                    {sec.bulletPoints.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* High-Fidelity Domain Imagery Anchors */}
          {currentChapter.id === 'sec-05' && (
            <div className="my-6 rounded-xl overflow-hidden border border-slate-800">
              <img
                src="/src/assets/images/olt_chassis_hardware_1791199255676.jpg"
                alt="Carrier-Grade OLT Chassis in Server Cabinet"
                className="w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-2.5 bg-slate-950 text-xs text-slate-400">
                Figure 6: High-density Optical Line Terminal (OLT) chassis with redundant control and PON line cards.
              </div>
            </div>
          )}

          {currentChapter.id === 'sec-10' && (
            <div className="my-6 rounded-xl overflow-hidden border border-slate-800">
              <img
                src="/src/assets/images/modern_office_onu_1791199271610.jpg"
                alt="Modern Office Panel ONU Installation"
                className="w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-2.5 bg-slate-950 text-xs text-slate-400">
                Figure 9: Compact panel ONU mounted in office wall box, eliminating 6 copper cables to the floor IDF.
              </div>
            </div>
          )}

          {/* Callout Boxes */}
          {currentChapter.callouts && currentChapter.callouts.length > 0 && (
            <div className="space-y-3 pt-2">
              {currentChapter.callouts.map((c, cIdx) => (
                <div
                  key={cIdx}
                  className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                    c.type === 'key-point'
                      ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-200'
                      : c.type === 'technical-note'
                      ? 'bg-purple-950/20 border-purple-500/30 text-purple-200'
                      : c.type === 'management'
                      ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                      : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <div className="font-bold flex items-center gap-2 mb-1">
                    {c.type === 'warning' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
                    {c.type === 'key-point' && <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />}
                    {c.type === 'technical-note' && <Info className="w-4 h-4 text-purple-400 shrink-0" />}
                    {c.type === 'management' && <Bookmark className="w-4 h-4 text-amber-400 shrink-0" />}
                    <span>{c.title}</span>
                  </div>
                  <p className="opacity-95">{c.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Data Tables */}
          {currentChapter.tableData && (
            <div className="pt-2 space-y-2">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {currentChapter.tableData.title}
              </h5>
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-slate-300 uppercase text-[10px] tracking-wider">
                    <tr>
                      {currentChapter.tableData.headers.map((h, hIdx) => (
                        <th key={hIdx} className="py-2.5 px-3 border-b border-slate-800 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {currentChapter.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/30">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-2.5 px-3 text-slate-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Article Footer & Chapter Pagination */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Guide · 2026 Reference Framework</span>
            <div className="flex gap-2">
              {parseInt(currentChapter.number) > 1 && (
                <button
                  onClick={() => {
                    const prevNum = String(parseInt(currentChapter.number) - 1).padStart(2, '0');
                    const prevChap = CHAPTERS_DATA.find(c => c.number === prevNum);
                    if (prevChap) setActiveChapterId(prevChap.id);
                  }}
                  className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                >
                  ← Previous Section
                </button>
              )}
              {parseInt(currentChapter.number) < 29 && (
                <button
                  onClick={() => {
                    const nextNum = String(parseInt(currentChapter.number) + 1).padStart(2, '0');
                    const nextChap = CHAPTERS_DATA.find(c => c.number === nextNum);
                    if (nextChap) setActiveChapterId(nextChap.id);
                  }}
                  className="px-3 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 cursor-pointer font-medium"
                >
                  Next Section →
                </button>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
