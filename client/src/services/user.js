import api from "../config/api";

const userService = {
  createUser(data) {
    return api.post("/users", data);
  },

  updateUser(data) {
    return api.post("/users/update", data);
  },

  async getUsers(filter, token) {
    const keys = ["countries", "name", "number"];
    for (const key of keys) {
      filter[key] = filter[key] || "";
    }
    const res = await api.get(
      `/users?countries=${filter.countries}&name=${filter.name}&number=${filter.number}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
};

export default userService;
