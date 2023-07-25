import api from "../config/api";

const userService = {
  post(data) {
    return api.post("/users", data);
  },
};

export default userService;
