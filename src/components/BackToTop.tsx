'use client';

import {useEffect, useState} from 'react';
import Icon from './Icon';

export default function BackToTop({label}: {label: string}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      className={`to-top${show ? ' show' : ''}`}
      aria-label={label}
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
    >
      <Icon name="arrowUp" />
    </button>
  );
}
