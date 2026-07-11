import React from 'react';
import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

const TRAVEL: { region: string; items: string[] }[] = [
  { region: 'Americas', items: ['United States', 'Canada', 'Mexico', 'Argentina', 'Uruguay'] },
  { region: 'Africa', items: ['South Africa', 'Mozambique', 'Namibia'] },
  { region: 'Europe', items: ['England', 'Scotland', 'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Portugal', 'Czech Republic', 'Greece'] },
  { region: 'Asia & Oceania', items: ['India', 'Thailand', 'Australia'] },
];

/** The tree room: the person behind the projects. */
export const AboutContent: React.FC = () => (
  <div>
    <img
      src={`${BASE}images/hero-portrait.png`}
      alt="Jean-Paul Wilson"
      style={{
        width: 132,
        height: 132,
        objectFit: 'cover',
        border: '1px solid #8a6a3b',
        borderRadius: 3,
        float: 'right',
        marginLeft: 14,
        marginBottom: 8,
      }}
    />
    <p>
      I&rsquo;m <strong>Jean-Paul Wilson</strong> — a software engineer with 8+ years building
      production systems front and back: APIs, data pipelines, infrastructure, and lately{' '}
      <strong>AI agents</strong> with proper evals, tracing, and cost discipline.
    </p>
    <p>
      I moved to the US from South Africa in 2017. I&rsquo;ve been a senior engineer at{' '}
      <strong>VillageMD</strong> (patient onboarding across clinics — React, FastAPI, EMR
      integrations, AWS), <strong>C.H. Robinson</strong> (APIs and automation in a large .NET
      ecosystem), and <strong>First Stop Health</strong> (early telehealth — Django, React).
      Most recently: <strong>The Gauntlet</strong>, an intensive AI-engineering program —
      a shipped project every week.
    </p>

    <h2 className="room-section-title">Feats of Endurance</h2>
    <div className="room-stat">
      <span className="room-stat-emoji">🏅</span>
      <span>
        <span className="room-stat-label">NYC Marathon</span>
        <span className="room-stat-value">3:27</span>
        <span className="room-stat-sub">26.2 miles · 7:56/mi</span>
      </span>
    </div>

    <h2 className="room-section-title">Lands Traveled</h2>
    {TRAVEL.map((r) => (
      <p key={r.region} style={{ margin: '4px 0' }}>
        <strong>{r.region}:</strong> {r.items.join(', ')}
      </p>
    ))}

    <div className="me-links" style={{ marginTop: 16 }}>
      <Link className="me-btn" to="/about">
        Full bio &amp; tech stack →
      </Link>
    </div>
  </div>
);
