'use strict';

/**
 * Example store structure
 */
const STORE = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What is skateboarding?',
      answers: [
        'Fun!',
        'Art!',
        'Making authority figures angry!',
        'Everyone has a different answer but basically doing what you want with a board on wheels.'
      ],
      correctAnswer: 'Everyone has a different answer but basically doing what you want with a board on wheels.'
    },
    {
      question: 'When was skateboarding invented?',
      answers: [
        '1980s',
        '1960s',
        'Between the 1940s and 1950s.',
        'When the ollie was invented.'
      ],
      correctAnswer: 'Between the 1940s and 1950s.'
    },

    {
      question: 'Who invented the ollie?',
      answers: [
        'Tony Hawk',
        'Rodney Mullen',
        'Steve Caballero',
        "Alan 'Ollie' Gelfand"
      ],
      correctAnswer: "Alan 'Ollie' Gelfand"
    },
    {
      question: 'Who invented the kickflip?',
      answers: [
        'Rodney Mullen',
        'Tony Hawk',
        'Steve Caballero',
        'Danny Way'
      ],
      correctAnswer: 'Rodney Mullen'
    },
    {
      question: 'Who landed the first 900(two and a half rotations) on a skateboard?',
      answers: [
        'Tony Hawk',
        'Danny Way',
        'Lincoln Ueda',
        'Andy McDonald'
      ],
      correctAnswer: 'Danny Way'
    }
  ],
  quizStarted: false,
  currentQuestion: 0,
  score: 0
};

function generateStartPage() {
  // show main page with title and button
  return `<div class="mainPage">
  <h2>Skateboarding Trivia:</h2><br>
  <h4>Time to learn some skateboarding history!</h4><br>
  </div>
  <div class="go">
  <button id="go">Let's Go!</button></div>
  `

}
// show score and question number
function generateScore() {
  return `
    <ul class="question-and-score">
      <li id="question-number">
        Question Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}
      </li>
      <li id="score">
        Score: ${STORE.score}/${STORE.questions.length}
      </li>
    </ul>
  `;
}

// start quiz
function startQuiz() {
  $("main").on('click', "#go", function (event) {
    STORE.quizStarted = true;
    render();
  });
}
// generate questions
function generateQuestion() {
  let currentQuestion = STORE.questions[STORE.currentQuestion];
  return `<form id="question-form" class="question-form">
  <fieldset>
    <div class="question">
      <legend> ${currentQuestion.question}</legend>
    </div>
    <div class="options">
      <div class="answers">
        ${generateAnswers()}
      </div>
    </div>
    <button type="submit" id="submit-answer-btn" tabindex="5">Submit</button>
    <button type="button" id="next-question-btn" tabindex="6"> Next &gt;></button>
  </fieldset>
</form >`;


}

// respond to guesses
function generateAnswers() {
  const answersArray = STORE.questions[STORE.currentQuestion].answers;
  let answersHtml = "";
  let i = 0;
  answersArray.forEach(answer => {
    answersHtml += `
    <div id="option-container-${i}">
        <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
        <label for="option${i + 1}"> ${answer}</label>
      </div>
     `;
    i++;
  });
  return answersHtml;
}

// handle the answer by showing responses of correct or incorrect
function handleQuestionFormSubmission() {
  $('body').on('submit', '#question-form', function (event) {
    event.preventDefault();
    const currentQuestion = STORE.questions[STORE.currentQuestion];
    let selectedOption = $('input[name=options]:checked').val();

    let optionContainerId = `#option-container-${currentQuestion.answers.findIndex(i => i
      === selectedOption)}`;
    if (selectedOption === currentQuestion.correctAnswer) {
      STORE.score++;
      $(optionContainerId).append
        (generateFeedback('correct'));
    } else {
      $(optionContainerId).append(generateFeedback('incorrect'));
    }
    STORE.currentQuestion++;
    $('#submit-answer-btn').hide();
    // disable all inputs
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    // show the next button
    $('#next-question-btn').show();
  });
}
// feedback
function generateFeedback(answerStatus) {
  let correctAnswer = STORE.questions[STORE.currentQuestion].correctAnswer;
  let html = "";
  if (answerStatus === "correct") {
    html = `<div class="right-answer">Yes!</div>`;
  } else if (answerStatus === "incorrect") {
    html = `<div class="wrong-answer">Nope. This: ${correctAnswer}.</div>`;
  }
  return html;
}
// go to next question
function nextQuestionClick() {
  $('body').on('click', "#next-question-btn ", (event) => {

    render();
  });
}


function generateResults() {
  // show when quiz is done and show reset button
  // show results
  return `<div class="results">
  <form id="js-restart-quiz">
    <fieldset>
      <div class="row">
        <div class="col-12">
          <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
        </div>
      </div>
    
      <div class="row">
        <div class="col-12">
          <button type="button" id="restart"> Restart Quiz </button>
        </div>
      </div>
    </fieldset>
</form>
</div>`;
}

// make functionality for reset button
function restartQuiz() {

  STORE.quizStarted = false;
  STORE.currentQuestion = 0;
  STORE.score = 0;




}

function handleRestartButtonClick() {
  $('main').on('click', "#restart", (event) => {
    
    restartQuiz();
    render();
  });
}

function render() {
  // render the quiz in DOM
  let html = "";

  if (STORE.quizStarted === false) {

    $('main').html(generateStartPage());
    return;
  } else if (STORE.currentQuestion >= 0 &&
    STORE.currentQuestion < STORE.questions.length) {
    html = generateScore();
    html += generateQuestion();
    $('main').html(html);
  } else {
    $('main').html(generateResults());
  }

}


function main() {
  handleQuestionFormSubmission();
  startQuiz();
  nextQuestionClick();
  render();
  handleRestartButtonClick();
}
$(main);

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

/* These functions handle events like submit and click */