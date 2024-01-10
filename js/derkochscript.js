//typewriter


  document.addEventListener('DOMContentLoaded', function () {
    const targetElement = document.getElementById('typewriter');
    const textArray = ["Welcome to TaPa's Kitchen...", "Explore our delicious recipes...", "Enjoy cooking with ease..."];
    let textIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < textArray[textIndex].length) {
        targetElement.innerHTML += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
      } else {
        setTimeout(erase, 1500);
      }
    }

    function erase() {
      if (charIndex > 0) {
        targetElement.innerHTML = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
      } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
      }
    }

    setTimeout(type, 500);
  });
//___________________________________________________________________________________

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
