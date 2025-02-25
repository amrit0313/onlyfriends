import { LuHeart, LuMessageCircle, LuUserPlus } from "react-icons/lu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import { MdNotInterested } from "react-icons/md";
import { BiUserPlus } from "react-icons/bi";

export const RequestCard = ({ id, name, image, matchPercentage }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const handleRequest = async (action, id) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/v1/friends/request/${id}?action=${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = response.json();
        console.log(errorData);
        throw new error("Error occurred");
      }
      const responseData = response.json();
      console.log(responseData);

      if (response.status === 204) {
        return;
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="relative group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl group-hover:animate-card-hover">
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-slate-500">
          {matchPercentage}% Match
        </div>
        <div
          onClick={() => navigate(`/people/${name}`)}
          className="aspect-[9/10] overflow-hidden"
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {/* {interests[0]?.split(",")?.map((interest, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-300/50 text-slate-600"
              >
                {interest}
              </span>
            ))} */}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => handleRequest("reject", id)}
              className="inline-flex items-center justify-center px-4 py-2 gap-3 rounded-full bg-slate-900 text-white hover:bg-slate-500 transition-colors "
            >
              <MdNotInterested />
              <span>Delete request</span>
            </button>
            <button
              onClick={() => handleRequest("accept", id)}
              className="inline-flex items-center justify-center px-4 py-2 gap-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white  transition-colors "
            >
              <BiUserPlus />
              <span>Accept Request</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
