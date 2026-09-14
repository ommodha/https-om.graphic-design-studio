import React from 'react';
import { Layers, Eye, EyeOff, Lock, Unlock, Type, ImageIcon, Tag, Sparkles } from 'lucide-react';

export default function LayersPanel({
  layers,
  toggleLayerVisibility,
  toggleLayerLock
}) {
  return (
    <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers style={{ width: '16px', height: '16px', color: '#00DFD8' }} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#F8FAFC', fontFamily: 'Space Grotesk, sans-serif' }}>
            CANVAS LAYERS MANAGER
          </span>
        </div>
        <span style={{ fontSize: '10px', background: 'rgba(0, 223, 216, 0.15)', color: '#00DFD8', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(0, 223, 216, 0.3)', fontWeight: '700' }}>
          {layers.length} LAYERS
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {layers.map((layer) => {
          let IconComponent = Type;
          if (layer.type === 'image') IconComponent = ImageIcon;
          if (layer.type === 'sticker') IconComponent = Tag;
          if (layer.type === 'badge') IconComponent = Sparkles;

          return (
            <div
              key={layer.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                padding: '8px 10px',
                borderRadius: '8px',
                background: layer.visible ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                opacity: layer.visible ? 1 : 0.5,
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.06)', color: layer.color || '#00DFD8' }}>
                  <IconComponent style={{ width: '13px', height: '13px' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#E2E8F0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {layer.name}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => toggleLayerLock(layer.id)}
                  style={{ background: 'none', border: 'none', color: layer.locked ? '#FF0080' : '#64748B', cursor: 'pointer', padding: '2px' }}
                  title={layer.locked ? 'Unlock Layer' : 'Lock Layer'}
                >
                  {layer.locked ? <Lock style={{ width: '13px', height: '13px' }} /> : <Unlock style={{ width: '13px', height: '13px' }} />}
                </button>

                <button
                  type="button"
                  onClick={() => toggleLayerVisibility(layer.id)}
                  style={{ background: 'none', border: 'none', color: layer.visible ? '#00DFD8' : '#64748B', cursor: 'pointer', padding: '2px' }}
                  title={layer.visible ? 'Hide Layer' : 'Show Layer'}
                >
                  {layer.visible ? <Eye style={{ width: '13px', height: '13px' }} /> : <EyeOff style={{ width: '13px', height: '13px' }} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
