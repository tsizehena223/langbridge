import { useState, useRef } from "react";
import Avatar from "../../assets/avatar.svg";
import {
  RiCameraFill,
  RiClipboardFill,
  RiCloseCircleFill,
  RiEmojiStickerFill,
  RiImageFill,
  RiLink,
  RiMapPin2Fill,
  RiSendPlaneFill,
} from "react-icons/ri";
import MenuItem from "../common/MenuItem";
import postService from "../../services/post";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";

const PostInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const { userData } = useAuth();
  const [showPicker, setShowPicker] = useState(false);

  const handlePost = async () => {
    if (!inputValue) {
      toast.info("Empty post");
      return;
    }

    const formData = new FormData();

    formData.append("content", inputValue);

    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      await postService.createPost(formData, userData.token);
      toast.success("Post published");
    } catch (error) {
      toast.error("An error occured");
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

  const onEmijiClick = (event) => {
    setInputValue((prev) => prev + event.emoji);
    setShowPicker(false);
  };

  return (
    <div className="w-full p-6 rounded-md bg-light dark:bg-gray-2">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-full overflow-clip">
            <img
              src={userData.image || Avatar}
              className="w-full h-full object-cover"
            />
          </div>
          <textarea
            cols="30"
            rows="1"
            placeholder="What's on your mind..."
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="w-full py-2 px-4
            dark:bg-gray-2
            border-2 border-gray-0 rounded-md resize-none
            focus:outline-none focus:border-purple focus:font-normal
            placeholder:font-semibold"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex space-x-4 items-center">
            <MenuItem icon={RiCameraFill} />
            <MenuItem
              icon={RiImageFill}
              onSelect={() => imageRef.current.click()}
            />
            <MenuItem
              icon={RiClipboardFill}
              onSelect={() => {
                navigator.clipboard.writeText(inputValue);
                toast.info("Text copied to clipboard");
              }}
            />
            <MenuItem
              icon={RiEmojiStickerFill}
              onSelect={() => setShowPicker(true)}
            />
            {showPicker && (
              <div className="z-30 absolute top-20">
                <EmojiPicker
                  pickerStyle={{ width: "100%" }}
                  onEmojiClick={onEmijiClick}
                />
              </div>
            )}
          </div>
          <div className="flex space-x-4">
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
