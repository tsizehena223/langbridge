import ChatIllustration from "../../assets/message.svg";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";
import messages from "../../mock/messages";
import ProfilePic from "../common/ProfilePic";

const MessageBox = ({ partner }) => {
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
          <MessageInput />
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
