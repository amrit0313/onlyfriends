import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebaseconfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  getDocs,
  where,
  writeBatch,
  limit,
} from "firebase/firestore";
import { CiLocationArrow1 } from "react-icons/ci";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { BsEmojiSmile } from "react-icons/bs";
import download from "../../assets/download.png";
import { useLocation } from "react-router-dom";
import MessageSkeleton from "../store/messageskeleton";
import { MdDelete } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

export default function ChatApp() {
  const location = useLocation();
  const stateData = location.state?.userId;
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const currentUserId = localStorage.getItem("user_id");
  const [messagesLoading, setMessagesLoading] = useState(true);
  const messageEndRef = useRef(null);
  const [lastMessages, setLastMessages] = useState({});
  const [lastRead, setLastRead] = useState({});

  const getChatId = (userId) => {
    const ids = [currentUserId, userId].sort();
    return `${ids[0]}_${ids[1]}`;
  };

  const [activeChat, setActiveChat] = useState(
    stateData ? getChatId(stateData) : null
  );

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
        setUsers(() => data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const unsubscribes = users.map((user) => {
      const chatId = getChatId(user.user_id);
      const messagesRef = collection(db, "chats", chatId, "messages");
      const q = query(messagesRef, orderBy("timestamp", "desc"), limit(1));
      return onSnapshot(q, (snapshot) => {
        const lastMsg = snapshot.docs[0]?.data();
        setLastMessages((prev) => ({
          ...prev,
          [chatId]: lastMsg
            ? { ...lastMsg, timestamp: lastMsg.timestamp?.toDate() }
            : null,
        }));
      });
    });

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [users]);

  useEffect(() => {
    if (activeChat) {
      setMessagesLoading(true);

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
        setMessagesLoading(false);
      });

      return () => unsubscribe();
    }
  }, [activeChat]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

  const deleteMessages = async () => {
    if (!activeChat) return;

    try {
      const messagesRef = collection(db, "chats", activeChat, "messages");
      const q = query(messagesRef, where("sender", "==", currentUserId));
      const querySnapshot = await getDocs(q);

      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };

  const addEmoji = (emoji) => {
    setNewMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const getProfilePicUrl = (path) => {
    return `${import.meta.env.VITE_API_URL}/${path}`;
  };

  return (
    <div className="flex h-screen bg-white pb-14 md:pb-0">
      <div className="hidden md:block w-1/4 p-4 bg-white shadow-lg shadow-slate-800 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        {users.length === 0 ? (
          <p>Loading users...</p>
        ) : (
          users
            .sort((a, b) => {
              const lastMsgA = lastMessages[getChatId(a.user_id)];
              const lastMsgB = lastMessages[getChatId(b.user_id)];
              const timeA = lastMsgA?.timestamp?.getTime() || 0;
              const timeB = lastMsgB?.timestamp?.getTime() || 0;
              return timeB - timeA; // Most recent first
            })
            .map((user, index) => {
              const chatId = getChatId(user.user_id);
              const hasNewMessage =
                lastMessages[chatId]?.timestamp?.getTime() >
                (lastRead[chatId] || 0);
              return (
                <div
                  key={index}
                  className={`flex justify-start items-center gap-2 p-3 border-b-2 border-gray-200 mb-1 cursor-pointer font-medium pl-10 ${
                    activeChat === chatId ? "bg-slate-200" : "hover:bg-gray-200"
                  } ${hasNewMessage ? "font-bold" : ""}`}
                  onClick={() => {
                    setActiveChat(chatId);
                    const lastMsg = lastMessages[chatId];
                    if (lastMsg) {
                      setLastRead((prev) => ({
                        ...prev,
                        [chatId]: lastMsg.timestamp.getTime(),
                      }));
                    }
                  }}
                >
                  <img
                    className="rounded-full h-[2rem] aspect-square m-2"
                    src={
                      user?.profile_pic
                        ? getProfilePicUrl(user.profile_pic)
                        : download
                    }
                    alt="Profile"
                  />
                  <p>{user.username}</p>
                </div>
              );
            })
        )}
      </div>

      <div className="hidden md:flex  flex-1 flex-col m-4">
        {activeChat ? (
          <div className="flex flex-col h-full ">
            <div className="flex flex-col flex-1 overflow-auto bg-slate-200  ">
              <div className="flex mb-2 bg-purple-100 shadow-lg shadow-slate-300 sticky top-0 z-10">
                {users.map(
                  (user, index) =>
                    activeChat === getChatId(user.user_id) && (
                      <div className="flex justify-between px-5 py-3 w-full">
                        <div className="flex  items-center gap-3" key={index}>
                          <img
                            key={index}
                            className="rounded-full h-[2rem] aspect-square m-2"
                            src={
                              user?.profile_pic
                                ? getProfilePicUrl(user.profile_pic)
                                : download
                            }
                            alt="Profile"
                          />
                          <p className="font-extrabold">{user.fullname}</p>
                        </div>

                        <button onClick={deleteMessages}>
                          <MdDelete size={25} style={{ fill: "#ec407a" }} />
                        </button>
                      </div>
                    )
                )}
              </div>
              {messagesLoading ? (
                <MessageSkeleton times={8} />
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`my-1 px-10 py-3  font-serif text-black font-bold rounded-lg w-fit max-w-[20rem] ${
                        msg.sender === currentUserId
                          ? "bg-purple-500/20 mr-5 self-end"
                          : "bg-gray-100 ml-5 self-start"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </>
              )}
            </div>

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
      {!activeChat && (
        <div className="block mx-auto my-5  md:hidden w-11/12  p-4 bg-stone-100 shadow-lg shadow-slate-500 rounded-lg overflow-auto">
          <h2 className="text-lg font-semibold mb-4">Chats</h2>
          {users.length === 0 ? (
            <p>Loading users...</p>
          ) : (
            users
              .sort((a, b) => {
                const lastMessageA = messages
                  .filter(() => getChatId(a.user_id) === activeChat)
                  .sort((x, y) => y.timestamp - x.timestamp)[0];
                const lastMessageB = messages
                  .filter(() => getChatId(b.user_id) === activeChat)
                  .sort((x, y) => y.timestamp - x.timestamp)[0];
                return (
                  (lastMessageB?.timestamp || 0) -
                  (lastMessageA?.timestamp || 0)
                );
              })
              .map((user, index) => (
                <div
                  key={index}
                  className={`flex justify-start items-center gap-2 p-3 border-b-2 border-gray-200 mb-1 cursor-pointer font-medium pl-10 ${
                    activeChat === getChatId(user.user_id)
                      ? "bg-slate-200"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => {
                    setActiveChat(getChatId(user.user_id));
                  }}
                >
                  <img
                    className="rounded-full h-[2rem] aspect-square m-2"
                    src={
                      user?.profile_pic
                        ? getProfilePicUrl(user.profile_pic)
                        : download
                    }
                    alt="Profile"
                  />
                  <p>{user.username}</p>
                </div>
              ))
          )}
        </div>
      )}
      {activeChat && (
        <div className="flex-1 flex md:hidden flex-col m-4">
          {activeChat ? (
            <div className="flex flex-col h-full ">
              <div className="flex flex-col flex-1 overflow-auto bg-slate-200  ">
                <div className="flex mb-2 bg-purple-100 shadow-lg shadow-slate-300 sticky top-0 z-10">
                  {users.map(
                    (user, index) =>
                      activeChat === getChatId(user.user_id) && (
                        <div
                          className="flex justify-between px-5 py-3 w-full"
                          key={index}
                        >
                          <div className="flex  items-center gap-3">
                            <button
                              className="w-10"
                              onClick={() => setActiveChat(null)}
                            >
                              <IoIosArrowBack size={28} />
                            </button>
                            <img
                              className="rounded-full h-[2rem] aspect-square m-2"
                              src={
                                user?.profile_pic
                                  ? getProfilePicUrl(user.profile_pic)
                                  : download
                              }
                              alt="Profile"
                            />
                            <p className=" font-extrabold">{user.fullname}</p>
                          </div>

                          <button onClick={deleteMessages}>
                            <MdDelete size={25} style={{ fill: "purple" }} />
                          </button>
                        </div>
                      )
                  )}
                </div>
                {messagesLoading ? (
                  <MessageSkeleton times={8} />
                ) : (
                  <>
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`my-1 px-10 py-3 font-normal font-serif text-purple-950 rounded-lg w-fit max-w-[20rem] ${
                          msg.sender === currentUserId
                            ? "bg-rose-200/50 mr-5 self-end"
                            : "bg-gray-100 ml-5 self-start"
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                    <div ref={messageEndRef} />
                  </>
                )}
              </div>

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
      )}
    </div>
  );
}
