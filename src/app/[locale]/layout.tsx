import '../globals.css';
import type {Metadata, Viewport} from 'next';
import type {ReactNode} from 'react';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Meta'});
  return {
    title: t('title'),
    description: t('description'),
    alternates: {languages: {uz: '/uz', ru: '/ru', en: '/en'}},
    openGraph: {title: t('title'), description: t('description'), type: 'website'},
  };
}

export const viewport: Viewport = {
  themeColor: '#0d1117',
  width: 'device-width',
  initialScale: 1,
};

// Animatsiya uchun "js" klassini sahifa chizilishidan oldin qo'yadi.
// Agar biror sabab bilan JS ishlamasa, 4 soniyadan keyin hamma narsa baribir ko'rinadi.
const bootScript = `(function(){try{var d=document.documentElement;if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('js');setTimeout(function(){if(!window.__revealReady){d.classList.remove('js');}},4000);}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html: bootScript}} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap"
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
