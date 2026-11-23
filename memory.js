// === HTML-element ===
let memoryContainer = document.getElementById("memoryContainer");
let newGameButton = document.getElementById("newGame");
let memoryGreta = document.getElementById("pig");
let memoryPaw = document.getElementById("paw");
let memorySpidy = document.getElementById("spidy");
let memoryPettson = document.getElementById("pettson");
let memoryBluey = document.getElementById("bluey");
let main = document.querySelector("main");
let numbers = document.getElementById("numbers");
let pairFour = document.getElementById("pairFour");
let pairSix = document.getElementById("pairSix");
let pairEight = document.getElementById("pairEight");

// === Alla teman ===
let allPicsMemoryGreta = [
    "../bilder/greta/george.jpg",
    "../bilder/greta/greta.jpg",
    "../bilder/greta/mom.jpg",
    "../bilder/greta/dad.jpg",
    "../bilder/greta/grandpa-pig.png",
    "../bilder/greta/granny.jpg",
    "../bilder/greta/bunny.png",
    "../bilder/greta/cat.jpg",
];

let allPicsMemoryPawPatrol = [
    "../bilder/paw/chase.jpg",
    "../bilder/paw/everest.jpg",
    "../bilder/paw/marshall.jpg",
    "../bilder/paw/rocky.jpg",
    "../bilder/paw/rubble.jpg",
    "../bilder/paw/sky.jpg",
    "../bilder/paw/tracker.png",
    "../bilder/paw/zuma.jpg",
];

let allPicsSpidy = [
    "../bilder/spidy/gwen.jpg",
    "../bilder/spidy/hulk.jpg",
    "../bilder/spidy/friends.jpg",
    "../bilder/spidy/spidy1.jpg",
    "../bilder/spidy/spidy2.jpg",
    "../bilder/spidy/spidy.jpg",
    "../bilder/spidy/spidy3.jpg",
    "../bilder/spidy/hulk1.jpg",
];

let allPicsPettson = [
    "../bilder/pettson/pettson1.jpg",
    "../bilder/pettson/pettson2.jpg",
    "../bilder/pettson/pettson3.jpg",
    "../bilder/pettson/pettson4.jpg",
    "../bilder/pettson/pettson5.jpg",
    "../bilder/pettson/pettson6.jpg",
    "../bilder/pettson/pettson7.jpg",
    "../bilder/pettson/findus.jpg",
];

let allPicsBluey = [
    "../bilder/bluey/bluey2.png",
    "../bilder/bluey/bluey3.jpg",
    "../bilder/bluey/bluey4.jpg",
    "../bilder/bluey/bluey5.png",
    "../bilder/bluey/bluey6.jpg",
    "../bilder/bluey/bluey7.jpg",
    "../bilder/bluey/bluey8.png",
    "../bilder/bluey/bluey9.png",
    "../bilder/bluey/bluey10.png",
    "../bilder/bluey/bluey11.png",
];

// === Speldata ===
let currentThemeImages = [];
let currentTheme = [];
let currentBackImage = "";
let flippedCards = [];
let lockBoard = false;
let pairCount = 4;

// === Funktion: Slumpa bilder ===
function pickRandomImages(imageArray, count) {
    let copy = [...imageArray];
    let picked = [];

    for (let i = 0; i < count && copy.length > 0; i++) {
        const index = Math.floor(Math.random() * copy.length);
        picked.push(copy[index]);
        copy.splice(index, 1);
    }

    return picked;
}

// === Funktion: Starta nytt spel ===
function startNewGame() {
    let memoryWrapper = document.getElementById("memoryWrapper");

    memoryContainer.innerHTML = "";
    flippedCards = [];
    lockBoard = false;

    currentTheme = pickRandomImages(currentThemeImages, pairCount);

    memoryWrapper.style.display = "flex";
    memoryContainer.style.border = "1px solid black";
    newGameButton.style.display = "flex";
    numbers.style.display = "flex";
    main.appendChild(memoryWrapper);
    memoryCards();
}

// === Funktion: välj antal par ===
pairFour.addEventListener("click", function () {
    pairCount = 4;
    if (currentThemeImages.length) {
        startNewGame();
    }
});

pairSix.addEventListener("click", function () {
    pairCount = 6;
    if (currentThemeImages.length) {
        startNewGame();
    }
});

pairEight.addEventListener("click", function () {
    pairCount = 8;
    if (currentThemeImages.length) {
        startNewGame();
    }
});

// === Event listeners för teman ===
memoryGreta.addEventListener("click", function () {
    currentBackImage = "../bilder/greta/house.jpg";
    currentThemeImages = allPicsMemoryGreta;
    startNewGame();
});

memoryPaw.addEventListener("click", function () {
    currentBackImage = "../bilder/paw/paw.png";
    currentThemeImages = allPicsMemoryPawPatrol;
    startNewGame();
});

memorySpidy.addEventListener("click", function () {
    currentBackImage = "../bilder/spidy/spidyLogo.png";
    currentThemeImages = allPicsSpidy;
    startNewGame();
});

memoryPettson.addEventListener("click", function () {
    currentBackImage = "../bilder/pettson/pettsonBakgrund.jpg";
    currentThemeImages = allPicsPettson;
    startNewGame();
});

memoryBluey.addEventListener("click", function () {
    currentBackImage = "../bilder/bluey/BlueyLogo.jpg";
    currentThemeImages = allPicsBluey;
    startNewGame();
    numbers.style.display = "flex";
});

// === Event listener för Nytt spel ===
newGameButton.addEventListener("click", function () {
    let allCards = document.querySelectorAll(".card");

    // Vänta kort innan spelplanen nollställs
    setTimeout(() => {
        for (let memoryCard of allCards) {
            memoryCard.classList.remove("flipped");
        }

        setTimeout(() => {
            startNewGame();
        }, 500);
    }, 500);
});

// === Funktion: Bygg korten ===
function memoryCards() {
    // Skapa par
    let memoryPairs = [];
    for (let i = 0; i < currentTheme.length; i++) {
        memoryPairs.push(currentTheme[i]);
        memoryPairs.push(currentTheme[i]);
    }

    // Blanda
    let shuffledPics = [];
    while (memoryPairs.length > 0) {
        const index = Math.floor(Math.random() * memoryPairs.length);
        shuffledPics.push(memoryPairs[index]);
        memoryPairs.splice(index, 1);
    }

    // Skapa kort
    for (let i = 0; i < shuffledPics.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-inner"> 
                <div class="card-front" style="background-image: url('${currentBackImage}');"></div>
                <div class="card-back" style="background-image: url('${shuffledPics[i]}');"></div>
            </div>
        `;
        card.dataset.image = shuffledPics[i];
        memoryContainer.appendChild(card);
    }

    // Lägg till klickhantering
    let allCards = document.querySelectorAll(".card");

    for (let i = 0; i < allCards.length; i++) {
        let card = allCards[i];

        card.addEventListener("click", function () {
            if (
                lockBoard ||
                card.classList.contains("matched") ||
                card.classList.contains("flipped")
            ) {
                return;
            }

            card.classList.add("flipped");
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                lockBoard = true;

                const [card1, card2] = flippedCards;
                const img1 = card1.dataset.image;
                const img2 = card2.dataset.image;

                if (img1 === img2) {
                    card1.classList.add("matched");
                    card2.classList.add("matched");
                    new Audio("Ljud/win.wav").play();
                    flippedCards = [];
                    lockBoard = false;
                } else {
                    setTimeout(() => {
                        card1.classList.remove("flipped");
                        card2.classList.remove("flipped");
                        flippedCards = [];
                        lockBoard = false;
                    }, 1000);
                }
            }
        });
    }
}
