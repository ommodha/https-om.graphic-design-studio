import React from 'react';
import { Sparkles, Layers, Printer, Monitor, CheckCircle2, ArrowRight, Palette } from 'lucide-react';

export default function HeroSection({ onOpenStudio, onOpenMockup }) {
  return (
    <section style={{ padding: '32px 24px 48px', position: 'relative' }}>
      <div className="glass-panel" style={{ padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
        {/* Background Decorative Glow */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 223, 216, 0.2) 0%, rgba(121, 40, 202, 0.15) 50%, transparent 80%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />

        <div className="grid-mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'center' }}>
          {/* Left Column Text & Controls */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '99px',
              background: 'rgba(0, 223, 216, 0.1)',
              border: '1px solid rgba(0, 223, 216, 0.3)',
              color: '#00DFD8',
              fontSize: '12px',
              fontWeight: '600',
              marginBottom: '20px'
            }}>
              <Sparkles style={{ width: '14px', height: '14px' }} />
              100% Free & Unlimited Digital & Print Graphic Design Studio
            </div>

            <h1 className="font-syne" style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px', letterSpacing: '-1px' }}>
              Craft Creative & Professional <span className="gradient-text-neon">Graphic Designs</span>
            </h1>

            <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: '1.6', marginBottom: '28px', maxWidth: '600px' }}>
              Upload your own photos, customize layout typography, edit colors, preview in 3D, and download high-resolution graphic designs for digital and print media — completely free without restrictions.
            </p>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <button
                onClick={onOpenStudio}
                className="font-space"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #00DFD8 0%, #7928CA 100%)',
                  color: '#FFF',
                  fontWeight: '700',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 30px rgba(0, 223, 216, 0.3)',
                  transition: 'transform 0.2s ease'
                }}
              >
                Launch Studio Editor <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>

              <button
                onClick={onOpenMockup}
                className="font-space"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#F1F5F9',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Layers style={{ width: '16px', height: '16px' }} /> 3D Mockup Stage
              </button>
            </div>

            {/* Feature Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Monitor style={{ width: '20px', height: '20px', color: '#00DFD8' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFF' }}>Digital Media</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>1080p / 4K sRGB</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Printer style={{ width: '20px', height: '20px', color: '#FF0080' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFF' }}>Print Collateral</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>300 DPI / CMYK Bleed</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Palette style={{ width: '20px', height: '20px', color: '#D4AF37' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFF' }}>Brand Identity</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Tokens & Palettes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Visual Artwork Showcase */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
              <img
                src="/assets/hero_branding_art_1789199298688.png"
                alt="Graphic Design Hero Artwork"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />

              {/* Floating Badge Overlay */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                padding: '16px 20px',
                background: 'rgba(10, 10, 14, 0.85)',
                backdropFilter: 'blur(12px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div className="font-syne" style={{ fontSize: '14px', fontWeight: '700', color: '#FFF' }}>
                    HyperDrive Visual System
                  </div>
                  <div style={{ fontSize: '11px', color: '#00DFD8' }}>
                    Digital Banner • Print Poster • 3D Motion Asset
                  </div>
                </div>
                <div style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: 'rgba(0, 223, 216, 0.15)',
                  color: '#00DFD8',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  300 DPI READY
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
