import Post from "./Post";

const PostContainer = ({ postList }) => {
  return (
    <div className="flex flex-col space-y-6">
      {postList.map((data) => (
        <Post key={data.id} data={data} />
      ))}
    </div>
  );
};

export default PostContainer;
