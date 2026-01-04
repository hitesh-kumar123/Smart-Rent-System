import React, { useState } from "react";
import { Link } from "react-router-dom";
import useScrollTop from "../hooks/useScrollTop";
import { useTranslation } from "react-i18next";

const About = () => {

  // Use the scroll top hook
  useScrollTop();
  const { t } = useTranslation('About');

  // State for image loading
  const [loadedImages, setLoadedImages] = useState({});

  // Handle image load
  const handleImageLoad = (memberName) => {
    setLoadedImages((prev) => ({ ...prev, [memberName]: true }));
  };

  // Team members data from translation
  const teamMembers = t('teamMembers', { returnObjects: true }) || [];

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <section
        className="bg-primary-700 text-white py-20"
        aria-labelledby="hero-title"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              id="hero-title"
              className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn"
            >
              {t('aboutTitle')}
            </h1>
            <p className="text-xl text-primary-100 mb-8 animate-fadeIn animation-delay-200">
              {t('aboutSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16" aria-labelledby="story-title">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2
              id="story-title"
              className="text-3xl font-bold text-center mb-10 animate-fadeIn animation-delay-400"
            >
              {t('missionTitle')}
            </h2>
            <div className="bg-white rounded-xl shadow-sm p-8 mb-10 animate-fadeIn animation-delay-600">
              <p className="text-neutral-700 mb-4">{t('missionText')}</p>
              <p className="text-neutral-700 mb-4">{t('visionText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">{t('ourValuesTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('trustSafetyTitle')}</h3>
              <p className="text-neutral-600">{t('trustSafetyDesc')}</p>
            </div>
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('globalCommunityTitle')}</h3>
              <p className="text-neutral-600">{t('globalCommunityDesc')}</p>
            </div>
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('innovationTitle')}</h3>
              <p className="text-neutral-600">{t('innovationDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            {t('teamTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="relative w-full h-48">
                  {!loadedImages[member.name] && (
                    <div className="absolute inset-0 bg-neutral-100 animate-pulse flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-neutral-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                      loadedImages[member.name] ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(member.name)}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Photo+Unavailable";
                      handleImageLoad(member.name);
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-neutral-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section
        className="bg-primary-700 text-white py-16"
        aria-labelledby="cta-title"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-title" className="text-3xl font-bold mb-6 animate-fadeIn">
            {t('joinOurCommunity')}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto animate-fadeIn animation-delay-200">
            {t('joinOurCommunityDesc')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/listings"
              className="bg-white text-primary-700 hover:bg-neutral-100 px-8 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
              aria-label="Browse our property listings"
            >
              {t('exploreProperties')}
            </Link>
            <Link
              to="/host/become-a-host"
              className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
              aria-label="Learn about becoming a property host"
            >
              {t('becomeHost')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;