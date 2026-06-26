import React from 'react';
import Hero from './Hero';
import QuickIntro from './QuickIntro';
import FeaturedResearch from './FeaturedResearch';
import LatestPublications from './LatestPublications';
import QuickLinks from './QuickLinks';

const Home = ({ currentTheme, changeTheme }) => {
  return (
    <div id="home">
      {/* Hero Section */}
      <Hero currentTheme={currentTheme} changeTheme={changeTheme} />
      
      {/* Quick Intro Section */}
      <QuickIntro />
      
      {/* Featured Research Section */}
      <FeaturedResearch />
      
      {/* Latest Publications Section */}
      <LatestPublications />
      
      {/* Quick Links Section */}
      <QuickLinks />
    </div>
  );
};

export default Home;