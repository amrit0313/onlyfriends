import { Route, Routes } from "react-router-dom";
import Navbar from "./components/LAYOUT/nav";
import Profile from "./components/PAGES/profile";
import Chat from "./components/PAGES/chat";
import AuthPage from "./components/PAGES/auth";
const App = () => {
  return (
    <div className="grid grid-cols-5 relative h-screen w-full overflow-hidden ">
      <div className="col-span-0 md:row-span-4 md:col-span-1">
        <Navbar />
      </div>
      <div className="h-screen md:col-span-4 col-span-5 bg-slate-100">
        <Routes>
          <Route path="auth" element={<AuthPage />} />
          <Route path="/" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
