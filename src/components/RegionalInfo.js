import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Clock, 
  DollarSign, 
  MapPin, 
  Calendar,
  Globe,
  Users,
  Phone,
  Mail
} from 'lucide-react';
import { timeZoneManager, currencyConverter, regionalContent } from '../utils/regional';

const RegionalInfo = ({ showMeetingTimes = false, showCurrency = false }) => {
  const { i18n, t } = useTranslation();
  const [currentTimes, setCurrentTimes] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [userTimezone, setUserTimezone] = useState('');

  const keyTimezones = [
    'America/New_York',    // Eastern Time (US)
    'Europe/London',       // GMT/BST
    'Europe/Paris',        // CET
    'Africa/Addis_Ababa',  // EAT (Ethiopia)
    'Asia/Tokyo',          // JST
    'Australia/Sydney'     // AEST
  ];

  const currencies = ['USD', 'EUR', 'ETB', 'GBP'];

  useEffect(() => {
    // Get user's timezone
    setUserTimezone(timeZoneManager.getUserTimezone());

    // Update times every minute
    const updateTimes = () => {
      const times = timeZoneManager.getMultipleTimezones(
        new Date(), 
        keyTimezones, 
        i18n.language
      );
      setCurrentTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [i18n.language]);

  useEffect(() => {
    // Load exchange rates
    const loadRates = async () => {
      try {
        const rates = await currencyConverter.fetchRates();
        setExchangeRates(rates);
      } catch (error) {
        const cachedRates = currencyConverter.loadCachedRates();
        setExchangeRates(cachedRates);
      }
    };

    if (showCurrency) {
      loadRates();
    }
  }, [showCurrency]);

  const formatBusinessHours = (timezone) => {
    const isBusinessHours = timeZoneManager.isBusinessHours(timezone);
    return isBusinessHours ? 'Business Hours' : 'After Hours';
  };

  const getRegionalContactInfo = () => {
    const locale = `${i18n.language}-${i18n.language === 'am' ? 'ET' : 'US'}`;
    
    return {
      officeHours: regionalContent.getLocalizedContent('office-hours', locale),
      responseTime: regionalContent.getLocalizedContent('response-time', locale),
      bestContactTime: regionalContent.getLocalizedContent('best-contact-time', locale),
      phone: regionalContent.formatPhoneNumber('+251912023274', locale)
    };
  };

  const convertPrice = (baseAmount, baseCurrency = 'USD') => {
    const userCurrency = localStorage.getItem('preferredCurrency') || 'USD';
    
    if (baseCurrency === userCurrency) {
      return currencyConverter.formatCurrency(baseAmount, userCurrency, i18n.language);
    }
    
    const convertedAmount = currencyConverter.convert(baseAmount, baseCurrency, userCurrency);
    return currencyConverter.formatCurrency(convertedAmount, userCurrency, i18n.language);
  };

  const regionalInfo = getRegionalContactInfo();

  return (
    <div className="space-y-6">
      {/* Global Meeting Times */}
      {showMeetingTimes && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grido-card p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-white">Global Meeting Times</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTimes.map((timeInfo, index) => (
              <motion.div
                key={timeInfo.timezone}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  timeInfo.timezone === userTimezone
                    ? 'bg-blue-500/20 border-blue-500/50'
                    : 'bg-gray-800/50 border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white text-sm">{timeInfo.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${
                    timeZoneManager.isBusinessHours(timeInfo.timezone)
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-600/20 text-gray-400'
                  }`}>
                    {formatBusinessHours(timeInfo.timezone)}
                  </span>
                </div>
                
                <div className="text-2xl font-mono text-blue-400 mb-1">
                  {timeInfo.time}
                </div>
                
                <div className="text-xs text-gray-400">
                  UTC{timeInfo.offset}
                  {timeInfo.timezone === userTimezone && (
                    <span className="ml-2 text-blue-400">(Your Time)</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Users size={16} className="text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-300">
                <div className="font-medium mb-1">Meeting Coordination</div>
                <div className="text-blue-200">
                  All meeting times are automatically converted to your local timezone. 
                  Green indicators show business hours for optimal scheduling.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Currency Information */}
      {showCurrency && Object.keys(exchangeRates).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grido-card p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="text-green-400" size={24} />
            <h3 className="text-xl font-bold text-white">Currency Exchange</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {currencies.map((currency) => {
              const rate = exchangeRates[currency];
              const info = currencyConverter.getCurrencyInfo(currency);
              
              return (
                <div key={currency} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white mb-1">
                      {info.symbol}
                    </div>
                    <div className="text-sm text-gray-300 mb-1">{currency}</div>
                    <div className="text-xs text-gray-400">{info.name}</div>
                    {rate && (
                      <div className="text-xs text-green-400 mt-1">
                        1 USD = {rate.toFixed(2)} {currency}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Sample Pricing */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Sample Consultation Pricing</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { service: 'Research Consultation', price: 150 },
                { service: 'Technical Review', price: 200 },
                { service: 'Workshop Training', price: 500 }
              ].map((item, index) => (
                <div key={index} className="p-3 bg-gray-800/30 rounded-lg">
                  <div className="text-sm text-gray-300 mb-1">{item.service}</div>
                  <div className="text-lg font-bold text-green-400">
                    {convertPrice(item.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-400 text-center">
            Exchange rates updated: {currencyConverter.lastUpdate?.toLocaleString(i18n.language)}
          </div>
        </motion.div>
      )}

      {/* Regional Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grido-card p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <MapPin className="text-purple-400" size={24} />
          <h3 className="text-xl font-bold text-white">Regional Contact Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone size={16} className="text-gray-400" />
              <div>
                <div className="text-white font-medium">Phone</div>
                <div className="text-gray-300">{regionalInfo.phone}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail size={16} className="text-gray-400" />
              <div>
                <div className="text-white font-medium">Email</div>
                <div className="text-gray-300">danielmesafint1985@gmail.com</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar size={16} className="text-gray-400" />
              <div>
                <div className="text-white font-medium">Office Hours</div>
                <div className="text-gray-300">{regionalInfo.officeHours}</div>
              </div>
            </div>
          </div>
          
          {/* Response Information */}
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="text-green-400 font-medium mb-2">Response Time</div>
              <div className="text-green-300 text-sm">{regionalInfo.responseTime}</div>
            </div>
            
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="text-blue-400 font-medium mb-2">Best Contact Time</div>
              <div className="text-blue-300 text-sm">{regionalInfo.bestContactTime}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Globe size={16} className="text-purple-400 mt-0.5" />
            <div className="text-sm text-purple-300">
              <div className="font-medium mb-1">International Collaboration</div>
              <div className="text-purple-200">
                I welcome collaborations from researchers worldwide. Contact information and 
                meeting times are automatically adjusted based on your location and language preferences.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegionalInfo;