import api from "../config/api";
import config from "../config/socket";

export const socket = new WebSocket(config.baseURL);

const messageService = {
  getMessages(id, token) {
    return api.get(`/messages?recipientId=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  connect(id) {
    socket.send(JSON.stringify({ kind: "connection", id }));
  },

  sendMessage(sender, recipient, content) {
    socket.send(
      JSON.stringify({ kind: "message", sender, recipient, content })
    );
  },
};

export default messageService;
