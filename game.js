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
  
  // Get the current day of the month and use it for image selection
  let currentCountyIndex = new Date().getDate() % countyImages.length;
  let correctAnswer = countyImages[currentCountyIndex].replace('.svg', ''); // Get the state name from the file name
  
  // Display the county image for today
  document.getElementById('county-image').src = 'images4/' + countyImages[currentCountyIndex];
  
  let attemptsLeft = 5;
  let incorrectGuesses = []; // Array to store incorrect guesses
  
  document.getElementById('submit-guess').addEventListener('click', function () {
    const userGuess = document.getElementById('guess-input').value.trim().toLowerCase();
    const correctAnswerLower = correctAnswer.toLowerCase();
  
    if (userGuess === correctAnswerLower) {
      document.getElementById('feedback').textContent = 'Correct!';
      document.getElementById('feedback').style.color = 'green';
      // Optionally load next county or reset for the next day
    } else {
      attemptsLeft--;
      document.getElementById('attempts-left').textContent = `Attempts left: ${attemptsLeft}`;
      document.getElementById('guess-input').value = ''; // Clear the input box
      incorrectGuesses.push(userGuess); // Add incorrect guess to the array
  
      // Display the list of incorrect guesses below the input box
      const incorrectList = document.getElementById('incorrect-guesses');
      incorrectList.innerHTML = ''; // Clear previous incorrect guesses
      incorrectGuesses.forEach(guess => {
        const listItem = document.createElement('li');
        listItem.textContent = guess;
        incorrectList.appendChild(listItem);
      });
  
      if (attemptsLeft === 0) {
        document.getElementById('feedback').textContent = `Game Over! The correct answer was: ${correctAnswer}`;
        document.getElementById('feedback').style.color = 'red';
        // Optionally reset the game or prepare for the next day
      } else {
        document.getElementById('feedback').textContent = 'Incorrect, try again!';
        document.getElementById('feedback').style.color = 'orange';
      }
    }
  });
  