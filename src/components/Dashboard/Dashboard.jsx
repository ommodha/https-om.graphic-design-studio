import React from 'react';
import QuickCreate from './QuickCreate';
import RecentProjects from './RecentProjects';
import { Sparkles, Layers, Printer, ShieldCheck, Download, Plus, ArrowRight } from 'lucide-react';

export default function Dashboard({ onOpenStudioWithFormat, onEditProject, onExportProject }) {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px 48px' }}>
      
      {/* Top Banner & Stats Overview */}
      <div className="glass-panel" style={{
        padding: '32px',
        borderRadius: '20px',
        marginBottom: '32px',
        background: 'linear-gradient(135deg, rgba(0, 223, 216, 0.08) 0%, rgba(255, 0, 128, 0.08) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '99px',
            background: 'rgba(0, 223, 216, 0.15)',
            color: '#00DFD8',
            fontSize: '11px',
            fontWeight: '700',
            marginBottom: '12px',
            border: '1px solid rgba(0, 223, 216, 0.3)'
          }}>
            <Sparkles style={{ width: '13px', height: '13px' }} /> DESIGN STUDIO SUITE 2026
          </div>

          <h1 className="font-syne" style={{ fontSize: '32px', fontWeight: '800', color: '#FFF', lineHeight: '1.1', marginBottom: '10px' }}>
            Creative Design <span style={{ color: '#00DFD8' }}>Dashboard</span>
          </h1>

          <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
            Manage your graphic collateral, open custom canvas dimensions, pre-flight offset print specs (300 DPI), and export high-resolution assets in seconds.
          </p>
        </div>

        {/* Quick Launch Action Button */}
        <button
          onClick={() => onOpenStudioWithFormat(null)}
          className="font-space"
          style={{
            padding: '14px 28px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00DFD8 0%, #7928CA 100%)',
            color: '#FFF',
            fontWeight: '800',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 8px 25px rgba(0, 223, 216, 0.3)',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
        >
          <Plus style={{ width: '18px', height: '18px' }} /> Launch Blank Canvas
        </button>
      </div>

      {/* Stats Counter Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Active Projects', value: '12 Collaterals', icon: Layers, color: '#00DFD8' },
          { label: 'Print Specifications', value: '300 DPI Pre-Flight', icon: Printer, color: '#E63946' },
          { label: 'Color Profiles', value: 'CMYK Fogra39', icon: ShieldCheck, color: '#D4AF37' },
          { label: 'Export Quality', value: 'Ultra 3x Resolution', icon: Download, color: '#10B981' }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel" style={{ padding: '20px', borderRadius: '14px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', background: `${stat.color}18`, color: stat.color }}>
                  <Icon style={{ width: '18px', height: '18px' }} />
                </div>
                <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase' }}>{stat.label}</span>
              </div>
              <div className="font-space" style={{ fontSize: '16px', fontWeight: '700', color: '#F8FAFC' }}>
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Create Launcher Section */}
      <QuickCreate onSelectFormat={onOpenStudioWithFormat} />

      {/* Recent Projects Showcase Grid */}
      <RecentProjects onEditProject={onEditProject} onExportProject={onExportProject} />

    </div>
  );
}
