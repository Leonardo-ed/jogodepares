const cardValues = ['CACTO', 'CACTO', 'EGITO', 'EGITO', 'AREIA', 'AREIA', 'VENTO', 'VENTO', "AGUA","AGUA","FARAÓ","FARAÓ"];
let cards = [];
let firstCard = null;
let secondCard = null;
let isFlipping = false;
let matchedPairs = 0;
let timerInterval;
let timeElapsed = 0;

// Embaralhar as cartas
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Criar as cartas
function createCards() {
    const board = document.getElementById('game-board');
    shuffle(cardValues).forEach(value => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
        cards.push(card);
    });
    startTimer();
}

// Virar as cartas
function flipCard() {
    if (isFlipping || this === firstCard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        isFlipping = true;

        if (firstCard.dataset.value === secondCard.dataset.value) {
            matchedPairs++;
            firstCard = secondCard = null;
            isFlipping = false;

            if (matchedPairs === cardValues.length / 2) {
                clearInterval(timerInterval); // Parar o cronômetro quando todas as cartas forem encontradas
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                firstCard.textContent = '';
                secondCard.classList.remove('flipped');
                secondCard.textContent = '';
                firstCard = secondCard = null;
                isFlipping = false;
            }, 1000);
        }
    }
}

// Atualizar o cronômetro
function updateTimer() {
    timeElapsed++;
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    document.getElementById('timer').textContent = `Tempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Iniciar o cronômetro
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

// Iniciar o jogo
createCards();
