'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {usePathname} from 'next/navigation';

// The shared layout stays mounted while App Router pages change.
export default function TransitionLoader() {
  const pathname = usePathname();
  const [overlay, setOverlay] = useState(null);
  const active = useRef(false);
  const started = useRef(0);
  const previousPath = useRef(null);
  const sequence = useRef(0);
  const timers = useRef([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  const dismiss = useCallback(() => {
    if (!active.current) return;
    clearTimers();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const remaining = reduced ? 0 : Math.max(0, 1150 - (Date.now() - started.current));
    timers.current.push(setTimeout(() => {
      setOverlay(current => current ? {...current, leaving:true} : null);
      timers.current.push(setTimeout(() => { active.current = false; setOverlay(null); }, reduced ? 0 : 600));
    }, remaining));
  }, [clearTimers]);
  const start = useCallback(() => {
    clearTimers();
    active.current = true;
    started.current = Date.now();
    setOverlay({id:++sequence.current, leaving:false});
    // Recover if a navigation fails or is cancelled before the URL changes.
    timers.current.push(setTimeout(dismiss, 10000));
  }, [clearTimers, dismiss]);

  useEffect(() => {
    if (previousPath.current === null) {
      previousPath.current = pathname;
      if (!sessionStorage.getItem('quantumx-loaded')) {
        sessionStorage.setItem('quantumx-loaded', '1');
        start();
        dismiss();
      }
      return;
    }
    if (pathname !== previousPath.current) {
      previousPath.current = pathname;
      if (!active.current) start();
      dismiss();
    }
  }, [pathname, start, dismiss]);

  useEffect(() => {
    function onClick(event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[href]');
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname.replace(/\/$/, '') === window.location.pathname.replace(/\/$/, '')) return;
      start();
    }
    function onPopState() {
      if (window.location.pathname.replace(/\/$/, '') !== (previousPath.current || '').replace(/\/$/, '')) start();
    }
    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState);
    return () => { document.removeEventListener('click', onClick, true); window.removeEventListener('popstate', onPopState); clearTimers(); };
  }, [start, clearTimers]);

  return overlay ? <div key={overlay.id} className={`loader ${overlay.leaving ? 'loader-leaving' : ''}`} aria-hidden="true"><div className="loader-mark">✳</div><div className="loader-word">Quantum<span>X</span></div></div> : null;
}
