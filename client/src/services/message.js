import api from "../config/api";

const messageService = {
  getMessages(id, token) {
    return api.get(`/messages?recipientId=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default messageService;
