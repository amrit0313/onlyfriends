import { LuCamera } from "react-icons/lu";
import { FiEdit2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import download from "../../assets/download.png";
import ProfileEditModal from "./profileEditmodal";

const UserProfile = () => {
  const [user, setUser] = useState("");
  const token = localStorage.getItem("access_token");
  const [openEditModal, setOpenEditModal] = useState(false);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const [response1, response2] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/v1/auth/user_info`),
        fetch(`${import.meta.env.VITE_API_URL}/v1/profile`),
      ]);
      const result1 = response1.json();
      const result2 = response2.json();
      setUser(result1);
    };
    try {
      fetchUserInfo();
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }, []);

  const editHandler = () => {
    setOpenEditModal((prev) => !prev);
  };

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
                  src={user?.profile_pic ? profile.profile_pic : download}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
                <button
                  onClick={editHandler}
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-sm text-gray-600 hover:text-slate-500 transition-colors"
                >
                  <FiEdit2 size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.full_name}
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
      {openEditModal && <ProfileEditModal close={editHandler} />}
    </div>
  );
};

export default UserProfile;
