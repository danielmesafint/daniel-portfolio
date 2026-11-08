import React from 'react';
import Hero from './Hero';
import QuickIntro from './QuickIntro';
import FeaturedResearch from './FeaturedResearch';
import LatestPublications from './LatestPublications';

const Home = ({ currentTheme, changeTheme }) => {
  return (
    <div>
      {/* Hero Section */}
      <Hero currentTheme={currentTheme} changeTheme={changeTheme} />
      
      {/* Quick Intro Section */}
      <QuickIntro />
      
      {/* Featured Research Section */}
      <FeaturedResearch />
      
      {/* Latest Publications Section */}
      <LatestPublications />
    </div>
  );
};

export default Home;