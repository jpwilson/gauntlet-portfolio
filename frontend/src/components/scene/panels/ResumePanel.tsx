import React from 'react';

const BASE = import.meta.env.BASE_URL;
const RESUME = `${BASE}JPWilsonResume.pdf`;

export const ResumePanel: React.FC = () => (
  <div>
    {/* Buttons first: many mobile browsers refuse inline PDF embeds. */}
    <div className="me-links" style={{ marginBottom: 14 }}>
      <a className="me-btn" href={RESUME} target="_blank" rel="noopener noreferrer">
        Unfurl in a new window ↗
      </a>
      <a className="me-btn ghost" href={RESUME} download="JPWilsonResume.pdf">
        ⭳ Take a copy
      </a>
    </div>
    <object className="me-resume-embed" data={RESUME} type="application/pdf" aria-label="Resume of Jean-Paul Wilson">
      <p style={{ padding: 14 }}>
        This looking-glass cannot render the scroll here — use the buttons above to read or keep it.
      </p>
    </object>
  </div>
);
