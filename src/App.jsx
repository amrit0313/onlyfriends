import { Route, Routes } from "react-router-dom";
import Navbar from "./components/LAYOUT/nav";
import Profile from "./components/LAYOUT/profile";
import Chat from "./components/PAGES/chat";
const App = () => {
  return (
    <div className="grid grid-cols-5 relative h-screen w-full overflow-hidden ">
      <div className="col-span-0 md:row-span-4 md:col-span-1">
        <Navbar />
      </div>
      <div className="md:col-span-4 md:row-span-1  col-span-5">
        <Profile />
      </div>
      <div className="row-span-10 md:row-span-3 md:col-span-4 col-span-5 bg-slate-100">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
