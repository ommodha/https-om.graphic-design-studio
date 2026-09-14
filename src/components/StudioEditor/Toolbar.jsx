import React from 'react';
import { MEDIA_FORMATS } from '../../data/designTemplates';
import { Sliders, Download, Eye, Grid, Printer, FileText } from 'lucide-react';

export default function Toolbar({
  activeFormat,
  setActiveFormat,
  showBleed,
  setShowBleed,
  showGrid,
  setShowGrid,
  cmykMode,
  setCmykMode,
  onExport
}) {
  const isPrint = activeFormat.category === 'print';

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
      {/* Left Group: Active Format & Category Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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

      {/* Center Group: Print & Grid Toggles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {isPrint && (
          <>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#CBD5E1', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={showBleed}
                onChange={(e) => setShowBleed(e.target.checked)}
                style={{ accentColor: '#E63946' }}
              />
              Bleed Guide (3mm)
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#CBD5E1', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={cmykMode}
                onChange={(e) => setCmykMode(e.target.checked)}
                style={{ accentColor: '#D4AF37' }}
              />
              CMYK Simulator
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
          Swiss Baseline Grid
        </label>
      </div>

      {/* Right Group: Quick Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
