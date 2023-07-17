import { useState, useRef, useContext } from "react";
import Avatar from "../assets/avatar.svg";
import {
  FaImage,
  FaCamera,
  FaLink,
  FaLocationDot,
  FaFaceSmile,
  FaPencil,
} from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import MenuItem from "./MenuItem";
import api from "../utils/api";
import config from "../config";
import { UserContext } from "../contexts/userContext";

const PostInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const { token } = useContext(UserContext);

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

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
    }
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
          <div className="flex space-x-4 items-center">
            <div>
              <MenuItem icon={FaCamera} />
            </div>
            <div onClick={() => imageRef.current.click()}>
              <MenuItem icon={FaImage} />
            </div>
            <div>
              <MenuItem icon={FaLink} />
            </div>
            <div>
              <MenuItem icon={FaLocationDot} />
            </div>
            <div>
              <MenuItem icon={FaFaceSmile} />
            </div>
          </div>
          <div className="flex space-x-4">
            <MenuItem icon={FaPencil} label="Draft" />
            <MenuItem icon={IoSendSharp} label="Post" onSelect={handlePost} />
          </div>
        </div>
        <input
          type="file"
          name="myPost"
          hidden={true}
          ref={imageRef}
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      {image && (
        <div className="rounded-xl m-3">
          <button
            onClick={() => setImage(null)}
            className="absolute p-4 text-light hover:text-red"
          >
            <FaTimesCircle />
          </button>
          <img src={image} alt="" className="w-full rounded-md" />
        </div>
      )}
    </div>
  );
};

export default PostInput;
