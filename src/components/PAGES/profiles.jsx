import React from "react";
import { useParams } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

const mockUsers = {
  1: {
    name: "Sarah Parker",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    coverImage: "https://images.unsplash.com/photo-1504805572947-34fad45aed93",
    connections: 246,
    likes: 52,
    messages: 28,
    interests: ["Photography", "Travel", "Art", "Music", "Fashion"],
    about:
      "Professional photographer and digital artist based in New York. Love capturing moments and creating beautiful visual stories.",
  },
  2: {
    name: "Michael Chen",
    location: "San Francisco, USA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    coverImage: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e",
    connections: 189,
    likes: 43,
    messages: 15,
    interests: ["Music", "Gaming", "Tech"],
    about:
      "Software engineer by day, musician by night. Always exploring new technologies and creating music.",
  },
};

const Profile = () => {
  const { userId } = useParams();
  const user = mockUsers[userId];

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-l from-indigo-200/50">
      <main className=" pb-16 md:pb-0">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-48">
              <img
                src={user.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative px-6 pb-6">
              <div className="relative -mt-16 mb-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {user.name}
                    </h1>
                    <p className="text-gray-500">{user.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors">
                      <FaUserPlus size={18} className="mr-1" />
                      <span>Connect</span>
                    </button>
                    <button className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                      <FiMessageCircle size={18} className="mr-1" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-900">
                      {user.connections}
                    </div>
                    <div className="text-sm text-gray-500">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-900">
                      {user.likes}
                    </div>
                    <div className="text-sm text-gray-500">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-900">
                      {user.messages}
                    </div>
                    <div className="text-sm text-gray-500">Messages</div>
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">
                    Interests
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-rose-50 text-rose-500"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">About</h2>
                  <p className="text-gray-600">{user.about}</p>
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
