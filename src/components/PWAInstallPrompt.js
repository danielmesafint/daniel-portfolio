import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Download, 
  X, 
  Smartphone, 
  Monitor, 
  Wifi, 
  WifiOff, 
  Bell, 
  BellOff,
  Check,
  AlertCircle
} from 'lucide-react';

const PWAInstallPrompt = () => {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [showOfflineIndicator, setShowOfflineIndicator] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.navigator.standalone === true) {
        setIsInstalled(true);
      }
    };

    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show install prompt after a delay if not installed
      setTimeout(() => {
        if (!isInstalled) {
          setShowInstallPrompt(true);
        }
      }, 10000); // Show after 10 seconds
    };

    // Handle online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineIndicator(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineIndicator(true);
      
      // Hide offline indicator after 5 seconds
      setTimeout(() => {
        setShowOfflineIndicator(false);
      }, 5000);
    };

    // Check notification permission
    const checkNotificationPermission = () => {
      if ('Notification' in window) {
        setNotificationPermission(Notification.permission);
      }
    };

    // Event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initial checks
    checkIfInstalled();
    checkNotificationPermission();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA installation accepted');
        setIsInstalled(true);
      } else {
        console.log('PWA installation dismissed');
      }
      
      // Clear the deferred prompt
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Error during PWA installation:', error);
    }
  };

  const handleNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        // Register for push notifications
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          const registration = await navigator.serviceWorker.ready;
          
          // Subscribe to push notifications
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY
          });
          
          // Send subscription to server
          await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscription)
          });
          
          console.log('Push notification subscription successful');
        }
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const dismissInstallPrompt = () => {
    setShowInstallPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show install prompt if already dismissed this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      setShowInstallPrompt(false);
    }
  }, []);

  return (
    <>
      {/* Install Prompt */}
      <AnimatePresence>
        {showInstallPrompt && !isInstalled && deferredPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-2xl p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Install Portfolio App</h3>
                    <p className="text-blue-100 text-sm">Get the full mobile experience</p>
                  </div>
                </div>
                <button
                  onClick={dismissInstallPrompt}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Check size={16} className="text-green-300" />
                  <span>Works offline</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Check size={16} className="text-green-300" />
                  <span>Fast loading</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Check size={16} className="text-green-300" />
                  <span>Push notifications</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Check size={16} className="text-green-300" />
                  <span>Native app feel</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download size={18} />
                  <span>Install App</span>
                </button>
                <button
                  onClick={dismissInstallPrompt}
                  className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline Indicator */}
      <AnimatePresence>
        {showOfflineIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
              <WifiOff size={16} />
              <span className="text-sm font-medium">You're offline - cached content available</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Online Status Indicator */}
      <div className="fixed top-4 right-4 z-40">
        <div className={`p-2 rounded-full transition-colors ${
          isOnline 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
        </div>
      </div>

      {/* Notification Permission Prompt */}
      {isInstalled && notificationPermission === 'default' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 right-4 bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-xl max-w-sm z-50"
        >
          <div className="flex items-start space-x-3">
            <Bell className="text-blue-400 mt-1" size={20} />
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-1">Stay Updated</h4>
              <p className="text-gray-300 text-sm mb-3">
                Get notified about new publications, blog posts, and research updates.
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={handleNotificationPermission}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Enable
                </button>
                <button
                  onClick={() => setNotificationPermission('denied')}
                  className="text-gray-400 hover:text-gray-300 px-3 py-1 text-sm transition-colors"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* PWA Status Indicator (for installed app) */}
      {isInstalled && (
        <div className="fixed bottom-4 left-4 z-40">
          <div className="bg-green-500/20 text-green-400 p-2 rounded-full">
            <Monitor size={16} />
          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstallPrompt;