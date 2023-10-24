import { useState, useRef } from "react";
import Avatar from "../../assets/avatar.svg";
import {
  RiCameraFill,
  RiCloseCircleFill,
  RiEmojiStickerFill,
  RiImageFill,
  RiLink,
  RiMapPin2Fill,
  RiPencilFill,
  RiSendPlaneFill,
} from "react-icons/ri";
import MenuItem from "../common/MenuItem";
import postService from "../../services/post";
import { useAuth } from "../../contexts/AuthContext";
import Picker from 'emoji-picker-react';

const PostInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [image, setImage] = useState(null);
  const [ showPicker, setShowPicker ] = useState(false);
  const imageRef = useRef();
  const { userData } = useAuth();

  const handlePost = async () => {
    if (!inputValue) return;

    const formData = new FormData();

    formData.append("content", inputValue);

    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      await postService.createPost(formData, userData.token);
      // TODO: success notification
    } catch (error) {
      // TODO: error notification
    }

    setInputValue("");
    setImage(null);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setImage(file);
    }
  };

  const onEmijiClick = (event, emojiObject) => {
    setInputValue(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
  }

  return (
    <div className="w-full mb-6 p-6 rounded-md bg-light dark:bg-gray-2">
      <div className="space-y-4">
        <div className="flex justify-around space-x-2">
          {/* FIXME */}
          <img src={Avatar} className="w-[40px] mr-2" />
          <textarea
            cols="30"
            rows="1"
            placeholder="what's on your mind..."
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="w-full py-2 px-4
            dark:bg-gray-2
            border-2 border-gray-0 rounded-md
            focus:outline-none focus:border-purple focus:font-normal
            placeholder:font-semibold"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex space-x-4 items-center">
            <div>
              <MenuItem icon={RiCameraFill} />
            </div>
            <div onClick={() => imageRef.current.click()}>
              <MenuItem icon={RiImageFill} />
            </div>
            <div>
              <MenuItem icon={RiLink} />
            </div>
            <div>
              <MenuItem icon={RiMapPin2Fill} />
            </div>
            <div onClick={() => setShowPicker(val => !val)}>
              <MenuItem icon={RiEmojiStickerFill} />
            </div>
          </div>
          {showPicker && <Picker
            pickerStyle= {{ width: '100%'}}
            onEmojiClick={onEmijiClick}
          />}
          <div className="flex space-x-4">
            <MenuItem icon={RiPencilFill} label="Draft" />
            <MenuItem
              icon={RiSendPlaneFill}
              label="Post"
              onSelect={handlePost}
            />
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
        <div className="mt-4 rounded-md">
          <button
            onClick={() => setImage(null)}
            className="absolute p-4 text-light hover:text-red"
          >
            <RiCloseCircleFill size={20} />
          </button>
          <img
            src={URL.createObjectURL(image)}
            alt=""
            className="w-full rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default PostInput;
