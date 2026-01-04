import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const ReportConcern = () => {
  const [formData, setFormData] = useState({
    concernType: '',
    listingId: '',
    description: '',
    email: '',
    name: '',
    phone: '',
    attachments: []
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { t } = useTranslation('ReportConcern');

  let concernTypes = t('concernTypes', { returnObjects: true });
  if (!Array.isArray(concernTypes)) {
    concernTypes = [];
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real application, you would send this data to your backend
    setIsSubmitted(true);
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Header Section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
            <p className="text-xl text-primary-100">{t('subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {isSubmitted ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-800">{t('thankYouTitle')}</h2>
              <p className="text-neutral-600 mb-6">{t('thankYouMsg1')}</p>
              <p className="text-neutral-600 mb-8">
                {t('thankYouMsg2')} <span className="font-medium">{`RC${Date.now().toString().substring(6)}`}</span>
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link to="/" className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition duration-300">
                  {t('returnHome')}
                </Link>
                <Link to="/help" className="px-6 py-3 bg-neutral-200 text-neutral-700 rounded-lg font-medium hover:bg-neutral-300 transition duration-300">
                  {t('visitHelp')}
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Introduction */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-neutral-800">{t('howToTitle')}</h2>
                <p className="text-neutral-600 mb-4">{t('howToDesc')}</p>
                <div className="flex items-center p-4 bg-blue-50 text-blue-800 rounded-lg mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">
                    <strong>{t('emergency')}</strong> {t('emergencyDesc')}
                  </p>
                </div>
              </div>

              {/* Report Form */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6 text-neutral-800">{t('submitTitle')}</h2>
                <form onSubmit={handleSubmit}>
                  {/* Concern Type */}
                  <div className="mb-6">
                    <label htmlFor="concernType" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('concernTypeLabel')}
                    </label>
                    <select
                      id="concernType"
                      name="concernType"
                      value={formData.concernType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">{t('concernTypePlaceholder')}</option>
                      {concernTypes.map((type, idx) => (
                        <option key={idx} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Listing ID */}
                  <div className="mb-6">
                    <label htmlFor="listingId" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('listingIdLabel')}
                    </label>
                    <input
                      type="text"
                      id="listingId"
                      name="listingId"
                      value={formData.listingId}
                      onChange={handleChange}
                      placeholder={t('listingIdPlaceholder')}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <p className="mt-2 text-sm text-neutral-500">
                      {t('listingIdHelp')}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('descriptionLabel')}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder={t('descriptionPlaceholder')}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  {/* File Attachments */}
                  <div className="mb-6">
                    <label htmlFor="attachments" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('attachmentsLabel')}
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-neutral-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-neutral-600">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                              <span>{t('attachmentsUpload')}</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">{t('attachmentsOr')}</p>
                            <span className="pl-2 text-xs text-neutral-500">
                              {formData.attachments.length === 0 ? t('attachmentsUploadNoFile', 'No file chosen') : ''}
                            </span>
                        </div>
                        <p className="text-xs text-neutral-500">
                          {t('attachmentsHelp')}
                        </p>
                      </div>
                    </div>
                    {formData.attachments.length > 0 && (
                      <ul className="mt-3 text-sm text-neutral-600">
                        {formData.attachments.map((file, index) => (
                          <li key={index} className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="p-6 bg-neutral-50 rounded-lg mb-6">
                    <h3 className="text-lg font-medium mb-4 text-neutral-800">{t('contactTitle')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t('nameLabel')}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t('emailLabel')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('phoneLabel')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="mb-8">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="privacy"
                          name="privacy"
                          type="checkbox"
                          required
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="privacy" className="font-medium text-neutral-700">
                          <Trans i18nKey="privacyNotice" ns="ReportConcern">
                            {t('privacyNotice', 'I understand that my information will be processed as described in the')} <Link to="/privacy" className="text-primary-600 hover:text-primary-500">{t('privacyPolicy', 'Privacy Policy')}</Link>
                          </Trans>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition duration-300"
                    >
                      {t('submitBtn')}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          {/* Additional Resources */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-bold mb-4 text-neutral-800">{t('additionalResources')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/safety"
                className="flex items-start p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition duration-300"
              >
                <div className="mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-800">{t('safetyInfoTitle')}</h3>
                  <p className="text-sm text-neutral-600">{t('safetyInfoDesc')}</p>
                </div>
              </Link>
              <Link
                to="/help"
                className="flex items-start p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition duration-300"
              >
                <div className="mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-800">{t('helpCenterTitle')}</h3>
                  <p className="text-sm text-neutral-600">{t('helpCenterDesc')}</p>
                </div>
              </Link>
              <Link
                to="/contact"
                className="flex items-start p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition duration-300"
              >
                <div className="mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-800">{t('contactSupportTitle')}</h3>
                  <p className="text-sm text-neutral-600">{t('contactSupportDesc')}</p>
                </div>
              </Link>
              <a
                href="tel:+18007726238"
                className="flex items-start p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition duration-300"
              >
                <div className="mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-800">{t('emergencyLineTitle')}</h3>
                  <p className="text-sm text-neutral-600">{t('emergencyLineDesc')}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportConcern; 