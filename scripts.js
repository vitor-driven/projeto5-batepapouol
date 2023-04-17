axios.defaults.headers.common["Authorization"] = "RGIC4Pzu7UNuLvDHOS4ZuJLs";

let userGet = document.querySelector(".username-input");
let messageList = document.querySelector(".message-list");
let userName;

function loginAttempt() {
    userName = { name: userGet.value };
    const tryLogin = axios.post(
        "https://mock-api.driven.com.br/api/vm/uol/participants",
        userName
    );
    tryLogin.then(successJoin);
    tryLogin.catch(cantJoin);
}

function successJoin() {
    document.querySelector(".login-screen").classList.add("hidden");
    requestMessages();
    setInterval(() => {
        requestMessages();
    }, 3000);
    setInterval(() => {
        updateConnection();
    }, 5000);
}

function cantJoin(error) {
    if (error.response.status === 400) {
        alert("Esse nome já existe, escolha outro");
    }
}

function sendMessage() {
    let messageText = document.querySelector(".typedMessage").value;
    const messageSent = {
        from: userGet.value,
        to: "Todos",
        text: messageText,
        type: "message",
    };
    const sendToServer = axios.post(
        "https://mock-api.driven.com.br/api/vm/uol/messages",
        messageSent
    );
    sendToServer.then(requestMessages);
    sendToServer.catch(window.location.reload());
}

function requestMessages() {
    const msgReq = axios.get(
        "https://mock-api.driven.com.br/api/vm/uol/messages"
    );
    msgReq.then(updateMessages);
    msgReq.catch(window.location.reload());
}

function updateMessages(x) {
    messageList.innerHTML = "";
    for (i = 0, i < 100; i++; ) {
        if (x.data[i].type == "status") {
            messageList.innerHTML += `<li data-test="message" class="user-joined-or-left"><span class="timestamp">${x.data[i].time}</span><em>${x.data[i].from}</em> ${x.data[i].text}</li>`;
        }
        if (x.data[i].type == "message") {
            messageList.innerHTML += `<li data-test="message" class="text-message"><span class="timestamp">${x.data[i].time}</span><em>${x.data[i].from}</em> para <em>${x.data[i].to}</em>: ${x.data[i].text}</li>`;
        }
    }
}

function updateConnection() {
    const updateCon = axios.post(
        "https://mock-api.driven.com.br/api/vm/uol/status",
        userName
    );
}
