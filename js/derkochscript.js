"use strict";

const inputEl = document.querySelector(".input-chat");
const btnEl = document.querySelector(".fa-paper-plane");
const cardBodyEl = document.querySelector(".card-body");

let userMessage;

function manageChat() {
    userMessage = inputEl.value.trim();

    if (!userMessage) return;
    inputEl.value = "";    

    cardBodyEl.appendChild(messageEl(userMessage, "user"));

    setTimeout(() => {
        cardBodyEl.appendChild(messageEl("Ich schicke dir gleich etwas Köstliches zu, Augenblick bitte. . .", "chat-bot"));
    }, 600);
}


//messages 
const messageEl = (message,className) =>{
    const chatEl = document.createElement("div");
    chatEl.classList.add("chat", `${className}`);
    let chatContent = 
        className === "chat-bot"
            ? `<span class="user-icon"><i class="fa fa-robot"></i></span>
    <p>${message}</p>`
            : ` <span class="user-icon"><i class="fa fa-user"></i></span>
    <p>${message}</p>`;
    chatEl.innerHTML = chatContent;
    return chatEl;
};

btnEl.addEventListener("click", manageChat);
