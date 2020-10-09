// Level variable
const levels = {
    easy: 5,
    medium: 3,
    hard: 2
};

//default is easy
let currentLevel = levels[localStorage.getItem('defaultLevel')] || levels.easy;
let time;
let score = 0;
let isPlaying;
let stopped;
let cd;
let gamesCounter = 0;

const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const startGameBtn = document.querySelector("#startGameBtn");
const stopGameBtn = document.querySelector("#stopGameBtn");
const chooseLevel = document.querySelector("#chooseLevel");
const bestScoreModal = document.querySelector("#bestScoreModal");
const bestscore = document.querySelector("#bestScore");
const bestscoreEm = document.querySelector("#bestscoreEm");
const bestScoreModalBody = document.querySelector("#bestScoreModalBody");
const yourScoresModal = document.querySelector("#yourScoresModal");
const yourScoresTbody = document.querySelector("#yourScoresTbody");
const words = [
    'hat', 'cat', 'generate', 'sttuborn', 'joke', 'coder', 'take', 'think', 'country', 'no', 'are', 'a', 'here', 'city', 'always', 'land',
    'sound', 'along', 'later', 'out', 'the', 'read', 'number', 'most', 'both', 'open',
    'high', 'sometimes', 'while', 'every', 'must', 'has', 'between', 'read', 'too',
    'an', 'has', 'sometimes', 'add', 'leave', 'found', 'too', 'so', 'story', 'carry',
    'home', 'line', 'face', 'while', 'animal', 'between', 'seem', 'earth', 'have',
    'come', 'being', 'right', 'know', 'next', 'light', 'group', 'it', 'get', 'children',
    'where', 'white', 'point', 'different', 'did', 'those', 'live', 'together', 'who',
    'same', 'end', 'put', 'there', 'could', 'live', 'do', 'fall', 'being', 'you', 'along', "paddle", "answer", "awesome", "distance", "fertile", "wakeful", "belief",
    "slippery", "bizarre", "learned", "vivacious", "grandmother", "illegal", "thirsty",
    "wholesale", "tenuous", "skillful", "deteriorate", "poised", "humorous",
    "scrape", "replace", "languid", "adjoining", "interesting", "stranger",
    "polite", "scissors", "brainy", "interrogation", 'brain', 'branch', 'brass', 'brave', 'bread', 'break', 'breakfast', 'breath',
    'breathe', 'breathing', 'breeze', 'brick', 'bridge', 'brief', 'bright', 'bring',
    'broad', 'broke', 'broken', 'brother', 'brought', 'brown', 'brush', 'buffalo',
    'build', 'building', 'built', 'buried', 'burn', 'burst', 'bus', 'bush',
    'business', 'busy', 'but', 'butter', 'buy', 'by', 'cabin', 'cage',
    'cake', 'call', 'calm', 'came', 'camera', 'camp', 'can', 'canal',
    'cannot', 'cap', 'capital', 'captain', 'captured', 'car', 'carbon', 'card',
    'care', 'careful', 'carefully', 'carried', 'carry', 'case', 'cast', 'castle',
    'cat', 'catch', 'cattle', 'caught', 'cause', 'cave', 'cell', 'cent',
    'center', 'central', 'century', 'certain', 'certainly', 'chain', 'chair', 'chamber',
    'chance', 'change', 'changing', 'chapter', 'character', 'characteristic', 'charge', 'chart',
    'check', 'cheese', 'chemical', 'chest', 'chicken', 'chief', 'child', 'children',
    'choice', 'choose', 'chose', 'chosen', 'church', 'circle', 'circus', 'citizen',
    'city', 'class', 'classroom', 'claws', 'clay', 'clean', 'clear', 'clearly',
    'climate', 'climb', 'clock', 'close', 'closet', 'closely', 'closer', 'cloth', 'clothes',
    'clothing', 'cloud', 'club', 'coach', 'coal', 'coast', 'coat', 'codepen', 'coffee',
    'cold', 'collect', 'college', 'colony', 'color', 'column', 'combination', 'combine',
    'come', 'comfortable', 'coming', 'command', 'common', 'community', 'company', 'compare',
    'compass', 'complete', 'completely', 'complex', 'composed', 'composition', 'compound', 'concerned',
    'condition', 'congress', 'connected', 'consider', 'consist', 'consonant', 'constantly', 'construction',
    'contain', 'continent', 'continued', 'contrast', 'control', 'conversation', 'cook', 'cookies',
    'cool', 'copper', 'copy', 'corn', 'corner', 'correct', 'correctly', 'cost',
    'cotton', 'could', 'count', 'country', 'couple', 'courage', 'course', 'court',
    'cover', 'cow', 'cowboy', 'crack', 'cream', 'create', 'creature', 'crew',
    'crop', 'cross', 'crowd', 'cry', 'cup', 'curious', 'current', 'curve',
    'customs', 'cut', 'cutting', 'daily', 'damage', 'dance', 'danger', 'dangerous',
    'dark', 'darkness', 'date', 'daughter', 'dawn', 'day', 'dead', 'deal',
    'dear', 'death', 'decide', 'declared', 'deep', 'deeply', 'deer', 'definition',
    'degree', 'depend', 'depth', 'describe', 'desert', 'design', 'desk', 'detail',
    'determine', 'develop', 'development', 'diagram', 'diameter', 'did', 'die', 'differ',
    'difference', 'different', 'difficult', 'difficulty', 'dig', 'dinner', 'direct', 'direction',
    'directly', 'dirt', 'dirty', 'disappear', 'discover', 'discovery', 'discuss', 'discussion',
    'disease', 'dish', 'distance', 'distant', 'divide', 'division', 'do', 'doctor',
    'does', 'dog', 'doing', 'doll', 'dollar', 'done', 'donkey', 'door',
    'dot', 'double', 'doubt', 'down', 'dozen', 'draw', 'drawn', 'dream',
    'dress', 'drew', 'dried', 'drink', 'drive', 'driven', 'driver', 'driving',
    'drop', 'dropped', 'drove', 'dry', 'duck', 'due', 'dug', 'dull',
    'during', 'dust', 'duty', 'each', 'eager', 'ear', 'earlier', 'early',
    'earn', 'earth', 'easier', 'easily', 'east', 'easy', 'eat', 'eaten',
    'edge', 'education', 'effect', 'effort', 'egg', 'eight', 'either', 'electric',
    'electricity', 'element', 'elephant', 'eleven', 'else', 'empty', 'end', 'enemy',
];

//Setting for the bestScore
bestscore.innerHTML = localStorage.getItem("bestScore") || 0;
//listener for change level
chooseLevel.addEventListener("change", changeLevel);
//when pressed game start
startGameBtn.addEventListener("click", init);
//when press game stop
stopGameBtn.addEventListener("click", stopGame);
//when input starts
wordInput.addEventListener('input', clearMessage);
//initialize seconds
seconds.innerHTML = currentLevel;
//initialize level
chooseLevel.value = localStorage.getItem('defaultLevel') || 'easy';

function changeLevel() {
    //update values
    currentLevel = levels[chooseLevel.value];
    seconds.innerHTML = currentLevel;
    time = currentLevel;
    //set in local storage
    localStorage.setItem('defaultLevel', chooseLevel.value);
}
//Initialize Game
function init() {
    message.innerHTML = "";
    //assign time
    time = currentLevel;
    //game is started
    stopped = false;
    //hide start Btn
    startGameBtn.classList.add("d-none");
    //show stop btn
    stopGameBtn.classList.remove("d-none");
    //disable choose level
    chooseLevel.disabled = true;
    //show a random word
    showWord(words);
    //Start matching on word input
    wordInput.addEventListener("input", startMatch);
    //Countdwon
    cd = setInterval(countDown, 1000);
    //Check game status
    setInterval(checkStatus, 50);
}

function startMatch() {
    if (!stopped) {
        if (matchWords()) {
            isPlaying = true;
            time = currentLevel + 1;
            showWord(words);
            wordInput.value = "";
            score++;
        }
        if (score === -1) scoreDisplay.innerHTML = 0;
        else scoreDisplay.innerHTML = score;
    }
}

function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = "Correct";
        message.style.color = "#15d649";
        return true;
    } else {
        return false;
    }
}

function showWord(words) {
    const randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex];
}

function countDown() {
    if (!stopped) {
        if (time > 0) {
            //Decrement
            time--;
        } else if (time === 0) {
            //increment game Counter
            gamesCounter++;
            //Register score in table
            addNewScore(score);
            //Register score in local storage if is the best

            if (score > localStorage.getItem("bestScore")) {
                newBestScore();
            }
            $(stopGameBtn).trigger("click");
            message.innerHTML = "";
            // Game is over
            isPlaying = false;
        }
        //Show time
        timeDisplay.innerHTML = time;
    }
}

function checkStatus() {
    if (!stopped) {
        if (!isPlaying && time === 0) {
            message.innerHTML = "Game Over";
            message.style.color = "red";
            score = -1;
        }
    }
}

function stopGame() {
    //hide stop btn
    stopGameBtn.classList.add("d-none");
    //show start btn
    startGameBtn.classList.remove("d-none");
    //clear message
    clearMessage();
    //enable choose level
    chooseLevel.disabled = false;
    //stopping all
    stopped = true;
    //increment game Counter
    gamesCounter++;
    //Register score in table
    addNewScore(score);
    //Register score in local storage if is the best
    if (score > localStorage.getItem("bestScore")) {
        newBestScore();
    }
    //reset score
    score = 0;
    scoreDisplay.innerHTML = 0;
    //reset time
    clearInterval(cd);
}

function newBestScore() {
    //set new best score
    localStorage.setItem("bestScore", score);
    //show message
    $(bestScoreModal).modal("toggle");
    bestscoreEm.innerHTML = score;
    bestscore.innerHTML = score;
}

function addNewScore(score) {
    //first col
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let content = document.createTextNode(gamesCounter);
    td.appendChild(content);
    tr.appendChild(td);
    //second col
    td = document.createElement("td");
    content = document.createTextNode(score);
    td.appendChild(content);
    tr.appendChild(td);
    yourScoresTbody.prepend(tr);
}

function clearMessage() {
    message.innerHTML = '';
}