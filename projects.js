const PROJECTS = [
  {
    category: "featured",
    rank: 1,
    name: "Msc thesis - CNN research",
    description: "A deep learning MSc thesis project focused on classifying a large personal photo dataset with convolutional neural networks, comparing multiple models and designing a lightweight classifier for local use.",
    image: "img/msc_thesis.png",
    github: "https://github.com/SandorBalazsHU/elte-ik-msc-thesis",
    tags: ["CNN", "Photography", "Msc"],
    status: "Completed",
    type: "Neural networks",
    year: "2025",
    grade: "Excellent, grade 5/5"
  },
  {
    category: "featured",
    rank: 2,
    name: "Bsc thesis - 3D Traffic Simulation",
    description: "C++ and OpenGL based 3D traffic simulation tool for modeling road networks, visualizing vehicle movement, testing routing behavior and collecting traffic flow statistics.",
    image: "img/bsc_thesis.png",
    github: "https://github.com/sandorbalazshu",
    tags: ["C++", "OpenGL", "SDL2", "Simulation", "Pathfinding"],
    status: "Completed",
    type: "Software",
    year: "2021",
    award: "ELTE Faculty of Informatics Thesis Excellence Award, 2021",
    grade: "Excellent, highest possible grade"
  },
  {
    category: "featured",
    rank: 3,
    name: "TTCN3 IDE Call hierarchy analyzer",
    description: "This project was developed in the joint software technology laboratory of ELTE and Ericsson. It provides interactive call hierarchy analysis for large TTCN-3 based industrial test systems, helping developers understand complex function relationships, navigate large codebases and support debugging and maintenance through call graph visualization.",
    image: "img/ttcn3.png",
    github: "https://github.com/SandorBalazsHU/titan.EclipsePlug-ins",
    tags: ["TTCN3", "JAVA", "Eclipse", "IDE", "Opensource", "Tools", "Code analysis", "Research"],
    status: "Completed",
    type: "Research / Tooling",
    year: "2019",
    conference: "EFOP Software research conference Dabas 2019.06.22."
  },
  {
    category: "featured",
    rank: 4,
    name: "Medical Device Simulation for SPECT/CT Systems",
    description: "Contributed to a large-scale internal Python simulation system for SPECT/CT medical imaging devices, modeling CAN bus level hardware communication in the ELTE-Mediso Software Technology Laboratory.",
    tags: ["Python", "Simulation", "Medical Imaging", "SPECT/CT", "CAN Bus"],
    status: "Completed",
    type: "Research / Tooling",
    year: "2023",
    public: false,
    nonPublicReason: "Institutional / research project"
  },

  {
    category: "electronics",
    rank: 1,
    name: "8×8×8 LED Cube Controller",
    description: "Custom driver board for a multiplexed LED cube using shift registers, transistor switching and modular connectors.",
    image: "img/led-cube.jpg",
    
    tags: ["Arduino", "LED", "74HC595", "Multiplexing"],
    status: "Active",
    type: "Hardware",
    year: "2026"
  },
  {
    category: "electronics",
    rank: 2,
    name: "CC-CV Bench Supply / Charger",
    description: "A practical adjustable power and charging setup built from a laptop supply, buck converter, meters and protection components.",
    image: "img/cc-cv-supply.jpg",
    github: "https://github.com/sandorbalazs9402",
    tags: ["Power", "Battery", "Lab"],
    status: "Experimental",
    type: "Electronics",
    year: "2026"
  },
  {
    category: "electronics",
    rank: 3,
    name: "TDA2030A Stereo Amplifier",
    description: "A discrete audio amplifier build using classic TDA2030A chips, single-supply topology and carefully chosen passive components.",
    image: "img/tda2030a.jpg",
    github: "https://github.com/sandorbalazs9402",
    tags: ["Audio", "Analog", "Amplifier"],
    status: "In progress",
    type: "Analog",
    year: "2026"
  },
  {
    category: "electronics",
    rank: 4,
    name: "Small Tesla Coil Experiments",
    description: "Compact self-resonant high-voltage coil kits tested, modified and compared under different supply and primary winding conditions.",
    image: "img/tesla-coil.jpg",
    github: "https://github.com/sandorbalazs9402",
    tags: ["High voltage", "Resonance", "Experiment"],
    status: "Tested",
    type: "Electronics",
    year: "2026"
  },
  {
    category: "electronics",
    rank: 5,
    name: "FM Radio Kit Investigation",
    description: "Reverse engineering and practical testing of a small RDA5807FP-based FM radio module and antenna behavior.",
    image: "img/fm-radio.jpg",
    github: "https://github.com/sandorbalazs9402",
    tags: ["Radio", "RDA5807", "Debug"],
    status: "Tested",
    type: "Radio",
    year: "2026"
  },
  {
    category: "electronics",
    rank: 6,
    name: "GPS / PPS Clock Concept",
    description: "A concept for a home-built precision time display using GPS PPS, internet time and fallback oscillator logic.",
    image: "img/gps-clock.jpg",
    github: "https://github.com/sandorbalazs9402",
    tags: ["GPS", "PPS", "Time"],
    status: "Idea",
    type: "Embedded",
    year: "2026"
  },

  {
    category: "software",
    rank: 1,
    name: "CPU Random Test",
    description: "C++ data collection and Python analysis scripts for testing and visualizing hardware-generated random values.",
    image: "img/random-test.jpg",
    github: "https://github.com/sandorbalazs9402",
    tags: ["C++", "Python", "Matplotlib"],
    status: "Active",
    type: "Analysis",
    year: "2026"
  },
  {
    category: "software",
    rank: 2,
    name: "Morning Decision Dashboard Concept",
    description: "A local-only dashboard idea for combining weather, astronomy, webcams and fieldwork decision data into one quick view.",
    image: "img/dashboard.jpg",
    github: "https://github.com/sandorbalazs9402",
    tags: ["Dashboard", "Weather", "Astronomy"],
    status: "Concept",
    type: "Utility",
    year: "2026"
  },
  {
    category: "software",
    rank: 3,
    name: "Random Analyzer",
    description: "A Python script for reading numeric datasets, calculating statistics and producing distribution and correlation plots.",
    image: "img/random-analyzer.jpg",
    github: "https://github.com/sandorbalazs9402",
    tags: ["Python", "Statistics", "Plots"],
    status: "Prototype",
    type: "Tool",
    year: "2026"
  },

  {
    category: "measurement",
    rank: 1,
    name: "RDRAND Distribution Analysis",
    description: "A measurement project focused on lower and upper bit distribution, grouped 16-bit values and neighboring value relationships.",
    image: "img/rdrand-analysis.jpg",
    github: "https://github.com/sandorbalazs9402",
    tags: ["RDRAND", "Statistics", "CPU"],
    status: "Measured",
    type: "Data analysis",
    year: "2026"
  },
  {
    category: "measurement",
    rank: 2,
    name: "Raspberry Pi Monitoring Stack",
    description: "A lightweight home server monitoring stack using PostgreSQL, InfluxDB, Grafana, Loki and Nginx on a Raspberry Pi.",
    image: "img/pi-monitoring.jpg",
    github: "https://github.com/sandorbalazs9402",
    tags: ["Grafana", "InfluxDB", "PostgreSQL"],
    status: "Running",
    type: "Monitoring",
    year: "2026"
  },

  {
    category: "photo-astro",
    rank: 1,
    name: "Astrophotography Planning Dashboard",
    description: "A future tool for checking sky conditions, solar activity, webcams and astronomical events before field photography.",
    image: "img/astro-dashboard.jpg",
    github: "https://github.com/sandorbalazs9402",
    tags: ["Astronomy", "Photography", "Planning"],
    status: "Idea",
    type: "Planning tool",
    year: "2026"
  },
  {
    category: "photo-astro",
    rank: 2,
    name: "Panorama Processing Notes",
    description: "Experiments and documentation around stitching wide sky panoramas from RAW images and correcting projection distortion.",
    image: "img/panorama.jpg",
    github: "https://github.com/sandorbalazs9402",
    tags: ["Photography", "RAW", "Panorama"],
    status: "Documented",
    type: "Photography",
    year: "2026"
  },

  {
    category: "other",
    rank: 1,
    name: "Model Aircraft Build Notes",
    description: "A future engineering-style project log for designing and building lightweight balsa aircraft with custom electronics.",
    image: "img/model-aircraft.jpg",
    github: "https://github.com/sandorbalazs9402",
    tags: ["Aviation", "Modeling", "Electronics"],
    status: "Idea",
    type: "Modeling",
    year: "2026"
  }
];