const btn = document.getElementById("btn-send");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

const ws = new WebSocket("ws://localhost:8080");

const user = {};

ws.onopen = (data) => {
    ws.send(JSON.stringify({
        kind: "connection",
        id: 2,
    }))
}

ws.onmessage = (res) => {
    const parsed = JSON.parse(res.data);

    if (parsed.kind == "message") {
        const elem = document.createElement("div");
        elem.innerText = parsed.content;
        messages.appendChild(elem);
    }
}

const send = () => {
    ws.send(JSON.stringify({
        kind: "message",
        content: input.value,
        recipientId: 3,
        senderId: 2
    }))
}

btn.addEventListener("click", send)