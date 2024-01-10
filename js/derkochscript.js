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
        cardBodyEl.appendChild(messageEl("Einen Moment bitte, ich werde dir einige Rezepte zusammenstellen...", "chat-bot"));
    }, 600);
}


//messages 
const messageEl = (message,className) =>{
    const chatEl = document.createElement("div");
    chatEl.classList.add("chat", `${className}`);
    let chatContent = 
        className === "chat-bot"
            ? `<span class="user-icon"><img src="img/koch.png" alt="Bot-Bild"></span>
    <p>${message}</p>`
            : ` <span class="user-icon"><img src="img/topf.png" alt="Bot-Bild"></span>
    <p>${message}</p>`;
    chatEl.innerHTML = chatContent;
    return chatEl;
};

btnEl.addEventListener("click", manageChat);
