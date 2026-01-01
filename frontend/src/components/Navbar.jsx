import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSettings } from "../contexts/AppSettingsContext";
import { useAuth } from "../contexts/AuthContext";
import NavLogo from "./navbar/NavLogo";
import NavSearch from "./navbar/NavSearch";
import NavProfile from "./navbar/NavProfile";
import NavSettings from "./navbar/NavSettings";

const Navbar = () => {
  // State for UI controls
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [isSettingsLoading, setIsSettingsLoading] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const searchRef = useRef(null);
  const settingsRef = useRef(null);
  const menuRef = useRef(null);
  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  // Use auth context
  const { currentUser, logout, isAuthenticated } = useAuth();

  // Use the app settings context
  const {
    language,
    languageName,
    currency,
    changeLanguage,
    changeCurrency,
    supportedLanguages,
    getText,
    isTranslating,
    isLoadingRates,
  } = useAppSettings();

  // Popular suggestions
  const suggestions = [
    "New York",
    "Los Angeles",
    "Miami",
    "Chicago",
    "San Francisco",
  ];

  // Available currencies
  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
  ];

  // Close profile and settings menus on route change
  useEffect(() => {
    setIsProfileMenuOpen(false);
    setIsSettingsMenuOpen(false);
  }, [location.pathname]);

  // Handle clicks outside dropdown menus and keyboard navigation
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSearchFocused(false);
        setIsSettingsMenuOpen(false);
        setIsProfileMenuOpen(false);
      }

      if (event.key === "Tab" && (isSettingsMenuOpen || isProfileMenuOpen)) {
        const menu = isSettingsMenuOpen ? settingsRef.current : document;
        const focusableElements = menu.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSettingsMenuOpen, isProfileMenuOpen]);

  // Control body scrolling when settings modal is open
  useEffect(() => {
    if (isSettingsMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSettingsMenuOpen]);

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const updatedSearches = [
        searchQuery.trim(),
        ...recentSearches.filter((search) => search !== searchQuery.trim()),
      ].slice(0, 5);

      setRecentSearches(updatedSearches);
      navigate(`/listings?location=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const updatedSearches = [
      suggestion,
      ...recentSearches.filter((search) => search !== suggestion),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    navigate(`/listings?location=${encodeURIComponent(suggestion)}`);
    setIsSearchFocused(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const handleLanguageChange = async (langCode, langName) => {
    try {
      setIsSettingsLoading(true);
      await changeLanguage(langCode, langName);
    } finally {
      setIsSettingsLoading(false);
      setIsSettingsMenuOpen(false);
    }
  };

  const handleCurrencyChange = async (currencyCode) => {
    try {
      setIsSettingsLoading(true);
      await changeCurrency(currencyCode);
    } finally {
      setIsSettingsLoading(false);
      setIsSettingsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white py-4 px-2 md:px-6 sticky top-0 z-20 shadow-sm">
      <div className="container mx-auto">
        {/* Main navigation flex: Added gap-2 to prevent elements from touching */}
        <div className="flex justify-between items-center gap-2">
          
          {/* Logo - Added flex-shrink-0 to keep it from getting squashed on iPhone SE */}
          <div className="flex-shrink-0">
            <NavLogo />
          </div>

          {/* Explore Button - Hidden on mobile, only visible from md up */}
          {location.pathname === "/" && (
            <div className="hidden lg:block ml-4 flex-shrink-0">
              <Link
                to="/listings"
                className="flex items-center px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-full transition duration-300 shadow-sm hover:shadow-md gap-2"
                aria-label="Explore Properties"
              >
                <i className="fas fa-compass text-lg"></i>
                <span className="font-medium">Explore</span>
              </Link>
            </div>
          )}

          {/* Search bar - Made flexible with flex-1 and a restricted max-width for SE */}
          {location.pathname === "/" && (
            <div
              ref={searchRef}
              className="flex relative flex-1 mx-1 max-w-[180px] sm:max-w-md rounded-full border border-neutral-200 shadow-search hover:shadow-md transition duration-200"
            >
              <form onSubmit={handleSearchSubmit} className="w-full">
                <input
                  type="text"
                  placeholder={getText("common", "search")}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full px-4 py-2 rounded-full focus:outline-none text-xs sm:text-sm text-neutral-700 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#FF4C6D] text-white rounded-full w-7 h-7 flex items-center justify-center"
                >
                  <i className="fas fa-search text-xs"></i>
                </button>
              </form>

              {/* Search Dropdown */}
              {isSearchFocused && (
                <div className="absolute w-full mt-1 top-full left-0 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden z-20">
                  {recentSearches.length > 0 && (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-neutral-800">Recent Searches</h3>
                        <button onClick={clearRecentSearches} className="text-xs text-neutral-500 hover:text-neutral-700">Clear all</button>
                      </div>
                      <div className="space-y-2">
                        {recentSearches.map((search, index) => (
                          <div key={index} onClick={() => handleSuggestionClick(search)} className="flex items-center p-2 hover:bg-neutral-50 rounded-md cursor-pointer">
                            <i className="fas fa-history text-neutral-400 mr-3"></i>
                            <span className="text-sm text-neutral-700">{search}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="p-4 border-t border-neutral-100">
                    <h3 className="text-sm font-semibold text-neutral-800">Popular Destinations</h3>
                    <div className="space-y-2">
                      {suggestions.map((suggestion, index) => (
                        <div key={index} onClick={() => handleSuggestionClick(suggestion)} className="flex items-center p-2 hover:bg-neutral-50 rounded-md cursor-pointer">
                          <i className="fas fa-map-marker-alt text-neutral-400 mr-3"></i>
                          <span className="text-sm text-neutral-700">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Right menu items - Added flex-shrink-0 to bring the buttons back into view */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <Link
              to="/host/become-a-host"
              className="text-neutral-700 hover:text-neutral-900 px-4 py-2 rounded-full text-sm font-medium hidden sm:block"
            >
              {getText("common", "becomeHost")}
            </Link>

            {/* Settings/Language Button */}
            <div ref={settingsRef} className="relative">
              <button
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setMenuPosition({ x: rect.left, y: rect.bottom });
                  setIsSettingsMenuOpen(!isSettingsMenuOpen);
                }}
                className="flex items-center justify-center p-1.5 text-neutral-700 hover:text-neutral-900 transition duration-200 relative"
                aria-label="Settings"
              >
                <div className="relative">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12H22" />
                    <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" />
                  </svg>
                </div>
                {isSettingsLoading && (
                  <div className="absolute -top-1 -right-1 w-3 h-3">
                    <div className="absolute w-full h-full rounded-full border-2 border-t-transparent border-primary-500 animate-spin"></div>
                  </div>
                )}
              </button>

              {isSettingsMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fadeIn" role="dialog" aria-modal="true">
                  <div ref={menuRef} className="bg-white rounded-xl shadow-xl w-full max-h-[90vh] overflow-y-auto mx-4 transform transition-all duration-300 ease-out sm:max-w-xl sm:w-full" style={{ maxWidth: "min(90vw, 32rem)" }}>
                    <div className="flex justify-between items-center p-4 border-b border-neutral-200 sticky top-0 bg-white z-10">
                      <h2 className="text-xl font-bold text-neutral-800">Language and Currency</h2>
                      <div className="flex items-center">
                        <span className="text-sm text-neutral-500 mr-3">Currently: {languageName}, {currency}</span>
                        <button onClick={() => setIsSettingsMenuOpen(false)} className="text-neutral-500 hover:text-neutral-700 p-2 rounded-full hover:bg-neutral-100 transition duration-200"><i className="fas fa-times"></i></button>
                      </div>
                    </div>
                    <div className="p-6 border-b border-neutral-200">
                      <h3 className="text-lg font-semibold text-neutral-800 mb-4">Select a language</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {supportedLanguages.map((lang) => (
                          <button key={lang.code} onClick={() => handleLanguageChange(lang.code, lang.name)} className={`flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${language === lang.code ? "bg-primary-50 text-primary-600 font-medium border-2 border-primary-200" : "text-neutral-700 hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300"}`}>
                            <span>{lang.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-neutral-800 mb-4">Select a currency</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currencies.map((curr) => (
                          <button key={curr.code} onClick={() => handleCurrencyChange(curr.code)} className={`flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${currency === curr.code ? "bg-primary-50 text-primary-600 font-medium border-2 border-primary-200" : "text-neutral-700 hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300"}`}>
                            <span className="mr-2 font-bold">{curr.symbol}</span>
                            <span>{curr.code} - {curr.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu button */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-1 border border-neutral-300 p-1.5 rounded-full hover:shadow-md transition duration-200"
                aria-label="User menu"
              >
                <i className="fas fa-bars text-neutral-500 text-xs"></i>
                {isAuthenticated && currentUser ? (
                  <div className="bg-primary-500 text-white rounded-full w-7 h-7 flex items-center justify-center overflow-hidden">
                    {currentUser.profileImage ? (
                      <img src={currentUser.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] font-medium">{currentUser.firstName?.[0]}{currentUser.lastName?.[0]}</span>
                    )}
                  </div>
                ) : (
                  <div className="bg-neutral-500 text-white rounded-full w-7 h-7 flex items-center justify-center">
                    <i className="fas fa-user text-xs"></i>
                  </div>
                )}
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-card border border-neutral-200 divide-neutral-100 py-1 z-[1000]">
                  {!isAuthenticated ? (
                    <div className="py-1">
                      <Link to="/login" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setIsProfileMenuOpen(false)}>{getText("common", "login")}</Link>
                      <Link to="/register" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setIsProfileMenuOpen(false)}>{getText("common", "signup")}</Link>
                      <Link to="/host/become-a-host" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setIsProfileMenuOpen(false)}>{getText("common", "becomeHost")}</Link>
                      <Link to="/help" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setIsProfileMenuOpen(false)}>{getText("common", "help")}</Link>
                    </div>
                  ) : (
                    <>
                      <div className="p-4">
                        <div className="flex items-center">
                          <div className="bg-primary-500 text-white rounded-full w-10 h-10 mr-3 flex items-center justify-center overflow-hidden">
                            {currentUser.profileImage ? (
                              <img src={currentUser.profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-sm font-medium">{currentUser.firstName?.[0]}{currentUser.lastName?.[0]}</span>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-neutral-800">{currentUser.firstName} {currentUser.lastName}</p>
                            <p className="text-xs text-neutral-500">{currentUser.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-1 border-t border-neutral-100">
                        <Link to="/messages" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setIsProfileMenuOpen(false)}>{getText("common", "messages")}</Link>
                        <Link to="/trips" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setIsProfileMenuOpen(false)}>{getText("common", "trips")}</Link>
                        <Link to="/wishlist" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setIsProfileMenuOpen(false)}>{getText("common", "wishlist")}</Link>
                      </div>
                      <div className="py-1 border-t border-neutral-100">
                        <Link to="/host/listings" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setIsProfileMenuOpen(false)}>Manage listings</Link>
                        <Link to="/account" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setIsProfileMenuOpen(false)}>{getText("common", "account")}</Link>
                        <button className="w-full text-left block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={handleLogout}>{getText("common", "logout")}</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay logic remains unchanged */}
        {isSearchFocused && location.pathname === "/" && (
          <div className="fixed inset-0 bg-white z-50 md:hidden p-4">
            <div className="flex items-center mb-4">
              <button onClick={() => setIsSearchFocused(false)} className="p-2 hover:bg-neutral-100 rounded-full">
                <i className="fas fa-arrow-left text-neutral-700"></i>
              </button>
              <span className="ml-4 text-lg font-semibold">Search</span>
            </div>
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <input
                  type="text"
                  placeholder={getText("common", "search")}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
              </form>
              {recentSearches.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold">Recent Searches</h3>
                    <button onClick={clearRecentSearches} className="text-xs text-neutral-500">Clear all</button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <div key={index} onClick={() => { handleSuggestionClick(search); setIsSearchFocused(false); }} className="flex items-center p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
                        <i className="fas fa-history text-neutral-400 mr-3"></i>
                        <span className="text-sm">{search}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Popular Destinations</h3>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} onClick={() => { handleSuggestionClick(suggestion); setIsSearchFocused(false); }} className="flex items-center p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
                      <i className="fas fa-map-marker-alt text-neutral-400 mr-3"></i>
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;