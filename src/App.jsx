import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PortfolioGallery from './components/PortfolioGallery';
import CanvasStudio from './components/StudioEditor/CanvasStudio';
import MockupStage from './components/MockupViewer/MockupStage';
import BrandKitGenerator from './components/BrandKitGenerator';
import PrintSpecInspector from './components/PrintSpecInspector';
import ExportModal from './components/ExportModal';
import MonetizationPricing from './components/MonetizationPricing';
import ServiceQuoteCalculator from './components/ServiceQuoteCalculator';
import AiDesignAssistant from './components/AiDesignAssistant';

export default function App() {
  const [activeTab, setActiveTab] = useState('gallery');
  const [currentDesign, setCurrentDesign] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportType, setExportType] = useState('png');

  const handleSelectDesignForStudio = (item) => {
    setCurrentDesign(item);
    setActiveTab('studio');
  };

  const handleSelectDesignForMockup = (item) => {
    setCurrentDesign(item);
    setActiveTab('mockups');
  };

  const handleTriggerExport = (type = 'png') => {
    setExportType(type);
    setIsExportOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickExport={() => handleTriggerExport('png')}
      />

      {/* Main Content View Switcher */}
      <main style={{ flex: 1 }}>
        {/* Showcase Hero Banner (Shown on Gallery tab) */}
        {activeTab === 'gallery' && (
          <HeroSection
            onOpenStudio={() => setActiveTab('studio')}
            onOpenMockup={() => setActiveTab('mockups')}
          />
        )}

        {/* Tab 1: Portfolio Showcase & Filterable Gallery */}
        {activeTab === 'gallery' && (
          <PortfolioGallery
            onSelectDesignForEditor={handleSelectDesignForStudio}
            onSelectForMockup={handleSelectDesignForMockup}
          />
        )}

        {/* Tab 2: Interactive Graphic Studio Canvas Editor */}
        {activeTab === 'studio' && (
          <CanvasStudio
            currentDesign={currentDesign}
            setCurrentDesign={setCurrentDesign}
            onExport={handleTriggerExport}
          />
        )}

        {/* Tab 3: 3D Perspective Mockup Stage */}
        {activeTab === 'mockups' && (
          <MockupStage activeDesign={currentDesign} />
        )}

        {/* Tab 4: Brand Kit & Color Palette Generator */}
        {activeTab === 'brandkit' && (
          <BrandKitGenerator />
        )}

        {/* Tab 5: Print Technical Specifications & DPI Inspector */}
        {activeTab === 'printspecs' && (
          <PrintSpecInspector />
        )}

        {/* Tab 6: Monetization & Subscription Pricing ($ USD) */}
        {activeTab === 'pricing' && (
          <MonetizationPricing />
        )}

        {/* Tab 7: Client Quote & Invoice Calculator ($ USD) */}
        {activeTab === 'calculator' && (
          <ServiceQuoteCalculator />
        )}

        {/* Tab 8: AI Graphic Concept Copilot */}
        {activeTab === 'aiassistant' && (
          <AiDesignAssistant />
        )}
      </main>

      {/* Export Confirmation Modal */}
      {isExportOpen && (
        <ExportModal
          exportType={exportType}
          currentDesign={currentDesign}
          onClose={() => setIsExportOpen(false)}
        />
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '32px 24px', background: 'rgba(5, 6, 8, 0.9)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="font-syne" style={{ fontSize: '16px', fontWeight: '800', color: '#FFF' }}>
              OM<span style={{ color: '#00DFD8' }}>.DESIGN STUDIO</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
              Creative & Professional Graphic Designs for Digital & Print Media © 2026
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#94A3B8' }}>
            <span>Digital Media 4K</span>
            <span>•</span>
            <span>Offset Print 300 DPI</span>
            <span>•</span>
            <span>Swiss Baseline Grid</span>
            <span>•</span>
            <span>CMYK Fogra39</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
