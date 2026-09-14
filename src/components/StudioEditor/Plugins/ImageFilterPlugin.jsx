import React from 'react';
import { Sparkles, Sun, Contrast, Palette, RefreshCw, Zap } from 'lucide-react';

export const FILTER_PRESETS = [
  {
    id: 'normal',
    name: 'Normal (Clean)',
    filters: { brightness: 100, contrast: 100, saturate: 100, hueRotate: 0, sepia: 0, grayscale: 0, invert: 0, blur: 0 }
  },
  {
    id: 'cyberpunk',
    name: 'Neon Cyberpunk',
    filters: { brightness: 110, contrast: 140, saturate: 180, hueRotate: 290, sepia: 0, grayscale: 0, invert: 0, blur: 0 }
  },
  {
    id: 'vintage',
    name: 'Vintage Film',
    filters: { brightness: 95, contrast: 115, saturate: 85, hueRotate: 15, sepia: 40, grayscale: 0, invert: 0, blur: 0 }
  },
  {
    id: 'noir',
    name: 'High-Contrast Noir',
    filters: { brightness: 105, contrast: 160, saturate: 0, hueRotate: 0, sepia: 0, grayscale: 100, invert: 0, blur: 0 }
  },
  {
    id: 'golden',
    name: 'Golden Hour Glow',
    filters: { brightness: 108, contrast: 110, saturate: 135, hueRotate: 25, sepia: 25, grayscale: 0, invert: 0, blur: 0 }
  },
  {
    id: 'glitch-invert',
    name: 'Cyber Invert Glitch',
    filters: { brightness: 120, contrast: 150, saturate: 200, hueRotate: 180, sepia: 0, grayscale: 0, invert: 80, blur: 0 }
  }
];

export default function ImageFilterPlugin({ filterState, setFilterState }) {
  const handleChange = (key, value) => {
    setFilterState(prev => ({
      ...prev,
      [key]: Number(value)
    }));
  };

  const applyPreset = (preset) => {
    setFilterState(preset.filters);
  };

  const resetFilters = () => {
    setFilterState(FILTER_PRESETS[0].filters);
  };

  return (
    <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles style={{ width: '16px', height: '16px', color: '#00DFD8' }} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#F8FAFC', fontFamily: 'Space Grotesk, sans-serif' }}>
            IMAGE FILTER & FX PIPELINE
          </span>
        </div>
        <button
          onClick={resetFilters}
          title="Reset to default"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            color: '#94A3B8',
            padding: '4px 8px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
        >
          <RefreshCw style={{ width: '12px', height: '12px' }} />
          Reset
        </button>
      </div>

      {/* Quick Filter Presets */}
      <div style={{ marginBottom: '16px' }}>
        <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
          FILTER PRESETS
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          {FILTER_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p)}
              style={{
                padding: '6px 8px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#CBD5E1',
                fontSize: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00DFD8';
                e.currentTarget.style.color = '#FFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#CBD5E1';
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Manual Sliders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Contrast */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#CBD5E1', marginBottom: '4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Contrast style={{ width: '12px', height: '12px', color: '#00DFD8' }} /> Contrast
            </span>
            <span style={{ fontFamily: 'monospace' }}>{filterState.contrast}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="200"
            value={filterState.contrast}
            onChange={(e) => handleChange('contrast', e.target.value)}
            style={{ width: '100%', accentColor: '#00DFD8' }}
          />
        </div>

        {/* Brightness */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#CBD5E1', marginBottom: '4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sun style={{ width: '12px', height: '12px', color: '#FFD700' }} /> Brightness
            </span>
            <span style={{ fontFamily: 'monospace' }}>{filterState.brightness}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="180"
            value={filterState.brightness}
            onChange={(e) => handleChange('brightness', e.target.value)}
            style={{ width: '100%', accentColor: '#FFD700' }}
          />
        </div>

        {/* Saturation */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#CBD5E1', marginBottom: '4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Palette style={{ width: '12px', height: '12px', color: '#FF0080' }} /> Saturation
            </span>
            <span style={{ fontFamily: 'monospace' }}>{filterState.saturate}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="250"
            value={filterState.saturate}
            onChange={(e) => handleChange('saturate', e.target.value)}
            style={{ width: '100%', accentColor: '#FF0080' }}
          />
        </div>

        {/* Hue Rotate */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#CBD5E1', marginBottom: '4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Zap style={{ width: '12px', height: '12px', color: '#A855F7' }} /> Hue Shift
            </span>
            <span style={{ fontFamily: 'monospace' }}>{filterState.hueRotate}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={filterState.hueRotate}
            onChange={(e) => handleChange('hueRotate', e.target.value)}
            style={{ width: '100%', accentColor: '#A855F7' }}
          />
        </div>

        {/* Sepia & Grayscale */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94A3B8', marginBottom: '4px' }}>
              <span>Sepia</span>
              <span style={{ fontFamily: 'monospace' }}>{filterState.sepia}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={filterState.sepia}
              onChange={(e) => handleChange('sepia', e.target.value)}
              style={{ width: '100%', accentColor: '#D4AF37' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94A3B8', marginBottom: '4px' }}>
              <span>Grayscale</span>
              <span style={{ fontFamily: 'monospace' }}>{filterState.grayscale}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={filterState.grayscale}
              onChange={(e) => handleChange('grayscale', e.target.value)}
              style={{ width: '100%', accentColor: '#64748B' }}
            />
          </div>
        </div>

        {/* Blur & Invert */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94A3B8', marginBottom: '4px' }}>
              <span>Soft Blur</span>
              <span style={{ fontFamily: 'monospace' }}>{filterState.blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={filterState.blur}
              onChange={(e) => handleChange('blur', e.target.value)}
              style={{ width: '100%', accentColor: '#38BDF8' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94A3B8', marginBottom: '4px' }}>
              <span>Color Invert</span>
              <span style={{ fontFamily: 'monospace' }}>{filterState.invert}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={filterState.invert}
              onChange={(e) => handleChange('invert', e.target.value)}
              style={{ width: '100%', accentColor: '#EC4899' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
