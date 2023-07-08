import { PostInput, PostContainer } from "../components";

const Feed = ({ postList }) => {
  return (
    <div className="w-full m-10 flex flex-col bg-gray-0">
      <PostInput />
      <PostContainer postList={postList} />
    </div>
  );
};

export default Feed;
