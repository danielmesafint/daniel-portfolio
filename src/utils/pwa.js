// PWA Service Worker Registration and Utilities

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

// Register service worker - DISABLED FOR DEVELOPMENT
export function registerSW() {
  // DEVELOPMENT MODE: Disable service worker to prevent caching issues
  console.log('PWA: Service worker disabled for development');
  return;
  
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl);
        navigator.serviceWorker.ready.then(() => {
          console.log('PWA: Service worker is ready for offline use.');
        });
      } else {
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('PWA: Service worker registered successfully:', registration);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('PWA: New content is available; please refresh.');
              showUpdateAvailableNotification();
            } else {
              console.log('PWA: Content is cached for offline use.');
              showOfflineReadyNotification();
            }
          }
        });
      });
      
      // Set up periodic sync for content updates
      if ('periodicSync' in registration) {
        registration.periodicSync.register('content-sync', {
          minInterval: 24 * 60 * 60 * 1000, // 24 hours
        }).then(() => {
          console.log('PWA: Periodic sync registered');
        }).catch((error) => {
          console.log('PWA: Periodic sync registration failed:', error);
        });
      }
    })
    .catch((error) => {
      console.error('PWA: Service worker registration failed:', error);
    });
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log('PWA: No internet connection found. App is running in offline mode.');
    });
}

// Unregister service worker
export function unregisterSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

// Show update available notification
function showUpdateAvailableNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Portfolio Update Available', {
      body: 'A new version of the portfolio is available. Refresh to update.',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: 'update-available',
      requireInteraction: true,
      actions: [
        {
          action: 'refresh',
          title: 'Refresh Now'
        },
        {
          action: 'dismiss',
          title: 'Later'
        }
      ]
    });
  }
  
  // Also show in-app notification
  const event = new CustomEvent('pwa-update-available');
  window.dispatchEvent(event);
}

// Show offline ready notification
function showOfflineReadyNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Portfolio Ready for Offline Use', {
      body: 'The portfolio has been cached and is now available offline.',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: 'offline-ready'
    });
  }
  
  // Also show in-app notification
  const event = new CustomEvent('pwa-offline-ready');
  window.dispatchEvent(event);
}

// Cache management utilities
export const cacheManager = {
  // Get cache size
  async getCacheSize() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      let totalSize = 0;
      
      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
          }
        }
      }
      
      return totalSize;
    }
    return 0;
  },

  // Clear all caches
  async clearAllCaches() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('PWA: All caches cleared');
    }
  },

  // Clear specific cache
  async clearCache(cacheName) {
    if ('caches' in window) {
      await caches.delete(cacheName);
      console.log(`PWA: Cache ${cacheName} cleared`);
    }
  }
};

// Offline storage utilities
export const offlineStorage = {
  // Store form data for offline submission
  async storeFormData(formType, data) {
    if ('indexedDB' in window) {
      const db = await openIndexedDB();
      const transaction = db.transaction([formType], 'readwrite');
      const store = transaction.objectStore(formType);
      
      const formData = {
        data,
        timestamp: Date.now(),
        synced: false
      };
      
      await store.add(formData);
      console.log(`PWA: ${formType} data stored for offline sync`);
      
      // Register background sync
      if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register(`${formType}-sync`);
      }
    }
  },

  // Get pending form data
  async getPendingForms(formType) {
    if ('indexedDB' in window) {
      const db = await openIndexedDB();
      const transaction = db.transaction([formType], 'readonly');
      const store = transaction.objectStore(formType);
      const request = store.getAll();
      
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result.filter(item => !item.synced));
        request.onerror = () => reject(request.error);
      });
    }
    return [];
  }
};

// IndexedDB helper
function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('PortfolioOfflineDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('contactForms')) {
        db.createObjectStore('contactForms', { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains('collaborationRequests')) {
        db.createObjectStore('collaborationRequests', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// Push notification utilities
export const pushNotifications = {
  // Subscribe to push notifications
  async subscribe() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY)
        });
        
        // Send subscription to server
        await fetch('/api/push-subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subscription)
        });
        
        console.log('PWA: Push notification subscription successful');
        return subscription;
      } catch (error) {
        console.error('PWA: Push notification subscription failed:', error);
        throw error;
      }
    }
  },

  // Unsubscribe from push notifications
  async unsubscribe() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        
        if (subscription) {
          await subscription.unsubscribe();
          
          // Notify server
          await fetch('/api/push-unsubscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscription)
          });
          
          console.log('PWA: Push notification unsubscription successful');
        }
      } catch (error) {
        console.error('PWA: Push notification unsubscription failed:', error);
        throw error;
      }
    }
  },

  // Check if subscribed
  async isSubscribed() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        return !!subscription;
      } catch (error) {
        console.error('PWA: Error checking subscription status:', error);
        return false;
      }
    }
    return false;
  }
};

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Performance monitoring
export const performanceMonitor = {
  // Measure and log performance metrics
  measurePerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          const metrics = {
            dns: perfData.domainLookupEnd - perfData.domainLookupStart,
            tcp: perfData.connectEnd - perfData.connectStart,
            request: perfData.responseStart - perfData.requestStart,
            response: perfData.responseEnd - perfData.responseStart,
            dom: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            load: perfData.loadEventEnd - perfData.loadEventStart,
            total: perfData.loadEventEnd - perfData.navigationStart
          };
          
          console.log('PWA Performance Metrics:', metrics);
          
          // Send to analytics if available
          if (window.gtag) {
            window.gtag('event', 'page_load_time', {
              value: Math.round(metrics.total),
              custom_parameter: 'pwa_enabled'
            });
          }
        }, 0);
      });
    }
  },

  // Monitor cache hit rates
  monitorCacheHits() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_HIT') {
          console.log('PWA: Cache hit for:', event.data.url);
        }
      });
    }
  }
};