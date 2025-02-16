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
import { useSelector } from "react-redux";
const App = () => {
  const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem("access_token");
  return (
    <div className="flex  h-screen w-full overflow-hidden ">
      <div className="flex-shrink-1">
        <Navbar />
      </div>
      <div className="flex-grow bg-slate-100 overflow-auto ">
        <Routes>
          <Route path="/" element={token ? <Home /> : <AuthPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:userId" element={<Profile />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="interests" element={<Interests />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
