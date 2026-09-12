import React, { useState } from 'react';
import { Layers, Monitor, CreditCard, Maximize, Check, Sparkles, RefreshCw } from 'lucide-react';
import heroBrandingImg from '../../assets/hero_branding_art_1789199298688.png';

export default function MockupStage({ activeDesign }) {
  const [mockupType, setMockupType] = useState('poster'); // 'poster', 'card', 'mobile', 'billboard'

  const designImage = activeDesign?.image || activeDesign?.backgroundImage || heroBrandingImg;
  const title = activeDesign?.title || "HyperDrive Visual System";

  return (
    <div style={{ padding: '0 24px 48px' }}>
      <div className="glass-panel" style={{ padding: '32px', minHeight: '700px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h2 className="font-syne" style={{ fontSize: '28px', fontWeight: '800', color: '#FFF' }}>
              3D Perspective Mockup Stage
            </h2>
            <p style={{ fontSize: '14px', color: '#94A3B8' }}>
              Preview graphic designs on realistic 3D environments, print materials, and digital devices
            </p>
          </div>

          {/* Switch Mockup Environment */}
          <div className="glass-panel" style={{ display: 'flex', gap: '6px', padding: '6px' }}>
            {[
              { id: 'poster', label: 'Framed Gallery Poster', icon: Layers },
              { id: 'card', label: 'Stacked Business Cards', icon: CreditCard },
              { id: 'mobile', label: 'Mobile Device Screen', icon: Monitor },
              { id: 'billboard', label: 'Urban Billboard', icon: Maximize }
            ].map((m) => {
              const Icon = m.icon;
              const isActive = mockupType === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMockupType(m.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    background: isActive ? 'linear-gradient(135deg, #00DFD8 0%, #7928CA 100%)' : 'transparent',
                    color: isActive ? '#FFF' : '#94A3B8',
                    fontSize: '13px',
                    fontWeight: isActive ? '700' : '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon style={{ width: '15px', height: '15px' }} />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* MOCKUP DISPLAY CANVAS */}
        <div style={{
          flex: 1,
          borderRadius: '16px',
          background: '#07080B',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '520px',
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.8)'
        }}>

          {/* MOCKUP 1: FRAMED GALLERY POSTER WALL */}
          {mockupType === 'poster' && (
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: 'radial-gradient(circle at 50% 20%, #1A1D28 0%, #08090C 80%)'
            }}>
              {/* Spotlight Effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '400px',
                height: '300px',
                background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              {/* Picture Frame */}
              <div style={{
                width: '360px',
                aspectRatio: '1/1.414',
                background: '#111',
                padding: '18px',
                borderRadius: '4px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 0 2px #222, inset 0 0 10px rgba(0,0,0,0.8)',
                position: 'relative',
                transform: 'perspective(1000px) rotateY(-4deg) rotateX(2deg)'
              }}>
                <div style={{ width: '100%', height: '100%', background: '#FFF', padding: '12px', boxShadow: 'inset 0 0 15px rgba(0,0,0,0.1)' }}>
                  <img
                    src={designImage}
                    alt="Mockup Poster"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* MOCKUP 2: STACKED LUXURY BUSINESS CARDS */}
          {mockupType === 'card' && (
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: 'linear-gradient(135deg, #11141D 0%, #050608 100%)'
            }}>
              <div style={{ position: 'relative', width: '420px', height: '260px' }}>
                {/* Underneath stacked card shadow */}
                <div style={{
                  position: 'absolute',
                  width: '360px',
                  height: '210px',
                  background: '#0B2B26',
                  borderRadius: '12px',
                  top: '40px',
                  left: '10px',
                  transform: 'rotate(-8deg)',
                  opacity: 0.6,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.4)'
                }} />

                {/* Main Front Card */}
                <div style={{
                  position: 'absolute',
                  width: '360px',
                  height: '210px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  top: '10px',
                  left: '40px',
                  transform: 'perspective(800px) rotateX(15deg) rotateY(-10deg) rotateZ(3deg)',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.2)',
                  background: '#051614'
                }}>
                  <img
                    src={designImage}
                    alt="Business Card Mockup"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  
                  {/* Metallic Gold Foil Reflection Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, transparent 60%)',
                    mixBlendMode: 'overlay',
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>
            </div>
          )}

          {/* MOCKUP 3: MOBILE DEVICE SCREEN */}
          {mockupType === 'mobile' && (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at 50% 50%, #151924 0%, #07080B 100%)'
            }}>
              {/* Smartphone Frame */}
              <div style={{
                width: '260px',
                height: '520px',
                background: '#1E2330',
                borderRadius: '40px',
                padding: '12px',
                boxShadow: '0 30px 90px rgba(0,0,0,0.9), 0 0 0 3px #33394B',
                position: 'relative'
              }}>
                {/* Notch */}
                <div style={{
                  position: 'absolute',
                  top: '18px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '18px',
                  background: '#000',
                  borderRadius: '10px',
                  zIndex: 20
                }} />

                {/* Phone Display */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '30px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img
                    src={designImage}
                    alt="Mobile Screen Design"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Glass Gloss Reflection */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>
            </div>
          )}

          {/* MOCKUP 4: URBAN BILLBOARD DISPLAY */}
          {mockupType === 'billboard' && (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: 'linear-gradient(to bottom, #0A0C10 0%, #1A1E29 100%)',
              position: 'relative'
            }}>
              {/* Billboard Structure */}
              <div style={{
                width: '90%',
                maxWidth: '640px',
                aspectRatio: '2.5/1',
                background: '#000',
                padding: '14px',
                border: '6px solid #222',
                borderRadius: '8px',
                boxShadow: '0 30px 100px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.8)',
                position: 'relative'
              }}>
                <img
                  src={designImage}
                  alt="Billboard Mockup"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                />

                {/* Top Spotlight Lamps */}
                <div style={{
                  position: 'absolute',
                  top: '-24px',
                  left: '15%',
                  right: '15%',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ width: '16px', height: '16px', background: '#FFD700', borderRadius: '50%', boxShadow: '0 0 20px #FFD700' }} />
                  <div style={{ width: '16px', height: '16px', background: '#FFD700', borderRadius: '50%', boxShadow: '0 0 20px #FFD700' }} />
                  <div style={{ width: '16px', height: '16px', background: '#FFD700', borderRadius: '50%', boxShadow: '0 0 20px #FFD700' }} />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Info Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', padding: '0 8px' }}>
          <div style={{ fontSize: '13px', color: '#94A3B8' }}>
            Active Graphic Work: <strong style={{ color: '#00DFD8' }}>{title}</strong>
          </div>
          <div style={{ fontSize: '12px', color: '#64748B' }}>
            Realistic lighting & surface depth shaders active
          </div>
        </div>

      </div>
    </div>
  );
}
