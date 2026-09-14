import React from 'react';
import { Edit3, Eye, Download, Trash2, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export default function ProjectCard({ project, onEdit, onExport, onDelete }) {
  return (
    <div
      className="glass-panel font-space"
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(15, 23, 42, 0.6)',
        transition: 'all 0.25s ease',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = project.primaryColor || '#00DFD8';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 12px 30px ${project.primaryColor || '#00DFD8'}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Thumbnail Preview Area */}
      <div style={{
        height: '160px',
        backgroundColor: project.bgColor || '#0A0A0C',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '16px'
      }}>
        {/* Background Overlay */}
        {project.backgroundImage && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${project.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: project.overlayOpacity || 0.35
          }} />
        )}

        {/* Format Badge */}
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontSize: '10px',
          fontWeight: '800',
          padding: '4px 8px',
          borderRadius: '6px',
          background: 'rgba(0, 0, 0, 0.75)',
          color: '#00DFD8',
          border: '1px solid rgba(0, 223, 216, 0.4)',
          backdropFilter: 'blur(8px)',
          zIndex: 5
        }}>
          {project.formatName || 'PRINT / DIGITAL'}
        </span>

        {/* Headline Preview */}
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center' }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '800',
            color: project.primaryColor || '#00DFD8',
            lineHeight: '1.2',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}>
            {project.title}
          </div>
          <div style={{ fontSize: '11px', color: project.secondaryColor || '#FF0080', marginTop: '4px' }}>
            {project.subtitle}
          </div>
        </div>
      </div>

      {/* Card Content & Action Bar */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <h4 className="font-syne" style={{ fontSize: '15px', fontWeight: '700', color: '#FFF', margin: 0 }}>
              {project.title}
            </h4>
            <span style={{ fontSize: '10px', color: '#64748B' }}>{project.updatedAt}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#94A3B8', marginBottom: '14px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Layers style={{ width: '12px', height: '12px', color: '#00DFD8' }} /> {project.badge || 'PRO DESIGN'}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck style={{ width: '12px', height: '12px', color: '#10B981' }} /> 300 DPI
            </span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            type="button"
            onClick={() => onEdit(project)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #00DFD8 0%, #0066FF 100%)',
              color: '#000',
              fontWeight: '700',
              fontSize: '11px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            <Edit3 style={{ width: '12px', height: '12px' }} /> Open Studio
          </button>

          <button
            type="button"
            onClick={() => onExport(project)}
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFF',
              fontSize: '11px',
              cursor: 'pointer'
            }}
            title="Export Image"
          >
            <Download style={{ width: '13px', height: '13px' }} />
          </button>

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(project.id)}
              style={{
                padding: '8px 10px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#EF4444',
                fontSize: '11px',
                cursor: 'pointer'
              }}
              title="Delete Project"
            >
              <Trash2 style={{ width: '13px', height: '13px' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
