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

"use strict";

const inputEl = document.querySelector(".input-chat");
const btnEl = document.querySelector(".fa-paper-plane");
const cardBodyEl = document.querySelector(".card-body");

let userMessage;

// ________________ Entferne die harten Coded API-Schlüssel und URL ______________________
 const API_KEY = "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";
 const URL = "https://api.openai.com/v1/chat/completions";
// _____________________________________________________________________________________

const chatGenerator = (robot) => {
  robot = robot.querySelector(".robot");
  const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [{ "role": "system", "content": "You are a helpful assistant." }, { "role": "user", "content": userMessage }],
      temperature: 0.7
  };

  const requestOption = {
      method: "POST",
      headers: {
          "Content-Type": "application/json", // Hier wurde der Header korrigiert
          // Authorization: `Bearer ${API_KEY}`, // Entferne den harten Coded API-Schlüssel
      },
      body: JSON.stringify(requestBody), // Body der Anfrage verwendet jetzt die korrekte Struktur und Variable
  };

  // ________________ Nutze relative Pfade, um Probleme mit CORS zu vermeiden ________________
  fetch('/openai', requestOption)
      .then((res) => res.json())
      .then((data) => {
          robot.textContent = data.response;
      })
      .catch((error) => {
          console.error("Fehler beim Anfordern der Chat-Antwort:", error);
          robot.textContent = "Es gab leider ein Problem beim Laden der Antwort.";
      });
};

// manage chat
function manageChat() {
  userMessage = inputEl.value.trim();

  if (!userMessage) return;
  inputEl.value = "";

  cardBodyEl.appendChild(messageEl(userMessage, "user"));

  setTimeout(() => {
      const robotMessage = messageEl("Einen Moment bitte. Ich erstelle einige Rezepte für Dich...", "chat-bot");
      cardBodyEl.append(robotMessage);
      chatGenerator(robotMessage);
  }, 600);
}

//messages 
const messageEl = (message, className) => {
  const chatEl = document.createElement("div");
  chatEl.classList.add("chat", `${className}`);
  let chatContent =
      className === "chat-bot"
          ? `<span class="user-icon"><img src="img/koch1.png" alt="Bot-Bild"></span>
  <p class='robot'>${message}</p>`
          : ` <span class="user-icon"><img src="img/topf.png" alt="Bot-Bild"></span>
  <p>${message}</p>`;
  chatEl.innerHTML = chatContent;
  return chatEl;
};

btnEl.addEventListener("click", manageChat);

//___frontend anpassung um nachrichten an den server zu schicken und zu empfangen________________________________________________-

const chatbotFunction = async (userMessage) => {
  const response = await fetch('/openai', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
  });

  const data = await response.json();
  return data.response;
};

// ...

// Ändere die manageChat-Funktion
function manageChat() {
  userMessage = inputEl.value.trim();

  if (!userMessage) return;
  inputEl.value = "";

  cardBodyEl.appendChild(messageEl(userMessage, 'user'));

  setTimeout(async () => {
      const robotMessage = messageEl('Einen Moment bitte. Ich erstelle einige Rezepte für Dich...', 'chat-bot');
      cardBodyEl.append(robotMessage);
      const response = await chatbotFunction(userMessage);
      robotMessage.querySelector('.robot').textContent = response;
  }, 600);
}
