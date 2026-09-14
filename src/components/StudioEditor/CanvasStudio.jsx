import React, { useState, useRef } from 'react';
import { MEDIA_FORMATS } from '../../data/designTemplates';
import heroBrandingImg from '../../assets/hero_branding_art_1789199298688.png';

import EditorToolbar from './EditorToolbar';
import PropertiesPanel from './PropertiesPanel';
import LayersPanel from './LayersPanel';
import ImageFilterPlugin, { FILTER_PRESETS } from './Plugins/ImageFilterPlugin';
import StickerAssetLibrary, { STICKER_TEMPLATES } from './Plugins/StickerAssetLibrary';
import AiVisualGeneratorPlugin from './Plugins/AiVisualGeneratorPlugin';
import CodeExportPlugin from './Plugins/CodeExportPlugin';

import { Sparkles, Upload, Tag, Wand2, Code } from 'lucide-react';

export default function CanvasStudio({ currentDesign, onExport }) {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const fontFileInputRef = useRef(null);

  const [activeFormat, setActiveFormat] = useState(MEDIA_FORMATS[0]);
  const [showBleed, setShowBleed] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [cmykMode, setCmykMode] = useState(false);

  // Interactive Stage & Selection State
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedElement, setSelectedElement] = useState(null);
  const [headlineFontSize, setHeadlineFontSize] = useState(36);

  // Layers Manager State
  const [layers, setLayers] = useState([
    { id: 'layer-bg', name: 'Background Image', type: 'image', visible: true, locked: false, color: '#38BDF8' },
    { id: 'layer-badge', name: 'Badge Tag', type: 'badge', visible: true, locked: false, color: '#00DFD8' },
    { id: 'layer-headline', name: 'Main Headline', type: 'text', visible: true, locked: false, color: '#FF0080' },
    { id: 'layer-sub', name: 'Subtitle & Tagline', type: 'text', visible: true, locked: false, color: '#A855F7' },
    { id: 'layer-stickers', name: 'Vector Stickers Overlay', type: 'sticker', visible: true, locked: false, color: '#10B981' }
  ]);

  const toggleLayerVisibility = (id) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  const toggleLayerLock = (id) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, locked: !l.locked } : l));
  };

  // Feature Plugin States
  const [activePluginTab, setActivePluginTab] = useState('filters');
  const [filterState, setFilterState] = useState(FILTER_PRESETS[0].filters);
  const [activeStickers, setActiveStickers] = useState([]);

  const handleCustomFontFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        if (evt.target?.result) {
          const cleanFontName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "_");
          try {
            const fontFace = new FontFace(cleanFontName, evt.target.result);
            const loadedFace = await fontFace.load();
            document.fonts.add(loadedFace);
            setHeadlineFont(cleanFontName);
          } catch (err) {
            console.error("Failed to load custom font file:", err);
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
    if (e.target) e.target.value = '';
  };

  const handleCustomImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setBgImage(evt.target.result);
          setOverlayOpacity(0.85);
        }
      };
      reader.readAsDataURL(file);
    }
    if (e.target) e.target.value = '';
  };

  // Form State
  const [headline, setHeadline] = useState(currentDesign?.title || "OM GRAPHIC STUDIO");
  const [subtitle, setSubtitle] = useState(currentDesign?.subtitle || "DIGITAL & PRINT CREATIVE SUITE");
  const [tagline, setTagline] = useState(currentDesign?.tagline || "300 DPI PRE-FLIGHT • SWISS GRID ENGINE 2026");
  const [badgeText, setBadgeText] = useState(currentDesign?.badge || "PRO GRAPHIC EDITION");
  const [logoMarkText, setLogoMarkText] = useState("OM GRAPHIC STUDIO");
  const [logoPosition, setLogoPosition] = useState('bottom-right');

  const [headlineFont, setHeadlineFont] = useState(currentDesign?.headlineFont || "Syne");
  const [subFont, setSubFont] = useState(currentDesign?.subFont || "Space Grotesk");
  const [align, setAlign] = useState(currentDesign?.align || "left");

  const [primaryColor, setPrimaryColor] = useState(currentDesign?.primaryColor || "#00DFD8");
  const [secondaryColor, setSecondaryColor] = useState(currentDesign?.secondaryColor || "#FF0080");
  const [bgColor, setBgColor] = useState(currentDesign?.bgColor || "#0A0A0C");
  const [accentColor, setAccentColor] = useState(currentDesign?.accentColor || "#D4AF37");

  const [bgImage, setBgImage] = useState(currentDesign?.backgroundImage || heroBrandingImg);
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

  // Helper layer visibility checks
  const isLayerVisible = (id) => layers.find(l => l.id === id)?.visible !== false;

  return (
    <div style={{ padding: '0 12px 48px' }}>
      
      {/* TOP TOOLBAR */}
      <EditorToolbar
        activeFormat={activeFormat}
        setActiveFormat={setActiveFormat}
        showBleed={showBleed}
        setShowBleed={setShowBleed}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        cmykMode={cmykMode}
        setCmykMode={setCmykMode}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        onExport={onExport}
      />

      <div className="grid-mobile-stack" style={{ display: 'grid', gridTemplateColumns: '360px 1fr 340px', gap: '24px' }}>
        
        {/* LEFT COLUMN: Properties Inspector */}
        <PropertiesPanel
          headline={headline} setHeadline={setHeadline}
          subtitle={subtitle} setSubtitle={setSubtitle}
          tagline={tagline} setTagline={setTagline}
          badgeText={badgeText} setBadgeText={setBadgeText}
          logoMarkText={logoMarkText} setLogoMarkText={setLogoMarkText}
          logoPosition={logoPosition} setLogoPosition={setLogoPosition}
          headlineFont={headlineFont} setHeadlineFont={setHeadlineFont}
          subFont={subFont} setSubFont={setSubFont}
          align={align} setAlign={setAlign}
          headlineFontSize={headlineFontSize} setHeadlineFontSize={setHeadlineFontSize}
          selectedElement={selectedElement} setSelectedElement={setSelectedElement}
          primaryColor={primaryColor} setPrimaryColor={setPrimaryColor}
          secondaryColor={secondaryColor} setSecondaryColor={setSecondaryColor}
          bgColor={bgColor} setBgColor={setBgColor}
          accentColor={accentColor} setAccentColor={setAccentColor}
          applyTemplate={applyTemplate} applyPalette={applyPalette}
          fontFileInputRef={fontFileInputRef}
          handleCustomFontFileUpload={handleCustomFontFileUpload}
        />

        {/* CENTER COLUMN: Interactive Canvas Stage */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          
          {/* THE LIVE GRAPHIC CANVAS STAGE (WITH REAL ZOOM SCALE & ELEMENT SELECTION) */}
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
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease, filter 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              padding: '36px'
            }}
          >
            {/* Background Image Layer */}
            {bgImage && isLayerVisible('layer-bg') && (
              <div style={{
                position: 'absolute',
                inset: '-24px',
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 35%',
                opacity: overlayOpacity,
                filter: `brightness(${filterState.brightness}%) contrast(${filterState.contrast}%) saturate(${filterState.saturate}%) hue-rotate(${filterState.hueRotate}deg) sepia(${filterState.sepia}%) grayscale(${filterState.grayscale}%) invert(${filterState.invert}%) blur(${filterState.blur}px)`,
                pointerEvents: 'none',
                transition: 'filter 0.2s ease'
              }} />
            )}

            {/* Vector Stickers Overlay Layer */}
            {isLayerVisible('layer-stickers') && activeStickers.map((stk) => {
              const tmpl = STICKER_TEMPLATES.find(t => t.id === stk.templateId) || STICKER_TEMPLATES[0];
              const IconComponent = tmpl.icon;
              return (
                <div
                  key={stk.id}
                  style={{
                    position: 'absolute',
                    top: `${stk.top}%`,
                    left: `${stk.left}%`,
                    zIndex: 25,
                    transform: `rotate(${stk.rotation}deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '99px',
                    background: 'rgba(5, 6, 8, 0.85)',
                    border: `1.5px solid ${stk.color}`,
                    color: '#FFF',
                    boxShadow: `0 4px 16px ${stk.color}60`,
                    pointerEvents: 'none'
                  }}
                >
                  <IconComponent style={{ width: '14px', height: '14px', color: stk.color }} />
                  <span style={{ fontSize: '10px', fontWeight: '800', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.5px' }}>
                    {stk.label}
                  </span>
                </div>
              );
            })}

            {/* Bleed Safety Zone Marker */}
            {showBleed && isPrint && (
              <div className="print-safety-guide" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
            )}

            {/* TOP BAR: Badge */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justify: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'
            }}>
              {badgeText && isLayerVisible('layer-badge') && (
                <span
                  onClick={() => setSelectedElement('badge')}
                  className={`font-space canvas-element-selectable ${selectedElement === 'badge' ? 'canvas-element-selected' : ''}`}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    background: primaryColor,
                    color: bgColor,
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '1px',
                    boxShadow: `0 4px 15px ${primaryColor}40`
                  }}
                >
                  {badgeText}
                </span>
              )}
            </div>

            {/* CENTER: Main Headline & Subtitle */}
            <div style={{ position: 'relative', zIndex: 10, textAlign: align, margin: '20px 0' }}>
              {headline && isLayerVisible('layer-headline') && (
                <h2
                  onClick={() => setSelectedElement('headline')}
                  className={`canvas-element-selectable ${selectedElement === 'headline' ? 'canvas-element-selected' : ''}`}
                  style={{
                    fontFamily: `'${headlineFont}', sans-serif, serif`,
                    fontSize: activeFormat.id === 'business-card' ? `${Math.max(16, headlineFontSize - 12)}px` : `${headlineFontSize}px`,
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
              )}

              {subtitle && isLayerVisible('layer-sub') && (
                <p
                  onClick={() => setSelectedElement('subtitle')}
                  className={`canvas-element-selectable ${selectedElement === 'subtitle' ? 'canvas-element-selected' : ''}`}
                  style={{
                    fontFamily: `'${subFont}', sans-serif, serif`,
                    fontSize: activeFormat.id === 'business-card' ? '12px' : '15px',
                    fontWeight: '500',
                    color: secondaryColor,
                    letterSpacing: '0.5px',
                    lineHeight: '1.4'
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>

            {/* FIXED CORNER BRAND LOGO STAMP */}
            {logoMarkText && (
              <div style={{
                position: 'absolute',
                bottom: logoPosition?.startsWith('top') ? 'auto' : '20px',
                top: logoPosition?.startsWith('top') ? '20px' : 'auto',
                right: logoPosition === 'bottom-left' ? 'auto' : '20px',
                left: logoPosition === 'bottom-left' ? '20px' : 'auto',
                zIndex: 35,
                pointerEvents: 'none'
              }}>
                <span className="font-space" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: '800',
                  color: primaryColor,
                  background: 'rgba(5, 6, 8, 0.92)',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: `1.5px solid ${primaryColor}`,
                  boxShadow: `0 4px 18px ${primaryColor}60`,
                  letterSpacing: '1px'
                }}>
                  <Sparkles style={{ width: '12px', height: '12px', color: accentColor }} />
                  {logoMarkText}
                </span>
              </div>
            )}

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
              {tagline && isLayerVisible('layer-sub') && (
                <span className="font-space" style={{ fontSize: '10px', color: secondaryColor, letterSpacing: '0.5px' }}>
                  {tagline}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Layers Manager & Plugin Suite */}
        <div className="glass-panel" style={{ padding: '24px', overflowY: 'auto', maxHeight: '850px' }}>
          
          {/* LAYERS MANAGER */}
          <LayersPanel
            layers={layers}
            toggleLayerVisibility={toggleLayerVisibility}
            toggleLayerLock={toggleLayerLock}
          />

          {/* Photo & Background Uploader */}
          <div style={{ marginBottom: '24px' }}>
            <label className="font-space" style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>
              CUSTOM PHOTO / OVERLAY
            </label>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleCustomImageUpload}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="font-space"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #FF0080 0%, #7928CA 100%)',
                color: '#FFF',
                fontWeight: '800',
                fontSize: '11px',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Upload style={{ width: '14px', height: '14px' }} /> Upload Your Own Photo
            </button>
          </div>

          {/* INTERACTIVE FEATURE PLUGINS PANEL */}
          <div>
            <label className="font-space" style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>
              STUDIO FEATURE PLUGINS
            </label>

            {/* Plugin Navigation Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', marginBottom: '12px', background: 'rgba(0, 0, 0, 0.4)', padding: '4px', borderRadius: '8px' }}>
              <button
                type="button"
                onClick={() => setActivePluginTab('filters')}
                style={{
                  padding: '6px 4px',
                  borderRadius: '6px',
                  background: activePluginTab === 'filters' ? '#00DFD8' : 'transparent',
                  color: activePluginTab === 'filters' ? '#000' : '#94A3B8',
                  fontWeight: '700',
                  fontSize: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Sparkles style={{ width: '12px', height: '12px' }} /> FX
              </button>

              <button
                type="button"
                onClick={() => setActivePluginTab('stickers')}
                style={{
                  padding: '6px 4px',
                  borderRadius: '6px',
                  background: activePluginTab === 'stickers' ? '#FF0080' : 'transparent',
                  color: activePluginTab === 'stickers' ? '#FFF' : '#94A3B8',
                  fontWeight: '700',
                  fontSize: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Tag style={{ width: '12px', height: '12px' }} /> Stickers
              </button>

              <button
                type="button"
                onClick={() => setActivePluginTab('ai')}
                style={{
                  padding: '6px 4px',
                  borderRadius: '6px',
                  background: activePluginTab === 'ai' ? '#38BDF8' : 'transparent',
                  color: activePluginTab === 'ai' ? '#000' : '#94A3B8',
                  fontWeight: '700',
                  fontSize: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Wand2 style={{ width: '12px', height: '12px' }} /> AI
              </button>

              <button
                type="button"
                onClick={() => setActivePluginTab('code')}
                style={{
                  padding: '6px 4px',
                  borderRadius: '6px',
                  background: activePluginTab === 'code' ? '#10B981' : 'transparent',
                  color: activePluginTab === 'code' ? '#000' : '#94A3B8',
                  fontWeight: '700',
                  fontSize: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Code style={{ width: '12px', height: '12px' }} /> Code
              </button>
            </div>

            {/* Active Plugin Content */}
            {activePluginTab === 'filters' && (
              <ImageFilterPlugin
                filterState={filterState}
                setFilterState={setFilterState}
              />
            )}

            {activePluginTab === 'stickers' && (
              <StickerAssetLibrary
                activeStickers={activeStickers}
                setActiveStickers={setActiveStickers}
                primaryColor={primaryColor}
              />
            )}

            {activePluginTab === 'ai' && (
              <AiVisualGeneratorPlugin
                setBgImage={setBgImage}
                setOverlayOpacity={setOverlayOpacity}
                setBgPattern={setBgPattern}
              />
            )}

            {activePluginTab === 'code' && (
              <CodeExportPlugin
                headline={headline}
                subtitle={subtitle}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                bgColor={bgColor}
                activeFormat={activeFormat}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
