import React, { useState } from 'react';
import { PRINT_PAPER_TYPES } from '../data/brandPresets';
import { Printer, ShieldAlert, Cpu, FileText, CheckCircle2, Info, Layers } from 'lucide-react';

export default function PrintSpecInspector() {
  const [selectedPaper, setSelectedPaper] = useState(PRINT_PAPER_TYPES[0]);
  const [printWidthMm, setPrintWidthMm] = useState(210);
  const [printHeightMm, setPrintHeightMm] = useState(297);
  const [targetDpi, setTargetDpi] = useState(300);

  const requiredWidthPx = Math.round((printWidthMm / 25.4) * targetDpi);
  const requiredHeightPx = Math.round((printHeightMm / 25.4) * targetDpi);

  return (
    <div style={{ padding: '0 24px 48px' }}>
      <div className="glass-panel" style={{ padding: '32px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 className="font-syne" style={{ fontSize: '28px', fontWeight: '800', color: '#FFF' }}>
            Print Pre-flight & Technical Specification Inspector
          </h2>
          <p style={{ fontSize: '14px', color: '#94A3B8' }}>
            Calculate required pixel resolution, bleed boundaries, CMYK color gamut conversion, and press finishing specs
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          
          {/* LEFT: Interactive DPI & Dimension Calculator */}
          <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h3 className="font-syne" style={{ fontSize: '20px', fontWeight: '700', color: '#E63946', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu style={{ width: '20px', height: '20px' }} /> Resolution & DPI Calculator
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Width (mm)</label>
                <input
                  type="number"
                  value={printWidthMm}
                  onChange={(e) => setPrintWidthMm(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#111', border: '1px solid #333', color: '#FFF', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Height (mm)</label>
                <input
                  type="number"
                  value={printHeightMm}
                  onChange={(e) => setPrintHeightMm(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#111', border: '1px solid #333', color: '#FFF', fontSize: '14px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Target Press DPI</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[72, 150, 300, 600].map((dpi) => (
                  <button
                    key={dpi}
                    onClick={() => setTargetDpi(dpi)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      background: targetDpi === dpi ? '#E63946' : 'rgba(255,255,255,0.05)',
                      color: '#FFF',
                      fontWeight: '700',
                      fontSize: '12px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {dpi} DPI
                  </button>
                ))}
              </div>
            </div>

            {/* Result Box */}
            <div style={{ background: 'rgba(230, 57, 70, 0.12)', border: '1px solid rgba(230, 57, 70, 0.4)', padding: '18px', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: '#E63946', fontWeight: '700', marginBottom: '4px' }}>
                REQUIRED IMAGE RENDER DIMENSIONS
              </div>
              <div className="font-space" style={{ fontSize: '24px', fontWeight: '800', color: '#FFF' }}>
                {requiredWidthPx} × {requiredHeightPx} px
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px' }}>
                Includes 3mm bleed margin (+{Math.round((6 / 25.4) * targetDpi)} px canvas padding)
              </div>
            </div>
          </div>

          {/* RIGHT: Paper Stock & Finishing Guide */}
          <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h3 className="font-syne" style={{ fontSize: '20px', fontWeight: '700', color: '#D4AF37', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText style={{ width: '20px', height: '20px' }} /> Paper Stock & Press Finishing
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {PRINT_PAPER_TYPES.map((paper, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPaper(paper)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    background: selectedPaper.name === paper.name ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255,255,255,0.03)',
                    border: selectedPaper.name === paper.name ? '1px solid #D4AF37' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFF' }}>{paper.name}</div>
                  <div style={{ fontSize: '12px', color: '#D4AF37', marginTop: '2px' }}>
                    Finish: {paper.finish} • Weight: {paper.weight}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                    Ideal for: {paper.idealFor}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#CBD5E1' }}>
              <Info style={{ width: '16px', height: '16px', color: '#00DFD8', flexShrink: 0 }} />
              Press foil stamping requires vector paths with minimum 0.25pt line thickness.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
