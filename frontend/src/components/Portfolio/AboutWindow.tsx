import React from 'react';
import { Win95Icon } from '../shared/Win95Icon';

export const AboutWindow: React.FC = () => {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
        <Win95Icon type="computer" size={48} />
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
            My Computer
          </h2>
          <p style={{ fontSize: 11, color: '#808080' }}>
            Portfolio OS v95.0
          </p>
        </div>
      </div>

      <fieldset style={{ marginBottom: 12 }}>
        <legend>About</legend>
        <p style={{ fontSize: 11, lineHeight: 1.6, padding: 4 }}>
          Welcome to my portfolio! I'm a software developer currently building
          projects through The Gauntlet program. This Windows 95-themed site
          showcases my work — explore the desktop icons or fire up the Command
          Prompt for a retro terminal experience.
        </p>
      </fieldset>

      <fieldset style={{ marginBottom: 12 }}>
        <legend>System Properties</legend>
        <table style={{ fontSize: 11, width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ padding: '2px 8px', fontWeight: 'bold' }}>Developer:</td>
              <td style={{ padding: '2px 8px' }}>Portfolio Owner</td>
            </tr>
            <tr>
              <td style={{ padding: '2px 8px', fontWeight: 'bold' }}>Program:</td>
              <td style={{ padding: '2px 8px' }}>The Gauntlet</td>
            </tr>
            <tr>
              <td style={{ padding: '2px 8px', fontWeight: 'bold' }}>OS:</td>
              <td style={{ padding: '2px 8px' }}>Portfolio 95 (Build 1995)</td>
            </tr>
            <tr>
              <td style={{ padding: '2px 8px', fontWeight: 'bold' }}>RAM:</td>
              <td style={{ padding: '2px 8px' }}>640KB ought to be enough</td>
            </tr>
          </tbody>
        </table>
      </fieldset>

      <fieldset>
        <legend>Contact</legend>
        <div style={{ fontSize: 11, padding: 4 }}>
          <p>Update these links with your actual contact info!</p>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
            <li style={{ padding: '2px 0' }}>
              <Win95Icon type="internet" size={16} /> GitHub: <a href="#" style={{ color: '#0000ff' }}>github.com/yourname</a>
            </li>
            <li style={{ padding: '2px 0' }}>
              <Win95Icon type="internet" size={16} /> LinkedIn: <a href="#" style={{ color: '#0000ff' }}>linkedin.com/in/yourname</a>
            </li>
            <li style={{ padding: '2px 0' }}>
              <Win95Icon type="file" size={16} /> Email: <a href="mailto:you@example.com" style={{ color: '#0000ff' }}>you@example.com</a>
            </li>
          </ul>
        </div>
      </fieldset>

      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <button style={{ padding: '4px 24px' }}>OK</button>
      </div>
    </div>
  );
};
