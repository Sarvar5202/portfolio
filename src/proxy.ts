import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // API, Next.js ichki fayllari va statik fayllardan tashqari hamma yo'llar
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
