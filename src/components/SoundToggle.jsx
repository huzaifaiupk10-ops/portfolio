import { useState, useEffect } from 'react';
import { isSoundOn, setSoundOn, onSoundChange, click } from '../lib/sfx';

// Navbar speaker button: turns the site's sound effects on/off (off by default).
export default function SoundToggle() {
  const [on, setOn] = useState(isSoundOn);
  useEffect(() => onSoundChange(setOn), []);
  const toggle = () => { const v = !on; setSoundOn(v); if (v) click({ volume: 0.25 }); };
  return (
    <button onClick={toggle} aria-label={on ? 'Turn sound off' : 'Turn sound on'} aria-pressed={on} title={on ? 'Sound on' : 'Sound off'}
      style={{ width: 38, height: 38, borderRadius: '50%', display: 'grid', placeItems: 'center', background: on ? 'rgba(212,164,95,0.14)' : 'transparent', border: `1px solid ${on ? 'rgba(212,164,95,0.5)' : 'rgba(212,164,95,0.25)'}`, color: 'var(--gold)', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
        {on
          ? <><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></>
          : <><line x1="16" y1="9" x2="22" y2="15" /><line x1="22" y1="9" x2="16" y2="15" /></>}
      </svg>
    </button>
  );
}
