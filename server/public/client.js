// HTML Elemets

const formElement = document.querySelector("form");
const outputElement = document.getElementById("output");
const textArea = document.querySelector("textarea");

//kümmert sich um die Formularübermittlung

formElement.addEventListener("submit", async (e) => {
    //verhindert neuladen der page
    e.preventDefault();

    outputElement.innerText = "Anfrage wird bearbeitet...";

    const response = await fetch("/completion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: textArea.value,
        }),
    });
    
});