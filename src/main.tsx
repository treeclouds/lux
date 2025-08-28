import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import '../styles/globals.css';

// Register service worker via Workbox - v2
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  import('workbox-window').then(({ Workbox }) => {
    const wb = new Workbox('/sw.js');
    
    // Add event listeners for service worker lifecycle
    wb.addEventListener('installed', (event) => {
      if (!event.isUpdate) {
        console.log('Service worker installed for the first time!');
      }
    });

    wb.addEventListener('waiting', () => {
      // Show update prompt to user
      if (confirm('New app update is available! Click OK to refresh.')) {
        wb.addEventListener('controlling', () => {
          window.location.reload();
        });
        wb.messageSkipWaiting();
      }
    });

    wb.register();
  });
}

// Check if app is running in standalone mode
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                    (window.navigator as any).standalone === true;

if (isStandalone) {
  console.log('App is running in standalone mode');
  document.documentElement.classList.add('pwa-standalone');
}

// Render app
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Handle PWA install prompt
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // You can trigger this from a button in your app
  // Example: showInstallButton();
});

// Export install function for use in components
export const installPWA = async () => {
  if (!deferredPrompt) {
    console.log('Install prompt not available');
    return;
  }

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('User accepted the install prompt');
  } else {
    console.log('User dismissed the install prompt');
  }
  
  deferredPrompt = null;
};

// Handle app updates
if (import.meta.env.PROD) {
  window.addEventListener('load', () => {
    // Check for updates periodically
    setInterval(async () => {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          registration.update();
        }
      }
    }, 60 * 60 * 1000); // Check every hour
  });
}