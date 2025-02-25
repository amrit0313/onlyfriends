import { LuSearch as SearchIcon } from "react-icons/lu";
import { useState, useEffect } from "react";
import { SuggestionCard } from "../store/SuggestionCard";
import download from "../../assets/download.png";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const [data, setData] = useState([]);
  const token = localStorage.getItem("access_token");
  const user_id = localStorage.getItem("user_id");

  const allInterests = Array.from(
    new Set(
      data?.flatMap((user) => user.interests.flatMap((i) => i.split(",")))
    )
  );

  const filteredUsers = data?.filter((user) => {
    const matchesSearch = user.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const userInterests = user.interests.flatMap((i) => i.split(","));

    const matchesInterest = selectedInterest
      ? userInterests.some(
          (interest) =>
            interest.toLowerCase() === selectedInterest.toLowerCase()
        )
      : true;

    return matchesSearch && matchesInterest;
  });

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/v1/similarity/compute`,
          {
            method: "POST",
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
      } catch (error) {
        console.log(error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/v1/similarity/${user_id}`,
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
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    postData();
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
            {[
              ...new Map(
                (Array.isArray(filteredUsers) ? filteredUsers : []).map(
                  (user) => [user.user_id, user]
                )
              ).values(),
            ].map((user, index) => (
              <SuggestionCard
                key={index}
                id={user.user_id}
                name={user.username}
                image={getProfilePicUrl(user.profile_pic)}
                interests={user.interests}
                matchPercentage={user.similarity_score}
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
