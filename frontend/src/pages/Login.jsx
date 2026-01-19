import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Home, Eye, EyeOff } from "lucide-react";

/**
 * Login Component
 * Handles user authentication with email/password
 * Features: Login, password reset, form validation, show/hide password
 * UI: Updated to match Register component style
 */
const Login = () => {
  // State for form data and UI controls
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state during API calls
  const [error, setError] = useState(""); // Error message display
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Toggle between login and forgot password
  const [resetEmail, setResetEmail] = useState(""); // Email for password reset
  const [resetSent, setResetSent] = useState(false); // Track if reset email was sent
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [rememberMe, setRememberMe] = useState(false); // Remember me checkbox state
  const [socialLoading, setSocialLoading] = useState(""); // Tracks which social login is in progress

  // Auth context provides login functionality and authentication state
  const { login, isAuthenticated, error: authError, resetPassword } = useAuth();
  const navigate = useNavigate(); // For redirecting after login
  const location = useLocation(); // To get redirect path from location state

  // Redirect if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Set error from auth context when it changes
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  // Handle input changes for email and password fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox state changes
  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Email validation: Check if email contains ".com" twice
    if ((formData.email.match(/\.com/g) || []).length > 1) {
      setError(
        "Invalid email address. Email contains multiple '.com' domains."
      );
      return;
    }
    setLoading(true);

    try {
      // Attempt to login with provided credentials
      const result = await login(formData.email, formData.password);
      if (result.success) {
        // Redirect to homepage after successful login
        navigate("/", { replace: true });
      } else {
        // Custom error message for invalid credentials
        if (
          result.error &&
          (result.error.includes("Invalid email or password") ||
            result.error.includes("Invalid credentials"))
        ) {
          setError("Password invalid");
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset request
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call the reset password function from auth context
      await resetPassword(resetEmail);
      setResetSent(true); // Show success message
    } catch (err) {
      setError(err.message || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  // Handle email input change for password reset
  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setSocialLoading("google");
    setError("");

    // 1. Get the ID
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    // 2. SAFETY CHECK: Stop if ID is missing or is the placeholder
    if (!clientId || clientId === "your-google-client-id") {
      setError("Google Login is not configured in this environment.");
      setSocialLoading("");
      return; 
    }

    try {
      const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
      const redirectUri = window.location.origin + "/auth/google/callback";

      const params = new URLSearchParams({
        client_id: clientId, // Use the variable, NOT the hardcoded fallback
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "email profile",
        prompt: "select_account",
      });

      window.location.href = `${googleAuthUrl}?${params.toString()}`;
    } catch (err) {
      setError("Google login failed. Please try again.");
      setSocialLoading("");
    }
  };
  // Handle Facebook login
  const handleFacebookLogin = async () => {
    setSocialLoading("facebook");
    setError("");

    const appId = process.env.REACT_APP_FACEBOOK_APP_ID;

    // SAFETY CHECK
    if (!appId || appId === "your-facebook-app-id") {
      setError("Facebook Login is not configured in this environment.");
      setSocialLoading("");
      return;
    }

    try {
      const fbAuthUrl = "https://www.facebook.com/v12.0/dialog/oauth";
      const redirectUri = window.location.origin + "/auth/facebook/callback";

      const params = new URLSearchParams({
        client_id: appId,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "email,public_profile",
      });

      window.location.href = `${fbAuthUrl}?${params.toString()}`;
    } catch (err) {
      setError("Facebook login failed. Please try again.");
      setSocialLoading("");
    }
  };

  // Common input style class to keep code clean
  const inputStyle = "w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Modern luxury apartment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full flex items-start justify-center min-h-screen pt-8">
        <div className="w-full max-w-md animate-fade-in bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-5">
          
          {/* Logo/Brand */}
          <div className="mb-3 text-center">
            <div className="inline-block p-2 bg-red-600 rounded-2xl mb-2 shadow-lg transform hover:scale-110 transition-transform duration-300">
              <img
                src="/android-chrome-512x512.png" 
                alt="Smart Rent Logo"
                className="w-6 h-6 object-contain" 
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Welcome Again             </h1>
            <p className="text-gray-600 text-xs">
              {showForgotPassword ? "Recover your account" : "Login to access your dashboard"}
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-3 py-2 rounded-lg mb-3 text-xs animate-shake relative">
              <p className="font-medium">⚠️ {error}</p>
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => setError("")}
              >
                ✕
              </button>
            </div>
          )}

          {/* Success message for password reset */}
          {resetSent && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-3 py-2 rounded-lg mb-3 text-xs animate-fade-in">
              <p className="font-medium">✅ Password reset email sent. Please check your inbox.</p>
            </div>
          )}

          {/* Conditional Rendering: Forgot Password vs Login */}
          {showForgotPassword ? (
             // --- Forgot Password Form ---
            <form className="space-y-3" onSubmit={handlePasswordReset}>
               <div className="relative group">
                  <input
                    id="resetEmail"
                    name="resetEmail"
                    type="email"
                    autoComplete="email"
                    required
                    value={resetEmail}
                    onChange={handleResetEmailChange}
                    placeholder="Enter your email address"
                    className={inputStyle}
                  />
               </div>

               <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                
                <p className="mt-3 text-center text-xs text-gray-600">
                  Remember your password?{" "}
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Back to login
                  </button>
                </p>
            </form>
          ) : (
            // --- Login Form ---
            <>
              {/* Social login buttons */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={socialLoading !== ""}
                  className="flex items-center justify-center p-2 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {socialLoading === "google" ? (
                    <span className="animate-spin h-5 w-5 border-t-2 border-r-2 border-blue-500 rounded-full" />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleFacebookLogin}
                  disabled={socialLoading !== ""}
                  className="flex items-center justify-center p-2 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {socialLoading === "facebook" ? (
                    <span className="animate-spin h-5 w-5 border-t-2 border-r-2 border-blue-600 rounded-full" />
                  ) : (
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center p-2 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                   <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                </button>
              </div>

              <div className="relative mb-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-500 font-medium">or continue with email</span>
                </div>
              </div>

              <form className="space-y-2" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="relative group">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={inputStyle}
                  />
                </div>

                {/* Password */}
                <div className="relative group">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`${inputStyle} pr-11`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={handleCheckboxChange}
                        className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                      />
                      <label htmlFor="remember_me" className="ml-2 block text-gray-600 cursor-pointer select-none">
                        Remember me
                      </label>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                          if (!formData.email || formData.email.trim() === "") {
                            setError("Please enter your email address before requesting a password reset.");
                          } else {
                            setShowForgotPassword(true);
                            setResetEmail(formData.email);
                          }
                        }}
                        className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        Forgot password?
                    </button>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : "Log In"}
                </button>
              </form>
              
              {/* Register link */}
              <p className="mt-3 text-center text-xs text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all">
                  Create a new account
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.1); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Login;
