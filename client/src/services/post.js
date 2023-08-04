import api from "../config/api";

const postService = {
  createPost(data, token) {
    return api.post("/articles", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  async getPosts(token) {
    const res = await api.get("/articles", {
      headers: {
        // Authorization: `Bearer ${token}`,
        Authorization: token,
      },
    });
    return res.data;
  },
  likePost(id, token) {
    return api.get(`/articles/like/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default postService;
