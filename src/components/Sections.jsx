import React, { useState } from 'react';
import {
  MapPin, Download, Mail, Brain, Languages, Bot, HeartPulse, ShieldCheck, Database,
  CheckCircle2, Phone, MessageCircle, Send, ChevronDown, ChevronUp, BookOpen, Users, Mic
} from 'lucide-react';
import {
  profile, links, stats, about, education, interests, projects, conferences,
  courses, supervision, experience, reviewer, committees, certifications
} from '../data/profile';
import { LinkIcon } from './icons';

export const SectionHead = ({ eyebrow, title, children }) => (
  <div className="section-head">
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {children && <p>{children}</p>}
  </div>
);

export const ProfileLinks = () => (
  <div className="profile-links">
    {links.map((l) => (
      <a key={l.id} href={l.href} target="_blank" rel="noopener noreferrer">
        <LinkIcon id={l.id} size={15} />
        {l.label}
      </a>
    ))}
  </div>
);

/* ---------------- Hero ---------------- */
export const Hero = () => (
  <section className="hero" id="top">
    <div className="container">
      <div className="hero-grid">
        <div>
          <span className="eyebrow">Computer Science &middot; AI &middot; Machine Learning</span>
          <h1>{profile.name}</h1>
          <div className="hero-role">{profile.title}</div>
          <div className="hero-affil"><MapPin size={15} aria-hidden="true" />{profile.affiliation}</div>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={profile.cv} target="_blank" rel="noopener noreferrer">
              <Download size={16} aria-hidden="true" /> Download CV
            </a>
            <a className="btn btn-outline" href="#contact">
              <Mail size={16} aria-hidden="true" /> Get in touch
            </a>
          </div>
          <ProfileLinks />
        </div>
        <div className="portrait-wrap">
          <img className="portrait" src={profile.portrait} alt={`Portrait of ${profile.shortName}`} width="800" height="1000" />
        </div>
      </div>
      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className="card stat">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- About ---------------- */
export const About = () => (
  <section className="section section-alt" id="about">
    <div className="container">
      <SectionHead eyebrow="About" title="Teacher, researcher and mentor" />
      <div className="about-grid">
        <div className="about-text">
          {about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          <div style={{ marginTop: 20 }}>
            <div className="sub-title">Research interests</div>
            <div className="chips">
              {interests.map((i) => <span key={i.title} className="chip">{i.title}</span>)}
            </div>
          </div>
        </div>
        <div>
          <div className="sub-title">Education</div>
          <div className="timeline">
            {education.map((e) => (
              <div key={e.degree} className="timeline-item">
                <div className="timeline-meta">{e.years}</div>
                <h3>{e.degree}</h3>
                <div className="muted" style={{ fontSize: '0.88rem' }}>{e.school}</div>
                <p>{e.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- Research ---------------- */
const INTEREST_ICONS = { brain: Brain, languages: Languages, bot: Bot, heart: HeartPulse, shield: ShieldCheck, database: Database };

export const Research = () => (
  <section className="section" id="research">
    <div className="container">
      <SectionHead eyebrow="Research" title="Research areas">
        Applied machine learning for health and for Ethiopian languages, from predictive models to conversational agents.
      </SectionHead>
      <div className="grid-3">
        {interests.map((i) => {
          const Icon = INTEREST_ICONS[i.icon];
          return (
            <div key={i.title} className="card interest">
              <span className="icon-tile"><Icon size={18} aria-hidden="true" /></span>
              <div>
                <h3>{i.title}</h3>
                <p>{i.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 28 }}>
        <div className="sub-title">Conferences presented at</div>
        <div className="chips">
          {conferences.map((c) => (
            <span key={c.name} className="chip" title={c.place}>
              <Mic size={13} aria-hidden="true" />{c.name} &middot; <span className="muted">{c.date}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- Projects ---------------- */
export const Projects = () => (
  <section className="section section-alt" id="projects">
    <div className="container">
      <SectionHead eyebrow="Projects" title="Grant projects">
        Funded projects I have worked on, applying AI to health and everyday life in Ethiopia.
      </SectionHead>
      <div className="grid-4">
        {projects.map((p) => (
          <article key={p.title} className="card project">
            <img src={p.image} alt="" loading="lazy" width="800" height="450" />
            <div className="project-body">
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <div className="chips">{p.tags.map((t) => <span key={t} className="badge">{t}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Teaching ---------------- */
export const Teaching = () => {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? supervision : supervision.slice(0, 10);
  return (
    <section className="section" id="teaching">
      <div className="container">
        <SectionHead eyebrow="Teaching & Supervision" title="Courses and student research">
          Undergraduate and postgraduate teaching across AI, data and computing, and supervision of MSc and PhD research.
        </SectionHead>
        <div className="teach-grid">
          <div className="card">
            <div className="sub-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <BookOpen size={14} aria-hidden="true" /> Courses taught
            </div>
            <div className="chips">{courses.map((c) => <span key={c} className="chip">{c}</span>)}</div>
          </div>
          <div className="card">
            <div className="sub-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Users size={14} aria-hidden="true" /> Supervised MSc & PhD topics ({supervision.length})
            </div>
            <ul className="supervision-list">
              {shown.map((s) => (
                <li key={s}><CheckCircle2 size={15} aria-hidden="true" />{s}</li>
              ))}
            </ul>
            <button className="btn btn-outline btn-sm" style={{ marginTop: 12 }} onClick={() => setShowAll((v) => !v)}>
              {showAll ? <><ChevronUp size={15} /> Show fewer</> : <><ChevronDown size={15} /> Show all {supervision.length}</>}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Experience ---------------- */
export const Experience = () => (
  <section className="section section-alt" id="experience">
    <div className="container">
      <SectionHead eyebrow="Experience" title="Career" />
      <div className="card">
        {experience.map((e) => (
          <div key={e.role + e.years} className="exp">
            <div className="exp-years">{e.years}</div>
            <div>
              <h3>{e.role}</h3>
              <div className="exp-org">{e.org}</div>
              <p>{e.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Service ---------------- */
export const Service = () => (
  <section className="section" id="service">
    <div className="container">
      <SectionHead eyebrow="Service" title="Peer review, committees and certifications" />
      <div className="grid-3">
        <div className="card">
          <div className="sub-title">Reviewer for</div>
          <ul className="check-list">{reviewer.map((r) => <li key={r}><CheckCircle2 size={15} aria-hidden="true" />{r}</li>)}</ul>
        </div>
        <div className="card">
          <div className="sub-title">University & national service</div>
          <ul className="check-list">{committees.map((r) => <li key={r}><CheckCircle2 size={15} aria-hidden="true" />{r}</li>)}</ul>
        </div>
        <div className="card">
          <div className="sub-title">Certifications</div>
          <ul className="check-list">{certifications.map((r) => <li key={r}><CheckCircle2 size={15} aria-hidden="true" />{r}</li>)}</ul>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- Contact ---------------- */
export const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const subject = `Message from ${form.name || 'your website'}`;
    const body = `${form.message}\n\n${form.name}${form.email ? ` (${form.email})` : ''}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <SectionHead eyebrow="Contact" title="Let's work together">
          For research collaboration, student supervision or speaking, email is the best way to reach me.
        </SectionHead>
        <div className="contact-grid">
          <div className="card">
            <div className="contact-item">
              <span className="icon-tile"><Mail size={17} aria-hidden="true" /></span>
              <div><small>Email</small><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
            </div>
            <div className="contact-item">
              <span className="icon-tile"><Phone size={17} aria-hidden="true" /></span>
              <div><small>Phone</small><a href={profile.phoneHref}>{profile.phone}</a></div>
            </div>
            <div className="contact-item">
              <span className="icon-tile"><MessageCircle size={17} aria-hidden="true" /></span>
              <div>
                <small>Chat</small>
                <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <span className="muted"> &middot; </span>
                <a href={profile.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="icon-tile"><MapPin size={17} aria-hidden="true" /></span>
              <div><small>Location</small><span>{profile.location}</span></div>
            </div>
            <ProfileLinks />
          </div>
          <form className="card form" onSubmit={submit}>
            <label>Your name<input value={form.name} onChange={update('name')} required autoComplete="name" /></label>
            <label>Your email<input type="email" value={form.email} onChange={update('email')} autoComplete="email" /></label>
            <label>Message<textarea value={form.message} onChange={update('message')} required /></label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" type="submit"><Send size={15} aria-hidden="true" /> Send message</button>
              <small className="muted">Opens your email app with the message ready to send.</small>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Footer ---------------- */
export const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <span>&copy; {new Date().getFullYear()} {profile.name}</span>
      <div className="footer-links">
        <a href={profile.cv} target="_blank" rel="noopener noreferrer">CV</a>
        {links.slice(0, 4).map((l) => <a key={l.id} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>)}
        <a href="#top">Back to top</a>
      </div>
    </div>
  </footer>
);
