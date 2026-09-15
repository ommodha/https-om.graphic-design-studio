import React, { useState, useRef } from 'react';
import { Layers, Monitor, CreditCard, Maximize, Check, Sparkles, RefreshCw, BookOpen, Coffee, Shirt, Store, FileText, Tv, Box, Disc, ArrowLeft, Upload, Plus, Download, Bookmark, Sun, Moon, Zap, Image as ImageIcon } from 'lucide-react';
import heroBrandingImg from '../../assets/hero_branding_art_1789199298688.png';

const MOCKUP_STORAGE_KEY = 'om_graphic_studio_my_mockups';

export default function MockupStage({ onBack, activeDesign }) {
  const fileInputRef = useRef(null);
  const [mockupType, setMockupType] = useState('poster');
  const [customImage, setCustomImage] = useState(null);
  const [lightingMood, setLightingMood] = useState('cyber'); // 'cyber', 'gold', 'studio', 'neon'
  const [watermarkText, setWatermarkText] = useState('OM GRAPHIC STUDIO • 3D PREVIEW');
  const [savedMockups, setSavedMockups] = useState(() => {
    try {
      const data = localStorage.getItem(MOCKUP_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  const [toastMsg, setToastMsg] = useState('');

  const showNotification = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const designImage = customImage || activeDesign?.image || activeDesign?.backgroundImage || heroBrandingImg;
  const title = activeDesign?.title || "HyperDrive Visual System";

  const MOCKUP_PRESETS = [
    { id: 'poster', label: 'Gallery Wall Poster', icon: Layers },
    { id: 'card', label: 'Stacked Business Cards', icon: CreditCard },
    { id: 'mobile', label: 'Mobile Device Screen', icon: Monitor },
    { id: 'billboard', label: 'Urban Billboard', icon: Maximize },
    { id: 'book', label: 'Hardcover Monograph', icon: BookOpen },
    { id: 'coffee', label: 'Artisan Coffee Cup', icon: Coffee },
    { id: 'tshirt', label: 'Apparel T-Shirt', icon: Shirt },
    { id: 'storefront', label: 'Storefront Window', icon: Store },
    { id: 'brochure', label: 'Tri-Fold Brochure', icon: FileText },
    { id: 'signboard', label: 'Acrylic Neon Sign', icon: Sparkles },
    { id: 'mug', label: 'Travel Steel Tumbler', icon: Coffee },
    { id: 'magazine', label: 'Magazine Spread', icon: BookOpen },
    { id: 'can', label: 'Soda / Beverage Can', icon: Disc },
    { id: 'desktop', label: 'Desktop Workstation', icon: Tv },
    { id: 'box', label: 'Luxury Gift Box', icon: Box }
  ];

  const handleCustomImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setCustomImage(evt.target.result);
          showNotification('Custom graphic added to 3D Mockup stage!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveToMyMockups = () => {
    const newMockup = {
      id: `mockup-${Date.now()}`,
      title: `${mockupType.toUpperCase()} - ${title}`,
      mockupType,
      image: designImage,
      lightingMood,
      watermarkText,
      createdAt: new Date().toLocaleDateString()
    };
    const updated = [newMockup, ...savedMockups];
    setSavedMockups(updated);
    try {
      localStorage.setItem(MOCKUP_STORAGE_KEY, JSON.stringify(updated));
      showNotification('3D Mockup saved to My Saved Mockups!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadMockupImage = () => {
    const link = document.createElement('a');
    link.href = designImage;
    link.download = `3d-${mockupType}-mockup.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('3D Mockup snapshot downloaded!');
  };

  // Lighting Background Styles
  const getLightingBackground = () => {
    switch (lightingMood) {
      case 'gold':
        return 'radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.25) 0%, #0D0C0A 80%)';
      case 'studio':
        return 'radial-gradient(circle at 50% 50%, #2A2F3D 0%, #0B0D12 90%)';
      case 'neon':
        return 'radial-gradient(circle at 50% 20%, rgba(0, 223, 216, 0.3) 0%, rgba(255, 0, 128, 0.15) 50%, #050608 90%)';
      case 'cyber':
      default:
        return 'radial-gradient(circle at 50% 20%, rgba(121, 40, 202, 0.25) 0%, rgba(0, 223, 216, 0.15) 50%, #07080B 90%)';
    }
  };

  return (
    <div style={{ padding: '0 24px 48px' }}>
      
      {/* Toast Notification */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          background: 'linear-gradient(135deg, #00DFD8 0%, #7928CA 100%)',
          color: '#FFF',
          padding: '12px 24px',
          borderRadius: '12px',
          fontWeight: '700',
          fontSize: '14px',
          boxShadow: '0 8px 30px rgba(0, 223, 216, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Check style={{ width: '18px', height: '18px' }} /> {toastMsg}
        </div>
      )}

      <div className="glass-panel" style={{ padding: '32px', minHeight: '750px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Header Controls Bar */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {onBack && (
                <button
                  onClick={onBack}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    background: 'rgba(0, 223, 216, 0.15)',
                    border: '1px solid rgba(0, 223, 216, 0.4)',
                    color: '#00DFD8',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  <ArrowLeft style={{ width: '16px', height: '16px' }} /> ← Back (પાછા જાઓ)
                </button>
              )}
              <div>
                <h2 className="font-syne" style={{ fontSize: '28px', fontWeight: '800', color: '#FFF' }}>
                  3D Perspective Mockup Studio & Custom Generator
                </h2>
                <p style={{ fontSize: '14px', color: '#94A3B8' }}>
                  Upload your photos, select 15 3D scenes, customize studio lighting, and save custom 3D mockups.
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS: Add Custom Photo, Save Mockup, Download Snapshot */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleCustomImageUpload}
                style={{ display: 'none' }}
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="font-space"
                style={{
                  padding: '9px 16px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #00DFD8 0%, #0066FF 100%)',
                  color: '#000',
                  fontWeight: '700',
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 15px rgba(0, 223, 216, 0.3)'
                }}
              >
                <Plus style={{ width: '16px', height: '16px' }} /> Add Custom Photo
              </button>

              <button
                onClick={handleSaveToMyMockups}
                style={{
                  padding: '9px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255, 0, 128, 0.15)',
                  border: '1px solid rgba(255, 0, 128, 0.4)',
                  color: '#FF0080',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Bookmark style={{ width: '15px', height: '15px' }} /> Save to My Mockups ({savedMockups.length})
              </button>

              <button
                onClick={handleDownloadMockupImage}
                style={{
                  padding: '9px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFF',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Download style={{ width: '15px', height: '15px' }} /> Download 3D Snapshot
              </button>
            </div>
          </div>

          {/* LIGHTING MOOD SWITCHER & WATERMARK BAR */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px',
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '12px 18px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {/* Lighting presets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700' }} className="font-space">3D LIGHTING MOOD:</span>
              {[
                { id: 'cyber', label: 'Cyber Ambient', icon: Zap },
                { id: 'gold', label: 'Luxury Sunset Gold', icon: Sun },
                { id: 'studio', label: 'Studio Soft White', icon: Moon },
                { id: 'neon', label: 'Neon Matrix', icon: Sparkles }
              ].map((m) => {
                const Icon = m.icon;
                const isActive = lightingMood === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setLightingMood(m.id)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      background: isActive ? 'rgba(0, 223, 216, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      border: isActive ? '1px solid #00DFD8' : '1px solid transparent',
                      color: isActive ? '#00DFD8' : '#94A3B8',
                      fontSize: '11px',
                      fontWeight: isActive ? '700' : '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Icon style={{ width: '12px', height: '12px' }} /> {m.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Watermark Input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700' }} className="font-space">WATERMARK:</span>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="Watermark Text..."
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFF',
                  fontSize: '11px',
                  width: '210px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Switch 15 Mockup Environments */}
          <div className="mobile-scroll-tabs" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', background: 'rgba(15, 23, 42, 0.5)', padding: '10px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            {MOCKUP_PRESETS.map((m) => {
              const Icon = m.icon;
              const isActive = mockupType === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMockupType(m.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: isActive ? 'linear-gradient(135deg, #00DFD8 0%, #7928CA 100%)' : 'rgba(255, 255, 255, 0.03)',
                    color: isActive ? '#FFF' : '#CBD5E1',
                    fontSize: '12px',
                    fontWeight: isActive ? '700' : '500',
                    border: isActive ? '1px solid #00DFD8' : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon style={{ width: '14px', height: '14px' }} />
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
          background: getLightingBackground(),
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '520px',
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.8)',
          transition: 'background 0.5s ease'
        }}>

          {/* Watermark Overlay */}
          {watermarkText && (
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              zIndex: 20,
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'rgba(5, 6, 8, 0.75)',
              backdropFilter: 'blur(8px)',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '1px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              pointerEvents: 'none'
            }}>
              {watermarkText}
            </div>
          )}

          {/* MOCKUP 1: FRAMED GALLERY POSTER WALL */}
          {mockupType === 'poster' && (
            <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '400px', height: '300px', background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ width: '360px', aspectRatio: '1/1.414', background: '#111', padding: '18px', borderRadius: '4px', boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 0 2px #222, inset 0 0 10px rgba(0,0,0,0.8)', transform: 'perspective(1000px) rotateY(-4deg) rotateX(2deg)' }}>
                <div style={{ width: '100%', height: '100%', background: '#FFF', padding: '12px' }}>
                  <img src={designImage} alt="Mockup Poster" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          )}

          {/* MOCKUP 2: STACKED BUSINESS CARDS */}
          {mockupType === 'card' && (
            <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '420px', height: '260px' }}>
                <div style={{ position: 'absolute', width: '360px', height: '210px', background: '#0B2B26', borderRadius: '12px', top: '40px', left: '10px', transform: 'rotate(-8deg)', opacity: 0.6, boxShadow: '0 20px 40px rgba(0,0,0,0.6)', border: '1px solid rgba(212, 175, 55, 0.4)' }} />
                <div style={{ position: 'absolute', width: '360px', height: '210px', background: '#051614', borderRadius: '12px', top: '0', left: '30px', transform: 'rotate(4deg) perspective(1000px) rotateX(15deg)', boxShadow: '0 25px 50px rgba(0,0,0,0.8)', border: '1px solid rgba(212, 175, 55, 0.6)', overflow: 'hidden', padding: '16px' }}>
                  <img src={designImage} alt="Mockup Card" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
                </div>
              </div>
            </div>
          )}

          {/* MOCKUP 3: MOBILE DEVICE SCREEN */}
          {mockupType === 'mobile' && (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '280px', height: '560px', background: '#1A1A1A', borderRadius: '48px', padding: '12px', boxShadow: '0 30px 90px rgba(0,0,0,0.9), 0 0 0 3px #333', position: 'relative' }}>
                <div style={{ width: '100px', height: '24px', background: '#000', borderRadius: '12px', position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }} />
                <div style={{ width: '100%', height: '100%', borderRadius: '38px', overflow: 'hidden', background: '#000' }}>
                  <img src={designImage} alt="Mobile Screen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          )}

          {/* MOCKUP 4: URBAN BILLBOARD */}
          {mockupType === 'billboard' && (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '80%', maxWidth: '720px', aspectRatio: '16/9', background: '#111', padding: '16px', borderRadius: '8px', boxShadow: '0 40px 100px rgba(0,0,0,0.95), inset 0 0 20px #000', border: '8px solid #222' }}>
                <img src={designImage} alt="Billboard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          )}

          {/* MOCKUPS 5-15: CUSTOM 3D MOCKUP SCENES */}
          {['book', 'coffee', 'tshirt', 'storefront', 'brochure', 'signboard', 'mug', 'magazine', 'can', 'desktop', 'box'].includes(mockupType) && (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '36px' }}>
              <div style={{ width: '440px', maxWidth: '90%', aspectRatio: '16/10', background: 'rgba(15, 23, 42, 0.85)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(0, 223, 216, 0.3)', boxShadow: '0 25px 60px rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <img src={designImage} alt="Mockup Visual" style={{ width: '100%', height: '80%', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }} />
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#00DFD8' }} className="font-space">
                  {MOCKUP_PRESETS.find(m => m.id === mockupType)?.label.toUpperCase()} 3D SCENE
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
