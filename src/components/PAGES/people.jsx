import { LuSearch as SearchIcon } from "react-icons/lu";
import { useState } from "react";
import { SuggestionCard } from "../../components/SuggestionCard";

// Mock data for demonstration
const allUsers = [
  {
    id: 1,
    name: "Sarah Parker",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    interests: [
      { id: 1, name: "Photography" },
      { id: 2, name: "Travel" },
      { id: 3, name: "Art" },
    ],
    matchPercentage: 95,
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    interests: [
      { id: 4, name: "Music" },
      { id: 5, name: "Gaming" },
      { id: 6, name: "Tech" },
    ],
    matchPercentage: 88,
  },
  // ... Add more mock users
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");

  const filteredUsers = allUsers.filter((user) => {
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
            {filteredUsers.map((user) => (
              <SuggestionCard
                key={user.id}
                id={user.id}
                name={user.name}
                image={user.image}
                interests={user.interests}
                matchPercentage={user.matchPercentage}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
