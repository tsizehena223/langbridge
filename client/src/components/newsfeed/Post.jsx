import { useState } from "react";
import Popup from "reactjs-popup";
import {
  RiHeartLine,
  RiHeartFill,
  RiShareCircleLine,
  RiMessage2Line,
} from "react-icons/ri";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../../assets/avatar.svg";
import CommentPopup from "./CommentPopup";
import ProfilePic from "../common/ProfilePic";
import postService from "../../services/post";

const Post = ({ data }) => {
  const { userData } = useAuth();
  const [isLiked, setIsLiked] = useState(data.likes.includes(userData.id));
  const [comments, setComments] = useState(data.comments);

  const handleLike = () => {
    const index = data.likes.indexOf(userData.id);

    if (index > -1) {
      data.likes.splice(index, 1);
    } else {
      data.likes.push(userData.id);
    }

    setIsLiked((prev) => !prev);

    postService.likePost(data.id, userData.token);
  };

  const handleShare = () => {
    // TODO
  };

  return (
    <div
      className="w-full mb-4 py-6 px-8 
      rounded-md bg-light dark:bg-gray-2"
    >
      <div className="mb-4">
        <div className="flex items-center">
          <ProfilePic img={data.author.image} country={data.author.country} />
          <div className="ml-4 font-semibold">
            <div>{data.author.name}</div>
            <div className="text-sm text-placeholder">{data.createdAt}</div>
          </div>
        </div>
      </div>

      <div>{data.content}</div>
      <img src={data.image} alt="" className="mt-4 rounded-md" />

      <div
        className="w-full mt-4 
        flex justify-around 
        jfont-semibold"
      >
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
              <span className="ml-1">{comments}</span>
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
