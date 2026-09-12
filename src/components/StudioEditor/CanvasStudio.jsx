import React, { useState, useRef } from 'react';
import { MEDIA_FORMATS, DESIGN_TEMPLATES } from '../../data/designTemplates';
import { COLOR_PALETTES } from '../../data/brandPresets';
import {
  Type, Palette, Layout, Settings, Printer, Eye, Download, Sparkles,
  Sliders, Grid, ShieldAlert, FileText, CheckCircle2, Image as ImageIcon, RotateCcw, Upload
} from 'lucide-react';

export default function CanvasStudio({ currentDesign, setCurrentDesign, onExport }) {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [activeFormat, setActiveFormat] = useState(MEDIA_FORMATS[0]);
  const [showBleed, setShowBleed] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [cmykMode, setCmykMode] = useState(false);
  const [showCropMarks, setShowCropMarks] = useState(true);

  const handleCustomImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setBgImage(evt.target.result);
          // Set opacity high so the uploaded photo is clearly visible
          setOverlayOpacity(0.85);
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset file input so picking the same or another file always fires onChange
    if (e.target) {
      e.target.value = '';
    }
  };

  // Form State
  const [headline, setHeadline] = useState(currentDesign?.title || "ANTIGRAVITY DESIGN");
  const [subtitle, setSubtitle] = useState(currentDesign?.subtitle || "DIGITAL & PRINT CREATIVE SUITE");
  const [tagline, setTagline] = useState(currentDesign?.tagline || "300 DPI PRE-FLIGHT • SWISS GRID ENGINE 2026");
  const [badgeText, setBadgeText] = useState(currentDesign?.badge || "PRO GRAPHIC EDITION");

  const [headlineFont, setHeadlineFont] = useState(currentDesign?.headlineFont || "Syne");
  const [subFont, setSubFont] = useState(currentDesign?.subFont || "Space Grotesk");
  const [align, setAlign] = useState(currentDesign?.align || "left");

  const [primaryColor, setPrimaryColor] = useState(currentDesign?.primaryColor || "#00DFD8");
  const [secondaryColor, setSecondaryColor] = useState(currentDesign?.secondaryColor || "#FF0080");
  const [bgColor, setBgColor] = useState(currentDesign?.bgColor || "#0A0A0C");
  const [accentColor, setAccentColor] = useState(currentDesign?.accentColor || "#D4AF37");

  const [bgImage, setBgImage] = useState(currentDesign?.backgroundImage || "/assets/hero_branding_art_1789199298688.png");
  const [overlayOpacity, setOverlayOpacity] = useState(currentDesign?.overlayOpacity || 0.25);
  const [bgPattern, setBgPattern] = useState(currentDesign?.bgPattern || "cyber-mesh");

  // Handle Preset Loading
  const applyTemplate = (tpl) => {
    setHeadline(tpl.title);
    setSubtitle(tpl.subtitle);
    setTagline(tpl.tagline);
    setBadgeText(tpl.badge);
    setHeadlineFont(tpl.headlineFont);
    setSubFont(tpl.subFont);
    setAlign(tpl.align);
    setPrimaryColor(tpl.primaryColor);
    setSecondaryColor(tpl.secondaryColor);
    setBgColor(tpl.bgColor);
    setAccentColor(tpl.accentColor);
    setBgImage(tpl.backgroundImage);
    setOverlayOpacity(tpl.overlayOpacity);
    setBgPattern(tpl.bgPattern);

    const fmt = MEDIA_FORMATS.find(m => m.id === tpl.formatId) || MEDIA_FORMATS[0];
    setActiveFormat(fmt);
  };

  const applyPalette = (pal) => {
    setPrimaryColor(pal.primary);
    setSecondaryColor(pal.secondary);
    setBgColor(pal.background);
    setAccentColor(pal.accent);
  };

  // Canvas Dimension calculation for preview box
  const isPrint = activeFormat.category === 'print';
  let canvasAspect = '1/1';
  if (activeFormat.id === 'insta-story') canvasAspect = '9/16';
  else if (activeFormat.id === 'web-hero') canvasAspect = '16/9';
  else if (activeFormat.id === 'linkedin-banner') canvasAspect = '4/1';
  else if (activeFormat.id === 'a4-poster') canvasAspect = '1/1.414';
  else if (activeFormat.id === 'business-card') canvasAspect = '85/55';
  else if (activeFormat.id === 'tri-fold') canvasAspect = '297/210';
  else if (activeFormat.id === 'billboard') canvasAspect = '3/1';

  return (
    <div style={{ padding: '0 12px 48px' }}>
      <div className="grid-mobile-stack" style={{ display: 'grid', gridTemplateColumns: '360px 1fr 340px', gap: '24px' }}>
        
        {/* LEFT COLUMN: Controls & Presets */}
        <div className="glass-panel" style={{ padding: '24px', overflowY: 'auto', maxHeight: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Sliders style={{ width: '18px', height: '18px', color: '#00DFD8' }} />
            <h3 className="font-syne" style={{ fontSize: '18px', fontWeight: '700', color: '#FFF' }}>
              Studio Controls
            </h3>
          </div>

          {/* Quick Preset Templates */}
          <div style={{ marginBottom: '24px' }}>
            <label className="font-space" style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>
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

          {/* Format Selector */}
          <div style={{ marginBottom: '24px' }}>
            <label className="font-space" style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>
              MEDIA FORMAT & DIMENSIONS
            </label>
            <select
              value={activeFormat.id}
              onChange={(e) => {
                const fmt = MEDIA_FORMATS.find(m => m.id === e.target.value);
                if (fmt) setActiveFormat(fmt);
              }}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFF',
                fontSize: '13px',
                fontWeight: '600',
                outline: 'none'
              }}
            >
              <optgroup label="Digital Media (sRGB)">
                {MEDIA_FORMATS.filter(f => f.category === 'digital').map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.displaySize})</option>
                ))}
              </optgroup>
              <optgroup label="Print Collateral (300 DPI CMYK)">
                {MEDIA_FORMATS.filter(f => f.category === 'print').map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.displaySize})</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Text Content Inputs */}
          <div style={{ marginBottom: '24px' }}>
            <label className="font-space" style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>
              TYPOGRAPHY & CONTENT
            </label>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#64748B' }}>Badge Tag</span>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFF',
                    fontSize: '12px'
                  }}
                />
              </div>

              <div>
                <span style={{ fontSize: '10px', color: '#64748B' }}>Headline Title</span>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFF',
                    fontSize: '13px',
                    fontWeight: '700'
                  }}
                />
              </div>

              <div>
                <span style={{ fontSize: '10px', color: '#64748B' }}>Subtitle</span>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFF',
                    fontSize: '12px'
                  }}
                />
              </div>

              <div>
                <span style={{ fontSize: '10px', color: '#64748B' }}>Tagline / Footer</span>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFF',
                    fontSize: '11px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Font Controls */}
          <div style={{ marginBottom: '24px' }}>
            <label className="font-space" style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>
              FONT PAIRING & ALIGNMENT
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#64748B' }}>Headline Font</span>
                <select
                  value={headlineFont}
                  onChange={(e) => setHeadlineFont(e.target.value)}
                  style={{ width: '100%', padding: '6px', borderRadius: '6px', background: '#111', color: '#FFF', fontSize: '12px' }}
                >
                  <option value="Syne">Syne (Display)</option>
                  <option value="Playfair Display">Playfair Display (Serif)</option>
                  <option value="Space Grotesk">Space Grotesk (Neo-Grotesque)</option>
                  <option value="Outfit">Outfit (Geometric)</option>
                  <option value="Inter">Inter (Sans)</option>
                </select>
              </div>

              <div>
                <span style={{ fontSize: '10px', color: '#64748B' }}>Alignment</span>
                <select
                  value={align}
                  onChange={(e) => setAlign(e.target.value)}
                  style={{ width: '100%', padding: '6px', borderRadius: '6px', background: '#111', color: '#FFF', fontSize: '12px' }}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
          </div>

          {/* Color Scheme Picker */}
          <div>
            <label className="font-space" style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>
              COLOR SWATCHES
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '9px', color: '#64748B' }}>Primary</span>
                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ width: '100%', height: '30px', cursor: 'pointer' }} />
              </div>
              <div>
                <span style={{ fontSize: '9px', color: '#64748B' }}>Secondary</span>
                <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} style={{ width: '100%', height: '30px', cursor: 'pointer' }} />
              </div>
              <div>
                <span style={{ fontSize: '9px', color: '#64748B' }}>Background</span>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: '100%', height: '30px', cursor: 'pointer' }} />
              </div>
              <div>
                <span style={{ fontSize: '9px', color: '#64748B' }}>Accent</span>
                <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} style={{ width: '100%', height: '30px', cursor: 'pointer' }} />
              </div>
            </div>

            {/* Quick Color Palette Presets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {COLOR_PALETTES.map((pal, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPalette(pal)}
                  title={pal.name}
                  style={{
                    display: 'flex',
                    padding: '3px',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: pal.primary }} />
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: pal.secondary }} />
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: pal.background }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Interactive Canvas Workstage */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          
          {/* Top Canvas Bar Controls */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="font-space" style={{ fontSize: '13px', fontWeight: '700', color: '#FFF' }}>
                {activeFormat.name}
              </span>
              <span style={{
                fontSize: '10px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: isPrint ? 'rgba(230, 57, 70, 0.2)' : 'rgba(0, 223, 216, 0.2)',
                color: isPrint ? '#E63946' : '#00DFD8',
                fontWeight: '700'
              }}>
                {isPrint ? 'OFFSET PRINT (300 DPI)' : 'DIGITAL SCREEN'}
              </span>
            </div>

            {/* Print Guides Toggles */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isPrint && (
                <>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#CBD5E1', cursor: 'pointer' }}>
                    <input type="checkbox" checked={showBleed} onChange={(e) => setShowBleed(e.target.checked)} />
                    Bleed Guide (3mm)
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#CBD5E1', cursor: 'pointer' }}>
                    <input type="checkbox" checked={cmykMode} onChange={(e) => setCmykMode(e.target.checked)} />
                    CMYK Simulator
                  </label>
                </>
              )}

              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#CBD5E1', cursor: 'pointer' }}>
                <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
                Swiss Grid
              </label>
            </div>
          </div>

          {/* THE LIVE GRAPHIC CANVAS STAGE */}
          <div
            ref={canvasRef}
            id="graphic-canvas-export"
            className={`${showBleed && isPrint ? 'print-bleed-guide' : ''} ${showGrid ? `bg-pattern-${bgPattern}` : ''}`}
            style={{
              width: '100%',
              maxWidth: activeFormat.id === 'insta-story' ? '360px' : activeFormat.id === 'business-card' ? '480px' : '520px',
              aspectRatio: canvasAspect,
              backgroundColor: bgColor,
              borderRadius: isPrint ? '2px' : '16px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              filter: cmykMode ? 'contrast(0.95) saturate(0.85)' : 'none',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '36px'
            }}
          >
            {/* Background Image Layer */}
            {bgImage && (
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: overlayOpacity,
                pointerEvents: 'none'
              }} />
            )}

            {/* Bleed Safety Zone Marker */}
            {showBleed && isPrint && (
              <div className="print-safety-guide" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
            )}

            {/* TOP BAR: Badge & Accent Mark */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'space-between'
            }}>
              {badgeText && (
                <span className="font-space" style={{
                  padding: '6px 14px',
                  borderRadius: '99px',
                  background: primaryColor,
                  color: bgColor,
                  fontSize: '11px',
                  fontWeight: '800',
                  letterSpacing: '1px',
                  boxShadow: `0 4px 15px ${primaryColor}40`
                }}>
                  {badgeText}
                </span>
              )}

              <div style={{ width: '32px', height: '4px', borderRadius: '2px', background: accentColor }} />
            </div>

            {/* CENTER: Main Headline & Subtitle */}
            <div style={{ position: 'relative', zIndex: 10, textAlign: align, margin: '20px 0' }}>
              <h2
                style={{
                  fontFamily: `var(--font-${headlineFont.toLowerCase().replace(' ', '')})`,
                  fontSize: activeFormat.id === 'business-card' ? '24px' : '36px',
                  fontWeight: '800',
                  color: primaryColor,
                  lineHeight: '1.1',
                  letterSpacing: '-0.5px',
                  marginBottom: '12px',
                  textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)'
                }}
              >
                {headline}
              </h2>

              <p
                style={{
                  fontFamily: `var(--font-${subFont.toLowerCase().replace(' ', '')})`,
                  fontSize: activeFormat.id === 'business-card' ? '12px' : '15px',
                  fontWeight: '500',
                  color: secondaryColor,
                  letterSpacing: '0.5px',
                  lineHeight: '1.4'
                }}
              >
                {subtitle}
              </p>
            </div>

            {/* BOTTOM: Tagline & Technical Footer */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              borderTop: `1px solid ${accentColor}40`,
              paddingTop: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span className="font-space" style={{ fontSize: '10px', color: secondaryColor, letterSpacing: '0.5px' }}>
                {tagline}
              </span>

              <span className="font-space" style={{ fontSize: '9px', color: accentColor, fontWeight: '700' }}>
                {activeFormat.displaySize}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Export & Print Specifications */}
        <div className="glass-panel" style={{ padding: '24px', overflowY: 'auto', maxHeight: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Printer style={{ width: '18px', height: '18px', color: '#FF0080' }} />
            <h3 className="font-syne" style={{ fontSize: '18px', fontWeight: '700', color: '#FFF' }}>
              Export & Specs
            </h3>
          </div>

          {/* Quick Export Actions */}
          <div style={{ marginBottom: '24px' }}>
            <button
              onClick={() => onExport('png')}
              className="font-space"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #00DFD8 0%, #0066FF 100%)',
                color: '#000',
                fontWeight: '800',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Download style={{ width: '16px', height: '16px' }} /> Export Ultra High-Res PNG
            </button>

            <button
              onClick={() => onExport('pdf')}
              className="font-space"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFF',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <FileText style={{ width: '16px', height: '16px' }} /> Download Print Spec Sheet
            </button>
          </div>

          {/* Technical Spec Inspector Summary */}
          <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
            <h4 className="font-space" style={{ fontSize: '12px', fontWeight: '700', color: '#00DFD8', marginBottom: '12px', textTransform: 'uppercase' }}>
              ACTIVE SPECIFICATIONS
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                <span>Target Output:</span>
                <strong style={{ color: '#FFF' }}>{activeFormat.category.toUpperCase()}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                <span>Dimensions:</span>
                <strong style={{ color: '#FFF' }}>{activeFormat.displaySize}</strong>
              </div>

              {isPrint ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                    <span>Resolution:</span>
                    <strong style={{ color: '#FF0080' }}>300 DPI Vector Ready</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                    <span>Bleed Allowance:</span>
                    <strong style={{ color: '#E63946' }}>3mm Outer Boundary</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                    <span>Color Profile:</span>
                    <strong style={{ color: '#D4AF37' }}>CMYK Fogra39 / SWOP</strong>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                    <span>Pixel Grid:</span>
                    <strong style={{ color: '#00DFD8' }}>{activeFormat.widthPx} x {activeFormat.heightPx} px</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                    <span>Color Profile:</span>
                    <strong style={{ color: '#38BDF8' }}>sRGB Display P3 Wide</strong>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Background Image Selection */}
          <div>
            <label className="font-space" style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>
              ARTWORK OVERLAY & CUSTOM PHOTO
            </label>

            {/* Custom Photo File Uploader Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleCustomImageUpload}
            />

            {bgImage?.startsWith('data:image') ? (
              <div style={{ background: 'rgba(0, 223, 216, 0.12)', border: '1px solid #00DFD8', padding: '12px', borderRadius: '10px', marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', color: '#00DFD8', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ImageIcon style={{ width: '14px', height: '14px' }} /> Custom Photo Active on Canvas
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      background: 'linear-gradient(135deg, #00DFD8 0%, #0066FF 100%)',
                      color: '#000',
                      fontWeight: '700',
                      fontSize: '11px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <RotateCcw style={{ width: '12px', height: '12px' }} /> Change / Replace Photo
                  </button>

                  <button
                    type="button"
                    onClick={() => setBgImage('/assets/hero_branding_art_1789199298688.png')}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: 'rgba(230, 57, 70, 0.2)',
                      border: '1px solid rgba(230, 57, 70, 0.4)',
                      color: '#E63946',
                      fontWeight: '700',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove Photo
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-space"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FF0080 0%, #7928CA 100%)',
                  color: '#FFF',
                  fontWeight: '800',
                  fontSize: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(255, 0, 128, 0.3)'
                }}
              >
                <Upload style={{ width: '16px', height: '16px' }} /> Upload Your Own Photo / Picture
              </button>
            )}

            <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '6px' }}>
              OR CHOOSE SAMPLE ARTWORK:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              {[
                { name: 'Futuristic 3D', url: '/assets/hero_branding_art_1789199298688.png' },
                { name: 'Swiss Typo', url: '/assets/swiss_poster_design_1789199320446.png' },
                { name: 'Brand Foil', url: '/assets/brand_identity_collateral_1789199524359.png' },
                { name: 'Cyber Neon', url: '/assets/digital_social_campaign_1789199592437.png' }
              ].map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setBgImage(img.url)}
                  style={{
                    padding: '6px',
                    borderRadius: '6px',
                    background: bgImage === img.url ? 'rgba(0, 223, 216, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: bgImage === img.url ? '1px solid #00DFD8' : '1px solid transparent',
                    color: '#FFF',
                    fontSize: '10px',
                    cursor: 'pointer'
                  }}
                >
                  {img.name}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '10px', color: '#64748B', display: 'block', marginBottom: '4px' }}>
                Overlay Opacity: {Math.round(overlayOpacity * 100)}%
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#00DFD8' }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
