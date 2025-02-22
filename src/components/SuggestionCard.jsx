import { LuHeart, LuMessageCircle, LuUserPlus } from "react-icons/lu";
import { MdNotInterested } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SuggestionCard = ({
  id,
  name,
  image,
  interests,
  matchPercentage,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleComment = (e) => {
    e.stopPropagation();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    setShowComments(!showComments);
  };

  const handleConnect = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="relative group cursor-pointer"
      onClick={() => navigate(`/people/${name}`)}
    >
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
            {interests?.map((interest, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-300/50 text-slate-600"
              >
                {interest.name}
              </span>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handleCommentClick}
              className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:text-slate-500 hover:bg-slate-100 transition-colors"
            >
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
              onClick={handleConnect}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-slate-600 text-white hover:bg-rose-600 transition-colors"
            >
              <LuUserPlus size={18} className="mr-1" />
              <span>Connect</span>
            </button>
          </div>

          {showComments && (
            <div
              className="mt-4 border-t pt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-40 overflow-y-auto space-y-2 mb-2">
                {comments.map((text, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-2 rounded-lg text-sm"
                  >
                    {text}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-1 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                  onKeyPress={(e) => e.key === "Enter" && handleComment(e)}
                />
                <button
                  onClick={handleComment}
                  className="px-3 py-1 bg-rose-500 text-white rounded-lg text-sm hover:bg-rose-600 transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
