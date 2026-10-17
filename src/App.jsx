import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import ScrollLine from './components/ScrollLine';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Statistics from './components/Statistics';
import Skills from './components/Skills';
import Work from './components/Work';
import CinematicVisuals from './components/CinematicVisuals';
import Services from './components/Services';
import Process from './components/Process';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionTransition from './components/SectionTransition';
import ProjectPage from './components/ProjectPage';
import ServicePage from './components/ServicePage';
import ChatBot from './components/ChatBot';
// demo pages are dev-only: the DEV check drops them from the production bundle entirely
const MotionDemo = import.meta.env.DEV ? lazy(() => import('./components/MotionDemo')) : null;
const TransitionDemo = import.meta.env.DEV ? lazy(() => import('./components/TransitionDemo')) : null;
const MotionDemoAll = import.meta.env.DEV ? lazy(() => import('./components/MotionDemoAll')) : null;

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionTransition><Expertise /></SectionTransition>
        <SectionTransition><Statistics /></SectionTransition>
        <SectionTransition><Certifications /></SectionTransition>
        <SectionTransition><Skills /></SectionTransition>
        <SectionTransition><Work /></SectionTransition>
        <SectionTransition><CinematicVisuals /></SectionTransition>
        <SectionTransition><Services /></SectionTransition>
        <SectionTransition><Process /></SectionTransition>
        <SectionTransition><Contact /></SectionTransition>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  // global smooth-scroll with inertia — slow & buttery
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,             // smooth but responsive (0.07 felt laggy)
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      smoothWheel: true,
    });
    let raf;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    // route in-page anchor links through Lenis so nav stays smooth
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const el = document.querySelector(href);
        if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: 0, duration: 1.6 }); }
      }
    };
    document.addEventListener('click', onClick);

    return () => { cancelAnimationFrame(raf); document.removeEventListener('click', onClick); lenis.destroy(); };
  }, []);

  return (
    <BrowserRouter>
      <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
        <Loader />
        <Cursor />
        <ScrollLine />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* demo pages: local dev only, never deployed */}
          {import.meta.env.DEV && <Route path="/motion-demo" element={<Suspense fallback={null}><MotionDemo /></Suspense>} />}
          {import.meta.env.DEV && <Route path="/transition-demo" element={<Suspense fallback={null}><TransitionDemo /></Suspense>} />}
          {import.meta.env.DEV && <Route path="/motion-demo-all" element={<Suspense fallback={null}><MotionDemoAll /></Suspense>} />}
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/service/:id" element={<ServicePage />} />
        </Routes>
        <ChatBot />
      </div>
    </BrowserRouter>
  );
}
