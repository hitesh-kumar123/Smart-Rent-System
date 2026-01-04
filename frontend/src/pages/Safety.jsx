import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Safety = () => {
  const { t } = useTranslation('Safety');
  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Header Section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('headerTitle')}</h1>
            <p className="text-xl text-primary-100">
              {t('headerSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">{t('commitmentTitle')}</h2>
            <p className="text-neutral-600 mb-4">
              {t('commitmentDesc1')}
            </p>
            <p className="text-neutral-600">
              {t('commitmentDesc2')}
            </p>
          </div>

          {/* Safety Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-neutral-800">{t('featuresTitle')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-neutral-800">{t('featureVerifiedTitle')}</h3>
                  <p className="text-neutral-600">
                    {t('featureVerifiedDesc')}
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-neutral-800">{t('featurePropertyTitle')}</h3>
                  <p className="text-neutral-600">
                    {t('featurePropertyDesc')}
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-neutral-800">{t('featureSupportTitle')}</h3>
                  <p className="text-neutral-600">
                    {t('featureSupportDesc')}
                  </p>
                </div>
              </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-neutral-800">{t('tipsTitle')}</h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-neutral-800">{t('tipsGuestsTitle')}</h3>
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{t('tipsGuests1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{t('tipsGuests2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{t('tipsGuests3')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{t('tipsGuests4')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{t('tipsGuests5')}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-800">{t('tipsHostsTitle')}</h3>
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{t('tipsHosts1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{t('tipsHosts2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{t('tipsHosts3')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{t('tipsHosts4')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{t('tipsHosts5')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* COVID-19 Safety Measures */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">{t('covidTitle')}</h2>
            <p className="text-neutral-600 mb-6">
              {t('covidDesc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-neutral-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-3 text-neutral-800">{t('covidCleaningTitle')}</h3>
                <p className="text-neutral-600">
                  {t('covidCleaningDesc')}
                </p>
              </div>
              <div className="border border-neutral-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-3 text-neutral-800">{t('covidFlexibleTitle')}</h3>
                <p className="text-neutral-600">
                  {t('covidFlexibleDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Resources */}
          <div className="bg-red-50 rounded-xl shadow-sm p-8 mb-12 border border-red-100">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">{t('emergencyTitle')}</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-neutral-800">{t('emergencyImmediateTitle')}</h3>
              <p className="text-neutral-600 mb-2">
                {t('emergencyImmediateDesc')}
              </p>
              <p className="text-xl font-bold text-red-600">{t('emergencyNumber')}</p>
              <p className="text-sm text-neutral-500">{t('emergencyNumberNote')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-neutral-800">{t('emergencySupportTitle')}</h3>
              <p className="text-neutral-600 mb-3">
                {t('emergencySupportDesc')}
              </p>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="bg-white px-5 py-3 rounded-lg border border-neutral-200">
                  <p className="text-sm text-neutral-500 mb-1">{t('emergencySupportLineLabel')}</p>
                  <p className="font-semibold">{t('emergencySupportLine')}</p>
                </div>
                <div className="bg-white px-5 py-3 rounded-lg border border-neutral-200">
                  <p className="text-sm text-neutral-500 mb-1">{t('emergencySupportEmailLabel')}</p>
                  <p className="font-semibold">{t('emergencySupportEmail')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reporting Concerns */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">{t('reportTitle')}</h2>
            <p className="text-neutral-600 mb-6">
              {t('reportDesc')}
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              <Link 
                to="/contact"
                className="flex-1 bg-primary-500 text-white text-center py-4 rounded-lg font-medium hover:bg-primary-600 transition duration-300"
              >
                {t('reportContactSupport')}
              </Link>
              <Link 
                to="/help"
                className="flex-1 bg-neutral-100 text-neutral-700 text-center py-4 rounded-lg font-medium hover:bg-neutral-200 transition duration-300"
              >
                {t('reportVisitHelpCenter')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety; 