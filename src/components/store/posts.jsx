import { useEffect, useState } from "react";
import { LuHeart } from "react-icons/lu";

const Posts = ({ refetch }) => {
  const [likedPosts, setLikedPosts] = useState({});
  const token = localStorage.getItem("access_token");
  const current_user = localStorage.getItem("username");
  const [data, setData] = useState([]);
  const [likesUpdated, setLikesUpdated] = useState(false);
  const [votedPosts, setVotedPosts] = useState([]);

  const handleLike = async (id) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[id];
      sendVoteRequest(id, isLiked);
      return { ...prev, [id]: isLiked };
    });
  };

  const sendVoteRequest = async (id) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/v1/posts/vote?post_id=${id}&=${current_user}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLikesUpdated((prev) => !prev);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          `${import.meta.env.VITE_API_URL}/v1/posts/feed`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response1.ok) {
          const errorText = await response1.text();
          console.log("Error:", errorText);
          throw new Error("Error fetching posts feed");
        }
        const responseData = await response1.json();
        setData(responseData);
      } catch (error) {
        console.log(error);
      }

      try {
        const response2 = await fetch(
          `${import.meta.env.VITE_API_URL}/v1/posts/voted`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response2.ok) {
          const errorText = await response2.text();
          console.log("Error:", errorText);
          throw new Error("Error fetching voted posts");
        }
        const result2 = await response2.json();
        setVotedPosts(result2);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refetch, likedPosts]);

  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col mx-5 px-10 py-20 text-slate-800 mb-10 relative w-4/5 z-[1] border-b-2 border-indigo-300/50"
        >
          <p className="font-extrabold">{item.content}</p>
          <div className="absolute bottom-3 left-10 text-slate-600">
            <div className="flex item-center gap-2">
              <div className="flex items-center">
                <button
                  onClick={() => handleLike(item.id)}
                  className={`inline-flex item-center justify-center rounded-full p-2 transition-all duration-300 ${
                    votedPosts.some((vote) => vote.id === item.id)
                      ? "bg-rose-50"
                      : "text-gray-500 hover:bg-slate-200 hover:scale-x-110 hover:text-slate-400"
                  }`}
                >
                  <LuHeart
                    size={25}
                    className={
                      votedPosts.some((vote) => vote.id === item.id)
                        ? "fill-blue-900"
                        : ""
                    }
                  />
                </button>
                <p>{item?.votes_count}</p>
              </div>
              <p className="relative left-10 bottom-0 translate-y-3">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="absolute bottom-3 right-3 md:font-extrabold">
            ~By
            <span className="text-slate-600">{` ${item.author_username}`}</span>
          </p>
        </div>
      ))}
    </>
  );
};

export default Posts;
