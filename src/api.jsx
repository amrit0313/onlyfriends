export const API_BASE_URL = "https://localhost:8000";

// Function to get access token from localStorage
const getAccessToken = () => localStorage.getItem("access_token");

// Function to refresh access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    console.log("No refresh token found. User needs to log in again.");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store the new access token
      localStorage.setItem("access_token", data.access_token);
      console.log("Access token refreshed!");
      return data.access_token;
    } else {
      console.log("Refresh token expired. Logging out user.");
      logoutUser();
      return null;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    logoutUser();
    return null;
  }
};

// Function to log out user and clear tokens
export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login"; // Redirect to login
};

// Custom fetch function with automatic token refresh
export const apiFetch = async (endpoint, options = {}) => {
  let accessToken = getAccessToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    console.log("Access token expired. Trying to refresh...");

    // Try refreshing the token
    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      // Retry the original request with the new token
      return fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
    }
  }

  return response;
};
