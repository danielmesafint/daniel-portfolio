// Performance monitoring and optimization utilities

// Web Vitals monitoring
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Measure First Contentful Paint (FCP)
  const measureFCP = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
      });
    });
    observer.observe({ entryTypes: ['paint'] });
  };

  // Measure Largest Contentful Paint (LCP)
  const measureLCP = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  };

  // Measure Cumulative Layout Shift (CLS)
  const measureCLS = () => {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log('CLS:', clsValue);
    });
    observer.observe({ entryTypes: ['layout-shift'] });
  };

  // Measure First Input Delay (FID)
  const measureFID = () => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('FID:', entry.processingStart - entry.startTime);
      }
    });
    observer.observe({ entryTypes: ['first-input'] });
  };

  measureFCP();
  measureLCP();
  measureCLS();
  measureFID();
};

// Image optimization utilities
export const createOptimizedImage = (src, options = {}) => {
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    loading = 'lazy'
  } = options;

  return {
    src,
    srcSet: generateSrcSet(src, { width, height, quality, format }),
    loading,
    decoding: 'async',
    style: { aspectRatio: width && height ? `${width}/${height}` : undefined }
  };
};

const generateSrcSet = (src, options) => {
  const { width, quality, format } = options;
  if (!width) return src;

  const sizes = [1, 1.5, 2]; // 1x, 1.5x, 2x
  return sizes
    .map(size => `${src}?w=${Math.round(width * size)}&q=${quality}&f=${format} ${size}x`)
    .join(', ');
};

// Bundle size analyzer (development only)
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV !== 'development') return;

  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

  const analyzeResource = async (element, type) => {
    const url = element.src || element.href;
    try {
      const response = await fetch(url);
      const size = response.headers.get('content-length');
      console.log(`${type}: ${url} - ${formatBytes(size)}`);
    } catch (error) {
      console.warn(`Could not analyze ${type}:`, url);
    }
  };

  scripts.forEach(script => analyzeResource(script, 'Script'));
  styles.forEach(style => analyzeResource(style, 'Stylesheet'));
};

const formatBytes = (bytes) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if (!performance.memory) return;

  const logMemoryUsage = () => {
    const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory;
    
    console.log('Memory Usage:', {
      used: formatBytes(usedJSHeapSize),
      total: formatBytes(totalJSHeapSize),
      limit: formatBytes(jsHeapSizeLimit),
      percentage: ((usedJSHeapSize / jsHeapSizeLimit) * 100).toFixed(2) + '%'
    });
  };

  // Log memory usage every 30 seconds in development
  if (process.env.NODE_ENV === 'development') {
    setInterval(logMemoryUsage, 30000);
  }
};

// Performance budget checker
export const checkPerformanceBudget = () => {
  const budget = {
    fcp: 1800, // First Contentful Paint (ms)
    lcp: 2500, // Largest Contentful Paint (ms)
    fid: 100,  // First Input Delay (ms)
    cls: 0.1   // Cumulative Layout Shift
  };

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      const metric = entry.entryType;
      const value = entry.startTime || entry.value;
      
      if (budget[metric] && value > budget[metric]) {
        console.warn(`Performance budget exceeded for ${metric}: ${value} > ${budget[metric]}`);
      }
    });
  });

  observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
};

// Lazy loading utility
export const createLazyLoader = (selector, options = {}) => {
  const defaultOptions = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Load images
        if (element.dataset.src) {
          element.src = element.dataset.src;
          element.removeAttribute('data-src');
        }
        
        // Load background images
        if (element.dataset.bg) {
          element.style.backgroundImage = `url(${element.dataset.bg})`;
          element.removeAttribute('data-bg');
        }
        
        observer.unobserve(element);
      }
    });
  }, defaultOptions);

  document.querySelectorAll(selector).forEach((element) => {
    observer.observe(element);
  });

  return observer;
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  measureWebVitals();
  monitorMemoryUsage();
  checkPerformanceBudget();
  
  // Initialize lazy loading for images
  createLazyLoader('[data-src], [data-bg]');
  
  // Analyze bundle size in development
  if (process.env.NODE_ENV === 'development') {
    setTimeout(analyzeBundleSize, 2000);
  }
};