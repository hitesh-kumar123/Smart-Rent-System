import React, { createContext, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../config/i18n";

// Create the context
const AppSettingsContext = createContext();


export const AppSettingsProvider = ({ children }) => {
  // i18next translation
  const { t, i18n: i18nextInstance } = useTranslation();

  // Get initial settings from localStorage or use defaults
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });
  const [languageName, setLanguageName] = useState(() => {
    return localStorage.getItem("languageName") || "English";
  });
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "USD";
  });
  const [exchangeRates, setExchangeRates] = useState(null);
  const [isLoadingRates, setIsLoadingRates] = useState(false);


  // Update localStorage when settings change
  useEffect(() => {
    localStorage.setItem("language", language);
    localStorage.setItem("languageName", languageName);
    localStorage.setItem("currency", currency);
  }, [language, languageName, currency]);

  // Fetch exchange rates when currency changes (keep as is, or replace with your own logic)
  useEffect(() => {
    // You may want to replace this with your own exchange rate logic or API
    // setIsLoadingRates(true);
    // setExchangeRates({ USD: 1, ... });
    // setIsLoadingRates(false);
  }, []);

  // Change i18next language when language state changes
  useEffect(() => {
    if (i18nextInstance.language !== language) {
      i18nextInstance.changeLanguage(language);
    }
  }, [language, i18nextInstance]);


  // Change language
  const changeLanguage = async (code, name) => {
    setLanguage(code);
    setLanguageName(name);
    i18n.changeLanguage(code);
  };

  // Change currency
  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  // Format price according to current currency (unchanged)
  const formatPrice = (amount) => {
    if (!amount || isNaN(amount)) return "0";
    const currencySymbols = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      CAD: "C$",
      AUD: "A$",
      INR: "₹",
    };
    const currencySymbol = currencySymbols[currency] || "$";
    let convertedAmount = amount;
    if (exchangeRates && currency !== "USD") {
      convertedAmount = amount * exchangeRates[currency];
    }
    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(convertedAmount);
  };

  // Use i18next's t function for translation
  // For compatibility, mimic getText(section, key) as t(`${section}.${key}`)
  const getText = (section, key) => t(`${section}.${key}`);


  // Value object to be provided to consumers
  const value = {
    language,
    languageName,
    currency,
    changeLanguage,
    changeCurrency,
    formatPrice,
    getText,
    isTranslating: false, // i18next handles this internally
    isLoadingRates,
    supportedLanguages: [
      { code: "en", name: "English" },
      { code: "hi", name: "Hindi" },
      { code: "fr", name: "French" },
      { code: "es", name: "Spanish" },
      { code: "de", name: "German" },
      { code: "ja", name: "Japanese" },
      { code: "zh", name: "Chinese" },
      { code: "ru", name: "Russian" },
    ],
  };

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
};

// Custom hook for easy consumption of the context
export const useAppSettings = () => useContext(AppSettingsContext);

export default AppSettingsContext;
