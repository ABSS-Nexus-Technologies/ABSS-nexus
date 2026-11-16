'use client';

import React, { useState } from 'react';
import { FaqItem } from '@/src/lib/data/faq';

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="agency-faq-wrapper">
      {items.map((item) => {
        const isOpen = !!openIds[item.id];
        return (
          <div className="agency-faq-card" key={item.id}>
            <button
              className="faq-agency-btn"
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-ans-${item.id}`}
              onClick={() => toggle(item.id)}
            >
              <span>{item.question}</span>
              <svg
                className="faq-chevron-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease'
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {isOpen && (
              <div className="faq-agency-answer" id={`faq-ans-${item.id}`}>
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
