import React from 'react';

export const SkiFree: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 11, padding: '2px 4px', background: '#c0c0c0', borderBottom: '1px solid #808080' }}>
        SkiFree - Use arrow keys to ski! Watch out for the Yeti!
      </div>
      <iframe
        src="https://basicallydan.github.io/skifree.js/"
        style={{
          flex: 1,
          border: 'none',
          width: '100%',
          background: '#ffffff',
        }}
        title="SkiFree"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};
