import React from 'react';
import { Linkedin, Github, Facebook, GraduationCap } from 'lucide-react';

// Small brand marks for academic profiles that lucide does not include.
const Orcid = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#A6CE39" />
    <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">iD</text>
  </svg>
);

const ResearchGate = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="#00CCBB" />
    <text x="12" y="16.5" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">RG</text>
  </svg>
);

const Scholar = ({ size = 16 }) => <GraduationCap size={size} color="#4285F4" aria-hidden="true" />;

export const LinkIcon = ({ id, size = 16 }) => {
  switch (id) {
    case 'scholar': return <Scholar size={size} />;
    case 'orcid': return <Orcid size={size} />;
    case 'researchgate': return <ResearchGate size={size} />;
    case 'linkedin': return <Linkedin size={size} color="#0A66C2" aria-hidden="true" />;
    case 'github': return <Github size={size} aria-hidden="true" />;
    case 'facebook': return <Facebook size={size} color="#1877F2" aria-hidden="true" />;
    default: return null;
  }
};
