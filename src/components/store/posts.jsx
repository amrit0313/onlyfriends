import { useEffect, useState } from "react";
import { LuHeart } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

const Posts = ({ refetch }) => {
  const token = localStorage.getItem("access_token");
  const current_user = localStorage.getItem("username");
  const [data, setData] = useState([]);
  const [votedPosts, setVotedPosts] = useState([]);
  const [update, setUpdate] = useState(false);

  const handleLike = async (id) => {
    await sendVoteRequest(id);
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
      setUpdate((prev) => !prev);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/v1/posts/?post_id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        toast(errorData.detail);
        throw new Error("error occurred");
      }
      toast.warn("Post Deleted");
      setUpdate((prev) => !prev);
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
  }, [refetch, update]);

  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-center  gap-10 mx-5 px-10 py-5  text-slate-800 mb-10  w-4/5 z-[1] border-b-2 border-indigo-300/50"
        >
          <div className="flex items-center justify-between">
            <p className="font-extrabold">{item.content}</p>
            {current_user == item.author_username && (
              <button onClick={() => handleDelete(item.id)}>
                <MdOutlineDelete size={25} style={{ color: " purple" }} />
              </button>
            )}
          </div>
          <div className="flex items-center justify-between  ">
            <div className="flex  items-center justify-start">
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
              <p className="ml-4 sm:ml-10">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>

            <p className="font-bold md:font-extrabold">
              ~By
              <span className="text-slate-600">{` ${item.author_username}`}</span>
            </p>
          </div>
        </div>
      ))}
      <ToastContainer />
    </>
  );
};

export default Posts;
