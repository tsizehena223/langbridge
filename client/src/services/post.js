import api from "../config/api";

const postService = {
  createPost(data, token) {
    return api.post("/articles", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async getPosts(token) {
    const res = await api.get("/articles", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async getUserPosts(id, token) {
    const res = await api.get(`/articles?author=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  likePost(id, token) {
    return api.get(`/articles/like?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async getComment(postId, token) {
    const res = await api.get(`/articles/comments?article=${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  createComment(content, postId, token) {
    return api.post(
      "/articles/comments",
      { content, postId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
};

export default postService;
