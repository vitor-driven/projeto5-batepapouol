axios.defaults.headers.common['Authorization'] = 'aSaefb8T8sX6LpwwvW21qigP';

let userGet = document.querySelector(".username-input");
const participantsLink =
    "https://mock-api.driven.com.br/api/vm/uol/participants";
const messagesLink = "https://mock-api.driven.com.br/api/vm/uol/messages";
const statusLink = "https://mock-api.driven.com.br/api/vm/uol/status";
let userName = "";

function loginAttempt() {
    if (userGet.value == "") {
        return;
    }
    const userAttempt = { name: userGet.value };
    let promise = axios.post(participantsLink, userAttempt);
    promise.then(successJoin);
    promise.catch(cantJoin);
}

function successJoin() {
    userName = userGet.value;
    console.log(userName);
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
        from: userName,
        to: "Todos",
        text: document.querySelector(".typedMessage").value,
        type: "message",
    };
    const promise = axios.post(messagesLink, messageSent);
    promise.then(requestMessages);
}

function requestMessages() {
    const promise = axios.get(messagesLink);
    promise.then(updateMessages);
}

function updateMessages(x) {
    let i;
    let messageList = document.querySelector(".message-list");
    for (i = 0, i < x.data.length; i++; ) {
        if (x.data[i].type == "status") {
            messageList.innerHTML += `<div class="user-joined-or-left"><span class="timestamp">${x.data[i].time}</span><em>${x.data[i].from}</em> ${x.data[i].text}</div>`;
        }
        if (x.data[i].type == "message") {
            messageList.innerHTML += `<div class="user-joined-or-left"><span class="timestamp">${x.data[i].time}</span><em>${x.data[i].from}</em> para <em>${x.data[i].to}</em>: ${x.data[i].text}</div>`;
        }
    }
}

function updateConnection() {
    const userAttempt = { name: userGet.value };
    const updateCon = axios.post(statusLink, userAttempt);
}
