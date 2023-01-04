function setQuestion(question, responses) {
    document.getElementById("question").textContent = question;
    const options = document.getElementById("options");
    options.innerHTML = "";
    for (let i = 1; i <= responses.length; i++) {
        const button = document.createElement("button");
        button.id = "option-" + i;
        button.onclick = buttonPress;
        const text = document.createElement("p");
        text.textContent = responses[ i - 1 ];
        button.appendChild(text);
        options.appendChild(button);
    }
}

function buttonPress(event) {
    console.log(event);
}

setQuestion("How are you today?", [ "Great", "Fine" ]);
