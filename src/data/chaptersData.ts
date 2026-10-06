/**
 * Complete 29 Sections of Technical Architecture Guide · 2026
 * Modern Campus Network Infrastructure (FTTO · POL · All-Optical Campus)
 */

export interface Chapter {
  id: string;
  number: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  keyTakeaway: string;
  sections: {
    heading: string;
    body: string[];
    bulletPoints?: string[];
  }[];
  callouts?: {
    type: 'key-point' | 'technical-note' | 'management' | 'warning';
    title: string;
    text: string;
  }[];
  tableData?: {
    title: string;
    headers: string[];
    rows: (string | number)[][];
  };
}

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 'sec-01',
    number: '01',
    title: 'Executive Summary',
    category: 'Strategy',
    readTime: '4 min',
    summary: 'Why universities and enterprises should consider replacing a multi-floor Ethernet access-switch architecture with an all-optical FTTO/POL network — and when they should not.',
    keyTakeaway: 'FTTO/POL does not change what the network delivers (Ethernet, Wi-Fi, voice, CCTV). It changes where active equipment lives and what carries light to the edge.',
    sections: [
      {
        heading: 'The Multi-Floor Access Problem',
        body: [
          'Most campus networks built over the last twenty years follow the same pattern: a central core switch, a distribution switch in each building, and an access switch in a small equipment room on every floor. Copper cables then run from each floor room to every desk, Wi-Fi Access Point (AP), phone and camera.',
          'This design works, but it spreads active electronics — equipment that needs electricity, cooling, configuration and security — across dozens of rooms. Each of those rooms becomes something the IT team must power, cool, secure, patch, monitor and eventually replace.',
          'A Fiber-to-the-Office (FTTO) architecture, usually built with Passive Optical LAN (POL) technology, takes a different approach. The intelligence of the network is concentrated in the central IT room or data center in a device called an Optical Line Terminal (OLT). From there, thin optical fibers and unpowered optical splitters carry the network toward users, ending in a compact Optical Network Unit (ONU) or Optical Network Terminal (ONT) inside or near each office.'
        ]
      }
    ],
    callouts: [
      {
        type: 'key-point',
        title: 'Core Architectural Principle',
        text: 'FTTO/POL does not change what the network delivers — Ethernet, Wi-Fi, voice, CCTV and Internet of Things (IoT) devices still connect the same way. It changes where the active equipment lives and what carries the signal between the IT room and the user.'
      },
      {
        type: 'management',
        title: 'Management Perspective (10–15 Year Horizon)',
        text: 'This is an infrastructure decision with a 10–15 year horizon. The financial outcome depends on building geometry, endpoint density, existing infrastructure, fiber pathways, equipment pricing, labour, power, cooling and lifecycle assumptions. This document evaluates those factors objectively rather than promising a fixed saving.'
      }
    ],
    tableData: {
      title: 'At a Glance: What Changes for an Illustrative 5,000-User Campus',
      headers: ['Dimension', 'Traditional 3-Tier Campus', 'Modern FTTO / POL Optical'],
      rows: [
        ['Active Floor Rooms', '10-20 active IDFs needing 24/7 cooling', '0 active floor rooms; passive optical splitter boxes'],
        ['Horizontal Cable Reach', 'Strict 100-meter copper limit (Cat6/Cat6A)', 'Up to 20 km optical reach on single-mode glass'],
        ['Configuration Points', 'Dozens of individual switches to configure & patch', 'Centralized OMCI management from central OLT in Data Center'],
        ['Upstream Bandwidth', 'Dedicated switch uplinks', 'Shared optical PON tree (DBA scheduled)'],
        ['Physical Trade-Off', 'Few large switches in many dedicated rooms', 'Many small distributed ONUs powered at the user edge']
      ]
    }
  },
  {
    id: 'sec-02',
    number: '02',
    title: 'Understanding the Traditional Campus Network',
    category: 'Fundamentals',
    readTime: '5 min',
    summary: 'The classic three-tier hierarchical model (Core, Distribution, Access) and its reliance on 100m copper horizontal drops.',
    keyTakeaway: 'The three-tier architecture successfully served legacy IT, but requires active switch closets within 100 meters of every endpoint.',
    sections: [
      {
        heading: '2.1 Core Layer',
        body: [
          'The core is the high-speed backbone of the campus. It connects the buildings together and links them to the data center, the firewall and the Internet. Its job is to move large volumes of traffic very quickly and to stay available; it is normally duplicated for redundancy.'
        ]
      },
      {
        heading: '2.2 Distribution Layer',
        body: [
          'Each building (or group of floors) has a distribution switch. It collects traffic from the floor switches, applies routing and policy, and connects upward to the core. It is often where Virtual Local Area Networks (VLANs) are routed and where access-control rules are enforced.'
        ]
      },
      {
        heading: '2.3 Access Layer',
        body: [
          'The access layer is where users actually plug in. Access switches sit in floor equipment rooms and provide the copper ports for PCs, printers, IP phones, Wi-Fi APs and CCTV cameras — frequently supplying electrical power to these devices through Power over Ethernet (PoE).'
        ]
      }
    ],
    callouts: [
      {
        type: 'technical-note',
        title: 'Three-Tier Operational Dynamics',
        text: 'Layer-2/Layer-3 hierarchy: access switches uplink over fiber to distribution, which uplinks to a redundant core. Copper horizontal cabling (Cat6/Cat6A) is limited to 100 m per channel (90m permanent link + 10m patch).'
      }
    ]
  },
  {
    id: 'sec-03',
    number: '03',
    title: 'Why Traditional Networks Become Expensive',
    category: 'Economics',
    readTime: '6 min',
    summary: 'The access switch itself is only a fraction of the cost; the hidden cost is the dedicated room, UPS battery lifecycle, and air conditioning around it.',
    keyTakeaway: 'A campus with 10 buildings easily operates 40–60 mini data centers across floors, creating massive cumulative overhead.',
    sections: [
      {
        heading: 'The 100-Meter Copper Trap',
        body: [
          'Because copper Ethernet is limited to about 100 metres, large buildings need an equipment room within 100 m of every outlet. In practice this means one or more rooms on every floor.',
          'Main Distribution Frame (MDF) — the principal equipment room of a building or campus, where the building connects to the core and to outside services.',
          'Intermediate Distribution Frame (IDF) — a secondary equipment room, typically one per floor or wing, housing access switches and patch panels. Large or long buildings may need several IDFs per floor.'
        ]
      }
    ],
    callouts: [
      {
        type: 'management',
        title: 'The Hidden IDF Footprint',
        text: 'A campus with 10 buildings and an average of 4 floors can easily have 40–60 active rooms. Each is a small, distributed data center that must be kept running 24 hours a day with UPS batteries and split air conditioning.'
      }
    ],
    tableData: {
      title: 'The Hidden Infrastructure Cost Matrix per IDF Room',
      headers: ['Category', 'What Each IDF Requires', 'Recurring 10-Year Impact'],
      rows: [
        ['Active Equipment', 'Access switches, distribution switches, spare units', 'Firmware updates, MTBF failures, 5–8 year replacement cycles'],
        ['Room Infrastructure', 'Racks, patch panels, copper cords, cable trays', 'Floor space lost that could be used for teaching or faculty offices'],
        ['Power & Battery', 'Dedicated electrical circuits, PDU, Uninterruptible Power Supply (UPS)', 'Continuous power draw, UPS battery replacement every 3–5 years'],
        ['Environment', 'Dedicated split A/C cooling, dust filtration', 'Electricity costs, compressor breakdowns, annual A/C maintenance'],
        ['Safety & Security', 'Fire detection, door locks, access control, audit logs', 'Key management, safety inspections, compliance audits'],
        ['Cabling Pathway', 'Bundles of 48-96 thick copper cables filling risers', 'Massive re-cabling costs when moving to multi-gigabit Wi-Fi 7']
      ]
    }
  },
  {
    id: 'sec-04',
    number: '04',
    title: 'The Modern Concept: FTTO and POL',
    category: 'Architecture',
    readTime: '5 min',
    summary: 'Move intelligence to the central headend, extend thin single-mode fiber toward the user, and keep everything in between 100% passive.',
    keyTakeaway: 'FTTO describes where the fiber goes (to the office); POL describes how it is built (passive point-to-multipoint optical tree).',
    sections: [
      {
        heading: 'Fiber-to-the-Office (FTTO) Defined',
        body: [
          'FTTO means the optical fiber cable comes all the way to the office — or very close to it — instead of stopping at a switch room on each floor.',
          'FTTO is an architectural description: optical fiber is the horizontal medium, and a small active terminal near the user converts the optical signal to Ethernet and Wi-Fi. It can be built with PON technology or with point-to-point fiber and compact switches.'
        ]
      },
      {
        heading: 'Passive Optical LAN (POL) Defined',
        body: [
          'POL is a way of building a Local Area Network (LAN) where one fiber from the IT room is shared by many offices using unpowered optical splitters.',
          'POL applies Passive Optical Network (PON) technology — originally developed by telecom operators for fiber-to-the-home (FTTH) — to enterprise and university LANs. An OLT serves many ONUs over a point-to-multipoint optical tree built from passive splitters.'
        ]
      }
    ],
    callouts: [
      {
        type: 'key-point',
        title: 'FTTO vs POL Distinction',
        text: 'FTTO and POL are related but not identical. FTTO describes where the fiber goes (to the office). POL describes how it is built (passive, shared optical tree). Most FTTO deployments use POL, but FTTO can also use point-to-point fiber, and POL can end at a floor zone.'
      }
    ]
  },
  {
    id: 'sec-05',
    number: '05',
    title: 'Understanding the Optical Line Terminal (OLT)',
    category: 'Optical',
    readTime: '6 min',
    summary: 'The OLT is the central high-density brain that manages, authenticates, and schedules traffic for all optical terminals on campus.',
    keyTakeaway: 'Sitting in the data center, a single OLT chassis can serve thousands of endpoints, replacing dozens of distributed access switches.',
    sections: [
      {
        heading: 'Role and Core Capabilities',
        body: [
          'The OLT is a carrier-grade chassis (or compact 1U/2U box) equipped with high-speed Ethernet uplinks (10GE, 25GE, 40GE, 100GE) to the core and PON ports facing the optical distribution network.',
          'Each PON port drives one optical tree and schedules upstream transmission for every ONU on it using Dynamic Bandwidth Allocation (DBA).',
          'Downstream traffic is broadcast across the optical tree and encrypted per ONU using hardware AES-128 so no endpoint can eavesdrop on another.'
        ]
      }
    ],
    callouts: [
      {
        type: 'warning',
        title: 'Failure Domain Warning',
        text: 'Because one OLT can serve thousands of users, it is a significant failure domain. Redundant power supplies, redundant control boards, dual uplinks and — for critical areas — Type B protected PON paths or dual OLTs must be designed deliberately.'
      }
    ],
    tableData: {
      title: 'Core OLT Functions in Enterprise Campus Networks',
      headers: ['Function', 'Engineering Description'],
      rows: [
        ['Upstream Core Connection', 'Connects to campus core switches via dual LACP 10G/40G/100G links for high resilience.'],
        ['Downstream PON Line Ports', 'Transmits on 1490nm/1577nm and receives on 1310nm/1270nm, serving up to 32 or 64 ONUs per port.'],
        ['ONU Registration & Auth', 'Discovers ONUs via Serial Number (SN), Password or 802.1X certificate, blocking rogue units.'],
        ['Dynamic Bandwidth (DBA)', 'Allocates upstream microsecond time slots to prevent collisions and enforce guaranteed committed info rates.'],
        ['VLAN & QoS Mapping', 'Maps user ports to 802.1Q tags and assigns CoS/DSCP priority queues (Voice > Video > Data).'],
        ['Hardware Encryption', 'Applies unique AES-128 downstream encryption keys negotiated individually per ONU.'],
        ['Central Management (OMCI)', 'Pushes all VLANs, port speeds, PoE policies, and firmware updates centrally without visiting rooms.']
      ]
    }
  },
  {
    id: 'sec-06',
    number: '06',
    title: 'Understanding the Passive Optical Network (PON)',
    category: 'Optical',
    readTime: '6 min',
    summary: 'Point-to-multipoint optical transmission principles, downstream broadcast encryption, upstream TDMA scheduling, and standards evolution.',
    keyTakeaway: 'GPON, XGS-PON and 50G-PON operate on separate wavelengths and can coexist on the exact same physical fiber tree.',
    sections: [
      {
        heading: 'Downstream & Upstream Mechanics',
        body: [
          'Downstream (OLT → ONU): The OLT broadcasts light on a continuous wavelength (1490 nm for GPON, 1577 nm for XGS-PON). Every ONU on the tree receives all packets, but filters out packets not addressed to its own GEM port ID, while AES-128 hardware encryption prevents interception.',
          'Upstream (ONU → OLT): ONUs transmit in bursts on a separate wavelength (1310 nm for GPON, 1270 nm for XGS-PON) in exact microsecond time-slots granted by the OLT (Time-Division Multiple Access, TDMA). This prevents optical signals from colliding at the splitter.'
        ]
      }
    ],
    callouts: [
      {
        type: 'technical-note',
        title: 'Wavelength Coexistence & Standards',
        text: 'Line rates are nominal; usable throughput is slightly lower after protocol framing and Forward Error Correction (FEC). GPON, XGS-PON and 50G-PON utilize distinct spectral windows, allowing non-disruptive concurrent transmission on the same glass.'
      }
    ],
    tableData: {
      title: 'Comparison of ITU-T Passive Optical Standards',
      headers: ['Technology', 'Standard', 'Nominal Line Rate (Down / Up)', 'Enterprise Role'],
      rows: [
        ['GPON', 'ITU-T G.984', '2.5 Gbps / 1.25 Gbps', 'Cost-effective, mature; ideal for general offices, CCTV & dorms'],
        ['XG-PON', 'ITU-T G.987', '10 Gbps / 2.5 Gbps', 'Asymmetric 10G; less common in new enterprise designs'],
        ['XGS-PON', 'ITU-T G.9807.1', '10 Gbps / 10 Gbps Symmetric', 'Current mainstream enterprise choice for FTTO and Wi-Fi 6E/7'],
        ['25G-PON', '25GS-PON MSA', '25 Gbps / 10 or 25 Gbps', 'Emerging high-density university research labs & server clusters'],
        ['50G-PON', 'ITU-T G.9804', '50 Gbps / up to 50 Gbps', 'Next-generation standard with wavelength coexistence']
      ]
    }
  },
  {
    id: 'sec-07',
    number: '07',
    title: 'ODN, ODF and Passive Distribution',
    category: 'Optical',
    readTime: '5 min',
    summary: 'Clarifying the distinction between ODN (the whole network), ODF (the rack frame), and passive distribution boxes.',
    keyTakeaway: 'The ODN is the unpowered optical plumbing: single-mode glass, fusion splices, splitters, and green LC/APC connectors.',
    sections: [
      {
        heading: 'The Passive Infrastructure Continuum',
        body: [
          'ODN (Optical Distribution Network): The entire passive optical transmission medium between the OLT PON port and the ONU optical interface, consisting of feeder fibers, splice enclosures, optical distribution frames, passive splitters, distribution fibers, and drop cables.',
          'ODF (Optical Distribution Frame): The high-density rack-mounted hardware assembly located in the central data center network room where outdoor and backbone feeder fibers terminate, splice, and patch to OLT ports.',
          'Optical Distribution Box (ODB): A compact wall-mounted or shaft-mounted enclosure located in vertical ELV risers housing splitters and fan-outs.'
        ]
      }
    ],
    callouts: [
      {
        type: 'technical-note',
        title: 'Angled Physical Contact (APC) Connectors',
        text: 'Always specify SC/APC or LC/APC (green connectors) throughout the ODN. The 8-degree angled polish ensures back-reflections exceed 60 dB, preventing laser transmitter instability.'
      }
    ]
  },
  {
    id: 'sec-08',
    number: '08',
    title: 'The Optical Splitter & Link Loss Budgets',
    category: 'Optical',
    readTime: '7 min',
    summary: 'Splitters make PON economical but represent the single largest loss component in the link budget (~3.5 dB per 1:2 split).',
    keyTakeaway: 'Never choose split ratios arbitrarily. Every split must be calculated against the optics attenuation budget with safety margin.',
    sections: [
      {
        heading: 'Splitter Physics & Power Splitting',
        body: [
          'A passive optical splitter divides the incoming optical power evenly across N output ports. Physics dictates that splitting light in half incurs an unavoidable theoretical loss of 3.01 dB, plus insertion loss (~0.5 dB).',
          'Common splitting architectures include centralized splitting (1:32 or 1:64 in the riser) and distributed cascaded splitting (1:4 in the building basement followed by 1:8 on each floor, giving an overall 1:32).'
        ]
      }
    ],
    callouts: [
      {
        type: 'warning',
        title: 'Optical Budget Calculation Requirement',
        text: 'The split ratio cannot be chosen by saying "more users = bigger splitter". It must be calculated from the optical budget: the total loss the OLT and ONU optics can tolerate.'
      }
    ],
    tableData: {
      title: 'Worked Optical Loss Budget Example (Illustrative 2 km Link)',
      headers: ['Loss Component', 'Engineering Calculation / Assumption', 'Calculated Loss (dB)'],
      rows: [
        ['Fiber Attenuation', '2.0 km single-mode fiber @ 0.35 dB/km (1310nm)', '0.70 dB'],
        ['Connector Pairs', '4 mated connector pairs × 0.50 dB/pair', '2.00 dB'],
        ['Fusion Splices', '6 fusion splices × 0.10 dB/splice', '0.60 dB'],
        ['Optical Splitter', '1:32 Planar Lightwave Circuit (PLC) splitter', '17.50 dB'],
        ['Engineering Safety Margin', 'Covers fiber aging, maintenance splices, temperature', '3.00 dB'],
        ['Total Calculated Link Loss', 'Sum of all passive losses and safety headroom', '23.80 dB'],
        ['Available Optical Class Budget', 'GPON Class B+ (28.0 dB) / XGS-PON Class N1 (29.0 dB)', '28.0 - 29.0 dB'],
        ['Headroom Remaining', 'Available Budget (28.5 dB) - Total Loss (23.8 dB)', '+4.70 dB (PASS)']
      ]
    }
  },
  {
    id: 'sec-09',
    number: '09',
    title: 'The ONU / ONT',
    category: 'Endpoints',
    readTime: '6 min',
    summary: 'The optical terminal at the user edge: form factors (panel, desktop, rack, SFP), port speeds, and PoE capabilities.',
    keyTakeaway: 'ONU and ONT refer to the user-side optical terminal. Always check specific datasheet port configurations and PoE wattage rather than naming.',
    sections: [
      {
        heading: 'Terminal Roles and Form Factors',
        body: [
          'The ONU terminates the optical tree, synchronizes its local clock with the OLT, decrypts downstream traffic, and queues upstream traffic for scheduled time-slot bursts.',
          'Panel ONUs fit directly inside standard 86-type electrical wall boxes, exposing 4 RJ-45 ports flush with the wall. Desktop ONUs sit on desks or credenzas, while rack-mount units provide 16-24 PoE ports for high-density environments.'
        ]
      }
    ],
    callouts: [
      {
        type: 'warning',
        title: 'PoE Availability Warning',
        text: 'Do not assume every ONU provides PoE. Many compact panel models are purely data-only. Where Wi-Fi APs, IP phones, or security cameras require power, PoE-certified ONU variants must be explicitly engineered.'
      }
    ]
  },
  {
    id: 'sec-10',
    number: '10',
    title: 'Modern Office Example',
    category: 'Architecture',
    readTime: '5 min',
    summary: 'Concrete side-by-side study of a faculty office with 2 PCs, 1 printer, 1 Wi-Fi AP, 1 IP phone, and 1 security camera.',
    keyTakeaway: 'The traditional approach requires 6 bulky copper cables pulled to the floor IDF; FTTO serves the identical devices with a single optical fiber.',
    sections: [
      {
        heading: 'One Typical Office, Two Approaches',
        body: [
          'Consider an academic department office containing 2 PCs, 1 network printer, 1 ceiling Wi-Fi AP, 1 VoIP desk phone, and 1 hallway CCTV camera (6 endpoints total, 3 requiring PoE).',
          'Traditional Design: Six Category 6A copper cables are pulled through congested horizontal conduits back to the floor IDF switch up to 100 meters away.',
          'FTTO Design: A single single-mode fiber strand runs from the floor distribution box to a compact PoE-enabled ONU in the office wall box, providing local RJ-45 ports and PoE power.'
        ]
      }
    ],
    callouts: [
      {
        type: 'key-point',
        title: 'Unchanged User Experience',
        text: 'Endpoints plug into ordinary RJ-45 Ethernet sockets in both architectures. The difference is that FTTO eliminates 5 heavy copper home-runs per office and eliminates the active floor switch closet.'
      }
    ]
  },
  {
    id: 'sec-11',
    number: '11',
    title: 'Wi-Fi in FTTO',
    category: 'Wireless',
    readTime: '5 min',
    summary: 'Integrating Wi-Fi 6, 6E and Wi-Fi 7 with FTTO networks, multi-gigabit uplinks, 802.3bt PoE, and SSID VLAN trunking.',
    keyTakeaway: 'Fiber does not fix poor Wi-Fi RF design. AP placement, channel planning, and professional RF surveys remain mandatory.',
    sections: [
      {
        heading: 'Wireless Integration Architecture',
        body: [
          'A Wi-Fi Access Point is an Ethernet endpoint. In an FTTO architecture, it plugs into a multi-gigabit (2.5GE or 5GE) PoE port on the nearest ONU.',
          'Multi-SSID trunking: The ONU port carries 802.1Q tagged VLANs for Staff (VLAN 20), Students (VLAN 30), and Guests (VLAN 40) directly to the AP without local routing.',
          'Next-gen Wi-Fi 7 requirements: Modern 4x4 tri-band APs can exceed 1 Gbps backhaul demand, making 2.5GE or 10GE ONU ports and 802.3at/bt (30W-60W) power budgets critical.'
        ]
      }
    ],
    callouts: [
      {
        type: 'warning',
        title: 'RF Reality Check',
        text: 'Fiber does not make Wi-Fi faster by itself. Wireless performance is governed by RF propagation, wall attenuation, channel reuse, co-channel interference, and client density. Always execute a physical RF survey.'
      }
    ]
  },
  {
    id: 'sec-12',
    number: '12',
    title: 'VLANs and Security',
    category: 'Security',
    readTime: '6 min',
    summary: 'Segmenting multi-tenant campus traffic over shared optical glass using 802.1Q tagging, 802.1X NAC, and AES-128 encryption.',
    keyTakeaway: 'Optical fiber is not automatically secure simply because it is glass. Strict VLAN segmentation and 802.1X access control remain essential.',
    sections: [
      {
        heading: 'Logical Multi-Tenancy over Shared Glass',
        body: [
          'A campus network must maintain strict logical isolation between administrative records, student internet access, CCTV security feeds, and building controls.',
          'VLAN 10: Administration & ERP; VLAN 20: Faculty & Research; VLAN 30: Student LMS; VLAN 40: Guest Internet; VLAN 50: Security CCTV; VLAN 60: Voice VoIP; VLAN 70: Smart Campus BMS; VLAN 99: IT Infrastructure Management.'
        ]
      }
    ],
    callouts: [
      {
        type: 'warning',
        title: 'Security Fallacy Warning',
        text: 'FTTO/POL is not automatically secure simply because it uses fiber. Downstream PON traffic is broadcast (and encrypted), and user-side Ethernet ports are as exposed as in any network. Segmentation, device authentication, firewall policy and monitoring are still required.'
      }
    ]
  },
  {
    id: 'sec-13',
    number: '13',
    title: 'Power Management',
    category: 'Power',
    readTime: '7 min',
    summary: 'The most misunderstood aspect of FTTO: PoE classes, PoF vs POF, and powering distributed optical terminals during grid outages.',
    keyTakeaway: 'FTTO eliminates active floor switch rooms, but ONUs still require electricity. Plan local mains, centralized DC, or hybrid composite cabling.',
    sections: [
      {
        heading: 'Power Delivery Strategies for ONUs',
        body: [
          'Strategy A: Local Mains Power — ONU plugs into standard wall outlet via 12V DC adapter. Most economical, but drops during power cuts unless building circuit is backed by central generator.',
          'Strategy B: Centralized Class 2 DC Power — Central power shelf in ELV riser delivers low-voltage DC power over paired copper wires to multiple ONUs.',
          'Strategy C: Composite Hybrid Cable — Single jacket containing optical fibers and copper power conductors, providing data and DC power in one pull.'
        ]
      }
    ],
    callouts: [
      {
        type: 'warning',
        title: 'PoF vs POF Critical Distinction',
        text: 'PoF and POF are completely different. PoF (Power over Fiber) is about delivering electrical energy. POF (Plastic Optical Fiber) is a cable material used for short decorative or industrial links and has nothing to do with power.'
      },
      {
        type: 'management',
        title: 'Outage Survivability Planning',
        text: 'Decide early which services must survive a campus power cut — typically CCTV cameras, access control, emergency phones, and central Wi-Fi. That decision drives whether to deploy local mini-UPS modules or centralized DC feeds.'
      }
    ]
  },
  {
    id: 'sec-14',
    number: '14',
    title: 'Network Rooms vs ELV Rooms',
    category: 'Facilities',
    readTime: '5 min',
    summary: 'What changes in building facilities: eliminating active switch racks and dedicated A/C while retaining riser pathways for passive distribution.',
    keyTakeaway: 'FTTO eliminates active switch rooms; it does not eliminate the need for vertical ELV risers and organized distribution pathways.',
    sections: [
      {
        heading: 'Facilities Impact & Riser Architecture',
        body: [
          'Extra-Low Voltage (ELV) covers building automation, fire alarm systems, public address, CCTV, and data telecommunications.',
          'In FTTO, floor switch rooms with active UPS, cooling, and racks are eliminated. Instead, passive optical distribution boxes (ODBs) are mounted inside existing vertical ELV risers or small flush wall cabinets.'
        ]
      }
    ],
    callouts: [
      {
        type: 'warning',
        title: 'Building Code Compliance',
        text: 'Local electrical, fire and building codes must be strictly followed. Fire-rated shafts, LSZH cable jackets, separation from high-voltage electrical conduits, and fire-stopping seals apply to fiber just as to copper.'
      }
    ]
  },
  {
    id: 'sec-15',
    number: '15',
    title: 'FTTO/POL and the Data Center',
    category: 'Datacenter',
    readTime: '7 min',
    summary: 'The data center serves as the optical headend for the campus, while server halls retain dedicated spine-leaf Ethernet fabrics.',
    keyTakeaway: 'Use POL for campus access (offices, dorms, CCTV, Wi-Fi); retain non-blocking switched Ethernet for server and storage clusters.',
    sections: [
      {
        heading: 'Five Ways FTTO Strengthens the Data Center',
        body: [
          '1. Datacenter-Grade Protection: The access layer inherits the data center’s precision cooling, clean generator power, N+1 UPS, and armed security.',
          '2. Fewer Core Uplinks: 20-40 distributed switch uplinks collapse into 4 redundant high-speed links from the OLT chassis.',
          '3. Facility Systems Integration: Data center perimeter cameras, access control, and environmental sensors connect over POL on isolated VLANs.',
          '4. Unified Fiber Operations: The same optical testing, ODF patching, and cleaning skills used for servers manage the campus access network.',
          '5. Centralized Telemetry: Real-time optical power levels for thousands of user ports are monitored in one NOC console.'
        ]
      }
    ],
    callouts: [
      {
        type: 'technical-note',
        title: 'Access vs Compute Boundary',
        text: 'PON is a shared medium with scheduled upstream time slots. That is ideal for bursty human and office traffic, but is the wrong tool for server fabrics, which require dedicated, microsecond-latency, non-blocking 100G links. Use spine-leaf for servers, POL for users.'
      }
    ]
  },
  {
    id: 'sec-16',
    number: '16',
    title: 'University Reference Architecture',
    category: 'Architecture',
    readTime: '7 min',
    summary: 'Comprehensive 5,000-user university reference model across 10 academic buildings, 2 libraries, 5 hostels, and administrative centers.',
    keyTakeaway: 'Carrier-grade Type B dual-homed optical protection connects critical administrative and security buildings to redundant OLTs.',
    sections: [
      {
        heading: 'Campus Topology & Failure Domain Engineering',
        body: [
          'The illustrative reference campus serves 5,000 active users, 500 Wi-Fi 6E/7 APs, and 1,000 CCTV cameras, IoT sensors, and VoIP phones across 20 distinct facilities.',
          'Dual Redundant OLTs (OLT-A and OLT-B) sit in the central data center, connected to dual core switches via 100GE links.',
          'Type B protection utilizes 2:N optical splitters fed by diverse physical fiber pathways from separate OLT chassis, enabling sub-50ms automatic failover if an optical line card or feeder fiber is severed.'
        ]
      }
    ],
    callouts: [
      {
        type: 'key-point',
        title: 'Tiered Protection Strategy',
        text: 'Protection is an engineering choice. Student hostels may utilize cost-effective 1:32 single-feeder trees, whereas central administration, CCTV security operations, and research server rooms justify dual-homed Type B protected feeders.'
      }
    ]
  },
  {
    id: 'sec-17',
    number: '17',
    title: 'Small Industry Reference Architecture',
    category: 'Architecture',
    readTime: '6 min',
    summary: 'Applying FTTO to industrial environments: overcoming heavy electromagnetic interference (EMI), dusty workshops, and distances exceeding 100m.',
    keyTakeaway: 'For small factories and industrial plants, optical fiber eliminates switch rooms in dusty production areas and ignores electrical noise.',
    sections: [
      {
        heading: 'Industrial Challenges & Optical Solutions',
        body: [
          'Industrial manufacturing environments feature heavy variable-frequency motor drives, arc welders, high-voltage substations, and dusty uncooled production floors.',
          'Copper Ethernet cables act as antennas picking up electromagnetic noise, leading to CRC errors and packet drops. Single-mode optical fiber is completely dielectric and immune to EMI.',
          'Furthermore, warehouses and perimeter security fences located 300-800 meters from the administration office connect seamlessly without expensive intermediate switch huts.'
        ]
      }
    ],
    callouts: [
      {
        type: 'warning',
        title: 'Single Small Office Boundary',
        text: 'For a single compact office with all desks within 100 meters of a single switch closet, a standard Ethernet switch is simpler and cheaper. FTTO earns its place when distance, electrical noise, multiple buildings, or scale come into play.'
      }
    ]
  },
  {
    id: 'sec-18',
    number: '18',
    title: 'Traditional vs FTTO/POL',
    category: 'Comparison',
    readTime: '8 min',
    summary: 'Rigorous side-by-side comparison matrix and 12-criterion decision scorecard balancing strengths and trade-offs.',
    keyTakeaway: 'Neither architecture wins everywhere. FTTO/POL dominates in distance, room elimination, and long-term lifespan; traditional Ethernet dominates in local familiarity and simple endpoint power.',
    sections: [
      {
        heading: 'Comprehensive Comparison Architecture',
        body: [
          'Evaluating traditional active Ethernet switching versus passive optical LAN requires looking past marketing claims to examine real engineering trade-offs.'
        ]
      }
    ],
    callouts: [
      {
        type: 'key-point',
        title: 'The Honest Trade-Off',
        text: 'FTTO trades a small number of large, power-hungry switches concentrated in dedicated rooms for a large fleet of compact optical terminals distributed at user desks.'
      }
    ]
  },
  {
    id: 'sec-19',
    number: '19',
    title: 'Practical Cost & Effort Reduction — Worked Examples',
    category: 'Economics',
    readTime: '10 min',
    summary: 'Seven concrete worked examples demonstrating where operational maintenance hours, room leases, and labor change — and where electricity is neutral.',
    keyTakeaway: 'Routine technician maintenance hours drop by ~72.8% (from 442 to 120 hours annually), releasing 60 m² of campus space.',
    sections: [
      {
        heading: 'Empirical Operational Analysis',
        body: [
          'All worked examples model an illustrative 5,000-user university campus with 10 buildings, 10 floor IDFs, 45 access/distribution switches, transitioning to 2 OLTs and 1,200 ONUs.',
          'Example 1 models annual maintenance tasks (room inspections, battery checks, firmware updates, VLAN changes, and fault visits), dropping effort from 55 days to 15 days.',
          'Example 6 provides an honest electricity audit: removing 10 floor split A/C units saves 3.4 kW, but powering 1,200 ONUs draws 7.2 kW, making net electricity roughly neutral (10.9 kW vs 11.6 kW).'
        ]
      }
    ],
    callouts: [
      {
        type: 'warning',
        title: 'Electricity Neutrality Warning',
        text: 'Do not justify an FTTO project on electricity savings alone. While floor air conditioners are turned off, powering hundreds of small optical units at desks balances the equation. Verify ONU power draw on datasheets.'
      }
    ]
  },
  {
    id: 'sec-20',
    number: '20',
    title: 'Total Cost of Ownership (TCO) Model',
    category: 'Economics',
    readTime: '8 min',
    summary: 'A 10-year financial framework accounting for CapEx, OpEx, battery refresh cycles, licensing, and mid-life switch replacements.',
    keyTakeaway: 'TCO = Upfront CapEx + 10-Year OpEx + Mid-Life Electronics Refresh - Residual Asset Value.',
    sections: [
      {
        heading: 'Structuring an Objective Institutional Model',
        body: [
          'A credible TCO comparison evaluates the entire 10-15 year lifecycle. Copper horizontal cables frequently require replacement every 7-10 years to support higher speeds, while single-mode optical fiber remains in place across multiple PON generations.'
        ]
      }
    ],
    callouts: [
      {
        type: 'management',
        title: 'Sensitivity Analysis Levers',
        text: 'Run sensitivity analysis on the three most volatile inputs: local fiber splicing labor rates, per-unit ONU pricing at volume, and local electricity tariffs.'
      }
    ]
  },
  {
    id: 'sec-21',
    number: '21',
    title: 'When FTTO/POL Makes Sense',
    category: 'Strategy',
    readTime: '5 min',
    summary: 'Clear qualification criteria: where FTTO is a compelling high-ROI fit vs where traditional Ethernet remains the superior choice.',
    keyTakeaway: 'Strong fit for campuses with multiple buildings, high room real-estate costs, and long distances; poor fit for single-room small offices.',
    sections: [
      {
        heading: 'High-Fit Environments',
        body: [
          'Universities & Colleges: Spread across dozens of buildings with high Wi-Fi density and high room maintenance burdens.',
          'Hotels & Student Hostels: Hundreds of identical rooms where floor real estate is valuable and bandwidth demand per room is modest.',
          'Hospitals & Healthcare: Long sterile corridors where ceiling maintenance and switch room dust filters pose infection risks.',
          'Greenfield Campus Construction: Building pathways can be optimized for optical fiber from day one, saving riser conduit space.'
        ]
      }
    ],
    callouts: [
      {
        type: 'key-point',
        title: 'Context Governs Architecture',
        text: 'FTTO is not universally superior. It is a specialized, highly efficient architecture designed for sprawling campuses, multi-floor complexes, and distributed facilities.'
      }
    ]
  },
  {
    id: 'sec-22',
    number: '22',
    title: 'Limitations and Design Risks',
    category: 'Governance',
    readTime: '7 min',
    summary: 'Thirteen critical engineering risks and proactive design mitigations, including shared PON bandwidth and OLT failure radius.',
    keyTakeaway: 'A credible design addresses risks openly: calculate optical budgets, size split ratios to peak hours, and enforce Type B OLT protection.',
    sections: [
      {
        heading: 'Proactive Risk Engineering',
        body: [
          'Shared PON Capacity: All 32 or 64 ONUs on a tree share upstream and downstream bandwidth. Mitigation: Size split ratios (1:16 for high-density labs) and assign guaranteed DBA bandwidth.',
          'Fiber Damage Exposure: Severing an optical feeder cable impacts all ONUs on the tree. Mitigation: Dual-routed feeder conduits, armored outdoor cables, and sub-50ms Type B automatic protection.',
          'Optical Budget Depletion: Dirty connectors or excessive splices drop optical power below receiver sensitivity. Mitigation: Enforce LC/APC connectors and end-to-end OTDR validation.'
        ]
      }
    ]
  },
  {
    id: 'sec-23',
    number: '23',
    title: 'Migration Strategy',
    category: 'Implementation',
    readTime: '6 min',
    summary: 'A disciplined 10-phase migration methodology ensuring zero disruption to live campus operations through co-existence.',
    keyTakeaway: 'Phase 3 (Pilot Building) is the single most valuable milestone: it proves real-world performance before campus-wide commitment.',
    sections: [
      {
        heading: 'The 10-Phase Transformation Framework',
        body: [
          'Phase 1: Comprehensive Survey (conduits, endpoints, power, fiber pathways).',
          'Phase 2: Architectural Design (PON technology, split ratios, loss calculations, VLAN plan).',
          'Phase 3: Pilot Building Validation (deploy single faculty building, measure KPIs).',
          'Phase 4: Core / Central Headend Deployment (install redundant OLTs and ODF in data center).',
          'Phase 5: Passive ODN Rollout (blow fiber, splice trays, install distribution boxes).',
          'Phase 6: ONU Deployment & Configuration (push OMCI service profiles).',
          'Phase 7: Wi-Fi, CCTV & Voice Cutover (verify PoE and QoS mapping).',
          'Phase 8: Rigorous Acceptance Testing (failover tests, optical power margin verification).',
          'Phase 9: Building-by-Building Migration (decommission legacy IDF switches).',
          'Phase 10: Operational Optimization (DBA tuning, staff training, telemetry refinement).'
        ]
      }
    ],
    callouts: [
      {
        type: 'management',
        title: 'The Value of the Pilot Building',
        text: 'A pilot building turns vendor marketing claims into measured institutional data. It gives the university network team hands-on operational confidence before full campus deployment.'
      }
    ]
  },
  {
    id: 'sec-24',
    number: '24',
    title: 'Vendor Evaluation Checklist',
    category: 'Governance',
    readTime: '6 min',
    summary: 'Fourteen vendor-neutral evaluation criteria to protect universities from vendor lock-in, poor PoE budgets, and hidden licensing fees.',
    keyTakeaway: 'Ask the tough questions: BBF.247 ONU interoperability, IEEE 802.3bt PoE power budgets, and 10-year perpetual vs subscription licensing.',
    sections: [
      {
        heading: 'Objective Vendor Audit Criteria',
        body: [
          'Proposals must be evaluated across OLT backplane density, Combo PON support, multi-gigabit PoE capabilities, sub-50ms optical protection, standard OMCI compliance, and local replacement SLAs.'
        ]
      }
    ]
  },
  {
    id: 'sec-25',
    number: '25',
    title: 'Example: Huawei FTTO Architecture',
    category: 'Reference',
    readTime: '6 min',
    summary: 'An illustrative look at how Huawei packages these generic concepts in its OptiXstar enterprise portfolio (P802P, P892M-01, P885E-10).',
    keyTakeaway: 'Huawei packages FTTO with OptiXstar ONUs and iMaster NCE. Always verify regional datasheets for PoE and port specifications.',
    sections: [
      {
        heading: 'Vendor Portfolio Mapping',
        body: [
          'Huawei OptiXstar P802P: 86-type panel ONU with 1 XGS-PON uplink and 4 GE ports (pure data).',
          'Huawei OptiXstar P892M-01: M45 panel ONU supporting PoE, PoE+ and 10GE PoE++ for multi-service rooms.',
          'Huawei OptiXstar P885E-10: 24-port 2.5GE PoE++ rack-mount unit with dual XGS-PON uplinks for lecture halls.',
          'Huawei OptiXstar S600E: SFP-form-factor optical unit plugging directly into cameras and APs.'
        ]
      }
    ],
    callouts: [
      {
        type: 'technical-note',
        title: 'Vendor-Neutral Baseline',
        text: 'This architecture guide is vendor-neutral first. The Huawei example demonstrates real-world commercial packaging observed at HUAWEI CONNECT 2026, Shanghai.'
      }
    ]
  },
  {
    id: 'sec-26',
    number: '26',
    title: 'Case Study: 5,000-User University Modernization',
    category: 'Reference',
    readTime: '8 min',
    summary: 'Before-and-after operational comparison of a comprehensive university campus modernization project.',
    keyTakeaway: 'Transitions from 45 distributed switches across 10 active IDFs to 2 central OLTs, recovering 60 m² of real estate and cutting maintenance by 72.8%.',
    sections: [
      {
        heading: 'Institutional Transformation Breakdown',
        body: [
          'Before: Single core switch, 10 active IDF closets, 40 access switches, 11 separate UPS batteries, 10 dedicated air conditioning units, and hundreds of thick copper cable bundles.',
          'After: Redundant core and dual OLTs in data center, passive optical distribution boxes in risers, 1,200 compact ONUs, 1 central UPS, and single-mode optical fiber.'
        ]
      }
    ],
    callouts: [
      {
        type: 'management',
        title: 'Honest Institutional Summary',
        text: 'No blanket percentage savings should be claimed without local quotation data. What is guaranteed is the structural elimination of active switch closets, air conditioning maintenance, and copper cable congestion.'
      }
    ]
  },
  {
    id: 'sec-27',
    number: '27',
    title: 'FTTO in 5 Minutes',
    category: 'Executive',
    readTime: '3 min',
    summary: 'The entire architectural concept summarized in clear, non-technical language for Vice Chancellors, Registrars, and Financial Officers.',
    keyTakeaway: 'Move intelligence to the central room, move fiber to the user, eliminate active floor closets, and manage everything from one screen.',
    sections: [
      {
        heading: 'The Core Concept for Leadership',
        body: [
          'Today, every floor of every campus building has a small room full of network switches. Each room needs electricity, battery backup, air conditioning, locks and regular attention from the IT team. Multiply that across a campus and the IT team is looking after dozens of small computer rooms.',
          'A modern optical design moves the intelligence of the network into the central IT room, where it is easier to protect, power and manage. From there, thin glass fibers — which need no electricity — carry the network through the buildings. In each office, a small optical box turns the fiber signal back into ordinary network sockets for computers, Wi-Fi, phones and cameras.',
          'The result is fewer rooms to run, longer reach, simpler central management and a cabling system that can be upgraded for decades. The trade-offs are that capacity on each fiber is shared, the small boxes in offices still need power, and the design must be engineered carefully.'
        ]
      }
    ],
    callouts: [
      {
        type: 'key-point',
        title: 'The Essence of FTTO',
        text: 'We move intelligence toward the central IT room, move fiber closer to users, reduce active switches in distributed rooms, and use compact optical terminals near users.'
      }
    ]
  },
  {
    id: 'sec-28',
    number: '28',
    title: "Engineer's Design Checklist",
    category: 'Implementation',
    readTime: '6 min',
    summary: 'Comprehensive 30-item technical audit checklist covering Physical, Optical, Network, Power, Wireless, and Operational readiness.',
    keyTakeaway: 'Close every checklist item before issuing tenders and before cutting the first optical fiber.',
    sections: [
      {
        heading: 'Pre-Deployment Engineering Audit',
        body: [
          'A successful FTTO deployment requires closing items across 6 engineering domains: Physical pathways and fiber standards, Optical link loss budgets, Network VLANs and QoS, Power resilience, Wireless RF design, and Operational telemetry.'
        ]
      }
    ]
  },
  {
    id: 'sec-29',
    number: '29',
    title: 'Abbreviation & Terminology Glossary',
    category: 'Reference',
    readTime: '5 min',
    summary: 'Complete authoritative dictionary of all 35+ campus optical networking abbreviations, ITU-T/IEEE standards, and commonly confused pairs.',
    keyTakeaway: 'Always remember: POF (Plastic Optical Fiber) is not PoF (Power over Fiber); ODN is the entire network, while ODF is the central patch frame.',
    sections: [
      {
        heading: 'Commonly Confused Pairs',
        body: [
          'POF (Plastic Optical Fiber) ≠ PoF (Power over Fiber).',
          'ONU and ONT are used interchangeably by many vendors; compare specifications, not labels.',
          'ODN (the whole passive distribution network) ≠ ODF (the rack-mounted frame in the IT room).',
          'FTTO (where the fiber goes) ≠ POL (how the network is built using PON splitters).'
        ]
      }
    ]
  }
];
