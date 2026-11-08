import React from 'react';
import Header from './components/Header';
import Publications from './components/Publications';
import Assistant from './components/Assistant';
import { Hero, About, Research, Projects, Teaching, Experience, Service, Contact, Footer } from './components/Sections';

const App = () => (
  <>
    <a href="#about" className="sr-only">Skip to content</a>
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
    <Assistant />
  </>
);

export default App;
