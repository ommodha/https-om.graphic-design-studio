import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { PORTFOLIO_ITEMS } from '../../data/portfolioItems';
import { Search, FolderOpen, Filter } from 'lucide-react';

export default function RecentProjects({ onEditProject, onExportProject }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredItems = PORTFOLIO_ITEMS.filter(item => {
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      {/* Header & Filter Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <h3 className="font-syne" style={{ fontSize: '18px', fontWeight: '700', color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FolderOpen style={{ width: '18px', height: '18px', color: '#FF0080' }} /> RECENT DESIGNS & PROJECTS
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search style={{ width: '14px', height: '14px', color: '#94A3B8', position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px 8px 32px',
                borderRadius: '8px',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFF',
                fontSize: '12px',
                outline: 'none'
              }}
            />
          </div>

          {/* Category Filter Select */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFF',
              fontSize: '12px',
              outline: 'none'
            }}
          >
            <option value="all">All Categories</option>
            <option value="branding">Brand Identity</option>
            <option value="print">Offset Print</option>
            <option value="digital">Digital Social</option>
            <option value="editorial">Editorial Poster</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredItems.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredItems.map(item => (
            <ProjectCard
              key={item.id}
              project={item}
              onEdit={onEditProject}
              onExport={onExportProject}
            />
          ))}
        </div>
      ) : (
        <div style={{ padding: '48px', textAlign: 'center', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '16px', border: '1px dashed rgba(255, 255, 255, 0.1)', color: '#94A3B8' }}>
          No design projects found matching "{searchQuery}".
        </div>
      )}
    </div>
  );
}
