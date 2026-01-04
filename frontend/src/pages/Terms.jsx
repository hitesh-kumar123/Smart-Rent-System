import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const Terms = () => {
  const { t } = useTranslation('Terms');

  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Header section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('termsTitle')}</h1>
            <p className="text-xl text-primary-100">{t('termsSubtitle')}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-sm text-neutral-500 mb-8">{t('lastUpdated')}</p>

              <p className="lead text-lg text-neutral-700 mb-8">{t('welcome')}</p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">{t('acceptanceTitle')}</h2>
              <p className="mb-6">{t('acceptance')}</p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">{t('accountTitle')}</h2>
              <p className="mb-4">{t('account')}</p>
              <ul className="list-disc pl-6 mb-6">
                {t('accountList', { returnObjects: true }).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="mb-6">{t('accountNote')}</p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">{t('contentTitle')}</h2>
              <p className="mb-4">{t('content')}</p>
              <p className="mb-6">{t('contentConduct')}</p>
              <ul className="list-disc pl-6 mb-6">
                {t('contentList', { returnObjects: true }).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">{t('bookingTitle')}</h2>
              <p className="mb-4">{t('bookingGuest')}</p>
              <ul className="list-disc pl-6 mb-6">
                {t('bookingGuestList', { returnObjects: true }).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="mb-4">{t('bookingHost')}</p>
              <ul className="list-disc pl-6 mb-6">
                {t('bookingHostList', { returnObjects: true }).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">{t('cancellationTitle')}</h2>
              <p className="mb-6">{t('cancellation')}</p>
              <p className="mb-6">
                <Trans i18nKey="cancellationMore" ns="Terms">
                  For more information, see our <Link to="/cancellation" className="text-primary-600 hover:text-primary-700">Cancellation Policy</Link>.
                </Trans>
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">{t('feesTitle')}</h2>
              <p className="mb-6">{t('fees')}</p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">{t('disclaimerTitle')}</h2>
              <p className="mb-6">{t('disclaimer')}</p>
              <p className="mb-6">{t('liability')}</p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">{t('indemnificationTitle')}</h2>
              <p className="mb-6">{t('indemnification')}</p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">{t('modificationsTitle')}</h2>
              <p className="mb-6">{t('modifications')}</p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">{t('lawTitle')}</h2>
              <p className="mb-6">{t('law')}</p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">{t('contactTitle')}</h2>
              <p className="mb-6">{t('contact')}</p>
              <div className="bg-neutral-50 p-6 rounded-lg">
                <p className="mb-2"><strong>{t('emailLabel', 'Email')}:</strong> {t('emailValue')}</p>
                <p className="mb-2"><strong>{t('addressLabel', 'Address')}:</strong> {t('addressValue')}</p>
                <p><strong>{t('phoneLabel', 'Phone')}:</strong> {t('phoneValue')}</p>
              </div>
            </div>
          </div>

          {/* Related links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/privacy"
              className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:border-primary-500 transition duration-300"
            >
              <h3 className="font-medium text-lg text-neutral-900 mb-2">{t('privacy')}</h3>
              <p className="text-neutral-600 mb-2">{t('privacyDesc')}</p>
              <span className="text-primary-600 font-medium flex items-center">
                {t('readPrivacy')}
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            <Link 
              to="/cookies"
              className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:border-primary-500 transition duration-300"
            >
              <h3 className="font-medium text-lg text-neutral-900 mb-2">{t('cookie')}</h3>
              <p className="text-neutral-600 mb-2">{t('cookieDesc')}</p>
              <span className="text-primary-600 font-medium flex items-center">
                {t('readCookie')}
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            <Link 
              to="/help"
              className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:border-primary-500 transition duration-300"
            >
              <h3 className="font-medium text-lg text-neutral-900 mb-2">{t('help')}</h3>
              <p className="text-neutral-600 mb-2">{t('helpDesc')}</p>
              <span className="text-primary-600 font-medium flex items-center">
                {t('visitHelp')}
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 