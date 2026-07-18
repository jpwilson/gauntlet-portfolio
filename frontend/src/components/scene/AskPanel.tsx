import React, { useRef, useState } from 'react';
import { ASK_ENDPOINT } from '../../data/askConfig';

interface Turn {
  role: 'you' | 'archivist';
  text: string;
}

/**
 * "Ask about my work" — a retro chat window backed by the ask-agent service
 * (an LLM grounded in the portfolio's real project data). Renders nothing
 * until ASK_ENDPOINT is configured.
 */
export const AskPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [question, setQuestion] = useState('');
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  if (!ASK_ENDPOINT) return null;

  const send = async () => {
    const q = question.trim();
    if (!q || busy) return;
    setQuestion('');
    setTurns((t) => [...t, { role: 'you', text: q }]);
    setBusy(true);
    try {
      const res = await fetch(`${ASK_ENDPOINT}/ask`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json().catch(() => null);
      const answer = res.ok
        ? (data?.answer ?? 'The archivist gave no answer.')
        : (data?.detail ?? 'The archives are unreachable — try again shortly.');
      setTurns((t) => [...t, { role: 'archivist', text: answer }]);
    } catch {
      setTurns((t) => [...t, { role: 'archivist', text: 'The archives are unreachable — try again shortly.' }]);
    } finally {
      setBusy(false);
      // Scroll after the answer renders (imperative DOM, next frame).
      requestAnimationFrame(() => {
        logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
      });
    }
  };

  return (
    <div className="ask">
      {open && (
        <section className="ask-panel" aria-label="Ask about JP's work">
          <header className="ask-header">
            <span>🔮 The Archivist</span>
            <button type="button" className="me-close" onClick={() => setOpen(false)}>
              ✕
            </button>
          </header>
          <div ref={logRef} className="ask-log">
            {turns.length === 0 && (
              <p className="ask-hint">
                An AI grounded in this portfolio&rsquo;s real project data. Try:
                &ldquo;Has JP built RAG systems?&rdquo; or &ldquo;What eval experience does he have?&rdquo;
              </p>
            )}
            {turns.map((t, i) => (
              <p key={i} className={`ask-turn ask-${t.role}`}>
                <strong>{t.role === 'you' ? 'You' : 'Archivist'}:</strong> {t.text}
              </p>
            ))}
            {busy && <p className="ask-turn ask-archivist ask-busy">Consulting the archives…</p>}
          </div>
          <form
            className="ask-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <input
              className="ask-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about JP's work…"
              maxLength={500}
              aria-label="Your question"
            />
            <button type="submit" className="me-btn" disabled={busy || !question.trim()}>
              Ask
            </button>
          </form>
        </section>
      )}
      <button
        type="button"
        className="me-plaque ask-toggle"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        🔮 Ask About My Work
      </button>
    </div>
  );
};
