const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const feedbackElement = document.getElementById("feedback");

const questionCounterElement = document.getElementById("question-counter");
const totalQuestionsElement = document.getElementById("total-questions");
const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("final-score");
const feedbackMessageElement = document.getElementById("feedback-message");
const progressFillElement = document.getElementById("progress-fill");

const questions = [
  {
    question: "Liverpool FC ก่อตั้งในปีใด?",
    answers: [
      { text: "1892", correct: true },
      { text: "1888", correct: false },
      { text: "1895", correct: false },
      { text: "1900", correct: false },
    ],
  },
  {
    question: "สนามเหย้าของ Liverpool FC คือสนามอะไร?",
    answers: [
      { text: "Old Trafford", correct: false },
      { text: "Anfield", correct: true },
      { text: "Stamford Bridge", correct: false },
      { text: "Emirates Stadium", correct: false },
    ],
  },
  {
    question: "สีประจำทีม Liverpool FC คือสีอะไร?",
    answers: [
      { text: "แดงและขาว", correct: true },
      { text: "น้ำเงินและขาว", correct: false },
      { text: "เขียวและขาว", correct: false },
      { text: "เหลืองและดำ", correct: false },
    ],
  },
  {
    question: "Liverpool คว้าแชมป์ Premier League ครั้งแรกในปีใด?",
    answers: [
      { text: "2019/2020", correct: true },
      { text: "2018/2019", correct: false },
      { text: "2020/2021", correct: false },
      { text: "2017/2018", correct: false },
    ],
  },
  {
    question: "ผู้เล่นที่ทำประตูให้ Liverpool มากที่สุดคือใคร?",
    answers: [
      { text: "Steven Gerrard", correct: false },
      { text: "Ian Rush", correct: true },
      { text: "Kenny Dalglish", correct: false },
      { text: "Michael Owen", correct: false },
    ],
  },
  {
    question: "Liverpool คว้าแชมป์ Champions League/UEFA Cup กี่ครั้ง?",
    answers: [
      { text: "5 ครั้ง", correct: false },
      { text: "6 ครั้ง", correct: true },
      { text: "7 ครั้ง", correct: false },
      { text: "4 ครั้ง", correct: false },
    ],
  },
  {
    question: "ปีที่ Liverpool คว้าแชมป์ Champions League ครั้งล่าสุดคือปีใด?",
    answers: [
      { text: "2018", correct: false },
      { text: "2019", correct: true },
      { text: "2020", correct: false },
      { text: "2021", correct: false },
    ],
  },
  {
    question: "ผู้จัดการทีม Liverpool คนปัจจุบันคือใคร?",
    answers: [
      { text: "Jurgen Klopp", correct: false },
      { text: "Arne Slot", correct: true },
      { text: "Pep Guardiola", correct: false },
      { text: "Mikel Arteta", correct: false },
    ],
  },
  {
    question: "Liverpool คว้าแชมป์ FA Cup กี่ครั้ง?",
    answers: [
      { text: "6 ครั้ง", correct: false },
      { text: "7 ครั้ง", correct: false },
      { text: "8 ครั้ง", correct: true },
      { text: "9 ครั้ง", correct: false },
    ],
  },
  {
    question: "ผู้เล่นที่เล่นให้ Liverpool มากที่สุดคือใคร?",
    answers: [
      { text: "Steven Gerrard", correct: false },
      { text: "Ian Callaghan", correct: true },
      { text: "Kenny Dalglish", correct: false },
      { text: "Jamie Carragher", correct: false },
    ],
  },
];

let currentQuestionIndex;
let score;

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", startGame);

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.innerText = score;
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  totalQuestionsElement.innerText = questions.length;
  updateProgressBar();
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionCounterElement.innerText = currentQuestionIndex + 1;
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    button.style.animationDelay = `${index * 0.1}s`;
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Disable all buttons immediately
  Array.from(answerButtonsElement.children).forEach((button) => {
    button.disabled = true;
    setStatusClass(button, button.dataset.correct === "true");
  });

  if (isCorrect) {
    score++;
    scoreElement.innerText = score;
    feedbackElement.innerText = "🎉 ถูกต้อง! เยี่ยมมาก!";
    feedbackElement.style.color = "#28a745";
    feedbackElement.style.background =
      "linear-gradient(135deg, rgba(40, 167, 69, 0.1), rgba(32, 201, 151, 0.1))";
    feedbackElement.style.border = "1px solid rgba(40, 167, 69, 0.3)";
  } else {
    feedbackElement.innerText = "❌ ผิด! ลองใหม่อีกครั้ง";
    feedbackElement.style.color = "#dc3545";
    feedbackElement.style.background =
      "linear-gradient(135deg, rgba(220, 53, 69, 0.1), rgba(231, 76, 60, 0.1))";
    feedbackElement.style.border = "1px solid rgba(220, 53, 69, 0.3)";
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 2000);
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScoreElement.innerText = `${score} / ${questions.length}`;

  const percentage = (score / questions.length) * 100;
  if (percentage >= 80) {
    feedbackMessageElement.innerText =
      "🏆 สุดยอดไปเลย! คุณคือแฟนพันธ์แท้ Liverpool ตัวจริง! YNWA!";
    feedbackMessageElement.style.color = "#28a745";
  } else if (percentage >= 50) {
    feedbackMessageElement.innerText =
      "🌟 เยี่ยมมาก! คุณมีความรู้เกี่ยวกับ Liverpool ที่ดีเลยทีเดียว";
    feedbackMessageElement.style.color = "#ffc107";
  } else {
    feedbackMessageElement.innerText =
      "💪 พยายามได้ดีมาก! ลองทบทวนประวัติศาสตร์ Liverpool แล้วเล่นใหม่อีกครั้งนะ";
    feedbackMessageElement.style.color = "#dc3545";
  }
}

function resetState() {
  feedbackElement.innerText = "";
  feedbackElement.style.background = "";
  feedbackElement.style.border = "";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  updateProgressBar();
}

function setStatusClass(element, correct) {
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function updateProgressBar() {
  const progress = (currentQuestionIndex / questions.length) * 100;
  progressFillElement.style.width = `${progress}%`;
}
