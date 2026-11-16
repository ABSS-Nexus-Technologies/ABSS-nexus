'use client';

import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('abss_theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'dark'; // Default to modern dark mode or saved preference
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    if (initialTheme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('agency-light-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('agency-light-theme');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('abss_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('agency-light-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('agency-light-theme');
    }
  };

  if (!mounted) {
    return (
      <button
        className="theme-toggle-btn"
        type="button"
        aria-label="Toggle theme"
        title="Toggle Theme"
      >
        <span style={{ width: '20px', height: '20px' }}></span>
      </button>
    );
  }

  return (
    <button
      className="theme-toggle-btn"
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Bento Mode'}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Bento Mode'}
    >
      {theme === 'dark' ? (
        /* Sun Icon (Switch to Light) */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        /* Moon Icon (Switch to Dark) */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );
}
