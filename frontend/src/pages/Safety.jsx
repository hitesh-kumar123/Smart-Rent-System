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
                  {/* ...existing code... */}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-800">{t('featureVerifiedTitle')}</h3>
                <p className="text-neutral-600">
                  {t('featureVerifiedDesc')}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  {/* ...existing code... */}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-800">{t('featurePropertyTitle')}</h3>
                <p className="text-neutral-600">
                  {t('featurePropertyDesc')}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  {/* ...existing code... */}
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
                <li className="flex items-start">{/* ...existing code... */}<span>{t('tipsGuests1')}</span></li>
                <li className="flex items-start">{/* ...existing code... */}<span>{t('tipsGuests2')}</span></li>
                <li className="flex items-start">{/* ...existing code... */}<span>{t('tipsGuests3')}</span></li>
                <li className="flex items-start">{/* ...existing code... */}<span>{t('tipsGuests4')}</span></li>
                <li className="flex items-start">{/* ...existing code... */}<span>{t('tipsGuests5')}</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-800">{t('tipsHostsTitle')}</h3>
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start">{/* ...existing code... */}<span>{t('tipsHosts1')}</span></li>
                <li className="flex items-start">{/* ...existing code... */}<span>{t('tipsHosts2')}</span></li>
                <li className="flex items-start">{/* ...existing code... */}<span>{t('tipsHosts3')}</span></li>
                <li className="flex items-start">{/* ...existing code... */}<span>{t('tipsHosts4')}</span></li>
                <li className="flex items-start">{/* ...existing code... */}<span>{t('tipsHosts5')}</span></li>
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