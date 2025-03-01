import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

import {
  LuHouse,
  LuMessageCircle,
  LuUsers,
  LuPlug,
  LuLogIn,
} from "react-icons/lu";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = ({ onLogout }) => {
  const [isCollasped, setIsCollasped] = useState(false);
  const token = localStorage.getItem("access_token");
  const navlinks = [
    {
      to: "/",
      icon: <LuHouse size={25} />,
      label: "Home",
    },
    { to: "/chat", icon: <LuMessageCircle size={25} />, label: "Chat" },
    {
      to: "/friends",
      icon: <LuUsers size={25} />,
      label: "Friends",
    },
    { to: "/people", icon: <LuPlug size={25} />, label: "People" },
  ];

  return (
    <div>
      <div className="relative z-[1]">
        <button
          onClick={() => setIsCollasped((prev) => !prev)}
          className="hidden xl:block absolute right-[-1.5rem] top-10 p-5  bg-white shadow-xl shadow-slate-400 rounded-full  z-[2]"
        >
          <RxHamburgerMenu />
        </button>
        <div className={`h-screen bg-slate-200 relative hidden lg:block`}>
          <div className="p-6">
            <h1 className="text-pretty mb-10 font-bold text-2xl text-slate-600 hidden xl:block ">
              {isCollasped ? "O F" : "OnlyFriends"}
            </h1>
            <h1 className="xl:hidden text-pretty mb-10 font-bold text-2xl text-slate-600">
              O F
            </h1>
          </div>
          <div className="flex items-center flex-col text-slate-950 font-extrabold  pb-2  ">
            {navlinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={({ isActive }) =>
                  (isActive ? " bg-slate-300" : " hover:bg-slate-300/50") +
                  " h-20 w-full flex p-10  items-center "
                }
              >
                <div className="flex items-center ">
                  {link.icon}
                  {!isCollasped && (
                    <span className="hidden xl:flex pl-8 pr-10">
                      {link.label}
                    </span>
                  )}
                </div>
              </NavLink>
            ))}
          </div>
          {!token && (
            <NavLink
              className={({ isActive }) =>
                (isActive ? " bg-slate-300" : " hover:bg-slate-300/50") +
                " h-20 w-full flex p-10  items-center absolute bottom-0  text-slate-950 font-extrabold "
              }
              to="auth"
            >
              <button className="flex items-center ">
                <LuLogIn size={27} />
                {!isCollasped && (
                  <span className="pl-5 hidden xl:flex">Sign In</span>
                )}
              </button>
            </NavLink>
          )}
        </div>
      </div>

      <div className=" flex flex-row lg:hidden bg-slate-200 h-[60px] absolute bottom-0 w-full z-[100] ">
        {navlinks.slice(0, 4).map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className="h-auto width-10 p-5 w-full hover:bg-slate-300 "
          >
            {link.icon}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
export default Navbar;
