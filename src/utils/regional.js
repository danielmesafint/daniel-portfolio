// Regional utilities for internationalization

// Currency conversion utilities
export class CurrencyConverter {
  constructor() {
    this.rates = {};
    this.lastUpdate = null;
    this.baseCurrency = 'USD';
  }

  // Fetch latest exchange rates
  async fetchRates() {
    try {
      // In production, use a real API like exchangerate-api.com
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      
      this.rates = data.rates;
      this.lastUpdate = new Date();
      
      // Cache rates in localStorage
      localStorage.setItem('exchangeRates', JSON.stringify({
        rates: this.rates,
        lastUpdate: this.lastUpdate.toISOString()
      }));
      
      return this.rates;
    } catch (error) {
      console.warn('Failed to fetch exchange rates, using cached or default rates');
      return this.loadCachedRates();
    }
  }

  // Load cached rates or use defaults
  loadCachedRates() {
    try {
      const cached = localStorage.getItem('exchangeRates');
      if (cached) {
        const { rates, lastUpdate } = JSON.parse(cached);
        const cacheAge = Date.now() - new Date(lastUpdate).getTime();
        
        // Use cached rates if less than 1 hour old
        if (cacheAge < 3600000) {
          this.rates = rates;
          this.lastUpdate = new Date(lastUpdate);
          return rates;
        }
      }
    } catch (error) {
      console.warn('Failed to load cached rates');
    }
    
    // Default rates (approximate)
    this.rates = {
      USD: 1,
      EUR: 0.85,
      ETB: 55.50,
      GBP: 0.73
    };
    
    return this.rates;
  }

  // Convert amount between currencies
  convert(amount, fromCurrency, toCurrency) {
    if (!this.rates[fromCurrency] || !this.rates[toCurrency]) {
      console.warn(`Exchange rate not available for ${fromCurrency} or ${toCurrency}`);
      return amount;
    }

    // Convert to USD first, then to target currency
    const usdAmount = amount / this.rates[fromCurrency];
    const convertedAmount = usdAmount * this.rates[toCurrency];
    
    return Math.round(convertedAmount * 100) / 100;
  }

  // Format currency with proper symbols and locale
  formatCurrency(amount, currency, locale = 'en-US') {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount);
    } catch (error) {
      // Fallback formatting
      const symbols = {
        USD: '$',
        EUR: '€',
        ETB: 'ብር ',
        GBP: '£'
      };
      
      const symbol = symbols[currency] || currency + ' ';
      return `${symbol}${amount.toLocaleString()}`;
    }
  }

  // Get currency info
  getCurrencyInfo(currency) {
    const currencyData = {
      USD: { name: 'US Dollar', symbol: '$', country: 'United States' },
      EUR: { name: 'Euro', symbol: '€', country: 'European Union' },
      ETB: { name: 'Ethiopian Birr', symbol: 'ብር', country: 'Ethiopia' },
      GBP: { name: 'British Pound', symbol: '£', country: 'United Kingdom' }
    };
    
    return currencyData[currency] || { name: currency, symbol: currency, country: 'Unknown' };
  }
}

// Time zone utilities
export class TimeZoneManager {
  constructor() {
    this.commonTimezones = {
      'America/New_York': 'Eastern Time (ET)',
      'America/Chicago': 'Central Time (CT)',
      'America/Denver': 'Mountain Time (MT)',
      'America/Los_Angeles': 'Pacific Time (PT)',
      'Europe/London': 'Greenwich Mean Time (GMT)',
      'Europe/Paris': 'Central European Time (CET)',
      'Europe/Berlin': 'Central European Time (CET)',
      'Africa/Addis_Ababa': 'East Africa Time (EAT)',
      'Asia/Tokyo': 'Japan Standard Time (JST)',
      'Asia/Shanghai': 'China Standard Time (CST)',
      'Australia/Sydney': 'Australian Eastern Time (AET)'
    };
  }

  // Format time for specific timezone
  formatTimeForTimezone(date, timezone, locale = 'en-US', options = {}) {
    const defaultOptions = {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
      ...options
    };

    try {
      return new Intl.DateTimeFormat(locale, {
        ...defaultOptions,
        timeZone: timezone
      }).format(date);
    } catch (error) {
      console.warn(`Invalid timezone: ${timezone}`);
      return date.toLocaleTimeString(locale, defaultOptions);
    }
  }

  // Get time in multiple timezones
  getMultipleTimezones(date = new Date(), timezones = [], locale = 'en-US') {
    return timezones.map(timezone => ({
      timezone,
      name: this.commonTimezones[timezone] || timezone,
      time: this.formatTimeForTimezone(date, timezone, locale),
      offset: this.getTimezoneOffset(timezone, date)
    }));
  }

  // Get timezone offset
  getTimezoneOffset(timezone, date = new Date()) {
    try {
      const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
      const local = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
      const offset = (local.getTime() - utc.getTime()) / (1000 * 60 * 60);
      
      return offset >= 0 ? `+${offset}` : `${offset}`;
    } catch (error) {
      return '±0';
    }
  }

  // Convert meeting time to user's timezone
  convertMeetingTime(meetingTime, fromTimezone, toTimezone) {
    try {
      // Create date object in the source timezone
      const sourceDate = new Date(meetingTime);
      
      // Get the time in the target timezone
      const targetTime = this.formatTimeForTimezone(
        sourceDate, 
        toTimezone, 
        'en-US', 
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        }
      );
      
      return {
        originalTime: this.formatTimeForTimezone(sourceDate, fromTimezone),
        convertedTime: targetTime,
        fromTimezone: this.commonTimezones[fromTimezone] || fromTimezone,
        toTimezone: this.commonTimezones[toTimezone] || toTimezone
      };
    } catch (error) {
      console.error('Error converting meeting time:', error);
      return null;
    }
  }

  // Get user's timezone
  getUserTimezone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
      return 'UTC';
    }
  }

  // Check if it's business hours in a timezone
  isBusinessHours(timezone, date = new Date()) {
    try {
      const timeString = this.formatTimeForTimezone(date, timezone, 'en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      });
      
      const [hours] = timeString.split(':').map(Number);
      return hours >= 9 && hours < 17; // 9 AM to 5 PM
    } catch (error) {
      return false;
    }
  }
}

// Regional content utilities
export class RegionalContent {
  constructor() {
    this.regionalData = {
      'en-US': {
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        currency: 'USD',
        timezone: 'America/New_York',
        phoneFormat: '+1 (XXX) XXX-XXXX'
      },
      'en-GB': {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        currency: 'GBP',
        timezone: 'Europe/London',
        phoneFormat: '+44 XXXX XXXXXX'
      },
      'am-ET': {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        currency: 'ETB',
        timezone: 'Africa/Addis_Ababa',
        phoneFormat: '+251 XX XXX XXXX'
      },
      'fr-FR': {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        currency: 'EUR',
        timezone: 'Europe/Paris',
        phoneFormat: '+33 X XX XX XX XX'
      }
    };
  }

  // Get regional settings for locale
  getRegionalSettings(locale) {
    return this.regionalData[locale] || this.regionalData['en-US'];
  }

  // Format date according to regional preferences
  formatDate(date, locale = 'en-US') {
    const settings = this.getRegionalSettings(locale);
    
    try {
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(date);
    } catch (error) {
      return date.toLocaleDateString();
    }
  }

  // Format phone number according to regional format
  formatPhoneNumber(phoneNumber, locale = 'en-US') {
    const settings = this.getRegionalSettings(locale);
    
    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');
    
    // Apply regional formatting (simplified)
    switch (locale) {
      case 'en-US':
        if (digits.length === 11 && digits.startsWith('1')) {
          return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
        }
        break;
      case 'am-ET':
        if (digits.length >= 9) {
          return `+251 ${digits.slice(-9, -6)} ${digits.slice(-6, -3)} ${digits.slice(-3)}`;
        }
        break;
      case 'fr-FR':
        if (digits.length === 10) {
          return `+33 ${digits.slice(1, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
        }
        break;
    }
    
    return phoneNumber; // Return original if no formatting rule matches
  }

  // Get localized content
  getLocalizedContent(contentKey, locale = 'en-US') {
    const localizedContent = {
      'office-hours': {
        'en-US': 'Monday - Friday: 9:00 AM - 5:00 PM EST',
        'am-ET': 'ሰኞ - አርብ: 9:00 ጠዋት - 5:00 ከሰዓት EAT',
        'fr-FR': 'Lundi - Vendredi: 9h00 - 17h00 CET'
      },
      'response-time': {
        'en-US': 'Response within 24 hours',
        'am-ET': 'በ24 ሰዓት ውስጥ ምላሽ',
        'fr-FR': 'Réponse dans les 24 heures'
      },
      'best-contact-time': {
        'en-US': 'Best time to contact: 2:00 PM - 4:00 PM EST',
        'am-ET': 'የተሻለ የመገናኛ ሰዓት: 2:00 ከሰዓት - 4:00 ከሰዓት EAT',
        'fr-FR': 'Meilleur moment pour contacter: 14h00 - 16h00 CET'
      }
    };
    
    return localizedContent[contentKey]?.[locale] || localizedContent[contentKey]?.['en-US'] || '';
  }
}

// Initialize global instances
export const currencyConverter = new CurrencyConverter();
export const timeZoneManager = new TimeZoneManager();
export const regionalContent = new RegionalContent();

// Auto-initialize currency rates
currencyConverter.loadCachedRates();
currencyConverter.fetchRates().catch(() => {
  console.log('Using cached or default exchange rates');
});