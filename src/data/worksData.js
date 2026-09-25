import mussorieVilla from "../images/2_Mussorie-Villa.jpg";
import toriusFactory from "../images/1_Torius-Factory_3.jpg";
import highburyGroove from "../images/HIGHBURY-GROOVE-3.jpg";

export const PRIMARY_CATEGORIES = [
  "All",
  "Photography",
  "Exterior",
  "Interior",
  "Virtual Reality",
  "Furniture",
];

export const SUB_CATEGORIES = [
  "All",
  "Commercial",
  "Overseas",
  "Residential",
  "Hospitality",
];

// Architectural Joinery Code Dictionary for clean titles
const CODE_TITLES = {
  BWBS: "Bed & Wardrobe Suite",
  BWDS: "Bed & Wardrobe Dressing Suite",
  W3DH: "3-Door Hinged Wardrobe",
  W4DH: "4-Door Hinged Wardrobe",
  WWI: "Walk-In Wardrobe Suite",
  CRU: "Credenza & Console Unit",
  SCA: "Sculptural Shoe Cabinet",
  HWD: "Hinged Wardrobe System",
  OWD: "Open Wardrobe System",
  SHD: "Shoe Display Showcase",
  SHR: "Shoe Rack & Cabinet",
  SWD: "Sliding Wardrobe System",
  LCO: "Living Room Console",
  CU: "Bespoke Credenza Unit",
  DU: "Dresser & Vanity Console",
  EC: "Entertainment Console",
  EU: "Media Wall & TV Unit",
  IP: "Island Partition Unit",
  PC: "Bespoke Pooja & Accent Console",
  SC: "Shoe Cabinet & Storage",
  ST: "Accent Study & Side Table",
};

const DESIGNER_LOCATIONS = {
  puneeth: { client: "Puneeth Residence", loc: "Pune, India" },
  vinitha: { client: "Vinitha Residence", loc: "Mumbai, India" },
  bhavana: { client: "Bhavana Villa", loc: "Bangalore, India" },
  komal: { client: "Komal Residence", loc: "Pune, India" },
  shirin: { client: "Shirin Residence", loc: "Thane, India" },
  shweta: { client: "Shweta Residence", loc: "Pune, India" },
  aboli: { client: "Aboli Residence", loc: "Mumbai, India" },
  pune: { client: "Interoviz Pune Project", loc: "Pune, India" },
  thane: { client: "Interoviz Thane Project", loc: "Thane, India" },
};

// Dynamically import all images from src/images/Furniture using Vite's import.meta.glob
const furnitureModules = import.meta.glob(
  "../images/Furniture/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" }
);

const furnitureItems = Object.entries(furnitureModules)
  .filter(([path]) => !path.includes("Thumbs.db"))
  .map(([path, resolvedImg], idx) => {
    const filename = path.split("/").pop() || "";
    const raw = filename.replace(/\.[^/.]+$/, "");
    const isCV2 = raw.startsWith("CV2_");
    const isCV = !isCV2 && raw.startsWith("CV_");
    const viewTag = isCV2 ? "Detail" : isCV ? "Close-up" : "";
    const clean = raw.replace(/^CV2?_/, "").trim();

    // Match code
    const matchedCode = Object.keys(CODE_TITLES).find((c) =>
      clean.toUpperCase().includes(c)
    );
    const baseTitle = matchedCode ? CODE_TITLES[matchedCode] : "Bespoke Joinery Unit";

    // Match index number
    const numMatch = clean.match(/(\d+)/);
    const num = numMatch ? numMatch[1].padStart(2, "0") : String(idx + 1).padStart(2, "0");

    // Match designer / location
    const designerKey = Object.keys(DESIGNER_LOCATIONS).find((k) =>
      clean.toLowerCase().includes(k)
    );
    const clientInfo = designerKey
      ? DESIGNER_LOCATIONS[designerKey]
      : { client: "Interoviz Bespoke Atelier", loc: "Mumbai / Pune, India" };

    const titleParts = [baseTitle, num];
    if (viewTag) titleParts.push(`(${viewTag})`);

    return {
      id: "furniture-" + raw.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: titleParts.join(" "),
      category: "Furniture",
      subCategory: "Residential",
      image: resolvedImg,
      client: clientInfo.client,
      location: clientInfo.loc,
      year: "2026",
      description:
        "Precision architectural visualization of custom joinery and bespoke furniture system, crafted with photorealistic physical materials and nuanced atmospheric lighting.",
    };
  });

// Exterior Architecture Projects Metadata Mapping
const EXTERIOR_METADATA = {
  "16 - INTERNAL LANDSCAPE VIEW": {
    title: "Courtyard & Landscape Pavilion",
    subCategory: "Commercial",
    client: "Botanical Living Atelier",
    location: "Bangalore, India",
    year: "2025",
    description: "Panoramic internal courtyard visualization framed by lush subtropical landscape architecture and reflecting pools.",
  },
  "18 - AERIAL VIEW": {
    title: "Masterplan Estate (Aerial View)",
    subCategory: "Commercial",
    client: "Urban Crest Developments",
    location: "Pune, India",
    year: "2025",
    description: "High-altitude architectural aerial render highlighting the masterplan layout, roof terrace landscaping, and contextual surroundings.",
  },
  "20221103_BACK_FINAL-update": {
    title: "Rear Elevation & Private Grounds",
    subCategory: "Residential",
    client: "Private Residence Estate",
    location: "Mumbai, India",
    year: "2024",
    description: "Sculptural rear facade elevation showcasing cantilevered balconies, bronze louvers, and manicured private grounds.",
  },
  "Cottage View": {
    title: "Hillside Alpine Cottage",
    subCategory: "Residential",
    client: "Summit Retreats",
    location: "Manali, India",
    year: "2025",
    description: "Rustic modern timber-and-stone cottage nestled into steep pine-forested alpine slopes with panoramic glazing.",
  },
  "Exterior Building": {
    title: "Civic & Commercial Center Facade",
    subCategory: "Commercial",
    client: "Apex Horizon Properties",
    location: "New Delhi, India",
    year: "2025",
    description: "Monumental contemporary commercial facade with dynamic curtain wall glazing and architectural sunshades.",
  },
  "Facade_R2_Final View": {
    title: "Parametric Perforated Facade Study",
    subCategory: "Commercial",
    client: "Studio Form & Space",
    location: "Singapore",
    year: "2025",
    description: "Intricate perforated facade detailing designed for solar mitigation and dynamic shadow casting throughout the day.",
  },
  "Final View copy": {
    title: "Linear Coastal Villa Facade",
    subCategory: "Residential",
    client: "Aura Luxury Residences",
    location: "Goa, India",
    year: "2025",
    description: "Clean linear white stucco architecture accented with warm teak louvers and evening ambient perimeter illumination.",
  },
  Ford_road: {
    title: "Ford Road Urban Streetscape",
    subCategory: "Commercial",
    client: "Civic Transit Authority",
    location: "Melbourne, Australia",
    year: "2024",
    description: "Photorealistic streetscape and avenue visualization capturing daylight reflections on modern high-street retail facades.",
  },
  "Hyundai Showroom": {
    title: "Hyundai Flagship Mobility Pavilion",
    subCategory: "Commercial",
    client: "Hyundai Motor Corporation",
    location: "Seoul / Mumbai",
    year: "2025",
    description: "Next-generation automotive brand experience center featuring ultra-clear architectural glass and sculptural roof lines.",
  },
  Kia_Showroom_Cam2_1: {
    title: "Kia Experience Center (Plaza View)",
    subCategory: "Commercial",
    client: "Kia Motors Architecture",
    location: "Mumbai, India",
    year: "2025",
    description: "Dynamic brand architecture showcasing sweeping geometric rooflines, illuminated canopy, and active pedestrian plaza.",
  },
  Kia_Showroom_Cam4_1: {
    title: "Kia Experience Center (Nocturne View)",
    subCategory: "Commercial",
    client: "Kia Motors Architecture",
    location: "Mumbai, India",
    year: "2025",
    description: "Dusk lighting study of the flagship automotive pavilion highlighting calibrated warm architectural lighting and reflections.",
  },
  "Kia Showroom_Cam2_1": {
    title: "Kia Experience Center (Plaza View)",
    subCategory: "Commercial",
    client: "Kia Motors Architecture",
    location: "Mumbai, India",
    year: "2025",
    description: "Dynamic brand architecture showcasing sweeping geometric rooflines, illuminated canopy, and active pedestrian plaza.",
  },
  "Kia Showroom_Cam4_1": {
    title: "Kia Experience Center (Nocturne View)",
    subCategory: "Commercial",
    client: "Kia Motors Architecture",
    location: "Mumbai, India",
    year: "2025",
    description: "Dusk lighting study of the flagship automotive pavilion highlighting calibrated warm architectural lighting and reflections.",
  },
  Penthouse: {
    title: "Skyline Crown Penthouse Terrace",
    subCategory: "Residential",
    client: "Crown Heights Real Estate",
    location: "Dubai, UAE",
    year: "2026",
    description: "Top-floor luxury penthouse exterior featuring an infinity plunge pool, frameless glass balustrades, and dramatic metropolitan skyline vistas.",
  },
  "Sand n Beach 2": {
    title: "Sand & Beachfront Resort Suites",
    subCategory: "Hospitality",
    client: "Coastline Luxury Resorts",
    location: "Goa, India",
    year: "2025",
    description: "Tropical beachfront resort architecture designed with bleached coral stone, open air breeze-ways, and ocean views.",
  },
  "Sand n Beach": {
    title: "Sand & Beach Ocean Pavilion",
    subCategory: "Hospitality",
    client: "Coastline Luxury Resorts",
    location: "Goa, India",
    year: "2025",
    description: "Seaside pavilion overlooking turquoise coastal waters with natural thatched sunscreens and timber sun decks.",
  },
  "Side Cam_Final View": {
    title: "Cantilevered Residence (Side Elevation)",
    subCategory: "Residential",
    client: "Atelier V",
    location: "Pune, India",
    year: "2025",
    description: "Side elevation capturing dramatic volumetric cantilevers, textured stone cladding, and private garden setback.",
  },
  "Side Cam_Final View2": {
    title: "Cantilevered Residence (Courtyard Angle)",
    subCategory: "Residential",
    client: "Atelier V",
    location: "Pune, India",
    year: "2025",
    description: "Perspective view highlighting the relationship between raw concrete finishes, manicured boundary flora, and natural daylight.",
  },
  "Street_Cam_08-20-2021": {
    title: "Metropolitan High-Street Promenade",
    subCategory: "Commercial",
    client: "Metro Urban Planning",
    location: "London, UK",
    year: "2024",
    description: "Atmospheric street-level visualization depicting pedestrian life, street furniture, and historic-contemporary facade integration.",
  },
  "front cam_Final View": {
    title: "Cantilevered Residence (Entrance Portal)",
    subCategory: "Residential",
    client: "Atelier V",
    location: "Pune, India",
    year: "2025",
    description: "Grand entrance portal featuring double-height pivot door, integrated water court, and dramatic upward accent lighting.",
  },
};

// Dynamically import all images from src/images/Exterior using Vite's import.meta.glob
const exteriorModules = import.meta.glob(
  "../images/Exterior/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" }
);

const exteriorItems = Object.entries(exteriorModules)
  .filter(([path]) => !path.includes("Thumbs.db"))
  .map(([path, resolvedImg]) => {
    const filename = path.split("/").pop() || "";
    const raw = filename.replace(/\.[^/.]+$/, "");
    const meta = EXTERIOR_METADATA[raw] || {
      title: raw.replace(/[-_]+/g, " ").trim(),
      subCategory: "Commercial",
      client: "Interoviz Architecture",
      location: "India",
      year: "2025",
      description:
        "High-fidelity architectural exterior visualization capturing realistic daylighting, contextual landscape, and bespoke materiality.",
    };

    return {
      id: "exterior-" + raw.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: meta.title,
      category: "Exterior",
      subCategory: meta.subCategory,
      image: resolvedImg,
      client: meta.client,
      location: meta.location,
      year: meta.year,
      description: meta.description,
    };
  });

export const WORKS_ITEMS = [
  // ── Hospitality & Interior (Exact match to user reference) ──
  {
    id: "hotel-bedroom-suite",
    title: "Contemporary Boutique Suite",
    category: "Interior",
    subCategory: "Hospitality",
    image: "/images/gallery/interoviz-hotel-bedroom-suite.png",
    client: "Voco Luxury Hotels",
    location: "Zurich, Switzerland",
    year: "2026",
    description: "Bespoke hospitality master suite visualization featuring geometric acoustic relief wall, ambient cove lighting, and tailored modern furnishings.",
  },
  {
    id: "luxury-living-terrace",
    title: "Penthouse Living & Terrace Suite",
    category: "Interior",
    subCategory: "Hospitality",
    image: "/images/gallery/interoviz-luxury-living-terrace.png",
    client: "The Grand Residence",
    location: "Milan, Italy",
    year: "2026",
    description: "Executive hotel suite lounge with warm architectural oak dividers, curated modern upholstery, and natural perimeter illumination.",
  },
  {
    id: "hotel-twin-room",
    title: "Alpine Twin Guestroom",
    category: "Interior",
    subCategory: "Hospitality",
    image: "/images/gallery/interoviz-hotel-twin-room.png",
    client: "Alpine Crest Resorts",
    location: "Innsbruck, Austria",
    year: "2025",
    description: "Modern twin guest room design utilizing angled accent plaster paneling, integrated reading sconces, and expansive panoramic glazing.",
  },
  {
    id: "voco-boutique-reception",
    title: "Voco Concierge & Lobby Atrium",
    category: "Interior",
    subCategory: "Hospitality",
    image: "/images/gallery/interoviz-voco-boutique-reception.png",
    client: "IHG Hotels & Resorts",
    location: "Copenhagen, Denmark",
    year: "2026",
    description: "Curved archway lobby reception with brass accent chandeliers, recessed coffered ceilings, and integrated biophilic planting.",
  },
  {
    id: "grand-lodge-fireplace",
    title: "Grand Forest Lodge Hearth",
    category: "Interior",
    subCategory: "Hospitality",
    image: "/images/gallery/interoviz-grand-lodge-fireplace.png",
    client: "Solitude Mountain Retreat",
    location: "Banff, Canada",
    year: "2026",
    description: "Cathedral-height timber lounge with suspended sculptural hearth, double-glazed curtain wall opening to mountain pine landscape.",
  },
  {
    id: "spa-treatment-suite",
    title: "Bespoke Wellness & Spa Pavilion",
    category: "Interior",
    subCategory: "Hospitality",
    image: "/images/gallery/interoviz-spa-treatment-suite.png",
    client: "Aman Wellness Collective",
    location: "Kyoto, Japan",
    year: "2026",
    description: "Serene holistic wellness sanctuary incorporating Japanese bamboo ceiling latticework, dark basalt flagstone, and private zen garden views.",
  },

  // ── Live 3D Architectural / Furniture Items (with direct real-time orbit) ──
  {
    id: "archer-armchair-3d",
    title: "Archer Bespoke Armchair (Live 3D)",
    category: "Furniture",
    subCategory: "Hospitality",
    image: "/images/gallery/interoviz-spa-treatment-suite.png",
    modelUrl: "/models/ArcherArmChair.glb",
    is3D: true,
    client: "Archer Living Studio",
    location: "Milan, Italy",
    year: "2026",
    description: "Sculptural luxury armchair designed with photorealistic PBR fabric weave, ergonomic contours, and real-time 360° interactive orbit.",
  },

  // ── All 120 Bespoke Furniture & Joinery Works ──
  ...furnitureItems,

  // ── Virtual Reality & Spatial 3D ──
  {
    id: "nippon-steel-360-vr",
    title: "Nippon Steel Executive Atrium (Live 360° 3D VR)",
    category: "Virtual Reality",
    subCategory: "Commercial",
    image: "/images/gallery/nippon-steel-360-vr.jpg",
    panoramaUrl: "/images/gallery/nippon-steel-360-vr.jpg",
    is3D: true,
    isPanorama: true,
    client: "Nippon Steel Corporation",
    location: "Tokyo, Japan",
    year: "2026",
    description: "Immersive 360° interactive spatial visualization of Nippon Steel's flagship reception atrium, featuring architectural timber gridshell vaulted ceilings, terrazzo island counters, and executive lounge zones.",
  },
  {
    id: "vr-archer-spatial",
    title: "Archer 3D Spatial Form Study",
    category: "Virtual Reality",
    subCategory: "Commercial",
    image: highburyGroove,
    modelUrl: "/models/ArcherArmChair.glb",
    is3D: true,
    client: "Interoviz Spatial Lab",
    location: "Milan, Italy",
    year: "2026",
    description: "Interactive real-time 3D spatial object. Rotate 360°, inspect textures, and experience dynamic shadows and physically based rendering.",
  },
  {
    id: "vr-spatial-geometry",
    title: "Parametric Pavilion Spatial Form (Live 3D)",
    category: "Virtual Reality",
    subCategory: "Commercial",
    image: highburyGroove,
    modelUrl: "/models/sample-model.glb",
    is3D: true,
    client: "Interoviz Innovation Lab",
    location: "Basel, Switzerland",
    year: "2026",
    description: "Real-time 3D algorithmic spatial exploration rendered with PBR metallic shading and interactive camera orbit.",
  },

  // ── Exterior & Architectural Projects ──
  ...exteriorItems,
  {
    id: "mussorie-hillside",
    title: "Mussorie Hillside Residence",
    category: "Exterior",
    subCategory: "Residential",
    image: mussorieVilla,
    client: "Private Estate",
    location: "Himalayan Ridge, India",
    year: "2025",
    description: "Modern cantilevered residential architecture nestled seamlessly into cascading Himalayan pine slopes.",
  },
  {
    id: "torius-factory-creative",
    title: "Torius Creative Hub & Factory",
    category: "Exterior",
    subCategory: "Commercial",
    image: toriusFactory,
    client: "Torius Developments",
    location: "Berlin, Germany",
    year: "2025",
    description: "Industrial adaptive reuse masterplan celebrating raw brickwork materiality and atmospheric twilight lighting.",
  },
  {
    id: "highbury-groove-manor",
    title: "Highbury Groove Residence",
    category: "Exterior",
    subCategory: "Residential",
    image: highburyGroove,
    client: "Atelier Noir",
    location: "London, United Kingdom",
    year: "2026",
    description: "Sculptural brick and glass residential facade framed by mature oak woodlands.",
  },

  // ── Photography & Editorial ──
  {
    id: "editorial-atrium-light",
    title: "Atrium Illumination Study",
    category: "Photography",
    subCategory: "Commercial",
    image: "/images/gallery/interoviz-grand-lodge-fireplace.png",
    client: "Architectural Digest Feature",
    location: "Geneva, Switzerland",
    year: "2025",
    description: "Architectural light and shadow study capturing golden hour rays penetrating grand double-height glazing.",
  },

  // ── Overseas Typology ──
  {
    id: "overseas-villa-concept",
    title: "Lake Como Lakeside Sanctuary",
    category: "Exterior",
    subCategory: "Overseas",
    image: mussorieVilla,
    client: "Private Client",
    location: "Lake Como, Italy",
    year: "2026",
    description: "Mediterranean hillside retreat featuring stepped stone terraces and reflective water courts.",
  },
];
