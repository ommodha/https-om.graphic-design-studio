import React, { useState } from 'react';
import { Wand2, CheckCircle, RefreshCw, Cpu } from 'lucide-react';
import brandIdentityImg from '../../../assets/brand_identity_collateral_1789199524359.png';
import swissPosterImg from '../../../assets/swiss_poster_design_1789199320446.png';
import digitalCampaignImg from '../../../assets/digital_social_campaign_1789199592437.png';
import heroBrandingImg from '../../../assets/hero_branding_art_1789199298688.png';

export const AI_PRESETS = [
  { id: 'cyber', name: 'Cyberpunk Neon Mesh', style: 'Neon glow, futuristic dark grid, cyan/magenta lighting', image: heroBrandingImg },
  { id: 'swiss', name: 'Swiss Minimal Grid', style: 'Clean monochrome geometry, red grid, high contrast typography', image: swissPosterImg },
  { id: 'luxury', name: 'Luxury Gold & Marble', style: 'Dark obsidian background with fluid golden veins and foil', image: brandIdentityImg },
  { id: 'digital', name: '3D Gradient Waves', style: 'Vibrant organic 3D glassmorphic ribbons and neon aura', image: digitalCampaignImg }
];

export default function AiVisualGeneratorPlugin({ setBgImage, setOverlayOpacity, setBgPattern }) {
  const [prompt, setPrompt] = useState('Cyberpunk neon dark grid with glowing cyan geometric nodes');
  const [selectedPreset, setSelectedPreset] = useState(AI_PRESETS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccess, setGeneratedSuccess] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedSuccess(false);

    setTimeout(() => {
      setIsGenerating(false);
      setBgImage(selectedPreset.image);
      setOverlayOpacity(0.35);
      setBgPattern(selectedPreset.id === 'swiss' ? 'swiss-grid' : 'cyber-mesh');
      setGeneratedSuccess(true);

      setTimeout(() => setGeneratedSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Wand2 style={{ width: '16px', height: '16px', color: '#38BDF8' }} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#F8FAFC', fontFamily: 'Space Grotesk, sans-serif' }}>
            AI BACKDROP & PATTERN GENERATOR
          </span>
        </div>
        <span style={{ fontSize: '10px', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.3)', fontWeight: '700' }}>
          NEURAL V2.6
        </span>
      </div>

      {/* Style Presets */}
      <div style={{ marginBottom: '14px' }}>
        <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
          ARTISTIC STYLE PRESETS
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
          {AI_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPreset(p);
                setPrompt(p.style);
              }}
              style={{
                padding: '8px',
                borderRadius: '8px',
                background: selectedPreset.id === p.id ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: selectedPreset.id === p.id ? '1px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
                color: '#CBD5E1',
                fontSize: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ color: selectedPreset.id === p.id ? '#38BDF8' : '#F1F5F9', fontWeight: '700' }}>{p.name}</div>
              <div style={{ fontSize: '9px', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.style}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Input */}
      <div style={{ marginBottom: '14px' }}>
        <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
          CUSTOM ART PROMPT
        </span>
        <textarea
          rows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 10px',
            borderRadius: '8px',
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#FFF',
            fontSize: '11px',
            outline: 'none',
            resize: 'none',
            fontFamily: 'inherit'
          }}
          placeholder="Describe your desired background artwork..."
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          background: generatedSuccess
            ? 'linear-gradient(135deg, #10B981, #059669)'
            : 'linear-gradient(135deg, #38BDF8, #0284C7)',
          border: 'none',
          color: '#FFF',
          fontWeight: '700',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: isGenerating ? 'wait' : 'pointer',
          boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)',
          transition: 'all 0.2s ease'
        }}
      >
        {isGenerating ? (
          <>
            <RefreshCw className="animate-spin" style={{ width: '14px', height: '14px' }} />
            Synthesizing Visual Texture...
          </>
        ) : generatedSuccess ? (
          <>
            <CheckCircle style={{ width: '14px', height: '14px' }} />
            Artwork Applied to Canvas!
          </>
        ) : (
          <>
            <Cpu style={{ width: '14px', height: '14px' }} />
            Generate & Apply AI Backdrop
          </>
        )}
      </button>
    </div>
  );
}
