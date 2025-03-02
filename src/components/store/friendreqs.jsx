import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdNotInterested } from "react-icons/md";
import { BiUserPlus } from "react-icons/bi";

export const RequestCard = ({
  id,
  requestType,
  name,
  image,
  status,
  interests,
  matchPercentage,
  getElements,
  request,
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const receiver_id = request.receiver_id;

  const handleRequest = async (e, action, activeId) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/v1/friends/request/${activeId}?action=${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("Error occurred");
      }
      const responseData = await response.json();
      getElements(action);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleUnsend = async (e, action, receiver_id) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/v1/friends/request/unsend/${receiver_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("Error occurred");
      }
      const responseData = await response.json();
      getElements(action);
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
          onClick={() =>
            navigate(`/friends/${name}`, {
              state: { stat: status, id: id, requestType: requestType },
            })
          }
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
            {interests[0]?.split(",")?.map((interest, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-300/50 text-slate-600"
              >
                {interest}
              </span>
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-3 items-center">
            {requestType == "received" && (
              <button
                onClick={(e) => handleRequest(e, "reject", id)}
                className="inline-flex items-center justify-center px-4 py-2 gap-3 rounded-full bg-slate-900 text-white hover:bg-slate-500 transition-colors "
              >
                <MdNotInterested />
                <span>Delete </span>
              </button>
            )}
            {requestType == "sent" && (
              <button
                onClick={(e) => handleUnsend(e, "unsend", receiver_id)}
                className="inline-flex items-center justify-center px-4 py-2 gap-3 rounded-full bg-slate-700 text-white hover:bg-slate-800 active:animate-bounce active:bg-slate-950 transition-colors "
              >
                <MdNotInterested />
                <span>unsend request </span>
              </button>
            )}

            {requestType == "received" && (
              <button
                onClick={(e) => handleRequest(e, "accept", id)}
                className="inline-flex items-center justify-center px-4 py-2 gap-3 rounded-full bg-rose-500 hover:bg-rose-600 active:bg-white  text-white  transition-colors "
              >
                <BiUserPlus />
                <span>Accept</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
