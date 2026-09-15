import React, { useState, useEffect } from 'react';
import { STARTER_TEMPLATES, MEDIA_FORMATS } from '../data/designTemplates';
import { getMyTemplates, deleteMyTemplate, saveMyTemplate, isMyTemplate } from '../utils/myTemplatesStorage';
import { Sparkles, Search, Filter, Edit3, ArrowRight, Eye, Layers, Palette, Grid, Tag, CheckCircle2, Bookmark, Trash2, FolderHeart, Plus, ArrowLeft } from 'lucide-react';

export default function TemplateLibrary({ onBack, onSelectTemplate }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [myTemplatesList, setMyTemplatesList] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setMyTemplatesList(getMyTemplates());
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const categories = [
    { id: 'all', label: 'All Online Templates' },
    { id: 'mytemplates', label: 'My Templates / મારા ટેમ્પલેટ્સ', count: myTemplatesList.length },
    { id: 'festivals', label: 'Festivals & Offers' },
    { id: 'social', label: 'Social Media' },
    { id: 'business', label: 'Business & Food' },
    { id: 'branding', label: 'Branding & Cards' },
    { id: 'marketing', label: 'Marketing & Banners' },
    { id: 'posters', label: 'Print Posters' },
  ];

  const handleSaveToMyTemplates = (template, e) => {
    e.stopPropagation();
    const saved = saveMyTemplate(template);
    if (saved) {
      setMyTemplatesList(getMyTemplates());
      showToast(`Saved "${template.title}" to My Templates!`);
    }
  };

  const handleDeleteFromMyTemplates = (templateId, e) => {
    e.stopPropagation();
    const updated = deleteMyTemplate(templateId);
    setMyTemplatesList(updated);
    showToast('Template deleted from My Templates');
  };

  const currentTemplateList = selectedCategory === 'mytemplates' ? myTemplatesList : STARTER_TEMPLATES;

  const filteredTemplates = currentTemplateList.filter((tpl) => {
    const matchesCategory = selectedCategory === 'all' || selectedCategory === 'mytemplates' || tpl.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (tpl.title && tpl.title.toLowerCase().includes(query)) ||
      (tpl.subtitle && tpl.subtitle.toLowerCase().includes(query)) ||
      (tpl.badge && tpl.badge.toLowerCase().includes(query)) ||
      (tpl.tagline && tpl.tagline.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px 60px' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
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
          <CheckCircle2 style={{ width: '18px', height: '18px' }} /> {toastMessage}
        </div>
      )}

      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '36px',
        borderRadius: '24px',
        marginBottom: '32px',
        background: 'linear-gradient(135deg, rgba(121, 40, 202, 0.15) 0%, rgba(0, 223, 216, 0.15) 50%, rgba(255, 0, 128, 0.1) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div style={{ maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            {onBack && (
              <button
                onClick={onBack}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '99px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFF',
                  fontSize: '12px',
                  fontWeight: '700',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft style={{ width: '14px', height: '14px' }} /> ← Back (પાછા જાઓ)
              </button>
            )}

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 14px',
              borderRadius: '99px',
              background: 'rgba(0, 223, 216, 0.15)',
              color: '#00DFD8',
              fontSize: '12px',
              fontWeight: '700',
              border: '1px solid rgba(0, 223, 216, 0.3)'
            }}>
              <Sparkles style={{ width: '14px', height: '14px' }} /> ONLINE TEMPLATE HUB 2026
            </div>
          </div>

          <h1 className="font-syne" style={{ fontSize: '36px', fontWeight: '800', color: '#FFF', lineHeight: '1.1', marginBottom: '12px' }}>
            {selectedCategory === 'mytemplates' ? (
              <>My Saved <span style={{ color: '#00DFD8' }}>Templates</span> (મારા ટેમ્પલેટ્સ)</>
            ) : (
              <>Ready-to-Use <span style={{ color: '#00DFD8' }}>Design Templates</span></>
            )}
          </h1>

          <p style={{ fontSize: '15px', color: '#CBD5E1', lineHeight: '1.6', margin: 0 }}>
            {selectedCategory === 'mytemplates'
              ? 'Your personal library of custom saved designs and bookmarked templates. Open and customize them anytime.'
              : 'No need to search external websites! Browse professional, high-resolution templates for social posts, festival offers, business cards, restaurant menus, and print posters right here.'
            }
          </p>
        </div>

        {/* Quick Feature Stats & My Templates Switcher */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('mytemplates')}
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              background: selectedCategory === 'mytemplates' ? 'linear-gradient(135deg, #00DFD8 0%, #7928CA 100%)' : 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(0, 223, 216, 0.4)',
              color: '#FFF',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '4px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FolderHeart style={{ width: '18px', height: '18px', color: '#FF0080' }} />
              <span className="font-syne" style={{ fontSize: '20px', fontWeight: '800' }}>{myTemplatesList.length}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#CBD5E1' }}>My Templates</div>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px',
        background: 'rgba(15, 23, 42, 0.4)',
        padding: '16px 20px',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {/* Category Tabs */}
        <div className="mobile-scroll-tabs" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: isActive ? '1px solid #00DFD8' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: isActive ? 'rgba(0, 223, 216, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? '#00DFD8' : '#94A3B8',
                  fontSize: '13px',
                  fontWeight: isActive ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {cat.id === 'mytemplates' && <Bookmark style={{ width: '14px', height: '14px', color: '#FF0080' }} />}
                {cat.label}
                {cat.count !== undefined && (
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '99px',
                    background: 'rgba(255, 0, 128, 0.2)',
                    color: '#FF0080',
                    fontWeight: '700'
                  }}>
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#64748B' }} />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFF',
              fontSize: '13px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Templates Grid Showcase */}
      {filteredTemplates.length === 0 ? (
        <div className="glass-panel" style={{ padding: '60px 24px', textAlign: 'center', borderRadius: '20px', color: '#94A3B8' }}>
          {selectedCategory === 'mytemplates' ? (
            <div>
              <FolderHeart style={{ width: '48px', height: '48px', margin: '0 auto 16px', color: '#00DFD8', opacity: 0.8 }} />
              <h3 className="font-syne" style={{ fontSize: '20px', color: '#FFF', marginBottom: '8px' }}>No Saved Templates Yet (હજી કોઈ ટેમ્પલેટ સેવ નથી)</h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', maxWidth: '480px', margin: '0 auto 24px' }}>
                You can save any template from the Online Hub or save your designs directly from the Graphic Studio canvas!
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #00DFD8 0%, #7928CA 100%)',
                  color: '#FFF',
                  fontWeight: '700',
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Browse Online Templates
              </button>
            </div>
          ) : (
            <div>
              <Search style={{ width: '40px', height: '40px', margin: '0 auto 12px', opacity: 0.5 }} />
              <div style={{ fontSize: '16px', fontWeight: '600' }}>No templates matching your search</div>
              <div style={{ fontSize: '13px', marginTop: '4px' }}>Try switching categories or clearing search query.</div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredTemplates.map((template) => {
            const format = MEDIA_FORMATS.find((f) => f.id === template.formatId) || MEDIA_FORMATS[0];
            const isSaved = isMyTemplate(template.id);

            return (
              <div
                key={template.id}
                className="glass-panel"
                style={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(0, 223, 216, 0.4)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 223, 216, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Visual Preview Box */}
                <div style={{
                  height: '240px',
                  position: 'relative',
                  background: template.bgColor || '#0D0C0A',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px'
                }}>
                  {template.backgroundImage ? (
                    <img
                      src={template.backgroundImage}
                      alt={template.title}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.85
                      }}
                    />
                  ) : (
                    <div style={{
                      textAlign: template.align || 'center',
                      zIndex: 2,
                      maxWidth: '90%'
                    }}>
                      <div className="font-syne" style={{
                        fontSize: '24px',
                        fontWeight: '800',
                        color: template.primaryColor || '#FFF',
                        lineHeight: '1.2',
                        marginBottom: '8px'
                      }}>
                        {template.title}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: template.accentColor || '#00DFD8',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {template.subtitle}
                      </div>
                    </div>
                  )}

                  {/* Bookmark / Save to My Templates Button */}
                  <button
                    onClick={(e) => handleSaveToMyTemplates(template, e)}
                    title={isSaved ? "Saved to My Templates" : "Save to My Templates"}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      zIndex: 10,
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: isSaved ? '#FF0080' : 'rgba(5, 6, 8, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#FFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Bookmark style={{ width: '16px', height: '16px', fill: isSaved ? '#FFF' : 'none' }} />
                  </button>

                  {/* Badge overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'rgba(5, 6, 8, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#00DFD8',
                    fontSize: '10px',
                    fontWeight: '800',
                    letterSpacing: '0.5px',
                    border: '1px solid rgba(0, 223, 216, 0.3)'
                  }}>
                    {template.badge || 'MY TEMPLATE'}
                  </div>

                  {/* Format tag overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'rgba(5, 6, 8, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFF',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    {format.displaySize}
                  </div>
                </div>

                {/* Content info & load button */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <h3 className="font-syne" style={{ fontSize: '18px', fontWeight: '700', color: '#FFF', margin: 0 }}>
                        {template.title}
                      </h3>

                      {/* Delete button if in My Templates view or custom template */}
                      {(selectedCategory === 'mytemplates' || template.isCustom) && (
                        <button
                          onClick={(e) => handleDeleteFromMyTemplates(template.id, e)}
                          title="Delete from My Templates"
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#EF4444',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '11px'
                          }}
                        >
                          <Trash2 style={{ width: '13px', height: '13px' }} />
                        </button>
                      )}
                    </div>

                    <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 14px 0', lineHeight: '1.4' }}>
                      {template.subtitle}
                    </p>

                    {/* Color Swatch Dots */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>Palette:</span>
                      {[template.primaryColor, template.secondaryColor, template.bgColor, template.accentColor].filter(Boolean).map((color, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '99px',
                            background: color,
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Action button */}
                  <button
                    onClick={() => onSelectTemplate(template)}
                    className="font-space"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #00DFD8 0%, #7928CA 100%)',
                      color: '#FFF',
                      fontWeight: '700',
                      fontSize: '13px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(0, 223, 216, 0.2)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Edit3 style={{ width: '15px', height: '15px' }} /> Customize in Studio <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
