'use client';

import {useState, type FormEvent} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {links} from '@/data/site';
import Icon from './Icon';

type Status = {kind: 'idle'} | {kind: 'sending'} | {kind: 'ok'} | {kind: 'err'; msg: string};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>({kind: 'idle'});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === 'sending') return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      subject: String(fd.get('subject') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
      website: String(fd.get('website') ?? ''),
      locale,
    };
    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      setStatus({kind: 'err', msg: t('errorRequired')});
      return;
    }
    if (!EMAIL_RE.test(payload.email)) {
      setStatus({kind: 'err', msg: t('errorEmail')});
      return;
    }

    setStatus({kind: 'sending'});
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as {ok?: boolean; error?: string} | null;
      if (res.ok && data?.ok) {
        setStatus({kind: 'ok'});
        form.reset();
        setTimeout(() => setStatus((s) => (s.kind === 'ok' ? {kind: 'idle'} : s)), 6000);
      } else if (data?.error === 'email') {
        setStatus({kind: 'err', msg: t('errorEmail')});
      } else if (data?.error === 'required') {
        setStatus({kind: 'err', msg: t('errorRequired')});
      } else {
        setStatus({kind: 'err', msg: t('error')});
      }
    } catch {
      setStatus({kind: 'err', msg: t('error')});
    }
  }

  const sending = status.kind === 'sending';

  return (
    <section id="contact" className="sec" aria-labelledby="contact-title">
      <div className="sec-label reveal-l">
        {'// '}{t('title')}
        <small>05. {t('sectionTitle')}</small>
      </div>
      <div className="stack">
        <h2 id="contact-title" className="reveal">{t('title')}</h2>
        <div className="contact-grid">
          <div className="card json reveal">
            <span className="c">{'{'}</span>
            <span>  &quot;phone&quot;: <a href={links.phone}>&quot;{links.phoneLabel}&quot;</a>,</span>
            <span>  &quot;telegram&quot;: <a href={links.telegram} target="_blank" rel="noopener noreferrer">&quot;{links.telegramHandle}&quot;</a>,</span>
            <span>  &quot;github&quot;: <a href={links.github} target="_blank" rel="noopener noreferrer">&quot;{links.githubHandle}&quot;</a>,</span>
            <span>  &quot;linkedin&quot;: <a href={links.linkedin} target="_blank" rel="noopener noreferrer">&quot;{links.linkedinHandle}&quot;</a>,</span>
            <span>  &quot;city&quot;: &quot;{t('locationCity')}&quot;</span>
            <span className="c">{'}'}</span>
          </div>

          <form className="card form reveal" onSubmit={onSubmit} noValidate>
            <h3>{t('sendMessage')}</h3>
            <div className="form-row">
              <div className="field">
                <label htmlFor="f-name">{t('yourName')}</label>
                <input id="f-name" name="name" type="text" autoComplete="name" required maxLength={100} placeholder={t('namePh')} />
              </div>
              <div className="field">
                <label htmlFor="f-email">{t('emailAddress')}</label>
                <input id="f-email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder={t('emailPh')} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-subject">{t('subject')}</label>
              <input id="f-subject" name="subject" type="text" required maxLength={200} placeholder={t('subjectPh')} />
            </div>
            <div className="field">
              <label htmlFor="f-message">{t('message')}</label>
              <textarea id="f-message" name="message" required maxLength={3000} placeholder={t('messagePh')} />
            </div>
            <div className="hp" aria-hidden="true">
              <label htmlFor="f-website">Website</label>
              <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <button type="submit" className="submit" disabled={sending}>
              <Icon name={sending ? 'spinner' : 'send'} />
              {sending ? t('sending') : t('submit')}
            </button>
            <div aria-live="polite">
              {status.kind === 'ok' && (
                <p className="form-msg ok"><Icon name="check" /> {t('success')}</p>
              )}
              {status.kind === 'err' && (
                <p className="form-msg err"><Icon name="alert" /> {status.msg}</p>
              )}
            </div>
          </form>
        </div>

        <div className="card map reveal">
          <div className="map-top">
            <div>
              <small>{t('locationMap')}</small>
              <b>{t('locationCity')}</b>
            </div>
            <a className="btn" href={links.mapOpen} target="_blank" rel="noopener noreferrer" style={{padding: '10px 16px', fontSize: 14}}>
              <Icon name="map" /> {t('openMap')}
            </a>
          </div>
          <iframe src={links.mapEmbed} title={t('locationCity')} loading="lazy" allowFullScreen />
        </div>
      </div>
    </section>
  );
}
