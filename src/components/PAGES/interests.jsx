import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Interest = [
  { id: 1, name: "Reading" },
  { id: 2, name: "Traveling" },
  { id: 3, name: "Cooking" },
  { id: 4, name: "Sports" },
  { id: 5, name: "Music" },
  { id: 6, name: "Movies" },
  { id: 7, name: "Gaming" },
  { id: 8, name: "Fitness" },
  { id: 9, name: "Art" },
  { id: 10, name: "Photography" },
  { id: 11, name: "Writing" },
  { id: 12, name: "Dancing" },
  { id: 13, name: "Gardening" },
  { id: 14, name: "Hiking" },
  { id: 15, name: "Cycling" },
  { id: 16, name: "Yoga" },
  { id: 17, name: "Meditation" },
  { id: 18, name: "Singing" },
  { id: 19, name: "Technology" },
  { id: 20, name: "Fashion" },
  { id: 21, name: "Pet" },
  { id: 22, name: "Nature" },
  { id: 23, name: "Science" },
  { id: 24, name: "History" },
  { id: 25, name: "Languages" },
  { id: 26, name: "Coffee" },
  { id: 27, name: "Tea" },
  { id: 28, name: "Camping" },
  { id: 29, name: "Coding" },
];

const Interests = () => {
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();

  const submitHandler = async () => {
    console.log("function called");
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/v1/profile/add-interests",
        {
          method: "POST",
          body: JSON.stringify({
            interests: selectedInterests,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/user");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleClick = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((interestId) => interestId !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center gap-10 flex-wrap m-5 md:m-20 py-20 relative">
        {Interest?.map((interest) => (
          <button
            key={interest.id}
            onClick={() => handleClick(interest.id)}
            className={`px-10 py-2 border-2  border-slate-300 rounded-xl ${
              selectedInterests.includes(interest.id)
                ? "bg-gray-400 text-white"
                : "bg-gray-200"
            }`}
          >
            {interest.name}
          </button>
        ))}
        <button
          type="submit"
          onClick={submitHandler}
          className="bg-purple-500 px-10 py-5 absolute right-0 bottom-0 border-2 border-gray-400 rounded-2xl hover:scale-110 text-white"
        >
          Continue to profile
        </button>
      </div>
    </>
  );
};

export default Interests;
