import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Work from './components/Work';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectPage from './components/ProjectPage';
import ServicePage from './components/ServicePage';
import ChatBot from './components/ChatBot';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Expertise />
        <Work />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
        <Loader />
        <Cursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/service/:id" element={<ServicePage />} />
        </Routes>
        <ChatBot />
      </div>
    </BrowserRouter>
  );
}
