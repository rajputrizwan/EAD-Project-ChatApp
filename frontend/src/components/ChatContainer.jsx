import { useEffect } from "react";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import { useChatStore } from "../store/useChatStore.js";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";

function ChatContainer() {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser?._id);
  }, [selectedUser._id, getMessages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-y-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <ChatHeader />

      <p>message....</p>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
