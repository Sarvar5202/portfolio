import type {CSSProperties} from 'react';
import {useTranslations} from 'next-intl';
import {aiSkills, frontendSkills, fullStackSkills} from '@/data/site';

const delay = (i: number) => ({'--d': `${Math.min(i, 15) * 0.04}s`}) as CSSProperties;

export default function Skills() {
  const t = useTranslations('Skills');
  return (
    <section id="skills" className="sec" aria-labelledby="skills-title">
      <div className="sec-label reveal-l">
        {'// '}{t('title')}
        <small>02. {t('sectionTitle')}</small>
      </div>
      <div className="stack" style={{gap: 32}}>
        <h2 id="skills-title" className="reveal">{t('title')}</h2>

        <div className="stack reveal" style={{gap: 12}}>
          <h3>{t('feHeading')}</h3>
          <p className="p" style={{fontSize: 14}}>{t('feDesc')}</p>
          <div className="chips">
            {frontendSkills.map((s, i) => (
              <span key={s} className="chip pop" style={delay(i)}>{s}</span>
            ))}
          </div>
        </div>

        <div className="stack reveal" style={{gap: 12}}>
          <h3>{t('fsHeading')}</h3>
          <p className="p" style={{fontSize: 14}}>{t('fsDesc')}</p>
          <div className="chips">
            {fullStackSkills.map((s, i) => (
              <span key={s} className="chip pop" style={delay(i)}>{s}</span>
            ))}
          </div>
        </div>

        <div className="stack" style={{gap: 12}}>
          <h3 className="reveal">
            {t('aiHeading')} <span className="cert">· {t('certified')}</span>
          </h3>
          <p className="p reveal" style={{fontSize: 14}}>{t('aiDesc')}</p>
          <div className="ai-grid">
            {aiSkills.map((s, i) => (
              <div key={s.name} className="card ai-card lift pop" style={delay(i)}>
                <b>{s.name}</b>
                <span>{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
