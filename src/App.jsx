import React from 'react';
import Header from './components/Header';
import Publications from './components/Publications';
import Assistant from './components/Assistant';
import { ProgressBar, BackToTop, useReveal } from './components/Enhancements';
import { Hero, About, Research, Projects, Teaching, Experience, Service, Contact, Footer } from './components/Sections';

const App = () => {
  useReveal();
  return (
  <>
    <ProgressBar />
    <a href="#about" className="skip-link">Skip to content</a>
    <Header />
    <main>
      <Hero />
      <About />
      <Research />
      <Publications />
      <Projects />
      <Teaching />
      <Experience />
      <Service />
      <Contact />
    </main>
    <Footer />
    <BackToTop />
    <Assistant />
  </>
  );
};

export default App;
