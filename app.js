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
        'Alan "Ollie" Gelfand'
      ],
      correctAnswer: 'Alan "Ollie" Gelfand'
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
  questionNumber: 0,
  score: 0
};

function generateStartPage() {
  // show main page with title and button
  return `<div class="mainPage">
  <h2>Skateboarding Trivia:</h2>
  <button id="startQuiz">Let's Go!</button>
  </div>`
}
// show score
function generateScore() {
  return `
    <ul class="question-and-score">
      <li id="question-number">
        Question Number: ${STORE.questionNumber + 1}/${STORE.questions.length}
      </li>
      <li id="score">
        Score: ${STORE.score}/${STORE.questions.length}
      </li>
    </ul>
  `;
}

// start quiz
function startQuiz() {
  $("main").on('click', "#startQuiz", function() {
    
    render();
  })
}
// generate questions
function generateQuestion() {
  let questionNumber = STORE.questionNumber;
  return `<form id="question-form" class="question-form">
  <fieldset><div class="question"></div>
  <div class="options"><div class="answers">
  <legend> ${STORE.questions[questionNumber].question} </legend>
  </div> ${generateAnswers()} </div>
  <button type="submit" id ="submit" tabindex="5">submit</button>
  <button type="button" id="next-button" tabindex="6"> next &gt;></button>
  </fieldset>
  </form>`;


}
// respond to guesses
function generateAnswers() {
  const answersArray = STORE.questions[STORE.questionNumber].answers;
  let answersHtml = "";
  let idx = 0;
  answersArray.forEach(answer => {
    answersHtml += `
    <div tabindex ="${idx + 1}" id ="option-container -${idx}">
    <input type="radio" name="options" id ="option${idx + 1}" value="${answer}"
     required>
     <label for="option${idx + 1}"> ${answer}
     </label>
     </div>`;
    idx++;
  });
  return answersHtml;
}

function answerSubmit() {
  // submit choice
  $('main').on('submit', '#question', function (event) {
    event.preventDefault();
    // respond to choice
    let chosenAnswer = $("input[name='answer']:checked").val();
    console.log(chosenAnswer);
    // show nope
    {
      if (chosenAnswer === STORE.answers) {
        return `<h2>Nope</h2>`;
        // show correct
      }
      else (chosenAnswer === STORE.correctAnswer)
      return `<h2>${STORE.correctAnswer}</h2>`;
      
    }
    
  });
}
function handleQuestionFormSubmission() {
  $('body').on('submit', '#question-form', function (event) {
    event.preventDefault();
    const questionNumber = STORE.questions
    [STORE.questionNumber];
    let selectedOption = $('input[name=options]:checked').val();
    let optionContainerId = `#option-container-${questionNumber.answers.findIndex(i => i 
      === selectedOption)}`;
      if (selectedOption === questionNumber.correctAnswer) {
        STORE.score++;
        $(optionContainerId).append
        (generateFeedback('correct'));
      } else {
        $(optionContainerId).append(generateFeedback('incorrect'));
      }
      STORE.questionNumber++;
     render();
  });
}
// feedback
function generateFeedback(answerStatus) {
  let correctAnswer = STORE.questions[STORE.questionNumber].correctAnswer;
  let html = "";
  if (answerStatus === "correct") {
    html = `<div class="right-answer">Yes!</div>`;
  } else if (answerStatus === "incorrect") {
    html = `<div class="wrong-answer">Nope. This: ${correctAnswer}.</div>`;
  }
  return html;
}
// go to next question
/*function nextQuestionClick() {
  $('body').on('click', "#next-button", (event) => {
    render();
  });
}*/


function generateResults() {
  // show when quiz is done and show reset button
  // show results
  return `<div class="results">
    <form id="js-restart-quiz"><fieldset>
    <div class="row"><div class="col-12">
    <legend>How did you do? ${STORE.score}/${STORE.questions.length}</legend>
    </div>
    </div>
    <div class="row">
    <div class="col-12">
    <button type="button" id="reset">reset</button>
    </div>
    </div>
    </fieldset>
    </form>
    </div>`;
}

function render() {
  // render the quiz in DOM
  console.log("in render");
  let questionNumber = STORE.questionNumber;
  if (STORE.quizStarted === false) {
    STORE.quizStarted = true;
    $('main').html(generateStartPage());
  } else if ((questionNumber >= 0) &&
    (questionNumber < STORE.questions.length)) {
    html = generateScore();
    html += generateQuestion();
    $('main').html(html);
  } else {
    $('main').html(generateResults());
  }

}


function main() {
    answerSubmit();
    startQuiz();
    //nextQuestionClick();
    render();
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