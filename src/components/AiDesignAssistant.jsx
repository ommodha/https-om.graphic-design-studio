import React, { useState } from 'react';
import { Bot, Sparkles, Copy, Check, Lightbulb, Zap, Rocket } from 'lucide-react';

export default function AiDesignAssistant() {
  const [industry, setIndustry] = useState('Luxury Botanicals & Cosmetics');
  const [targetMarket, setTargetMarket] = useState('USA & European Luxury Consumers');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const aiPrompts = [
    {
      concept: "Swiss International Typographic Poster & Grid Layout",
      description: "High-contrast asymmetrical grid composition with heavy neo-grotesque headlines, process red accents, and off-white background.",
      targetPrice: "$150 - $350 per poster",
      promptText: "Swiss International style typographic poster design, bold baseline layout grid, process red and black, museum exhibition quality typography."
    },
    {
      concept: "3D Glassmorphic Cyberpunk Social Ad Campaign",
      description: "3D iridescent floating glass shapes, vibrant neon purple & cyan gradients, high-converting social media ad banner.",
      targetPrice: "$250 - $600 per campaign set",
      promptText: "Vibrant digital social media marketing ad banner graphic design, 3D iridescent floating glass shapes, neon purple and cyan gradient, sleek typography."
    },
    {
      concept: "Luxury Forest Green & Foil Gold Stationery System",
      description: "Foil-stamped executive business cards, embossed letterheads, custom envelopes, dark emerald green matte paper.",
      targetPrice: "$499 - $1,200 full identity system",
      promptText: "Luxury brand identity design stationery set, premium business card mockups, letterhead, envelope, elegant foil gold logo mark, dark forest green matte paper."
    }
  ];

  const handleCopyPrompt = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div style={{ padding: '0 24px 48px' }}>
      <div className="glass-panel" style={{ padding: '36px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#00DFD8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>
              <Bot style={{ width: '15px', height: '15px' }} /> AI GRAPHIC CONCEPT COPILOT
            </div>
            <h2 className="font-syne" style={{ fontSize: '28px', fontWeight: '800', color: '#FFF' }}>
              AI Concept Generator for High-Ticket Design Work
            </h2>
            <p style={{ fontSize: '14px', color: '#94A3B8' }}>
              Generate high-value design prompts and concepts that command top $ USD rates on international marketplaces
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {aiPrompts.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: 'rgba(12, 15, 24, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="font-space" style={{ fontSize: '11px', color: '#00DFD8', fontWeight: '700' }}>
                    {item.targetPrice}
                  </span>
                  <Sparkles style={{ width: '16px', height: '16px', color: '#FF0080' }} />
                </div>

                <h3 className="font-syne" style={{ fontSize: '18px', fontWeight: '700', color: '#FFF', marginBottom: '8px' }}>
                  {item.concept}
                </h3>

                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5', marginBottom: '16px' }}>
                  {item.description}
                </p>

                <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#CBD5E1', fontFamily: 'monospace', marginBottom: '20px' }}>
                  "{item.promptText}"
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopyPrompt(item.promptText, idx)}
                className="font-space"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  background: copiedIndex === idx ? '#22C55E' : 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFF',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                {copiedIndex === idx ? <Check style={{ width: '14px', height: '14px' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
                {copiedIndex === idx ? 'Prompt Copied!' : 'Copy AI Prompt'}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
