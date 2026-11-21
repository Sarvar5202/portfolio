import {useTranslations} from 'next-intl';
import {links} from '@/data/site';
import BackToTop from './BackToTop';
import Icon from './Icon';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>{t('rights')}</span>
        <div className="socials">
          <a href={links.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram"><Icon name="telegram" /></a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github" /></a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
          <a href={links.phone} aria-label="Phone"><Icon name="phone" /></a>
        </div>
      </div>
      <BackToTop label={t('backToTop')} />
    </footer>
  );
}
