import React, { useState, useEffect } from "react";
import { db } from "../../firebaseconfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { CiLocationArrow1 } from "react-icons/ci";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { BsEmojiSmile } from "react-icons/bs";

export default function ChatApp() {
  const [users, setUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const currentUserId = localStorage.getItem("user_id");

  // Fetch users (friends) list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/v1/friends/friends`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Fetch messages for active chat
  useEffect(() => {
    if (activeChat) {
      const messagesRef = collection(db, "chats", activeChat, "messages");
      const q = query(messagesRef, orderBy("timestamp"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            timestamp: data.timestamp?.toDate(),
          };
        });
        setMessages(msgs);
      });

      return () => unsubscribe();
    }
  }, [activeChat]);

  // Generate chat ID between two users
  const getChatId = (userId) => {
    const ids = [currentUserId, userId].sort();
    return `${ids[0]}_${ids[1]}`;
  };

  // Send a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    try {
      const messagesRef = collection(db, "chats", activeChat, "messages");
      await addDoc(messagesRef, {
        text: newMessage,
        sender: currentUserId,
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Add emoji to message input
  const addEmoji = (emoji) => {
    setNewMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false); // Hide picker after selecting an emoji
  };

  const getProfilePicUrl = (path) => {
    return `${import.meta.env.VITE_API_URL}/${path}`;
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-slate-100 to-slate-300 pb-20 md:pb-0">
      {/* Users List */}
      <div className="hidden md:block w-1/4 p-4 bg-white shadow-md overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        {users.length === 0 ? (
          <p>Loading users...</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className={`flex justify-start items-center gap-2 p-3 border-b-2 border-gray-200 mb-1 cursor-pointer font-medium pl-10 ${
                activeChat === getChatId(user.user_id)
                  ? "bg-slate-200"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveChat(getChatId(user.user_id))}
            >
              <img
                className="rounded-full h-[2rem] aspect-square m-2"
                src={
                  user?.profile_pic
                    ? getProfilePicUrl(user.profile_pic)
                    : "/default-avatar.png"
                }
                alt="Profile"
              />
              <p>{user.username}</p>
            </div>
          ))
        )}
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <div className="flex flex-col h-full p-4">
            {/* Messages */}
            <div className="flex flex-col flex-1 overflow-auto bg-white p-2 shadow-lg shadow-slate-900">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`my-1 px-10 py-3 font-normal font-serif text-purple-950 rounded-lg w-fit max-w-[20rem] ${
                    msg.sender === currentUserId
                      ? "bg-rose-200/50 mr-5 self-end"
                      : "bg-blue-100/50 ml-5 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Message Input & Emoji Picker */}
            <form
              onSubmit={sendMessage}
              className="p-2 flex gap-2 bg-white shadow-md relative"
            >
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                <BsEmojiSmile size={25} />
              </button>

              <input
                type="text"
                className="flex-1 p-2 border rounded-lg"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />

              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <CiLocationArrow1 size={25} style={{ strokeWidth: "1.2" }} />
              </button>

              {showEmojiPicker && (
                <div className="absolute bottom-12 left-2 z-10">
                  <Picker data={data} onEmojiSelect={addEmoji} />
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
