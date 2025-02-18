import { ChatMessages } from "../chat/chatMessages";
import { ChatSidebar } from "../chat/chatSidebar";

const Chat = () => {
  return (
    <div className="bg-gradient-to-l from-indigo-200 h-full w-full">
      <ChatSidebar />
      <ChatMessages />
    </div>
  );
};

export default Chat;
