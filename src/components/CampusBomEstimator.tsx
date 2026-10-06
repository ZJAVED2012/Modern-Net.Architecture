import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Sliders,
  DollarSign,
  Building,
  Layers,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Server,
  Cable,
  Zap,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export interface BomItem {
  id: string;
  category: 'Headend OLT & ODF' | 'Backbone Outside Plant' | 'Floor Riser ODN' | 'Horizontal Drops' | 'Edge ONUs & Terminals' | 'Accessories & Splicing';
  partNumber: string;
  description: string;
  unit: string;
  quantity: number;
  unitPriceUsd: number;
  extendedPriceUsd: number;
  leadTime: string;
}

export const CampusBomEstimator: React.FC = () => {
  // Campus Scope Parameters
  const [buildingsCount, setBuildingsCount] = useState<number>(10);
  const [floorsPerBuilding, setFloorsPerBuilding] = useState<number>(4);
  const [roomsPerFloor, setRoomsPerFloor] = useState<number>(16);
  const [wifiApsPerFloor, setWifiApsPerFloor] = useState<number>(4);
  const [cctvCamerasPerFloor, setCctvCamerasPerFloor] = useState<number>(3);
  const [voipPhonesPerFloor, setVoipPhonesPerFloor] = useState<number>(4);
  const [avgFeederDistanceKm, setAvgFeederDistanceKm] = useState<number>(2.0);
  const [isTypeBProtected, setIsTypeBProtected] = useState<boolean>(true);
  const [currency, setCurrency] = useState<'USD' | 'PKR' | 'EUR'>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(278.0); // USD to PKR

  // Derived Quantities
  const totalFloors = buildingsCount * floorsPerBuilding;
  const totalOffices = totalFloors * roomsPerFloor;
  const totalWifiAps = totalFloors * wifiApsPerFloor;
  const totalCctvCameras = totalFloors * cctvCamerasPerFloor;
  const totalVoipPhones = totalFloors * voipPhonesPerFloor;
  const totalEndpoints = totalOffices + totalWifiAps + totalCctvCameras + totalVoipPhones;

  // Optical Port Sizing (1:16 split standard)
  const totalSplitters16 = Math.ceil(totalOffices / 16);
  const totalPonPortsNeeded = totalSplitters16 * (isTypeBProtected ? 2 : 1);
  const lineCardsCount = Math.ceil(totalPonPortsNeeded / 16);
  const oltChassisCount = Math.ceil(lineCardsCount / 6); // 6 service slots per chassis

  // Itemized BOM List
  const bomItems: BomItem[] = [
    // 1. Headend OLT & ODF
    {
      id: 'olt-chassis',
      category: 'Headend OLT & ODF',
      partNumber: 'EA5800-X7-BUN',
      description: 'Carrier-Grade OLT Subrack Chassis with Dual Control Boards (MPLA) & Dual -48V DC Power Supplies',
      unit: 'Units',
      quantity: Math.max(oltChassisCount, 2), // At least dual for redundancy
      unitPriceUsd: 4850,
      extendedPriceUsd: Math.max(oltChassisCount, 2) * 4850,
      leadTime: '2-3 Weeks'
    },
    {
      id: 'olt-linecard',
      category: 'Headend OLT & ODF',
      partNumber: 'H902XGHD-16P',
      description: '16-Port XGS-PON Interface Board with 16× Class N1 SFP+ Optical Transceivers (1577nm/1270nm)',
      unit: 'Boards',
      quantity: Math.max(lineCardsCount, 4),
      unitPriceUsd: 3200,
      extendedPriceUsd: Math.max(lineCardsCount, 4) * 3200,
      leadTime: '2-3 Weeks'
    },
    {
      id: 'odf-frame',
      category: 'Headend OLT & ODF',
      partNumber: 'ODF-288-LCAPC',
      description: '288-Core High-Density Optical Distribution Frame with Splice Trays and Green LC/APC Adapters',
      unit: 'Frames',
      quantity: Math.ceil(totalPonPortsNeeded / 144) + 1,
      unitPriceUsd: 850,
      extendedPriceUsd: (Math.ceil(totalPonPortsNeeded / 144) + 1) * 850,
      leadTime: '1-2 Weeks'
    },

    // 2. Backbone Outside Plant
    {
      id: 'feeder-fiber',
      category: 'Backbone Outside Plant',
      partNumber: 'GYTA53-48B1.3',
      description: '48-Core Outdoor Loose-Tube Double-Sheathed Armored Single-Mode Fiber Cable (ITU-T G.652.D)',
      unit: 'Meters',
      quantity: Math.round(buildingsCount * avgFeederDistanceKm * 1000 * (isTypeBProtected ? 2.2 : 1.1)),
      unitPriceUsd: 1.45,
      extendedPriceUsd: Math.round(buildingsCount * avgFeederDistanceKm * 1000 * (isTypeBProtected ? 2.2 : 1.1)) * 1.45,
      leadTime: '2 Weeks'
    },
    {
      id: 'splice-enclosure',
      category: 'Backbone Outside Plant',
      partNumber: 'FOSC-400D-IP68',
      description: 'IP68 Watertight Dome Splice Enclosure with 48-Core Fusion Splice Trays for Manholes',
      unit: 'Enclosures',
      quantity: buildingsCount * 2,
      unitPriceUsd: 120,
      extendedPriceUsd: buildingsCount * 2 * 120,
      leadTime: '1 Week'
    },

    // 3. Floor Riser ODN
    {
      id: 'riser-odb',
      category: 'Floor Riser ODN',
      partNumber: 'ODB-WALL-24P',
      description: 'Wall-Mount Optical Distribution Box (ODB) for Floor ELV Riser Shaft (Unpowered, 0 Watts)',
      unit: 'Boxes',
      quantity: totalFloors,
      unitPriceUsd: 65,
      extendedPriceUsd: totalFloors * 65,
      leadTime: '1 Week'
    },
    {
      id: 'plc-splitter',
      category: 'Floor Riser ODN',
      partNumber: 'PLC-1X16-SCAPC',
      description: '1:16 Planar Lightwave Circuit (PLC) Optical Splitter Cassette with SC/APC Bulkhead Adapters',
      unit: 'Splitters',
      quantity: totalSplitters16,
      unitPriceUsd: 38,
      extendedPriceUsd: totalSplitters16 * 38,
      leadTime: '1 Week'
    },

    // 4. Horizontal Drops
    {
      id: 'drop-cable',
      category: 'Horizontal Drops',
      partNumber: 'GJXFH-1B6.A2',
      description: '1-Core Indoor Bend-Insensitive Flexible Drop Cable (ITU-T G.657.A2, 7.5mm Bend Radius, LSZH)',
      unit: 'Meters',
      quantity: Math.round(totalOffices * 35), // 35 meters average drop per office
      unitPriceUsd: 0.28,
      extendedPriceUsd: Math.round(totalOffices * 35) * 0.28,
      leadTime: '1 Week'
    },
    {
      id: 'sc-connector',
      category: 'Horizontal Drops',
      partNumber: 'FAST-SCAPC-SM',
      description: 'Field-Installable Green SC/APC Mechanical Connectors (<0.25 dB Insertion Loss)',
      unit: 'Pieces',
      quantity: Math.round(totalOffices * 2.2), // Both ends + 10% spare
      unitPriceUsd: 2.10,
      extendedPriceUsd: Math.round(totalOffices * 2.2) * 2.10,
      leadTime: 'Stock'
    },

    // 5. Edge ONUs & Terminals
    {
      id: 'panel-onu',
      category: 'Edge ONUs & Terminals',
      partNumber: 'P871E-86BOX',
      description: '86-Type Flush Wall-Box Panel ONU (1× XGS-PON/GPON SC/APC, 4× GE LAN, 1× PoE+ Out)',
      unit: 'Units',
      quantity: totalOffices,
      unitPriceUsd: 62,
      extendedPriceUsd: totalOffices * 62,
      leadTime: '2-3 Weeks'
    },
    {
      id: 'zone-poe-onu',
      category: 'Edge ONUs & Terminals',
      partNumber: 'P802E-8023BT',
      description: 'Multi-Gigabit Zone ONU (2.5GE/10GE, 4× 802.3bt PoE++ 60W Ports for Wi-Fi 7 APs & PTZ CCTV)',
      unit: 'Units',
      quantity: Math.ceil((totalWifiAps + totalCctvCameras) / 4),
      unitPriceUsd: 145,
      extendedPriceUsd: Math.ceil((totalWifiAps + totalCctvCameras) / 4) * 145,
      leadTime: '2-3 Weeks'
    },

    // 6. Accessories & Splicing
    {
      id: 'patch-cords',
      category: 'Accessories & Splicing',
      partNumber: 'LCAPC-SCAPC-2M',
      description: 'Simplex 2-Meter Single-Mode Patch Cords with Green LC/APC to SC/APC Connectors',
      unit: 'Pieces',
      quantity: Math.round(totalPonPortsNeeded * 2 + 100),
      unitPriceUsd: 3.50,
      extendedPriceUsd: Math.round(totalPonPortsNeeded * 2 + 100) * 3.50,
      leadTime: 'Stock'
    },
    {
      id: 'splice-sleeves',
      category: 'Accessories & Splicing',
      partNumber: 'HEAT-SHRINK-60MM',
      description: 'Fusion Splice Protection Heat Shrink Sleeves with Stainless Steel Strength Rod (Pack of 100)',
      unit: 'Packs',
      quantity: Math.ceil(totalOffices * 2 / 100) + 10,
      unitPriceUsd: 12.00,
      extendedPriceUsd: (Math.ceil(totalOffices * 2 / 100) + 10) * 12.00,
      leadTime: 'Stock'
    }
  ];

  const totalCapexUsd = bomItems.reduce((acc, item) => acc + item.extendedPriceUsd, 0);
  const costPerEndpointUsd = totalCapexUsd / (totalEndpoints || 1);

  const formatPrice = (usdAmount: number) => {
    if (currency === 'PKR') {
      const pkrVal = Math.round(usdAmount * exchangeRate);
      return `Rs. ${pkrVal.toLocaleString()}`;
    }
    if (currency === 'EUR') {
      const eurVal = Math.round(usdAmount * 0.92);
      return `€${eurVal.toLocaleString()}`;
    }
    return `$${Math.round(usdAmount).toLocaleString()}`;
  };

  const handleExportCsv = () => {
    const headers = ['Category', 'Part Number', 'Description', 'Unit', 'Quantity', `Unit Price (${currency})`, `Extended Total (${currency})`, 'Lead Time'];
    const rows = bomItems.map(item => {
      const unitCost = currency === 'PKR' ? Math.round(item.unitPriceUsd * exchangeRate) : currency === 'EUR' ? Math.round(item.unitPriceUsd * 0.92) : item.unitPriceUsd;
      const extCost = currency === 'PKR' ? Math.round(item.extendedPriceUsd * exchangeRate) : currency === 'EUR' ? Math.round(item.extendedPriceUsd * 0.92) : item.extendedPriceUsd;
      return [
        `"${item.category}"`,
        `"${item.partNumber}"`,
        `"${item.description.replace(/"/g, '""')}"`,
        `"${item.unit}"`,
        item.quantity,
        unitCost,
        extCost,
        `"${item.leadTime}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `campus-optical-bom-procurement-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setBuildingsCount(10);
    setFloorsPerBuilding(4);
    setRoomsPerFloor(16);
    setWifiApsPerFloor(4);
    setCctvCamerasPerFloor(3);
    setVoipPhonesPerFloor(4);
    setAvgFeederDistanceKm(2.0);
    setIsTypeBProtected(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Procurement & Tendering Sizing Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>Campus Bill of Materials (BOM) & Equipment Sizing Estimator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl">
            Automatically calculates exact hardware quantities, fiber lengths, optical splitter counts, and procurement costs based on your campus size. Exportable as CSV for supplier RFPs and university purchase orders.
          </p>
        </div>

        {/* Currency & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            {(['USD', 'PKR', 'EUR'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2.5 py-1 rounded font-mono font-bold transition-colors cursor-pointer ${
                  currency === curr
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV for RFP</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print BOM</span>
          </button>
        </div>
      </div>

      {/* Scope Levers & Interactive Sliders */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
          <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Campus Architectural Scope Parameters</span>
          </span>
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <label className="text-slate-400 block font-medium">Academic Buildings</label>
            <input
              type="number"
              min="1"
              max="50"
              value={buildingsCount}
              onChange={(e) => setBuildingsCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono font-bold"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <label className="text-slate-400 block font-medium">Floors per Building</label>
            <input
              type="number"
              min="1"
              max="15"
              value={floorsPerBuilding}
              onChange={(e) => setFloorsPerBuilding(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono font-bold"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <label className="text-slate-400 block font-medium">Offices / Rooms per Floor</label>
            <input
              type="number"
              min="2"
              max="60"
              value={roomsPerFloor}
              onChange={(e) => setRoomsPerFloor(Math.max(2, parseInt(e.target.value) || 2))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono font-bold"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <label className="text-slate-400 block font-medium">Wi-Fi 7 APs per Floor</label>
            <input
              type="number"
              min="0"
              max="20"
              value={wifiApsPerFloor}
              onChange={(e) => setWifiApsPerFloor(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono font-bold text-purple-300"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <label className="text-slate-400 block font-medium">IP CCTV Cameras per Floor</label>
            <input
              type="number"
              min="0"
              max="20"
              value={cctvCamerasPerFloor}
              onChange={(e) => setCctvCamerasPerFloor(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono font-bold text-teal-300"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <label className="text-slate-400 block font-medium">Avg Feeder Distance (km)</label>
            <input
              type="number"
              step="0.1"
              min="0.5"
              max="15.0"
              value={avgFeederDistanceKm}
              onChange={(e) => setAvgFeederDistanceKm(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono font-bold"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <label className="text-slate-400 block font-medium">Feeder Redundancy Model</label>
            <select
              value={isTypeBProtected ? 'typeB' : 'single'}
              onChange={(e) => setIsTypeBProtected(e.target.value === 'typeB')}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono text-xs focus:outline-none"
            >
              <option value="typeB">Type B Dual Feeder (Sub-50ms Protection)</option>
              <option value="single">Single Feeder (Standard)</option>
            </select>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <label className="text-slate-400 block font-medium">Exchange Rate (PKR / USD)</label>
            <input
              type="number"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 278.0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* Sizing & Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 shadow-lg">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Estimated Capex</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 tabular-nums">
            {formatPrice(totalCapexUsd)}
          </div>
          <span className="text-xs text-slate-500 font-mono">Turnkey Hardware & Glass</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 shadow-lg">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Average Cost per Port</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
            {formatPrice(costPerEndpointUsd)}
          </div>
          <span className="text-xs text-slate-500 font-mono">Over {totalEndpoints.toLocaleString()} Endpoints</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 shadow-lg">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Optical Ports</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-300 tabular-nums">
            {totalPonPortsNeeded} Ports
          </div>
          <span className="text-xs text-slate-500 font-mono">1:16 Split Ratio ({totalSplitters16} Splitters)</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 shadow-lg">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Floor Switch Rooms Saved</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-300 tabular-nums">
            {totalFloors} Closets
          </div>
          <span className="text-xs text-slate-500 font-mono">0 Watts in Riser Closets</span>
        </div>
      </div>

      {/* Itemized Bill of Materials Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
          <span className="font-bold text-white uppercase tracking-wider">
            Itemized Equipment Bill of Materials ({bomItems.length} Line Items)
          </span>
          <span className="text-slate-400 font-mono">All prices shown in {currency}</span>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Part #</th>
                <th className="py-3 px-3">Item Description</th>
                <th className="py-3 px-2 text-center">Unit</th>
                <th className="py-3 px-3 text-right">Qty</th>
                <th className="py-3 px-3 text-right">Unit Price</th>
                <th className="py-3 px-3 text-right">Extended Total</th>
                <th className="py-3 px-3 text-center">Lead Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {bomItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-sans text-cyan-300 font-medium text-[11px] whitespace-nowrap">{item.category}</td>
                  <td className="py-2.5 px-3 text-slate-300 font-semibold">{item.partNumber}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-200 text-xs max-w-sm">{item.description}</td>
                  <td className="py-2.5 px-2 font-sans text-center text-slate-400">{item.unit}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-white">{item.quantity.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-slate-300">{formatPrice(item.unitPriceUsd)}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-cyan-300">{formatPrice(item.extendedPriceUsd)}</td>
                  <td className="py-2.5 px-3 font-sans text-center text-slate-400 text-[11px] whitespace-nowrap">{item.leadTime}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-950 border-t-2 border-slate-700 font-mono font-bold text-xs">
              <tr>
                <td colSpan={6} className="py-3 px-3 text-right uppercase text-slate-300">
                  Total Turnkey Estimated Capex:
                </td>
                <td className="py-3 px-3 text-right text-base text-cyan-400">
                  {formatPrice(totalCapexUsd)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
