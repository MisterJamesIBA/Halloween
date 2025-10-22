// images 
const QUEST = "../img/happyhalloween_title.png";

const BASE = "../img/";

const GOOD_MORNING = new Audio('../sound/good.mp3');
const CORRECT = new Audio('../sound/correct.mp3');
const INCORRECT = new Audio('../sound/incorrect.mp3');


// dimensions of cards
const DIM = 200;

// create game
function createGame(width, height, dim) {

    // play good
    GOOD_MORNING.play();

    // add cards based on select
    let cards = [
        "candy.png",
        "frankenstein.png",
        "ghost.png",
        "mummy.png",
        "pumpkin.png",
        "reaper.png",
        "skeleton.png",
        "spider.png",
        "vampire.png",
        "witch.png",
        "zombie.png",
    ]

    // return if nothing selected 
    if (cards.length == 0) {
        return alert('nothing selected');
    }

    // get number of cards based on width and height
    let length = width * height;

    // get the number of unique cards length / 2
    let uniqueNumber = length / 2;

    // check if there are not enough selected cards for this board size
    if (uniqueNumber > cards.length) {
        return alert(`please select more cards if you want to make a ${width} by ${height} board`);
    }

    let randCards = cards.sort(() => Math.random() < 0.5);

    // create copy of cat data for number of cats being used
    let slicedCards = randCards.slice(0, length / 2);

    // create an array with two of each card
    // crate array of  cat cards two each
    let ls = Array.from({ length: slicedCards.length * 2 }, (value, index) => index % slicedCards.length).sort(() => Math.random() < 0.5);

    // make randomm again!!!
    for (let i = 0; i < ls.length; i++) {
        let a = Math.floor(Math.random() * ls.length);
        let c = ls[i];
        ls[i] = ls[a];
        ls[a] = c;
    }

    /*
    making cards time to add to the screen
    */

    // set board px w and h based on puzzle dimensions
    let cardParent = document.querySelector("#cardParent");
    console.log(dim);
    cardParent.style.width = `${dim * width}px`;
    cardParent.style.width = `${dim * height}px`;

    // clear cardParent
    cardParent.innerHTML = "";

    let cardList = [];

    let last = null;

    let wait = false;

    let score = 0;

    // store the html handlers for memeory cards to adjust later 
    // return when function is done
    let memeoryCardList = [];

    // loop through all the cards
    ls.forEach((value, index) => {

        let card = slicedCards[value];

        // get the 
        let link = card;

        let memoryCard = document.createElement('div');
        memoryCard.className = "memory-card";

        let memoryCardInner = document.createElement('div');
        memoryCardInner.className = "memory-card-inner";

        let memoryCardFront = document.createElement('div');
        memoryCardFront.className = "memory-card-front";

        let memoryCardBack = document.createElement('div');
        memoryCardBack.className = "memory-card-back";

        // back image
        let back = document.createElement('img');
        // back.width = DIM;
        // back.height = DIM;
        back.src = BASE + link;

        // front image 
        let front = document.createElement("img");
        // front.width = DIM;
        // front.height = DIM;
        front.src = QUEST;

        // add canvas to back
        memoryCardBack.appendChild(back);

        // add image to front
        memoryCardFront.appendChild(front);

        // add back and front to inner
        memoryCardInner.appendChild(memoryCardBack);
        memoryCardInner.appendChild(memoryCardFront);

        // add inner to outer
        memoryCard.appendChild(memoryCardInner);

        // add card to canvas
        cardParent.appendChild(memoryCard);

        // add to card list
        cardList.push(memoryCard);

        // add onclick listener
        memoryCard.addEventListener("click", () => {

            // already flipped 
            if (wait || cardList[index].classList.contains("flip")) {
                return;
            }

            memoryCard.classList.add('flip');

            const flipBack = () => {
                memoryCard.classList.remove('flip');
                cardList[last.index].classList.remove('flip');
                last = null;
                wait = false;
            }

            if (last != null && last.value == value) {
                last = null;
                CORRECT.play();
                score++;
                if(score >= uniqueNumber){
                    console.log("win");
                    document.querySelector("#win").classList.remove("hide");
                }
            }
            else if (last != null) {
                wait = true;
                INCORRECT.play();
                setTimeout(flipBack, 2000);
            }
            else {
                last = { value, index };
            }
        });

        // add each card to the list
        memeoryCardList.push(memoryCard);
    });

    // return when done
    return memeoryCardList;
}


window.onload = function () {

    /*
    select card dimensions
    */
    const cardDim = document.querySelector("#cardDim");
    const cardSizeOut = document.querySelector("#cardSizeOut");
    let size = 0;
    let width, height;
    let cardList;

    const getDim = () => {
        let dim = size * window.innerWidth;
        return dim;
    }

    const update = () => {
        size = Number(cardDim.value);
        cardSizeOut.innerHTML = size * 100;
        if (cardList == null || cardList.length == 0) {
            return;
        }
        let dim = getDim();
        cardList.forEach((card, index) => {

            card.setAttribute('style', `width: ${dim}px; height: ${dim}px;`);
        });

        // set board px w and h based on puzzle dimensions
        let cardParent = document.querySelector("#cardParent");
        console.log(dim, dim * width, dim * height);
        cardParent.style.width = `${dim * width}px`;
        cardParent.style.width = `${dim * height}px`;
    }

    update();

    cardDim.addEventListener("change", () => {
        update();
    });


    /*
    select grid dimensions
    */

    const thrBy4 = document.querySelector("#thrBy4");

    thrBy4.addEventListener("click", () => {
        width = 3;
        height = 4;
        cardList = createGame(3, 4, getDim());
        update();
    });

    const frBy4 = document.querySelector("#frBy4");

    frBy4.addEventListener("click", () => {
        width = 4;
        height = 4;
        cardList = createGame(4, 4, getDim());
        update();
    });

    const frBy5 = document.querySelector("#frBy5");

    frBy5.addEventListener("click", () => {
        width = 4;
        height = 5;
        cardList = createGame(4, 5, getDim());
        update();
    });
}