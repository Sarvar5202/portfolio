'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {stats} from '@/data/site';

export default function Stats() {
  const t = useTranslations('About');
  const ref = useRef<HTMLDivElement>(null);
  const [f, setF] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setF(1);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / 1400);
          setF(1 - Math.pow(1 - p, 3));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      {threshold: 0.3},
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="stats reveal">
      {stats.map((s) => (
        <div key={s.key} className="stat">
          <b>{Math.round(s.value * f)}+</b>
          <span>{t(s.key)}</span>
        </div>
      ))}
    </div>
  );
}
