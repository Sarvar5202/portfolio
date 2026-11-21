import {useTranslations} from 'next-intl';

export default function About() {
  const t = useTranslations('About');
  return (
    <section id="about" className="sec" aria-labelledby="about-title">
      <div className="sec-label reveal-l">
        {'// '}{t('title')}
        <small>01. {t('sectionTitle')}</small>
      </div>
      <div className="stack reveal">
        <h2 id="about-title">{t('heading')}</h2>
        <p className="p">{t('p1')}</p>
        <p className="p">{t('p2')}</p>
        <div className="facts">
          <span><span>{t('location')}: </span>{t('locationValue')}</span>
          <span><span>{t('degree')}: </span>{t('degreeValue')}</span>
          <span><span>{t('status')}: </span><b className="ok">{t('statusValue')}</b></span>
        </div>
      </div>
    </section>
  );
}
