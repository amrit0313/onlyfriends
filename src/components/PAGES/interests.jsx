import { useState } from "react";
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
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();

  const submitHandler = async () => {
    console.log("function called");
    console.log(selectedInterests.map((interest) => interest.name));
    try {
      const formData = new FormData();
      formData.append(
        "interests",
        selectedInterests.map((interest) => interest.name).join(",")
      );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/v1/profile/add-interests`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log(responseData);
      navigate("/user");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleClick = (interest) => {
    setSelectedInterests((prev) =>
      prev.some((selected) => selected.id === interest.id)
        ? prev.filter((selected) => selected.id !== interest.id)
        : [...prev, interest]
    );
  };

  return (
    <>
      <div className="flex items-center gap-10 m-5 md:m-20 pt-5 pb-32 relative">
        <div className="flex justify-evenly flex-wrap gap-5 pb-20">
          {Interest?.map((interest) => (
            <button
              key={interest.id}
              onClick={() => handleClick(interest)}
              className={`w-32 py-2 border-2 border-slate-300 rounded-xl ${
                selectedInterests.some(
                  (selected) => selected.id === interest.id
                )
                  ? "bg-gray-400 text-white"
                  : "bg-gray-200"
              }`}
            >
              {interest.name}
            </button>
          ))}
        </div>
        <button
          type="submit"
          onClick={submitHandler}
          className="bg-black shadow-xl shadow-slate-300 px-10 py-5 absolute right-0 bottom-14 lg:bottom-0 border-2 border-gray-700 rounded-2xl hover:bg-gray-800 active:animate-bounce active:bg-black text-white"
        >
          Continue to profile
        </button>
      </div>
    </>
  );
};

export default Interests;
