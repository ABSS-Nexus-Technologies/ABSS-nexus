'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Development',
    budget: '₹25,000 - ₹50,000',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please reach out on WhatsApp.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network connection error. Please message us on WhatsApp directly.');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ padding: '32px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid #10b981', borderRadius: '12px', textAlign: 'center' }}>
        <h3 style={{ color: '#047857', marginBottom: '8px' }}>Inquiry Received Successfully!</h3>
        <p style={{ color: 'var(--color-near-black)', margin: 0 }}>
          Thank you, <strong>{formData.name}</strong>. Our founder Shubham Kumar will review your technical requirements and respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {status === 'error' && (
        <div style={{ padding: '14px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#b91c1c', marginBottom: '16px', fontSize: '0.9rem' }}>
          {errorMessage}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="form-group">
          <label htmlFor="name" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
            Your Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Aman Verma"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="aman@example.com"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
        <div className="form-group">
          <label htmlFor="phone" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
            Phone / WhatsApp Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="service" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
            Primary Service Required
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}
          >
            <option value="Website Development">Custom Website Development</option>
            <option value="Software Development">Custom Software Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="UI/UX Design">UI/UX Design &amp; Prototyping</option>
            <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
            <option value="Cloud & DevOps">Cloud Computing &amp; DevOps</option>
            <option value="Cybersecurity">Cybersecurity &amp; Hardening</option>
            <option value="Data Analytics & BI">Data Analytics &amp; BI</option>
            <option value="E-Commerce Development">E-Commerce Storefront</option>
            <option value="SaaS Development">SaaS Platform Development</option>
            <option value="Managed IT Support">Managed IT Support</option>
          </select>
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '16px' }}>
        <label htmlFor="budget" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
          Estimated Budget Range
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}
        >
          <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000 (Landing Page / Starter)</option>
          <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (Full Business Website)</option>
          <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000 (Custom Portal / E-Commerce)</option>
          <option value="₹1,00,000+">₹1,00,000+ (Enterprise SaaS & Architecture)</option>
        </select>
      </div>

      <div className="form-group" style={{ marginTop: '16px' }}>
        <label htmlFor="message" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
          Project Scope &amp; Goals *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly describe your business, existing website URL (if any), and key outcomes..."
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-glow-cyan"
        style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}
      >
        {status === 'loading' ? 'Submitting Inquiry...' : 'Submit Project Inquiry →'}
      </button>
    </form>
  );
}
