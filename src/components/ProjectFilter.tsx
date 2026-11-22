'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProjectItem } from '@/src/lib/data/work';

interface ProjectFilterProps {
  projects: ProjectItem[];
  maxItems?: number;
  initialService?: string;
  showSearch?: boolean;
}

export default function ProjectFilter({
  projects,
  maxItems,
  initialService,
  showSearch = true,
}: ProjectFilterProps) {
  // Option 1 Mode: 'featured' (Top 8 Flagships) by default, or 'all' (All 33)
  const [viewMode, setViewMode] = useState<'featured' | 'all'>('featured');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>(initialService || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique services from projects for the dropdown
  const serviceOptions = useMemo(() => {
    const map = new Map<string, string>();
    projects.forEach((p) => {
      if (p.serviceSlug && p.serviceName) {
        map.set(p.serviceSlug, p.serviceName);
      }
    });
    return Array.from(map.entries()).map(([slug, name]) => ({
      slug,
      name,
      count: projects.filter((p) => p.serviceSlug === slug).length,
    }));
  }, [projects]);

  // Is user actively searching or filtering by a category/service?
  const isCustomFiltered =
    categoryFilter !== 'all' || serviceFilter !== 'all' || searchQuery.trim().length > 0;

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Service Filter
      if (serviceFilter !== 'all' && project.serviceSlug !== serviceFilter) {
        return false;
      }

      // 2. Category Filter
      if (categoryFilter !== 'all') {
        if (categoryFilter === 'website' && project.category !== 'website') return false;
        if (categoryFilter === 'webapp' && project.category !== 'webapp') return false;
        if (categoryFilter === 'ecommerce' && project.category !== 'ecommerce') return false;
        if (categoryFilter === 'mobile' && project.category !== 'mobile') return false;
        if (categoryFilter === 'cloud' && project.category !== 'cloud') return false;
        if (categoryFilter === 'security' && project.category !== 'security') return false;
        if (categoryFilter === 'ai' && project.category !== 'ai' && project.category !== 'analytics') return false;
      }

      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesClient = project.client.toLowerCase().includes(q);
        const matchesService = project.serviceName.toLowerCase().includes(q);
        const matchesTech = project.technologies.some((t) => t.toLowerCase().includes(q));
        const matchesDesc = project.shortDesc.toLowerCase().includes(q);
        if (!matchesTitle && !matchesClient && !matchesService && !matchesTech && !matchesDesc) {
          return false;
        }
      }

      // 4. Default Featured Mode (Option 1): If no custom filter active and viewMode is 'featured'
      if (!isCustomFiltered && viewMode === 'featured') {
        return Boolean(project.featured);
      }

      return true;
    });
  }, [projects, categoryFilter, serviceFilter, searchQuery, isCustomFiltered, viewMode]);

  const displayedProjects = maxItems ? filteredProjects.slice(0, maxItems) : filteredProjects;

  return (
    <div className="project-filter-section">
      {/* Option 1: Top Mode Switcher (Flagship vs Full Archive) */}
      {!maxItems && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div className="portfolio-mode-toggle" role="tablist" aria-label="Portfolio curation modes">
            <button
              type="button"
              className={`portfolio-mode-btn ${viewMode === 'featured' && !isCustomFiltered ? 'active' : ''}`}
              onClick={() => {
                setViewMode('featured');
                setCategoryFilter('all');
                setServiceFilter('all');
                setSearchQuery('');
              }}
              role="tab"
              aria-selected={viewMode === 'featured' && !isCustomFiltered}
            >
              <span>★ Curated Flagships (8)</span>
            </button>
            <button
              type="button"
              className={`portfolio-mode-btn ${viewMode === 'all' || isCustomFiltered ? 'active' : ''}`}
              onClick={() => setViewMode('all')}
              role="tab"
              aria-selected={viewMode === 'all' || isCustomFiltered}
            >
              <span>Browse All 33 Projects (16 Services)</span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Controls Bar: Categories + Service Dropdown + Search */}
      <div className="project-filter-controls">
        {/* Category Pills */}
        <div className="project-filter-container" aria-label="Filter projects by category">
          <button
            type="button"
            className={`filter-btn ${categoryFilter === 'all' && !isCustomFiltered && viewMode === 'featured' ? 'active' : ''}`}
            onClick={() => {
              setCategoryFilter('all');
              setServiceFilter('all');
              setSearchQuery('');
              setViewMode('featured');
            }}
          >
            ★ Flagships (8)
          </button>
          <button
            type="button"
            className={`filter-btn ${categoryFilter === 'all' && (viewMode === 'all' || isCustomFiltered) ? 'active' : ''}`}
            onClick={() => {
              setCategoryFilter('all');
              setViewMode('all');
            }}
          >
            All Disciplines ({projects.length})
          </button>
          <button
            type="button"
            className={`filter-btn ${categoryFilter === 'website' ? 'active' : ''}`}
            onClick={() => {
              setCategoryFilter('website');
              setViewMode('all');
            }}
          >
            Websites
          </button>
          <button
            type="button"
            className={`filter-btn ${categoryFilter === 'webapp' ? 'active' : ''}`}
            onClick={() => {
              setCategoryFilter('webapp');
              setViewMode('all');
            }}
          >
            Web Apps &amp; SaaS
          </button>
          <button
            type="button"
            className={`filter-btn ${categoryFilter === 'mobile' ? 'active' : ''}`}
            onClick={() => {
              setCategoryFilter('mobile');
              setViewMode('all');
            }}
          >
            Mobile Apps
          </button>
          <button
            type="button"
            className={`filter-btn ${categoryFilter === 'cloud' ? 'active' : ''}`}
            onClick={() => {
              setCategoryFilter('cloud');
              setViewMode('all');
            }}
          >
            Cloud &amp; DevOps
          </button>
          <button
            type="button"
            className={`filter-btn ${categoryFilter === 'ai' ? 'active' : ''}`}
            onClick={() => {
              setCategoryFilter('ai');
              setViewMode('all');
            }}
          >
            AI &amp; BI
          </button>
          <button
            type="button"
            className={`filter-btn ${categoryFilter === 'security' ? 'active' : ''}`}
            onClick={() => {
              setCategoryFilter('security');
              setViewMode('all');
            }}
          >
            Cybersecurity
          </button>
          <button
            type="button"
            className={`filter-btn ${categoryFilter === 'ecommerce' ? 'active' : ''}`}
            onClick={() => {
              setCategoryFilter('ecommerce');
              setViewMode('all');
            }}
          >
            E-Commerce
          </button>
        </div>

        {/* Secondary Row: Specific Service Select Dropdown + Search */}
        <div className="project-subfilter-row">
          {/* Service Dropdown Selector */}
          <div className="project-service-select-wrapper">
            <label htmlFor="service-select" className="project-filter-label">
              Filter by Service:
            </label>
            <select
              id="service-select"
              className="project-service-select"
              value={serviceFilter}
              onChange={(e) => {
                setServiceFilter(e.target.value);
                if (e.target.value !== 'all') {
                  setViewMode('all');
                }
              }}
              aria-label="Filter by specific service discipline"
            >
              <option value="all">⚡ All 16 Service Disciplines ({projects.length} Projects)</option>
              {serviceOptions.map((opt) => (
                <option key={opt.slug} value={opt.slug}>
                  {opt.name} ({opt.count} {opt.count === 1 ? 'project' : 'projects'})
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          {showSearch && (
            <div className="project-search-wrapper">
              <input
                type="search"
                className="project-search-input"
                placeholder="Search projects, client, tech..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) {
                    setViewMode('all');
                  }
                }}
                aria-label="Search projects by keyword"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="project-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                >
                  &times;
                </button>
              )}
            </div>
          )}

          {/* Reset button if filtered */}
          {(serviceFilter !== 'all' || categoryFilter !== 'all' || searchQuery) && (
            <button
              type="button"
              className="project-reset-btn"
              onClick={() => {
                setCategoryFilter('all');
                setServiceFilter('all');
                setSearchQuery('');
                setViewMode('featured');
              }}
            >
              Reset to Flagships
            </button>
          )}
        </div>
      </div>

      {/* Active Results Count & Context Notice */}
      <div className="project-results-count">
        {!isCustomFiltered && viewMode === 'featured' ? (
          <span>
            Showing <strong>8 Curated Flagship Projects</strong> across core disciplines. (Select a service or click below to view all 33).
          </span>
        ) : (
          <span>
            Showing <strong>{displayedProjects.length}</strong> of {filteredProjects.length} matching {filteredProjects.length === 1 ? 'project' : 'projects'}
            {serviceFilter !== 'all' && (
              <span className="project-active-filter-badge">
                Service: {serviceOptions.find((o) => o.slug === serviceFilter)?.name || serviceFilter}
              </span>
            )}
          </span>
        )}
      </div>

      {/* Project Cards Grid */}
      {displayedProjects.length === 0 ? (
        <div className="project-empty-state">
          <p>No projects match your current filters.</p>
          <button
            type="button"
            className="bento-btn-glass"
            onClick={() => {
              setCategoryFilter('all');
              setServiceFilter('all');
              setSearchQuery('');
              setViewMode('featured');
            }}
          >
            Show Curated Flagships
          </button>
        </div>
      ) : (
        <div className="projects-modern-grid">
          {displayedProjects.map((project) => (
            <article className="project-modern-card" key={project.id}>
              {/* Browser Mockup Top Preview */}
              <div className="project-preview-wrap">
                <div className="browser-mockup-bar" aria-hidden="true">
                  <div className="browser-mockup-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span className="browser-mockup-url">{project.urlPreview}</span>
                </div>
                <picture>
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <span className="project-badge-tag">{project.categoryLabel}</span>
              </div>

              {/* Card Body Content */}
              <div className="project-card-content">
                {/* Service Affinity Eyebrow */}
                <div className="project-service-eyebrow">
                  <span className="live-pulse-dot" aria-hidden="true" style={{ width: '6px', height: '6px' }} />
                  <span>{project.serviceName}</span>
                </div>

                <h3>{project.title}</h3>
                <p>{project.shortDesc}</p>

                {/* Impact Metrics 3-Item Pill Row */}
                {project.impactMetrics && project.impactMetrics.length > 0 && (
                  <div className="project-impact-metrics">
                    {project.impactMetrics.map((metric, idx) => (
                      <div className="project-metric-pill" key={idx}>
                        <span className="metric-val">{metric.value}</span>
                        <span className="metric-lbl">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technology Chips */}
                <div className="project-tech-chips">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-chip-more">+{project.technologies.length - 4}</span>
                  )}
                </div>

                {/* Action Row */}
                <div className="project-action-row">
                  <Link className="project-live-btn" href={project.caseStudyUrl || `/work/${project.slug}`}>
                    <span>Case Study &rarr;</span>
                  </Link>
                  {project.liveUrl && (
                    <a
                      className="project-live-btn"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--accent-cyan)',
                        color: 'var(--accent-cyan)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                      }}
                    >
                      Live Demo &nearr;
                    </a>
                  )}
                  <span className="project-status-label">{project.badge}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Option 1 Bottom Expand / Return Banner */}
      {!maxItems && (
        <>
          {viewMode === 'featured' && !isCustomFiltered ? (
            <div className="portfolio-expand-banner">
              <div className="portfolio-expand-info">
                <h4>Looking for engineering in another discipline?</h4>
                <p>
                  We offer 16 specialized IT disciplines with dedicated case studies for every service — including Cloud, AI, Cybersecurity, E-Commerce, and Managed IT.
                </p>
              </div>
              <button
                type="button"
                className="bento-btn-primary"
                onClick={() => setViewMode('all')}
                style={{ padding: '12px 24px', fontSize: '0.92rem' }}
              >
                <span>Explore All 33 Projects in Archive &darr;</span>
              </button>
            </div>
          ) : (
            <div className="portfolio-expand-banner" style={{ justifyContent: 'center' }}>
              <button
                type="button"
                className="bento-btn-glass"
                onClick={() => {
                  setViewMode('featured');
                  setCategoryFilter('all');
                  setServiceFilter('all');
                  setSearchQuery('');
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
              >
                <span>&uarr; Return to Curated Flagship Projects (8)</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
