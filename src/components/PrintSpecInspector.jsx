import React, { useState } from 'react';
import { PRINT_PAPER_TYPES } from '../data/brandPresets';
import { Printer, ShieldAlert, Cpu, FileText, CheckCircle2, Info, Layers, Package, Maximize, Scissors, Award } from 'lucide-react';

export default function PrintSpecInspector() {
  const [selectedPaper, setSelectedPaper] = useState(PRINT_PAPER_TYPES[0]);
  const [printWidthMm, setPrintWidthMm] = useState(210);
  const [printHeightMm, setPrintHeightMm] = useState(297);
  const [targetDpi, setTargetDpi] = useState(300);

  const PRESET_PRINT_SPECS = [
    { name: "A4 Event Flyer (300 DPI)", width: 210, height: 297, dpi: 300, category: "Poster & Flyer" },
    { name: "Luxury Foil Business Card", width: 85, height: 55, dpi: 300, category: "Business Card" },
    { name: "Tri-Fold Marketing Brochure", width: 297, height: 210, dpi: 300, category: "Brochure" },
    { name: "A1 Exhibition Museum Poster", width: 594, height: 841, dpi: 300, category: "Poster" },
    { name: "Highway Billboard (12m x 3m)", width: 12000, height: 3000, dpi: 150, category: "Wide Format" },
    { name: "Roll-Up Standee Banner", width: 850, height: 2000, dpi: 150, category: "Standee" },
    { name: "Recycled Kraft Packaging Box", width: 180, height: 240, dpi: 300, category: "Packaging" },
    { name: "Hardcover Monograph Book", width: 240, height: 300, dpi: 300, category: "Editorial" },
    { name: "Vinyl Sticker Die-Cut Decal", width: 100, height: 100, dpi: 600, category: "Sticker" },
    { name: "Executive Corporate Letterhead", width: 210, height: 297, dpi: 300, category: "Stationery" },
    { name: "Official C5 Document Envelope", width: 229, height: 162, dpi: 300, category: "Stationery" },
    { name: "Apparel T-Shirt Screen Printing", width: 350, height: 450, dpi: 300, category: "Apparel" },
    { name: "Acrylic Storefront Signboard", width: 1200, height: 600, dpi: 150, category: "Signage" },
    { name: "Metallic Gold Foil Business Card", width: 90, height: 50, dpi: 600, category: "Business Card" },
    { name: "Archival Fine Art Canvas Print", width: 600, height: 900, dpi: 300, category: "Art Print" }
  ];

  const requiredWidthPx = Math.round((printWidthMm / 25.4) * targetDpi);
  const requiredHeightPx = Math.round((printHeightMm / 25.4) * targetDpi);

  const applyPresetSpec = (spec) => {
    setPrintWidthMm(spec.width);
    setPrintHeightMm(spec.height);
    setTargetDpi(spec.dpi);
  };

  return (
    <div style={{ padding: '0 24px 48px' }}>
      <div className="glass-panel" style={{ padding: '32px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h2 className="font-syne" style={{ fontSize: '28px', fontWeight: '800', color: '#FFF' }}>
            Print Pre-flight & 15 Technical Specification Profiles
          </h2>
          <p style={{ fontSize: '14px', color: '#94A3B8' }}>
            Calculate required pixel resolution, bleed boundaries, CMYK color gamut conversion, and offset press finishing specs for 15 print collaterals.
          </p>
        </div>

        {/* 15 Preset Buttons Bar */}
        <div style={{ marginBottom: '32px', background: 'rgba(15, 23, 42, 0.5)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#00DFD8', marginBottom: '12px' }} className="font-space">
            SELECT PRESET PRINT PROFILE (15 SPECIFICATIONS):
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PRESET_PRINT_SPECS.map((spec, idx) => (
              <button
                key={idx}
                onClick={() => applyPresetSpec(spec)}
                style={{
                  padding: '7px 12px',
                  borderRadius: '8px',
                  background: (printWidthMm === spec.width && printHeightMm === spec.height) ? 'linear-gradient(135deg, #00DFD8 0%, #7928CA 100%)' : 'rgba(255, 255, 255, 0.04)',
                  color: '#FFF',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {spec.name}
              </button>
            ))}
          </div>
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

            {/* Calculated Output Display Box */}
            <div style={{ background: '#0F172A', padding: '18px', borderRadius: '12px', border: '1px solid rgba(0, 223, 216, 0.3)' }}>
              <div style={{ fontSize: '12px', color: '#00DFD8', fontWeight: '700', marginBottom: '6px' }}>
                REQUIRED DIGITAL CANVAS PIXEL SIZE:
              </div>
              <div className="font-space" style={{ fontSize: '24px', fontWeight: '800', color: '#FFF' }}>
                {requiredWidthPx.toLocaleString()} x {requiredHeightPx.toLocaleString()} px
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px' }}>
                Calculated at {targetDpi} DPI for offset press output
              </div>
            </div>
          </div>

          {/* RIGHT: Paper Stock & Finishing Specs */}
          <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h3 className="font-syne" style={{ fontSize: '20px', fontWeight: '700', color: '#D4AF37', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer style={{ width: '20px', height: '20px' }} /> Paper Stock & Press Finishing Specs
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Paper Stock Selection</label>
              <select
                value={selectedPaper.name}
                onChange={(e) => {
                  const paper = PRINT_PAPER_TYPES.find(p => p.name === e.target.value);
                  if (paper) setSelectedPaper(paper);
                }}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#111', border: '1px solid #333', color: '#FFF', fontSize: '13px' }}
              >
                {PRINT_PAPER_TYPES.map((paper, idx) => (
                  <option key={idx} value={paper.name}>{paper.name} ({paper.weight})</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '10px', color: '#94A3B8' }}>Finishing Surface</div>
                <div style={{ fontSize: '13px', color: '#FFF', fontWeight: '600' }}>{selectedPaper.finish}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '10px', color: '#94A3B8' }}>Ideal Collateral</div>
                <div style={{ fontSize: '13px', color: '#00DFD8', fontWeight: '600' }}>{selectedPaper.idealFor}</div>
              </div>
            </div>

            <div style={{ background: 'rgba(230, 57, 70, 0.1)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(230, 57, 70, 0.3)' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#E63946', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldAlert style={{ width: '15px', height: '15px' }} /> Bleed & Trim Guidelines:
              </div>
              <div style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: '1.5' }}>
                Maintain a minimum 3mm outer bleed for standard cut jobs, and keep essential text at least 5mm inside the trim line.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
