import {useTranslations} from 'next-intl';
import {jobs} from '@/data/site';

export default function Experience() {
  const t = useTranslations('Experience');
  return (
    <section id="experience" className="sec" aria-labelledby="exp-title">
      <div className="sec-label reveal-l">
        {'// '}{t('title')}
        <small>03. {t('sectionTitle')}</small>
      </div>
      <div className="stack">
        <h2 id="exp-title" className="reveal">{t('title')}</h2>
        <div className="timeline">
          <span className="line" aria-hidden="true" />
          {jobs.map((j) => (
            <article key={j.id} className="card job lift reveal">
              <div className="job-top">
                <h3>{t(`jobs.${j.id}.title`)}</h3>
                <span className="job-date">{t(`jobs.${j.id}.date`)}</span>
              </div>
              <span className="job-co">
                {t(`jobs.${j.id}.company`)} · {t(j.type)}
              </span>
              <p>{t(`jobs.${j.id}.desc`)}</p>
              <div className="chips" style={{gap: 6}}>
                {j.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
