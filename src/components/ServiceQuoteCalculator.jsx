import React, { useState } from 'react';
import { DollarSign, FileText, Calculator, CheckCircle2, Download, Send, Sparkles } from 'lucide-react';

export default function ServiceQuoteCalculator() {
  const [clientName, setClientName] = useState("Acme Global Corp");
  const [rushDelivery, setRushDelivery] = useState(false);
  const [selectedServices, setSelectedServices] = useState(['brand', 'social']);

  const availableServices = [
    { id: 'brand', name: 'Luxury Brand Identity & Style Guide', price: 499, description: 'Logo mark, typography rules, color tokens, and style manual.' },
    { id: 'social', name: 'Social Media Campaign Package (10 Formats)', price: 249, description: '1080x1080 px posts & 9:16 Stories ready for Instagram & LinkedIn.' },
    { id: 'print', name: '300 DPI Offset Print Collateral & Business Cards', price: 199, description: '3mm outer bleed, CMYK Fogra39 vector files, and foil specs.' },
    { id: 'packaging', name: 'Packaging Box & Label Graphic Design', price: 349, description: 'Die-cut packaging layout artwork with 3D product rendering.' },
    { id: '3d-motion', name: '3D Metallic Visual System & Motion Graphic', price: 299, description: 'High-concept 3D hero artwork for web header & billboards.' }
  ];

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const baseTotal = selectedServices.reduce((sum, id) => {
    const srv = availableServices.find(s => s.id === id);
    return sum + (srv ? srv.price : 0);
  }, 0);

  const rushFee = rushDelivery ? 150 : 0;
  const grandTotal = baseTotal + rushFee;

  const handleDownloadInvoice = () => {
    const invoiceContent = `================================================
  OM DESIGN STUDIO - DOLLAR QUOTE INVOICE
================================================
Client Name: ${clientName}
Date: ${new Date().toLocaleDateString()}
Currency: USD ($)

SELECTED SERVICES:
${selectedServices.map(id => {
  const srv = availableServices.find(s => s.id === id);
  return `- ${srv.name}: $${srv.price}`;
}).join('\n')}

${rushDelivery ? '- Rush 24-Hour Express Delivery: $150\n' : ''}
------------------------------------------------
TOTAL PROJECT QUOTE: $${grandTotal} USD
------------------------------------------------
Commercial Resale License & Vector Source Files Included.
Payment Terms: 50% Upfront, 50% upon final delivery.
================================================`;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quote-invoice-${clientName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: '0 24px 48px' }}>
      <div className="glass-panel" style={{ padding: '36px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h2 className="font-syne" style={{ fontSize: '28px', fontWeight: '800', color: '#FFF' }}>
              Client Quote & Dollar ($) Price Calculator
            </h2>
            <p style={{ fontSize: '14px', color: '#94A3B8' }}>
              Calculate high-ticket design pricing for international clients and generate instant $ USD invoices
            </p>
          </div>

          <div className="font-space" style={{
            background: 'linear-gradient(135deg, #00DFD8 0%, #7928CA 100%)',
            padding: '12px 24px',
            borderRadius: '12px',
            color: '#FFF',
            fontWeight: '800',
            fontSize: '24px',
            boxShadow: '0 8px 25px rgba(0, 223, 216, 0.3)'
          }}>
            Est. Total: ${grandTotal} USD
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
          
          {/* LEFT: Select Services */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                CLIENT / COMPANY NAME
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFF',
                  fontSize: '14px',
                  fontWeight: '700'
                }}
              />
            </div>

            <h3 className="font-syne" style={{ fontSize: '18px', fontWeight: '700', color: '#00DFD8', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calculator style={{ width: '18px', height: '18px' }} /> Select Graphic Design Services
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {availableServices.map((srv) => {
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(0, 223, 216, 0.12)' : 'rgba(0, 0, 0, 0.4)',
                      border: isSelected ? '1px solid #00DFD8' : '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#FFF' }}>{srv.name}</div>
                      <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>{srv.description}</div>
                    </div>

                    <div className="font-space" style={{ fontSize: '18px', fontWeight: '800', color: isSelected ? '#00DFD8' : '#CBD5E1' }}>
                      ${srv.price}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rush Delivery Toggle */}
            <div style={{ background: 'rgba(255, 0, 128, 0.1)', border: '1px solid rgba(255, 0, 128, 0.3)', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFF' }}>
                  24-Hour Express Rush Delivery
                </div>
                <div style={{ fontSize: '12px', color: '#FF0080' }}>
                  Priority turnaround for urgent client deadlines (+$150 USD)
                </div>
              </div>

              <input
                type="checkbox"
                checked={rushDelivery}
                onChange={(e) => setRushDelivery(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: '#FF0080', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* RIGHT: Live Invoice Preview & Actions */}
          <div style={{ background: 'rgba(0, 0, 0, 0.6)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <div className="font-syne" style={{ fontSize: '18px', fontWeight: '800', color: '#FFF' }}>
                    INVOICE SPECIMEN
                  </div>
                  <div style={{ fontSize: '12px', color: '#00DFD8' }}>
                    Client: {clientName}
                  </div>
                </div>
                <Sparkles style={{ width: '20px', height: '20px', color: '#D4AF37' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', marginBottom: '20px' }}>
                {selectedServices.map(id => {
                  const srv = availableServices.find(s => s.id === id);
                  return (
                    <div key={id} style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                      <span>{srv.name}</span>
                      <strong style={{ color: '#FFF' }}>${srv.price}</strong>
                    </div>
                  );
                })}

                {rushDelivery && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FF0080' }}>
                    <span>24-Hour Express Rush Fee</span>
                    <strong>+$150</strong>
                  </div>
                )}
              </div>

              <div style={{ borderTop: '2px dashed rgba(255, 255, 255, 0.2)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#FFF' }}>Grand Total (USD):</span>
                <span className="font-space" style={{ fontSize: '32px', fontWeight: '800', color: '#00DFD8' }}>
                  ${grandTotal}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="font-space"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #00DFD8 0%, #0066FF 100%)',
                  color: '#000',
                  fontWeight: '800',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Download style={{ width: '16px', height: '16px' }} /> Download Client Invoice ($ USD)
              </button>

              <button
                type="button"
                onClick={() => alert(`Simulated sending quote of $${grandTotal} USD to ${clientName}. Ready to receive payment via Stripe / Wise!`)}
                className="font-space"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFF',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Send style={{ width: '15px', height: '15px' }} /> Send $ Payment Link to Client
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
