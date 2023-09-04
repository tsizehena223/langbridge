import { useEffect, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { IoSendSharp } from "react-icons/io5";
import dateFormat from "dateformat";

import Avatar from "../../assets/avatar.svg";
import ProfilePic from "../common/ProfilePic";
import { useAuth } from "../../contexts/AuthContext";
import postService from "../../services/post";

const CommentPopup = ({ postId, comments, setComments, close }) => {
  const { userData } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [commentValue, setCommentValue] = useState([]);

  const handleComment = () => {
    if (!inputValue) return;

    setCommentValue((prev) => [
      ...prev,
      {
        id: comments.length + 1,
        createdAt: dateFormat(new Date(), "dd mmm yyyy H:M"),
        author: {
          id: userData.id,
          name: userData.name,
          country: userData.country,
        },
        content: inputValue,
      },
    ]);
    setComments((prev) => prev + 1);
    setInputValue("");

    postService.createComment(inputValue, postId, userData.token);
  };

  const fetchComment = async () => {
    const data = await postService.getComment(postId, userData.token);
    setCommentValue(data);
  };

  useEffect(() => {
    fetchComment();
  });

  return (
    <div
      className="fixed w-screen h-screen p-4 inset-0 
      flex justify-center items-center 
      backdrop-blur-md backdrop-brightness-50"
    >
      <div
        className="relative w-full max-w-xl max-h-[350px] p-4 
        flex flex-col rounded-xl text-gray-1 dark:text-light bg-light dark:bg-gray-2"
      >
        <div className="mb-4 font-semibold">
          {comments.length} {comments.length > 1 ? "Comments" : "Comment"}
        </div>

        <div className="max-h-full overflow-scroll">
          {commentValue.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 py-2 px-4 rounded-md bg-silver dark:bg-gray-1"
            >
              <div className="mb-2 flex items-center">
                <div className="relative mr-3">
                  <ProfilePic img={Avatar} country={comment.author.country} />
                </div>
                <div>
                  <div className="font-semibold">{comment.author.name}</div>
                  <div className="text-sm">{comment.createdAt}</div>
                </div>
              </div>
              <div>{comment.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 relative">
          <textarea
            cols="30"
            rows="1"
            placeholder="Leave a comment..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full py-1 px-4 
            dark:bg-gray-2
            border-[1px] border-gray-0 rounded-md 
            placeholder:font-semibold 
            focus:outline-none focus:border-purple focus:font-normal 
            resize-none"
          />
          <button
            onClick={handleComment}
            className="absolute right-2 bottom-2 
            text-xl hover:text-purple"
          >
            <IoSendSharp />
          </button>
        </div>

        <button onClick={close}>
          <RiCloseCircleFill
            className="absolute top-3 right-3 
            text-2xl text-red"
          />
        </button>
      </div>
    </div>
  );
};

export default CommentPopup;
