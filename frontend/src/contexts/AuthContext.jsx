import React, { createContext, useContext, useState, useEffect } from "react";
import api, { setAccessToken } from "../config/api";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is already logged in via refresh token in cookie
    const checkLoggedIn = async () => {
      try {
        // Attempt to refresh token on mount
        const res = await api.post("/api/users/refresh");

        if (res.data && res.data.token) {
          setAccessToken(res.data.token);
          setCurrentUser({
            _id: res.data._id,
            username: res.data.username,
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            role: res.data.role,
            profileImage: res.data.profileImage,
            referralCode: res.data.referralCode || "",
          });
          console.log("User session restored via refresh token");
        }
      } catch (err) {
        console.log("No active session or refresh token expired");
        setAccessToken(null);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register a new user
  const register = async (userData) => {
    try {
      setError("");
      setCurrentUser(null);
      setAccessToken(null);

      console.log("Registering with data:", userData);
      const res = await api.post("/api/users/register", userData);
      console.log("Registration response:", res.data);

      if (res.data && res.data.token) {
        setAccessToken(res.data.token);
        setCurrentUser({
          _id: res.data._id,
          username: res.data.username,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          role: res.data.role,
          profileImage: res.data.profileImage,
          referralCode: res.data.referralCode || "",
        });
      }

      return { success: true, data: res.data };
    } catch (err) {
      console.error("Registration error:", err);
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setError("");
      setCurrentUser(null);
      setAccessToken(null);

      console.log("Logging in with:", { email });
      const res = await api.post("/api/users/login", { email, password });
      console.log("Login response:", res.data);

      if (res.data && res.data.token) {
        setAccessToken(res.data.token);
        setCurrentUser({
          _id: res.data._id,
          username: res.data.username,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          role: res.data.role,
          profileImage: res.data.profileImage,
          referralCode: res.data.referralCode || "",
        });
      }

      return { success: true, data: res.data };
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || "Invalid credentials";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Clear all user data
  const clearUserData = () => {
    setAccessToken(null);
    setCurrentUser(null);
    setError("");
  };

  // Logout user
  const logout = async () => {
    try {
      await api.post("/api/users/logout");
      clearUserData();
    } catch (err) {
      console.error("Logout error:", err);
      clearUserData(); // Clear anyway
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setError("");
      const res = await api.put("/api/users/profile", userData);
      setCurrentUser(res.data);
      return { success: true, data: res.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Update failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update profile image
  const updateProfileImage = async (file) => {
    try {
      setError("");
      const formData = new FormData();
      formData.append("profileImage", file);

      const res = await api.post("/api/users/profile/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data && res.data.profileImage) {
        const profileImageUrl = res.data.profileImage.includes("?")
          ? res.data.profileImage
          : `${res.data.profileImage}?t=${new Date().getTime()}`;

        setCurrentUser((prevUser) => ({
          ...prevUser,
          profileImage: profileImageUrl,
        }));

        return { success: true, profileImage: profileImageUrl };
      }
      return { success: false, error: "Invalid response from server" };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Image upload failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Remove profile image
  const removeProfileImage = async () => {
    try {
      setError("");
      const res = await api.delete("/api/users/profile/image");

      if (res.data && res.data.success) {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          profileImage: "",
        }));
      }

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to remove profile image";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update password
  const updatePassword = async (passwordData) => {
    try {
      setError("");
      await api.put("/api/users/password", passwordData);
      return { success: true, message: "Password updated successfully" };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Password update failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Reset password (forgot password)
  const resetPassword = async (email) => {
    try {
      setError("");
      await api.post("/api/users/forgot-password", { email });
      return { success: true, message: "Password reset email sent" };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Password reset request failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Social login (Google, Facebook)
  const socialLogin = async (provider) => {
    // Note: Social login normally handles redirections, so we don't change logic here
    // but the backend will need to set the refreshToken cookie on callback
    try {
      setError("");
      const redirectUri = window.location.origin + `/auth/${provider}/callback`;

      let authUrl = "";
      let params = {};

      if (provider === "google") {
        authUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        params = {
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || "your-google-client-id",
          redirect_uri: redirectUri,
          response_type: "code",
          scope: "email profile",
          prompt: "select_account",
        };
      } else if (provider === "facebook") {
        authUrl = "https://www.facebook.com/v12.0/dialog/oauth";
        params = {
          client_id: process.env.REACT_APP_FACEBOOK_APP_ID || "your-facebook-app-id",
          redirect_uri: redirectUri,
          response_type: "code",
          scope: "email,public_profile",
        };
      }

      if (authUrl) {
        const queryString = new URLSearchParams(params).toString();
        window.location.href = `${authUrl}?${queryString}`;
      }

      return { success: true };
    } catch (err) {
      const errorMessage = `${provider} login failed`;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    clearUserData,
    updateProfile,
    updatePassword,
    resetPassword,
    socialLogin,
    updateProfileImage,
    removeProfileImage,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
