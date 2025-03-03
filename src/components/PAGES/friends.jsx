import { LuSearch as SearchIcon } from "react-icons/lu";
import { useState, useEffect } from "react";
import { RequestCard } from "../store/friendreqs";
import { ToastContainer, toast } from "react-toastify";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const [data, setData] = useState([]);
  const token = localStorage.getItem("access_token");
  const [render, setRender] = useState(false);
  const [requestType, setRequestType] = useState("received");

  const filteredFriends = data?.filter((user) => {
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
  const allInterests = Array.from(
    new Set(
      data?.flatMap((user) => user.interests.flatMap((i) => i.split(",")))
    )
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
        if (requestType === "received") {
          setData(responseData.received_requests);
        } else if (requestType === "sent") {
          setData(responseData.sent_requests);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [render, requestType]);

  const getElements = (action) => {
    if (action === "accept") {
      toast("You are now friends");
    } else if (action === "reject") {
      toast("Request Rejected");
    } else if (action == "unsend") {
      toast.success("Friend request unsent");
    } else {
      toast("error occurred");
    }
    setRender((prev) => !prev);
  };

  const getProfilePicUrl = (path) => {
    return `${import.meta.env.VITE_API_URL}/${path}`;
  };

  return (
    <>
      {token ? (
        <div className="min-h-screen bg-gradient-to-l from-indigo-200/50 overflow-scroll">
          <main className=" pb-16 md:pb-0">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Friends
                </h2>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex flex-1 flex-col gap-4">
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
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="px-4 py-2 bg-gradient-to-bl from-indigo-200/50 to-white  rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent"
                  >
                    <option value="received">Received Requests</option>
                    <option value="sent">Sent Requests</option>
                  </select>
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
                {filteredFriends?.map((user, index) => (
                  <RequestCard
                    key={index}
                    id={user.request_id}
                    requestType={requestType}
                    name={user.username}
                    image={getProfilePicUrl(user.profile_pic)}
                    interests={user.interests}
                    status={user.request.status}
                    matchPercentage=""
                    getElements={getElements}
                    request={user.request}
                  />
                ))}

                {!filteredFriends[0] && (
                  <div className="no-requests  mx-auto p-5 text-center md:font-mono text-2xl text-slate-600 ">
                    No Requests Pending
                  </div>
                )}
              </div>
            </div>
          </main>
          <ToastContainer />
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center font-extrabold text-slate-600 font-mono ">
          <h1>Login to surf</h1>
        </div>
      )}
    </>
  );
};

export default Search;
