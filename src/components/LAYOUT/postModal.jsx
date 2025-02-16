import { useState } from "react";
import Modal from "./modal";
const PostModal = ({ close }) => {
  const [post, setPost] = useState("");

  const postHandler = async (e) => {
    e.preventDefault();
    if (!post) {
      return;
    }
    console.log(token);
    console.log(post);
    try {
      const response = await fetch("http://127.0.0.1:8000/v1/posts", {
        method: "POST",
        body: JSON.stringify({
          content: post,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error:", errorData);
        throw new Error("Error");
      }
      const responseData = await response.json();
      console.log("response", responseData);
      setPost("");
      setPostsUpdated((prev) => !prev);
    } catch (error) {
      console.log(errorData);
      console.log(error);
    }
  };

  return (
    <Modal
      className="flex justify-center items-center absolute translate-x-[30%] rounded-xl shadow-2xl shadow-slate-800 top-[35%] bg-slate-400/90 w-6/12 h-10/12 sm:h-1/4  z-[110] "
      onClose={close}
    >
      <input
        className="  h-32 w-3/4 px-10 py-4  border-2 border-slate-500 rounded-3xl "
        value={post}
        onChange={(e) => setPost(e.target.value)}
        type="text"
        placeholder="Write something to your so called OnlyFriends"
      />
      <button
        onClick={postHandler}
        className="bg-transparent absolute bottom-12 right-[8rem] font-extrabold text-indigo-600 pl-4"
      >
        POST
      </button>
    </Modal>
  );
};

export default PostModal;
