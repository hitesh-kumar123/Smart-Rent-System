import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 1. CRITICAL & UTILITY IMPORTS (Statically imported for speed/continuity)
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./pages/Loading_Screen";
import { AppSettingsProvider } from "./contexts/AppSettingsContext";
import { AuthProvider } from "./contexts/AuthContext";

// High-priority core user pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

// 2. LAZY IMPORTS (Separated into independent code chunks)
// Heavy Features (Maps, Markdown Parsers, Financials)
const Map = lazy(() => import("./pages/Map"));
const PropertyMap = lazy(() => import("./pages/PropertyMap"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// Secondary Content Pages
const Help = lazy(() => import("./pages/Help"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Safety = lazy(() => import("./pages/Safety"));
const Cancellation = lazy(() => import("./pages/Cancellation"));
const ReportConcern = lazy(() => import("./pages/ReportConcern"));
const FAQ = lazy(() => import("./pages/FAQ"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

// Legal & Document Pages (High text density)
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const HostPolicies = lazy(() => import("./pages/HostPolicies"));
const Cookies = lazy(() => import("./pages/Cookies"));
// import ForgotPassword from "./pages/ForgotPassword";

const Listings = lazy(() => import("./pages/Listings"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Messages = lazy(() => import("./pages/Messages"));
const Trips = lazy(() => import("./pages/Trips"));
const TripManage = lazy(() => import("./pages/TripManage"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const HostListings = lazy(() => import("./pages/HostListings"));
const Account = lazy(() => import("./pages/Account"));
const BecomeHost = lazy(() => import("./pages/BecomeHost"));

function App() {

  const [loading, setLoading] = useState(true);

  // Set browser's scrollRestoration to manual to take control of scrolling
  useEffect(() => {
    // Take control of scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force an immediate scroll to top on initial load
    window.scrollTo(0, 0);

    // Create a function to handle link clicks
    const handleLinkClick = (e) => {
      const link = e.target.closest("a");
      if (
        link &&
        !link.getAttribute("target") &&
        link.getAttribute("href") &&
        link.getAttribute("href").startsWith("/")
      ) {
        // For internal links, force scroll reset
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    };

    // Attach event listener for link clicks
    document.addEventListener("click", handleLinkClick);

    // Clean up
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  // Handle loading screen
  // useEffect(() => {
  //   // Hide loading screen after 3 seconds
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  //  if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    // Application settings context provider
    <AppSettingsProvider>
      {/* Authentication context provider */}
      <AuthProvider>
        {/* Browser router for handling navigation */}
        <BrowserRouter>
          {/* Add ScrollToTop to handle scrolling on route changes */}
          <ScrollToTop />
          {/* Global layout component (header, footer, etc.) */}
          <Layout>
            <Suspense fallback={<div className="p-8 text-center">Loading page...</div>}>
              <Routes>
                {/* Public routes - accessible to all users */}
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/properties/:id" element={<PropertyDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/help" element={<Help />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/safety" element={<Safety />} />
                <Route path="/cancellation" element={<Cancellation />} />
                <Route path="/report-concern" element={<ReportConcern />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/host-policies" element={<HostPolicies />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
                <Route path="/map" element={<Map />} />
                <Route path="/property/:id/map" element={<PropertyMap />} />
                {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

                {/* Protected routes - require user authentication */}
                <Route
                  path="/messages"
                  element={
                    <ProtectedRoute>
                      <Messages />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/trips"
                  element={
                    <ProtectedRoute>
                      <Trips />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/trips/:id/manage"
                  element={
                    <ProtectedRoute>
                      <TripManage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/host/listings"
                  element={
                    <ProtectedRoute>
                      <HostListings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/host/become-a-host"
                  element={
                    <ProtectedRoute>
                      <BecomeHost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  }
                />

                {/* Not found - catches all unmatched routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </AppSettingsProvider>
  );
}

export default App;
