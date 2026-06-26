// Accessibility utility functions

// Screen reader announcements
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Focus management
export const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  const handleTabKey = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
    
    if (e.key === 'Escape') {
      element.dispatchEvent(new CustomEvent('closeFocusTrap'));
    }
  };
  
  element.addEventListener('keydown', handleTabKey);
  firstElement?.focus();
  
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

// Skip link component
export const SkipLink = ({ href, children }) => (
  <a
    href={href}
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white"
    onFocus={() => announceToScreenReader('Skip link focused')}
  >
    {children}
  </a>
);

// Accessible button with loading state
export const AccessibleButton = ({ 
  children, 
  loading = false, 
  disabled = false, 
  ariaLabel,
  onClick,
  className = '',
  ...props 
}) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    aria-label={ariaLabel}
    aria-busy={loading}
    className={`${className} focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2`}
    {...props}
  >
    {loading ? (
      <>
        <span className="sr-only">Loading...</span>
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      </>
    ) : null}
    {children}
  </button>
);

// Accessible heading with proper hierarchy
export const AccessibleHeading = ({ level = 1, children, className = '', ...props }) => {
  const Tag = `h${Math.min(Math.max(level, 1), 6)}`;
  
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
};

// Color contrast checker (for development)
export const checkColorContrast = (foreground, background) => {
  // Simplified contrast ratio calculation
  const getLuminance = (color) => {
    const rgb = color.match(/\d+/g);
    if (!rgb) return 0;
    
    const [r, g, b] = rgb.map(c => {
      c = parseInt(c) / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  
  return {
    ratio,
    aa: ratio >= 4.5,
    aaa: ratio >= 7
  };
};

// Keyboard navigation helpers
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  HOME: 'Home',
  END: 'End'
};

export const handleKeyboardNavigation = (e, actions = {}) => {
  const { key } = e;
  
  if (actions[key]) {
    e.preventDefault();
    actions[key](e);
  }
};