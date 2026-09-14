import React from 'react';
import { MEDIA_FORMATS } from '../../data/designTemplates';
import { Plus, Monitor, Printer, ArrowRight } from 'lucide-react';

export default function QuickCreate({ onSelectFormat }) {
  const popularFormats = MEDIA_FORMATS.slice(0, 6);

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h3 className="font-syne" style={{ fontSize: '18px', fontWeight: '700', color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus style={{ width: '18px', height: '18px', color: '#00DFD8' }} /> QUICK CREATE DESIGN
        </h3>
        <span style={{ fontSize: '12px', color: '#94A3B8' }}>Select preset canvas dimensions</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
        {popularFormats.map((fmt) => {
          const isPrint = fmt.category === 'print';
          return (
            <button
              key={fmt.id}
              onClick={() => onSelectFormat(fmt)}
              className="glass-panel font-space"
              style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#FFF',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                height: '110px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00DFD8';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'rgba(0, 223, 216, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: isPrint ? 'rgba(230, 57, 70, 0.15)' : 'rgba(0, 223, 216, 0.15)',
                  color: isPrint ? '#E63946' : '#00DFD8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isPrint ? <Printer style={{ width: '16px', height: '16px' }} /> : <Monitor style={{ width: '16px', height: '16px' }} />}
                </div>
                <ArrowRight style={{ width: '14px', height: '14px', color: '#64748B' }} />
              </div>

              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#F8FAFC' }}>{fmt.name}</div>
                <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>{fmt.displaySize}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
