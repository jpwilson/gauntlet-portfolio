import React from 'react';

export const PipeDream: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 11, padding: '2px 4px', background: '#c0c0c0', borderBottom: '1px solid #808080' }}>
        Pipe Dream - Connect the pipes before the ooze flows!
      </div>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#c0c0c0',
        padding: 16,
      }}>
        <div style={{
          border: '2px inset #c0c0c0',
          padding: 24,
          background: '#ffffff',
          textAlign: 'center',
          maxWidth: 400,
        }}>
          <h3 style={{ fontSize: 16, marginBottom: 8, color: '#008000', fontStyle: 'italic' }}>
            Pipe Dream
          </h3>
          <p style={{ fontSize: 14, marginBottom: 4 }}>
            For Microsoft Windows
          </p>
          <p style={{ fontSize: 10, color: '#808080', marginBottom: 16 }}>
            TM and (C) 1991 LucasArts Entertainment Company.
            <br />
            All rights reserved.
          </p>
          <p style={{ fontSize: 11, marginBottom: 12 }}>
            This game is being loaded from the Information Superhighway...
          </p>
          <a
            href="https://www.pipedreamgame.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0000ff', fontSize: 11 }}
          >
            Play Pipe Dream Online
          </a>
          <br />
          <br />
          <a
            href="https://archive.org/details/pipe-dream"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0000ff', fontSize: 11 }}
          >
            Play on Internet Archive
          </a>
        </div>
      </div>
    </div>
  );
};
