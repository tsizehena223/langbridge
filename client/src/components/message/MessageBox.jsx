import ChatIllustration from "../../assets/message.svg";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";
import ProfilePic from "../common/ProfilePic";
import { useEffect, useMemo, useState } from "react";
import messageService, { socket } from "../../services/message";

const MessageBox = ({ user, partner }) => {
  const [messages, setMessages] = useState([]);
  const ws = useMemo(() => socket);

  useEffect(() => {
    ws.onmessage = (res) => {
      const message = JSON.parse(res.data);
      setMessages((prev) => [...prev, message]);
    };
  }, []);

  const fetchMessages = async () => {
    if (partner) {
      const res = await messageService.getMessages(partner.id, user.token);
      setMessages(res.data);
      messageService.connect(user.id);
    }
  };

  const handleSend = (content) => {
    messageService.sendMessage(user.id, partner.id, content);
  };

  useEffect(() => {
    fetchMessages();
  }, [partner]);

  return (
    <div
      className="w-full p-4 hidden sm:flex justify-center items-center
      rounded-md bg-light dark:bg-gray-2"
    >
      {partner ? (
        <div className="h-full w-full flex flex-col space-y-4">
          <div className="flex space-x-2 items-center">
            <ProfilePic img={partner.image} country={partner.country} />
            <span className="font-semibold">{partner.name}</span>
          </div>
          <MessageContainer messages={messages} />
          <MessageInput onSend={handleSend} />
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <img src={ChatIllustration} className="h-80" />
          <div className="font-semibold text-xl">
            Select a <span className="text-purple">partner</span> to begin a{" "}
            <span className="text-purple">conversation</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
