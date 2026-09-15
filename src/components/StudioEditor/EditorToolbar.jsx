import React, { useState } from 'react';
import { MEDIA_FORMATS } from '../../data/designTemplates';
import { Download, ZoomIn, ZoomOut, Maximize2, Bookmark, Check, ArrowLeft } from 'lucide-react';

export default function EditorToolbar({
  onBack,
  activeFormat,
  setActiveFormat,
  showBleed,
  setShowBleed,
  showGrid,
  setShowGrid,
  cmykMode,
  setCmykMode,
  zoomLevel,
  setZoomLevel,
  onExport,
  onSaveAsMyTemplate
}) {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const isPrint = activeFormat.category === 'print';

  const handleSaveClick = () => {
    if (onSaveAsMyTemplate) {
      onSaveAsMyTemplate();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="glass-panel font-space" style={{
      width: '100%',
      padding: '12px 20px',
      borderRadius: '12px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      background: 'rgba(15, 23, 42, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.12)'
    }}>
      {/* Left Group: Back Button & Active Format Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {onBack && (
          <button
            onClick={onBack}
            title="Back to Templates / Dashboard (પાછા જાઓ)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(0, 223, 216, 0.15)',
              border: '1px solid rgba(0, 223, 216, 0.4)',
              color: '#00DFD8',
              fontWeight: '700',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft style={{ width: '14px', height: '14px' }} /> ← Back
          </button>
        )}

        <select
          value={activeFormat.id}
          onChange={(e) => {
            const fmt = MEDIA_FORMATS.find(m => m.id === e.target.value);
            if (fmt) setActiveFormat(fmt);
          }}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(0, 223, 216, 0.4)',
            color: '#FFF',
            fontSize: '13px',
            fontWeight: '700',
            outline: 'none',
            cursor: 'pointer'
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

        <span style={{
          fontSize: '11px',
          padding: '4px 10px',
          borderRadius: '6px',
          background: isPrint ? 'rgba(230, 57, 70, 0.2)' : 'rgba(0, 223, 216, 0.2)',
          color: isPrint ? '#E63946' : '#00DFD8',
          fontWeight: '700',
          border: isPrint ? '1px solid rgba(230, 57, 70, 0.4)' : '1px solid rgba(0, 223, 216, 0.4)'
        }}>
          {isPrint ? 'OFFSET PRINT (300 DPI)' : 'DIGITAL SCREEN'}
        </span>
      </div>

      {/* Center Group: Canvas Zoom & Toggles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        {/* Canvas Zoom Engine */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0, 0, 0, 0.5)', padding: '4px 8px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.15))}
            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
            title="Zoom Out"
          >
            <ZoomOut style={{ width: '13px', height: '13px' }} />
          </button>

          <span style={{ fontSize: '11px', fontWeight: '700', color: '#00DFD8', minWidth: '40px', textAlign: 'center', fontFamily: 'monospace' }}>
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.min(1.5, prev + 0.15))}
            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
            title="Zoom In"
          >
            <ZoomIn style={{ width: '13px', height: '13px' }} />
          </button>

          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', marginLeft: '4px' }}
            title="Reset Zoom (100%)"
          >
            <Maximize2 style={{ width: '12px', height: '12px' }} />
          </button>
        </div>

        {/* Guides Toggles */}
        {isPrint && (
          <>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#CBD5E1', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={showBleed}
                onChange={(e) => setShowBleed(e.target.checked)}
                style={{ accentColor: '#E63946' }}
              />
              Bleed (3mm)
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#CBD5E1', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={cmykMode}
                onChange={(e) => setCmykMode(e.target.checked)}
                style={{ accentColor: '#D4AF37' }}
              />
              CMYK Sim
            </label>
          </>
        )}

        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#CBD5E1', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
            style={{ accentColor: '#00DFD8' }}
          />
          Swiss Grid
        </label>
      </div>

      {/* Right Group: Save to My Templates & Quick Export Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={handleSaveClick}
          title="Save as My Template (મારા ટેમ્પલેટ્સમાં સેવ કરો)"
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            background: savedSuccess ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 0, 128, 0.15)',
            border: savedSuccess ? '1px solid #10B981' : '1px solid rgba(255, 0, 128, 0.4)',
            color: savedSuccess ? '#10B981' : '#FF0080',
            fontWeight: '700',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}
        >
          {savedSuccess ? <Check style={{ width: '14px', height: '14px' }} /> : <Bookmark style={{ width: '14px', height: '14px' }} />}
          {savedSuccess ? 'Saved to My Templates!' : 'Save to My Templates'}
        </button>

        <button
          onClick={() => onExport('png')}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #00DFD8 0%, #0066FF 100%)',
            color: '#000',
            fontWeight: '800',
            fontSize: '12px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 14px rgba(0, 223, 216, 0.3)'
          }}
        >
          <Download style={{ width: '14px', height: '14px' }} /> Quick Export
        </button>
      </div>
    </div>
  );
}

