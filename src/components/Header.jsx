import React, { useEffect, useState } from 'react';
import {
  User, FlaskConical, FileText, FolderKanban, GraduationCap, Briefcase, Award, Mail,
  Menu, X, Sun, Moon, Download
} from 'lucide-react';
import { profile } from '../data/profile';

export const NAV = [
  { id: 'about', label: 'About', icon: User },
  { id: 'research', label: 'Research', icon: FlaskConical },
  { id: 'publications', label: 'Publications', icon: FileText },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'teaching', label: 'Teaching', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'service', label: 'Service', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail }
];

const useActiveSection = () => {
  const [active, setActive] = useState('');
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
};

const Header = () => {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'dark') document.documentElement.dataset.theme = 'dark';
    else delete document.documentElement.dataset.theme;
    try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = NAV.map(({ id, label, icon: Icon }) => (
    <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>
      <Icon size={15} aria-hidden="true" />
      {label}
    </a>
  ));

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label="Back to top">
          <span className="brand-mark">DM</span>
          <span className="brand-name">{profile.shortName}</span>
        </a>
        <nav className="nav" aria-label="Main">{links}</nav>
        <div className="header-actions">
          <button className="btn btn-ghost" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="btn btn-primary btn-sm" href={profile.cv} target="_blank" rel="noopener noreferrer">
            <Download size={15} aria-hidden="true" /><span className="header-cv-label">CV</span>
          </a>
          <button
            className="btn btn-ghost menu-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className={`mobile-nav ${open ? 'open' : ''}`} aria-label="Mobile">{links}</nav>
    </header>
  );
};

export default Header;
