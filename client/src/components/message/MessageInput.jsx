import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";

const MessageInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    onSend(inputValue);
  };

  return (
    <div className="relative">
      <textarea
        cols="30"
        rows="1"
        placeholder="Send a message..."
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        className="w-full py-2 px-4
        dark:bg-gray-2
        resize-none
        border-2 border-gray-0 rounded-md
        focus:outline-none focus:border-purple focus:font-normal
        placeholder:font-semibold"
      />
      <button
        onClick={handleSend}
        className="absolute right-2 bottom-3 
        text-xl hover:text-purple"
      >
        <IoSendSharp />
      </button>
    </div>
  );
};

export default MessageInput;
