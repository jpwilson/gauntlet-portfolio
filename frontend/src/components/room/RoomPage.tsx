import React, { useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getRoom } from '../../data/rooms';
import { ProjectsPanel } from '../scene/panels/ProjectsPanel';
import { ResumePanel } from '../scene/panels/ResumePanel';
import { ContactPanel } from '../scene/panels/ContactPanel';
import { AboutContent } from './AboutContent';

/**
 * An interior room (/in/:roomId): full-screen pannable scene with the content
 * in a retro-game panel. Reached by walking through a landmark outside.
 */
const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const room = getRoom(roomId);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Same body scoping as the outdoor scene (suppresses cyberpunk chrome).
  useEffect(() => {
    document.body.classList.add('view-scene');
    return () => {
      document.body.classList.remove('view-scene');
    };
  }, []);

  // Enter centered on the artwork.
  useEffect(() => {
    const el = viewportRef.current;
    if (el) {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
    }
  }, []);

  // Escape walks back outside.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  useEffect(() => {
    if (!room) navigate('/', { replace: true });
  }, [room, navigate]);

  if (!room) return null;

  return (
    <div className="room-root">
      <div ref={viewportRef} className="scene-viewport">
        <div className="scene-stage room-stage" style={{ '--scene-ar': room.aspect } as React.CSSProperties}>
          <img className="scene-media" src={room.image} alt="" aria-hidden="true" />
        </div>
      </div>

      <Link className="me-plaque room-back" to="/">
        ⟵ Back to the Realm
      </Link>

      <section className="room-panel" aria-label={room.title}>
        <header className="room-panel-header">
          <h1 className="room-title">{room.title}</h1>
          <p className="room-subtitle">{room.subtitle}</p>
        </header>
        <div className="room-panel-body me-panel-body">
          {room.content === 'projects' && (
            <>
              <h2 className="room-section-title">The Gauntlet</h2>
              <ProjectsPanel category="gauntlet" />
              <h2 className="room-section-title" style={{ marginTop: 22 }}>
                Other Projects
              </h2>
              <ProjectsPanel category="other" />
            </>
          )}
          {room.content === 'about' && <AboutContent />}
          {room.content === 'resume-contact' && (
            <>
              <ResumePanel />
              <h2 className="room-section-title" style={{ marginTop: 22 }}>
                Send a Raven
              </h2>
              <ContactPanel />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default RoomPage;
