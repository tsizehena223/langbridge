import api from "../config/api";

const userService = {
  createUser(data) {
    return api.post("/users", data);
  },

  updateUser(data, token) {
    return api.post("/users/update", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async getUsers(filter, token) {
    const keys = ["countries", "name", "number", "language"];
    for (const key of keys) {
      filter[key] = filter[key] || "";
    }
    const res = await api.get(
      `/users?countries=${filter.countries}&name=${filter.name}&number=${filter.number}&language=${filter.language}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
};

export default userService;
