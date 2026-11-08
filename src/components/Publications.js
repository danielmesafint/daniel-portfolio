import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Copy, Check, Download, Search } from 'lucide-react';
import {
  publications,
  publicationStats,
  formatCitation,
  SCHOLAR_URL,
  ORCID_URL
} from '../data/publications';

const TYPE_LABELS = {
  journal: 'Journal Papers',
  conference: 'Conference Papers',
  chapter: 'Book Chapters'
};

const TYPE_STYLES = {
  journal: { id: 'publications-journal', border: 'border-blue-500' },
  conference: { id: 'publications-conferences', border: 'border-green-500' },
  chapter: { id: 'publications-books', border: 'border-purple-500' }
};

const PublicationItem = ({ pub, border }) => (
  <div className={`border-l-4 ${border} pl-6`}>
    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{pub.title}</h4>
    <p className="text-gray-600 dark:text-gray-300 mb-1">{pub.authors.join(', ')}</p>
    <p className="text-pink-600 dark:text-pink-400 font-medium mb-2">
      {pub.venue} ({pub.year})
    </p>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
      <span>{pub.citations} citations</span>
      <span>{pub.publisher}</span>
      <span>{pub.indexed}</span>
      {pub.doi && <span>DOI: {pub.doi}</span>}
      {pub.url && (
        <a
          href={pub.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-400 font-medium"
        >
          <ExternalLink size={14} /> View paper
        </a>
      )}
    </div>
  </div>
);

const Publications = () => {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [citeStyle, setCiteStyle] = useState('apa');
  const [citeId, setCiteId] = useState(publications[0].id);
  const [copied, setCopied] = useState(false);

  const years = useMemo(
    () => [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a),
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((p) => {
      if (typeFilter !== 'all' && p.type !== typeFilter) return false;
      if (yearFilter !== 'all' && String(p.year) !== yearFilter) return false;
      if (!q) return true;
      return [p.title, p.venue, p.publisher, p.topic, p.authors.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [query, typeFilter, yearFilter]);

  const selected = publications.find((p) => p.id === citeId) || publications[0];
  const citation = formatCitation(selected, citeStyle);

  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(citation);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = citation;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportAll = () => {
    const isBib = citeStyle === 'bibtex';
    const text = publications.map((p) => formatCitation(p, citeStyle)).join(isBib ? '\n\n' : '\n\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daniel-mesafint-publications.${isBib ? 'bib' : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const inputClass =
    'px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent';

  return (
    <section id="publications" className="pt-4 pb-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-green-500">
            Publications
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Peer-reviewed research on machine learning and deep learning for HIV/AIDS prediction,
            feature selection and classification, from my PhD work at Mangalore University and beyond.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { label: 'Publications', value: publicationStats.total },
              { label: 'Citations', value: `${publicationStats.citations}+` },
              { label: 'h-index', value: publicationStats.hIndex }
            ].map((s) => (
              <div key={s.label} className="px-6 py-3 rounded-xl bg-white dark:bg-gray-900 shadow">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={SCHOLAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium"
            >
              <ExternalLink size={16} /> Google Scholar profile
            </a>
            <a
              href={ORCID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
            >
              <ExternalLink size={16} /> ORCID
            </a>
          </div>
        </motion.div>

        <div className="space-y-12">
          {/* Lists by type */}
          {Object.keys(TYPE_LABELS).map((type, i) => {
            const items = publications.filter((p) => p.type === type);
            if (!items.length) return null;
            return (
              <div
                key={type}
                id={TYPE_STYLES[type].id}
                className={`${i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'} rounded-xl p-6 sm:p-8 shadow-lg`}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {TYPE_LABELS[type]} <span className="text-base font-normal text-gray-500">({items.length})</span>
                </h3>
                <div className="grid gap-6">
                  {items.map((pub) => (
                    <PublicationItem key={pub.id} pub={pub} border={TYPE_STYLES[type].border} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Search */}
          <div id="publications-search" className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Publication Search</h3>
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, venue, publisher or topic..."
                className={`w-full pl-10 ${inputClass} py-3`}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={inputClass}>
                <option value="all">All types</option>
                {Object.entries(TYPE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className={inputClass}>
                <option value="all">All years</option>
                {years.map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {results.length} of {publications.length} publications
            </p>
            <div className="grid gap-5">
              {results.map((pub) => (
                <PublicationItem key={pub.id} pub={pub} border={TYPE_STYLES[pub.type].border} />
              ))}
              {!results.length && (
                <p className="text-gray-600 dark:text-gray-300">No publications match your search.</p>
              )}
            </div>
          </div>

          {/* Citation export */}
          <div id="publications-citations" className="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Citation Export</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Publication</h4>
                <select value={citeId} onChange={(e) => setCiteId(e.target.value)} className={`w-full mb-6 ${inputClass}`}>
                  {publications.map((p) => (
                    <option key={p.id} value={p.id}>{p.year} - {p.title}</option>
                  ))}
                </select>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Format</h4>
                <div className="space-y-2">
                  {[
                    { id: 'apa', name: 'APA Style', desc: 'American Psychological Association' },
                    { id: 'mla', name: 'MLA Style', desc: 'Modern Language Association' },
                    { id: 'bibtex', name: 'BibTeX', desc: 'For LaTeX and reference managers' }
                  ].map((f) => (
                    <label
                      key={f.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer ${
                        citeStyle === f.id
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="citation-format"
                        className="mr-3"
                        checked={citeStyle === f.id}
                        onChange={() => setCiteStyle(f.id)}
                      />
                      <div>
                        <div className="font-medium">{f.name}</div>
                        <div className={`text-sm ${citeStyle === f.id ? 'text-pink-100' : 'text-gray-500 dark:text-gray-400'}`}>{f.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Citation Preview</h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                    {citation}
                  </pre>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={copyCitation}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied' : 'Copy citation'}
                  </button>
                  <button
                    onClick={exportAll}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
                  >
                    <Download size={16} /> Export all ({citeStyle === 'bibtex' ? '.bib' : '.txt'})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
