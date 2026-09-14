import React from 'react';
import { DESIGN_TEMPLATES } from '../../data/designTemplates';
import { COLOR_PALETTES } from '../../data/brandPresets';
import { Sliders, Type, Palette, AlignLeft, AlignCenter, AlignRight, Upload, RotateCcw, Image as ImageIcon } from 'lucide-react';

export const FEATURED_FONTS = [
  { name: "Syne", label: "Syne (Avant-Garde Display)" },
  { name: "Playfair Display", label: "Playfair Display (Luxury Serif)" },
  { name: "Space Grotesk", label: "Space Grotesk (Swiss Neo-Grotesque)" },
  { name: "Outfit", label: "Outfit (Modern Geometric)" },
  { name: "Bebas Neue", label: "Bebas Neue (Bold Poster)" },
  { name: "Montserrat", label: "Montserrat (Clean Corporate)" },
  { name: "Cinzel", label: "Cinzel (Imperial Roman Serif)" },
  { name: "Orbitron", label: "Orbitron (Cyber Tech)" },
  { name: "Abril Fatface", label: "Abril Fatface (High-Contrast)" },
  { name: "Poppins", label: "Poppins (Modern Sans)" },
  { name: "Dancing Script", label: "Dancing Script (Calligraphy)" },
  { name: "Great Vibes", label: "Great Vibes (Elegant Script)" },
  { name: "Righteous", label: "Righteous (Pop Retro)" },
  { name: "Cormorant Garamond", label: "Cormorant Garamond (Fine Art Serif)" },
  { name: "Permanent Marker", label: "Permanent Marker (Brush Poster)" },
  { name: "Noto Sans Gujarati", label: "Noto Sans Gujarati (ગુજરાતી ફોન્ટ)" },
  { name: "Inter", label: "Inter (UI Sans)" }
];

export const loadGoogleFont = (fontName) => {
  if (!fontName) return;
  const linkId = `gfont-${fontName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;600;700;800;900&display=swap`;
    document.head.appendChild(link);
  }
};

export default function PropertiesPanel({
  headline, setHeadline,
  subtitle, setSubtitle,
  tagline, setTagline,
  badgeText, setBadgeText,
  logoMarkText, setLogoMarkText,
  logoPosition, setLogoPosition,
  headlineFont, setHeadlineFont,
  subFont, setSubFont,
  align, setAlign,
  primaryColor, setPrimaryColor,
  secondaryColor, setSecondaryColor,
  bgColor, setBgColor,
  accentColor, setAccentColor,
  applyTemplate, applyPalette,
  fontFileInputRef, handleCustomFontFileUpload
}) {
  return (
    <div className="glass-panel" style={{ padding: '20px', overflowY: 'auto', maxHeight: '850px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <Sliders style={{ width: '18px', height: '18px', color: '#00DFD8' }} />
        <h3 className="font-syne" style={{ fontSize: '18px', fontWeight: '700', color: '#FFF', margin: 0 }}>
          Studio Controls & Properties
        </h3>
      </div>

      {/* Design Presets */}
      <div style={{ marginBottom: '24px' }}>
        <label className="font-space" style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          DESIGN PRESETS
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {DESIGN_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => applyTemplate(tpl)}
              style={{
                padding: '8px 10px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#F1F5F9',
                fontSize: '11px',
                fontWeight: '600',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00DFD8'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            >
              <div style={{ color: tpl.primaryColor, fontWeight: '700' }}>{tpl.title.substring(0, 15)}...</div>
              <div style={{ fontSize: '9px', color: '#64748B' }}>{tpl.badge}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content & Typography Inputs */}
      <div style={{ marginBottom: '24px' }}>
        <label className="font-space" style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          TYPOGRAPHY & CONTENT
        </label>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <span style={{ fontSize: '10px', color: '#64748B' }}>Badge Tag</span>
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#FFF', fontSize: '12px' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
              <span style={{ fontSize: '10px', color: '#64748B' }}>Fixed Corner Brand Logo Text</span>
              <span style={{ fontSize: '9px', color: '#00DFD8', fontWeight: '700' }}>FIXED CORNER</span>
            </div>
            <input
              type="text"
              value={logoMarkText}
              onChange={(e) => setLogoMarkText(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(0, 223, 216, 0.3)', color: '#00DFD8', fontSize: '12px', fontWeight: '700' }}
            />
          </div>

          <div>
            <span style={{ fontSize: '10px', color: '#64748B' }}>Brand Logo Position</span>
            <select
              value={logoPosition}
              onChange={(e) => setLogoPosition(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#FFF', fontSize: '12px' }}
            >
              <option value="bottom-right">Bottom Right Corner (Fixed)</option>
              <option value="bottom-left">Bottom Left Corner (Fixed)</option>
              <option value="top-right">Top Right Corner (Fixed)</option>
            </select>
          </div>

          <div>
            <span style={{ fontSize: '10px', color: '#64748B' }}>Headline Title</span>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#FFF', fontSize: '13px', fontWeight: '700' }}
            />
          </div>

          {/* Font Picker */}
          <div style={{ background: 'rgba(0, 223, 216, 0.08)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0, 223, 216, 0.25)' }}>
            <span style={{ fontSize: '11px', color: '#00DFD8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
              🔤 Headline Font Style
            </span>
            <select
              value={headlineFont}
              onChange={(e) => {
                setHeadlineFont(e.target.value);
                loadGoogleFont(e.target.value);
              }}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#111', color: '#FFF', fontSize: '12px', marginBottom: '6px' }}
            >
              {FEATURED_FONTS.map(f => (
                <option key={f.name} value={f.name}>{f.label}</option>
              ))}
            </select>

            <input
              type="file"
              ref={fontFileInputRef}
              accept=".ttf,.otf,.woff,.woff2"
              onChange={handleCustomFontFileUpload}
              style={{ display: 'none' }}
            />

            <button
              type="button"
              onClick={() => fontFileInputRef.current?.click()}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                background: 'rgba(0, 223, 216, 0.15)',
                border: '1px dashed rgba(0, 223, 216, 0.5)',
                color: '#00DFD8',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Type style={{ width: '13px', height: '13px' }} /> Upload Custom Font (.TTF / .OTF)
            </button>
          </div>

          <div>
            <span style={{ fontSize: '10px', color: '#64748B' }}>Subtitle</span>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#FFF', fontSize: '12px' }}
            />
          </div>

          {/* Alignment Buttons */}
          <div>
            <span style={{ fontSize: '10px', color: '#64748B', display: 'block', marginBottom: '4px' }}>Text Alignment</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {[
                { id: 'left', label: 'Left', icon: AlignLeft },
                { id: 'center', label: 'Center', icon: AlignCenter },
                { id: 'right', label: 'Right', icon: AlignRight }
              ].map((al) => {
                const IconComp = al.icon;
                return (
                  <button
                    key={al.id}
                    type="button"
                    onClick={() => setAlign(al.id)}
                    style={{
                      padding: '6px',
                      borderRadius: '6px',
                      background: align === al.id ? '#00DFD8' : 'rgba(255, 255, 255, 0.05)',
                      color: align === al.id ? '#000' : '#FFF',
                      border: 'none',
                      fontWeight: '700',
                      fontSize: '11px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <IconComp style={{ width: '13px', height: '13px' }} /> {al.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Color Palettes & Custom Colors */}
      <div style={{ marginBottom: '24px' }}>
        <label className="font-space" style={{ fontSize: '11px', color: '#00DFD8', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <Palette style={{ width: '15px', height: '15px', color: '#00DFD8' }} /> COLOR SWATCHES & PALETTES
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '16px' }}>
          {COLOR_PALETTES.map((pal) => (
            <button
              key={pal.id}
              type="button"
              onClick={() => applyPalette(pal)}
              style={{
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <span style={{ fontSize: '10px', color: '#FFF', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {pal.name}
              </span>
              <div style={{ display: 'flex', gap: '3px' }}>
                <span style={{ flex: 1, height: '14px', borderRadius: '3px', background: pal.primary }} />
                <span style={{ flex: 1, height: '14px', borderRadius: '3px', background: pal.secondary }} />
                <span style={{ flex: 1, height: '14px', borderRadius: '3px', background: pal.background }} />
                <span style={{ flex: 1, height: '14px', borderRadius: '3px', background: pal.accent }} />
              </div>
            </button>
          ))}
        </div>

        {/* Color Pickers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '10px', color: '#94A3B8' }}>Primary Color</span>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              style={{ width: '100%', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer' }}
            />
          </div>
          <div>
            <span style={{ fontSize: '10px', color: '#94A3B8' }}>Background Color</span>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              style={{ width: '100%', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
