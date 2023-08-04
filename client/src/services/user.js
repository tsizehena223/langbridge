import api from "../config/api";

const userService = {
  post(data) {
    return api.post("/users", data);
  },

  get(filter) {
    // TODO
  },
};

export default userService;
