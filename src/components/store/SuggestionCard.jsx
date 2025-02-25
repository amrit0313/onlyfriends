import { LuHeart, LuMessageCircle, LuUserPlus } from "react-icons/lu";
import { MdNotInterested } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";

export const SuggestionCard = ({
  id,
  name,
  image,
  interests,
  matchPercentage,
  connection,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="relative group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl group-hover:animate-card-hover">
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-slate-500">
          {matchPercentage}% Match
        </div>
        <div className="aspect-[9/10] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
          <div className="mt-4 flex justify-between items-center">
            <button className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:text-slate-500 hover:bg-slate-100 transition-colors">
              <MdNotInterested size={20} />
            </button>
            <button
              onClick={handleLike}
              className={`inline-flex items-center justify-center rounded-full p-2 transition-all duration-300 ${
                isLiked
                  ? "text-rose-500 bg-rose-50 scale-110"
                  : "text-gray-500 hover:text-rose-500 hover:bg-rose-50"
              }`}
            >
              <LuHeart size={20} className={isLiked ? "fill-rose-500 " : ""} />
            </button>
            <button
              onClick={() => navigate(`/people/${name}`)}
              className="inline-flex items-center justify-center px-4 py-2 gap-3 rounded-full bg-slate-600 text-white hover:bg-black transition-colors "
            >
              <span>{connection}</span>
              <CiLocationArrow1 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
