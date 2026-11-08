// All site content lives here. Facts come from Dr. Daniel Mesafint's CV
// (March 2025) and his Google Scholar profile. Edit this file to update
// the website; the layout picks changes up automatically.

export const profile = {
  name: 'Dr. Daniel Mesafint Belete',
  shortName: 'Dr. Daniel Mesafint',
  title: 'Assistant Professor of Computer Science',
  affiliation: 'Debre Tabor University, Ethiopia',
  tagline: 'Machine learning, deep learning and NLP for healthcare and Ethiopian languages.',
  intro:
    'I teach and research artificial intelligence at Debre Tabor University, where I also coordinate research, community service and technology transfer at the Gafat Institute of Technology. My work applies machine learning to real problems, from predicting HIV/AIDS test results to building conversational AI for Amharic speakers.',
  email: 'danielmesafint1985@gmail.com',
  altEmail: 'danielmesafint1985@dtu.edu.et',
  phone: '+251 912 023 274',
  phoneHref: 'tel:+251912023274',
  whatsapp: 'https://wa.me/251912023274',
  telegram: 'https://t.me/+251912023274',
  location: 'Debre Tabor, Amhara, Ethiopia',
  cv: '/Dr_Daniel_Mesafint_CV.pdf',
  portrait: '/images/daniel-portrait.jpg',
  photo: '/profile_photo.jpg'
};

export const links = [
  { id: 'scholar', label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=hxLjZCAAAAAJ&hl=en' },
  { id: 'orcid', label: 'ORCID', href: 'https://orcid.org/0000-0002-8424-5069' },
  { id: 'researchgate', label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Daniel-Belete' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/danielmesafint' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/danielmesafint' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/dmesafint' }
];

export const stats = [
  { value: '16+', label: 'Years in academia' },
  { value: '8', label: 'Publications' },
  { value: '746+', label: 'Citations' },
  { value: '25+', label: 'MSc & PhD topics supervised' }
];

export const about = [
  'I am a passionate scholar and advocate of computer science education, with a PhD, MSc and BSc and sixteen years in teaching and research. My PhD at Mangalore University, India, explored predictive models for the analysis of the HIV/AIDS epidemic, and that work remains my most cited research.',
  'What I enjoy most is mentoring. Supervising MSc and PhD candidates is, for me, a commitment to empower the next generation of computer scientists, and many of my students work on AI for Ethiopian languages and healthcare.'
];

export const education = [
  {
    degree: 'PhD in Computer Science',
    school: 'Mangalore University, Karnataka, India',
    years: '2018 - 2022',
    note: 'Thesis: Exploring Predictive Models for the Analysis of the Epidemics of HIV/AIDS'
  },
  {
    degree: 'MSc in Information Technology',
    school: 'Adama University, Ethiopia',
    years: '2011 - 2012',
    note: 'Thesis: Mining to Identify Telltale Patterns of Child Labor Survey'
  },
  {
    degree: 'BSc in Information Technology',
    school: 'Mekelle University, Ethiopia',
    years: '2005 - 2007',
    note: 'Project: website for St. Frumentius Aba Selama Kessate Birhan Theological College'
  }
];

export const interests = [
  { icon: 'brain', title: 'Machine & Deep Learning', text: 'Predictive models, ensemble learning, hyperparameter optimisation and feature selection.' },
  { icon: 'languages', title: 'NLP for Ethiopian Languages', text: 'Amharic and low-resource language processing, sentiment analysis and question answering.' },
  { icon: 'bot', title: 'Chatbots & Conversational AI', text: 'Conversational agents and virtual assistants, especially for healthcare support.' },
  { icon: 'heart', title: 'AI for Healthcare', text: 'Disease prediction, diagnostic support and data mining of health survey data.' },
  { icon: 'shield', title: 'Trustworthy AI', text: 'Robust, reliable machine learning systems and adversarial networks.' },
  { icon: 'database', title: 'Big Data, Data Mining & IoT', text: 'Feature extraction, data warehousing and Internet of Things applications.' }
];

export const projects = [
  {
    title: 'Multilingual Conversational AI in Healthcare',
    text: 'Chatbots and virtual assistants that give health information in local languages.',
    image: '/images/multilingual-ai.jpg',
    tags: ['NLP', 'Chatbots', 'Healthcare']
  },
  {
    title: 'AI Diagnostics for Rural Ethiopia',
    text: 'An AI-driven tool for early detection of diseases and treatment recommendations in rural communities.',
    image: '/images/rural-diagnostics.jpg',
    tags: ['Diagnostics', 'Machine learning']
  },
  {
    title: 'AI-Driven Malaria Detection',
    text: 'Development and validation of a deep-learning-based diagnostic tool for malaria.',
    image: '/images/malaria-detection.jpg',
    tags: ['Deep learning', 'Medical imaging']
  },
  {
    title: 'Facial Emotion Recognition for Music',
    text: 'Recognising emotions from facial expressions to recommend music on Spotify.',
    image: '/images/emotion-music.jpg',
    tags: ['Computer vision', 'Recommendation']
  }
];

export const SCHOLAR_URL = links[0].href;

export const publicationStats = { total: 8, citations: 746, hIndex: 5 };

export const publications = [
  {
    id: 'ijca-2021', type: 'journal', year: 2021, citations: 704,
    title: 'Grid search in hyperparameter optimization of machine learning models for prediction of HIV/AIDS test results',
    authors: ['Daniel Mesafint Belete', 'Manjaiah D. Huchaiah'],
    venue: 'International Journal of Computers and Applications', details: 'Vol. 44, Issue 9, pp. 875-886',
    publisher: 'Taylor & Francis', indexed: 'Scopus',
    doi: '10.1080/1206212X.2021.1974663', url: 'https://doi.org/10.1080/1206212X.2021.1974663'
  },
  {
    id: 'intech-2023', type: 'chapter', year: 2023, citations: 5,
    title: 'Deep Learning Models for Predicting HIV Test Status using DHS data',
    authors: ['Daniel Mesafint Belete', 'Manjaiah D. Huchaiah'],
    venue: 'Future Opportunities and Tools for Emerging Challenges for HIV/AIDS Control', details: 'pp. 1-21',
    publisher: 'IntechOpen', indexed: 'Scopus',
    doi: '10.5772/intechopen.104224', url: 'https://www.intechopen.com/chapters/81573'
  },
  {
    id: 'icdmai-2021', type: 'conference', year: 2021, citations: 5,
    title: 'Performance Evaluation of Classification Models for HIV/AIDS Dataset',
    authors: ['Daniel Mesafint Belete', 'Manjaiah D. Huchaiah'],
    venue: 'Data Management, Analytics and Innovation (ICDMAI 2021), Kolkata, India', details: 'Vol. 70, pp. 109-125',
    publisher: 'Springer', indexed: 'Scopus',
    doi: '10.1007/978-981-16-2934-1_7', url: 'https://link.springer.com/chapter/10.1007/978-981-16-2934-1_7'
  },
  {
    id: 'ejmcm-2020', type: 'journal', year: 2020, citations: 18,
    title: 'Wrapper Based Feature Selection Techniques on EDHS-HIV/AIDS Dataset',
    authors: ['Daniel Mesafint Belete', 'Manjaiah D. Huchaiah'],
    venue: 'European Journal of Molecular & Clinical Medicine', details: 'Vol. 7, Issue 8, pp. 2642-2657',
    publisher: 'eJournalPlus', indexed: 'Scopus',
    // The journal's original article page no longer resolves.
    url: 'https://scholar.google.com/scholar?q=%22Wrapper+Based+Feature+Selection+Techniques+on+EDHS-HIV%2FAIDS+Dataset%22'
  },
  {
    id: 'icssit-2020', type: 'conference', year: 2020, citations: 7,
    title: 'A Comparative Study of Filter and Wrapper Methods on EDHS-HIV/AIDS Dataset',
    authors: ['Daniel Mesafint Belete', 'Manjaiah D. Huchaiah'],
    venue: 'Third International Conference on Smart Systems and Inventive Technology (ICSSIT 2020)', details: 'pp. 1264-1271',
    publisher: 'IEEE', indexed: 'IEEE Xplore',
    doi: '10.1109/ICSSIT48917.2020.9214212', url: 'https://ieeexplore.ieee.org/document/9214212'
  },
  {
    id: 'dasa-2020', type: 'conference', year: 2020, citations: 5,
    title: 'Classification of Binary Class HIV/AIDS Test Results Using Ensemble Learning Models',
    authors: ['Daniel Mesafint Belete', 'Manjaiah D. Huchaiah'],
    venue: 'International Conference on Decision Aid Sciences and Application (DASA 2020), Bahrain', details: 'pp. 1240-1247',
    publisher: 'IEEE', indexed: 'IEEE Xplore',
    doi: '10.1109/DASA51403.2020.9317082', url: 'https://ieeexplore.ieee.org/document/9317082'
  },
  {
    id: 'ijreat-2019', type: 'journal', year: 2019, citations: 2,
    title: "Feature Selection Methods for Prediction of the Individual's Status of HIV/AIDS from EDHS Dataset - A Filter Approach",
    authors: ['Daniel Mesafint', 'Manjaiah D. H.'],
    venue: 'International Journal of Research in Engineering & Advanced Technology (IJREAT)', details: 'Vol. 7, Issue 3, pp. 29-36',
    publisher: 'Pioneer Research & Development Group', indexed: 'UGC',
    url: 'http://www.ijreat.org/Issue39.html'
  },
  {
    id: 'jetir-2019', type: 'journal', year: 2019, citations: 0,
    title: 'Predictive Models of HIV/AIDS Epidemic Status using Data Mining Techniques: A Review',
    authors: ['Daniel Mesafint', 'Manjaiah D. H.'],
    venue: 'Journal of Emerging Technologies and Innovative Research (JETIR)', details: 'Vol. 6, Issue 5, pp. 10-16',
    publisher: 'IJ Publication', indexed: 'UGC',
    url: 'https://www.jetir.org/view?paper=JETIRCU06003'
  }
];

export const conferences = [
  { name: 'IEEE DASA 2020', place: 'University of Bahrain, Bahrain', date: 'Nov 2020' },
  { name: 'ICRCSIT-2020', place: "St. Martin's Engineering College, India (online)", date: 'Jun 2020' },
  { name: 'ICETSE-2020', place: 'SJC Institute of Technology, India', date: 'Jul 2020' },
  { name: 'IEEE ICSSIT 2020', place: 'Francis Xavier Engineering College, India', date: 'Aug 2020' },
  { name: 'Springer ICDMAI-2021', place: 'Kolkata, India', date: 'Jan 2021' }
];

export const courses = [
  'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Big Data',
  'Advanced Concepts in Data Mining', 'Internet of Things', 'Cloud Computing',
  'Distributed Database Systems', 'Advanced Computer Networks', 'Wireless & Mobile Computing',
  'Service Oriented Architecture', 'Semantic Web Technology', 'Advanced Requirement Engineering',
  'Software Project Management', 'Research Methodology & Scientific Writing',
  'Operating Systems', 'System Analysis & Design', 'Web Programming'
];

export const supervision = [
  'Assessing the challenges of ML practitioners towards robust and trustworthy ML systems',
  'Conversational agent for medical support and diagnosis',
  'Multi-class hate speech detection in Amharic social media text',
  'Detecting exam cheating in classroom video with deep learning',
  'Deep learning model for an Amharic audio-based virtual assistant',
  'Auto-answering model for diabetes in Amharic using deep learning',
  'Automatic Amharic text categorisation from social media data',
  'Prediction model for maternal delivery mode using machine learning',
  'Emotion recognition from facial expression analysis',
  'Medical insurance fraud detection',
  'Automatic question answering for health diagnosis',
  'Customer churn prediction at the Commercial Bank of Ethiopia',
  'Rule-based expert system for diagnosis and treatment of HIV/AIDS',
  'Hybrid fake news detection on social media',
  'Amharic language models for machine translation and sentiment analysis',
  'Price prediction of seasonal agricultural products with deep learning',
  'Real-time car fuel consumption monitoring with IoT',
  'Ensemble models for stock market prediction',
  'Predicting effective metrics of IT projects with machine learning',
  'Deep learning for fraud detection in motor insurance',
  'Mobile network congestion prediction for Ethio Telecom',
  'Liver disease prediction with machine learning',
  'Ethiopian currency classification with neural networks',
  'Fine-grained car image classification with multimodal data',
  'Sentiment analysis for the Himtagna language',
  'Part-of-speech tagging for the Harari language',
  'Vehicle reliability prediction and failure mode analysis'
];

export const experience = [
  {
    role: 'Research, Community Service & Technology Transfer Coordinator',
    org: 'Gafat Institute of Technology, Debre Tabor University',
    years: '2023 - Present',
    text: 'Leads research, community service, technology transfer and university-industry linkage; reports to the Vice President for Research and Technology Transfer.'
  },
  {
    role: 'Assistant Professor',
    org: 'Department of Computer Science & IT, Debre Tabor University',
    years: '2015 - Present',
    text: 'Teaches undergraduate and postgraduate courses, designs curricula, supervises MSc students and conducts research.'
  },
  {
    role: 'IT Instructor / Trainer',
    org: 'Debre Tabor Polytechnic College',
    years: '2009 - 2015',
    text: 'Designed and delivered ICT training; served as Registrar Evaluation Director, Business Department Head and IT Department Head.'
  },
  {
    role: 'Part-time Lecturer',
    org: 'Fekede-Egzi College, Debre Tabor',
    years: '2010 - 2012',
    text: 'Lectures, tutorials and assessment in information technology.'
  },
  {
    role: 'IT Instructor / Trainer',
    org: 'Almaz Boum Technical & Vocational College, Alem Ketema',
    years: '2008 - 2009',
    text: 'Developed training materials and delivered IT training programmes.'
  }
];

export const reviewer = [
  'ACM Transactions on Knowledge Discovery from Data', 'BMJ Public Health', 'Journal of Big Data',
  'IEEE Access', 'Informatics in Medicine Unlocked', 'MethodsX',
  'Environmental Monitoring and Assessment', 'African Development Review'
];

export const committees = [
  'Academic Council member, Debre Tabor University',
  'Technology Transfer Committee team leader',
  'Research guidelines preparation team, DTU Research Center',
  'MSc curriculum design committee',
  'National COC assessor for IT competencies',
  'Regional TVET curriculum designer'
];

export const certifications = [
  'Cisco CCNA Discovery I-IV',
  'Ethiopian Occupational Standard Level IV: IT Assistance and Database Administration',
  'AI & Machine Learning (NITK, Mangalore)',
  'Internet of Things (IBM, Mangalore University)',
  'Big Data Processing with Apache Spark',
  'Network Simulations Using NS-3'
];
