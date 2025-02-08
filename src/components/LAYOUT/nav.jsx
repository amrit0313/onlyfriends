import { NavLink } from "react-router-dom";
import logo from "../../assets/img.svg";
import { HiOutlineHome } from "react-icons/hi";
import { BsChatRightDots } from "react-icons/bs";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { TbPlugConnected } from "react-icons/tb";
import { CiPower } from "react-icons/ci";

const Navbar = ({ ...rest }) => {
  console.log(rest.className);
  return (
    <div>
      <div
        className={`h-screen bg-slate-200 hidden md:block ${rest.className}`}
      >
        <div className="flex justify-center items-center bg-slate-950 rounded-br-xl h-1/4 ">
          <img src={logo} className="h-16 w-16" />
        </div>
        <div className="flex items-center flex-col text-slate-950 font-extrabold bg-slate-200 h-3/4  relative">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "h-20 w-full p-5 w-full bg-slate-300"
                : "h-20 w-full p-5 w-full hover:bg-slate-300/50"
            }
          >
            <div className="flex justify-center">
              <HiOutlineHome size={30} style={{ strokeWidth: 3 }} />
              <span className="pt-2 pl-6">Home</span>
            </div>
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive
                ? "h-20 w-full p-5 w-full bg-slate-300"
                : "h-20 w-full p-5 w-full hover:bg-slate-300/50"
            }
          >
            <div className="flex justify-center">
              <BsChatRightDots size={20} />
              <span className="pl-9">Chat</span>
            </div>
          </NavLink>
          <NavLink
            to="/friends"
            className={({ isActive }) =>
              isActive
                ? "h-20 w-full p-5 w-full bg-slate-300"
                : "h-20 w-full p-5 w-full hover:bg-slate-300/50"
            }
          >
            <div className="flex justify-center">
              <LiaUserFriendsSolid size={25} />
              <span className="pl-6">Friends</span>
            </div>
          </NavLink>
          <NavLink
            to="/people"
            className={({ isActive }) =>
              isActive
                ? "h-20 w-full p-5 w-full bg-slate-300"
                : "h-20 w-full p-5 w-full hover:bg-slate-300/50"
            }
          >
            <div className="flex justify-center">
              <TbPlugConnected size={20} />
              <span className="pl-6">People</span>
            </div>
          </NavLink>
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              isActive
                ? "flex items-center justify-center absolute w-full h-20 bottom-0 pointer bg-slate-300"
                : "flex items-center justify-center absolute w-full h-20 bottom-0 pointer hover:bg-slate-400"
            }
          >
            <CiPower size={25} style={{ strokeWidth: 2 }} />
            <span className="pl-5">Sign In</span>
          </NavLink>
        </div>
      </div>

      <div className="flex flex-row md:hidden bg-slate-200 h-[60px]  absolute bottom-0 w-full z-[100] ">
        <NavLink to="/" className="h-20 width-10 p-5 w-full hover:bg-slate-300">
          <HiOutlineHome size={30} style={{ strokeWidth: 3 }} />
        </NavLink>
        <NavLink to="/chat" className="h-20 w-full p-5 hover:bg-slate-300">
          <BsChatRightDots size={20} />
        </NavLink>
        <NavLink to="friends" className="h-20 w-full p-5 hover:bg-slate-300">
          <LiaUserFriendsSolid size={25} />
        </NavLink>
        <NavLink to="people" className="h-20 w-full p-5 hover:bg-slate-300">
          <TbPlugConnected size={20} />
        </NavLink>
      </div>
    </div>
  );
};
export default Navbar;
