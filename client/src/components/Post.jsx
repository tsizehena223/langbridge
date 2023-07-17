import {
  RiHeartLine,
  RiHeartFill,
  RiShareCircleLine,
  RiMessage2Line,
} from "react-icons/ri";
import Avatar from "../assets/avatar.svg";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import api from "../utils/api";
import config from "../config";
import Popup from "reactjs-popup";
import CommentPopup from "./CommentPopup";
import ProfilePic from "./ProfilePic";

const Post = ({ data }) => {
  const { token, userId } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(data.likes.includes(userId));
  const [comments, setComments] = useState(data.comments);

  const handleLike = () => {
    const index = data.likes.indexOf(userId);

    if (index > -1) {
      data.likes.splice(index, 1);
    } else {
      data.likes.push(userId);
    }

    setIsLiked((prev) => !prev);

    api.get(config.baseUrl, `/api/post/like/${data.id}`, {
      headers: {
        Authorization: token,
      },
    });
  };

  const handleShare = () => {
    // TODO
  };

  return (
    <div className="w-full mb-4 py-6 px-8 rounded-xl text-gray-1 bg-light">
      <div className="mb-4">
        <div className="flex items-center">
          <ProfilePic img={Avatar} country={data.author.country} />
          <div className="ml-4 font-semibold">
            <div>{data.author.name}</div>
            <div className="text-sm text-placeholder">{data.createdAt}</div>
          </div>
        </div>
      </div>

      <div>{data.content}</div>

      <div className="w-full mt-4 flex justify-around font-semibold">
        <button
          className="flex items-center hover:text-red"
          onClick={handleLike}
        >
          {isLiked ? <RiHeartFill className="text-red" /> : <RiHeartLine />}
          <span className={`ml-1 ${isLiked && "text-red"}`}>
            {data.likes.length}
          </span>
        </button>

        <Popup
          trigger={
            <button className="flex items-center hover:text-purple">
              <RiMessage2Line />
              <span className="ml-1">{comments.length}</span>
            </button>
          }
        >
          {(close) => (
            <CommentPopup
              close={close}
              postId={data.id}
              comments={comments}
              setComments={setComments}
            />
          )}
        </Popup>

        <button className="hover:text-purple" onClick={handleShare}>
          <RiShareCircleLine />
        </button>
      </div>
    </div>
  );
};

export default Post;
