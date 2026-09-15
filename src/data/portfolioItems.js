import brandIdentityImg from '../assets/brand_identity_collateral_1789199524359.png';
import swissPosterImg from '../assets/swiss_poster_design_1789199320446.png';
import digitalCampaignImg from '../assets/digital_social_campaign_1789199592437.png';
import heroBrandingImg from '../assets/hero_branding_art_1789199298688.png';
import festivalBannerImg from '../assets/festival_banner.png';
import restaurantMenuImg from '../assets/restaurant_menu.png';

export const PORTFOLIO_ITEMS = [
  {
    id: "luxury-stationery",
    title: "Aura Luxury Brand Identity & Stationery Set",
    category: "print",
    subCategory: "Brand Identity & Print Collateral",
    client: "Aura Botanicals & Fine Living",
    year: "2026",
    image: brandIdentityImg,
    description: "Complete corporate identity system including foil-stamped business cards, embossed letterheads, custom envelopes, and brand style guide.",
    tags: ["Gold Foil", "Dark Emerald", "Embossed", "Stationery", "300 DPI", "Pantone 5535C"],
    colors: ["#0B2B26", "#D4AF37", "#051614", "#F4F1EA", "#164E43"],
    printSpecs: {
      paperStock: "350gsm G F Smith Colorplan Forest Green",
      finishing: "Hot Foil Stamping (Gold 220), Blind Emboss",
      dimensions: "Business Card: 85 x 55 mm | Letterhead: A4 210 x 297 mm",
      bleed: "3mm outer bleed with 5mm internal safety margin",
      colorSpace: "CMYK (Spot Color: Pantone 5535 C + Metallic Gold 871 C)"
    },
    typography: {
      primary: "Playfair Display (Serif Display)",
      secondary: "Outfit (Geometric Sans)",
      weights: ["400 Regular", "600 SemiBold", "900 Black"]
    }
  },
  {
    id: "swiss-poster",
    title: "Neue Grid - International Typographic Poster",
    category: "print",
    subCategory: "Exhibition Poster & Print",
    client: "Zurich Design Biennale",
    year: "2026",
    image: swissPosterImg,
    description: "Swiss International Style museum poster featuring rigid mathematical baseline grids, bold asymmetrical composition, and high contrast typography.",
    tags: ["Swiss Design", "Baseline Grid", "A1 Poster", "Museum Print", "Red & Black"],
    colors: ["#E63946", "#111111", "#F8F9FA", "#2B2D42", "#8D99AE"],
    printSpecs: {
      paperStock: "200gsm Silk Coated Matte Art Paper",
      finishing: "Matte Laminate, UV Spot Varnish on Headline",
      dimensions: "A1 (594 x 841 mm)",
      bleed: "5mm full bleed",
      colorSpace: "CMYK (K:100%, Process Red C:0 M:95 Y:100 K:0)"
    },
    typography: {
      primary: "Space Grotesk (Modern Neo-Grotesque)",
      secondary: "Inter (Technical Sans)",
      weights: ["500 Medium", "700 Bold"]
    }
  },
  {
    id: "digital-campaign",
    title: "Krypton Cybernetic Digital Ad & Social Campaign",
    category: "digital",
    subCategory: "Social Media & Web Banners",
    client: "Nexus AI Systems",
    year: "2026",
    image: digitalCampaignImg,
    description: "High-impact digital marketing campaign graphics featuring 3D glassmorphic objects, neon glows, and responsive banner variants.",
    tags: ["Digital Campaign", "Instagram Story 9:16", "Web Banner", "3D Glass", "RGB Neon"],
    colors: ["#7928CA", "#FF0080", "#00DFD8", "#0A0A0C", "#1E1B2E"],
    printSpecs: {
      resolution: "4K UHD (3840 x 2160 px) & 1080 x 1920 px Stories",
      format: "PNG / WebP / SVG Vector Overlays",
      colorSpace: "sRGB Display P3 Wide Color"
    },
    typography: {
      primary: "Syne (Avant-Garde Display)",
      secondary: "Inter (UI Sans)",
      weights: ["700 Bold", "800 ExtraBold"]
    }
  },
  {
    id: "hero-identity",
    title: "HyperDrive Futuristic Brand Identity System",
    category: "brand",
    subCategory: "3D Visual System & Motion Assets",
    client: "HyperDrive Mobility",
    year: "2026",
    image: heroBrandingImg,
    description: "Cutting-edge visual identity system integrating 3D metallic elements, generative vector paths, and interactive UI components.",
    tags: ["Visual Identity", "3D Graphic", "Brand Guidelines", "Digital & Print"],
    colors: ["#0066FF", "#FF3366", "#0F172A", "#F8FAFC", "#38BDF8"],
    printSpecs: {
      dimensions: "Multi-Format System (Digital Screen & Offset Printing)",
      colorSpace: "RGB & CMYK Dual Profile System"
    },
    typography: {
      primary: "Syne Display",
      secondary: "Space Grotesk",
      weights: ["600 SemiBold", "800 ExtraBold"]
    }
  },
  {
    id: "festival-offer-graphic",
    title: "Grand Diwali & Navratri Festival Offer Graphic",
    category: "digital",
    subCategory: "Festival Social Media Banner",
    client: "Om Festive Collections",
    year: "2026",
    image: festivalBannerImg,
    description: "Rich Indian festive season promotional social media banner with vibrant glowing lights, gold typography, and high conversion call-to-action.",
    tags: ["Festival Banner", "Diwali Offer", "Gold & Magenta", "Instagram Post", "50% Off"],
    colors: ["#FFD700", "#FF0080", "#14002B", "#00DFD8"],
    printSpecs: {
      resolution: "1080 x 1080 px High Resolution",
      format: "PNG / JPEG sRGB"
    },
    typography: {
      primary: "Playfair Display",
      secondary: "Space Grotesk",
      weights: ["700 Bold", "900 Black"]
    }
  },
  {
    id: "gourmet-restaurant-flyer",
    title: "Royal Dining Gourmet Restaurant Menu & Flyer",
    category: "print",
    subCategory: "Restaurant Food Menu",
    client: "Royal Bites & Grill Bistro",
    year: "2026",
    image: restaurantMenuImg,
    description: "Luxury dark aesthetic restaurant menu flyer featuring mouthwatering photography, gold foil header rules, and clear pricing structure.",
    tags: ["Restaurant Menu", "Food Flyer", "Gold Foil", "A4 Print", "300 DPI"],
    colors: ["#E2B056", "#1A1612", "#0D0C0A", "#F4F1EA"],
    printSpecs: {
      paperStock: "250gsm Velvet Touch Matte",
      dimensions: "A4 (210 x 297 mm)",
      bleed: "3mm outer bleed",
      colorSpace: "CMYK Fogra39"
    },
    typography: {
      primary: "Playfair Display",
      secondary: "Outfit Sans",
      weights: ["600 SemiBold", "800 Bold"]
    }
  },
  {
    id: "cyberpunk-gaming-poster",
    title: "Neo Tokyo Cyberpunk Gaming Tournament Poster",
    category: "print",
    subCategory: "Event Poster & Esports Graphic",
    client: "CyberArena Esports League",
    year: "2026",
    image: digitalCampaignImg,
    description: "High-voltage esports festival poster featuring neon glitch effects, futuristic grid typography, and ultra-high resolution printing specifications.",
    tags: ["Esports", "Cyberpunk", "Neon Glitch", "A1 Poster", "RGB & CMYK"],
    colors: ["#00DFD8", "#FF0080", "#7928CA", "#0A0A0C"],
    printSpecs: {
      paperStock: "220gsm High-Gloss Photo Paper",
      dimensions: "A1 (594 x 841 mm)",
      colorSpace: "CMYK Spot Neon Inks"
    },
    typography: {
      primary: "Syne",
      secondary: "Space Grotesk",
      weights: ["800 ExtraBold"]
    }
  },
  {
    id: "minimalist-architecture-book",
    title: "Monochrome Minimalist Architectural Monograph",
    category: "print",
    subCategory: "Editorial & Editorial Design",
    client: "Studio Bauhaus Architects",
    year: "2026",
    image: swissPosterImg,
    description: "Hardcover architectural monograph book design with strict grid alignment, stark black-and-white photography, and debossed linen cover.",
    tags: ["Editorial", "Hardcover Book", "Swiss Grid", "Debossed Linen", "Architecture"],
    colors: ["#111111", "#FAF9F6", "#64748B"],
    printSpecs: {
      paperStock: "150gsm Munken Lynx Uncoated",
      dimensions: "240 x 300 mm Hardcover",
      finishing: "Cloth Bound Linen with Silver Foil Stamping"
    },
    typography: {
      primary: "Inter",
      secondary: "Space Grotesk",
      weights: ["400 Regular", "700 Bold"]
    }
  },
  {
    id: "eco-organic-skincare",
    title: "Verdant Organic Skincare Packaging & Box Design",
    category: "brand",
    subCategory: "Product Packaging & Box Foil",
    client: "Verdant Eco Organics",
    year: "2026",
    image: brandIdentityImg,
    description: "Eco-friendly cosmetic packaging box design using 100% recycled kraft stock, soy-based inks, and elegant rose gold foil accents.",
    tags: ["Packaging", "Eco Box", "Rose Gold Foil", "Soy Ink", "Cosmetics"],
    colors: ["#0B2B26", "#D4AF37", "#F4F1EA"],
    printSpecs: {
      paperStock: "300gsm Recycled FSC Certified Kraft",
      finishing: "Rose Gold Hot Foil + Matte Coating",
      colorSpace: "CMYK + Spot Pantone 7742 C"
    },
    typography: {
      primary: "Playfair Display",
      secondary: "Outfit",
      weights: ["500 Medium", "700 Bold"]
    }
  },
  {
    id: "billboard-supercar-ad",
    title: "Apex GT Supercar Highway Outdoor Billboard",
    category: "print",
    subCategory: "Wide Format Outdoor Advertising",
    client: "Apex Motors World",
    year: "2026",
    image: heroBrandingImg,
    description: "12m x 3m massive wide-format outdoor highway billboard ad featuring high contrast motion blur photography and bold futuristic typography.",
    tags: ["Billboard", "12m x 3m", "Wide Format", "Outdoor Ad", "Supercar"],
    colors: ["#00DFD8", "#0F172A", "#FF3366"],
    printSpecs: {
      dimensions: "12,000 x 3,000 mm (150 DPI)",
      finishing: "Heavy Duty PVC Flex Vinyl with UV Resistance",
      bleed: "50mm outer bleed"
    },
    typography: {
      primary: "Syne",
      secondary: "Inter",
      weights: ["800 ExtraBold"]
    }
  },
  {
    id: "luxury-watch-magazine",
    title: "Chronos Swiss Luxury Timepiece Magazine Spread",
    category: "print",
    subCategory: "Luxury Print Advertising",
    client: "Chronos Geneve",
    year: "2026",
    image: brandIdentityImg,
    description: "Double page magazine spread design for high-end Swiss horology brand, featuring macro watch movement details and gold foil typography.",
    tags: ["Magazine Ad", "Swiss Horology", "Gold Foil", "A4 Double Spread"],
    colors: ["#051614", "#D4AF37", "#F4F1EA"],
    printSpecs: {
      paperStock: "200gsm Gloss Coated Art Paper",
      dimensions: "420 x 297 mm Double Spread"
    },
    typography: {
      primary: "Playfair Display",
      secondary: "Space Grotesk",
      weights: ["600 SemiBold"]
    }
  },
  {
    id: "fintech-mobile-app",
    title: "NeoBank Next-Gen Crypto & Fintech App Promotion",
    category: "digital",
    subCategory: "App UI Showcase & Marketing",
    client: "NeoBank Global",
    year: "2026",
    image: digitalCampaignImg,
    description: "Sleek 3D device mockup graphics for app launch, including App Store screenshots, social media ads, and interactive landing page hero graphics.",
    tags: ["App UI", "Fintech", "3D Device", "App Store Screens", "Dark UI"],
    colors: ["#00DFD8", "#7928CA", "#0A0A0C"],
    printSpecs: {
      resolution: "4K UHD sRGB Display P3"
    },
    typography: {
      primary: "Space Grotesk",
      secondary: "Inter",
      weights: ["700 Bold"]
    }
  },
  {
    id: "music-album-vinyl",
    title: "Synthwave Dreams Limited Edition Vinyl & Cover",
    category: "brand",
    subCategory: "Music Album Art & Vinyl Pressing",
    client: "RetroWave Records",
    year: "2026",
    image: digitalCampaignImg,
    description: "12-inch vinyl album sleeve packaging design with UV spot varnish, neon gradient artwork, and collector edition booklet.",
    tags: ["Album Art", "Vinyl Sleeve", "Synthwave", "UV Spot Varnish"],
    colors: ["#FF0080", "#00DFD8", "#7928CA"],
    printSpecs: {
      dimensions: "315 x 315 mm Sleeve Outer",
      paperStock: "350gsm Heavy Weight Cardboard"
    },
    typography: {
      primary: "Syne",
      secondary: "Inter",
      weights: ["800 ExtraBold"]
    }
  },
  {
    id: "coffee-roasters-packaging",
    title: "Artisan Specialty Single-Origin Coffee Pouches",
    category: "print",
    subCategory: "Food & Beverage Packaging",
    client: "Roast & Origin Coffee Co.",
    year: "2026",
    image: restaurantMenuImg,
    description: "Matte black coffee pouch packaging with custom brass foil labels, origin stories, and flavor profile radar charts.",
    tags: ["Coffee Packaging", "Matte Pouch", "Brass Foil", "Specialty Coffee"],
    colors: ["#E2B056", "#1A1612", "#0D0C0A"],
    printSpecs: {
      paperStock: "Matte Laminate Aluminum Foil Pouch",
      finishing: "Metallic Stamping & Valve Installation"
    },
    typography: {
      primary: "Playfair Display",
      secondary: "Outfit",
      weights: ["700 Bold"]
    }
  },
  {
    id: "realestate-brochure-trifold",
    title: "Skyline Heights Penthouse Tri-Fold Sales Brochure",
    category: "print",
    subCategory: "Real Estate Marketing Brochure",
    client: "Skyline Realty Group",
    year: "2026",
    image: heroBrandingImg,
    description: "3-panel folded marketing brochure with architectural floor plans, panoramic photo spreads, and luxury gold foil stamping.",
    tags: ["Tri-Fold Brochure", "Real Estate", "A4 Folded", "300 DPI"],
    colors: ["#0066FF", "#38BDF8", "#0F172A"],
    printSpecs: {
      dimensions: "297 x 210 mm Open (A4 3-Fold)",
      paperStock: "250gsm Silk Art Paper"
    },
    typography: {
      primary: "Space Grotesk",
      secondary: "Inter",
      weights: ["600 SemiBold"]
    }
  }
];
