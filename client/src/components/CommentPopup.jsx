import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { RiCloseCircleFill } from "react-icons/ri";
import Avatar from "../assets/avatar.svg";
import { IoSendSharp } from "react-icons/io5";
import ReactCountryFlag from "react-country-flag";
import countries from "i18n-iso-countries";
import dateFormat from "dateformat";
import api from "../utils/api";
import config from "../config";

const CommentPopup = ({ postId, comments, setComments, close }) => {
  const { token, tokenDecoded } = useContext(UserContext);
  const { id: userId, username, country } = tokenDecoded;

  const [inputValue, setInputValue] = useState("");

  const handleComment = () => {
    if (!inputValue) return;

    setComments((prev) => [
      ...prev,
      {
        id: comments.length + 1,
        createdAt: dateFormat(new Date(), "dd mmm yyyy H:M"),
        author: {
          id: userId,
          name: username,
          country,
        },
        content: inputValue,
      },
    ]);

    setInputValue("");

    api.post(config.baseUrl, "/api/comment/create", {
      headers: {
        Autorization: token,
      },
      data: {
        postId,
        content: inputValue,
      },
    });
  };

  return (
    <div className="w-screen h-screen p-4 fixed inset-0 flex justify-center items-center backdrop-blur-md backdrop-brightness-50">
      <div className="relative w-full max-w-xl max-h-[350px] p-4 flex flex-col rounded-xl text-gray-1 bg-light">
        <div className="mb-4 font-semibold">
          {comments.length} {comments.length > 1 ? "Comments" : "Comment"}
        </div>

        <div className="max-h-full overflow-scroll">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 py-2 px-4 rounded-md bg-[#e0e2e5]"
            >
              <div className="mb-2 flex items-center">
                <div className="relative mr-3">
                  <img src={Avatar} alt="" className="w-10 h-10" />
                  <ReactCountryFlag
                    countryCode={countries.getAlpha2Code(
                      comment.author.country,
                      "en"
                    )}
                    svg={true}
                    className="absolute -bottom-1 right-0"
                  />
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
            className="w-full py-1 px-4 border-[1px] border-gray-0 rounded-md placeholder:font-semibold focus:outline-none focus:border-purple focus:font-normal resize-none"
          />
          <button
            onClick={handleComment}
            className="absolute right-2 bottom-2 text-xl hover:text-purple"
          >
            <IoSendSharp />
          </button>
        </div>

        <button onClick={close}>
          <RiCloseCircleFill className="absolute top-3 right-3 text-2xl text-red" />
        </button>
      </div>
    </div>
  );
};

export default CommentPopup;
