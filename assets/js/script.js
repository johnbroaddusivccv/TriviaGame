var index = 0;
var countdownTimer = {
  time: 30,
  reset: function() {
    this.time = 30;
    $(".timer").html("<h3>" + this.time + " seconds remaining</h3>");
  },
  start: function() {
    counter = setInterval(countdownTimer.count, 1000);
  },
  stop: function() {
    clearInterval(counter);
  },
  count: function() {
    countdownTimer.time--;
    console.log(countdownTimer.time);

    // Time Runs Out ================================================
    if (countdownTimer.time >= 0) {
      $(".timer").html(
        "<h3>" + countdownTimer.time + " seconds remaining</h3>"
      );
    } else {
      index++;
      answerWrong();
      countdownTimer.reset();
      if (index < questionArray.length) {
        loadQuestion(index);
      } else {
        $(".answerchoice").hide();
        showScore();
      }
    }
  }
};

// Questions ========================================================
var correct = 0;
var wrong = 0;
var q1 = {
  question: 'Who played Carlton on the "Fresh Prince Of Bel-Air"?',
  possibleAnswers: [
    "A. Rick Astley",
    "B. Wesley Snipes",
    "C. Alfonso Ribeiro",
    "D. Will Smith"
  ],
  flags: [false, false, true, false],
  answer: "C. Alfonso Ribeiro"
};

var q2 = {
  question: 'How many kids Did Roseanne have on the show "Roseanne?',
  possibleAnswers: ["A. 2", "B. 3", "C. 4", "D. 5"],
  flags: [false, true, false, false],
  answer: "B. 3"
};

var q3 = {
  question: "What was George Lopez's neighbours name?",
  possibleAnswers: ["A. Brent", "B. Ernie", "C. Robert", "D. Carlos"],
  flags: [false, true, false, false],
  answer: "B. Ernie"
};

var q4 = {
  question: 'What year was "Home Improvement" aired?',
  possibleAnswers: ["A. 1991", "B. 2006", "C. 2001", "D. 2013"],
  flags: [true, false, false, false],
  answer: "A. 1991"
};

var q5 = {
  question: 'What is the name of Ross and Rachel\'s daughter on "Friends?"',
  possibleAnswers: ["Christina", "B. Emma", "C. Jackie", "D. Isabella"],
  flags: [false, true, false, false],
  answer: "B. Emma"
};

var q6 = {
  question: 'Who is the oldest of the three daughters on "Full House"?',
  possibleAnswers: ["A. DJ", "B. Kimmy Gibbler", "C. Stephanie", "D. Michelle"],
  flags: [true, false, false, false],
  answer: "A. DJ"
};

var q7 = {
  question: "Which Nick @ Nite Dad works at Powers Brother Aviation",
  possibleAnswers: [
    "A. Danny Tanner",
    "B. Ray Barone",
    "C. George Lopez",
    "D. Pharrell Williams"
  ],
  flags: [false, false, true, false],
  answer: "C. George Lopez"
};

var questionArray = [q1, q2, q3, q4, q5, q6, q7];

// Question & Answers in Document ===================================
function theQuestion(questionSelection) {
  console.log(questionSelection);
  countdownTimer.reset();
  $(".question").html(
    "<h3>" + questionArray[questionSelection].question + "</h3>"
  );
  $("#buttonA")
    .text(questionArray[questionSelection].possibleAnswers[0])
    .show();
  $("#buttonB")
    .text(questionArray[questionSelection].possibleAnswers[1])
    .show();
  $("#buttonC")
    .text(questionArray[questionSelection].possibleAnswers[2])
    .show();
  $("#buttonD")
    .text(questionArray[questionSelection].possibleAnswers[3])
    .show();
}

// Start Button & Game Setup ========================================
function setup() {
  index = 0;
  $(".question").append(
    '<button id="startButton">Click This To Play!</button>'
  );
  $("#startButton").on("click", function() {
    $(this).hide();
    countdownTimer.start();
    theQuestion(index);
  });
}

function getAnswer() {
  $(".answerchoice").on("click", function() {
    console.log("alert", index);
    index++;
    console.log("click", index);
    $(".question").text("");
    $("#buttonA").text("");
    $("#buttonB").text("");
    $("#buttonC").text("");
    $("#buttonD").text("");
    theQuestion();
  });
}

function answerCorrect() {
  correct++;
  alert("Correct!");
  console.log("correct");
}

function answerWrong() {
  wrong++;
  alert("Incorrect!");
  console.log("wrong");
}
// Score Board ======================================================
function showScore() {
  $(".question").empty();
  $(".question").append("<h2><p>" + correct + " correct</p></h2>");
  $(".question").append("<h2><p>" + wrong + " incorrect</p></h2>");
  countdownTimer.stop();
  $(".timer").empty();

}
setup();
$(".answerchoice").on("click", function() {
  console.log($(this));
  if (this.id == "buttonA") {
    var answerChosen = "A";
  } else if (this.id == "buttonB") {
    answerChosen = "B";
  } else if (this.id == "buttonC") {
    answerChosen = "C";
  } else if (this.id == "buttonD") {
    answerChosen = "D";
  }
  if (answerChosen == "A" && questionArray[index].flags[0] == true) {
    answerCorrect();
  } else if (answerChosen == "A") {
    answerWrong();
  }
  if (answerChosen == "B" && questionArray[index].flags[1] == true) {
    answerCorrect();
  } else if (answerChosen == "B") {
    answerWrong();
  }
  if (answerChosen == "C" && questionArray[index].flags[2] == true) {
    answerCorrect();
  } else if (answerChosen == "C") {
    answerWrong();
  }
  if (answerChosen == "D" && questionArray[index].flags[3] == true) {
    answerCorrect();
  } else if (answerChosen == "D") {
    answerWrong();
  }

  $(".question").text("");
  $("#buttonA").text("");
  $("#buttonB").text("");
  $("#buttonC").text("");
  $("#buttonD").text("");
  index++;
  if (index < questionArray.length) {
    theQuestion(index);
  } else {
    $(".answerchoice").hide();
    showScore();
  }
});
