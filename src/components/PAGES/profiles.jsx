import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiUserPlus } from "react-icons/bi";
import { FiMessageCircle } from "react-icons/fi";
import download from "../../assets/download.png";
import cover from "../../assets/coverImage.svg";

const Profile = () => {
  const { username } = useParams();
  const [user, setuser] = useState({});
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
  }, [username]);

  if (!user) {
    return <div>user? not found</div>;
  }
  const handleConnect = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/v1/friends/send`,
        {
          method: "POST",
          body: JSON.stringify({
            sender_id: localStorage.getItem("user_id"),
            receiver_id: user?.user_id,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("error occurred");
      }
      const responseData = response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

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
                  <div className="flex gap-2">
                    <button
                      onClick={handleConnect}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                    >
                      <BiUserPlus size={18} className="mr-1" />
                      <span>Connect</span>
                    </button>
                    <button className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                      <FiMessageCircle size={18} className="mr-1" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">About</h2>
                  <p className="text-gray-600">{user?.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
