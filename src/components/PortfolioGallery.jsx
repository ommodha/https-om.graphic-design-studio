import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/portfolioItems';
import { Filter, Eye, Edit3, Printer, Monitor, Palette, Sparkles, Check, ArrowUpRight, X, Download } from 'lucide-react';

export default function PortfolioGallery({ onSelectDesignForEditor, onSelectForMockup }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDirectDownload = (imageSrc, title) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-design.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredItems = PORTFOLIO_ITEMS.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section style={{ padding: '0 24px 48px' }}>
      {/* Category Filter Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h2 className="font-syne" style={{ fontSize: '28px', fontWeight: '800', color: '#FFF' }}>
            Graphic Design Showcase
          </h2>
          <p style={{ fontSize: '14px', color: '#94A3B8' }}>
            Curated high-resolution digital assets & offset print design collateral
          </p>
        </div>

        <div className="glass-panel" style={{ display: 'flex', gap: '6px', padding: '6px' }}>
          {[
            { id: 'all', label: 'All Projects', icon: Sparkles },
            { id: 'print', label: 'Print Collateral', icon: Printer },
            { id: 'digital', label: 'Digital Media', icon: Monitor },
            { id: 'brand', label: 'Brand Identity', icon: Palette }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  background: isActive ? 'linear-gradient(135deg, #00DFD8 0%, #0066FF 100%)' : 'transparent',
                  color: isActive ? '#000' : '#94A3B8',
                  fontSize: '13px',
                  fontWeight: isActive ? '700' : '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon style={{ width: '14px', height: '14px' }} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Graphic Design Projects */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-panel glass-panel-hover"
            style={{ overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            onClick={() => setSelectedItem(item)}
          >
            {/* Image Preview Container */}
            <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: '#0A0A0E' }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              />

              {/* Top Tags Overlay */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: item.category === 'print' ? 'rgba(230, 57, 70, 0.9)' : 'rgba(0, 223, 216, 0.9)',
                  color: '#FFF',
                  fontSize: '10px',
                  fontWeight: '800',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  {item.category === 'print' ? 'PRINT MEDIA (300 DPI)' : 'DIGITAL MEDIA'}
                </span>

                <span style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFF',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  {item.year}
                </span>
              </div>

              {/* Hover Quick Action Buttons */}
              <div className="hover-overlay" style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(10, 10, 15, 0.75)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                padding: '16px',
                opacity: 0,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#FFF',
                    color: '#000',
                    fontWeight: '700',
                    fontSize: '12px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Eye style={{ width: '14px', height: '14px' }} /> Inspect Specs
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDirectDownload(item.image, item.title);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #FF0080 0%, #7928CA 100%)',
                    color: '#FFF',
                    fontWeight: '700',
                    fontSize: '12px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Download style={{ width: '14px', height: '14px' }} /> Download Pic
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDesignForEditor(item);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#00DFD8',
                    color: '#000',
                    fontWeight: '700',
                    fontSize: '12px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Edit3 style={{ width: '14px', height: '14px' }} /> Edit in Studio
                </button>
              </div>
            </div>

            {/* Content Details */}
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#00DFD8', fontWeight: '600', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {item.subCategory}
                </div>
                <h3 className="font-syne" style={{ fontSize: '18px', fontWeight: '700', color: '#FFF', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5', marginBottom: '16px' }}>
                  {item.description}
                </p>
              </div>

              {/* Color Swatch Bar */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Color Palette Tokens</div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {item.colors.map((c, i) => (
                      <span key={i} style={{ width: '14px', height: '14px', borderRadius: '50%', background: c, border: '1px solid rgba(255,255,255,0.2)' }} title={c} />
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {item.tags.map((t, idx) => (
                    <span key={idx} style={{
                      fontSize: '10px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: '#CBD5E1'
                    }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup for Project Specification Details */}
      {selectedItem && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedItem(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#FFF',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>

            <div className="grid-mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
              <div>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  style={{ width: '100%', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}
                />
              </div>

              <div>
                <span style={{ fontSize: '11px', color: '#00DFD8', fontWeight: '700', textTransform: 'uppercase' }}>
                  {selectedItem.subCategory}
                </span>
                <h2 className="font-syne" style={{ fontSize: '26px', fontWeight: '800', color: '#FFF', marginTop: '4px', marginBottom: '12px' }}>
                  {selectedItem.title}
                </h2>

                <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.6', marginBottom: '20px' }}>
                  {selectedItem.description}
                </p>

                {/* Print & Technical Specs */}
                <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                  <h4 className="font-space" style={{ fontSize: '13px', fontWeight: '700', color: '#00DFD8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Printer style={{ width: '14px', height: '14px' }} /> Technical & Print Specifications
                  </h4>

                  {selectedItem.printSpecs.paperStock && (
                    <div style={{ fontSize: '12px', color: '#CBD5E1', marginBottom: '6px' }}>
                      <strong>Paper Stock:</strong> {selectedItem.printSpecs.paperStock}
                    </div>
                  )}
                  {selectedItem.printSpecs.finishing && (
                    <div style={{ fontSize: '12px', color: '#CBD5E1', marginBottom: '6px' }}>
                      <strong>Finishing:</strong> {selectedItem.printSpecs.finishing}
                    </div>
                  )}
                  <div style={{ fontSize: '12px', color: '#CBD5E1', marginBottom: '6px' }}>
                    <strong>Dimensions:</strong> {selectedItem.printSpecs.dimensions || selectedItem.printSpecs.resolution}
                  </div>
                  <div style={{ fontSize: '12px', color: '#CBD5E1' }}>
                    <strong>Color Profile:</strong> {selectedItem.printSpecs.colorSpace}
                  </div>
                </div>

                {/* Typography specs */}
                <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '16px', borderRadius: '10px', marginBottom: '24px' }}>
                  <h4 className="font-space" style={{ fontSize: '13px', fontWeight: '700', color: '#FF0080', marginBottom: '10px' }}>
                    Typography Hierarchy
                  </h4>
                  <div style={{ fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    Primary: <strong>{selectedItem.typography.primary}</strong>
                  </div>
                  <div style={{ fontSize: '12px', color: '#CBD5E1' }}>
                    Secondary: <strong>{selectedItem.typography.secondary}</strong>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => handleDirectDownload(selectedItem.image, selectedItem.title)}
                    className="font-space"
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #FF0080 0%, #7928CA 100%)',
                      color: '#FFF',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Download style={{ width: '16px', height: '16px' }} /> Download Graphic Pic
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectDesignForEditor(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="font-space"
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #00DFD8 0%, #0066FF 100%)',
                      color: '#000',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Edit Template in Studio
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectForMockup(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="font-space"
                    style={{
                      padding: '12px 20px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFF',
                      fontWeight: '600',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer'
                    }}
                  >
                    View in 3D
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
