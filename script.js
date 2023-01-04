let responsePaths = [];
let startPath;

function main() {
    const CONTINUE = [ "[ Continue ]" ];
    const RESTART = [ "[ RESTART ]" ];
    startPath = new Question("This maze of stories provides answers to many \"what if\" questions readers might have had, and guides them on a journey to see what could have happened to Macbeth. Click the button below to begin.", [ "[ Start ]" ]);

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

    const prophecy2 = new Question("The 'witches' name you Thane of Glamis, while you never told them your name. However, they also note that you are Thane of Cawdor as well, and soon to be King of Scotland. Finally, they finish by announcing that your best friend Banquo's child will also be a king someday. They then vanish into thin air!", [ "Don't believe them", "Believe them" ]);
    prophecy1.setPath(1, prophecy2);

    const prophecy3 = new Question("Moments later, two Scottish noblemen enter, praising you with the title King just bestowed upon you for your heroism: Thane of Cawdor. You wonder if perhaps the second part of the prophecy might come true, and whether you need to make it happen yourself.", CONTINUE);
    prophecy2.setPath(0, prophecy3);
    prophecy2.setPath(1, prophecy3);

    const bestows = new Question("You meet with King Duncan, who officially bestows your title upon you. He requests that they go to your castle to celebrate. You send a letter to your spouse so she can prepare for your arrival, but also to tell her of the day's strange events.", CONTINUE);
    prophecy3.setPath(0, bestows);

    const letter = new Question("You spend the journey pondering whether or not to kill the King, for that is the only way to ascend to the throne. When you arrive, your spouse pulls you aside to discuss the topic. She is very much in favor of the murder, and tries to persuade you in that direction.", [ "Kill the king", "Accept your honors with your dignity intact" ]);
    bestows.setPath(0, letter);

    // ACT 2

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

    const murderDuncan = new Question("The following night, you enter the king's quarters while he's asleep. The guards have already gotten drunk (thanks to your spouse), and you quietly slip past them into the bedroom and slit his throat.", CONTINUE);
    letter.setPath(0, murderDuncan);

    const daggerChoice = new Question("On the way out, you have an idea: what if you frame the guards for the murder? You could leave the daggers on the table beside them, and they'll wake up with their minds clouded from drink.", [ "Frame the guards", "Take the dagger with you" ]);
    murderDuncan.setPath(0, daggerChoice);

    const noFrame1 = new Question("You take the daggers out to a sink to clean the blood off, but your spouse meets you outside first. You tell them your idea to leave the daggers with the guards, and they agree that it would be beneficial.", [ "Go back to leave the daggers with the guards", "Keep the daggers out here" ]);
    daggerChoice.setPath(1, noFrame1);

    const noFrame2 = new Question("You clean the blood off of the daggers at the sink, but hear a noise while you're drying them off.", [ "Investigate the noise", "Ignore it and go to bed" ]);
    noFrame1.setPath(1, noFrame2);

    const noFrame3Inv = new Question("You find the porter and a couple of guards having drinks in the kitchen. You remain around the corner without acknowledging your presence, and they don't notice you.", CONTINUE);
    noFrame2.setPath(0, noFrame3Inv);

    const noFrame3Bed = new Question("You return to your own quarters and turn in for the night, but your conscience runs astray. You can't help but wonder whether the prophecy could have come true without the need for murder.");
    noFrame2.setPath(1, noFrame3Bed);
    noFrame3Inv.setPath(0, noFrame3Bed);

    const frameGuards = new Question("You double back to leave the daggers on the guards' table, and smear some of the blood on their uniforms (for good measure). You then return to your own quarters to clean yourself and go to bed.", CONTINUE);
    daggerChoice.setPath(0, frameGuards);
    noFrame1.setPath(0, frameGuards);

    const discovery = new Question("In the morning, the king's dead body is discovered, and immediate suspicion goes to the guards (who can hardly say their names). It seems the king's two sons quickly slip out and run away, who become the prime suspects in the plot.", [ CONTINUE ]);
    noFrame3Bed.setPath(0, discovery);
    frameGuards.setPath(0, discovery);

    // ACT 3

    const heir = new Question("As both of the king's sons have fled, you are named King of Scotland. Your wife seems satisfied: after all, she's a queen now! However, you can't forget the last part of the prophecy: that Banquo's son would be a king someday. You wonder if he will kill you to take the throne, just as you killed Duncan.", [ "Send someone to kill Banquo and his son", "Don't worry about it" ]);
    discovery.setPath(0, heir);

    const noKill2 = new Question("One murder is enough for you, and it seems you got away with it. While it weighs heavily on your conscience, you serve as King of Scotland for the rest of your years; however, upon your death, you had never chosen your heir. Your friend Banquo is long dead, killed in a skirmish, so the next-closest person to you is named king: Banquo's son Fleance.", RESTART);
    heir.setPath(1, noKill2);

    const killBanquo = new Question("You select two of your guards who seem stealthy and discreet, and follow orders without asking questions. They too have their own motives to kill your friend. You send them to kill Banquo and his son Fleance, and they leave to do your bidding.", CONTINUE);
    heir.setPath(0, killBanquo);

    const banquet = new Question("That night, a banquet is held in honor of your new kingship. In the middle of it, the murderers return, and one of them beckons you to come. It seems that while they killed Banquo successfully, they failed to kill Fleance. You dismiss him, but now two murders weigh on your conscience.", CONTINUE);
    killBanquo.setPath(0, banquet);

    const banquoGhost = new Question("When returning to the table, it seems a Ghost of Banquo occupies your seat to haunt you. Your spouse covers for your apparent insanity, but you both worry if all of this foul play is taking its toll on your minds.", CONTINUE);
    banquet.setPath(0, banquoGhost);

    const curiosity = new Question("You then realize that you're curious what comes next. Perhaps you could ask the witches, and they could tell you more?", [ "Seek out the witches", "Suppress your curiosity" ]);
    banquoGhost.setPath(0, curiosity);

    const noWitches = new Question("You try to forget about the witches, but it eats you up inside and causes you to forget your duties to the people of Scotland. Eventually, Malcolm returns to visit, but kills you just how you killed his father. How fitting that the original heir becomes king in the end!", RESTART);
    curiosity.setPath(1, noWitches);

    // ACT 4

    const witchesQuestions = new Question("");
    curiosity.setPath(0, witchesQuestions);
    
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
