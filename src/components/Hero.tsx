'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {links} from '@/data/site';
import Icon from './Icon';

function useTyping(words: string[]) {
  const [text, setText] = useState('');
  const key = words.join('|');

  useEffect(() => {
    const list = key.split('|');
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setText(list.join(' · '));
      return;
    }
    let w = 0;
    let i = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = list[w];
      let delay = deleting ? 40 : 85;
      if (!deleting) {
        i += 1;
        if (i >= word.length) {
          deleting = true;
          delay = 1400;
        }
      } else {
        i -= 1;
        if (i <= 0) {
          deleting = false;
          w = (w + 1) % list.length;
          delay = 300;
        }
      }
      setText(word.slice(0, Math.max(0, i)));
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, [key]);

  return text;
}

export default function Hero() {
  const t = useTranslations('Hero');
  const typed = useTyping([t('role1'), t('role2'), t('role3')]);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-text hero-in">
        <span className="status">
          <span className="dot" aria-hidden="true" />
          {t('available')}
        </span>
        <p className="hello">{t('hello')}</p>
        <h1 id="hero-title" className="name-shine">
          {t('name')}
        </h1>
        <p className="typed" aria-label={`${t('role1')}, ${t('role2')}, ${t('role3')}`}>
          <span aria-hidden="true">{typed}</span>
          <span className="cursor" aria-hidden="true" />
        </p>
        <p className="hero-desc">{t('description')}</p>
        <div className="btn-row">
          <a className="btn btn-primary" href="#projects">
            <Icon name="rocket" /> {t('viewProjects')}
          </a>
          <a className="btn" href="#contact">
            <Icon name="send" /> {t('contactMe')}
          </a>
          <a className="btn" href={links.github} target="_blank" rel="noopener noreferrer">
            <Icon name="github" /> GitHub
          </a>
        </div>
        <div className="socials">
          <a href={links.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram"><Icon name="telegram" /></a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github" /></a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
          <a href={links.phone} aria-label="Phone"><Icon name="phone" /></a>
        </div>
      </div>

      <div className="code-card" aria-hidden="true">
        <div className="code-top">
          <i style={{background: '#ff5f57'}} />
          <i style={{background: '#febc2e'}} />
          <i style={{background: '#28c840'}} />
          <span style={{marginLeft: 10}}>sarvar.ts</span>
        </div>
        <div className="code-body">
          <span className="cl" style={{animationDelay: '.6s'}}><span className="k">const</span> <span className="v">sarvar</span> = {'{'}</span>
          <span className="cl" style={{animationDelay: '.8s'}}>  name: <span className="s">&apos;Sarvarbek Samariddinov&apos;</span>,</span>
          <span className="cl" style={{animationDelay: '1s'}}>  location: <span className="s">&apos;Toshkent, UZ&apos;</span>,</span>
          <span className="cl" style={{animationDelay: '1.2s'}}>  roles: [<span className="s">&apos;Frontend&apos;</span>, <span className="s">&apos;Full Stack&apos;</span>, <span className="s">&apos;Prompt Engineer&apos;</span>],</span>
          <span className="cl" style={{animationDelay: '1.4s'}}>  frontend: [<span className="s">&apos;React&apos;</span>, <span className="s">&apos;Next.js&apos;</span>, <span className="s">&apos;TypeScript&apos;</span>, <span className="s">&apos;Three.js&apos;</span>],</span>
          <span className="cl" style={{animationDelay: '1.6s'}}>  backend: [<span className="s">&apos;Node.js&apos;</span>, <span className="s">&apos;PostgreSQL&apos;</span>, <span className="s">&apos;Supabase&apos;</span>],</span>
          <span className="cl" style={{animationDelay: '1.8s'}}>  ai: [<span className="s">&apos;LLM&apos;</span>, <span className="s">&apos;RAG&apos;</span>, <span className="s">&apos;Agents&apos;</span>, <span className="s">&apos;Prompting&apos;</span>],</span>
          <span className="cl" style={{animationDelay: '2s'}}>  experience: <span className="n">3</span>, <span className="c">{'// years'}</span></span>
          <span className="cl" style={{animationDelay: '2.2s'}}>  openToWork: <span className="n">true</span>,</span>
          <span className="cl" style={{animationDelay: '2.4s'}}>{'};'} <span className="cursor" /></span>
        </div>
      </div>
    </section>
  );
}
