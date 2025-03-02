import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/LAYOUT/nav";
import Home from "./components/LAYOUT/home";
import Chat from "./components/PAGES/chat";
import AuthPage from "./components/PAGES/auth";
import People from "./components/PAGES/people";
import Friends from "./components/PAGES/friends";
import Profile from "./components/PAGES/profiles";
import UserProfile from "./components/PAGES/userprofile";
import Interests from "./components/PAGES/interests";
import RequestProfile from "./components/PAGES/requestProfiles";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, []);
  const deleteToken = () => {
    setToken(localStorage.clear());
  };

  return (
    <div className="flex h-screen w-full overflow-hidden max-h-screen">
      {token && (
        <div className="flex-shrink-1">
          <Navbar />
        </div>
      )}
      <div className="flex-grow bg-slate-100 overflow-auto">
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Home deleteToken={deleteToken} />
              ) : (
                <AuthPage setToken={setToken} />
              )
            }
          />
          <Route path="auth" element={<AuthPage setToken={setToken} />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:username" element={<Profile />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="interests" element={<Interests />} />
          <Route path="/friends/:username" element={<RequestProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
