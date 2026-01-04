import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Cancellation = () => {
  const { t } = useTranslation('Cancellation');
  const [activeTab, setActiveTab] = useState('guest');

  // Policy Types
  const policyTypes = [
    {
      id: 'flexible',
      name: t('flexible'),
      color: 'green',
      description: t('flexibleDesc'),
      icon: 'leaf'
    },
    {
      id: 'moderate',
      name: t('moderate'),
      color: 'blue',
      description: t('moderateDesc'),
      icon: 'balance-scale'
    },
    {
      id: 'strict',
      name: t('strict'),
      color: 'orange',
      description: t('strictDesc'),
      icon: 'shield-alt'
    },
    {
      id: 'nonrefundable',
      name: t('nonrefundable'),
      color: 'red',
      description: t('nonrefundableDesc'),
      icon: 'lock'
    }
  ];

  // Common FAQs (use translation keys for questions/answers)
  const faqs = [
    { id: 'faq1' },
    { id: 'faq2' },
    { id: 'faq3' },
    { id: 'faq4' },
    { id: 'faq5' }
  ];

  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Header Section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('cancellationTitle')}</h1>
            <p className="text-xl text-primary-100">
              {t('cancellationSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">{t('understandingPolicies')}</h2>
            <p className="text-neutral-600 mb-4">
              {t('intro1')}
            </p>
            <p className="text-neutral-600">
              {t('intro2')}
            </p>
          </div>

          {/* Guest/Host Toggle Tabs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="flex border-b border-neutral-200">
              <button
                onClick={() => setActiveTab('guest')}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'guest'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                {t('forGuests')}
              </button>
              <button
                onClick={() => setActiveTab('host')}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'host'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                {t('forHosts')}
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'guest' ? (
                <div>
                  <p className="text-neutral-600 mb-6">
                    {t('guestIntro')}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-neutral-600 mb-6">
                    {t('hostIntro')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Policy Types */}
          <div className="space-y-6 mb-12">
            {policyTypes.map((policy) => (
              <div key={policy.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100">
                <div className={`bg-${policy.color}-50 p-6 border-b border-${policy.color}-100`}>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full bg-${policy.color}-100 flex items-center justify-center mr-4`}>
                      <i className={`fas fa-${policy.icon} text-${policy.color}-600 text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800">{policy.name}</h3>
                      <p className="text-neutral-600">{policy.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {policy.id === 'flexible' && (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">{t('fullRefund')}</div>
                        <div className="text-neutral-600">
                          {t('flexibleFull')}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">{t('partialRefund')}</div>
                        <div className="text-neutral-600">
                          {t('flexiblePartial')}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">{t('noRefund')}</div>
                        <div className="text-neutral-600">
                          {t('flexibleNone')}
                        </div>
                      </div>
                      
                      {activeTab === 'host' && (
                        <div className="mt-4 pt-4 border-t border-neutral-200">
                          <p className="text-neutral-600 italic">
                            <strong>{t('hostTipFlexible', { ns: 'Cancellation' }).split(':')[0]}:</strong> {t('hostTipFlexible')}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {policy.id === 'moderate' && (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">{t('fullRefund')}</div>
                        <div className="text-neutral-600">
                          {t('moderateFull')}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">{t('partialRefund')}</div>
                        <div className="text-neutral-600">
                          {t('moderatePartial')}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">{t('noRefund')}</div>
                        <div className="text-neutral-600">
                          {t('moderateNone')}
                        </div>
                      </div>
                      
                      {activeTab === 'host' && (
                        <div className="mt-4 pt-4 border-t border-neutral-200">
                          <p className="text-neutral-600 italic">
                            <strong>{t('hostTipModerate', { ns: 'Cancellation' }).split(':')[0]}:</strong> {t('hostTipModerate')}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {policy.id === 'strict' && (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">{t('fullRefund')}</div>
                        <div className="text-neutral-600">
                          {t('strictFull')}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">{t('partialRefund')}</div>
                        <div className="text-neutral-600">
                          {t('strictPartial')}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">{t('noRefund')}</div>
                        <div className="text-neutral-600">
                          {t('strictNone')}
                        </div>
                      </div>
                      
                      {activeTab === 'host' && (
                        <div className="mt-4 pt-4 border-t border-neutral-200">
                          <p className="text-neutral-600 italic">
                            <strong>{t('hostTipStrict', { ns: 'Cancellation' }).split(':')[0]}:</strong> {t('hostTipStrict')}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {policy.id === 'nonrefundable' && (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">{t('discountedRate')}</div>
                        <div className="text-neutral-600">
                          {t('nonrefundableDiscount')}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">{t('noRefund')}</div>
                        <div className="text-neutral-600">
                          {t('nonrefundableNone')}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">{t('travelInsurance')}</div>
                        <div className="text-neutral-600">
                          {t('nonrefundableInsurance')}
                        </div>
                      </div>
                      
                      {activeTab === 'host' && (
                        <div className="mt-4 pt-4 border-t border-neutral-200">
                          <p className="text-neutral-600 italic">
                            <strong>{t('hostTipNonrefundable', { ns: 'Cancellation' }).split(':')[0]}:</strong> {t('hostTipNonrefundable')}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Extenuating Circumstances */}
          <div className="bg-indigo-50 rounded-xl shadow-sm p-8 mb-12 border border-indigo-100">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 flex-shrink-0">
                <i className="fas fa-umbrella text-indigo-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-800 mb-3">{t('extenuatingCircumstances')}</h3>
                <p className="text-neutral-600 mb-4">
                  {t('extenuatingDesc1')}
                </p>
                <ul className="list-disc pl-5 space-y-2 text-neutral-600 mb-4">
                  <li>{t('extenuatingList1')}</li>
                  <li>{t('extenuatingList2')}</li>
                  <li>{t('extenuatingList3')}</li>
                </ul>
                <p className="text-neutral-600">
                  {t('extenuatingDesc2')}
                </p>
                <p className="text-neutral-600 mt-4">
                  <strong>{t('extenuatingDesc3')}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-neutral-800">{t('faqsTitle')}</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="border-b border-neutral-200 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-semibold mb-3 text-neutral-800">{t(`${faq.id}Q`)}</h3>
                  <p className="text-neutral-600">{t(`${faq.id}A`)}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Need More Help */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">{t('needHelp')}</h2>
            <p className="text-neutral-600 mb-6">
              {t('needHelpDesc')}
            </p>
            
            <div className="flex flex-col md:flex-row gap-6">
              <Link 
                to="/contact" 
                className="flex-1 bg-primary-500 text-white text-center py-4 rounded-lg font-medium hover:bg-primary-600 transition duration-300"
              >
                {t('contactSupport')}
              </Link>
              <Link 
                to="/help" 
                className="flex-1 bg-neutral-100 text-neutral-700 text-center py-4 rounded-lg font-medium hover:bg-neutral-200 transition duration-300"
              >
                {t('visitHelp')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancellation; 