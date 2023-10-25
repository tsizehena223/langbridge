import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const MessageContainer = ({ messages }) => {
  const [showDate, setShowDate] = useState();
  const { userData } = useAuth();

  return (
    <div className="p-6 space-y-2 flex flex-col overflow-y-scroll">
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col space-y-2">
          <div
            className={`py-3 px-5 rounded-md ${
              message.sender == userData.id
                ? "self-end bg-purple text-light"
                : "self-start bg-green"
            }`}
            onMouseOver={() => setShowDate(message.id)}
            onMouseOut={() => setShowDate(null)}
          >
            {message.content}
          </div>
          <div
            className={`text-gray-1 ${
              message.sender == userData.id ? "self-end" : "self-strat"
            } ${showDate == message.id ? "visible" : "invisible"}`}
          >
            {message.createdAt}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
