import {setRequestLocale} from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Effects from '@/components/Effects';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <Effects />
      <Header />
      <main id="top">
        <div className="container">
          <Hero />
          <Stats />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
