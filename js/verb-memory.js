const VOCAB = [
    { "past": "was", "present": "be" },
    { "past": "began", "present": "begin" },
    { "past": "broke", "present": "break" },
    { "past": "did", "present": "do" },
    { "past": "drank", "present": "drink" },
    { "past": "drove", "present": "drive" },
    { "past": "ate", "present": "eat" },
    { "past": "fell", "present": "fall" },
    { "past": "flew", "present": "fly" },
    { "past": "gave", "present": "give" },
    { "past": "went", "present": "go" },
    { "past": "grew", "present": "grow" },
    { "past": "knew", "present": "know" },
    { "past": "lay", "present": "lie" },
    { "past": "saw", "present": "see" },
    { "past": "showed", "present": "show" },
    { "past": "sang", "present": "sing" },
    { "past": "spoke", "present": "speek" },
    { "past": "swam", "present": "swim" },
    { "past": "took", "present": "take" },
    { "past": "wore", "present": "wear" },
    { "past": "wrote", "present": "write" },
    { "past": "cut", "present": "cut" },
    { "past": "hit", "present": "hit" },
    { "past": "let", "present": "let" },
    { "past": "put", "present": "put" },
    { "past": "set", "present": "set" },
    { "past": "brought", "present": "bring" },
    { "past": "built", "present": "build" },
    { "past": "bought", "present": "buy" },
    { "past": "caught", "present": "catch" },
    { "past": "felt", "present": "feel" },
    { "past": "found", "present": "find" },
    { "past": "got", "present": "get" },
    { "past": "had", "present": "have" },
    { "past": "heard", "present": "hear" },
    { "past": "kept", "present": "keep" },
    { "past": "laid", "present": "lay" },
    { "past": "left", "present": "leave" },
    { "past": "lost", "present": "lose" },
    { "past": "made", "present": "make" },
    { "past": "met", "present": "meet" },
    { "past": "read", "present": "read" },
    { "past": "said", "present": "say" },
    { "past": "sold", "present": "sell" },
    { "past": "sent", "present": "send" },
    { "past": "sat", "present": "sit" },
    { "past": "slept", "present": "sleep" },
    { "past": "spent", "present": "spend" },
    { "past": "stood", "present": "stand" },
    { "past": "taught", "present": "teach" },
    { "past": "taught", "present": "tell" },
    { "past": "thought", "present": "think" },
    { "past": "understood", "present": "understand" },
    { "past": "became", "present": "become" },
    { "past": "came", "present": "come" },
    { "past": "ran", "present": "run" },
]

const START = document.querySelector('#startScreen');
const WIN = document.querySelector('#winScreen');
const LOSE = document.querySelector('#gameOver');

const GOOD_MORNING = new Audio('../sound/good.mp3');
const CORRECT = new Audio('../sound/correct.mp3');
const INCORRECT = new Audio('../sound/incorrect.mp3');

const createCard = (word) => {

    let memoryCard = document.createElement('div');
    memoryCard.className = "memory-card";

    let memoryCardInner = document.createElement('div');
    memoryCardInner.className = "memory-card-inner";

    let memoryCardFront = document.createElement('div');
    memoryCardFront.className = "memory-card-front";

    let memoryCardBack = document.createElement('div');
    memoryCardBack.className = "memory-card-back";

    let frontImg = document.createElement("img");
    frontImg.src = "../img/halloween_mansion.png";

    let backText = `<h1>${word}</h1>`;

    memoryCardFront.appendChild(frontImg);
    memoryCardBack.innerHTML = backText;

    memoryCardInner.appendChild(memoryCardFront);
    memoryCardInner.appendChild(memoryCardBack);
    memoryCard.appendChild(memoryCardInner);

    return memoryCard;
}


const start = () => {
     GOOD_MORNING.play();
    START.classList.add("hide");
    let cardArea = document.querySelector('#cardArea');

    let COPY = VOCAB.sort(() => Math.random() - 0.5);
    let vocab = [];

    const MATCH = 20;

    for (let i = 0; i < MATCH; i++) {
        vocab.push({
            word: VOCAB[i].present,
            index: i
        });
        vocab.push({
            word: VOCAB[i].past,
            index: i
        });
    }

    vocab = vocab.sort(() => Math.random() - 0.5);

    let last = -1;
    let lastIndex = -1;

    let score = 0;

    let cards = [];

    vocab.forEach((word, index) => {
        let card = createCard(word.word);
        cards.push(card);
        cardArea.appendChild(card);

        card.addEventListener("click", () => {

            card.classList.add("flip");

            if (last == -1) {
                last = word.index;
                lastIndex = index;
            }
            else if (last == word.index) {
                CORRECT.play();
                score++;
                // match
                last = -1;
                lastIndex = -1;
            }
            else if (last != word.index) {

                setTimeout(() => {
                    INCORRECT.play();

                    card.classList.remove("flip");
                    cards[lastIndex].classList.remove("flip");

                    // not a match
                    last = -1;
                    lastIndex = -1;

                }, 1000);
            }

            if(score >= MATCH){
                console.log("win");
                WIN.classList.remove("hide");
            }


        });
    });
}

window.onload = function () {

    const startBtn = document.querySelector("#startBtn");
    startBtn.addEventListener("click", () => {
        start();
    });
}


/*
 
memory
 
*/
