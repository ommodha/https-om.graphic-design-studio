import React, { useState } from 'react';
import { Code, Copy, Check, Download } from 'lucide-react';

export default function CodeExportPlugin({ headline, subtitle, primaryColor, secondaryColor, bgColor, activeFormat }) {
  const [copiedType, setCopiedType] = useState(null);

  const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="${bgColor}" />
  <defs>
    <linearGradient id="primaryGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0.9" />
      <stop offset="100%" stop-color="${secondaryColor}" stop-opacity="0.9" />
    </linearGradient>
  </defs>
  <text x="60" y="380" fill="url(#primaryGlow)" font-family="Space Grotesk, sans-serif" font-size="48" font-weight="800">
    ${headline.toUpperCase()}
  </text>
  <text x="60" y="440" fill="#94A3B8" font-family="sans-serif" font-size="20" letter-spacing="3">
    ${subtitle.toUpperCase()}
  </text>
</svg>`;

  const cssMarkup = `/* Om Graphic Studio CSS Token Export */
.studio-poster-card {
  background-color: ${bgColor};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 48px;
}

.studio-headline {
  font-family: 'Syne', sans-serif;
  color: ${primaryColor};
  background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const downloadSvgFile = () => {
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studio-design-${activeFormat.id}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code style={{ width: '16px', height: '16px', color: '#10B981' }} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#F8FAFC', fontFamily: 'Space Grotesk, sans-serif' }}>
            SVG & CODE SNIPPET EXPORTER
          </span>
        </div>
        <button
          onClick={downloadSvgFile}
          style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '6px',
            color: '#10B981',
            padding: '4px 8px',
            fontSize: '11px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
        >
          <Download style={{ width: '12px', height: '12px' }} />
          Save .SVG
        </button>
      </div>

      {/* SVG Preview Block */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            VECTOR SVG CODE
          </span>
          <button
            onClick={() => copyToClipboard(svgMarkup, 'svg')}
            style={{ background: 'none', border: 'none', color: copiedType === 'svg' ? '#10B981' : '#94A3B8', cursor: 'pointer', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            {copiedType === 'svg' ? <Check style={{ width: '12px', height: '12px' }} /> : <Copy style={{ width: '12px', height: '12px' }} />}
            {copiedType === 'svg' ? 'Copied SVG' : 'Copy SVG'}
          </button>
        </div>
        <pre
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '10px',
            color: '#34D399',
            fontFamily: 'monospace',
            maxHeight: '110px',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
            margin: 0
          }}
        >
          {svgMarkup}
        </pre>
      </div>

      {/* CSS Tokens Block */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            CSS STYLESHEET TOKENS
          </span>
          <button
            onClick={() => copyToClipboard(cssMarkup, 'css')}
            style={{ background: 'none', border: 'none', color: copiedType === 'css' ? '#10B981' : '#94A3B8', cursor: 'pointer', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            {copiedType === 'css' ? <Check style={{ width: '12px', height: '12px' }} /> : <Copy style={{ width: '12px', height: '12px' }} />}
            {copiedType === 'css' ? 'Copied CSS' : 'Copy CSS'}
          </button>
        </div>
        <pre
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '10px',
            color: '#38BDF8',
            fontFamily: 'monospace',
            maxHeight: '110px',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
            margin: 0
          }}
        >
          {cssMarkup}
        </pre>
      </div>
    </div>
  );
}
