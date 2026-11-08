import React, { useMemo, useState } from 'react';
import { ExternalLink, Quote, Check, Download, Search } from 'lucide-react';
import { publications, publicationStats, SCHOLAR_URL } from '../data/profile';
import { SectionHead } from './Sections';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'journal', label: 'Journals' },
  { id: 'conference', label: 'Conferences' },
  { id: 'chapter', label: 'Book chapters' }
];
const TYPE_LABEL = { journal: 'Journal', conference: 'Conference', chapter: 'Book chapter' };

const initials = (name) => {
  const parts = name.replace(/\./g, '').split(' ').filter(Boolean);
  return { last: parts[parts.length - 1], first: parts.slice(0, -1).map((p) => `${p[0]}.`).join(' ') };
};

const apa = (p) => {
  const names = p.authors.map(initials).map((n) => `${n.last}, ${n.first}`);
  const authors = names.length > 1 ? `${names.slice(0, -1).join(', ')}, & ${names[names.length - 1]}` : names[0];
  const link = p.doi ? ` https://doi.org/${p.doi}` : '';
  return `${authors} (${p.year}). ${p.title}. ${p.venue}, ${p.details}. ${p.publisher}.${link}`;
};

const bibtex = (p) => {
  const kind = p.type === 'journal' ? 'article' : p.type === 'chapter' ? 'incollection' : 'inproceedings';
  const field = p.type === 'journal' ? 'journal' : 'booktitle';
  return [
    `@${kind}{${p.id},`,
    `  title = {${p.title}},`,
    `  author = {${p.authors.join(' and ')}},`,
    `  ${field} = {${p.venue}},`,
    `  publisher = {${p.publisher}},`,
    `  year = {${p.year}},`,
    p.doi ? `  doi = {${p.doi}},` : null,
    `  url = {${p.url}}`,
    '}'
  ].filter(Boolean).join('\n');
};

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
};

const Publications = () => {
  const [tab, setTab] = useState('all');
  const [copied, setCopied] = useState(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('year');

  const list = useMemo(
    () => publications
      .filter((p) => tab === 'all' || p.type === tab)
      .filter((p) => {
        const q = query.trim().toLowerCase();
        return !q || [p.title, p.venue, p.publisher, p.authors.join(' '), String(p.year)].join(' ').toLowerCase().includes(q);
      })
      .sort((a, b) => (sort === 'cited'
        ? b.citations - a.citations || b.year - a.year
        : b.year - a.year || b.citations - a.citations)),
    [tab, query, sort]
  );

  const cite = async (p) => {
    await copyText(apa(p));
    setCopied(p.id);
    setTimeout(() => setCopied(null), 1800);
  };

  const exportBib = () => {
    const blob = new Blob([publications.map(bibtex).join('\n\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'daniel-mesafint-publications.bib';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="section" id="publications">
      <div className="container">
        <SectionHead eyebrow="Publications" title="Selected publications">
          Machine learning for HIV/AIDS prediction, feature selection and classification, published with Springer, IEEE, Taylor &amp; Francis and IntechOpen.
        </SectionHead>
        <div className="pub-summary">
          <span className="badge">{publicationStats.total} publications</span>
          <span className="badge">{publicationStats.citations}+ citations</span>
          <span className="badge">h-index {publicationStats.hIndex}</span>
        </div>
        <div className="pub-toolbar">
          <div className="tabs" role="tablist" aria-label="Filter publications">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={`tab ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <label className="search">
              <Search size={15} aria-hidden="true" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search papers" aria-label="Search publications" />
            </label>
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort publications">
              <option value="year">Newest first</option>
              <option value="cited">Most cited</option>
            </select>
            <button className="btn btn-outline btn-sm" onClick={exportBib}><Download size={14} aria-hidden="true" /> BibTeX</button>
            <a className="btn btn-outline btn-sm" href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} aria-hidden="true" /> Google Scholar
            </a>
          </div>
        </div>
        <div className="pub-list">
          {!list.length && <p className="muted">No publications match your search.</p>}
          {list.map((p) => (
            <article key={p.id} className="card pub">
              <div className="pub-year">{p.year}</div>
              <div>
                <a className="pub-title" href={p.url} target="_blank" rel="noopener noreferrer">{p.title}</a>
                <div className="pub-meta">{p.authors.join(', ')}</div>
                <div className="pub-meta"><em>{p.venue}</em>, {p.details}. {p.publisher}.</div>
                <div className="pub-foot">
                  <span className="badge">{TYPE_LABEL[p.type]}</span>
                  <span className="badge badge-accent">{p.citations} citations</span>
                  <span className="badge">{p.indexed}</span>
                  <a className="btn btn-ghost btn-sm" href={p.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} aria-hidden="true" /> View
                  </a>
                  <button className="btn btn-ghost btn-sm" onClick={() => cite(p)}>
                    {copied === p.id ? <Check size={14} aria-hidden="true" /> : <Quote size={14} aria-hidden="true" />}
                    {copied === p.id ? 'Copied' : 'Cite'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
