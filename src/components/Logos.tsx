import React from 'react';

/**
 * Left Side Primary Brand Logo: Modern Net.Architecture
 * Features an all-optical photonic core symbol with multi-spectral laser lines.
 */
export const BrandLogoLeft: React.FC<{
  className?: string;
  showText?: boolean;
  onClick?: () => void;
}> = ({ className = '', showText = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none transition-transform duration-200 group ${
        onClick ? 'cursor-pointer hover:scale-[1.02]' : ''
      } ${className}`}
    >
      {/* Photonic Optical Core Emblem */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 border border-cyan-400/40 p-1 flex items-center justify-center shadow-lg shadow-cyan-950/60 group-hover:border-cyan-300 transition-colors shrink-0">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Hexagonal Fiber Cladding */}
          <polygon
            points="24,4 42,14 42,34 24,44 6,34 6,14"
            stroke="url(#cladGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="opacity-90"
          />
          {/* Central Glass Core */}
          <circle
            cx="24"
            cy="24"
            r="8.5"
            fill="url(#coreGrad)"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          {/* Multi-Wavelength Laser Photons */}
          <circle cx="24" cy="24" r="3" fill="#ffffff" className="animate-pulse" />
          <line x1="24" y1="4" x2="24" y2="15.5" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="14" x2="31.5" y2="20" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="34" x2="31.5" y2="28" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="44" x2="24" y2="32.5" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
          <line x1="6" y1="34" x2="16.5" y2="28" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
          <line x1="6" y1="14" x2="16.5" y2="20" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="cladGrad" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.5" stopColor="#2dd4bf" />
              <stop offset="1" stopColor="#0284c7" />
            </linearGradient>
            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
            </radialGradient>
          </defs>
        </svg>

        {/* Live Active Fiber Light Pulse */}
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              Modern Net<span className="text-cyan-400">.Architecture</span>
            </span>
            <span className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold uppercase">
              FTTO
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider truncate max-w-[190px] sm:max-w-none">
            All-Optical Campus Reference Suite
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Right Side Institutional Authority Seal:
 * The Islamia University of Bahawalpur (IUB) Directorate of IT
 * Official Academic & Telecom Engineering Authority Crest
 */
export const AuthorityLogoRight: React.FC<{
  className?: string;
  showText?: boolean;
}> = ({ className = '', showText = true }) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none text-right ${className}`}>
      {showText && (
        <div className="hidden sm:flex flex-col text-right leading-tight">
          <div className="flex items-center justify-end gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-amber-300/90 font-mono font-bold">
              The Islamia University of Bahawalpur
            </span>
          </div>
          <span className="text-xs font-extrabold text-white tracking-tight flex items-center justify-end gap-1">
            <span>Directorate of IT</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </span>
        </div>
      )}

      {/* Official IUB Crest Shield / Seal */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950 border border-amber-400/40 p-1 flex items-center justify-center shadow-lg shadow-emerald-950/50 shrink-0">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer Academic Seal Ring */}
          <circle
            cx="24"
            cy="24"
            r="21"
            stroke="url(#sealGold)"
            strokeWidth="2"
            strokeDasharray="2 1"
          />
          {/* Inner Heraldic Shield */}
          <path
            d="M24,7 L37,13 C37,27 24,39 24,39 C24,39 11,27 11,13 L24,7 Z"
            fill="#064e3b"
            stroke="#fbbf24"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Torch of Knowledge & Optical Laser Ray */}
          <path
            d="M24,14 L24,28 M20,20 L28,20"
            stroke="#fbbf24"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Open Book of Academic Excellence */}
          <path
            d="M16,28 C20,26 24,28 24,28 C24,28 28,26 32,28 L32,32 C28,30 24,32 24,32 C24,32 20,30 16,32 Z"
            fill="#fbbf24"
            opacity="0.95"
          />
          {/* Digital Network Nodes inside Seal */}
          <circle cx="16" cy="18" r="1.5" fill="#38bdf8" />
          <circle cx="32" cy="18" r="1.5" fill="#38bdf8" />
          <line x1="16" y1="18" x2="24" y2="14" stroke="#38bdf8" strokeWidth="1" strokeDasharray="1 1" />
          <line x1="32" y1="18" x2="24" y2="14" stroke="#38bdf8" strokeWidth="1" strokeDasharray="1 1" />
          <defs>
            <linearGradient id="sealGold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" />
              <stop offset="0.5" stopColor="#34d399" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>

        {/* Verification Shield Indicator */}
        <span className="absolute -bottom-0.5 -left-0.5 w-2 h-2 rounded-full bg-emerald-400" />
      </div>
    </div>
  );
};
