let responsePaths = [];
let startPath;

function main() {
    const CONTINUE = [ "[ Continue ]" ];
    const RESTART = [ "[ RESTART ]" ];
    startPath = new Question("This maze of stories provides answers to many \"what if\" questions readers might have, and guides them on a journey to see what could have been. Click the button below to begin.", [ "[ Start ]" ]);

    // ACT 1

    const question1 = new Question("You walk into a room, and see three strange women staring back at you.", [ "Turn around and walk away", "Stay for a moment" ]);
    startPath.setPath(0, question1);

    let earlyEnd = new Question("You leave, still the Thane of Glamis, but you'll never know what could have been.", RESTART);
    question1.setPath(0, earlyEnd);

    const question2 = new Question("You walk in a bit further, wary of the women that stand before you. They stand perfectly still, unblinking.", [ "Ask them what their business is", "Ignore them and continue on your way", "Turn back and leave" ]);
    question2.setPath(2, earlyEnd);
    question1.setPath(1, question2);

    const prophecy1 = new Question("Suddenly, the women begin to deliver a speech that seems prepared ahead of time, as if they knew you were approaching. Perhaps they're witches?", [ "Run away in fear", "Listen to their words" ]);
    prophecy1.setPath(0, earlyEnd);
    question2.setPath(0, prophecy1);
    question2.setPath(1, prophecy1);

    const prophecy2 = new Question("The 'witches' name you Thane of Glamis, while you never told them your name. However, they also note that you are Thane of Cawdor as well, and soon to be King of Scotland. They then vanish into thin air!", [ "Don't believe them", "Believe them" ]);
    prophecy1.setPath(1, prophecy2);

    const prophecy3 = new Question("Moments later, two Scottish noblemen enter, praising you with the title King just bestowed upon you for your heroism: Thane of Cawdor. You wonder if perhaps the second part of the prophecy might come true, and whether you need to make it happen yourself.", CONTINUE);
    prophecy2.setPath(0, prophecy3);
    prophecy2.setPath(1, prophecy3);

    const bestows = new Question("You meet with King Duncan, who officially bestows your title upon you. He requests that they go to your castle to celebrate. You send a letter to your spouse so she can prepare for your arrival, but also to tell her of the day's strange events.", CONTINUE);
    prophecy3.setPath(0, bestows);

    const letter = new Question("You spend the journey pondering whether or not to kill the King, for that is the only way to ascend to the throne. When you arrive, your spouse pulls you aside to discuss the topic. She is very much in favor of the murder, and tries to persuade you in that direction.", [ "Kill the king", "Accept your honors with your dignity intact" ]);
    bestows.setPath(0, letter);

    // Branch: doesn't kill Duncan
    const noKill1 = new Question("Ironically, it seems the King's son Malcolm had similar ideas of rising through the ranks. Later that night, after the partying is done, he makes an attempt on his father's life; however, you catch him heading to the King's quarters with a dagger in his hand.", [ "Let Malcolm kill the King", "Yell for assistance in apprehending Malcolm" ]);
    letter.setPath(1, noKill1);

    const noKill1a1 = new Question("You allow King Duncan to be murdered by Malcolm, but your eyes stay open for the rest of the night in case Malcolm tries to remove the sole witness. Fortunately for you, he makes no such attempt.", CONTINUE);
    noKill1.setPath(0, noKill1a1);

    const noKill1a2 = new Question("Unfortunately for Malcolm, when morning comes and Duncan's slit throat is discovered, the King's successor is naturally the prime suspect. You don't say a word, but the other noblemen all agree that it must have been him. Despite his status as heir, he is sentenced to death for his deed.", CONTINUE);
    noKill1a1.setPath(0, noKill1a2);

    const noKill1a3 = new Question("Duncan's other son, Donalbain, is named King of Scotland. However, since he has no sons (and does not intend to), he chooses you to be his heir. As it turns out, you might become king someday, and you didn't have to lift a finger!", RESTART);
    noKill1a2.setPath(0, noKill1a3);

    const noKill1b1 = new Question("Guards come running to apprehend Malcolm, and King Duncan, astonished, asks that you don't leave his side for the rest of the night. You oblige.", CONTINUE);
    noKill1.setPath(1, noKill1b1);

    const noKill1b2 = new Question("In the morning, Duncan proclaims that Malcolm is unworthy to take the throne, and he has his doubts with his other son as well. He proclaims that you shall be his heir, despite the lack of a bloodline. As it turns out, you'll get to be king someday! (If you aren't murdered first)", RESTART);
    noKill1b1.setPath(0, noKill1b2);
    // End branch

    const murderDuncan = new Question("The following night, you enter the king's quarters while he's asleep. The guards have already gotten drunk (thanks to your spouse), and you quietly slip past them into the bedroom and slit his throat.", CONTINUE);
    letter.setPath(0, murderDuncan);

    start();
}

function start() {
    document.getElementById("title").hidden = false;
    askQuestion(startPath);
}

function Question(question, responses) {
    this.question = question;
    this.responses = responses;
    this.paths = [];
    this.setPath = function (index, path) {
        this.paths[ index ] = path;
    };
}

function setQuestion(question, responses) {
    document.getElementById("question").textContent = question;
    const options = document.getElementById("options");
    options.innerHTML = "";
    for (let i = 1; i <= responses.length; i++) {
        const text = document.createElement("p");
        text.textContent = responses[ i - 1 ];
        const button = document.createElement("button");
        button.appendChild(text);
        button.id = "option-" + i;
        button.addEventListener("click", (function () {
            buttonPress(this);
        }));
        options.appendChild(button);
    }
}

function askQuestion(question) {
    setQuestion(question.question, question.responses);
    responsePaths = question.paths;
}

function buttonPress(button) {
    const id = button.id[ 7 ];
    console.log(id);
    const q = responsePaths[ id - 1 ];
    if (q != null) {
        document.getElementById("title").hidden = true;
        askQuestion(responsePaths[ id - 1 ]);
    } else {
        console.log("null");
        start();
    }
}

main();
