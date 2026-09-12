import React, { useState } from 'react';
import { Palette, Edit3, Image, Layers, Printer, Sparkles, Download, Menu, X, Smartphone } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onQuickExport }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'gallery', label: 'Portfolio Showcase', icon: Image, badge: 'Digital & Print' },
    { id: 'studio', label: 'Graphic Studio Editor', icon: Edit3, badge: 'Photo & Design' },
    { id: 'mockups', label: '3D Mockup Stage', icon: Layers, badge: 'Realistic' },
    { id: 'brandkit', label: 'Brand Kit Generator', icon: Palette, badge: 'Tokens' },
    { id: 'printspecs', label: 'Print Preflight', icon: Printer, badge: '300 DPI' },
  ];

  const handleNavClick = (tabId) => {
    console.log(`Navigating to tab: ${tabId}`);
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, padding: '12px 16px', background: 'rgba(8, 9, 12, 0.85)', backdropFilter: 'blur(20px)' }}>
      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', flexWrap: 'wrap', gap: '12px' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('gallery')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', userSelect: 'none' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00DFD8 0%, #7928CA 50%, #FF0080 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 18px rgba(0, 223, 216, 0.4)'
          }}>
            <Sparkles style={{ width: '20px', height: '20px', color: '#FFF' }} />
          </div>
          <div>
            <div className="font-syne" style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px', color: '#FFF' }}>
              OM GRAPHIC <span style={{ color: '#00DFD8' }}>STUDIO</span>
            </div>
            <div className="font-space" style={{ fontSize: '10px', color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Digital & Print Creative Suite
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle-btn"
          style={{
            display: 'none',
            padding: '8px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#FFF',
            cursor: 'pointer'
          }}
        >
          {mobileMenuOpen ? <X style={{ width: '22px', height: '22px' }} /> : <Menu style={{ width: '22px', height: '22px' }} />}
        </button>

        {/* Center Nav Items */}
        <nav className={`nav-items-container ${mobileMenuOpen ? 'open' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: isActive ? '1px solid #00DFD8' : '1px solid transparent',
                  background: isActive ? 'rgba(0, 223, 216, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? '#00DFD8' : '#CBD5E1',
                  fontSize: '13px',
                  fontWeight: isActive ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  userSelect: 'none',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#FFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.color = '#CBD5E1';
                  }
                }}
              >
                <Icon style={{ width: '15px', height: '15px', pointerEvents: 'none' }} />
                <span style={{ pointerEvents: 'none' }}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: '9px',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '99px',
                    background: isActive ? 'rgba(0, 223, 216, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    color: isActive ? '#00DFD8' : '#94A3B8',
                    letterSpacing: '0.5px',
                    pointerEvents: 'none'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Export & App Download Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              console.log('Quick Export clicked');
              onQuickExport();
            }}
            className="font-space"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 16px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #00DFD8 0%, #0066FF 100%)',
              color: '#000',
              fontWeight: '700',
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 223, 216, 0.3)',
              transition: 'transform 0.15s ease'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Download style={{ width: '15px', height: '15px' }} />
            Export Graphic Design
          </button>

          <button
            type="button"
            onClick={() => {
              onQuickExport();
            }}
            title="Download & Install Mobile App on Phone"
            className="font-space"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFF',
              fontWeight: '700',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Smartphone style={{ width: '14px', height: '14px', color: '#00DFD8' }} />
            App Download
          </button>
        </div>

      </div>
    </header>
  );
}

