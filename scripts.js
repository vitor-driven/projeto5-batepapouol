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
    promise.then(gotten => {
        let messages = gotten.data;
        updateMessages(messages);
    })
}

function updateMessages(messages) {
    let messageList = document.querySelector(".message-list");
    messages.forEach((message) => {
        if (message.type == "status") {
            messageList.innerHTML += `
            <div class="user-joined-or-left text-message">
                <span class="timestamp">(${message.time})</span>  <em>${message.from}</em>  ${message.text}
            </div>`;
        }
        if (message.type == "message") {
            messageList.innerHTML += `
            <div class="public-message text-message">
                <span class="timestamp">(${message.time})</span>  <em>${message.from}</em>  para  <em>${message.to}</em>: ${message.text}
            </div>`;
        }
    })
    document.querySelector(".message-list").lastElementChild.scrollIntoView();
}

function updateConnection() {
    const userAttempt = { name: userGet.value };
    const updateCon = axios.post(statusLink, userAttempt);
}
