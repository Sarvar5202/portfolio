import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['uz', 'ru', 'en'],
  defaultLocale: 'uz',
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
