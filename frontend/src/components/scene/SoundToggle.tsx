import React, { useEffect, useRef, useState } from 'react';

/**
 * Ambient sound, synthesized in WebAudio — no audio asset needed.
 * Brown noise through a low-pass filter reads as a distant river; a slow LFO
 * on the gain adds a breath of wind. Off by default; preference remembered.
 */
export const SoundToggle: React.FC = () => {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  const stop = () => {
    ctxRef.current?.close().catch(() => undefined);
    ctxRef.current = null;
  };

  const start = () => {
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // 4s of brown noise, looped — the river.
    const seconds = 4;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 420;

    const gain = ctx.createGain();
    gain.gain.value = 0.05;

    // Slow swell — the wind.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
    lfo.start();
  };

  const toggle = () => {
    if (on) {
      stop();
      localStorage.removeItem('me-sound');
      setOn(false);
    } else {
      start(); // user gesture -> autoplay policy satisfied
      localStorage.setItem('me-sound', '1');
      setOn(true);
    }
  };

  // Cleanup on unmount. (No auto-start on mount even if remembered —
  // browsers block audio without a gesture; the preference just pre-labels
  // the button so returning visitors know where they left it.)
  useEffect(() => stop, []);

  return (
    <button
      type="button"
      className="me-plaque sound-toggle"
      aria-pressed={on}
      aria-label={on ? 'Mute ambient sound' : 'Play ambient sound'}
      onClick={toggle}
    >
      {on ? '🔊' : '🔇'}
    </button>
  );
};
