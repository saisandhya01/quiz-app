import questions from "./questions.js";

let previousButton = document.getElementById("previous-button");
let nextButton = document.getElementById("next-button");
let questionElement = document.getElementById("question");
let finishQuizButton = document.getElementById("finish-button");

let i = 0;
let score = 0;
previousButton.disabled = true;
finishQuizButton.disabled = true;
finishQuizButton.onclick = () => {
  displayScore();
};
previousButton.onclick = () => {
  i = i - 1;
  addQuestion(i);
};
nextButton.onclick = () => {
  i = i + 1;
  if (i < 10) {
    addQuestion(i);
  }
  if (i === 9) {
    nextButton.disabled = true;
    finishQuizButton.disabled = false;
  }
};

function addQuestion(index) {
  if (index === 0) {
    previousButton.disabled = true;
    nextButton.disabled = false;
    finishQuizButton.disabled = true;
  } else {
    previousButton.disabled = false;
    nextButton.disabled = false;
    finishQuizButton.disabled = true;
  }
  if (index >= 10) {
    nextButton.disabled = true;
    finishQuizButton.disabled = false;
  }
  questionElement.innerHTML = "";
  questionElement.innerHTML = questions[index].q;
  for (let j = 0; j < 4; j++) {
    let optionDivs = document.getElementById(`option-${j + 1}`);
    optionDivs.classList.remove("correct");
    optionDivs.classList.remove("wrong");
    let option = document.getElementById(`option${j + 1}`);
    option.disabled = false;
    option.checked = false;
    option.value = questions[index].options[j + 1];
    let optionLabel = document.getElementById(`option-${j + 1}-label`);
    optionLabel.innerHTML = questions[index].options[j + 1];

    //if question not answered
    if (!questions[index].answered) {
      let correctAnswer = questions[index].ans;
      option.onclick = () => {
        questions[index].answered = true;
        questions[index].selectedAnswer = j + 1;
        let optionDiv = document.getElementById(`option-${j + 1}`);
        if (option.value === questions[index].options[correctAnswer]) {
          optionDiv.classList.add("correct");
          score++;
        } else {
          optionDiv.classList.add("wrong");
        }
        //disable all options if one option is clicked
        for (let k = 1; k <= 4; k++) {
          if (k !== j + 1) {
            document.getElementById(`option${k}`).disabled = true;
          }
        }
      };
    } else {
      let optionDiv = document.getElementById(`option-${j + 1}`);
      if (questions[index].selectedAnswer === questions[index].ans) {
        if (j + 1 === questions[index].selectedAnswer) {
          optionDiv.classList.add("correct");
          option.checked = true;
        }
      } else {
        if (j + 1 === questions[index].selectedAnswer) {
          optionDiv.classList.add("wrong");
          option.checked = true;
        }
      }
      for (let k = 1; k <= 4; k++) {
        if (k !== questions[index].selectedAnswer) {
          document.getElementById(`option${k}`).disabled = true;
        }
      }
    }
  }
}

addQuestion(i);
function displayScore() {
  let body = document.querySelector(".main");
  body.innerHTML = `Your Score is ${score}`;
}
