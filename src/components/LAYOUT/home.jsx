import { NavLink, useNavigate } from "react-router-dom";
import { PiSignOutFill } from "react-icons/pi";
import { useState } from "react";
import Posts from "../store/posts";
import PostModal from "./postModal";
const Home = () => {
  const navigate = useNavigate();
  const randomNumber = Math.floor(Math.random() * 100);
  const [post, setPost] = useState("");
  const token = localStorage.getItem("access_token");
  const [postUpdated, setPostsUpdated] = useState(false);
  const [isModelOpen, SetIsModalOpen] = useState(false);
  const postHandler = async (e) => {
    e.preventDefault();
    if (!post) {
      return;
    }
    console.log(token);
    console.log(post);
    try {
      const response = await fetch("http://127.0.0.1:8000/v1/posts", {
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
      console.log("response", responseData);
      setPost("");
      setPostsUpdated((prev) => !prev);
    } catch (error) {
      console.log(errorData);
      console.log(error);
    }
  };
  const modalOpenHandler = () => {
    SetIsModalOpen((prev) => !prev);
  };

  return (
    <div className=" flex">
      <div className="flex flex-col   gap-10   w-full lg:w-3/4 h-screen  overflow-scroll scrollbar-thumb-green-500 scrollbar-track-green-200 relative">
        <div className="flex  items-center justify-center md:h-[7rem] md:w-[7rem] h-[5rem] w-[5rem] bg-white m-2 ml-10 border-2 rounded-full border-slate-500 ">
          <button
            className="flex justify-center items-center"
            onClick={() => navigate("/user")}
          >
            <img
              className="rounded-full md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] m-2 "
              src={`https://picsum.photos/seed/${randomNumber}/200/300`}
              alt="image is displaying...."
            />
          </button>
        </div>
        <div className="  absolute sm:w-3/5 ml-5 w-11/12 right-5 sm:right-24 top-24 sm:top-10 z-[100]">
          <input
            className="w-full px-10 py-4  border-2 border-slate-500 rounded-3xl "
            onFocus={modalOpenHandler}
            value={post}
            onChange={(e) => setPost(e.target.value)}
            type="text"
            placeholder="Write something to your so called OnlyFriends"
          />
          <button
            onClick={postHandler}
            className="bg-transparent absolute top-5 right-5 font-extrabold text-indigo-600 pl-4"
          >
            POST
          </button>
          {isModelOpen && <PostModal close={modalOpenHandler} />}
        </div>
        <div className="flex flex-col relative items-center mb-20">
          <Posts refetch={postUpdated} />
        </div>
        <div className="lg:hidden z-10 absolute top-4 right-10">
          <NavLink to="/auth">
            <PiSignOutFill size={30} />
          </NavLink>
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
