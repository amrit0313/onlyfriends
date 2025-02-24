import { LuSearch as SearchIcon } from "react-icons/lu";
import { useState, useEffect } from "react";
import { RequestCard } from "../store/friendreqs";
const allUsers = [];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const [data, setData] = useState([]);
  const token = localStorage.getItem("access_token");
  const user_id = localStorage.getItem("user_id");

  const filteredUsers = allUsers?.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesInterest = selectedInterest
      ? user.interests.some(
          (interest) =>
            interest.name.toLowerCase() === selectedInterest.toLowerCase()
        )
      : true;
    return matchesSearch && matchesInterest;
  });

  const allInterests = Array.from(
    new Set(allUsers.flatMap((user) => user.interests.map((i) => i.name)))
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/v1/friends/requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          console.log("Error:", errorText);
          throw new Error("Error fetching posts");
        }
        const responseData = await response.json();
        setData(responseData.received_requests);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getProfilePicUrl = (path) => {
    return `${import.meta.env.VITE_API_URL}/${path}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-indigo-200/50 overflow-scroll">
      <main className=" pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Search Friends</h2>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedInterest}
                onChange={(e) => setSelectedInterest(e.target.value)}
                className="px-4 py-2 bg-gradient-to-bl from-indigo-200/50 to-white  rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent"
              >
                <option value="">All Interests</option>
                {allInterests.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(Array.isArray(data) ? data : []).map((user, index) => (
              <RequestCard
                key={index}
                id={user.request.sender_id}
                name={user.sender_username}
                image={getProfilePicUrl(user.sender_profile_pic)}
                matchPercentage=""
                connection="Visit Profile"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
