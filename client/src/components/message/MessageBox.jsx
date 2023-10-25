import ChatIllustration from "../../assets/message.svg";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";
import messages from "../../mock/messages";
import ProfilePic from "../common/ProfilePic";
import { useEffect, useState } from "react";
import messageService from "../../services/message";
import config from "../../config/socket";

const MessageBox = ({ user, partner }) => {
  const [messages, setMessages] = useState([]);
  const ws = new WebSocket(config.baseURL);

  ws.onmessage = (res) => {
    const parsed = JSON.parse(res.data);
    setMessages((prev) => [...prev, parsed]);
  };

  const send = (data) => ws.send(JSON.stringify(data));

  const connect = (id) => {
    send({ kind: "connection", id });
  };

  const sendMessage = (senderId, recipientId, content) => {
    send({ kind: "message", senderId, recipientId, content });
  };

  const fetchMessages = async () => {
    if (partner) {
      const res = await messageService.getMessages(partner.id, user.token);
      setMessages(res.data);
      connect();
    }
  };

  const handleSend = (content) => {
    sendMessage(user.id, partner.id, content);
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
          <div className="flex space-x-2">
            <ProfilePic img={partner.image} country={partner.country} />
            <span className="font-semibold">{partner.name}</span>
          </div>
          <MessageContainer messages={messages} />
          <MessageInput onSend={handleSend} />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img src={ChatIllustration} className="h-80" />
          <div className="font-semibold text-xl">
            Select a partner to begin a conversation
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
