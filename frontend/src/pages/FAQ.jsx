import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFaqs, setExpandedFaqs] = useState({});

  const { t } = useTranslation('FAQ');
  // FAQ categories
  const categories = [
    { id: 'general', name: t('categories.general') },
    { id: 'booking', name: t('categories.booking') },
    { id: 'payment', name: t('categories.payment') },
    { id: 'host', name: t('categories.host') },
    { id: 'safety', name: t('categories.safety') },
    { id: 'account', name: t('categories.account') }
  ];

  // FAQ data organized by category, using i18n translation keys
  const faqData = {
    general: [
      { id: 'what-is-smart-rent' },
      { id: 'how-to-start' },
      { id: 'contact-support' },
      { id: 'app-available' }
    ],
    booking: [
      { id: 'how-to-book' },
      { id: 'booking-confirmation' },
      { id: 'cancel-booking' },
      { id: 'modify-dates' }
    ],
    payment: [
      { id: 'payment-methods' },
      { id: 'payment-timing' },
      { id: 'security-deposit' },
      { id: 'refund-process' }
    ],
    host: [
      { id: 'become-host' },
      { id: 'host-fees' },
      { id: 'host-protection' },
      { id: 'payout-schedule' }
    ],
    safety: [
      { id: 'safety-features' },
      { id: 'verify-identity' },
      { id: 'report-issues' },
      { id: 'covid-protocols' }
    ],
    account: [
      { id: 'create-account' },
      { id: 'update-profile' },
      { id: 'delete-account' },
      { id: 'privacy-settings' }
    ]
  };

  const toggleFaq = (id) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Header section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('faqTitle')}</h1>
            <p className="text-xl text-primary-100">
              {t('faqSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
            <div className="md:flex">
              {/* Categories sidebar */}
              <div className="md:w-1/4 bg-neutral-50 p-4 md:p-6 border-r border-neutral-200">
                <h3 className="font-medium text-lg text-neutral-900 mb-4">{t('categoriesLabel')}</h3>
                <nav className="space-y-1">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out ${
                        activeCategory === category.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">{t('needMoreHelp')}</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    {t('needMoreHelpDesc')}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800"
                  >
                    {t('contactSupport')}
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* FAQ content */}
              <div className="md:w-3/4 p-6">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  {categories.find(c => c.id === activeCategory)?.name}
                </h2>

                <div className="space-y-4">
                  {faqData[activeCategory]?.map(faq => (
                    <div
                      key={faq.id}
                      className="border border-neutral-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-sm"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                      >
                        <span className="font-medium text-neutral-800">{t(`${activeCategory}.${faq.id}.question`)}</span>
                        <svg
                          className={`h-5 w-5 text-neutral-500 transition-transform duration-200 ${
                            expandedFaqs[faq.id] ? 'transform rotate-180' : ''
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {expandedFaqs[faq.id] && (
                        <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                          <p className="text-neutral-700 leading-relaxed">{t(`${activeCategory}.${faq.id}.answer`)}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional help section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">{t('helpCenter')}</h3>
              <p className="text-neutral-600 mb-4">
                {t('helpCenterDesc')}
              </p>
              <Link
                to="/help"
                className="text-primary-600 hover:text-primary-700 inline-flex items-center font-medium text-sm"
              >
                {t('visitHelpCenter')}
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">{t('safetyInfo')}</h3>
              <p className="text-neutral-600 mb-4">
                {t('safetyInfoDesc')}
              </p>
              <Link
                to="/safety"
                className="text-primary-600 hover:text-primary-700 inline-flex items-center font-medium text-sm"
              >
                {t('viewSafetyGuidelines')}
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">{t('reportConcernTitle')}</h3>
              <p className="text-neutral-600 mb-4">
                {t('reportConcernDesc')}
              </p>
              <Link
                to="/report-concern"
                className="text-primary-600 hover:text-primary-700 inline-flex items-center font-medium text-sm"
              >
                {t('submitReport')}
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 