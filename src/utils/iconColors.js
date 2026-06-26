// Icon Color Utility Functions
// This utility helps apply brand colors and theme-adaptive colors to icons

/**
 * Get the appropriate icon class based on the icon type or content
 * @param {string} iconType - The type of icon (e.g., 'github', 'linkedin', 'react', etc.)
 * @param {string} content - Optional content to help determine icon type
 * @returns {string} - The CSS class for the icon
 */
export const getIconColorClass = (iconType, content = '') => {
  const baseClass = 'icon-colorful';
  
  // Normalize the input
  const type = iconType?.toLowerCase() || '';
  const contentLower = content?.toLowerCase() || '';
  
  // Technology icons
  if (type.includes('react') || contentLower.includes('react')) return `${baseClass} icon-react`;
  if (type.includes('javascript') || contentLower.includes('javascript') || contentLower.includes('js')) return `${baseClass} icon-javascript`;
  if (type.includes('python') || contentLower.includes('python')) return `${baseClass} icon-python`;
  if (type.includes('nodejs') || type.includes('node') || contentLower.includes('node')) return `${baseClass} icon-nodejs`;
  if (type.includes('typescript') || contentLower.includes('typescript') || contentLower.includes('ts')) return `${baseClass} icon-typescript`;
  if (type.includes('html') || contentLower.includes('html')) return `${baseClass} icon-html`;
  if (type.includes('css') || contentLower.includes('css')) return `${baseClass} icon-css`;
  if (type.includes('vue') || contentLower.includes('vue')) return `${baseClass} icon-vue`;
  if (type.includes('angular') || contentLower.includes('angular')) return `${baseClass} icon-angular`;
  if (type.includes('svelte') || contentLower.includes('svelte')) return `${baseClass} icon-svelte`;
  
  // Database & Backend
  if (type.includes('mongodb') || contentLower.includes('mongodb') || contentLower.includes('mongo')) return `${baseClass} icon-mongodb`;
  if (type.includes('postgresql') || contentLower.includes('postgresql') || contentLower.includes('postgres')) return `${baseClass} icon-postgresql`;
  if (type.includes('mysql') || contentLower.includes('mysql')) return `${baseClass} icon-mysql`;
  if (type.includes('redis') || contentLower.includes('redis')) return `${baseClass} icon-redis`;
  if (type.includes('graphql') || contentLower.includes('graphql')) return `${baseClass} icon-graphql`;
  if (type.includes('firebase') || contentLower.includes('firebase')) return `${baseClass} icon-firebase`;
  
  // Cloud & DevOps
  if (type.includes('aws') || contentLower.includes('aws') || contentLower.includes('amazon')) return `${baseClass} icon-aws`;
  if (type.includes('azure') || contentLower.includes('azure')) return `${baseClass} icon-azure`;
  if (type.includes('gcp') || contentLower.includes('google cloud') || contentLower.includes('gcp')) return `${baseClass} icon-gcp`;
  if (type.includes('docker') || contentLower.includes('docker')) return `${baseClass} icon-docker`;
  if (type.includes('kubernetes') || contentLower.includes('kubernetes') || contentLower.includes('k8s')) return `${baseClass} icon-kubernetes`;
  if (type.includes('terraform') || contentLower.includes('terraform')) return `${baseClass} icon-terraform`;
  
  // AI/ML Frameworks
  if (type.includes('tensorflow') || contentLower.includes('tensorflow')) return `${baseClass} icon-tensorflow`;
  if (type.includes('pytorch') || contentLower.includes('pytorch')) return `${baseClass} icon-pytorch`;
  if (type.includes('scikit') || contentLower.includes('scikit-learn') || contentLower.includes('sklearn')) return `${baseClass} icon-scikit`;
  if (type.includes('pandas') || contentLower.includes('pandas')) return `${baseClass} icon-pandas`;
  if (type.includes('numpy') || contentLower.includes('numpy')) return `${baseClass} icon-numpy`;
  if (type.includes('jupyter') || contentLower.includes('jupyter')) return `${baseClass} icon-jupyter`;
  
  // Social Media
  if (type.includes('github') || contentLower.includes('github')) return `${baseClass} icon-github`;
  if (type.includes('linkedin') || contentLower.includes('linkedin')) return `${baseClass} icon-linkedin`;
  if (type.includes('twitter') || contentLower.includes('twitter')) return `${baseClass} icon-twitter`;
  if (type.includes('youtube') || contentLower.includes('youtube')) return `${baseClass} icon-youtube`;
  if (type.includes('instagram') || contentLower.includes('instagram')) return `${baseClass} icon-instagram`;
  if (type.includes('facebook') || contentLower.includes('facebook')) return `${baseClass} icon-facebook`;
  
  // Communication & Productivity
  if (type.includes('slack') || contentLower.includes('slack')) return `${baseClass} icon-slack`;
  if (type.includes('discord') || contentLower.includes('discord')) return `${baseClass} icon-discord`;
  if (type.includes('zoom') || contentLower.includes('zoom')) return `${baseClass} icon-zoom`;
  if (type.includes('notion') || contentLower.includes('notion')) return `${baseClass} icon-notion`;
  if (type.includes('figma') || contentLower.includes('figma')) return `${baseClass} icon-figma`;
  if (type.includes('adobe') || contentLower.includes('adobe')) return `${baseClass} icon-adobe`;
  
  // Academic & Research
  if (type.includes('scholar') || contentLower.includes('google scholar') || contentLower.includes('scholar')) return `${baseClass} icon-scholar`;
  if (type.includes('researchgate') || contentLower.includes('researchgate')) return `${baseClass} icon-researchgate`;
  if (type.includes('orcid') || contentLower.includes('orcid')) return `${baseClass} icon-orcid`;
  if (type.includes('arxiv') || contentLower.includes('arxiv')) return `${baseClass} icon-arxiv`;
  if (type.includes('pubmed') || contentLower.includes('pubmed')) return `${baseClass} icon-pubmed`;
  
  // General Purpose Icons
  if (type.includes('mail') || type.includes('email') || contentLower.includes('mail') || contentLower.includes('email')) return `${baseClass} icon-mail`;
  if (type.includes('calendar') || contentLower.includes('calendar') || contentLower.includes('date')) return `${baseClass} icon-calendar`;
  if (type.includes('file') || contentLower.includes('file') || contentLower.includes('document')) return `${baseClass} icon-file`;
  if (type.includes('download') || contentLower.includes('download')) return `${baseClass} icon-download`;
  if (type.includes('search') || contentLower.includes('search')) return `${baseClass} icon-search`;
  if (type.includes('home') || contentLower.includes('home')) return `${baseClass} icon-home`;
  if (type.includes('user') || type.includes('profile') || contentLower.includes('user') || contentLower.includes('profile')) return `${baseClass} icon-user`;
  if (type.includes('award') || contentLower.includes('award') || contentLower.includes('trophy')) return `${baseClass} icon-award`;
  if (type.includes('book') || contentLower.includes('book') || contentLower.includes('education')) return `${baseClass} icon-book`;
  if (type.includes('briefcase') || type.includes('work') || contentLower.includes('briefcase') || contentLower.includes('work') || contentLower.includes('job')) return `${baseClass} icon-briefcase`;
  if (type.includes('globe') || type.includes('world') || contentLower.includes('globe') || contentLower.includes('world') || contentLower.includes('web')) return `${baseClass} icon-globe`;
  if (type.includes('chart') || type.includes('analytics') || contentLower.includes('chart') || contentLower.includes('analytics') || contentLower.includes('stats')) return `${baseClass} icon-chart`;
  if (type.includes('message') || type.includes('chat') || contentLower.includes('message') || contentLower.includes('chat')) return `${baseClass} icon-message`;
  if (type.includes('code') || contentLower.includes('code') || contentLower.includes('programming')) return `${baseClass} icon-code`;
  if (type.includes('terminal') || contentLower.includes('terminal') || contentLower.includes('console')) return `${baseClass} icon-terminal`;
  if (type.includes('play') || contentLower.includes('play') || contentLower.includes('run')) return `${baseClass} icon-play`;
  if (type.includes('copy') || contentLower.includes('copy') || contentLower.includes('clipboard')) return `${baseClass} icon-copy`;
  
  // Default fallback
  return baseClass;
};

/**
 * Get icon class with size
 * @param {string} iconType - The type of icon
 * @param {string} size - Size variant (xs, sm, md, lg, xl, 2xl)
 * @param {string} content - Optional content to help determine icon type
 * @returns {string} - The complete CSS class string
 */
export const getIconClass = (iconType, size = 'md', content = '') => {
  const colorClass = getIconColorClass(iconType, content);
  const sizeClass = `icon-${size}`;
  return `${colorClass} ${sizeClass}`;
};

/**
 * Get icon class with animation
 * @param {string} iconType - The type of icon
 * @param {string} animation - Animation type (pulse, bounce, spin)
 * @param {string} size - Size variant
 * @param {string} content - Optional content
 * @returns {string} - The complete CSS class string with animation
 */
export const getAnimatedIconClass = (iconType, animation = '', size = 'md', content = '') => {
  const baseClass = getIconClass(iconType, size, content);
  const animationClass = animation ? `icon-${animation}` : '';
  return `${baseClass} ${animationClass}`.trim();
};

/**
 * Icon mapping for common use cases
 */
export const ICON_MAPPINGS = {
  // Navigation
  home: 'icon-home',
  about: 'icon-user',
  research: 'icon-search',
  publications: 'icon-file',
  projects: 'icon-briefcase',
  blog: 'icon-file',
  contact: 'icon-mail',
  
  // Actions
  download: 'icon-download',
  search: 'icon-search',
  play: 'icon-play',
  copy: 'icon-copy',
  
  // Social
  github: 'icon-github',
  linkedin: 'icon-linkedin',
  twitter: 'icon-twitter',
  email: 'icon-mail',
  
  // Technologies
  react: 'icon-react',
  javascript: 'icon-javascript',
  python: 'icon-python',
  nodejs: 'icon-nodejs',
  docker: 'icon-docker',
  aws: 'icon-aws',
  
  // Academic
  scholar: 'icon-scholar',
  researchgate: 'icon-researchgate',
  orcid: 'icon-orcid',
  arxiv: 'icon-arxiv'
};

/**
 * Quick access function for common icons
 * @param {string} key - Key from ICON_MAPPINGS
 * @param {string} size - Size variant
 * @returns {string} - The CSS class string
 */
export const getCommonIconClass = (key, size = 'md') => {
  const iconClass = ICON_MAPPINGS[key] || 'icon-colorful';
  const sizeClass = `icon-${size}`;
  return `${iconClass} ${sizeClass}`;
};