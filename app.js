const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "I think, therefore I am.",
    "Better late than never.",
    "Actions speak louder than words.",
    "A picture is worth a thousand words.",
    "When in Rome, do as the Romans do.",
    "The pen is mightier than the sword.",
    "Fortune favors the bold.",
    "Birds of a feather flock together.",
    "Practice makes perfect.",
    "Absence makes the heart grow fonder.",
    "A watched pot never boils.",
    "You can't judge a book by its cover.",
    "The early bird catches the worm.",
    "Rome wasn't built in a day.",
    "Every cloud has a silver lining.",
    "Don't count your chickens before they hatch.",
    "Time and tide wait for none.",
    "The grass is always greener on the other side.",
    "A rolling stone gathers no moss.",
    "Too many cooks spoil the broth.",
    "Necessity is the mother of invention."
];

const sentences2 = [
    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    "The only thing we have to fear is fear itself, nameless, unreasoning, unjustified terror which paralyzes needed efforts to convert retreat into advance.",
    "In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move.",
    "All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.",
    "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.",
    "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    "In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
    "Two roads diverged in a wood, and I—I took the one less traveled by, and that has made all the difference.",
    "It is a melancholy object to those who walk through this great town, or travel in the country, when they see the streets, the roads, and cabin-doors crowded with beggars of the female sex, followed by three, four, or six children, all in rags, and importuning every passenger for an alms."
];

let currentSentence = "";
let startTime = 0;

let timerStarted = false;

let level = "easy";  
let sentenceSet = sentences;  


const sentenceElement = document.getElementById('sentence');
const userInput = document.getElementById('userInput');

const wpmElement = document.getElementById('wpm');
const resetBtn = document.getElementById('resetBtn');


const nextBtn = document.getElementById('nextBtn');

const highlightedTextElement = document.getElementById('highlightedText');

const easyBtn = document.getElementById('easy');
const hardBtn = document.getElementById('hard');

function startTest() {
    currentSentence = sentenceSet[Math.floor(Math.random() * sentenceSet.length)];
    sentenceElement.innerText = currentSentence;
    userInput.value = "";

    userInput.disabled = false;

    userInput.focus();


    startTime = 0;
    timerStarted = false;
    highlightedTextElement.innerHTML = ""; 
}

function startTimer() {
    if (!timerStarted) {
        startTime = new Date().getTime();

        timerStarted = true;
    }
}

function calculateWPM() {
    const elapsedTime = (new Date().getTime() - startTime) / 1000 / 60; 

    const wordCount = userInput.value.trim().split(/\s+/).length;
    const wpm = Math.round(wordCount / elapsedTime);
    return wpm;
}

    function checkInput() {
    startTimer();
    const typedText = userInput.value;
    let formattedText = "";

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentSentence[i]) {

            formattedText += `<span>${typedText[i]}</span>`;
        } else {
            formattedText += `<span style="color: red;">${typedText[i]}</span>`;
        }
    }

    formattedText += `<span style="color: #ccc;">${currentSentence.substring(typedText.length)}</span>`;
    highlightedTextElement.innerHTML = formattedText;


    if (typedText === currentSentence) {
        userInput.disabled = true;
        const wpm = calculateWPM();

        wpmElement.innerText = wpm;
    }
}

resetBtn.addEventListener('click', () => {
    userInput.value = "";
    userInput.disabled = false;


    userInput.focus();
    startTime = 0;
    timerStarted = false;


    wpmElement.innerText = "0";
    highlightedTextElement.innerHTML = ""; 
});

nextBtn.addEventListener('click', () => {
    startTest();


    wpmElement.innerText = "0";
});

easyBtn.addEventListener('click', () => {
    level = "easy";
    sentenceSet = sentences;

    startTest();
});

hardBtn.addEventListener('click', () => {
    level = "hard";
    sentenceSet = sentences2;

    startTest();
});

userInput.addEventListener('input', checkInput);


window.onload = startTest;
