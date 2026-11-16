'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProjectItem } from '@/src/lib/data/work';

interface ProjectFilterProps {
  projects: ProjectItem[];
}

export default function ProjectFilter({ projects }: ProjectFilterProps) {
  const [filter, setFilter] = useState<'all' | 'website' | 'webapp' | 'ecommerce'>('all');

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  return (
    <>
      <div className="project-filter-container" aria-label="Filter projects by category">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Projects
        </button>
        <button
          className={`filter-btn ${filter === 'website' ? 'active' : ''}`}
          onClick={() => setFilter('website')}
        >
          Websites
        </button>
        <button
          className={`filter-btn ${filter === 'webapp' ? 'active' : ''}`}
          onClick={() => setFilter('webapp')}
        >
          Web Apps
        </button>
        <button
          className={`filter-btn ${filter === 'ecommerce' ? 'active' : ''}`}
          onClick={() => setFilter('ecommerce')}
        >
          E-Commerce
        </button>
      </div>

      <div className="projects-modern-grid">
        {filteredProjects.map((project) => (
          <article className="project-modern-card" key={project.id}>
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

            <div className="project-card-content">
              <h3>{project.title}</h3>
              <p>{project.shortDesc}</p>
              <div className="project-tech-chips">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-action-row">
                <Link className="project-live-btn" href={project.caseStudyUrl || `/work/${project.slug}`}>
                  Case Study &rarr;
                </Link>
                {project.liveUrl && (
                  <a
                    className="project-live-btn"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: 'transparent', border: '1px solid var(--accent-cyan)', color: 'var(--accent-cyan)' }}
                  >
                    Live Demo &rarr;
                  </a>
                )}
                <span className="project-status-label">{project.badge}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
