import { NavLink, useNavigate } from "react-router-dom";
import { PiSignOutFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import Posts from "../store/posts";
import "../../styles/tooltip.css";
import download from "../../assets/download.png";
const Home = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const token = localStorage.getItem("access_token");
  const [postUpdated, setPostsUpdated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/v1/profile/myprofile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.log("Error:", errorData);
          throw new Error("Error");
        }
        const responseData = await response.json();
        setUser(responseData.profile_pic);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const postHandler = async (e) => {
    e.preventDefault();
    console.log("funcction");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/posts`, {
        method: "POST",
        body: JSON.stringify({
          content: post,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error:", errorData);
        throw new Error("Error");
      }
      const responseData = await response.json();
      console.log(responseData);
      setPost("");
      setPostsUpdated((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignout = () => {
    localStorage.clear();
    navigate("auth");
  };
  const getProfilePicUrl = (path) => {
    return `${import.meta.env.VITE_API_URL}/${path}`;
  };

  return (
    <div className=" flex">
      <div className="flex flex-col items-start   gap-5   w-full lg:w-3/4 h-screen  overflow-scroll scrollbar-thumb-green-500 scrollbar-track-green-200 relative">
        <div className="flex justify-evenly w-full">
          <div className=" flex justify-between md:justify-center items-center w-full gap-10 mx-5">
            <div className="flex  h-[6rem] lg:h-[7rem] aspect-square bg-white m-2 ml-10 border-2 rounded-full border-slate-500 ">
              <button
                className="flex justify-center items-center"
                onClick={() => navigate("/user")}
              >
                <img
                  className="rounded-full h-[5rem] lg:h-[6rem] aspect-square m-2 "
                  src={user ? getProfilePicUrl(user) : download}
                  alt="image is displaying...."
                />
              </button>
            </div>
            <div className="hidden md:flex w-8/12  justify-center relative flex-wrap  top-20 md:top-0">
              <textarea
                className="w-full py-6 pl-3 pr-16  border-2 border-slate-500 rounded-3xl "
                value={post}
                onChange={(e) => setPost(e.target.value)}
                type="text"
                placeholder="Write something to your so called OnlyFriends"
              ></textarea>
              <button
                onClick={(e) => postHandler(e)}
                className=" bg-transparent  font-extrabold text-indigo-600 absolute right-0 top-1/2 translate-x-[-50%] translate-y-[-50%]"
              >
                POST
              </button>
            </div>
            <button className="tooltip" onClick={handleSignout}>
              <PiSignOutFill size={40} />
              <span className="tooltiptext">Log out</span>
            </button>
          </div>
        </div>
        <div className="flex md:hidden w-11/12   relative flex-wrap mx-7">
          <textarea
            className="w-full py-6 pl-3 pr-16  border-2 border-slate-500 rounded-3xl "
            value={post}
            onChange={(e) => setPost(e.target.value)}
            type="text"
            placeholder="Write something to your so called OnlyFriends"
          ></textarea>
          <button
            onClick={postHandler}
            className=" bg-transparent  font-extrabold text-indigo-600 absolute right-0 top-1/2 translate-x-[-50%] translate-y-[-50%]"
          >
            POST
          </button>
        </div>
        <div className="flex flex-col w-full relative items-center mb-20">
          <Posts refetch={postUpdated} />
        </div>
      </div>
      <div className="hidden lg:flex flex-col items-start  h-screen w-1/4 bg-slate-200">
        <h1 className="flex justify-center p-5 font-bold text-2xl  w-full text-slate-800">
          Filters
        </h1>
      </div>
    </div>
  );
};

export default Home;
