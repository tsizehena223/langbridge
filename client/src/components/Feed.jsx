import { useState, useEffect } from "react";
import { PostInput, PostContainer } from "../components";
import api from "../utils/api";
import config from "../config";
import post from "../mock/post";

const Feed = () => {
  const [postList, setPostList] = useState(post);

  const fetchPosts = async () => {
    try {
      const res = await api.get(config.baseUrl, "/api/posts", {});
      setPostList(res.data.posts);
    } catch (error) {
      // TODO
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full m-6 flex flex-col">
      <PostInput />
      <PostContainer postList={postList} />
    </div>
  );
};

export default Feed;
