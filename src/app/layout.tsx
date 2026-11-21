import type {ReactNode} from 'react';

// Haqiqiy <html> va <body> src/app/[locale]/layout.tsx ichida.
export default function RootLayout({children}: {children: ReactNode}) {
  return children;
}
