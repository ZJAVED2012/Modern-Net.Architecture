import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Building,
  DollarSign,
  Zap,
  Gauge,
  Award,
  ShieldCheck,
  ChevronRight,
  Sliders,
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  FileCheck
} from 'lucide-react';
import { jsPDF } from 'jspdf';

interface ProposalParams {
  projectTitle: string;
  targetInstitution: string;
  preparedFor: string;
  leadEngineer: string;
  leadEngineerRole: string;
  technicalReference: string;
  campusBuildingsCount: number;
  idfsDecommissioned: number;
  userPopulation: number;
  onusCount: number;
  fiberDistanceKm: number;
  splitterRatio: string;
  calculatedLossDb: number;
  opticsClass: string;
  opticalHeadroomDb: number;
  kwhRate: number;
  annualEnergySavedKwh: number;
  tenYearPowerSavingsDollars: number;
  tenYearCarbonAvoidedTons: number;
  annualMaintenanceSavedHours: number;
  tenYearLaborSavingsDollars: number;
  spaceReclaimedSqm: number;
  implementationWeeks: number;
  pilotBuilding: string;
  recommendedAction: string;
}

export const ProjectReportGenerator: React.FC = () => {
  // Configurable Proposal State
  const [params, setParams] = useState<ProposalParams>({
    projectTitle: 'All-Optical Campus Network Infrastructure Modernization Proposal',
    targetInstitution: 'The Islamia University of Bahawalpur (IUB)',
    preparedFor: 'The Vice Chancellor, Syndicate & Directorate of IT',
    leadEngineer: 'Mr. Zeeshan Javed',
    leadEngineerRole: 'AI System Lead Engineer, Directorate of IT, The Islamia University of Bahawalpur',
    technicalReference: 'Engr. Rizwan Majeed, Director IT, Institute of Space Technology (IST) (HUAWEI CONNECT 2026)',
    campusBuildingsCount: 10,
    idfsDecommissioned: 10,
    userPopulation: 5000,
    onusCount: 1200,
    fiberDistanceKm: 2.0,
    splitterRatio: '1:16 / 1:32 Hybrid',
    calculatedLossDb: 23.8,
    opticsClass: 'XGS-PON Class N1 (29.0 dB Budget)',
    opticalHeadroomDb: 5.2,
    kwhRate: 0.16,
    annualEnergySavedKwh: 92850,
    tenYearPowerSavingsDollars: 148560,
    tenYearCarbonAvoidedTons: 390.0,
    annualMaintenanceSavedHours: 322,
    tenYearLaborSavingsDollars: 112700,
    spaceReclaimedSqm: 60,
    implementationWeeks: 24,
    pilotBuilding: 'Faculty of Computing & Information Technology (FCIT)',
    recommendedAction: 'Approve Phase 1 Data Center Headend provisioning and Phase 3 Pilot Building deployment at FCIT to substantiate operational and thermal savings before campus-wide cutover.'
  });

  const [activePreviewTab, setActivePreviewTab] = useState<'proposal-view' | 'editor'>('proposal-view');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleInputChange = (field: keyof ProposalParams, value: any) => {
    setParams(prev => ({ ...prev, [field]: value }));
  };

  // Compile / Reset from reference models
  const handleResetToBaseline = () => {
    setParams({
      projectTitle: 'All-Optical Campus Network Infrastructure Modernization Proposal',
      targetInstitution: 'The Islamia University of Bahawalpur (IUB)',
      preparedFor: 'The Vice Chancellor, Syndicate & Directorate of IT',
      leadEngineer: 'Mr. Zeeshan Javed',
      leadEngineerRole: 'AI System Lead Engineer, Directorate of IT, The Islamia University of Bahawalpur',
      technicalReference: 'Engr. Rizwan Majeed, Director IT, Institute of Space Technology (IST) (HUAWEI CONNECT 2026)',
      campusBuildingsCount: 10,
      idfsDecommissioned: 10,
      userPopulation: 5000,
      onusCount: 1200,
      fiberDistanceKm: 2.0,
      splitterRatio: '1:16 / 1:32 Hybrid',
      calculatedLossDb: 23.8,
      opticsClass: 'XGS-PON Class N1 (29.0 dB Budget)',
      opticalHeadroomDb: 5.2,
      kwhRate: 0.16,
      annualEnergySavedKwh: 92850,
      tenYearPowerSavingsDollars: 148560,
      tenYearCarbonAvoidedTons: 390.0,
      annualMaintenanceSavedHours: 322,
      tenYearLaborSavingsDollars: 112700,
      spaceReclaimedSqm: 60,
      implementationWeeks: 24,
      pilotBuilding: 'Faculty of Computing & Information Technology (FCIT)',
      recommendedAction: 'Approve Phase 1 Data Center Headend provisioning and Phase 3 Pilot Building deployment at FCIT to substantiate operational and thermal savings before campus-wide cutover.'
    });
  };

  // Browser Native Print
  const handleBrowserPrint = () => {
    window.print();
  };

  // Direct jsPDF Document Generation
  const handleGeneratePdf = () => {
    setIsGeneratingPdf(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const primaryColor = [15, 23, 42]; // Slate 900
      const accentCyan = [6, 182, 212]; // Cyan 500
      const textMuted = [100, 116, 139]; // Slate 500
      const textDark = [30, 41, 59]; // Slate 800

      // Page 1: Formal Cover & Executive Summary
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 45, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('INSTITUTIONAL TECHNICAL PROPOSAL · ALL-OPTICAL CAMPUS ARCHITECTURE', 14, 18);

      doc.setFontSize(18);
      doc.text(params.projectTitle, 14, 28, { maxWidth: 182 });

      doc.setFontSize(9);
      doc.setTextColor(6, 182, 212);
      doc.text(`Target Institution: ${params.targetInstitution}`, 14, 38);

      // Metadata Bar
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Prepared For: ${params.preparedFor}`, 14, 53);
      doc.text(`Lead Engineer: ${params.leadEngineer}, AI System Lead Engineer, Directorate of IT`, 14, 59);
      doc.text(`Technical Architecture Baseline: ${params.technicalReference}`, 14, 65);
      doc.text(`Date of Submission: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 14, 71);

      doc.setDrawColor(226, 232, 240);
      doc.line(14, 75, 196, 75);

      // Section 1: Executive Overview
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('1. Executive Overview & Strategic Proposition', 14, 83);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      const execText = `This engineering proposal recommends the institutional migration of ${params.targetInstitution} from legacy multi-floor copper Ethernet switching to an All-Optical Passive Optical LAN (FTTO/POL) architecture. By concentrating network intelligence into redundant Optical Line Terminals (OLTs) in the central data center and routing single-mode glass to compact Optical Network Units (ONUs) at desks, the university eliminates ${params.idfsDecommissioned} active floor switch closets, removes recurring split A/C electricity overhead, and returns ${params.spaceReclaimedSqm} square meters of prime floor space to academic teaching.`;
      doc.text(execText, 14, 90, { maxWidth: 182, lineHeightFactor: 1.4 });

      // Key Metrics Box
      doc.setFillColor(248, 250, 252);
      doc.rect(14, 114, 182, 38, 'F');
      doc.setDrawColor(203, 213, 225);
      doc.rect(14, 114, 182, 38, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('SUMMARY OF 10-YEAR INSTITUTIONAL DIVIDENDS:', 18, 121);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(`• Electricity & Cooling Savings: $${params.tenYearPowerSavingsDollars.toLocaleString()} avoided over 10 years (@ $${params.kwhRate.toFixed(2)}/kWh)`, 18, 128);
      doc.text(`• Maintenance Labor Released: ${params.annualMaintenanceSavedHours} hours saved per year (~$${params.tenYearLaborSavingsDollars.toLocaleString()} in technician capacity)`, 18, 134);
      doc.text(`• Academic Floor Space Reclaimed: ${params.spaceReclaimedSqm} m² of switch closets converted to faculty offices / seminar rooms`, 18, 140);
      doc.text(`• Decarbonization Footprint: ${params.tenYearCarbonAvoidedTons.toFixed(1)} Metric Tons of CO2e prevented (${(params.annualEnergySavedKwh / 1000).toFixed(1)} MWh/yr saved)`, 18, 146);

      // Section 2: Technical Specifications & Optical Budget
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('2. Technical ODN & Optical Link Budget Certification', 14, 160);

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.text(`• PON Access Standard: ${params.opticsClass}`, 14, 168);
      doc.text(`• Optical Splitter Topology: ${params.splitterRatio} (PLC Passive Splitters in ELV shafts)`, 14, 174);
      doc.text(`• Maximum Transmission Distance: ${params.fiberDistanceKm.toFixed(1)} km from Data Center ODF to endpoints`, 14, 180);
      doc.text(`• Calculated End-to-End Loss: ${params.calculatedLossDb.toFixed(2)} dB (Fiber + Splitter + Connectors + 3.0 dB safety margin)`, 14, 186);
      doc.text(`• Certified Link Headroom: +${params.opticalHeadroomDb.toFixed(2)} dB margin (STATUS: PASS - STABLE)`, 14, 192);

      // Section 3: Recommended Action & Pilot Gate
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('3. Gated Phased Deployment & Recommended Action', 14, 206);

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      const actionText = `To guarantee institutional risk mitigation, a 24-week gated deployment is recommended. Execution begins with the Pilot Building at ${params.pilotBuilding}. Once optical power stability, sub-50ms Type B feeder protection failover, and operational savings are substantiated, campus-wide cutover of all ${params.campusBuildingsCount} facilities will proceed.`;
      doc.text(actionText, 14, 213, { maxWidth: 182, lineHeightFactor: 1.4 });

      // Sign-off signature table
      doc.setDrawColor(203, 213, 225);
      doc.line(14, 238, 196, 238);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('Prepared By:', 14, 246);
      doc.text('Approved / Endorsed By:', 110, 246);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(`${params.leadEngineer}`, 14, 258);
      doc.text('AI System Lead Engineer, Directorate of IT', 14, 263);
      doc.text(params.targetInstitution, 14, 268);

      doc.text('Director IT / Vice Chancellor & Syndicate', 110, 258);
      doc.text('Executive Committee for Infrastructure & Technology', 110, 263);
      doc.text(params.targetInstitution, 110, 268);

      // Page footer
      doc.setFontSize(7.5);
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.text(`Generated by All-Optical Campus Architecture Engineering Suite · Directorate of IT, IUB · ${new Date().toISOString().slice(0, 10)}`, 14, 287);

      // Save PDF file
      const safeTitle = params.projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      doc.save(`${safeTitle}-proposal-${new Date().toISOString().slice(0, 10)}.pdf`);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('An error occurred while generating the PDF. Please use the Print View button to Save as PDF via browser print.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Executive Governance & Procurement Suite</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>Project Report & Leadership Proposal Generator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Compiles inputs and calculations from the ODN Loss Calculator, Power Simulator, and 10-Year TCO Modeler into a formal, downloadable engineering proposal for university leadership.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActivePreviewTab('proposal-view')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activePreviewTab === 'proposal-view'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Proposal Document
            </button>
            <button
              onClick={() => setActivePreviewTab('editor')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activePreviewTab === 'editor'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Customize Inputs
            </button>
          </div>

          {/* Download PDF via jsPDF */}
          <button
            onClick={handleGeneratePdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-cyan-950/40"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF Proposal'}</span>
          </button>

          {/* Browser Native Print to PDF */}
          <button
            onClick={handleBrowserPrint}
            title="Print or Save as PDF via browser"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print View</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between animate-fadeIn shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">Proposal PDF successfully downloaded to your computer!</span>
          </div>
          <span className="text-[10px] text-emerald-300 font-mono">Formal Engineering Proposal</span>
        </div>
      )}

      {/* VIEW 1: FORMAL PROPOSAL DOCUMENT PREVIEW */}
      {activePreviewTab === 'proposal-view' && (
        <div className="p-6 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 text-slate-200 max-w-4xl mx-auto print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
          {/* Official Document Header */}
          <div className="space-y-4 pb-6 border-b border-slate-800 print:border-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 print:text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 print:bg-slate-800" />
                <span className="font-semibold text-slate-200 print:text-black uppercase tracking-wider">
                  DIRECTORATE OF IT · {params.targetInstitution.toUpperCase()}
                </span>
              </div>
              <span className="font-mono">Document Ref: IUB-ENG-FTTO-2026-V1</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black tracking-tight leading-snug">
              {params.projectTitle}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 print:text-slate-700 pt-1">
              <div>
                <strong>Submitted To:</strong> {params.preparedFor}
              </div>
              <div>
                <strong>Submission Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div>
                <strong>Lead Author / Engineer:</strong> {params.leadEngineer}, {params.leadEngineerRole}
              </div>
              <div>
                <strong>Architecture Baseline:</strong> {params.technicalReference}
              </div>
            </div>
          </div>

          {/* 1. Executive Summary */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white print:text-black border-b border-slate-800/80 print:border-slate-300 pb-1.5 flex items-center gap-2">
              <span className="font-mono text-cyan-400 print:text-black">1.0</span>
              <span>Executive Summary & Strategic Rationale</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
              This technical and financial proposal recommends the planned modernization of {params.targetInstitution} from conventional three-tier copper switching to a carrier-grade <strong>Fiber-to-the-Office (FTTO) / Passive Optical LAN (POL)</strong> architecture.
            </p>

            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
              Legacy campus switching currently disperses active electronics across {params.idfsDecommissioned} dedicated floor Intermediate Distribution Frame (IDF) closets. Each closet requires continuous split air conditioning, dedicated UPS battery plants, and frequent technician rounds. By relocating all active switching into redundant Optical Line Terminals (OLTs) inside the central data center, the university eliminates these active floor closets, permanently turns off {params.idfsDecommissioned} split A/C units, and reclaims {params.spaceReclaimedSqm} m² of prime floor space for faculty research and student study.
            </p>
          </div>

          {/* 10-Year Institutional Dividends Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 print:grid-cols-2">
            <div className="p-3.5 rounded-xl bg-slate-950 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[10px] text-slate-400 print:text-slate-600 block uppercase font-bold">10-Yr Energy Savings</span>
              <span className="text-lg font-bold font-mono text-emerald-400 print:text-black tabular-nums mt-0.5 block">
                ${params.tenYearPowerSavingsDollars.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500">@ ${params.kwhRate.toFixed(2)}/kWh tariff</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[10px] text-slate-400 print:text-slate-600 block uppercase font-bold">Labor Capacity Freed</span>
              <span className="text-lg font-bold font-mono text-cyan-400 print:text-black tabular-nums mt-0.5 block">
                {params.annualMaintenanceSavedHours} hrs/yr
              </span>
              <span className="text-[10px] text-slate-500">~72.8% reduction in rounds</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[10px] text-slate-400 print:text-slate-600 block uppercase font-bold">Campus Space Reclaimed</span>
              <span className="text-lg font-bold font-mono text-teal-300 print:text-black tabular-nums mt-0.5 block">
                {params.spaceReclaimedSqm} m²
              </span>
              <span className="text-[10px] text-slate-500">{params.idfsDecommissioned} closets returned to faculty</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[10px] text-slate-400 print:text-slate-600 block uppercase font-bold">Decarbonization Impact</span>
              <span className="text-lg font-bold font-mono text-emerald-400 print:text-black tabular-nums mt-0.5 block">
                {params.tenYearCarbonAvoidedTons.toFixed(1)} MT CO₂e
              </span>
              <span className="text-[10px] text-slate-500">{(params.annualEnergySavedKwh / 1000).toFixed(1)} MWh saved annually</span>
            </div>
          </div>

          {/* 2. Optical Link Loss Budget Certification */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white print:text-black border-b border-slate-800/80 print:border-slate-300 pb-1.5 flex items-center gap-2">
              <span className="font-mono text-cyan-400 print:text-black">2.0</span>
              <span>Engineering Specifications & Optical Link Budget Certification</span>
            </h2>

            <div className="overflow-x-auto border border-slate-800 print:border-slate-300 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 print:bg-slate-200 text-slate-300 print:text-black">
                  <tr>
                    <th className="py-2.5 px-3 border-b border-slate-800 print:border-slate-300">Technical Parameter</th>
                    <th className="py-2.5 px-3 border-b border-slate-800 print:border-slate-300">Engineering Value</th>
                    <th className="py-2.5 px-3 border-b border-slate-800 print:border-slate-300">Compliance Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-slate-300">
                  <tr>
                    <td className="py-2 px-3 font-medium">PON Technology Class</td>
                    <td className="py-2 px-3 font-mono text-cyan-300 print:text-black">{params.opticsClass}</td>
                    <td className="py-2 px-3 text-slate-400 print:text-slate-700">ITU-T G.9807.1 (10G Symmetric)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Splitter Architecture</td>
                    <td className="py-2 px-3 font-mono text-slate-200 print:text-black">{params.splitterRatio}</td>
                    <td className="py-2 px-3 text-slate-400 print:text-slate-700">Planar Lightwave Circuit (PLC)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Maximum Pathway Distance</td>
                    <td className="py-2 px-3 font-mono text-slate-200 print:text-black">{params.fiberDistanceKm.toFixed(1)} km</td>
                    <td className="py-2 px-3 text-slate-400 print:text-slate-700">Single-mode ITU-T G.652.D / G.657</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Calculated Optical Attenuation</td>
                    <td className="py-2 px-3 font-mono text-slate-200 print:text-black">{params.calculatedLossDb.toFixed(2)} dB</td>
                    <td className="py-2 px-3 text-slate-400 print:text-slate-700">Includes 3.0 dB safety margin</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Certified Optical Headroom</td>
                    <td className="py-2 px-3 font-mono font-bold text-emerald-400 print:text-black">+{params.opticalHeadroomDb.toFixed(2)} dB Margin</td>
                    <td className="py-2 px-3 text-emerald-400 print:text-black font-semibold">PASS — ROBUST BUFFER</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Phased Implementation & Pilot Gate */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white print:text-black border-b border-slate-800/80 print:border-slate-300 pb-1.5 flex items-center gap-2">
              <span className="font-mono text-cyan-400 print:text-black">3.0</span>
              <span>Gated Phased Implementation & Recommendation</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
              To safeguard university capital expenditure, deployment follows the 24-week gated framework detailed in the architecture roadmap:
            </p>

            <ul className="text-xs sm:text-sm text-slate-300 print:text-slate-800 space-y-1.5 list-disc list-inside pl-2">
              <li><strong>Gate 1 (Weeks 1–4):</strong> Baseline survey, pathway clearing, and GIS loss budget sign-off.</li>
              <li><strong>Gate 2 (Weeks 5–7):</strong> Pilot Building deployment at <strong>{params.pilotBuilding}</strong>. All operational, thermal, and packet latency KPIs must be proven before campus capital release.</li>
              <li><strong>Gate 3 (Weeks 8–14):</strong> Central headend OLT commissioning in data center and outside plant single-mode fiber deployment.</li>
              <li><strong>Gate 4 (Weeks 15–21):</strong> Panel ONU and PoE++ multi-service activation for Wi-Fi 7 APs and CCTV.</li>
              <li><strong>Gate 5 (Weeks 22–24):</strong> Sub-50ms Type B failover acceptance testing and decommissioning of legacy floor switch closets.</li>
            </ul>

            <div className="p-4 rounded-xl bg-cyan-950/20 print:bg-slate-100 border border-cyan-500/30 print:border-slate-400 text-xs sm:text-sm text-cyan-200 print:text-slate-900 mt-2">
              <strong>Formal Recommendation for University Leadership:</strong> {params.recommendedAction}
            </div>
          </div>

          {/* 4. Formal Sign-Off Table */}
          <div className="pt-6 border-t-2 border-slate-800 print:border-slate-400 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
            <div className="space-y-6">
              <span className="font-bold text-slate-400 print:text-slate-600 uppercase tracking-wider block">
                Technical Submission & Verification:
              </span>
              <div className="border-b border-slate-700 print:border-slate-400 pb-4">
                <span className="font-bold text-white print:text-black text-sm block">{params.leadEngineer}</span>
                <span className="text-slate-400 print:text-slate-700 text-xs block">{params.leadEngineerRole}</span>
                <span className="text-slate-500 print:text-slate-600 text-[11px] block">{params.targetInstitution}</span>
              </div>
            </div>

            <div className="space-y-6">
              <span className="font-bold text-slate-400 print:text-slate-600 uppercase tracking-wider block">
                Institutional Approval & Endorsement:
              </span>
              <div className="border-b border-slate-700 print:border-slate-400 pb-4">
                <span className="font-bold text-white print:text-black text-sm block">Director IT / Vice Chancellor & Syndicate</span>
                <span className="text-slate-400 print:text-slate-700 text-xs block">Executive Technology & Infrastructure Council</span>
                <span className="text-slate-500 print:text-slate-600 text-[11px] block">{params.targetInstitution}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: PARAMETERS CUSTOMIZATION EDITOR */}
      {activePreviewTab === 'editor' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Proposal Parameters Editor</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Customize titles, institutional targets, financial inputs, and pilot building names to tailor the PDF proposal to your campus.
              </p>
            </div>

            <button
              onClick={handleResetToBaseline}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Baseline Values</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Title & Organization */}
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Proposal Title</label>
              <input
                type="text"
                value={params.projectTitle}
                onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Target Institution</label>
              <input
                type="text"
                value={params.targetInstitution}
                onChange={(e) => handleInputChange('targetInstitution', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Submitted To (Leadership Body)</label>
              <input
                type="text"
                value={params.preparedFor}
                onChange={(e) => handleInputChange('preparedFor', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Lead Engineer Author</label>
              <input
                type="text"
                value={params.leadEngineer}
                onChange={(e) => handleInputChange('leadEngineer', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>

            {/* Financial & Quantitative Levers */}
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">IDF Closets Decommissioned</label>
              <input
                type="number"
                value={params.idfsDecommissioned}
                onChange={(e) => handleInputChange('idfsDecommissioned', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Electricity Tariff ($/kWh)</label>
              <input
                type="number"
                step="0.01"
                value={params.kwhRate}
                onChange={(e) => handleInputChange('kwhRate', parseFloat(e.target.value) || 0.01)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">10-Year Electricity Cost Savings ($)</label>
              <input
                type="number"
                value={params.tenYearPowerSavingsDollars}
                onChange={(e) => handleInputChange('tenYearPowerSavingsDollars', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-emerald-400 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Floor Real Estate Reclaimed (m²)</label>
              <input
                type="number"
                value={params.spaceReclaimedSqm}
                onChange={(e) => handleInputChange('spaceReclaimedSqm', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-teal-300 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Pilot Building Designation</label>
              <input
                type="text"
                value={params.pilotBuilding}
                onChange={(e) => handleInputChange('pilotBuilding', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Turnkey Timeline (Weeks)</label>
              <input
                type="number"
                value={params.implementationWeeks}
                onChange={(e) => handleInputChange('implementationWeeks', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>

            {/* Recommended Action Full Text */}
            <div className="col-span-full space-y-1">
              <label className="text-slate-300 font-medium">Formal Recommendation Statement</label>
              <textarea
                rows={3}
                value={params.recommendedAction}
                onChange={(e) => handleInputChange('recommendedAction', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-xs leading-relaxed"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActivePreviewTab('proposal-view')}
              className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
            >
              Apply & Preview Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
