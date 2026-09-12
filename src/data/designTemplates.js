import brandIdentityImg from '../assets/brand_identity_collateral_1789199524359.png';
import swissPosterImg from '../assets/swiss_poster_design_1789199320446.png';
import digitalCampaignImg from '../assets/digital_social_campaign_1789199592437.png';
import heroBrandingImg from '../assets/hero_branding_art_1789199298688.png';

export const MEDIA_FORMATS = [
  // DIGITAL FORMATS
  {
    id: "insta-post",
    name: "Instagram Square Post",
    category: "digital",
    widthPx: 1080,
    heightPx: 1080,
    aspectRatio: "1:1",
    unitLabel: "px",
    displaySize: "1080 x 1080 px",
    icon: "Instagram",
    description: "Standard high-resolution square feed format for social media."
  },
  {
    id: "insta-story",
    name: "Instagram & TikTok Story",
    category: "digital",
    widthPx: 1080,
    heightPx: 1920,
    aspectRatio: "9:16",
    unitLabel: "px",
    displaySize: "1080 x 1920 px",
    icon: "Smartphone",
    description: "Vertical full-screen mobile format optimized for mobile devices."
  },
  {
    id: "web-hero",
    name: "Web Hero Banner",
    category: "digital",
    widthPx: 1920,
    heightPx: 1080,
    aspectRatio: "16:9",
    unitLabel: "px",
    displaySize: "1920 x 1080 px",
    icon: "Monitor",
    description: "Wide desktop hero header banner for modern websites."
  },
  {
    id: "linkedin-banner",
    name: "LinkedIn / Twitter Banner",
    category: "digital",
    widthPx: 1584,
    heightPx: 396,
    aspectRatio: "4:1",
    unitLabel: "px",
    displaySize: "1584 x 396 px",
    icon: "Layout",
    description: "Ultra-wide header banner for professional profiles and tech brands."
  },

  // PRINT FORMATS
  {
    id: "a4-poster",
    name: "A4 / A3 Event Poster",
    category: "print",
    widthMm: 210,
    heightMm: 297,
    bleedMm: 3,
    dpi: 300,
    displaySize: "210 x 297 mm (300 DPI)",
    icon: "FileText",
    description: "International standard poster format with 3mm outer bleed and trim marks."
  },
  {
    id: "business-card",
    name: "Luxury Business Card",
    category: "print",
    widthMm: 85,
    heightMm: 55,
    bleedMm: 3,
    dpi: 300,
    displaySize: "85 x 55 mm (300 DPI)",
    icon: "CreditCard",
    description: "Premium double-sided card layout with spot UV & gold foil stamping guides."
  },
  {
    id: "trifold-brochure",
    name: "Tri-Fold Brochure",
    category: "print",
    widthMm: 297,
    heightMm: 210,
    bleedMm: 3,
    dpi: 300,
    displaySize: "297 x 210 mm (300 DPI)",
    icon: "BookOpen",
    description: "3-panel folded marketing brochure with fold line guides."
  },
  {
    id: "billboard",
    name: "Highway Billboard",
    category: "print",
    widthMm: 12000,
    heightMm: 3000,
    bleedMm: 50,
    dpi: 150,
    displaySize: "12m x 3m Wide Format",
    icon: "Maximize",
    description: "Ultra wide-format outdoor advertising billboard."
  }
];

export const STARTER_TEMPLATES = [
  {
    id: "tpl-swiss-poster",
    title: "NEUE DESIGN BOLD",
    subtitle: "INTERNATIONAL TYPOGRAPHIC EXHIBITION",
    tagline: "FORM FOLLOWS FUNCTION • ZURICH 2026",
    badge: "PRINT EDITION",
    stylePreset: "swiss",
    formatId: "a4-poster",
    headlineFont: "Space Grotesk",
    subFont: "Inter",
    align: "left",
    primaryColor: "#E63946",
    secondaryColor: "#111111",
    bgColor: "#FAF9F6",
    accentColor: "#D4AF37",
    bgPattern: "grid-swiss",
    overlayOpacity: 0.1,
    backgroundImage: swissPosterImg,
    showGrid: true,
    showBleed: true
  },
  {
    id: "tpl-luxury-brand",
    title: "AURA FINE LIVING",
    subtitle: "BOTANICAL & LUXURY IDENTITY",
    tagline: "EST. 2026 • PARIS & TOKYO",
    badge: "BRAND COLLATERAL",
    stylePreset: "luxury",
    formatId: "business-card",
    headlineFont: "Playfair Display",
    subFont: "Outfit",
    align: "center",
    primaryColor: "#D4AF37",
    secondaryColor: "#051614",
    bgColor: "#0B2B26",
    accentColor: "#F4F1EA",
    bgPattern: "radial-glow",
    overlayOpacity: 0.25,
    backgroundImage: brandIdentityImg,
    showGrid: false,
    showBleed: true
  },
  {
    id: "tpl-cyber-neon",
    title: "KRYPTON SYNTH",
    subtitle: "NEXT GEN AI DESIGN SYSTEM",
    tagline: "EMPOWERING DIGITAL CREATORS WORLDWIDE",
    badge: "DIGITAL 1:1",
    stylePreset: "cyberpunk",
    formatId: "insta-post",
    headlineFont: "Syne",
    subFont: "Space Grotesk",
    align: "left",
    primaryColor: "#00DFD8",
    secondaryColor: "#FF0080",
    bgColor: "#0A0A0C",
    accentColor: "#7928CA",
    bgPattern: "cyber-mesh",
    overlayOpacity: 0.35,
    backgroundImage: digitalCampaignImg,
    showGrid: false,
    showBleed: false
  },
  {
    id: "tpl-hyper-drive",
    title: "HYPERDRIVE V.2",
    subtitle: "FUTURISTIC MOBILITY & VISUAL IDENTITY",
    tagline: "DESIGNED FOR THE NEXT CENTURY",
    badge: "HERO BANNER",
    stylePreset: "futuristic",
    formatId: "web-hero",
    headlineFont: "Syne",
    subFont: "Inter",
    align: "left",
    primaryColor: "#38BDF8",
    secondaryColor: "#F8FAFC",
    bgColor: "#0F172A",
    accentColor: "#FF3366",
    bgPattern: "diagonal-stripes",
    overlayOpacity: 0.3,
    backgroundImage: heroBrandingImg,
    showGrid: true,
    showBleed: false
  }
];

export const DESIGN_TEMPLATES = STARTER_TEMPLATES;
