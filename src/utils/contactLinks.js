// Shared helpers so every "contact" style button does something real.
export const CONTACT_EMAIL = 'danielmesafint1985@gmail.com';
export const CV_URL = '/Dr_Daniel_Mesafint_CV.pdf';
export const WHATSAPP_URL = 'https://wa.me/251912023274';

export const openEmail = (subject, body = '') => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  window.location.href = `mailto:${CONTACT_EMAIL}${query ? `?${query}` : ''}`;
};

export const openCV = () => {
  window.open(CV_URL, '_blank', 'noopener');
};

export const scrollToId = (id) => {
  const el = document.getElementById(id.replace('#', ''));
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};
