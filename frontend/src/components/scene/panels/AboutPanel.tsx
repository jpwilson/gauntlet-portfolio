import React from 'react';
import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

export const AboutPanel: React.FC = () => (
  <div>
    <img
      src={`${BASE}images/hero-portrait.png`}
      alt="Jean-Paul Wilson"
      style={{
        width: 140,
        height: 140,
        objectFit: 'cover',
        border: '1px solid #8a6a3b',
        borderRadius: 3,
        float: 'right',
        marginLeft: 14,
        marginBottom: 8,
      }}
    />
    <p>
      Hail, traveler. I am <strong>Jean-Paul Wilson</strong> — a software engineer of eight-plus
      years, forging production systems front and back: APIs, data pipelines, infrastructure, and
      of late, <strong>AI agents</strong> with proper evals, tracing, and cost discipline.
    </p>
    <p>
      I crossed the sea from South Africa in 2017 and have since served at{' '}
      <strong>VillageMD</strong> (senior engineer — patient onboarding across clinics, React,
      FastAPI, EMR integrations, AWS), <strong>C.H. Robinson</strong> (APIs and automation in a
      vast .NET kingdom), and <strong>First Stop Health</strong> (an early telehealth platform,
      Django and React).
    </p>
    <p>
      Most recently I endured <strong>The Gauntlet</strong> — an intensive AI-engineering
      program — shipping a project every week: agents, RAG systems, MCP servers, eval harnesses.
      Those trials live behind the round door in the hillside.
    </p>
    <div className="me-links">
      <Link className="me-btn" to="/about">
        The full tale →
      </Link>
      <Link className="me-btn ghost" to="/loc/oak-tree">
        The Scroll of Deeds
      </Link>
    </div>
  </div>
);
