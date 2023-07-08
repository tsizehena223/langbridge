import { PostInput, PostContainer } from "../components";

const Feed = ({ postList }) => {
  return (
    <div className="w-full m-10 flex flex-col bg-gray-0">
      <PostInput />
      <PostContainer postList={postList} />
      <img src="http://localhost:8000/images/users/bien-64a5bdec19057125930338.jpg" alt="" />
    </div>
  );
};

export default Feed;
