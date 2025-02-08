import { Route, Routes } from "react-router-dom";
import Navbar from "./components/LAYOUT/nav";
import Home from "./components/LAYOUT/home";
import Chat from "./components/PAGES/chat";
import AuthPage from "./components/PAGES/auth";
import People from "./components/PAGES/people";
import Friends from "./components/PAGES/friends";
import Profile from "./components/PAGES/profile";
const App = () => {
  return (
    <div className="grid grid-cols-5 row-span-10 relative h-screen w-full overflow-hidden ">
      <div className="rowspan-1 md:row-span-4 md:col-span-1">
        <Navbar />
      </div>
      <div className="h-screen md:col-span-4 col-span-5 row-span-9 bg-slate-100">
        <Routes>
          <Route path="auth" element={<AuthPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/people" element={<People />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
