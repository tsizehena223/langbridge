import { FaRegHeart } from "react-icons/fa6";
import { FaRegCommentAlt, FaRegShareSquare } from "react-icons/fa";
import Avatar from "../assets/avatar.svg";

const Post = ({ data }) => {
  const handleLike = () => {
    // TODO
  };

  const handleComment = () => {
    // TODO
  };

  const handleShare = () => {
    // TODO
  };

  return (
    <div className="w-full mb-4 py-6 px-8 rounded-xl text-gray-1 bg-light">
      <div className="mb-4">
        <div className="flex items-center">
          <img src={Avatar} alt="" className="w-10 h-10" />
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
          <FaRegHeart />
          <span className="ml-1">10</span>
        </button>
        <button
          className="flex items-center hover:text-purple"
          onClick={handleComment}
        >
          <FaRegCommentAlt />
          <span className="ml-1">10</span>
        </button>
        <button className="hover:text-purple" onClick={handleShare}>
          <FaRegShareSquare />
        </button>
      </div>
    </div>
  );
};

export default Post;
