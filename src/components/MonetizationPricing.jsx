import React, { useState } from 'react';
import { DollarSign, Check, Zap, Crown, Building2, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MonetizationPricing() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly', 'yearly'
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'starter',
      name: 'Free Creator',
      priceMonthly: 0,
      priceYearly: 0,
      badge: 'STARTER',
      description: 'Ideal for previewing digital social graphics and basic web banners.',
      features: [
        'Standard 1080p Digital Exports',
        'Basic Social Media Templates',
        'RGB Color Space Preview',
        'Community Forum Access',
        'Personal License Only'
      ],
      cta: 'Current Plan',
      isPopular: false,
      color: '#94A3B8'
    },
    {
      id: 'pro',
      name: 'Pro Designer',
      priceMonthly: 29,
      priceYearly: 24,
      badge: 'MOST POPULAR',
      description: 'Everything you need to sell graphic designs for Dollars ($) to global clients.',
      features: [
        'Ultra 4K & Vector SVG Exports',
        '300 DPI Offset Print Specs & Bleeds',
        'CMYK Fogra39 Press Ready Engine',
        'Full Commercial Resale License ($ USD)',
        '3D Perspective Mockup Renderer',
        'Brand Token & WCAG Inspector',
        'Unlimited Direct Downloads'
      ],
      cta: 'Upgrade to Pro ($29/mo)',
      isPopular: true,
      color: '#00DFD8'
    },
    {
      id: 'agency',
      name: 'Agency Studio',
      priceMonthly: 89,
      priceYearly: 75,
      badge: 'UNLIMITED $ RESALE',
      description: 'For design agencies and freelancers managing multiple high-paying Dollar clients.',
      features: [
        'Everything in Pro Designer',
        'White-Label Client Presentation Link',
        'Custom Font & Vector Asset Uploads',
        'Dedicated Print Specification Audit',
        'Priority 24/7 AI Design Copilot',
        'Multi-Team Collaboration Seats (10 Seats)',
        'Resale Royalty Certificate Generator'
      ],
      cta: 'Get Agency Access ($89/mo)',
      isPopular: false,
      color: '#FF0080'
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div style={{ padding: '0 24px 48px' }}>
      <div className="glass-panel" style={{ padding: '40px 32px' }}>
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '99px',
            background: 'rgba(212, 175, 55, 0.15)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            color: '#D4AF37',
            fontSize: '12px',
            fontWeight: '700',
            marginBottom: '16px'
          }}>
            <DollarSign style={{ width: '15px', height: '15px' }} />
            MONETIZE YOUR GRAPHIC DESIGN STUDIO IN DOLLARS ($ USD)
          </div>

          <h2 className="font-syne" style={{ fontSize: '36px', fontWeight: '800', color: '#FFF', lineHeight: '1.2', marginBottom: '12px' }}>
            Earn Dollars ($) Selling Professional Designs
          </h2>
          
          <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: '1.6' }}>
            Unlock commercial resale licenses, 300 DPI CMYK print specs, client white-labeling, and sell your custom templates to global clients on Fiverr, Upwork, and Creative Market.
          </p>

          {/* Billing Switcher */}
          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(0, 0, 0, 0.6)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', marginTop: '24px' }}>
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                background: billingCycle === 'monthly' ? '#00DFD8' : 'transparent',
                color: billingCycle === 'monthly' ? '#000' : '#CBD5E1',
                fontWeight: '700',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                background: billingCycle === 'yearly' ? '#00DFD8' : 'transparent',
                color: billingCycle === 'yearly' ? '#000' : '#CBD5E1',
                fontWeight: '700',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Annual Billing <span style={{ fontSize: '10px', background: '#FF0080', color: '#FFF', padding: '2px 6px', borderRadius: '99px' }}>SAVE 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {plans.map((plan) => {
            const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className="glass-panel"
                style={{
                  padding: '32px',
                  borderRadius: '20px',
                  position: 'relative',
                  border: plan.isPopular ? `2px solid ${plan.color}` : '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: plan.isPopular ? `0 20px 50px ${plan.color}30` : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: plan.isPopular ? 'rgba(18, 24, 38, 0.9)' : 'rgba(12, 14, 20, 0.7)'
                }}
              >
                <div>
                  {/* Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span className="font-space" style={{
                      fontSize: '10px',
                      fontWeight: '800',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: plan.isPopular ? plan.color : 'rgba(255,255,255,0.1)',
                      color: plan.isPopular ? '#000' : '#CBD5E1',
                      letterSpacing: '1px'
                    }}>
                      {plan.badge}
                    </span>
                    {plan.isPopular && <Crown style={{ width: '20px', height: '20px', color: plan.color }} />}
                  </div>

                  <h3 className="font-syne" style={{ fontSize: '24px', fontWeight: '800', color: '#FFF', marginBottom: '8px' }}>
                    {plan.name}
                  </h3>

                  <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5', marginBottom: '24px' }}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                    <span className="font-space" style={{ fontSize: '42px', fontWeight: '800', color: '#FFF' }}>
                      ${price}
                    </span>
                    <span style={{ fontSize: '14px', color: '#64748B' }}>
                      / month
                    </span>
                  </div>

                  {/* Features List */}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px', marginBottom: '32px' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                      INCLUDED IN PLAN:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#CBD5E1', marginBottom: '10px' }}>
                        <Check style={{ width: '16px', height: '16px', color: plan.color, flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action Button */}
                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan)}
                  className="font-space"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    background: plan.isPopular ? `linear-gradient(135deg, ${plan.color} 0%, #0066FF 100%)` : 'rgba(255, 255, 255, 0.08)',
                    color: plan.isPopular ? '#000' : '#FFF',
                    fontWeight: '800',
                    fontSize: '14px',
                    border: plan.isPopular ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: plan.isPopular ? `0 8px 25px ${plan.color}40` : 'none'
                  }}
                >
                  {plan.cta} <ArrowRight style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Plan Confirmation Modal */}
        {selectedPlan && (
          <div style={{
            marginTop: '40px',
            padding: '24px',
            borderRadius: '16px',
            background: 'rgba(0, 223, 216, 0.12)',
            border: '1px solid #00DFD8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#FFF' }}>
                🎉 Selected Plan: <span style={{ color: '#00DFD8' }}>{selectedPlan.name} (${selectedPlan.priceMonthly}/mo)</span>
              </div>
              <div style={{ fontSize: '13px', color: '#CBD5E1', marginTop: '4px' }}>
                Commercial license key generated. Ready to export vector assets for Dollar sales on Upwork & Fiverr.
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert(`Stripe / PayPal Checkout simulated for ${selectedPlan.name}. You are ready to start selling design assets for Dollars ($)!`)}
              className="font-space"
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                background: '#00DFD8',
                color: '#000',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Checkout with Stripe / PayPal ($ USD)
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
