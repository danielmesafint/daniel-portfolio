// Dr. Daniel Mesafint's publications, from his CV (March 2025) and Google
// Scholar (citation counts as of November 2026). Update here and every
// section of the site that lists publications picks it up.
export const SCHOLAR_URL = 'https://scholar.google.com/citations?user=hxLjZCAAAAAJ&hl=en';
export const ORCID_URL = 'https://orcid.org/0000-0002-8424-5069';

export const publicationStats = {
  total: 8,
  citations: 746,
  hIndex: 5
};

export const publications = [
  {
    id: 'ijca-2021',
    type: 'journal',
    title: 'Grid search in hyperparameter optimization of machine learning models for prediction of HIV/AIDS test results',
    authors: ['Daniel Mesafint Belete', 'Manjaiah D. Huchaiah'],
    venue: 'International Journal of Computers and Applications',
    details: 'Vol. 44, Issue 9, pp. 875-886',
    publisher: 'Taylor & Francis',
    year: 2021,
    indexed: 'Scopus',
    citations: 704,
    doi: '10.1080/1206212X.2021.1974663',
    url: 'https://doi.org/10.1080/1206212X.2021.1974663',
    topic: 'HIV/AIDS prediction'
  },
  {
    id: 'intech-2023',
    type: 'chapter',
    title: 'Deep Learning Models for Predicting HIV Test Status using DHS data',
    authors: ['Daniel Mesafint Belete', 'Manjaiah D. Huchaiah'],
    venue: 'Future Opportunities and Tools for Emerging Challenges for HIV/AIDS Control',
    details: 'pp. 1-21',
    publisher: 'IntechOpen',
    year: 2023,
    indexed: 'Scopus',
    citations: 5,
    doi: '10.5772/intechopen.104224',
    url: 'https://www.intechopen.com/chapters/81573',
    topic: 'Deep learning'
  },
  {
    id: 'icdmai-2021',
    type: 'conference',
    title: 'Performance Evaluation of Classification Models for HIV/AIDS Dataset',
    authors: ['Daniel Mesafint Belete', 'Manjaiah D. Huchaiah'],
    venue: 'Data Management, Analytics and Innovation (ICDMAI 2021), Kolkata, India',
    details: 'Lecture Notes on Data Engineering and Communications Technologies, Vol. 70, pp. 109-125',
    publisher: 'Springer',
    year: 2021,
    indexed: 'Scopus',
    citations: 5,
    doi: '10.1007/978-981-16-2934-1_7',
    url: 'https://link.springer.com/chapter/10.1007/978-981-16-2934-1_7',
    topic: 'Classification'
  },
  {
    id: 'ejmcm-2020',
    type: 'journal',
    title: 'Wrapper Based Feature Selection Techniques on EDHS-HIV/AIDS Dataset',
    authors: ['Daniel Mesafint Belete', 'Manjaiah D. Huchaiah'],
    venue: 'European Journal of Molecular & Clinical Medicine',
    details: 'Vol. 7, Issue 8, pp. 2642-2657',
    publisher: 'eJournalPlus',
    year: 2020,
    indexed: 'Scopus',
    citations: 18,
    // The journal's old article page (ejmcm.com/article_4776.html) no longer resolves.
    url: 'https://scholar.google.com/scholar?q=%22Wrapper+Based+Feature+Selection+Techniques+on+EDHS-HIV%2FAIDS+Dataset%22',
    topic: 'Feature selection'
  },
  {
    id: 'icssit-2020',
    type: 'conference',
    title: 'A Comparative Study of Filter and Wrapper Methods on EDHS-HIV/AIDS Dataset',
    authors: ['Daniel Mesafint Belete', 'Manjaiah D. Huchaiah'],
    venue: 'Third International Conference on Smart Systems and Inventive Technology (ICSSIT 2020), Tirunelveli, India',
    details: 'pp. 1264-1271',
    publisher: 'IEEE',
    year: 2020,
    indexed: 'IEEE Xplore',
    citations: 7,
    doi: '10.1109/ICSSIT48917.2020.9214212',
    url: 'https://ieeexplore.ieee.org/document/9214212',
    topic: 'Feature selection'
  },
  {
    id: 'dasa-2020',
    type: 'conference',
    title: 'Classification of Binary Class HIV/AIDS Test Results Using Ensemble Learning Models',
    authors: ['Daniel Mesafint Belete', 'Manjaiah D. Huchaiah'],
    venue: 'International Conference on Decision Aid Sciences and Application (DASA 2020), Bahrain',
    details: 'pp. 1240-1247',
    publisher: 'IEEE',
    year: 2020,
    indexed: 'IEEE Xplore',
    citations: 5,
    doi: '10.1109/DASA51403.2020.9317082',
    url: 'https://ieeexplore.ieee.org/document/9317082',
    topic: 'Ensemble learning'
  },
  {
    id: 'ijreat-2019',
    type: 'journal',
    title: "Feature Selection Methods for Prediction of the Individual's Status of HIV/AIDS from EDHS Dataset - A Filter Approach",
    authors: ['Daniel Mesafint', 'Manjaiah D. H.'],
    venue: 'International Journal of Research in Engineering & Advanced Technology (IJREAT)',
    details: 'Vol. 7, Issue 3, pp. 29-36',
    publisher: 'Pioneer Research & Development Group',
    year: 2019,
    indexed: 'UGC',
    citations: 2,
    url: 'http://www.ijreat.org/Issue39.html',
    topic: 'Feature selection'
  },
  {
    id: 'jetir-2019',
    type: 'journal',
    title: 'Predictive Models of HIV/AIDS Epidemic Status using Data Mining Techniques: A Review',
    authors: ['Daniel Mesafint', 'Manjaiah D. H.'],
    venue: 'Journal of Emerging Technologies and Innovative Research (JETIR)',
    details: 'Vol. 6, Issue 5, pp. 10-16',
    publisher: 'IJ Publication',
    year: 2019,
    indexed: 'UGC',
    citations: 0,
    url: 'https://www.jetir.org/view?paper=JETIRCU06003',
    topic: 'Review'
  }
];

const surnameInitials = (name) => {
  const parts = name.replace(/\./g, '').split(' ').filter(Boolean);
  const last = parts[parts.length - 1];
  const initials = parts.slice(0, -1).map((p) => `${p[0]}.`).join(' ');
  return { last, initials };
};

export const formatCitation = (pub, style = 'apa') => {
  const a = pub.authors.map(surnameInitials);
  const doiPart = pub.doi ? ` https://doi.org/${pub.doi}` : pub.url ? ` ${pub.url}` : '';
  if (style === 'mla') {
    const first = `${a[0].last}, ${pub.authors[0].split(' ').slice(0, -1).join(' ')}`;
    const rest = pub.authors.length > 1 ? `, and ${pub.authors.slice(1).join(', ')}` : '';
    return `${first}${rest}. "${pub.title}." ${pub.venue}, ${pub.details}, ${pub.publisher}, ${pub.year}.${doiPart}`;
  }
  if (style === 'bibtex') {
    const kind = pub.type === 'journal' ? 'article' : pub.type === 'chapter' ? 'incollection' : 'inproceedings';
    const field = pub.type === 'journal' ? 'journal' : 'booktitle';
    return [
      `@${kind}{${pub.id},`,
      `  title = {${pub.title}},`,
      `  author = {${pub.authors.join(' and ')}},`,
      `  ${field} = {${pub.venue}},`,
      `  publisher = {${pub.publisher}},`,
      `  year = {${pub.year}},`,
      pub.doi ? `  doi = {${pub.doi}},` : null,
      pub.url ? `  url = {${pub.url}}` : null,
      '}'
    ].filter(Boolean).join('\n');
  }
  // APA
  const names = a.map((n) => `${n.last}, ${n.initials}`);
  const authorStr = names.length > 1 ? `${names.slice(0, -1).join(', ')}, & ${names[names.length - 1]}` : names[0];
  return `${authorStr} (${pub.year}). ${pub.title}. ${pub.venue}, ${pub.details}. ${pub.publisher}.${doiPart}`;
};
