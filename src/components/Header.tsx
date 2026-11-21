'use client';

import {useEffect, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import Icon from './Icon';

const items = [
  {id: 'about', file: 'about.tsx'},
  {id: 'skills', file: 'skills.ts'},
  {id: 'experience', file: 'experience.md'},
  {id: 'projects', file: 'projects/'},
  {id: 'contact', file: 'contact.json'},
] as const;

export default function Header() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 980) setOpen(false);
    };
    window.addEventListener('resize', onResize);

    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5]},
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener('resize', onResize);
      io.disconnect();
    };
  }, []);

  return (
    <header className="hdr">
      <div className="container hdr-inner">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          ~/sarvarbek
        </a>
        <nav className="nav" aria-label="Main">
          {items.map((i) => (
            <a key={i.id} href={`#${i.id}`} className={active === i.id ? 'active' : undefined} title={t(i.id)}>
              {i.file}
            </a>
          ))}
        </nav>
        <div className="hdr-right">
          <div className="lang" role="group" aria-label={t('language')}>
            {routing.locales.map((l) => (
              <Link key={l} href="/" locale={l} aria-current={l === locale ? 'true' : undefined} scroll={false}>
                {l}
              </Link>
            ))}
          </div>
          <button
            type="button"
            className="menu-btn"
            aria-label={t('menu')}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className={`mobile-nav${open ? ' open' : ''}`} aria-label="Mobile">
        {items.map((i) => (
          <a key={i.id} href={`#${i.id}`} onClick={() => setOpen(false)}>
            <span style={{color: 'var(--accent)'}}>{i.file}</span> — {t(i.id)}
          </a>
        ))}
      </nav>
    </header>
  );
}
