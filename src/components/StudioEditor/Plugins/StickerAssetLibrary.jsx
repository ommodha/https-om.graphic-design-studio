import React from 'react';
import { Tag, ShieldCheck, Award, Flame, Star, Hexagon, Sparkles, Plus, Trash2 } from 'lucide-react';

export const STICKER_TEMPLATES = [
  { id: 'badge-verified', name: 'Verified Pro', icon: ShieldCheck, type: 'badge', defaultColor: '#00DFD8', label: 'OFFICIAL 2026' },
  { id: 'badge-award', name: 'Gold Award', icon: Award, type: 'badge', defaultColor: '#FFD700', label: 'PREMIUM QUALITY' },
  { id: 'badge-hot', name: 'Trending Flame', icon: Flame, type: 'badge', defaultColor: '#FF0080', label: 'TOP TRENDING' },
  { id: 'badge-star', name: '5-Star Quality', icon: Star, type: 'badge', defaultColor: '#A855F7', label: 'SWISS CERTIFIED' },
  { id: 'badge-cyber', name: 'Cyber Badge', icon: Hexagon, type: 'badge', defaultColor: '#38BDF8', label: 'PRO EDITION' },
  { id: 'badge-sparkle', name: 'Creative Spark', icon: Sparkles, type: 'badge', defaultColor: '#D4AF37', label: 'ULTRA HD 300DPI' }
];

export default function StickerAssetLibrary({ activeStickers, setActiveStickers, primaryColor }) {
  const addSticker = (template) => {
    const timestamp = Date.now();
    const randomSeed = Math.random().toString(36).substr(2, 4);
    const topPos = 15 + Math.floor(Math.random() * 50);
    const leftPos = 15 + Math.floor(Math.random() * 50);
    const rot = Math.floor(Math.random() * 20) - 10;

    const newSticker = {
      id: `sticker-${timestamp}-${randomSeed}`,
      templateId: template.id,
      label: template.label,
      color: template.defaultColor || primaryColor,
      top: topPos,
      left: leftPos,
      scale: 1,
      rotation: rot
    };
    setActiveStickers(prev => [...prev, newSticker]);
  };

  const removeSticker = (id) => {
    setActiveStickers(prev => prev.filter(s => s.id !== id));
  };

  const updateStickerColor = (id, color) => {
    setActiveStickers(prev => prev.map(s => s.id === id ? { ...s, color } : s));
  };

  const updateStickerPos = (id, key, val) => {
    setActiveStickers(prev => prev.map(s => s.id === id ? { ...s, [key]: Number(val) } : s));
  };

  return (
    <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag style={{ width: '16px', height: '16px', color: '#FF0080' }} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#F8FAFC', fontFamily: 'Space Grotesk, sans-serif' }}>
            VECTOR STICKERS & BADGES
          </span>
        </div>
        <span style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'monospace' }}>
          {activeStickers.length} Active
        </span>
      </div>

      {/* Available Stickers Grid */}
      <div style={{ marginBottom: '16px' }}>
        <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
          CLICK TO ADD TO CANVAS
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {STICKER_TEMPLATES.map((stk) => {
            const IconComponent = stk.icon;
            return (
              <button
                key={stk.id}
                onClick={() => addSticker(stk)}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: '600',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = stk.defaultColor;
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ padding: '6px', borderRadius: '6px', background: `${stk.defaultColor}22`, color: stk.defaultColor }}>
                  <IconComponent style={{ width: '14px', height: '14px' }} />
                </div>
                <div style={{ textTransform: 'none', textAlign: 'left', flex: 1 }}>
                  <div>{stk.name}</div>
                  <div style={{ fontSize: '9px', color: '#64748B' }}>{stk.label}</div>
                </div>
                <Plus style={{ width: '12px', height: '12px', color: '#94A3B8' }} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stickers Manager & Pos Controls */}
      {activeStickers.length > 0 && (
        <div>
          <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
            MANAGE & POSITION CANVAS STICKERS
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
            {activeStickers.map((item) => {
              const tmpl = STICKER_TEMPLATES.find(t => t.id === item.templateId) || STICKER_TEMPLATES[0];
              const IconComp = tmpl.icon;
              return (
                <div
                  key={item.id}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '11px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IconComp style={{ width: '13px', height: '13px', color: item.color }} />
                      <span style={{ color: '#E2E8F0', fontWeight: '600' }}>{tmpl.name}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="color"
                        value={item.color}
                        onChange={(e) => updateStickerColor(item.id, e.target.value)}
                        style={{ width: '20px', height: '20px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                        title="Change Color"
                      />
                      <button
                        onClick={() => removeSticker(item.id)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '2px' }}
                        title="Remove Sticker"
                      >
                        <Trash2 style={{ width: '13px', height: '13px' }} />
                      </button>
                    </div>
                  </div>

                  {/* Position Sliders */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <div style={{ fontSize: '9px', color: '#64748B', marginBottom: '2px' }}>Position X ({item.left}%)</div>
                      <input
                        type="range"
                        min="5"
                        max="85"
                        value={item.left}
                        onChange={(e) => updateStickerPos(item.id, 'left', e.target.value)}
                        style={{ width: '100%', accentColor: item.color }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', color: '#64748B', marginBottom: '2px' }}>Position Y ({item.top}%)</div>
                      <input
                        type="range"
                        min="5"
                        max="85"
                        value={item.top}
                        onChange={(e) => updateStickerPos(item.id, 'top', e.target.value)}
                        style={{ width: '100%', accentColor: item.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
