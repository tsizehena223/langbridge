import { useState } from "react";
import Avatar from "../assets/avatar.svg";
import {
  FaImage,
  FaCamera,
  FaLink,
  FaLocationDot,
  FaFaceSmile,
  FaPencil,
} from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
import MenuItem from "./MenuItem";
import api from "../utils/api";
import config from "../config";

const PostInput = () => {
  const [inputValue, setInputValue] = useState("");
  const token = localStorage.getItem("token");

  const handlePost = () => {
    if (!inputValue) return;

    api.post(config.baseUrl, "/api/post/create", {
      headers: {
        Authorization: token,
      },
      data: { content: inputValue },
    });

    setInputValue("");
  };

  return (
    <div className="w-full mb-6 p-6 rounded-xl bg-light">
      <div className="space-y-4">
        <div className="flex justify-around space-x-2">
          <img src={Avatar} className="w-9 h-9 mr-2" />
          <textarea
            cols="30"
            rows="1"
            placeholder="what's on your mind..."
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="w-full py-1 px-4 border-[1px] border-gray-0 rounded-md placeholder:font-semibold focus:outline-none focus:border-purple focus:font-normal"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <MenuItem icon={FaCamera} />
            <MenuItem icon={FaImage} />
            <MenuItem icon={FaLink} />
            <MenuItem icon={FaLocationDot} />
            <MenuItem icon={FaFaceSmile} />
          </div>
          <div className="flex space-x-4">
            <MenuItem icon={FaPencil} label="Draft" />
            <MenuItem icon={IoSendSharp} label="Post" onSelect={handlePost} />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default PostInput;
