const countyImages = [
    'Bedfordshire.svg',
    'Berkshire.svg',
    'Bristol.svg',
    'Buckinghamshire.svg',
    'Cambridgeshire.svg',
    'Cheshire.svg',
    'City of London.svg',
    'Cornwall.svg',
    'Cumbria.svg',
    'Derbyshire.svg',
    'Devon.svg',
    'Dorset.svg',
    'Durham.svg',
    'East Riding of Yorkshire.svg',
    'East Sussex.svg',
    'Essex.svg',
    'Gloucestershire.svg',
    'Greater London.svg',
    'Greater Manchester.svg',
    'Hampshire.svg',
    'Herefordshire.svg',
    'Hertfordshire.svg',
    'Isle of Wight.svg',
    'Kent.svg',
    'Lancashire.svg',
    'Leicestershire.svg',
    'Lincolnshire.svg',
    'Merseyside.svg',
    'Norfolk.svg',
    'North Yorkshire.svg',
    'Northamptonshire.svg',
    'Northumberland.svg',
    'Nottinghamshire.svg',
    'Oxfordshire.svg',
    'Rutland.svg',
    'Shropshire.svg',
    'Somerset.svg',
    'South Yorkshire.svg',
    'Staffordshire.svg',
    'Suffolk.svg',
    'Surrey.svg',
    'Tyne and Wear.svg',
    'Warwickshire.svg',
    'West Midlands.svg',
    'West Sussex.svg',
    'West Yorkshire.svg',
    'Wiltshire.svg',
    'Worcestershire.svg'
];

let currentCountyIndex = Math.floor(Math.random() * countyImages.length);
let attemptsLeft = 5;
let incorrectGuesses = [];
let correctAnswer = countyImages[currentCountyIndex].replace('.svg', '');
let gameOver = false;

document.getElementById('county-image').src = 'images4/' + countyImages[currentCountyIndex];
document.getElementById('attempts-left').value = `Attempts left: ${attemptsLeft}`;

function showModal(message) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <p>${message}</p>
        <button class="modal-button" onclick="closeModal()">OK</button>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
    document.body.removeChild(modal);
}

document.getElementById('submit-guess').addEventListener('click', function () {
    if (gameOver) return;

    const userGuess = document.getElementById('guess-input').value.trim().toLowerCase();
    const correctAnswerLower = correctAnswer.toLowerCase();

    if (userGuess === correctAnswerLower) {
        document.getElementById('feedback').textContent = `The correct County was ${correctAnswer}. You know your County Lines!`;
        document.getElementById('feedback').style.color = 'green';
        showModal(`The correct County was ${correctAnswer}. You know your County Lines!`);
        gameOver = true;
    } else {
        attemptsLeft--;
        document.getElementById('attempts-left').value = `Attempts left: ${attemptsLeft}`;
        incorrectGuesses.push(userGuess);
        document.getElementById('attempts-left-' + attemptsLeft).value = userGuess;

        if (attemptsLeft === 0) {
            document.getElementById('feedback').textContent = `The correct County was ${correctAnswer}. You are in a Right State!`;
            document.getElementById('feedback').style.color = 'red';
            showModal(`The correct County was ${correctAnswer}. You are in a Right State!`);
            gameOver = true;
        } else {
            document.getElementById('feedback').textContent = 'Incorrect, try again!';
            document.getElementById('feedback').style.color = 'orange';
        }
    }

    if (gameOver) {
        document.getElementById('guess-input').disabled = true;
        document.getElementById('submit-guess').disabled = true;
    }

    document.getElementById('guess-input').value = '';
});

document.getElementById('reload-button').addEventListener('click', function () {
    // Reset the game state
    attemptsLeft = 5;
    incorrectGuesses = [];
    gameOver = false;

    // Clear previous attempts and feedback
    for (let i = 0; i <= 4; i++) {
        document.getElementById('attempts-left-' + i).value = '';
    }
    document.getElementById('feedback').textContent = '';
    document.getElementById('attempts-left').value = `Attempts left: ${attemptsLeft}`;

    // Pick a new county and update the image and answer
    currentCountyIndex = Math.floor(Math.random() * countyImages.length);
    correctAnswer = countyImages[currentCountyIndex].replace('.svg', '');
    document.getElementById('county-image').src = 'images4/' + countyImages[currentCountyIndex];

    // Re-enable the guess input and submit button
    document.getElementById('guess-input').disabled = false;
    document.getElementById('submit-guess').disabled = false;
    document.getElementById('guess-input').value = '';

    // Remove any previous pop-up or modal
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }

    // Remove any previous correct answer display
    const correctAnswerElement = document.querySelector('.correct-answer');
    if (correctAnswerElement) {
        correctAnswerElement.remove();
    }

    // Remove feedback for new game
    document.getElementById('feedback').textContent = '';
});
