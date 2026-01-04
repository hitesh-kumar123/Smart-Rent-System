import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const Home = () => {
  const { t } = useTranslation('Home');
  // State for search query input value
  const [searchQuery, setSearchQuery] = useState("");
  // State to track if search dropdown is open/focused
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  // State for recent searches stored in localStorage
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  // Reference to search container for detecting outside clicks
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Popular location suggestions for search dropdown
  const suggestions = [
    "New York",
    "Los Angeles",
    "Miami",
    "Chicago",
    "San Francisco",
  ];

  useEffect(() => {
    // Handle clicks outside the search dropdown to close it
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to recent searches (avoid duplicates and limit to 5)
      const updatedSearches = [
        searchQuery.trim(),
        ...recentSearches.filter((search) => search !== searchQuery.trim()),
      ].slice(0, 5);

      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      navigate(`/listings?location=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/listings");
    }
  };

  // Function to handle click on a search suggestion
  const handleSuggestionClick = (suggestion) => {
    // Add to recent searches
    const updatedSearches = [
      suggestion,
      ...recentSearches.filter((search) => search !== suggestion),
    ].slice(0, 5);

    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    navigate(`/listings?location=${encodeURIComponent(suggestion)}`);
  };

  // Function to clear all recent searches from localStorage
  const clearRecentSearches = () => {
    localStorage.setItem("recentSearches", JSON.stringify([]));
    setRecentSearches([]);
  };

  // Sample featured destinations data
  const destinations = [
    {
      id: 1,
      name: t('newYork'),
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      properties: t('newYorkProperties'),
    },
    {
      id: 2,
      name: t('losAngeles'),
      image:
        "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      properties: t('losAngelesProperties'),
    },
    {
      id: 3,
      name: t('miami'),
      image:
        "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      properties: t('miamiProperties'),
    },
    {
      id: 4,
      name: t('chicago'),
      image:
        "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      properties: t('chicagoProperties'),
    },
  ];

  // Sample popular experiences data
  const experiences = [
    {
      id: 1,
      title: "City Tours",
      slug: "city-tours",
      image:
        "https://images.unsplash.com/photo-1473396413399-6717ef7c4093?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 2,
      title: "Outdoor Adventures",
      slug: "outdoor-adventures",
      image:
        "https://images.unsplash.com/photo-1533692328991-08159ff19fca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 3,
      title: "Local Cuisine",
      slug: "local-cuisine",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero section with background image and search form */}
      {/* Hero section */}
      <div className="relative h-[650px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1950&q=80"
            alt="Travel destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              <Trans i18nKey="heroTitle" ns="Home">
                Find stays that feel <span className="text-primary-400">like home</span>
              </Trans>
            </h1>

            <p className="text-lg md:text-xl text-neutral-200 mb-10 max-w-2xl">
              {t('heroDescription')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/listings"
                className="bg-primary-500 hover:bg-primary-600 text-white px-7 py-3 rounded-xl font-medium transition duration-300 shadow-lg"
              >
                {t('exploreStays')}
              </Link>

              <Link
                to="/host/become-a-host"
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-7 py-3 rounded-xl font-medium transition duration-300 border border-white/30"
              >
                {t('becomeHost')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured destinations section */}
      <div className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-2 text-neutral-800">
          {t('inspirationTitle')}
        </h2>
        <p className="text-neutral-600 mb-8">
          {t('inspirationSubtitle')}
        </p>

        {/* Featured destinations grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Link to="/listings" key={destination.id} className="group">
              <div className="overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition duration-300">
                <div className="relative h-72">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm">
                      {destination.properties} properties
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Property types section */}
      <div className="py-16 bg-neutral-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-2 text-neutral-800">
            {t('stayAnywhereTitle')}
          </h2>
          <p className="text-neutral-600 mb-8">
            {t('stayAnywhereSubtitle')}
          </p>

          {/* Property types grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Apartments property type */}
            <Link to="/listings?type=apartment" className="group">
              <div className="rounded-xl overflow-hidden">
                <div className="h-60 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Apartments"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium text-neutral-800 group-hover:text-primary-500 transition duration-300">
                    {t('apartments')}
                  </h3>
                  <p className="text-neutral-600 text-sm">{t('apartmentsDesc')}</p>
                </div>
              </div>
            </Link>
            {/* Houses property type */}
            <Link to="/listings?type=house" className="group">
              <div className="rounded-xl overflow-hidden">
                <div className="h-60 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Houses"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium text-neutral-800 group-hover:text-primary-500 transition duration-300">
                    {t('houses')}
                  </h3>
                  <p className="text-neutral-600 text-sm">{t('housesDesc')}</p>
                </div>
              </div>
            </Link>
            {/* Cabins property type */}
            <Link to="/listings?type=cabin" className="group">
              <div className="rounded-xl overflow-hidden">
                <div className="h-60 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Cabins"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium text-neutral-800 group-hover:text-primary-500 transition duration-300">
                    {t('cabins')}
                  </h3>
                  <p className="text-neutral-600 text-sm">{t('cabinsDesc')}</p>
                </div>
              </div>
            </Link>
            {/* Villas property type */}
            <Link to="/listings?type=villa" className="group">
              <div className="rounded-xl overflow-hidden">
                <div className="h-60 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Villas"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium text-neutral-800 group-hover:text-primary-500 transition duration-300">
                    {t('villas')}
                  </h3>
                  <p className="text-neutral-600 text-sm">{t('villasDesc')}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Experiences section */}
      <div className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-2 text-neutral-800">
          {t('discoverExperiencesTitle')}
        </h2>
        <p className="text-neutral-600 mb-8">
          {t('discoverExperiencesSubtitle')}
        </p>

        {/* Experiences grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((experience) => (
            <Link
              key={experience.id}
              to={`/listings?experience=${experience.slug}`}
              className="group cursor-pointer"
            >
              <div className="rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition duration-300">
                <div className="h-80 relative overflow-hidden">
                  <img
                    src={experience.image}
                    alt={t(experience.slug)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-medium text-neutral-800 group-hover:text-primary-500 transition duration-300">
                    {t(experience.slug)}
                  </h3>
                  <p className="text-neutral-600">{t(`${experience.slug}Desc`)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Become a host CTA section */}
      <div className="py-16 px-4 sm:px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary-500 rounded-3xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {t('becomeAHostTitle')}
                </h2>
                <p className="text-white text-lg mb-8 max-w-md">
                  {t('becomeAHostDesc')}
                </p>
                {/* Learn more button for host sign-up */}
                <Link
                  to="/host/become-a-host"
                  className="inline-block bg-white text-primary-500 font-medium px-6 py-3 rounded-lg hover:bg-neutral-100 transition duration-300 w-fit"
                >
                  {t('learnMore')}
                </Link>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt={t('becomeAHostTitle')}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
