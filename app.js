// *********************** Variables *********************** //
let playing = false;
let score;
let action;
let timeremaining;
let correctAnswer;
let scoreValue = document.getElementById("scoreValue");
let correct = document.getElementById("correct");
let wrong = document.getElementById("wrong");
let question = document.getElementById("question");
let startreset = document.getElementById("startreset");
let timeRemaining = document.getElementById("timeRemaining");
let timeRemainingVal = document.getElementById("timeRemainingVal");
let gameOver = document.getElementById("gameOver");

// *********************** LOGIC *********************** //
// When we click on start/reset button
startreset.addEventListener("click", () => {
  // If we are playing already
  if (playing == true) {
    // Reload the page
    window.location.reload();
  } else {
    playing = true;
    // If you we are not playing already
    score = 0;
    // Set the sccore to 0
    scoreValue.innerHTML = score;
    // Show count down box
    timeRemaining.style.display = "block";
    // Change button to reset
    startreset.innerHTML = "Reset Game";
    // Hide time gameOver box
    hide("gameOver");
    // Count time
    timeremaining = 60;
    startCoundown();
    // Generate new Q & A
    generateQA();
  }
});
// if we click on answer box
for (i = 1; i <= 4; i++) {
  document.getElementById("box" + i).onclick = function () {
    // if we are playing
    if (playing == true) {
      // correct
      if (this.innerHTML == correctAnswer) {
        // increase the score by 1
        score++;
        scoreValue.innerHTML = score;
        // Show the correct box for 1 sec
        hide("wrong");
        show("correct");
        setTimeout(() => {
          hide("correct");
        }, 1000);
        // generate new question and answer
        generateQA();
      } else {
        hide("correct");
        show("wrong");
        setTimeout(() => {
          hide("wrong");
        }, 1000);
      }
    }
  };
}

// wrong
// show try again box for 1 sec

// FUNCTIONS
function startCoundown() {
  action = setInterval(() => {
    // Reduce the time by 1sec in loop
    // if Yes -> continue
    timeremaining -= 1;
    timeRemainingVal.innerHTML = timeremaining;
    // Anytime left?
    if (timeremaining == 0) {
      clearInterval(action);
      // if not -> gameover
      show("gameOver");
      gameOver.innerHTML =
        "<p>Game Over</p> <p>Your Score is " + score + "</p>";
      hide("timeRemaining");
      hide("correct");
      hide("wrong");
      // set playing mode to false
      playing = false;
      startreset.innerHTML = "Start Game";
    }
  }, 1000);
}
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}
function show(Id) {
  document.getElementById(Id).style.display = "block";
}
function generateQA() {
  let x = 1 + Math.round(9 * Math.random());
  let y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;
  question.innerHTML = x + "x" + y;
  let correctPosition = 1 + Math.round(3 * Math.random());
  // Fill one box with correct answer
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
  let answers = [correctAnswer];
  for (i = 1; i <= 4; i++) {
    if (i != correctPosition) {
      let wrongAnswers;
      do {
        wrongAnswers =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random()));
      } while (answers.indexOf(wrongAnswers) > -1);
      document.getElementById("box" + i).innerHTML = wrongAnswers;
      answers.push(wrongAnswers);
    }
  }
}
