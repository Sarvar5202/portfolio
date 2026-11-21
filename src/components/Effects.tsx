'use client';

import {useEffect} from 'react';

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

const SELECTOR = '.reveal, .reveal-l, .pop, .line';

/**
 * Scroll animatsiyalari: bo'limlar ko'ringanda chiqib keladi,
 * tepadagi progress chiziq to'lib boradi.
 */
export default function Effects() {
  useEffect(() => {
    window.__revealReady = true;
    const root = document.documentElement;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // --- Reveal on scroll ---
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    if (!reduce && 'IntersectionObserver' in window) {
      root.classList.add('js');
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io?.unobserve(e.target);
            }
          }
        },
        {threshold: 0.12, rootMargin: '0px 0px -6% 0px'},
      );
      const observeAll = (scope: ParentNode) => {
        scope.querySelectorAll(SELECTOR).forEach((el) => {
          if (!el.classList.contains('in')) io?.observe(el);
        });
      };
      observeAll(document);
      mo = new MutationObserver((muts) => {
        for (const m of muts) {
          m.addedNodes.forEach((n) => {
            if (n instanceof HTMLElement) {
              if (n.matches(SELECTOR)) io?.observe(n);
              observeAll(n);
            }
          });
        }
      });
      mo.observe(document.body, {childList: true, subtree: true});
    } else {
      root.classList.remove('js');
    }

    // --- Scroll progress ---
    const bar = document.getElementById('scroll-progress');
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        if (bar) bar.style.transform = `scaleX(${p})`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);

    return () => {
      io?.disconnect();
      mo?.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div id="scroll-progress" className="progress" aria-hidden="true" />;
}
