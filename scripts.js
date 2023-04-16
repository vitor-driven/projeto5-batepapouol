axios.defaults.headers.common["Authorization"] = "RGIC4Pzu7UNuLvDHOS4ZuJLs";

let userGet = document.querySelector(".username-input");
let messageList = document.querySelector(".message-list");

function loginAttempt() {
    const userName = { name: userGet.value };
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/vm/uol/participants",
        userName
    );
    promise.then(successJoin);
    promise.catch(cantJoin);
}

function successJoin() {
    document.querySelector(".login-screen").classList.add("hidden");
    requestMessages();
    setInterval(() => {
        requestMessages();
    }, 3000);
    setInterval(() => {
        updateConnection(userGet);
    }, 5000);
}

function cantJoin(error) {
    if (error.response.status === 400) {
        alert("Esse nome já existe, escolha outro");
    }
}

function sendMessage() {
    const messageSent = {
        from: userGet,
        to: "Todos",
        text: document.querySelector(".typedMessage").value,
        type: "message",
    };
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/vm/uol/messages",
        messageSent
    );
    promise.then(requestMessages);
    promise.catch(window.location.reload());
}

function requestMessages() {
    const promise = axios.get(
        "https://mock-api.driven.com.br/api/v6/uol/messages"
    );
    promise.then(updateMessages);
}

function updateMessages(x) {
    messageList.innerHTML = "";
    for (i = 0, i < x.data.length; x++; ) {
        if (x.data[i].type == "status") {
            messageList.innerHTML += `<li class="user-joined-or-left"></li><span class="timestamp">${x.data[i].time}</span><em>${x.data[i].from}</em> ${x.data[i].text}</li>`;
        }
        if (x.data[i].type == "message") {
            messageList.innerHTML += `<li class="user-joined-or-left"></li><span class="timestamp">${x.data[i].time}</span><em>${x.data[i].from}</em> para <em>${x.data[i].to}</em>: ${x.data[i].text}</li>`;
        }
    }
}

function deleteFirstMessage() {}

function updateConnection() {}
