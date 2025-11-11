// Google Ads Conversion Tracking Functions
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      parameters?: {
        send_to?: string;
        value?: number;
        currency?: string;
        transaction_id?: string;
        [key: string]: any;
      }
    ) => void;
  }
}

// Track sign up conversions
export const trackSignupConversion = (method: 'email' | 'google' = 'email') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17574874871/SIGNUP_CONVERSION_ID', // You'll get this ID after setting up conversion
      'value': 1.0,
      'currency': 'USD',
      'transaction_id': `signup_${Date.now()}`,
      'custom_parameter': method
    });
  }
};

// Track app download clicks
export const trackAppDownload = (platform: 'ios' | 'android') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17574874871/APP_DOWNLOAD_CONVERSION_ID', // You'll get this ID
      'value': 5.0, // Higher value for app downloads
      'currency': 'USD',
      'platform': platform
    });
  }
};

// Track crystal purchases
export const trackCrystalPurchase = (amount: number, quantity: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17574874871/PURCHASE_CONVERSION_ID', // You'll get this ID
      'value': amount,
      'currency': 'USD',
      'transaction_id': `crystal_${Date.now()}`,
      'items': quantity
    });
  }
};

// Track Oracle reading completions
export const trackOracleReading = (category: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'engagement', {
      'event_category': 'Oracle',
      'event_label': category,
      'value': 1
    });
  }
};

// Track key page views
export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      'page_title': pageName,
      'page_location': window.location.href,
      'page_path': window.location.pathname
    });
  }
};