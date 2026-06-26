import React from 'react';
import ProfessionalExperience from './ProfessionalExperience';
import EditorialRoles from './EditorialRoles';
import Leadership from './Leadership';

const Experience = () => {
  return (
    <div id="experience">
      {/* Professional Experience Section */}
      <ProfessionalExperience />
      
      {/* Editorial Roles Section */}
      <EditorialRoles />
      
      {/* Leadership Section */}
      <Leadership />
    </div>
  );
};

export default Experience;