import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: 'danielmesafint1985@gmail.com',
      href: 'mailto:danielmesafint1985@gmail.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: '+251-912023274',
      href: 'tel:+251912023274',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      label: t('contact.info.location'),
      value: 'Debre Tabor, Ethiopia',
      href: 'https://maps.google.com/?q=Debre+Tabor+Ethiopia',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Calendar,
      label: t('contact.info.schedule'),
      value: 'Book a consultation',
      href: 'mailto:danielmesafint1985@gmail.com?subject=Consultation%20request',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  // Social Media Icon Component
  const SocialIcon = ({ src, alt, size = 20, className = "" }) => (
    <img 
      src={src} 
      alt={alt} 
      width={size} 
      height={size} 
      className={`${className} object-contain`}
    />
  );

  const socialLinks = (() => {
    // Chrome-compatible cache-busting
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const baseUrl = process.env.PUBLIC_URL || '';
    
    return [
      {
        iconSrc: `${baseUrl}/social_media-icons/linkedin.png?v=${timestamp}&r=${randomId}`,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/danielmesafint',
        color: 'hover:text-blue-400'
      },
      {
        iconSrc: `${baseUrl}/social_media-icons/github.png?v=${timestamp}&r=${randomId}`,
        label: 'GitHub',
        href: 'https://github.com/danielmesafint',
        color: 'hover:text-gray-400'
      },
      {
        iconSrc: `${baseUrl}/social_media-icons/researchgate.png?v=${timestamp}&r=${randomId}`,
        label: 'ResearchGate',
        href: 'https://www.researchgate.net/profile/Daniel-Belete',
        color: 'hover:text-green-400'
      },
      {
        iconSrc: `${baseUrl}/social_media-icons/googlescholar.png?v=${timestamp}&r=${randomId}`,
        label: 'Google Scholar',
        href: 'https://scholar.google.com/citations?user=hxLjZCAAAAAJ&hl=en',
        color: 'hover:text-yellow-400'
      },
      {
        iconSrc: `${baseUrl}/social_media-icons/orcid.png?v=${timestamp}&r=${randomId}`,
        label: 'ORCID',
        href: 'https://orcid.org/0000-0002-8424-5069',
        color: 'hover:text-lime-400'
      },
      {
        iconSrc: `${baseUrl}/social_media-icons/telegram.png?v=${timestamp}&r=${randomId}`,
        label: 'Telegram',
        href: 'https://t.me/+251912023274',
        color: 'hover:text-blue-500'
      },
      {
        iconSrc: `${baseUrl}/social_media-icons/whatsapp.png?v=${timestamp}&r=${randomId}`,
        label: 'WhatsApp',
        href: 'https://wa.me/251912023274',
        color: 'hover:text-green-500'
      },
      {
        iconSrc: `${baseUrl}/social_media-icons/facebbok.png?v=${timestamp}&r=${randomId}`,
        label: 'Facebook',
        href: 'https://www.facebook.com/dmesafint',
        color: 'hover:text-blue-600'
      },
      {
        iconSrc: `${baseUrl}/social_media-icons/twitter.png?v=${timestamp}&r=${randomId}`,
        label: 'Twitter',
        href: 'https://twitter.com/danielmesafint',
        color: 'hover:text-blue-400'
      },
      {
        iconSrc: `${baseUrl}/social_media-icons/email.png?v=${timestamp}&r=${randomId}`,
        label: 'Email',
        href: 'mailto:danielmesafint1985@gmail.com',
        color: 'hover:text-red-400'
      },
      {
        iconSrc: `${baseUrl}/social_media-icons/youtube.png?v=${timestamp}&r=${randomId}`,
        label: 'YouTube',
        href: 'https://youtube.com/@danielmesafint',
        color: 'hover:text-red-500'
      }
    ];
  })();

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'research', label: 'Research Collaboration' },
    { value: 'supervision', label: 'Student Supervision' },
    { value: 'consulting', label: 'Consulting Services' },
    { value: 'speaking', label: 'Speaking Engagement' },
    { value: 'media', label: 'Media Interview' }
  ];

  return (
    <section className="pb-20 bg-neutral-900 relative" style={{ paddingTop: '2px' }}>
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
          style={{ marginTop: '40px' }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight" style={{ color: '#6366f1' }}>
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* GRIDO-Style Contact Cards - Proportional Layout */}
        <div className="space-y-6">
          
          {/* Top Row: 4 Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : '_self'}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="grido-card p-6 rounded-2xl text-center cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center mx-auto mb-4`}>
                  <info.icon size={24} className="text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{info.label}</h4>
                <p className="text-gray-400 text-sm">{info.value}</p>
              </motion.a>
            ))}
          </div>

          {/* Bottom Row: 2 Full-Width Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Social Links Card - Fixed Layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grido-card p-6 rounded-2xl text-center"
            >
              <h4 className="text-lg font-bold text-white mb-6">Connect With Me</h4>

              <div className="grid grid-cols-4 gap-4 mb-4">
                {socialLinks.slice(0, 4).map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-neutral-700/50 hover:bg-primary-500/20 rounded-xl border border-neutral-600 hover:border-primary-500 transition-all duration-300 flex items-center justify-center h-16 w-full"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <img 
                      src={social.iconSrc}
                      alt={social.label}
                      width={32}
                      height={32}
                      className="transition-all duration-300 hover:scale-110 filter brightness-100 hover:brightness-125 object-contain"
                      style={{
                        display: 'block !important',
                        visibility: 'visible !important',
                        opacity: '1 !important',
                        minWidth: '32px',
                        minHeight: '32px',
                        maxWidth: '32px',
                        maxHeight: '32px'
                      }}
                      onError={(e) => {
                        console.log('Failed to load icon:', social.iconSrc);
                        // Fallback to a simple colored div if image fails
                        e.target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'w-8 h-8 bg-primary-500 rounded flex items-center justify-center text-white font-bold';
                        fallback.textContent = social.label.charAt(0);
                        e.target.parentNode.appendChild(fallback);
                      }}
                      onLoad={() => console.log('Successfully loaded icon:', social.iconSrc)}
                    />
                  </motion.a>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.slice(4, 7).map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-neutral-700/50 hover:bg-primary-500/20 rounded-xl border border-neutral-600 hover:border-primary-500 transition-all duration-300 flex items-center justify-center h-16 w-full"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <img 
                      src={social.iconSrc}
                      alt={social.label}
                      width={32}
                      height={32}
                      className="transition-all duration-300 hover:scale-110 filter brightness-100 hover:brightness-125 object-contain"
                      style={{
                        display: 'block !important',
                        visibility: 'visible !important',
                        opacity: '1 !important',
                        minWidth: '32px',
                        minHeight: '32px',
                        maxWidth: '32px',
                        maxHeight: '32px'
                      }}
                      onError={(e) => {
                        console.log('Failed to load icon:', social.iconSrc);
                        // Fallback to a simple colored div if image fails
                        e.target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'w-8 h-8 bg-primary-500 rounded flex items-center justify-center text-white font-bold';
                        fallback.textContent = social.label.charAt(0);
                        e.target.parentNode.appendChild(fallback);
                      }}
                      onLoad={() => console.log('Successfully loaded icon:', social.iconSrc)}
                    />
                  </motion.a>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {socialLinks.slice(7).map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-neutral-700/50 hover:bg-primary-500/20 rounded-xl border border-neutral-600 hover:border-primary-500 transition-all duration-300 flex items-center justify-center h-16 w-full"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <img 
                      src={social.iconSrc}
                      alt={social.label}
                      width={32}
                      height={32}
                      className="transition-all duration-300 hover:scale-110 filter brightness-100 hover:brightness-125 object-contain"
                      style={{
                        display: 'block !important',
                        visibility: 'visible !important',
                        opacity: '1 !important',
                        minWidth: '32px',
                        minHeight: '32px',
                        maxWidth: '32px',
                        maxHeight: '32px'
                      }}
                      onError={(e) => {
                        console.log('Failed to load icon:', social.iconSrc);
                        // Fallback to a simple colored div if image fails
                        e.target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'w-8 h-8 bg-primary-500 rounded flex items-center justify-center text-white font-bold';
                        fallback.textContent = social.label.charAt(0);
                        e.target.parentNode.appendChild(fallback);
                      }}
                      onLoad={() => console.log('Successfully loaded icon:', social.iconSrc)}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Office Hours Card - Full Text Format */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grido-card p-6 rounded-2xl"
            >
              <h4 className="text-lg font-bold text-white mb-4 text-center">Office Hours</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Monday - Friday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Response Time:</span>
                  <span>Within 24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Best Time to Call:</span>
                  <span>2:00 - 4:00 PM</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact Form and Quick Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-12">
          
          {/* Contact Form - Spans 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3 grido-card p-6 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Send a Message
            </h3>

            {/* Success/Error Messages */}
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center space-x-2 p-4 rounded-lg mb-6 ${
                  submitStatus === 'success'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {submitStatus === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span>
                  {submitStatus === 'success'
                    ? 'Message sent successfully! I\'ll get back to you soon.'
                    : 'Failed to send message. Please try again.'}
                </span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Inquiry Type */}
              <div>
                <label htmlFor="type" className="block text-gray-300 text-sm font-medium mb-2">
                  Inquiry Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:border-primary-500 focus:outline-none transition-colors"
                >
                  {inquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Brief subject of your message"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors resize-vertical"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-neutral-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-500 to-grido-purple text-white hover:shadow-lg hover:shadow-primary-500/25'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-gray-400 text-sm mt-4 text-center">
              * Required fields. I typically respond within 24 hours.
            </p>
          </motion.div>

          {/* Quick Contact Card - Spans 1 column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grido-card p-6 rounded-2xl text-center"
          >
            <h4 className="text-lg font-bold text-white mb-4">Quick Chat?</h4>
            <div className="space-y-3">
              <motion.a
                href="mailto:danielmesafint1985@gmail.com?subject=Consultation%20request"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block bg-gradient-to-r from-primary-500 to-grido-purple px-4 py-3 rounded-lg text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25"
              >
                <Calendar size={16} className="inline mr-2" />
                Schedule Meeting
              </motion.a>
              
              <motion.a
                href="mailto:danielmesafint1985@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block border border-primary-400 hover:bg-primary-400 px-4 py-3 rounded-lg text-primary-400 hover:text-white text-sm font-semibold transition-all duration-300"
              >
                <Mail size={16} className="inline mr-2 icon-colorful icon-mail" />
                Quick Email
              </motion.a>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
};

export default Contact;