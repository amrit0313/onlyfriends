import { LuCamera } from "react-icons/lu";
import { FiEdit2 } from "react-icons/fi";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/v1/auth/user_info",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error("error occurred", errorData);
        }
        const responseData = await response.json();
        setUser(responseData);
      } catch (error) {
        console.log(errorData);
        console.log(error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 bg-gradient-to-l from-indigo-200/50">
      <main className=" pb-16 md:pb-0">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-48 bg-slate-500">
              <button className="absolute bottom-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
                <LuCamera size={20} />
              </button>
            </div>
            <div className="relative px-6 pb-6">
              <div className="relative -mt-16 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-sm text-gray-600 hover:text-slate-500 transition-colors">
                  <FiEdit2 size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.fullname}
                  </h1>
                  <p className="text-gray-500">New York, USA</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-900">
                      246
                    </div>
                    <div className="text-sm text-gray-500">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-900">
                      52
                    </div>
                    <div className="text-sm text-gray-500">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-900">
                      28
                    </div>
                    <div className="text-sm text-gray-500">Messages</div>
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">
                    Interests
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {["Photography", "Travel", "Art", "Music", "Fashion"].map(
                      (interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1 rounded-full text-sm bg-slate-300/50 text-slate-600"
                        >
                          {interest}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">About</h2>
                  <p className="text-gray-600">
                    Professional photographer and digital artist based in New
                    York. Love capturing moments and creating beautiful visual
                    stories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
