import questions from "./questions.js";
console.log(questions);
let previousButton = document.getElementById("previous-button");
let nextButton = document.getElementById("next-button");
let questionElement = document.getElementById("question");
let submitAnswer = document.getElementById("answer-submit");
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
let answered = false;
submitAnswer.onclick = () => {
  let answer = document.querySelector('input[name="answer"]:checked');
  let selectedOption = answer.id;
  let answerValue = answer.value;
  let opt = questions[i].ans;
  let optionDiv = document.getElementById(
    `option-${selectedOption[selectedOption.length - 1]}`
  );
  for (let j = 0; j < 4; j++) {
    if (!answered) {
      let optionDivs = document.getElementById(`option-${j + 1}`);
      optionDivs.classList.remove("correct");
      optionDivs.classList.remove("wrong");
    }
  }
  if (!answered) {
    if (answerValue === questions[i].options[opt]) {
      console.log("correct answer");
      optionDiv.classList.add("correct");
      score++;
      //document.getElementById("score").innerHTML = score;
      answered = true;
    } else {
      console.log("wrong answer");
      optionDiv.classList.add("wrong");
      answered = true;
    }
  }
};
function addQuestion(index) {
  answered = false;
  if (index > 0) {
    previousButton.disabled = false;
  }
  if (index >= 10) {
    nextButton.disabled = true;
  }
  questionElement.innerHTML = "";
  questionElement.innerHTML = questions[index].q;
  for (let j = 0; j < 4; j++) {
    let optionDivs = document.getElementById(`option-${j + 1}`);
    optionDivs.classList.remove("correct");
    optionDivs.classList.remove("wrong");
    let option = document.getElementById(`option${j + 1}`);
    option.checked = false;
    option.value = questions[index].options[j + 1];
    let optionLabel = document.getElementById(`option-${j + 1}-label`);
    optionLabel.innerHTML = questions[index].options[j + 1];
  }
}

addQuestion(i);
function displayScore() {
  let body = document.querySelector(".q-ans");
  body.innerHTML = `Score is ${score}`;
}
