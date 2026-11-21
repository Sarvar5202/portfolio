import {useTranslations} from 'next-intl';
import {links, projectTags} from '@/data/site';
import Icon from './Icon';

export default function Projects() {
  const t = useTranslations('Projects');
  return (
    <section id="projects" className="sec" aria-labelledby="proj-title">
      <div className="sec-label reveal-l">
        {'// '}{t('title')}
        <small>04. {t('sectionTitle')}</small>
      </div>
      <div className="stack">
        <h2 id="proj-title" className="reveal">{t('title')}</h2>
        <article className="card project lift reveal">
          <div className="project-hero">
            <span className="project-badge">React / CRM</span>
            <span className="brand">NAJOT <em>TA&apos;LIM</em></span>
            <small>{t('crmManagement').toUpperCase()}</small>
          </div>
          <div className="project-body">
            <h3>{t('projectTitle')}</h3>
            <p className="p" style={{fontSize: 15}}>{t('projectDesc')}</p>
            <div className="chips" style={{gap: 6}}>
              {projectTags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="project-foot">
              <span className="mono" style={{fontSize: 13, color: 'var(--muted)'}}>exam7</span>
              <div>
                <a href={links.projectGithub} target="_blank" rel="noopener noreferrer">
                  <Icon name="github" /> GitHub
                </a>
                <a href={links.projectDemo} target="_blank" rel="noopener noreferrer">
                  <Icon name="external" /> {t('liveDemo')}
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
