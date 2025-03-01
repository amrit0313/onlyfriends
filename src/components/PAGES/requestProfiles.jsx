import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { BiUserPlus } from "react-icons/bi";
import { FiMessageCircle } from "react-icons/fi";
import download from "../../assets/download.png";
import cover from "../../assets/coverImage.svg";
import { ToastContainer, toast } from "react-toastify";
import { MdNotInterested } from "react-icons/md";

const RequestProfile = () => {
  const location = useLocation();
  const id = location.state?.id;
  const status = location.state?.stat;
  const { username } = useParams();
  const [user, setuser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [update, setupdate] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/v1/profile/user/${username}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          throw new Error("error occurred");
        }
        const responseData = await response.json();
        setuser(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [username, update]);
  const handleRequest = async (e, action, activeId) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/v1/friends/request/${activeId}?action=${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("Error occurred");
      }
      const responseData = await response.json();
      getElements(action);
      setupdate((prev) => !prev);
    } catch (error) {
      console.log("Error:", error);
    }
    return;
  };

  if (!user) {
    return <div>user? not found</div>;
  }

  const getProfilePicUrl = (path) => {
    return `${import.meta.env.VITE_API_URL}/${path}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-indigo-200/50">
      <main className=" pb-16 md:pb-0">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-48">
              <img
                src={cover}
                alt={username}
                className="w-full rounded-xl border-4 border-white object-cover"
              />
            </div>
            <div className="relative px-6 pb-6">
              <div className="relative -mt-16 mb-4">
                <img
                  src={
                    user?.profile_pic
                      ? getProfilePicUrl(user.profile_pic)
                      : download
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {username}
                    </h1>
                    <p className="text-gray-500">{user?.location}</p>
                  </div>
                  <div className="flex gap-2 ">
                    {status === "accepted" ? (
                      <button className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gray-400 text-white  transition-colors">
                        <LiaUserFriendsSolid size={18} className="mr-1" />
                        <span>{connectedStatus}</span>
                      </button>
                    ) : (
                      <div className="mt-4 flex justify-evenly items-center gap-2">
                        <button
                          onClick={(e) => handleRequest(e, "reject", id)}
                          className="inline-flex items-center justify-center px-4 py-2 gap-3 rounded-full bg-slate-900 text-white hover:bg-slate-500 transition-colors "
                        >
                          <MdNotInterested />
                          <span>Delete </span>
                        </button>
                        <button
                          onClick={(e) => handleRequest(e, "accept", id)}
                          className="inline-flex items-center justify-center px-4 py-2 gap-3 rounded-full bg-rose-500 hover:bg-rose-600 active:bg-white  text-white  transition-colors "
                        >
                          <BiUserPlus />
                          <span>Accept</span>
                        </button>
                      </div>
                    )}

                    {status == "accepted" && (
                      <button
                        onClick={() =>
                          connectedStatus
                            ? toast.warn("you are not friends")
                            : navigate("/chat", {
                                state: { userId: user?.user_id },
                              })
                        }
                        className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <FiMessageCircle size={18} className="mr-1" />
                        <span>Message</span>
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">
                    Interests
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {user.interests &&
                      user.interests[0].split(",").map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1 rounded-full text-sm bg-slate-300/50 text-slate-600"
                        >
                          {interest}
                        </span>
                      ))}
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">About</h2>
                  <p className="text-gray-600">{user?.bio}</p>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </main>
    </div>
  );
};

export default RequestProfile;
